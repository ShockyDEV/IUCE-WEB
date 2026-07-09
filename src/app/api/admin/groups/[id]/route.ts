import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { groupInputSchema } from "@/lib/admin-schemas";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const body = await request.json().catch(() => null);
  const parsed = groupInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Datos no válidos" },
      { status: 400 },
    );
  }
  const existing = await prisma.researchGroup.findUnique({
    where: { id: params.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Grupo no encontrado" }, { status: 404 });
  }
  const d = parsed.data;
  const updated = await prisma.researchGroup.update({
    where: { id: params.id },
    data: {
      acronym: d.acronym,
      name: d.name,
      lead: d.lead || null,
      url: d.url || null,
      logo: d.logo || null,
      chip: d.chip || null,
    },
  });
  return NextResponse.json({ item: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const existing = await prisma.researchGroup.findUnique({
    where: { id: params.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Grupo no encontrado" }, { status: 404 });
  }
  // Desvincula a los miembros antes de eliminar el grupo.
  await prisma.member.updateMany({
    where: { groupId: params.id },
    data: { groupId: null },
  });
  await prisma.researchGroup.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
