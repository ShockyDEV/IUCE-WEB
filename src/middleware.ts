import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

/**
 * Protección por roles. Usa solo la configuración edge-safe (sin Prisma):
 * la verificación es del JWT de sesión.
 *
 * - /admin/** y /api/admin/**: solo ADMIN o SUPER_ADMIN. Una sesión de
 *   intranet NO da acceso al panel.
 * - /api/intranet/files/**: cualquier sesión (INTRANET o administración).
 *   La página /miembros (área de miembros) hace su propia comprobación para
 *   poder mostrar el formulario de acceso a quien no tiene sesión.
 */
const { auth } = NextAuth(authConfig);

const ADMIN_ROLES = new Set(["ADMIN", "SUPER_ADMIN"]);
const INTRANET_ROLES = new Set(["INTRANET", "ADMIN", "SUPER_ADMIN"]);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role as string | undefined;
  const isApi = pathname.startsWith("/api/");

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!req.auth) {
      if (isApi) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      }
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
    if (!role || !ADMIN_ROLES.has(role)) {
      // Sesión de intranet intentando entrar al panel.
      if (isApi) {
        return NextResponse.json(
          { error: "Requiere cuenta de administración" },
          { status: 403 },
        );
      }
      return NextResponse.redirect(new URL("/miembros", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/intranet/files")) {
    if (!req.auth || !role || !INTRANET_ROLES.has(role)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/intranet/files/:path*",
  ],
};
