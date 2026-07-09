import type { Metadata } from "next";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { buttonClassName } from "@/components/ui/button";
import {
  featuredEvent,
  pastEvents,
  upcomingEvents,
} from "@/lib/content/events";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Congresos, seminarios y jornadas organizados por el IUCE o con participación del Instituto.",
};

const filtros = ["Todos", "Congresos", "Seminarios", "Jornadas"];

export default function EventosPage() {
  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "Eventos" }]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            Agenda
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            Eventos
          </h1>
          <p className="mb-6 max-w-[70ch] text-base leading-relaxed text-gray-600">
            Congresos, seminarios y jornadas organizados por el IUCE o con
            participación del Instituto.
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar por tipo"
          >
            {filtros.map((f, i) => (
              <button
                key={f}
                type="button"
                aria-pressed={i === 0}
                className={cn(
                  "h-[34px] rounded-full border px-4 text-sm font-medium transition-colors",
                  i === 0
                    ? "border-iuce-blue-dark bg-iuce-blue-dark text-white"
                    : "border-gray-300 bg-surface-card text-gray-600 hover:border-brand-400 hover:text-ink",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destacado */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-2 pt-12">
          <h2 className="mb-[18px] text-xl font-bold text-gray-900">
            Destacado
          </h2>
          <article className="grid overflow-hidden rounded-xl border border-gray-200 bg-surface-card shadow-sm lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-3.5 p-8">
              <div className="flex items-center gap-2.5">
                <span className="rounded-full bg-iuce-blue-pale px-3 py-[3px] text-xs font-medium text-ink">
                  {featuredEvent.type}
                </span>
                <span className="rounded-full bg-[#DBEAFE] px-3 py-[3px] text-xs font-medium text-[#1D4ED8]">
                  Próximo
                </span>
              </div>
              <h3 className="text-balance text-2xl font-bold leading-snug text-ink">
                {featuredEvent.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                {featuredEvent.description}
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar
                    className="h-[15px] w-[15px] text-usal-red"
                    aria-hidden="true"
                  />
                  {featuredEvent.dateDisplay}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin
                    className="h-[15px] w-[15px] text-usal-red"
                    aria-hidden="true"
                  />
                  {featuredEvent.location}
                </span>
              </div>
              <div className="mt-auto pt-2">
                <a
                  href={featuredEvent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName({ variant: "outline" })}
                >
                  Web del congreso ↗
                </a>
              </div>
            </div>
            <ImagePlaceholder
              label={featuredEvent.photoLabel}
              rounded="none"
              className="min-h-[280px] w-full border-0"
            />
          </article>
        </div>
      </section>

      {/* Próximos */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-2 pt-10">
          <h2 className="mb-[18px] text-xl font-bold text-gray-900">
            Próximos
          </h2>
          <div className="flex flex-col gap-3">
            {upcomingEvents.map((e) => (
              <article
                key={e.title}
                className="flex items-center gap-[18px] rounded-xl border border-gray-200 bg-surface-card px-[22px] py-[18px] shadow-sm"
              >
                <span className="flex h-14 w-14 flex-none flex-col items-center justify-center rounded-md bg-iuce-blue-dark text-white">
                  <span className="text-base font-bold leading-none">
                    {e.dateBlock?.top}
                  </span>
                  <span className="mt-0.5 text-[10px] tracking-[.06em] opacity-85">
                    {e.dateBlock?.bottom}
                  </span>
                </span>
                <div className="flex-1">
                  <h3 className="mb-[3px] text-base font-semibold text-gray-900">
                    {e.title}
                  </h3>
                  <p className="text-xs text-gray-500">{e.meta}</p>
                </div>
                <ChevronRight
                  className="h-[18px] w-[18px] flex-none text-gray-400"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrados */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">
          <h2 className="mb-[18px] text-xl font-bold text-gray-900">
            Celebrados en 2026
          </h2>
          <div className="flex flex-col">
            {pastEvents.map((e, i) => (
              <article
                key={e.title}
                className={cn(
                  "grid grid-cols-1 items-center gap-2 border-t border-gray-100 py-4 sm:grid-cols-[120px_1fr_auto] sm:gap-5",
                  i === pastEvents.length - 1 && "border-b",
                )}
              >
                <span className="text-xs uppercase tracking-wider text-gray-400">
                  {e.dateRange}
                </span>
                <div>
                  <h3 className="mb-0.5 text-base font-medium text-gray-900">
                    {e.title}
                  </h3>
                  <p className="text-xs text-gray-500">{e.meta}</p>
                </div>
                <span className="justify-self-start rounded-full bg-gray-100 px-3 py-[3px] text-xs font-medium text-gray-700 sm:justify-self-auto">
                  Celebrado
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
