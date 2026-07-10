import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const requestSchema = z.object({
  email: z.string().trim().toLowerCase().email("Correo no válido"),
});

const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutos

/**
 * Solicitud de acceso a la intranet por magic link.
 *
 * - Si el correo está en la lista blanca (IntranetUser activo): genera un
 *   token de un solo uso (30 min) y envía el enlace por email (Resend).
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

  const user = await prisma.intranetUser.findUnique({ where: { email } });
  if (!user || !user.active) {
    return NextResponse.json(
      {
        error:
          "No estás autorizado aún. Para solicitar acceso a la intranet, escribe a iuce.tecnico@usal.es.",
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
  const link = `${base}/intranet/acceso?token=${token}&email=${encodeURIComponent(email)}`;

  const apiKey = process.env.RESEND_API_KEY;
  const canSend = Boolean(apiKey && !apiKey.includes("placeholder"));

  if (canSend) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "IUCE <onboarding@resend.dev>",
        to: email,
        subject: "Tu acceso a la intranet del IUCE",
        text: `Hola${user.name ? ` ${user.name}` : ""}:

Usa este enlace para entrar en la intranet del IUCE (caduca en 30 minutos y solo funciona una vez):

${link}

Si no has solicitado este acceso, ignora este mensaje.

IUCE — Instituto Universitario de Ciencias de la Educación
Universidad de Salamanca`,
      });
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
