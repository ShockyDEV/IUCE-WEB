import { NextResponse } from "next/server";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

interface Params {
  params: { id: string };
}

const updateSchema = z.object({
  title: z.string().trim().min(1).max(300),
  description: z.string().trim().max(1000).optional().nullable(),
});

export async function PUT(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
  }
  const existing = await prisma.intranetDocument.findUnique({
    where: { id: params.id },
  });
  if (!existing) {
    return NextResponse.json(
      { error: "Documento no encontrado" },
      { status: 404 },
    );
  }
  const updated = await prisma.intranetDocument.update({
    where: { id: params.id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description || null,
    },
  });
  return NextResponse.json({ item: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const existing = await prisma.intranetDocument.findUnique({
    where: { id: params.id },
  });
  if (!existing) {
    return NextResponse.json(
      { error: "Documento no encontrado" },
      { status: 404 },
    );
  }
  const filePath = path.join(
    process.cwd(),
    "storage",
    "intranet",
    path.basename(existing.storedName),
  );
  await unlink(filePath).catch(() => {
    /* ya no existe: seguimos */
  });
  await prisma.intranetDocument.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
