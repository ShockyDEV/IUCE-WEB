import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionSubnav } from "@/components/layout/section-subnav";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { ChartCard } from "@/components/stats/chart-card";
import {
  AreaTrend,
  BarsChart,
  BarsWithLine,
  DonutChart,
  DuoBarsChart,
  HBarsChart,
  type Datum,
} from "@/components/stats/stat-charts";
import { getBlock, getListBlock } from "@/lib/content-blocks-service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "El IUCE en cifras",
  description:
    "Estadísticas del IUCE 2020–2025: proyectos de investigación, transferencia, tesis doctorales, formación del profesorado, redes y movilidad.",
};

const subnav = [
  { id: "proyectos", label: "Proyectos" },
  { id: "transferencia", label: "Transferencia" },
  { id: "doctorado", label: "Doctorado" },
  { id: "formacion", label: "Formación" },
  { id: "redes", label: "Redes y movilidad" },
  { id: "gestion", label: "Gestión y posgrado" },
];

/** «2.288» / «250,5» / «11527» → número (formato es-ES tolerado). */
function num(v: unknown): number {
  const n = Number(String(v ?? "").trim().replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function toData(rows: Array<Record<string, unknown>>): Datum[] {
  return rows
    .filter((r) => String(r.etiqueta ?? "").trim() !== "")
    .map((r) => ({
      label: String(r.etiqueta),
      value: num(r.valor),
      ...(r.valor2 !== undefined && String(r.valor2).trim() !== ""
        ? { value2: num(r.valor2) }
        : {}),
    }));
}

function SectionHeader({
  id,
  eyebrow,
  title,
  html,
}: Readonly<{ id: string; eyebrow: string; title: string; html: string }>) {
  return (
    <div id={id} className="mb-7 scroll-mt-24">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-usal-red">
        {eyebrow}
      </p>
      <h2 className="mb-2.5 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      <div
        className="page-block max-w-[85ch] text-base leading-relaxed text-gray-600"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default async function EstadisticasPage() {
  // Textos y datos editables desde el panel (Contenido → Páginas → Estadísticas)
  const [
    intro,
    proyectosDesc,
    transferenciaDesc,
    doctoradoDesc,
    formacionDesc,
    redesDesc,
    gestionDesc,
    notaFuente,
    kpis,
    proyectosAno,
    proyectosImporte,
    financiadoras,
    contratosImporte,
    contratosEntidades,
    contratosImplicacion,
    tesis,
    tesisMenciones,
    tfm,
    formacionPdi,
    formacionHoras,
    estanciasPais,
    redesAmbito,
    posgradosCurso,
    gestionCargos,
  ] = await Promise.all([
    getBlock("estadisticas", "intro"),
    getBlock("estadisticas", "proyectos-descripcion"),
    getBlock("estadisticas", "transferencia-descripcion"),
    getBlock("estadisticas", "doctorado-descripcion"),
    getBlock("estadisticas", "formacion-descripcion"),
    getBlock("estadisticas", "redes-descripcion"),
    getBlock("estadisticas", "gestion-descripcion"),
    getBlock("estadisticas", "nota-fuente"),
    getListBlock("estadisticas", "list:kpis"),
    getListBlock("estadisticas", "list:proyectos-por-ano"),
    getListBlock("estadisticas", "list:proyectos-importe"),
    getListBlock("estadisticas", "list:proyectos-financiadoras"),
    getListBlock("estadisticas", "list:contratos-importe"),
    getListBlock("estadisticas", "list:contratos-entidades"),
    getListBlock("estadisticas", "list:contratos-implicacion"),
    getListBlock("estadisticas", "list:tesis-por-ano"),
    getListBlock("estadisticas", "list:tesis-menciones"),
    getListBlock("estadisticas", "list:tfm-por-ano"),
    getListBlock("estadisticas", "list:formacion-plan-pdi"),
    getListBlock("estadisticas", "list:formacion-horas"),
    getListBlock("estadisticas", "list:estancias-pais"),
    getListBlock("estadisticas", "list:redes-ambito"),
    getListBlock("estadisticas", "list:posgrados-curso"),
    getListBlock("estadisticas", "list:gestion-cargos"),
  ]);

  return (
    <>
      {/* Cabecera con contadores */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "El IUCE en cifras" }]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            Memoria 2020–2025
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            El IUCE en cifras
          </h1>
          <div
            className="page-block max-w-[80ch] text-base leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: intro }}
          />

          <div className="mt-9 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
            {kpis.map((k, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="h-full rounded-xl border border-gray-200 bg-surface-page p-4">
                  <p className="text-[27px] font-bold leading-tight text-ink">
                    <CountUp value={String(k.cifra)} />
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-gray-500">
                    {String(k.texto)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8">
            <SectionSubnav items={subnav} />
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="proyectos"
            eyebrow="Investigación competitiva"
            title="Proyectos de investigación"
            html={proyectosDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title="Proyectos iniciados por año"
              insight="Convocatorias competitivas con participación del IUCE"
            >
              <BarsChart data={toData(proyectosAno)} name="Proyectos" />
            </ChartCard>
            <ChartCard
              title="Importe acumulado captado"
              insight="En miles de euros — el salto de 2023 casi triplica el total"
              delay={90}
            >
              <AreaTrend
                data={toData(proyectosImporte)}
                name="Acumulado"
                format="milesEuro"
              />
            </ChartCard>
            <ChartCard
              title="¿Quién financia la investigación del IUCE?"
              insight="Proyectos por entidad financiadora (2020–2025)"
              wide
            >
              <HBarsChart data={toData(financiadoras)} name="Proyectos" />
            </ChartCard>
          </div>
        </div>
      </section>

      {/* Transferencia */}
      <section className="border-y border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="transferencia"
            eyebrow="Contratos y convenios"
            title="Transferencia de conocimiento"
            html={transferenciaDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title="Importe contratado por año"
              insight="Contratos y convenios de transferencia (art. 60 LOSU)"
              wide
            >
              <BarsChart
                data={toData(contratosImporte)}
                name="Importe"
                format="euro"
                accent
              />
            </ChartCard>
            <ChartCard
              title="Principales entidades contratantes"
              insight="Fundaciones, administraciones y empresas"
            >
              <HBarsChart data={toData(contratosEntidades)} name="Contratos" />
            </ChartCard>
            <ChartCard
              title="Grado de implicación del IUCE"
              insight="En 2 de cada 3 contratos, el trabajo es 100% del Instituto"
              delay={90}
            >
              <DonutChart
                data={toData(contratosImplicacion)}
                name="Contratos"
                centerLabel="contratos"
              />
            </ChartCard>
          </div>
        </div>
      </section>

      {/* Doctorado */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="doctorado"
            eyebrow="Tesis y TFM"
            title="Doctorado y posgrado dirigido"
            html={doctoradoDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title="Tesis doctorales defendidas"
              insight="Por año y acumulado del periodo"
              wide
            >
              <BarsWithLine
                data={toData(tesis)}
                name="Tesis del año"
                name2="Acumulado"
              />
            </ChartCard>
            <ChartCard
              title="Calidad de las tesis"
              insight="El 91% obtiene la máxima calificación (Cum Laude)"
            >
              <DonutChart
                data={toData(tesisMenciones)}
                name="Tesis"
                centerLabel="tesis"
              />
            </ChartCard>
            <ChartCard
              title="TFM dirigidos por año"
              insight="2025 marca el máximo del periodo: 61 trabajos"
              delay={90}
            >
              <BarsChart data={toData(tfm)} name="TFM" />
            </ChartCard>
          </div>
        </div>
      </section>

      {/* Formación */}
      <section className="border-y border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="formacion"
            eyebrow="Formación continua"
            title="Formación del profesorado"
            html={formacionDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title="Plan de Formación del PDI"
              insight="Cursos impartidos y recibidos por el personal del IUCE"
            >
              <DuoBarsChart
                data={toData(formacionPdi)}
                name="Impartidas"
                name2="Recibidas"
              />
            </ChartCard>
            <ChartCard
              title="Horas de formación por bloque"
              insight="Más de 2.600 horas en el periodo"
              delay={90}
            >
              <HBarsChart data={toData(formacionHoras)} name="Horas" />
            </ChartCard>
          </div>
        </div>
      </section>

      {/* Redes y movilidad */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="redes"
            eyebrow="Proyección exterior"
            title="Redes y movilidad"
            html={redesDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title="Estancias por país de destino"
              insight="34 estancias de investigación en 12 países"
            >
              <HBarsChart data={toData(estanciasPais)} name="Estancias" />
            </ChartCard>
            <ChartCard
              title="Redes de investigación por ámbito"
              insight="Más de la mitad son internacionales"
              delay={90}
            >
              <DonutChart
                data={toData(redesAmbito)}
                name="Redes"
                centerLabel="redes"
              />
            </ChartCard>
          </div>
        </div>
      </section>

      {/* Gestión y posgrado */}
      <section className="border-t border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="gestion"
            eyebrow="Compromiso institucional"
            title="Gestión y docencia de posgrado"
            html={gestionDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title="Posgrados con docencia del IUCE"
              insight="Títulos por curso académico — 2024-25 duplica la cifra"
            >
              <BarsChart data={toData(posgradosCurso)} name="Posgrados" accent />
            </ChartCard>
            <ChartCard
              title="Cargos de gestión activos"
              insight="Acumulado: comisiones, direcciones, comités y evaluación"
              delay={90}
            >
              <AreaTrend data={toData(gestionCargos)} name="Cargos" />
            </ChartCard>
          </div>

          <div
            className="page-block mt-10 border-t border-gray-100 pt-5 text-xs leading-relaxed text-gray-400"
            dangerouslySetInnerHTML={{ __html: notaFuente }}
          />
        </div>
      </section>
    </>
  );
}
