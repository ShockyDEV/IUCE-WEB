import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const INTRANET_ROLES = new Set(["INTRANET", "ADMIN", "SUPER_ADMIN"]);

const profileSchema = z.object({
  // Nombre para mostrar de la cuenta de intranet.
  accountName: z.string().trim().min(2).max(200).optional().nullable(),
  // Ficha pública del miembro (si el correo corresponde a un miembro).
  area: z.string().trim().max(300).optional().nullable(),
  orcid: z
    .string()
    .trim()
    .url()
    .max(300)
    .optional()
    .nullable()
    .or(z.literal("")),
  portalUrl: z
    .string()
    .trim()
    .url()
    .max(300)
    .optional()
    .nullable()
    .or(z.literal("")),
});

/**
 * Actualización del perfil propio desde la intranet. Cada usuario solo puede
 * tocar SU cuenta y, si su correo corresponde a un miembro del IUCE, los
 * campos secundarios de su ficha pública (área, ORCID, portal). El nombre
 * público del miembro no se cambia desde aquí.
 */
export async function PUT(request: Request) {
  const session = await auth();
  const role = session?.user?.role as string | undefined;
  const email = session?.user?.email?.toLowerCase();
  if (!email || !role || !INTRANET_ROLES.has(role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Datos no válidos" },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (data.accountName) {
    await prisma.intranetUser.updateMany({
      where: { email },
      data: { name: data.accountName },
    });
  }

  const member = await prisma.member.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });
  if (member) {
    await prisma.member.update({
      where: { id: member.id },
      data: {
        area: data.area?.trim() ? data.area.trim() : null,
        orcid: data.orcid ? data.orcid : null,
        portalUrl: data.portalUrl ? data.portalUrl : null,
      },
    });
  }

  return NextResponse.json({ ok: true, member: Boolean(member) });
}
