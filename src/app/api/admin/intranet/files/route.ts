import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { slugify } from "@/lib/slugify";

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB (documentación interna)

export async function GET() {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const items = await prisma.intranetDocument.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

/**
 * Subida de documentos de la intranet → storage/intranet (FUERA de public/,
 * no accesible sin sesión). El nombre en disco lleva un sufijo aleatorio.
 */
export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Falta el archivo" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "El archivo supera los 50 MB" },
      { status: 413 },
    );
  }

  const ext = path.extname(file.name).toLowerCase();
  const base = slugify(path.basename(file.name, ext)) || "documento";
  const storedName = `${base}-${randomBytes(6).toString("hex")}${ext}`;

  const dir = path.join(process.cwd(), "storage", "intranet");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, storedName), buffer);

  const created = await prisma.intranetDocument.create({
    data: {
      title: path.basename(file.name, ext),
      filename: file.name,
      storedName,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
    },
  });
  return NextResponse.json({ item: created }, { status: 201 });
}
