import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { IntranetSignOut } from "@/components/intranet/intranet-signout";
import { cn } from "@/lib/cn";

const TABS = [
  { href: "/miembros", label: "Documentos" },
  { href: "/miembros/noticias", label: "Noticias internas" },
  { href: "/miembros/perfil", label: "Mi perfil" },
] as const;

export type IntranetTab = (typeof TABS)[number]["href"];

/**
 * Marco común de las páginas del área de miembros (usuario autenticado):
 * cabecera con título, correo de la sesión y cierre de sesión, más la
 * navegación por pestañas Documentos / Noticias internas / Mi perfil.
 */
export function IntranetShell({
  active,
  email,
  member,
  breadcrumbLabel,
  children,
}: Readonly<{
  active: IntranetTab;
  email: string;
  /** Ficha de miembro asociada al correo (foto y nombre), si existe. */
  member?: { photo: string | null; name: string } | null;
  breadcrumbLabel?: string;
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                ...(breadcrumbLabel
                  ? [
                      { label: "Área de miembros", href: "/miembros" },
                      { label: breadcrumbLabel },
                    ]
                  : [{ label: "Área de miembros" }]),
              ]}
            />
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
                Solo personal del IUCE
              </p>
              <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
                Área de miembros
              </h1>
            </div>
            <div className="flex items-center gap-3.5 pt-1">
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  {member ? (
                    <p className="text-sm font-semibold leading-tight text-gray-900">
                      {member.name}
                    </p>
                  ) : null}
                  <p className="text-xs text-gray-400">{email}</p>
                </div>
                <IntranetSignOut />
              </div>
              <span className="relative h-14 w-14 flex-none overflow-hidden rounded-full border-2 border-gray-200 bg-iuce-blue-pale">
                {member?.photo ? (
                  <Image
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-ink">
                    <UserRound className="h-6 w-6" aria-hidden="true" />
                  </span>
                )}
              </span>
            </div>
          </div>
          <nav
            aria-label="Secciones del área de miembros"
            className="flex gap-5 text-sm font-medium text-gray-600"
          >
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active === tab.href ? "page" : undefined}
                className={cn(
                  "flex h-11 items-center border-b-2 border-transparent transition-colors",
                  active === tab.href
                    ? "border-usal-red font-semibold text-ink"
                    : "hover:text-gray-900",
                )}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">{children}</div>
      </section>
    </>
  );
}
