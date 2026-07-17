"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ExternalLink, KeyRound, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  pathLocale,
  pick,
  stripLocale,
  withLocale,
  type Locale,
} from "@/lib/locale";
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  external?: boolean;
}

const NAV: NavItem[] = [
  { label: "Inicio", labelEn: "Home", href: "/" },
  { label: "Instituto", labelEn: "Institute", href: "/instituto" },
  { label: "Investigación", labelEn: "Research", href: "/investigacion" },
  {
    label: "Transferencia",
    labelEn: "Knowledge transfer",
    href: "/transferencia",
  },
  { label: "Estadísticas", labelEn: "Statistics", href: "/estadisticas" },
  { label: "Formación", labelEn: "Training", href: "/formacion" },
  { label: "Eventos", labelEn: "Events", href: "/eventos" },
  { label: "Doctorado", labelEn: "PhD", href: "/doctorado" },
  {
    label: "EKS",
    labelEn: "EKS",
    href: "https://revistas.usal.es/index.php/eks",
    external: true,
  },
  { label: "Noticias", labelEn: "News", href: "/noticias" },
  { label: "Contacto", labelEn: "Contact", href: "/contacto" },
  { label: "Área de miembros", labelEn: "Members area", href: "/miembros" },
];

// En escritorio, Inicio vive en el logo y el área de miembros en el botón
// de la llave (zona de acciones); el menú móvil sí muestra ambos.
const DESKTOP_HIDDEN = new Set(["/", "/miembros"]);

function isActive(basePath: string, href: string) {
  if (href === "/") return basePath === "/";
  return basePath === href || basePath.startsWith(`${href}/`);
}

/** Conmutador ES|EN: misma página en el otro idioma, conservando la query.
 *
 * OJO: son <a> nativos a propósito, NO <Link>. El i18n reescribe /en/* a la
 * misma ruta española con la cabecera x-locale, así que ambos idiomas
 * comparten árbol en el router cache de Next: con <Link>, al pulsar EN el
 * cliente reutilizaba el árbol recién pintado en español y solo cambiaba la
 * URL. La navegación de documento completo fuerza el render del servidor en
 * el idioma nuevo y vacía el router cache, dejando toda la sesión coherente. */
function LanguageToggleView({
  basePath,
  locale,
  qs,
}: Readonly<{ basePath: string; locale: Locale; qs: string }>) {
  const hrefFor = (l: Locale) =>
    withLocale(basePath, l) + (qs ? `?${qs}` : "");
  const linkClass = (active: boolean) =>
    cn(
      "inline-flex h-6 min-w-[24px] items-center justify-center rounded px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iuce-blue",
      active
        ? "text-gray-800"
        : "font-normal text-gray-500 hover:text-gray-700",
    );
  return (
    <nav
      aria-label={pick(locale, "Idioma", "Language")}
      className="text-xs font-semibold"
    >
      <a
        href={hrefFor("es")}
        aria-current={locale === "es" ? "true" : undefined}
        hrefLang="es"
        className={linkClass(locale === "es")}
      >
        ES
      </a>
      {/* Separador decorativo: el lector de pantalla no debe leerlo. */}
      <span aria-hidden="true" className="font-normal text-gray-300">
        ·
      </span>
      <a
        href={hrefFor("en")}
        aria-current={locale === "en" ? "true" : undefined}
        hrefLang="en"
        title={pick(locale, "English version", "Versión en español")}
        className={linkClass(locale === "en")}
      >
        EN
      </a>
    </nav>
  );
}

/** Lee la query actual (filtros de noticias, paginación…) para no perderla
 *  al cambiar de idioma. Separado de la vista porque useSearchParams exige
 *  un límite de Suspense cuando el header se prerenderiza (página 404). */
function LanguageToggle({
  basePath,
  locale,
}: Readonly<{ basePath: string; locale: Locale }>) {
  const searchParams = useSearchParams();
  return (
    <LanguageToggleView
      basePath={basePath}
      locale={locale}
      qs={searchParams.toString()}
    />
  );
}

export function SiteHeader({
  hiddenPaths = [],
}: Readonly<{ hiddenPaths?: string[] }>) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const locale = pathLocale(pathname);
  const basePath = stripLocale(pathname);
  // Páginas ocultas desde el panel (Visualización): fuera del menú.
  const nav = NAV.filter((item) => !hiddenPaths.includes(item.href));
  // El área de miembros y el panel no tienen versión EN.
  const localizedHref = (href: string) =>
    href === "/miembros" ? href : withLocale(href, locale);

  // Cierra el menú móvil al navegar a otra página.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape cierra el menú móvil y devuelve el foco a la hamburguesa, para no
  // dejar a quien navega con teclado dentro de una lista de 12 enlaces.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      document.getElementById("boton-menu")?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* Barra institucional roja */}
      <div className="h-[3px] bg-usal-red" />

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-surface-card">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-6 px-6">
          {/* Logo */}
          <Link
            href={withLocale("/", locale)}
            aria-label={pick(locale, "IUCE — Inicio", "IUCE — Home")}
            className="flex flex-none items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iuce-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page"
          >
            <Image
              src="/images/iuce-logo.png"
              // Decorativo: el enlace que lo envuelve ya tiene aria-label.
              alt=""
              width={800}
              height={362}
              priority
              className="h-[38px] w-auto dark:hidden"
            />
            <Image
              src="/images/iuce-logo-white.webp"
              alt=""
              width={640}
              height={196}
              priority
              className="hidden h-[34px] w-auto dark:block"
            />
          </Link>

          {/* Navegación de escritorio */}
          <nav
            aria-label={pick(locale, "Navegación principal", "Main navigation")}
            className="hidden items-center gap-2.5 text-sm font-medium text-gray-600 lg:flex xl:gap-3.5 2xl:gap-5"
          >
            {nav.filter((item) => !DESKTOP_HIDDEN.has(item.href)).map((item) => {
              const label = pick(locale, item.label, item.labelEn);
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-gray-900"
                  >
                    {label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                );
              }
              const active = isActive(basePath, item.href);
              return (
                <Link
                  key={item.href}
                  href={localizedHref(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-[68px] items-center border-b-2 border-transparent transition-colors",
                    active
                      ? "border-usal-red text-ink"
                      : "hover:text-gray-900",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Acciones */}
          <div className="flex flex-none items-center gap-2.5">
            <Link
              href="/miembros"
              title={pick(
                locale,
                "Área de miembros — solo miembros del IUCE",
                "Members area — IUCE members only",
              )}
              className="hidden h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iuce-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page lg:flex"
            >
              <KeyRound className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">
                {pick(locale, "Miembros", "Members")}
              </span>
            </Link>
            <ThemeToggle />
            {/* Selector de idioma: misma página en el otro idioma. El
                useSearchParams del conmutador exige Suspense al prerender
                (la 404 estática monta este header); el fallback pinta el
                mismo conmutador sin query. */}
            <Suspense
              fallback={<LanguageToggleView basePath={basePath} locale={locale} qs="" />}
            >
              <LanguageToggle basePath={basePath} locale={locale} />
            </Suspense>
            {/* Hamburguesa (móvil y tablet) */}
            <button
              type="button"
              id="boton-menu"
              aria-label={
                menuOpen
                  ? pick(locale, "Cerrar menú", "Close menu")
                  : pick(locale, "Abrir menú", "Open menu")
              }
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iuce-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Panel de navegación móvil */}
        {menuOpen ? (
          <nav
            id="menu-movil"
            aria-label={pick(
              locale,
              "Navegación principal (móvil)",
              "Main navigation (mobile)",
            )}
            className="border-t border-gray-200 bg-surface-card lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-2">
              {nav.map((item) => {
                const label = pick(locale, item.label, item.labelEn);
                if (item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border-l-2 border-transparent py-3 pl-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {label}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  );
                }
                const active = isActive(basePath, item.href);
                return (
                  <Link
                    key={item.href}
                    href={localizedHref(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "border-l-2 py-3 pl-3 text-sm font-medium transition-colors",
                      active
                        ? "border-usal-red text-ink"
                        : "border-transparent text-gray-600 hover:text-gray-900",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
