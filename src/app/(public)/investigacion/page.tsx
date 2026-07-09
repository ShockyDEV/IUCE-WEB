import type { Metadata } from "next";
import { ArrowUpRight, ExternalLink, User, Users } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionSubnav } from "@/components/layout/section-subnav";
import { buttonClassName } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getBlock, getListBlock } from "@/lib/content-blocks-service";
import { prisma } from "@/lib/prisma";
import { groups as groupsFallback } from "@/lib/content/groups";

export const dynamic = "force-dynamic";

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

interface GroupCard {
  acronym: string;
  name: string;
  chip: string | null;
  lead: string | null;
  url: string | null;
  logo: string | null;
}

/**
 * Grupos de investigación desde el gestor. La lista oficial (9 grupos,
 * verificada contra la web original) actúa de fallback sin BD.
 */
async function getGrupos(): Promise<GroupCard[]> {
  try {
    const rows = await prisma.researchGroup.findMany({
      orderBy: { acronym: "asc" },
    });
    if (rows.length > 0) {
      return rows.map((g) => ({
        acronym: g.acronym,
        name: g.name,
        chip: g.chip,
        lead: g.lead,
        url: g.url,
        logo: g.logo,
      }));
    }
  } catch {
    // BD no disponible
  }
  return groupsFallback.map((g) => ({
    acronym: g.acronym,
    name: g.name,
    chip: g.chip ?? null,
    lead: g.lead ?? null,
    url: g.url ?? null,
    logo: g.logo ?? null,
  }));
}


export default async function InvestigacionPage() {
  // Contenido editable desde el gestor (Contenido → Páginas → Investigación).
  // Nota: DIDEROT figuraba por error entre los proyectos; es un grupo.
  const [grupos, intro, eksDescripcion, proyectos, articulos] =
    await Promise.all([
      getGrupos(),
      getBlock("investigacion", "intro"),
      getBlock("investigacion", "eks-descripcion"),
      getListBlock("investigacion", "list:proyectos"),
      getListBlock("investigacion", "list:publicaciones"),
    ]);

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
          <div
            className="page-block max-w-[75ch] text-base leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
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
            {grupos.map((g, i) => {
              const LeadIcon = g.lead ? User : Users;
              const urlLabel = g.url
                ? g.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
                : null;
              return (
                <Reveal key={g.acronym} delay={(i % 3) * 80} className="h-full">
                <article className="card-lift flex h-full flex-col gap-2.5 rounded-xl border border-gray-200 bg-surface-card p-[22px] shadow-sm hover:border-brand-400 hover:shadow-md">
                  {g.logo ? (
                    // Placa blanca fija: los logos (algunos en negro) deben
                    // verse igual en tema claro y oscuro.
                    <div className="mb-1 flex h-16 items-center rounded-md bg-white px-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.logo}
                        alt={`Logotipo de ${g.acronym}`}
                        className="max-h-12 max-w-[160px] object-contain"
                      />
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-ink">{g.acronym}</h3>
                    {g.chip ? (
                      <span className="flex-none rounded-full bg-iuce-blue-pale px-2.5 py-[3px] text-[10px] font-bold tracking-[.04em] text-ink">
                        {g.chip}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-normal text-gray-600">
                    {g.name}
                  </p>
                  <p className="mt-auto flex items-center gap-1.5 text-xs text-gray-500">
                    <LeadIcon
                      className="h-[13px] w-[13px] flex-none"
                      aria-hidden="true"
                    />
                    {g.lead ?? "Equipo interdisciplinar"}
                    {g.url ? (
                      <>
                        {" · "}
                        <a
                          href={g.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-iuce-blue hover:underline"
                        >
                          {urlLabel} ↗
                        </a>
                      </>
                    ) : null}
                  </p>
                </article>
                </Reveal>
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
              <Reveal key={i} delay={i * 80}>
              <article
                className={
                  "grid grid-cols-1 items-center gap-3 border-t border-gray-100 py-[18px] sm:grid-cols-[1fr_auto] sm:gap-6" +
                  (i === proyectos.length - 1 ? " border-b" : "")
                }
              >
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    {String(p.titulo)}
                  </h3>
                  <p className="text-xs text-gray-500">{String(p.meta)}</p>
                </div>
                <span className="justify-self-start whitespace-nowrap rounded-full bg-iuce-blue-pale px-3 py-1 text-xs font-medium text-ink sm:justify-self-auto">
                  {String(p.anos)}
                </span>
              </article>
              </Reveal>
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

          <Reveal from="scale" className="mb-6 flex flex-col items-start gap-6 rounded-xl border border-gray-200 bg-surface-tinted p-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-[18px]">
              <span className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-md bg-iuce-blue-dark text-base font-bold text-white">
                EKS
              </span>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Education in the Knowledge Society
                </p>
                <div
                  className="page-block mt-0.5 max-w-[60ch] text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: eksDescripcion }}
                />
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
          </Reveal>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articulos.map((a, i) => (
              <Reveal key={i} delay={i * 90} className="h-full">
              <article className="card-lift h-full rounded-xl border border-gray-200 bg-surface-card p-5 shadow-sm hover:shadow-md">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-usal-red">
                  {String(a.eyebrow)}
                </p>
                <p className="mb-2 text-sm font-semibold leading-normal text-gray-900">
                  {String(a.titulo)}
                </p>
                <p className="text-xs text-gray-500">
                  {String(a.autores)} — <em>{String(a.revista)}</em>
                </p>
              </article>
              </Reveal>
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
