import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CoverImage } from "@/components/news/cover-image";
import { IntranetShell } from "@/components/intranet/intranet-shell";
import { getIntranetSession, getMemberBadge } from "@/lib/intranet-session";
import { getInternalNewsBySlug } from "@/lib/news-service";

export const metadata: Metadata = {
  title: "Noticia interna — Intranet",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function IntranetNoticiaPage({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const session = await getIntranetSession();
  if (!session) redirect("/miembros");
  const badge = await getMemberBadge(session?.user?.email);

  const item = await getInternalNewsBySlug(params.slug);
  if (!item) notFound();

  return (
    <IntranetShell
      active="/miembros/noticias"
      email={session.user?.email ?? ""}
      member={badge}
      breadcrumbLabel="Noticias internas"
    >
      <article className="mx-auto max-w-[800px]">
        <div className="mb-4 flex items-center gap-2.5 text-xs">
          <span className="inline-flex rounded-full bg-[#E0E7FF] px-2.5 py-[3px] font-semibold text-[#3730A3]">
            Noticia interna
          </span>
          <span className="text-gray-400">{item.dateLong}</span>
        </div>
        <h2 className="mb-4 text-balance text-3xl font-bold leading-tight tracking-tight text-ink">
          {item.title}
        </h2>
        {item.excerpt ? (
          <p className="mb-7 text-lg leading-relaxed text-gray-500">
            {item.excerpt}
          </p>
        ) : null}

        {item.coverImage ? (
          <figure className="mb-7">
            <CoverImage
              src={item.coverImage}
              alt={item.photoLabel}
              rounded="xl"
              sizes="(max-width: 1024px) 100vw, 800px"
              className="h-[380px] w-full"
            />
          </figure>
        ) : null}

        <div
          className="news-body flex flex-col gap-[18px] text-[17px] leading-[1.75] text-gray-600"
          // Contenido del gestor (HTML del editor del panel de administración)
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

        <div className="mt-10 border-t border-gray-100 pt-6">
          <Link
            href="/miembros/noticias"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-iuce-blue hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Todas las noticias internas
          </Link>
        </div>
      </article>
    </IntranetShell>
  );
}
