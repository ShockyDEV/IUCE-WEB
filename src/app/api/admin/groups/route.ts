import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { groupInputSchema } from "@/lib/admin-schemas";

export async function GET() {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const items = await prisma.researchGroup.findMany({
    orderBy: { acronym: "asc" },
    include: { _count: { select: { members: true } } },
  });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
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
  const d = parsed.data;
  const created = await prisma.researchGroup.create({
    data: {
      acronym: d.acronym,
      name: d.name,
      lead: d.lead || null,
      url: d.url || null,
      logo: d.logo || null,
      chip: d.chip || null,
    },
  });
  return NextResponse.json({ item: created }, { status: 201 });
}
