"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const NAV: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Instituto", href: "/instituto" },
  { label: "Investigación", href: "/investigacion" },
  { label: "Formación", href: "/formacion" },
  { label: "Eventos", href: "/eventos" },
  { label: "Doctorado", href: "/doctorado" },
  {
    label: "EKS",
    href: "https://revistas.usal.es/index.php/eks",
    external: true,
  },
  { label: "Noticias", href: "/noticias" },
  { label: "Contacto", href: "/contacto" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      {/* Barra institucional roja */}
      <div className="h-[3px] bg-usal-red" />

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-surface-card">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-6 px-6">
          {/* Logo */}
          <Link
            href="/"
            aria-label="IUCE — Inicio"
            className="flex flex-none items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page"
          >
            <Image
              src="/images/iuce-logo.png"
              alt="IUCE — Universidad de Salamanca"
              width={329}
              height={153}
              priority
              className="h-[38px] w-auto dark:hidden"
            />
            <Image
              src="/images/iuce-logo-white.webp"
              alt="IUCE — Universidad de Salamanca"
              width={640}
              height={196}
              priority
              className="hidden h-[34px] w-auto dark:block"
            />
          </Link>

          {/* Navegación */}
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-5 text-sm font-medium text-gray-600 lg:flex"
          >
            {NAV.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-gray-900"
                  >
                    {item.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                );
              }
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-[68px] items-center border-b-2 border-transparent transition-colors",
                    active
                      ? "border-usal-red text-ink"
                      : "hover:text-gray-900",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Acciones */}
          <div className="flex flex-none items-center gap-2.5">
            <button
              type="button"
              aria-label="Buscar"
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <ThemeToggle />
            <span
              className="text-xs font-semibold text-gray-700"
              aria-label="Selector de idioma"
            >
              ES <span className="font-normal text-gray-300">·</span>{" "}
              <a
                href="#"
                className="font-normal text-gray-400 no-underline hover:text-gray-600"
              >
                EN
              </a>
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
