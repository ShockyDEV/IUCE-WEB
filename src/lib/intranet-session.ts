import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const INTRANET_ROLES = new Set(["INTRANET", "ADMIN", "SUPER_ADMIN"]);

/**
 * Foto y nombre de la ficha de miembro asociada a un correo (para el avatar
 * de la cabecera del área de miembros). null si el correo no es de miembro.
 */
export async function getMemberBadge(
  email: string | null | undefined,
): Promise<{ photo: string | null; name: string } | null> {
  if (!email) return null;
  try {
    const member = await prisma.member.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { photo: true, name: true },
    });
    return member ? { photo: member.photo, name: member.name } : null;
  } catch {
    return null;
  }
}

/**
 * Sesión válida para la intranet (miembros con rol INTRANET y también los
 * administradores del panel). Devuelve null si no hay sesión o el rol no
 * tiene acceso; cada página decide entonces si muestra la tarjeta de acceso
 * (/intranet) o redirige a ella (subpáginas).
 */
export async function getIntranetSession() {
  const session = await auth();
  const role = session?.user?.role as string | undefined;
  if (session?.user?.email && role && INTRANET_ROLES.has(role)) {
    return session;
  }
  return null;
}
