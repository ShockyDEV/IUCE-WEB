import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2 } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buttonClassName } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ChartCard } from "@/components/stats/chart-card";
import { BarsChart, DonutChart, type Datum } from "@/components/stats/stat-charts";
import { getBlock, getBlockText, getListBlock } from "@/lib/content-blocks-service";
import { iconFor } from "@/lib/icon-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transferencia de conocimiento",
  description:
    "La transferencia de conocimiento es uno de los objetivos principales del IUCE: contratos y convenios (art. 60), formación a demanda, propiedad industrial y divulgación.",
};

function num(v: unknown): number {
  const n = Number(String(v ?? "").trim().replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function toData(rows: Array<Record<string, unknown>>): Datum[] {
  return rows
    .filter((r) => String(r.etiqueta ?? "").trim() !== "")
    .map((r) => ({ label: String(r.etiqueta), value: num(r.valor) }));
}

export default async function TransferenciaPage() {
  // Textos editables (Contenido → Páginas → Transferencia). Las gráficas
  // leen las MISMAS listas que /estadisticas: un solo lugar que actualizar.
  const [intro, mision, urlOtc, otcDescripcion, cta, vias, importe, implicacion] =
    await Promise.all([
      getBlock("transferencia", "intro"),
      getBlock("transferencia", "mision"),
      getBlockText("transferencia", "url-otc"),
      getBlock("transferencia", "otc-descripcion"),
      getBlock("transferencia", "cta"),
      getListBlock("transferencia", "list:vias"),
      getListBlock("estadisticas", "list:contratos-importe"),
      getListBlock("estadisticas", "list:contratos-implicacion"),
    ]);

  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pb-11 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "Transferencia" }]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            Investigación al servicio de la sociedad
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            Transferencia de conocimiento
          </h1>
          <div
            className="page-block max-w-[80ch] text-base leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        </div>
      </section>

      {/* Misión */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pt-14">
          <Reveal from="scale">
            <div className="rounded-xl border border-gray-200 border-l-[3px] border-l-usal-red bg-surface-tinted p-7">
              <div
                className="page-block max-w-[95ch] text-base leading-relaxed text-gray-700"
                dangerouslySetInnerHTML={{ __html: mision }}
              />
            </div>
          </Reveal>
        </div>

        {/* Vías de transferencia */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
            Cómo transferimos
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vias.map((v, i) => {
              const Icon = iconFor(v.icon);
              return (
                <Reveal key={i} delay={i * 90} className="h-full">
                  <article className="card-lift flex h-full flex-col gap-3 rounded-xl border border-gray-200 bg-surface-card p-6 shadow-sm hover:shadow-md">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">
                      {String(v.titulo)}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {String(v.texto)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* La transferencia, en datos */}
      <section className="border-y border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
                La transferencia, en datos
              </h2>
              <p className="max-w-[75ch] text-sm text-gray-500">
                64 contratos y convenios con 36 entidades durante 2020–2025.
              </p>
            </div>
            <Link
              href="/estadisticas#transferencia"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-iuce-blue hover:underline"
            >
              Ver todas las estadísticas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title="Importe contratado por año"
              insight="Contratos y convenios de transferencia (art. 60 LOSU)"
            >
              <BarsChart data={toData(importe)} name="Importe" format="euro" accent />
            </ChartCard>
            <ChartCard
              title="Grado de implicación del IUCE"
              insight="En 2 de cada 3 contratos, el trabajo es 100% del Instituto"
              delay={90}
            >
              <DonutChart
                data={toData(implicacion)}
                name="Contratos"
                centerLabel="contratos"
              />
            </ChartCard>
          </div>
        </div>
      </section>

      {/* OTC USAL */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-xl border border-gray-200 bg-surface-card p-7 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5 sm:items-center">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-iuce-blue-dark text-white">
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    Oficina de Transferencia de Conocimiento de la USAL
                  </p>
                  <div
                    className="page-block mt-0.5 max-w-[70ch] text-sm leading-relaxed text-gray-600"
                    dangerouslySetInnerHTML={{ __html: otcDescripcion }}
                  />
                </div>
              </div>
              {urlOtc ? (
                <a
                  href={urlOtc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName({ variant: "outline" }) + " flex-none gap-1.5"}
                >
                  transferencia.usal.es
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </Reveal>
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
