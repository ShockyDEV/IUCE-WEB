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
import {
  getBlock,
  getBlockText,
  getListBlock,
} from "@/lib/content-blocks-service";
import { iconFor } from "@/lib/icon-map";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Formación",
  description:
    "Plan de Formación Docente 2026 de la Universidad de Salamanca: formación permanente del PDI, SPOCs y Formación Docente Inicial (FDI) de las universidades públicas de Castilla y León.",
};





export default async function FormacionPage() {
  // Contenido editable desde el gestor (Contenido → Páginas → Formación)
  const [
    heroEyebrow,
    heroTitulo,
    intro,
    fdiIntro,
    cta,
    datos,
    destinatarios,
    actividades,
    unidades,
    ediciones,
  ] = await Promise.all([
    getBlockText("formacion", "hero-eyebrow"),
    getBlockText("formacion", "hero-titulo"),
    getBlock("formacion", "intro"),
    getBlock("formacion", "fdi-intro"),
    getBlock("formacion", "cta"),
    getListBlock("formacion", "list:datos"),
    getListBlock("formacion", "list:destinatarios"),
    getListBlock("formacion", "list:actividades"),
    getListBlock("formacion", "list:fdi-unidades"),
    getListBlock("formacion", "list:fdi-ediciones"),
  ]);

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
              {heroEyebrow}
            </p>
            <h1 className="mb-3.5 text-balance text-4xl font-bold leading-tight tracking-tight text-ink">
              {heroTitulo}
            </h1>
            <div
              className="page-block mb-6 max-w-[60ch] text-base leading-relaxed text-gray-600"
              dangerouslySetInnerHTML={{ __html: intro }}
            />
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
            {datos.map((d, i) => (
              <Reveal
                key={i}
                from="right"
                delay={i * 110}
                className={cn(
                  i === datos.length - 1 &&
                    datos.length % 2 === 1 &&
                    "col-span-2",
                )}
              >
              <div className="h-full rounded-xl border border-gray-200 bg-surface-page p-5">
                <p className="text-3xl font-bold text-ink">
                  <CountUp value={String(d.cifra)} />
                </p>
                <p className="mt-1 text-xs leading-snug text-gray-500">
                  {String(d.texto)}
                </p>
              </div>
              </Reveal>
            ))}
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
            {destinatarios.map((d, i) => {
              const Icon = iconFor(d.icon);
              return (
                <Reveal key={i} delay={i * 90} className="h-full">
                <div className="flex h-full items-start gap-3.5 rounded-xl border border-gray-200 bg-surface-card p-5 shadow-sm">
                  <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                    <Icon className="h-[19px] w-[19px]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-gray-900">
                      {String(d.titulo)}
                    </p>
                    <p className="text-xs leading-snug text-gray-500">
                      {String(d.texto)}
                    </p>
                  </div>
                </div>
                </Reveal>
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
            {actividades.map((a, i) => {
              const Icon = iconFor(a.icon);
              return (
                <Reveal key={i} delay={i * 90} className="h-full">
                <article
                  className={cn(
                    "card-lift flex h-full flex-col gap-3 rounded-xl border border-gray-200 border-t-[3px] bg-surface-page p-6 shadow-sm hover:shadow-md",
                    a.acentoRojo ? "border-t-usal-red" : "border-t-iuce-blue",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-md bg-iuce-blue-pale",
                      a.acentoRojo ? "text-usal-red" : "text-ink",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {String(a.titulo)}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {String(a.texto)}
                  </p>
                  {a.cta ? (
                    <a
                      href={String(a.enlace || "#")}
                      className="mt-auto text-sm font-medium text-iuce-blue hover:underline"
                    >
                      {String(a.cta)}
                    </a>
                  ) : null}
                </article>
                </Reveal>
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
            <div
              className="page-block mb-6 text-base leading-relaxed text-gray-600"
              dangerouslySetInnerHTML={{ __html: fdiIntro }}
            />
            <div className="mb-6 flex flex-col gap-2.5">
              {unidades.map((u, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md border border-gray-200 bg-surface-card px-4 py-3"
                >
                  <span
                    className={cn(
                      "w-[42px] flex-none text-xs font-bold",
                      u.propia ? "text-usal-red" : "text-gray-500",
                    )}
                  >
                    {String(u.sigla)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {String(u.nombre)}
                  </span>
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
              {ediciones.map((e, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 border-t border-gray-100 py-[11px]"
                >
                  <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-iuce-blue-pale text-xs font-bold text-ink">
                    {String(e.codigo)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {String(e.titulo)}
                    </p>
                    <p className="text-xs text-gray-500">{String(e.cuando)}</p>
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
            <div
              className="page-block text-sm text-gray-600 [&_strong]:text-base [&_strong]:font-semibold [&_strong]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: cta }}
            />
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
