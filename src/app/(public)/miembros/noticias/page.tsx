import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { CoverImage } from "@/components/news/cover-image";
import { IntranetShell } from "@/components/intranet/intranet-shell";
import { getIntranetSession, getMemberBadge } from "@/lib/intranet-session";
import { getInternalNews } from "@/lib/news-service";

export const metadata: Metadata = {
  title: "Noticias internas — Intranet",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

/**
 * Noticias internas: solo para personal autorizado. Se gestionan desde el
 * panel igual que las públicas, marcando «Noticia interna» en el editor.
 */
export default async function IntranetNoticiasPage() {
  const session = await getIntranetSession();
  if (!session) redirect("/miembros");
  const badge = await getMemberBadge(session?.user?.email);

  const noticias = await getInternalNews();

  return (
    <IntranetShell
      active="/miembros/noticias"
      email={session.user?.email ?? ""}
      member={badge}
      breadcrumbLabel="Noticias internas"
    >
      <h2 className="mb-1.5 text-xl font-bold text-gray-900">
        Noticias internas ({noticias.length})
      </h2>
      <p className="mb-6 max-w-[75ch] text-sm text-gray-500">
        Comunicaciones para los miembros del IUCE. No aparecen en la web
        pública.
      </p>

      {noticias.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-500">
          Todavía no hay noticias internas publicadas.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 80} className="h-full">
              <Link
                href={`/miembros/noticias/${n.slug}`}
                className="group block h-full"
              >
                <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-surface-card shadow-sm hover:border-brand-400 hover:shadow-md">
                  {n.coverImage ? (
                    <CoverImage
                      src={n.coverImage}
                      alt=""
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-[160px] w-full"
                      zoom
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col px-5 py-[18px]">
                    <p className="mb-1.5 text-xs text-gray-500">
                      <span className="mr-1.5 inline-flex rounded-full bg-[#E0E7FF] px-2 py-0.5 text-[11px] font-semibold text-[#3730A3]">
                        Interna
                      </span>
                      {n.dateDisplay}
                    </p>
                    <h3 className="mb-1.5 text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-iuce-blue">
                      {n.title}
                    </h3>
                    {n.excerpt ? (
                      <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
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
    </IntranetShell>
  );
}
