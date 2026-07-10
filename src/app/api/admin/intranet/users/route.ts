import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

const userSchema = z.object({
  email: z.string().trim().toLowerCase().email("Correo no válido").max(200),
  name: z.string().trim().max(200).optional().nullable(),
  active: z.boolean().optional(),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const items = await prisma.intranetUser.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ items });
}

/** Alta en la lista blanca de la intranet. */
export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const body = await request.json().catch(() => null);
  const parsed = userSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Datos no válidos" },
      { status: 400 },
    );
  }
  const { email, name } = parsed.data;

  const existing = await prisma.intranetUser.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Ese correo ya está en la lista" },
      { status: 409 },
    );
  }

  const created = await prisma.intranetUser.create({
    data: { email, name: name || null },
  });
  return NextResponse.json({ item: created }, { status: 201 });
}
