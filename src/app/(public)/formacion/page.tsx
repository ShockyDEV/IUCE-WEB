import type { Metadata } from "next";
import {
  ArrowDown,
  BadgeCheck,
  CalendarDays,
  History,
  Map,
  MailQuestion,
  MonitorPlay,
  Sprout,
  Users,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Formación",
  description:
    "Plan de Formación Docente 2026 de la Universidad de Salamanca: formación permanente del PDI, SPOCs y Formación Docente Inicial (FDI) de las universidades públicas de Castilla y León.",
};

const destinatarios = [
  {
    icon: Users,
    title: "Todo el PDI de la USAL",
    desc: "Formación permanente a lo largo de la carrera docente, dentro del Plan General.",
  },
  {
    icon: Sprout,
    title: "Profesorado novel",
    desc: "Contratos predoctorales, posdoctorales y ayudantes doctores con tareas docentes asignadas.",
  },
  {
    icon: BadgeCheck,
    title: "Profesorado asociado acreditado",
    desc: "Con acreditación a ayudante doctor y docencia asignada, para la formación inicial.",
  },
];

const actividades = [
  {
    icon: CalendarDays,
    accent: "blue" as const,
    title: "Plan General 2026",
    desc: "Cursos, talleres y seminarios presenciales y en línea a lo largo de todo el año: metodologías docentes, evaluación, tecnología educativa, idiomas o gestión de datos de investigación.",
    cta: "Consultar convocatoria →",
  },
  {
    icon: MonitorPlay,
    accent: "blue" as const,
    title: "SPOCs USAL",
    desc: "Cursos online en formato SPOC para la formación autónoma del profesorado, disponibles dentro del Plan de Formación.",
    cta: "Ver catálogo →",
  },
  {
    icon: Map,
    accent: "red" as const,
    title: "Formación Docente Inicial",
    desc: "Programa conjunto de las universidades públicas de Castilla y León para el profesorado ayudante doctor en su primer año de contrato.",
    cta: "Más información ↓",
    href: "#inicial",
  },
];

const unidades = [
  { sigla: "USAL", nombre: "IUCE — Instituto Universitario de Ciencias de la Educación", own: true },
  { sigla: "UBU", nombre: "Instituto de Formación e Innovación Educativa (IFIE)", own: false },
  { sigla: "ULE", nombre: "Escuela de Formación", own: false },
  { sigla: "UVA", nombre: "Centro VirtUVa", own: false },
];

const ediciones = [
  { code: "M4", title: "Módulos 4 y 5", when: "Ediciones en marzo y mayo" },
  { code: "M1", title: "Módulo 1", when: "Junio (Plan General) y septiembre" },
  { code: "M2", title: "Módulo 2", when: "Julio (dentro del Plan General)" },
];

export default function FormacionPage() {
  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-11 pt-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-3.5">
              <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Formación" }]} />
            </div>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
              Formación del profesorado
            </p>
            <h1 className="mb-3.5 text-balance text-4xl font-bold leading-tight tracking-tight text-ink">
              Plan de Formación Docente 2026
            </h1>
            <p className="mb-6 max-w-[60ch] text-base leading-relaxed text-gray-600">
              A iniciativa del Vicerrectorado de Estudios de Grado y Calidad, el
              Plan recoge la propuesta institucional de formación inicial y
              permanente para todo el personal docente e investigador de la
              Universidad de Salamanca.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#" className={buttonClassName({ size: "lg" })}>
                Programa e inscripciones
              </a>
              <a
                href="#inicial"
                className="inline-flex items-center gap-2 px-2 py-3 text-base font-medium text-iuce-blue hover:underline"
              >
                Formación Docente Inicial
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="rounded-xl border border-gray-200 bg-surface-page p-5">
              <p className="text-3xl font-bold text-ink">100+</p>
              <p className="mt-1 text-xs leading-snug text-gray-500">
                actividades planificadas en 2026, el plan de mayor magnitud de
                los últimos años
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-surface-page p-5">
              <p className="text-3xl font-bold text-ink">4</p>
              <p className="mt-1 text-xs leading-snug text-gray-500">
                universidades públicas de Castilla y León coordinadas en la
                formación inicial
              </p>
            </div>
            <div className="col-span-2 flex items-center gap-3.5 rounded-xl border border-gray-200 bg-surface-page p-5">
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-usal-red">
                <History className="h-[19px] w-[19px]" aria-hidden="true" />
              </span>
              <p className="text-sm leading-snug text-gray-600">
                Desde 1969 apoyando la formación del profesorado, primero como
                ICE y hoy como instituto de investigación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿A quién va dirigido? */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="mb-[18px] text-xl font-bold text-gray-900">
            ¿A quién va dirigido?
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {destinatarios.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="flex items-start gap-3.5 rounded-xl border border-gray-200 bg-surface-card p-5 shadow-sm"
                >
                  <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                    <Icon className="h-[19px] w-[19px]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-gray-900">
                      {d.title}
                    </p>
                    <p className="text-xs leading-snug text-gray-500">
                      {d.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Actividades formativas */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
            Actividades formativas
          </h2>
          <p className="mb-7 max-w-[80ch] text-sm text-gray-500">
            Tres vías complementarias de formación, organizadas desde el IUCE.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {actividades.map((a) => {
              const Icon = a.icon;
              return (
                <article
                  key={a.title}
                  className={cn(
                    "flex flex-col gap-3 rounded-xl border border-gray-200 border-t-[3px] bg-surface-page p-6 shadow-sm",
                    a.accent === "red" ? "border-t-usal-red" : "border-t-iuce-blue",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-md bg-iuce-blue-pale",
                      a.accent === "red" ? "text-usal-red" : "text-ink",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {a.desc}
                  </p>
                  <a
                    href={a.href ?? "#"}
                    className="mt-auto text-sm font-medium text-iuce-blue hover:underline"
                  >
                    {a.cta}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formación Docente Inicial */}
      <section id="inicial" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
              Universidades públicas de Castilla y León
            </p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
              Programa de Formación Docente Inicial
            </h2>
            <p className="mb-3.5 text-base leading-relaxed text-gray-600">
              La LOSU establece que las profesoras y profesores ayudantes
              doctores deberán realizar, en el primer año de contrato, un curso
              de formación docente inicial definido por las universidades a
              través de sus unidades de formación e innovación docente (art.
              78.b).
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              Para dar respuesta a este contexto, las cuatro unidades de
              formación de las universidades públicas de Castilla y León —unidas
              por un convenio de colaboración desde 2012— ejecutan conjuntamente
              el programa, con ediciones periódicas de cada módulo a lo largo
              del año.
            </p>
            <div className="mb-6 flex flex-col gap-2.5">
              {unidades.map((u) => (
                <div
                  key={u.sigla}
                  className="flex items-center gap-3 rounded-md border border-gray-200 bg-surface-card px-4 py-3"
                >
                  <span
                    className={cn(
                      "w-[42px] flex-none text-xs font-bold",
                      u.own ? "text-usal-red" : "text-gray-500",
                    )}
                  >
                    {u.sigla}
                  </span>
                  <span className="text-sm text-gray-600">{u.nombre}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Dudas sobre la formación:{" "}
              <a
                href="mailto:coord.docencia@usal.es"
                className="text-iuce-blue hover:underline"
              >
                coord.docencia@usal.es
              </a>
            </p>
          </div>

          <aside className="rounded-xl border border-gray-200 bg-surface-card p-6 shadow-sm">
            <h3 className="mb-1 text-base font-semibold text-gray-900">
              Ediciones 2026
            </h3>
            <p className="mb-[18px] text-xs text-gray-500">
              Calendario orientativo; cada edición se comunica por correo al
              profesorado ayudante doctor.
            </p>
            <div className="flex flex-col">
              {ediciones.map((e) => (
                <div
                  key={e.code}
                  className="flex items-center gap-3.5 border-t border-gray-100 py-[11px]"
                >
                  <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-iuce-blue-pale text-xs font-bold text-ink">
                    {e.code}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {e.title}
                    </p>
                    <p className="text-xs text-gray-500">{e.when}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[18px] border-t border-gray-100 pt-4">
              <a
                href="#"
                className={cn(
                  buttonClassName({ variant: "outline", size: "sm" }),
                  "w-full",
                )}
              >
                Ver calendario completo
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA contacto */}
      <section className="border-t border-gray-200 bg-surface-tinted">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-[18px]">
            <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-md bg-iuce-blue-dark text-white">
              <MailQuestion className="h-[22px] w-[22px]" aria-hidden="true" />
            </span>
            <div>
              <p className="text-base font-semibold text-gray-900">
                ¿Dudas sobre inscripciones o certificados?
              </p>
              <p className="mt-0.5 text-sm text-gray-600">
                La Secretaría del IUCE atiende en el 923 294 634 y en
                iuce@usal.es.
              </p>
            </div>
          </div>
          <a
            href="mailto:iuce@usal.es"
            className={cn(buttonClassName(), "flex-none")}
          >
            Contactar
          </a>
        </div>
      </section>
    </>
  );
}
