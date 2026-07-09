import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CoverImage } from "@/components/news/cover-image";
import { NEWS_CATEGORIES } from "@/lib/content/news";
import { getPublishedNews } from "@/lib/news-service";
import { getBlock } from "@/lib/content-blocks-service";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "La actualidad del IUCE: congresos, formación, premios y vida académica.",
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 9;

interface PageProps {
  searchParams: { categoria?: string; pagina?: string };
}

function pageHref(categoria: string | null, pagina: number): string {
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (pagina > 1) params.set("pagina", String(pagina));
  const qs = params.toString();
  return qs ? `/noticias?${qs}` : "/noticias";
}

/** Números de página a mostrar: 1 … (p-1) p (p+1) … total, sin repetidos. */
function pageNumbers(current: number, total: number): Array<number | "…"> {
  const wanted = new Set<number>([1, 2, current - 1, current, current + 1, total - 1, total]);
  const list = [...wanted].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: Array<number | "…"> = [];
  let prev = 0;
  for (const n of list) {
    if (n - prev > 1) out.push("…");
    out.push(n);
    prev = n;
  }
  return out;
}

export default async function NoticiasPage({
  searchParams,
}: Readonly<PageProps>) {
  const categoria =
    NEWS_CATEGORIES.find((c) => c === searchParams.categoria) ?? null;
  const [all, intro] = await Promise.all([
    getPublishedNews({ category: categoria ?? undefined }),
    getBlock("noticias", "intro"),
  ]);

  // La destacada solo abre la primera página del listado sin filtrar.
  const showFeatured = !categoria;
  const featured = showFeatured ? all[0] : null;
  const rest = showFeatured ? all.slice(1) : all;

  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number(searchParams.pagina) || 1),
    totalPages,
  );
  const feed = rest.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

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
          <div
            className="page-block mb-6 max-w-[70ch] text-base leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Filtrar por categoría"
          >
            <Link
              href="/noticias"
              aria-current={!categoria ? "page" : undefined}
              className={cn(
                "flex h-[34px] items-center rounded-full border px-4 text-sm font-medium transition-colors",
                !categoria
                  ? "border-iuce-blue-dark bg-iuce-blue-dark text-white"
                  : "border-gray-300 bg-surface-card text-gray-600 hover:border-brand-400 hover:text-ink",
              )}
            >
              Todas
            </Link>
            {NEWS_CATEGORIES.map((c) => (
              <Link
                key={c}
                href={pageHref(c, 1)}
                aria-current={categoria === c ? "page" : undefined}
                className={cn(
                  "flex h-[34px] items-center rounded-full border px-4 text-sm font-medium transition-colors",
                  categoria === c
                    ? "border-iuce-blue-dark bg-iuce-blue-dark text-white"
                    : "border-gray-300 bg-surface-card text-gray-600 hover:border-brand-400 hover:text-ink",
                )}
              >
                {c}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Destacada */}
      {featured && currentPage === 1 ? (
        <section>
          <div className="mx-auto max-w-6xl px-6 pb-3 pt-12">
            <Reveal from="scale">
            <Link href={`/noticias/${featured.slug}`} className="group block">
              <article className="card-lift grid overflow-hidden rounded-xl border border-gray-200 bg-surface-card shadow-sm hover:border-brand-400 hover:shadow-md lg:grid-cols-[1.2fr_1fr]">
                <CoverImage
                  src={featured.coverImage}
                  alt={featured.photoLabel}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  zoom
                  className="min-h-[300px] w-full"
                />
                <div className="flex flex-col gap-3 p-8">
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="rounded-full bg-iuce-blue-pale px-3 py-[3px] font-medium text-ink">
                      {featured.category}
                    </span>
                    <span className="text-gray-400">
                      {featured.dateDisplay}
                    </span>
                  </div>
                  <h2 className="text-balance text-2xl font-bold leading-snug text-ink">
                    {featured.title}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-600">
                    {featured.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-iuce-blue">
                    Leer la noticia
                    <ArrowRight
                      className="h-[15px] w-[15px]"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </article>
            </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Feed */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-6 pt-7">
          {feed.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">
              No hay noticias en esta categoría todavía.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {feed.map((n, i) => (
                <Reveal key={n.slug} delay={(i % 3) * 80} className="h-full">
                <Link href={`/noticias/${n.slug}`} className="group block h-full">
                  <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-surface-card shadow-sm hover:border-brand-400 hover:shadow-md">
                    <CoverImage
                      src={n.coverImage}
                      alt={n.photoLabel}
                      zoom
                      className="h-[150px] w-full"
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
                      {n.excerpt ? (
                        <p className="line-clamp-3 text-sm leading-normal text-gray-600">
                          {n.excerpt}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Paginación */}
      {totalPages > 1 ? (
        <nav
          aria-label="Paginación de noticias"
          className="mx-auto flex max-w-6xl items-center justify-center gap-1.5 px-6 pb-16 pt-2"
        >
          {currentPage > 1 ? (
            <Link
              href={pageHref(categoria, currentPage - 1)}
              aria-label="Página anterior"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-surface-card text-gray-600 transition-colors hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-surface-card text-gray-300">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </span>
          )}

          {pageNumbers(currentPage, totalPages).map((p, i) =>
            p === "…" ? (
              <span
                key={`gap-${i}`}
                className="px-1 text-sm text-gray-400"
              >
                …
              </span>
            ) : p === currentPage ? (
              <span
                key={p}
                aria-current="page"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-iuce-blue-dark bg-iuce-blue-dark text-sm font-semibold text-white"
              >
                {p}
              </span>
            ) : (
              <Link
                key={p}
                href={pageHref(categoria, p)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-surface-card text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                {p}
              </Link>
            ),
          )}

          {currentPage < totalPages ? (
            <Link
              href={pageHref(categoria, currentPage + 1)}
              aria-label="Página siguiente"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-surface-card text-gray-600 transition-colors hover:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-surface-card text-gray-300">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </nav>
      ) : (
        <div className="pb-10" />
      )}
    </>
  );
}
