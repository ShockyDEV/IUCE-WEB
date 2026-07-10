import { prisma } from "@/lib/prisma";

type Access =
  | { allowed: true; name: string | null; viaMember: boolean }
  | { allowed: false };

/**
 * Resuelve si un correo puede acceder a la intranet.
 *
 * Reglas (en este orden):
 *  1. Si existe una fila en IntranetUser, manda su campo `active`: una fila
 *     desactivada bloquea SIEMPRE, aunque el correo sea de un miembro. Así
 *     el panel puede vetar a cualquiera.
 *  2. Si no hay fila pero el correo pertenece a un miembro del IUCE (tabla
 *     Member, la misma que alimenta la web pública), tiene acceso automático
 *     por su condición de miembro.
 *  3. En cualquier otro caso, no está autorizado.
 */
export async function resolveIntranetAccess(email: string): Promise<Access> {
  const user = await prisma.intranetUser.findUnique({ where: { email } });
  if (user) {
    return user.active
      ? { allowed: true, name: user.name, viaMember: false }
      : { allowed: false };
  }
  const member = await prisma.member.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });
  if (member) {
    return { allowed: true, name: member.name, viaMember: true };
  }
  return { allowed: false };
}

/**
 * Garantiza la fila IntranetUser al canjear un acceso (auto-alta de los
 * miembros en su primer inicio de sesión) y registra el último acceso.
 */
export async function ensureIntranetUser(email: string, name: string | null) {
  return prisma.intranetUser.upsert({
    where: { email },
    update: { lastLogin: new Date() },
    create: { email, name, active: true, lastLogin: new Date() },
  });
}
