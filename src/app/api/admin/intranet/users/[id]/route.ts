import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

interface Params {
  params: { id: string };
}

const updateSchema = z.object({
  name: z.string().trim().max(200).optional().nullable(),
  active: z.boolean().optional(),
});

export async function PUT(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
  }
  const existing = await prisma.intranetUser.findUnique({
    where: { id: params.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const updated = await prisma.intranetUser.update({
    where: { id: params.id },
    data: {
      name: parsed.data.name === undefined ? existing.name : parsed.data.name,
      active: parsed.data.active ?? existing.active,
    },
  });
  // Al desactivar, se invalidan sus enlaces pendientes.
  if (parsed.data.active === false) {
    await prisma.intranetToken.deleteMany({
      where: { identifier: existing.email },
    });
  }
  return NextResponse.json({ item: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const existing = await prisma.intranetUser.findUnique({
    where: { id: params.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  await prisma.intranetToken.deleteMany({
    where: { identifier: existing.email },
  });
  await prisma.intranetUser.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
