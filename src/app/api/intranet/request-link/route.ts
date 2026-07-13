import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resolveIntranetAccess } from "@/lib/intranet-access";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const requestSchema = z.object({
  email: z.string().trim().toLowerCase().email("Correo no válido"),
});

const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutos

/**
 * Solicitud de acceso al área de miembros (intranet) por magic link.
 *
 * - Autorizados: los miembros del IUCE (ficha con correo) automáticamente
 *   y la lista blanca del panel (IntranetUser activo); una fila desactivada
 *   bloquea siempre. Se genera un token de un solo uso (30 min) y se envía
 *   el enlace por email (Resend).
 * - Si no está autorizado: 403 con el mensaje de contacto, tal y como pide
 *   el IUCE (la lista la gestiona el panel: Intranet → Usuarios).
 *
 * En desarrollo sin RESEND_API_KEY, la respuesta incluye devLink para poder
 * probar el flujo completo sin enviar correos (nunca en producción).
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Correo no válido" },
      { status: 400 },
    );
  }
  const { email } = parsed.data;

  // Anti-abuso: 5 solicitudes por IP y 3 por correo cada 10 minutos.
  const ip = clientIp(request);
  if (
    !rateLimit(`link:ip:${ip}`, 5, 10 * 60_000) ||
    !rateLimit(`link:mail:${email}`, 3, 10 * 60_000)
  ) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo." },
      { status: 429 },
    );
  }

  // Autorizados: lista blanca del panel + todos los miembros del IUCE
  // (tabla Member con correo). Una fila desactivada bloquea siempre.
  const access = await resolveIntranetAccess(email);
  if (!access.allowed) {
    return NextResponse.json(
      {
        error:
          "No estás autorizado aún. Para solicitar acceso al área de miembros, escribe a iuce.tecnico@usal.es.",
        code: "NOT_AUTHORIZED",
      },
      { status: 403 },
    );
  }

  // Invalida tokens anteriores del mismo correo y emite uno nuevo.
  await prisma.intranetToken.deleteMany({ where: { identifier: email } });
  const token = randomBytes(32).toString("hex");
  await prisma.intranetToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(Date.now() + TOKEN_TTL_MS),
    },
  });

  const base =
    process.env.NEXTAUTH_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const link = `${base}/miembros/acceso?token=${token}&email=${encodeURIComponent(email)}`;

  const apiKey = process.env.RESEND_API_KEY;
  const canSend = Boolean(apiKey && !apiKey.includes("placeholder"));

  if (canSend) {
    try {
      const resend = new Resend(apiKey);
      // El SDK de Resend NO lanza en errores de API (dominio no verificado,
      // destinatario restringido…): los devuelve en `error`. Hay que mirarlo.
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "IUCE <onboarding@resend.dev>",
        to: email,
        subject: "Tu acceso al área de miembros del IUCE",
        text: `Hola${access.name ? ` ${access.name}` : ""}:

Usa este enlace para entrar en el área de miembros del IUCE (caduca en 30 minutos y solo funciona una vez):

${link}

Si no has solicitado este acceso, ignora este mensaje.

IUCE — Instituto Universitario de Ciencias de la Educación
Universidad de Salamanca`,
      });
      if (error) {
        console.error("[intranet] Resend rechazó el magic link:", error);
        return NextResponse.json(
          { error: "No se pudo enviar el correo. Inténtalo de nuevo." },
          { status: 502 },
        );
      }
      console.log(`[intranet] Magic link enviado a ${email} (id ${data?.id})`);
    } catch (e) {
      console.error("[intranet] Error enviando magic link:", e);
      return NextResponse.json(
        { error: "No se pudo enviar el correo. Inténtalo de nuevo." },
        { status: 502 },
      );
    }
    return NextResponse.json({ sent: true });
  }

  // Desarrollo sin proveedor de correo: el enlace se registra en el servidor
  // y se devuelve para poder probar (solo fuera de producción).
  console.log(`[intranet] Magic link para ${email}: ${link}`);
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ sent: true, devLink: link });
  }
  return NextResponse.json(
    { error: "El envío de correo no está configurado en el servidor." },
    { status: 501 },
  );
}
