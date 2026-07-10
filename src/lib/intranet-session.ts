import { auth } from "@/lib/auth";

const INTRANET_ROLES = new Set(["INTRANET", "ADMIN", "SUPER_ADMIN"]);

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
