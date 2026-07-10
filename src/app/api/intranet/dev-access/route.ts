import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEV_EMAIL = "dev@iuce.local";
const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutos

/**
 * Acceso directo a la intranet SOLO en desarrollo: crea (o reactiva) el
 * usuario dev@iuce.local, emite un token de un solo uso y redirige al
 * canjeo (/miembros/acceso), de modo que se ejercita el flujo real de
 * autenticación sin pasar por el correo.
 *
 * En producción (build de `next build`/`next start`) responde 404 y no
 * deja rastro: el botón que enlaza aquí tampoco se renderiza.
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  await prisma.intranetUser.upsert({
    where: { email: DEV_EMAIL },
    update: { active: true },
    create: { email: DEV_EMAIL, name: "Acceso de desarrollo", active: true },
  });

  await prisma.intranetToken.deleteMany({ where: { identifier: DEV_EMAIL } });
  const token = randomBytes(32).toString("hex");
  await prisma.intranetToken.create({
    data: {
      identifier: DEV_EMAIL,
      token,
      expires: new Date(Date.now() + TOKEN_TTL_MS),
    },
  });

  const target = new URL(
    `/miembros/acceso?token=${token}&email=${encodeURIComponent(DEV_EMAIL)}`,
    request.url,
  );
  return NextResponse.redirect(target);
}
