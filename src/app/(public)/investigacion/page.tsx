import type { Metadata } from "next";
import { ArrowUpRight, ExternalLink, User, Users } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionSubnav } from "@/components/layout/section-subnav";
import { buttonClassName } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Investigación",
  description:
    "Grupos de investigación, proyectos y publicaciones del IUCE: investigación interdisciplinar sobre los procesos de formación en Educación Superior.",
};

const subnav = [
  { id: "grupos", label: "Grupos" },
  { id: "proyectos", label: "Proyectos" },
  { id: "publicaciones", label: "Publicaciones" },
];

const grupos = [
  {
    acronym: "GRIAL",
    chip: "UIC 081",
    desc: "Interacción y eLearning. Unidad de Investigación Consolidada de Castilla y León.",
    lead: "F. J. García Peñalvo",
    url: "https://grial.usal.es",
    urlLabel: "grial.usal.es",
    team: false,
  },
  {
    acronym: "GITE",
    desc: "Grupo de Investigación en Tecnología Educativa: integración de las TIC en los procesos de enseñanza.",
    lead: "A. García-Valcárcel",
    team: false,
  },
  {
    acronym: "OCA",
    desc: "Observatorio de Contenidos Audiovisuales: comunicación, educación mediática y opinión pública.",
    lead: "J. J. Igartua",
    team: false,
  },
  {
    acronym: "VisualMed System",
    desc: "Visualización médica y tecnologías aplicadas a la formación en Ciencias de la Salud. Premio Ennova Health 2025.",
    lead: "J. A. Juanes",
    team: false,
  },
  {
    acronym: "Robótica y Sociedad",
    desc: "Robótica educativa, pensamiento computacional e impacto social de la automatización.",
    lead: "Equipo interdisciplinar",
    team: true,
  },
  {
    acronym: "E-LECTRA",
    desc: "Lectura, edición digital y sociedad de la información: libro electrónico y humanidades digitales.",
    lead: "J. A. Cordón",
    team: false,
  },
];

const proyectos = [
  {
    title: "Competencia digital docente y evaluación auténtica en la universidad",
    meta: "Plan Estatal de Investigación · IP: Susana Olmos Migueláñez",
    years: "2024–2027",
  },
  {
    title:
      "DIDEROT — Didácticas digitales de la expresión musical y las artes performativas",
    meta: "Universidad de Salamanca · IP: Javier Merchán Sánchez-Jara",
    years: "2023–2026",
  },
  {
    title: "Analítica del aprendizaje para la mejora de la retención universitaria",
    meta: "Junta de Castilla y León · IP: Fernando Martínez Abad",
    years: "2025–2028",
  },
  {
    title: "Alfabetización mediática y contenidos audiovisuales en la adolescencia",
    meta: "Observatorio de Contenidos Audiovisuales · IP: Juan José Igartua",
    years: "2024–2026",
  },
];

const articulos = [
  {
    eyebrow: "Artículo · 2026",
    title:
      "Inteligencia artificial generativa en la evaluación universitaria: usos y límites",
    authors: "García-Peñalvo, F. J. et al.",
    journal: "Education in the Knowledge Society",
  },
  {
    eyebrow: "Artículo · 2025",
    title:
      "Evaluación diagnóstica de competencias informacionales en el acceso a la universidad",
    authors: "Martínez-Abad, F.; Olmos-Migueláñez, S.",
    journal: "RELIEVE",
  },
  {
    eyebrow: "Artículo · 2025",
    title: "Objetos de aprendizaje reutilizables para la formación del profesorado",
    authors: "Morales Morgado, E. M. et al.",
    journal: "Comunicar",
  },
];

export default function InvestigacionPage() {
  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "Investigación" }]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            Investigación
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            La investigación del IUCE
          </h1>
          <p className="max-w-[75ch] text-base leading-relaxed text-gray-600">
            Investigación interdisciplinar, básica y aplicada, sobre los
            procesos de formación en Educación Superior: evaluación educativa,
            tecnología, comunicación y transferencia al sistema educativo.
          </p>
          <div className="mt-7">
            <SectionSubnav items={subnav} />
          </div>
        </div>
      </section>

      {/* Grupos */}
      <section id="grupos" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-7">
            <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
              Grupos de investigación
            </h2>
            <p className="max-w-[75ch] text-sm text-gray-500">
              Grupos de Investigación Reconocidos de la USAL vinculados al
              Instituto.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grupos.map((g) => {
              const LeadIcon = g.team ? Users : User;
              return (
                <article
                  key={g.acronym}
                  className="flex flex-col gap-2.5 rounded-xl border border-gray-200 bg-surface-card p-[22px] shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-ink">{g.acronym}</h3>
                    {g.chip ? (
                      <span className="rounded-full bg-iuce-blue-pale px-2.5 py-[3px] text-[10px] font-bold tracking-[.04em] text-ink">
                        {g.chip}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-normal text-gray-600">
                    {g.desc}
                  </p>
                  <p className="mt-auto flex items-center gap-1.5 text-xs text-gray-500">
                    <LeadIcon
                      className="h-[13px] w-[13px] flex-none"
                      aria-hidden="true"
                    />
                    {g.lead}
                    {g.url ? (
                      <>
                        {" · "}
                        <a
                          href={g.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-iuce-blue hover:underline"
                        >
                          {g.urlLabel} ↗
                        </a>
                      </>
                    ) : null}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section
        id="proyectos"
        className="scroll-mt-20 border-y border-gray-200 bg-surface-card"
      >
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
            Proyectos
          </h2>
          <p className="mb-6 max-w-[80ch] text-sm text-gray-500">
            Selección de proyectos activos con participación de investigadores
            del Instituto. El listado completo se gestiona desde el panel de
            administración.
          </p>
          <div className="flex flex-col">
            {proyectos.map((p, i) => (
              <article
                key={p.title}
                className={
                  "grid grid-cols-1 items-center gap-3 border-t border-gray-100 py-[18px] sm:grid-cols-[1fr_auto] sm:gap-6" +
                  (i === proyectos.length - 1 ? " border-b" : "")
                }
              >
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500">{p.meta}</p>
                </div>
                <span className="justify-self-start whitespace-nowrap rounded-full bg-iuce-blue-pale px-3 py-1 text-xs font-medium text-ink sm:justify-self-auto">
                  {p.years}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Publicaciones */}
      <section id="publicaciones" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-14">
          <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
            Publicaciones
          </h2>
          <p className="mb-6 max-w-[80ch] text-sm text-gray-500">
            La producción científica del Instituto se difunde principalmente a
            través de la revista EKS y del Portal de Investigación de la USAL.
          </p>

          <div className="mb-6 flex flex-col items-start gap-6 rounded-xl border border-gray-200 bg-surface-tinted p-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-[18px]">
              <span className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-md bg-iuce-blue-dark text-base font-bold text-white">
                EKS
              </span>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Education in the Knowledge Society
                </p>
                <p className="mt-0.5 max-w-[60ch] text-sm text-gray-600">
                  Revista científica del IUCE en acceso abierto: investigación
                  interdisciplinar sobre la Sociedad del Conocimiento y los
                  procesos educativos mediados por tecnología.
                </p>
              </div>
            </div>
            <a
              href="https://revistas.usal.es/index.php/eks"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName() + " flex-none gap-1.5"}
            >
              Visitar la revista
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articulos.map((a) => (
              <article
                key={a.title}
                className="rounded-xl border border-gray-200 bg-surface-card p-5 shadow-sm"
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-usal-red">
                  {a.eyebrow}
                </p>
                <p className="mb-2 text-sm font-semibold leading-normal text-gray-900">
                  {a.title}
                </p>
                <p className="text-xs text-gray-500">
                  {a.authors} — <em>{a.journal}</em>
                </p>
              </article>
            ))}
          </div>
          <a
            href="https://produccioncientifica.usal.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-iuce-blue hover:underline"
          >
            Perfil del IUCE en el Portal de Investigación de la USAL
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
