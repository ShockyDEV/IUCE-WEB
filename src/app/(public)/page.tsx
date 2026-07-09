import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Landmark,
  MapPin,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { getPublishedNews } from "@/lib/news-service";
import { getBlock } from "@/lib/content-blocks-service";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

const quickAccess = [
  {
    href: "/investigacion",
    icon: Microscope,
    title: "Investigación",
    description: "Grupos, proyectos y publicaciones en Educación Superior",
    accent: false as const,
  },
  {
    href: "/formacion",
    icon: GraduationCap,
    title: "Formación",
    description: "Plan de Formación Docente del PDI y actividades formativas",
    accent: false as const,
  },
  {
    href: "/doctorado",
    icon: BookOpen,
    title: "Doctorado",
    description: "Programa «Formación en la Sociedad del Conocimiento»",
    accent: false as const,
  },
  {
    href: "https://reservas.iuce.usal.es",
    icon: CalendarCheck,
    title: "Reserva de espacios",
    description: "Aulas y salas del IUCE — reservas.iuce.usal.es",
    accent: true as const,
    external: true,
  },
];

export default async function HomePage() {
  // Últimas 3 noticias publicadas + párrafo del hero (gestionados desde el panel).
  const [latestNews, heroParrafo] = await Promise.all([
    getPublishedNews().then((n) => n.slice(0, 3)),
    getBlock("inicio", "hero-parrafo"),
  ]);
  return (
    <>
      {/* Hero */}
      <section className="bg-surface-card">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-[68px] pt-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="mb-3.5 text-xs font-bold uppercase tracking-wider text-usal-red">
              Instituto Universitario de Investigación · USAL
            </p>
            <h1 className="mb-[18px] text-balance text-4xl font-bold leading-tight tracking-tight text-ink sm:text-[44px]">
              Investigación e innovación en Educación Superior
            </h1>
            <div
              className="page-block mb-7 max-w-[52ch] text-base leading-relaxed text-gray-600"
              // Bloque editable desde el gestor (inicio:hero-parrafo)
              dangerouslySetInnerHTML={{ __html: heroParrafo }}
            />
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/instituto"
                className={buttonClassName({ size: "lg" })}
              >
                Conoce el Instituto
              </Link>
              <Link
                href="/formacion"
                className={buttonClassName({ variant: "outline", size: "lg" })}
              >
                Plan de Formación Docente
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 border-t border-gray-100 pt-5 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <Landmark
                  className="h-3.5 w-3.5 text-usal-red"
                  aria-hidden="true"
                />
                Origen ICE, 1969
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-usal-red"
                  aria-hidden="true"
                />
                Verificado ACSUCYL, 2008
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin
                  className="h-3.5 w-3.5 text-usal-red"
                  aria-hidden="true"
                />
                Edificio Solís, Salamanca
              </span>
            </div>
          </div>

          <div className="relative">
            <ImagePlaceholder
              label="Foto del Edificio Solís"
              className="h-[380px] w-full"
            />
            <div className="pointer-events-none absolute bottom-[22px] left-0 rounded-r-md bg-iuce-blue-dark px-3.5 py-2 text-xs text-white">
              Paseo de Canalejas 169 · Edificio Solís, 1.ª planta
            </div>
          </div>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="border-y border-gray-200 bg-surface-page">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-9 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex flex-col gap-2.5 rounded-xl border border-gray-200 bg-surface-card p-5 shadow-sm transition-all hover:border-brand-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page"
              >
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-md bg-iuce-blue-pale">
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      item.accent ? "text-usal-red" : "text-ink",
                    )}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-base font-semibold text-gray-900">
                  {item.title}
                </span>
                <span className="text-xs leading-snug text-gray-500">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Actualidad */}
      <section className="bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-14">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Actualidad
            </h2>
            <Link
              href="/noticias"
              className="text-sm font-medium text-iuce-blue hover:underline"
            >
              Ver todas las noticias →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <Link key={item.slug} href={`/noticias/${item.slug}`}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-surface-card shadow-sm transition-all hover:border-brand-400 hover:shadow-md">
                  <ImagePlaceholder
                    label={item.photoLabel}
                    rounded="none"
                    className="h-[150px] w-full border-x-0 border-t-0"
                  />
                  <div className="flex flex-col gap-2 px-5 pb-5 pt-[18px]">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-iuce-blue-pale px-2.5 py-0.5 font-medium text-ink">
                        {item.category}
                      </span>
                      <span className="text-gray-400">{item.dateDisplay}</span>
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-normal text-gray-600">
                      {item.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banda EKS */}
      <section className="border-t border-gray-200 bg-surface-tinted">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-[18px]">
            <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-md bg-iuce-blue-dark text-sm font-bold text-white">
              EKS
            </span>
            <div>
              <p className="text-base font-semibold text-gray-900">
                Education in the Knowledge Society
              </p>
              <p className="mt-0.5 text-sm text-gray-600">
                La revista científica del IUCE: investigación interdisciplinar
                sobre la Sociedad del Conocimiento, con énfasis en los procesos
                educativos mediados por tecnologías.
              </p>
            </div>
          </div>
          <a
            href="https://revistas.usal.es/index.php/eks"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonClassName({ variant: "outline" }),
              "flex-none gap-1.5",
            )}
          >
            Visitar la revista
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
