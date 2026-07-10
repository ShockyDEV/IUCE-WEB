import { NextResponse } from "next/server";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const INTRANET_ROLES = new Set(["INTRANET", "ADMIN", "SUPER_ADMIN"]);
const MAX_SIZE = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

/**
 * Foto de la ficha pública del miembro, subida por él mismo desde su perfil
 * de la intranet. Se recorta a 512×512 (como las fotos migradas) y se sirve
 * desde /uploads/members/. Solo afecta a la ficha del propio correo.
 */
export async function POST(request: Request) {
  const session = await auth();
  const role = session?.user?.role as string | undefined;
  const email = session?.user?.email?.toLowerCase();
  if (!email || !role || !INTRANET_ROLES.has(role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const member = await prisma.member.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });
  if (!member) {
    return NextResponse.json(
      { error: "Tu correo no corresponde a ninguna ficha de miembro" },
      { status: 403 },
    );
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Falta la imagen" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "La imagen supera los 8 MB" },
      { status: 413 },
    );
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Formato no permitido (usa JPG, PNG o WebP)" },
      { status: 415 },
    );
  }

  const dir = path.join(process.cwd(), "public", "uploads", "members");
  await mkdir(dir, { recursive: true });
  const filename = `perfil-${member.id}-${Date.now().toString(36)}.webp`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await sharp(buffer)
    .rotate() // respeta la orientación EXIF de fotos de móvil
    .resize({ width: 512, height: 512, fit: "cover" })
    .webp({ quality: 88 })
    .toFile(path.join(dir, filename));

  const photo = `/uploads/members/${filename}`;
  await prisma.member.update({ where: { id: member.id }, data: { photo } });

  return NextResponse.json({ photo }, { status: 201 });
}
