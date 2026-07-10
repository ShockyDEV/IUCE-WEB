import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Hourglass, Users2 } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buttonClassName } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getBlock, getListBlock } from "@/lib/content-blocks-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Seminario IUCE",
  description:
    "El encuentro anual de los grupos de investigación del IUCE: cooperación, transferencia y sinergias entre líneas de investigación en educación.",
};

/**
 * Página del Seminario IUCE: qué es el encuentro anual de los grupos y el
 * archivo de ediciones por año (crónica + actas de cada edición). Todo se
 * edita desde el panel (Contenido → Páginas → Seminario IUCE).
 */
export default async function SeminarioIucePage() {
  const [intro, objetivo, cta, ediciones] = await Promise.all([
    getBlock("seminario", "intro"),
    getBlock("seminario", "objetivo"),
    getBlock("seminario", "cta"),
    getListBlock("seminario", "list:ediciones"),
  ]);

  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pb-11 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Eventos", href: "/eventos" },
                { label: "Seminario IUCE" },
              ]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            El encuentro anual de los grupos de investigación
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            Seminario IUCE
          </h1>
          <div
            className="page-block max-w-[80ch] text-base leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        </div>
      </section>

      {/* Para qué sirve */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <Reveal from="scale">
            <div className="flex flex-col items-start gap-5 rounded-xl border border-gray-200 border-l-[3px] border-l-usal-red bg-surface-tinted p-7 sm:flex-row">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-iuce-blue-dark text-white">
                <Users2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div
                className="page-block max-w-[95ch] text-base leading-relaxed text-gray-700"
                dangerouslySetInnerHTML={{ __html: objetivo }}
              />
            </div>
          </Reveal>
        </div>

        {/* Ediciones por año */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
            Ediciones
          </h2>
          <div className="flex flex-col gap-5">
            {ediciones.map((e, i) => {
              const noticia = String(e.enlaceNoticia ?? "");
              const actas = String(e.enlaceActas ?? "");
              return (
                <Reveal key={i} delay={i * 90}>
                  <article className="card-lift grid grid-cols-1 gap-5 rounded-xl border border-gray-200 bg-surface-card p-7 shadow-sm hover:shadow-md sm:grid-cols-[auto_1fr]">
                    <div className="flex h-[72px] w-[72px] flex-none items-center justify-center rounded-xl bg-iuce-blue-dark text-xl font-bold text-white">
                      {String(e.anio)}
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-lg font-bold text-gray-900">
                        {String(e.titulo)}
                      </h3>
                      <p className="mb-4 max-w-[90ch] text-sm leading-relaxed text-gray-600">
                        {String(e.texto)}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        {noticia ? (
                          <Link
                            href={noticia}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-iuce-blue hover:underline"
                          >
                            Leer la crónica
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        ) : null}
                        {actas ? (
                          <a
                            href={actas}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                              buttonClassName({ variant: "outline", size: "sm" }) +
                              " gap-1.5"
                            }
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            Actas de la edición (PDF)
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF9C3] px-3 py-1 text-xs font-semibold text-[#A16207]">
                            <Hourglass className="h-3.5 w-3.5" aria-hidden="true" />
                            Actas en preparación
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-gray-400">
            Cada edición se añade desde el panel de administración con su
            crónica y sus actas.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-surface-tinted">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div
            className="page-block text-sm text-gray-600 [&_strong]:text-base [&_strong]:font-semibold [&_strong]:text-gray-900"
            dangerouslySetInnerHTML={{ __html: cta }}
          />
          <a href="mailto:iuce@usal.es" className={buttonClassName() + " flex-none"}>
            Contactar con el IUCE
          </a>
        </div>
      </section>
    </>
  );
}
