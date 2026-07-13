import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionSubnav } from "@/components/layout/section-subnav";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { ChartCard } from "@/components/stats/chart-card";
import {
  BarsChart,
  DonutChart,
  DuoBarsChart,
  HBarsChart,
  type Datum,
} from "@/components/stats/stat-charts";
import {
  getBlock,
  getBlockText,
  getListBlock,
} from "@/lib/content-blocks-service";
import { withLocale } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Estadísticas del IUCE",
  description:
    "Estadísticas del IUCE 2020–2025: proyectos de investigación, transferencia, tesis doctorales, formación del profesorado, redes y movilidad.",
};

// Textos fijos de la página en ambos idiomas (los textos de sección y las
// etiquetas de datos de las gráficas llegan ya traducidos desde el servicio
// de bloques).
const T = {
  es: {
    inicio: "Inicio",
    estadisticas: "Estadísticas",
    titulo: "Estadísticas del IUCE",
    navProyectos: "Proyectos",
    navTransferencia: "Transferencia",
    navDoctorado: "Doctorado",
    navFormacion: "Formación",
    navRedes: "Redes y movilidad",
    navGestion: "Gestión y posgrado",
    proyectosEyebrow: "Investigación competitiva",
    proyectosTitulo: "Proyectos de investigación",
    proyectosAnoTitulo: "Proyectos iniciados por año",
    proyectosAnoInsight:
      "Convocatorias competitivas con participación del IUCE",
    proyectosSerie: "Proyectos",
    importeAnoTitulo: "Importe concedido por año",
    importeAnoInsight:
      "En miles de euros — 2023 concentra la mayor financiación",
    importeSerie: "Importe",
    financiadorasTitulo: "¿Quién financia la investigación del IUCE?",
    financiadorasInsight: "Proyectos por entidad financiadora (2020–2025)",
    transferenciaEyebrow: "Contratos y convenios",
    transferenciaTitulo: "Transferencia de conocimiento",
    contratosImporteTitulo: "Importe contratado por año",
    contratosImporteInsight:
      "Contratos y convenios de transferencia (art. 60 LOSU)",
    entidadesTitulo: "Principales entidades contratantes",
    entidadesInsight: "Fundaciones, administraciones y empresas",
    contratosSerie: "Contratos",
    implicacionTitulo: "Grado de implicación del IUCE",
    implicacionInsight:
      "En 2 de cada 3 contratos, el trabajo es 100% del Instituto",
    contratosCentro: "contratos",
    doctoradoEyebrow: "Tesis y TFM",
    doctoradoTitulo: "Doctorado y posgrado dirigido",
    tesisTitulo: "Tesis doctorales defendidas por año",
    tesisInsight: "101 tesis en el conjunto del periodo",
    tesisSerie: "Tesis",
    mencionesTitulo: "Calidad de las tesis",
    mencionesInsight: "El 91% obtiene la máxima calificación (Cum Laude)",
    tesisCentro: "tesis",
    tfmTitulo: "TFM dirigidos por año",
    tfmInsight: "2025 marca el máximo del periodo: 61 trabajos",
    tfmSerie: "TFM",
    gredosTfm:
      "Consulta los TFM en Gredos, el repositorio institucional de la USAL ↗",
    formacionEyebrow: "Formación continua",
    formacionTitulo: "Formación del profesorado",
    pdiTitulo: "Plan de Formación del PDI",
    pdiInsight: "Cursos impartidos y recibidos por el personal del IUCE",
    pdiSerie1: "Impartidas",
    pdiSerie2: "Recibidas",
    horasTitulo: "Horas de formación por bloque",
    horasInsight: "Más de 2.600 horas en el periodo",
    horasSerie: "Horas",
    redesEyebrow: "Proyección exterior",
    redesTitulo: "Redes y movilidad",
    estanciasTitulo: "Estancias por país de destino",
    estanciasInsight: "26 estancias de investigación en 12 países",
    estanciasSerie: "Estancias",
    ambitoTitulo: "Redes de investigación por ámbito",
    ambitoInsight: "Más de la mitad son internacionales",
    redesSerie: "Redes",
    redesCentro: "redes",
    gestionEyebrow: "Compromiso institucional",
    gestionTitulo: "Gestión y docencia de posgrado",
    posgradosTitulo: "Posgrados con docencia del IUCE",
    posgradosInsight: "Títulos por curso académico — 2024-25 duplica la cifra",
    posgradosSerie: "Posgrados",
    cargosTitulo: "Cargos de gestión por categoría",
    cargosInsight:
      "Comisiones, comités editoriales, dirección de grupos y evaluación",
    cargosSerie: "Cargos",
  },
  en: {
    inicio: "Home",
    estadisticas: "Statistics",
    titulo: "IUCE statistics",
    navProyectos: "Projects",
    navTransferencia: "Knowledge transfer",
    navDoctorado: "PhD",
    navFormacion: "Training",
    navRedes: "Networks and mobility",
    navGestion: "Management and postgraduate",
    proyectosEyebrow: "Competitive research",
    proyectosTitulo: "Research projects",
    proyectosAnoTitulo: "Projects started per year",
    proyectosAnoInsight: "Competitive calls with IUCE participation",
    proyectosSerie: "Projects",
    importeAnoTitulo: "Funding awarded per year",
    importeAnoInsight:
      "In thousands of euros — 2023 accounts for the largest share of funding",
    importeSerie: "Amount",
    financiadorasTitulo: "Who funds IUCE research?",
    financiadorasInsight: "Projects by funding body (2020–2025)",
    transferenciaEyebrow: "Contracts and agreements",
    transferenciaTitulo: "Knowledge transfer",
    contratosImporteTitulo: "Contracted amount per year",
    contratosImporteInsight:
      "Knowledge transfer contracts and agreements (art. 60 LOSU)",
    entidadesTitulo: "Main contracting entities",
    entidadesInsight: "Foundations, public administrations and companies",
    contratosSerie: "Contracts",
    implicacionTitulo: "IUCE's degree of involvement",
    implicacionInsight:
      "In 2 out of 3 contracts, 100% of the work is the Institute's",
    contratosCentro: "contracts",
    doctoradoEyebrow: "Theses and master's dissertations",
    doctoradoTitulo: "PhD and supervised postgraduate work",
    tesisTitulo: "Doctoral theses defended per year",
    tesisInsight: "101 theses over the whole period",
    tesisSerie: "Theses",
    mencionesTitulo: "Quality of the theses",
    mencionesInsight: "91% earn the highest grade (Cum Laude)",
    tesisCentro: "theses",
    tfmTitulo: "Master's dissertations supervised per year",
    tfmInsight: "2025 marks the period's peak: 61 dissertations",
    tfmSerie: "Dissertations",
    gredosTfm:
      "Browse the master's dissertations in Gredos, the institutional repository of the USAL ↗",
    formacionEyebrow: "Continuing education",
    formacionTitulo: "Teacher training",
    pdiTitulo: "Academic Staff Training Plan (PDI)",
    pdiInsight: "Courses taught and attended by IUCE staff",
    pdiSerie1: "Taught",
    pdiSerie2: "Attended",
    horasTitulo: "Training hours by block",
    horasInsight: "More than 2,600 hours over the period",
    horasSerie: "Hours",
    redesEyebrow: "International outreach",
    redesTitulo: "Networks and mobility",
    estanciasTitulo: "Research stays by destination country",
    estanciasInsight: "26 research stays in 12 countries",
    estanciasSerie: "Stays",
    ambitoTitulo: "Research networks by scope",
    ambitoInsight: "More than half are international",
    redesSerie: "Networks",
    redesCentro: "networks",
    gestionEyebrow: "Institutional commitment",
    gestionTitulo: "Management and postgraduate teaching",
    posgradosTitulo: "Postgraduate programmes with IUCE teaching",
    posgradosInsight:
      "Degrees per academic year — 2024-25 doubles the figure",
    posgradosSerie: "Programmes",
    cargosTitulo: "Management positions by category",
    cargosInsight:
      "Committees, editorial boards, research group leadership and evaluation",
    cargosSerie: "Positions",
  },
} as const;

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
  const locale = getLocale();
  const t = T[locale];
  const href = (path: string) => withLocale(path, locale);
  const subnav = [
    { id: "proyectos", label: t.navProyectos },
    { id: "transferencia", label: t.navTransferencia },
    { id: "doctorado", label: t.navDoctorado },
    { id: "formacion", label: t.navFormacion },
    { id: "redes", label: t.navRedes },
    { id: "gestion", label: t.navGestion },
  ];
  // Textos y datos editables desde el panel (Contenido → Páginas → Estadísticas)
  const [
    heroEyebrow,
    intro,
    urlGredosTfm,
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
    gestionCategorias,
  ] = await Promise.all([
    getBlockText("estadisticas", "hero-eyebrow"),
    getBlock("estadisticas", "intro"),
    getBlockText("estadisticas", "url-gredos-tfm"),
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
    getListBlock("estadisticas", "list:gestion-categorias"),
  ]);

  return (
    <>
      {/* Cabecera con contadores */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[
                { label: t.inicio, href: href("/") },
                { label: t.estadisticas },
              ]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            {heroEyebrow}
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            {t.titulo}
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
            eyebrow={t.proyectosEyebrow}
            title={t.proyectosTitulo}
            html={proyectosDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title={t.proyectosAnoTitulo}
              insight={t.proyectosAnoInsight}
            >
              <BarsChart data={toData(proyectosAno)} name={t.proyectosSerie} />
            </ChartCard>
            <ChartCard
              title={t.importeAnoTitulo}
              insight={t.importeAnoInsight}
              delay={90}
            >
              <BarsChart
                data={toData(proyectosImporte)}
                name={t.importeSerie}
                format="milesEuro"
              />
            </ChartCard>
            <ChartCard
              title={t.financiadorasTitulo}
              insight={t.financiadorasInsight}
              wide
            >
              <HBarsChart
                data={toData(financiadoras)}
                name={t.proyectosSerie}
              />
            </ChartCard>
          </div>
        </div>
      </section>

      {/* Transferencia */}
      <section className="border-y border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="transferencia"
            eyebrow={t.transferenciaEyebrow}
            title={t.transferenciaTitulo}
            html={transferenciaDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard
              title={t.contratosImporteTitulo}
              insight={t.contratosImporteInsight}
              wide
            >
              <BarsChart
                data={toData(contratosImporte)}
                name={t.importeSerie}
                format="euro"
                accent
              />
            </ChartCard>
            <ChartCard title={t.entidadesTitulo} insight={t.entidadesInsight}>
              <HBarsChart
                data={toData(contratosEntidades)}
                name={t.contratosSerie}
              />
            </ChartCard>
            <ChartCard
              title={t.implicacionTitulo}
              insight={t.implicacionInsight}
              delay={90}
            >
              <DonutChart
                data={toData(contratosImplicacion)}
                name={t.contratosSerie}
                centerLabel={t.contratosCentro}
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
            eyebrow={t.doctoradoEyebrow}
            title={t.doctoradoTitulo}
            html={doctoradoDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard title={t.tesisTitulo} insight={t.tesisInsight} wide>
              <BarsChart data={toData(tesis)} name={t.tesisSerie} />
            </ChartCard>
            <ChartCard title={t.mencionesTitulo} insight={t.mencionesInsight}>
              <DonutChart
                data={toData(tesisMenciones)}
                name={t.tesisSerie}
                centerLabel={t.tesisCentro}
              />
            </ChartCard>
            <ChartCard
              title={t.tfmTitulo}
              insight={t.tfmInsight}
              delay={90}
            >
              <BarsChart data={toData(tfm)} name={t.tfmSerie} />
              {urlGredosTfm ? (
                <p className="mt-3 border-t border-gray-100 pt-3 text-[13px]">
                  <a
                    href={urlGredosTfm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-iuce-blue hover:underline"
                  >
                    {t.gredosTfm}
                  </a>
                </p>
              ) : null}
            </ChartCard>
          </div>
        </div>
      </section>

      {/* Formación */}
      <section className="border-y border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="formacion"
            eyebrow={t.formacionEyebrow}
            title={t.formacionTitulo}
            html={formacionDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard title={t.pdiTitulo} insight={t.pdiInsight}>
              <DuoBarsChart
                data={toData(formacionPdi)}
                name={t.pdiSerie1}
                name2={t.pdiSerie2}
              />
            </ChartCard>
            <ChartCard
              title={t.horasTitulo}
              insight={t.horasInsight}
              delay={90}
            >
              <HBarsChart data={toData(formacionHoras)} name={t.horasSerie} />
            </ChartCard>
          </div>
        </div>
      </section>

      {/* Redes y movilidad */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <SectionHeader
            id="redes"
            eyebrow={t.redesEyebrow}
            title={t.redesTitulo}
            html={redesDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard title={t.estanciasTitulo} insight={t.estanciasInsight}>
              <HBarsChart
                data={toData(estanciasPais)}
                name={t.estanciasSerie}
              />
            </ChartCard>
            <ChartCard
              title={t.ambitoTitulo}
              insight={t.ambitoInsight}
              delay={90}
            >
              <DonutChart
                data={toData(redesAmbito)}
                name={t.redesSerie}
                centerLabel={t.redesCentro}
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
            eyebrow={t.gestionEyebrow}
            title={t.gestionTitulo}
            html={gestionDesc}
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartCard title={t.posgradosTitulo} insight={t.posgradosInsight}>
              <BarsChart
                data={toData(posgradosCurso)}
                name={t.posgradosSerie}
                accent
              />
            </ChartCard>
            <ChartCard
              title={t.cargosTitulo}
              insight={t.cargosInsight}
              delay={90}
            >
              <HBarsChart
                data={toData(gestionCategorias)}
                name={t.cargosSerie}
              />
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
