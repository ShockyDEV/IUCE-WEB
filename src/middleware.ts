import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

/**
 * Protección por roles. Usa solo la configuración edge-safe (sin Prisma):
 * la verificación es del JWT de sesión.
 *
 * - /backstage/** y /api/admin/**: solo ADMIN o SUPER_ADMIN. Una sesión de
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

  // Versión en inglés: /en/* se reescribe a la ruta española con la cabecera
  // x-locale=en (getLocale() la lee en los server components). El área de
  // miembros, el panel y las API no tienen versión EN.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname === "/en" ? "/" : pathname.slice(3);
    if (
      rest.startsWith("/backstage") ||
      rest.startsWith("/api") ||
      rest.startsWith("/miembros") ||
      rest.startsWith("/auth") ||
      rest.startsWith("/_next")
    ) {
      return NextResponse.redirect(new URL(rest + req.nextUrl.search, req.url));
    }
    const url = req.nextUrl.clone();
    url.pathname = rest;
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", "en");
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  if (pathname.startsWith("/backstage") || pathname.startsWith("/api/admin")) {
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
    "/backstage/:path*",
    "/api/admin/:path*",
    "/api/intranet/files/:path*",
    "/en",
    "/en/:path*",
  ],
};
