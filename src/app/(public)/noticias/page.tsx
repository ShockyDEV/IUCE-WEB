import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { NEWS_CATEGORIES } from "@/lib/content/news";
import { getPublishedNews } from "@/lib/news-service";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "La actualidad del IUCE: congresos, formación, premios y vida académica.",
};

export const dynamic = "force-dynamic";

export default async function NoticiasPage() {
  // Contenido gestionado desde el panel de administración.
  const all = await getPublishedNews();
  const featured = all[0];
  const feed = all.slice(1);
  const chips = ["Todas", ...NEWS_CATEGORIES.filter((c) => c !== "Institucional")];

  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "Noticias" }]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            Actualidad
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            Noticias
          </h1>
          <p className="mb-6 max-w-[70ch] text-base leading-relaxed text-gray-600">
            La actividad del Instituto: congresos, formación, premios y vida
            académica.
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar por categoría"
          >
            {chips.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-pressed={i === 0}
                className={cn(
                  "h-[34px] rounded-full border px-4 text-sm font-medium transition-colors",
                  i === 0
                    ? "border-iuce-blue-dark bg-iuce-blue-dark text-white"
                    : "border-gray-300 bg-surface-card text-gray-600 hover:border-brand-400 hover:text-ink",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destacada */}
      {featured ? (
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-3 pt-12">
          <Link href={`/noticias/${featured.slug}`} className="block">
            <article className="grid overflow-hidden rounded-xl border border-gray-200 bg-surface-card shadow-sm transition-all hover:border-brand-400 hover:shadow-md lg:grid-cols-[1.2fr_1fr]">
              <ImagePlaceholder
                label={featured.photoLabel}
                rounded="none"
                className="min-h-[300px] w-full border-0"
              />
              <div className="flex flex-col gap-3 p-8">
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="rounded-full bg-iuce-blue-pale px-3 py-[3px] font-medium text-ink">
                    {featured.category}
                  </span>
                  <span className="text-gray-400">{featured.dateDisplay}</span>
                </div>
                <h2 className="text-balance text-2xl font-bold leading-snug text-ink">
                  {featured.title}
                </h2>
                <p className="text-base leading-relaxed text-gray-600">
                  {featured.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-iuce-blue">
                  Leer la noticia
                  <ArrowRight className="h-[15px] w-[15px]" aria-hidden="true" />
                </span>
              </div>
            </article>
          </Link>
        </div>
      </section>
      ) : null}

      {/* Feed */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-6 pt-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {feed.map((n) => (
              <Link key={n.slug} href={`/noticias/${n.slug}`}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-surface-card shadow-sm transition-all hover:border-brand-400 hover:shadow-md">
                  <ImagePlaceholder
                    label={n.photoLabel}
                    rounded="none"
                    className="h-[150px] w-full border-x-0 border-t-0"
                  />
                  <div className="flex flex-col gap-2 px-5 pb-5 pt-[18px]">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-iuce-blue-pale px-2.5 py-0.5 font-medium text-ink">
                        {n.category}
                      </span>
                      <span className="text-gray-400">{n.dateDisplay}</span>
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-gray-900">
                      {n.title}
                    </h3>
                    <p className="text-sm leading-normal text-gray-600">
                      {n.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Paginación */}
      <nav
        aria-label="Paginación de noticias"
        className="mx-auto flex max-w-6xl items-center justify-center gap-1.5 px-6 pb-16 pt-2"
      >
        <button
          type="button"
          aria-label="Página anterior"
          disabled
          className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-surface-card text-gray-300"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-current="page"
          className="h-9 w-9 rounded-md border border-iuce-blue-dark bg-iuce-blue-dark text-sm font-semibold text-white"
        >
          1
        </button>
        {["2", "3"].map((p) => (
          <button
            key={p}
            type="button"
            className="h-9 w-9 rounded-md border border-gray-300 bg-surface-card text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            {p}
          </button>
        ))}
        <span className="px-1 text-sm text-gray-400">…</span>
        <button
          type="button"
          className="h-9 w-9 rounded-md border border-gray-300 bg-surface-card text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          8
        </button>
        <button
          type="button"
          aria-label="Página siguiente"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-surface-card text-gray-600 transition-colors hover:bg-gray-50"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </>
  );
}
