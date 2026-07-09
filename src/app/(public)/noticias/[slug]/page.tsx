import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ShareRow } from "@/components/news/share-row";
import {
  getPublishedNews,
  getPublishedNewsBySlug,
} from "@/lib/news-service";

interface PageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const item = await getPublishedNewsBySlug(params.slug);
  if (!item) return { title: "Noticia no encontrada" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
      publishedTime: item.publishedAt,
    },
  };
}

export default async function NoticiaPage({ params }: Readonly<PageProps>) {
  const item = await getPublishedNewsBySlug(params.slug);
  if (!item) notFound();

  const related = (await getPublishedNews())
    .filter((n) => n.slug !== item.slug)
    .slice(0, 3);
  const shortTitle =
    item.title.length > 30 ? `${item.title.slice(0, 28)}…` : item.title;

  return (
    <article>
      {/* Cabecera de lectura (800px) */}
      <div className="mx-auto max-w-[800px] px-6 pt-12">
        <div className="mb-5">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Noticias", href: "/noticias" },
              { label: shortTitle },
            ]}
          />
        </div>
        <div className="mb-4 flex items-center gap-2.5 text-xs">
          <span className="rounded-full bg-iuce-blue-pale px-3 py-[3px] font-medium text-ink">
            {item.category}
          </span>
          <span className="text-gray-400">
            {item.dateLong} · {item.author}
          </span>
        </div>
        <h1 className="mb-4 text-balance text-4xl font-bold leading-tight tracking-tight text-ink">
          {item.title}
        </h1>
        {item.excerpt ? (
          <p className="mb-7 text-lg leading-relaxed text-gray-500">
            {item.excerpt}
          </p>
        ) : null}
      </div>

      {/* Imagen principal (960px) */}
      <div className="mx-auto max-w-[960px] px-6">
        <figure className="mb-3">
          <ImagePlaceholder
            label={item.photoLabel}
            className="h-[420px] w-full"
          />
          {item.photoCaption ? (
            <figcaption className="mt-2.5 text-xs text-gray-400">
              {item.photoCaption}
            </figcaption>
          ) : null}
        </figure>
      </div>

      {/* Cuerpo (800px) */}
      <div className="mx-auto max-w-[800px] px-6 pt-7">
        <div
          className="news-body flex flex-col gap-[18px] text-[17px] leading-[1.75] text-gray-600"
          // Contenido del gestor (HTML del editor del panel de administración)
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

        <div className="mt-8">
          <ShareRow title={item.title} />
        </div>
      </div>

      {/* Más actualidad */}
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-12">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-gray-900">Más actualidad</h2>
          <Link
            href="/noticias"
            className="text-sm font-medium text-iuce-blue hover:underline"
          >
            Todas las noticias →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((n) => (
            <Link key={n.slug} href={`/noticias/${n.slug}`}>
              <article className="h-full rounded-xl border border-gray-200 bg-surface-card px-5 py-[18px] shadow-sm transition-all hover:border-brand-400 hover:shadow-md">
                <p className="mb-1.5 text-xs text-gray-400">
                  {n.category} · {n.dateDisplay}
                </p>
                <h3 className="text-sm font-semibold leading-snug text-gray-900">
                  {n.title}
                </h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
