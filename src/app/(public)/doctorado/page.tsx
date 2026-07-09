import type { Metadata } from "next";
import {
  BookOpenCheck,
  Bot,
  CalendarRange,
  ClipboardCheck,
  Cog,
  Fingerprint,
  Library,
  Lightbulb,
  Mail,
  Megaphone,
  MousePointerClick,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { buttonClassName } from "@/components/ui/button";
import { getBlock } from "@/lib/content-blocks-service";
import { prisma } from "@/lib/prisma";
import { groups as groupsFallback } from "@/lib/content/groups";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Doctorado",
  description:
    "Programa de Doctorado «Formación en la Sociedad del Conocimiento» del IUCE: líneas de investigación, grupos y perfil de ingreso.",
};

const lineas = [
  { icon: ClipboardCheck, label: "Evaluación educativa y orientación" },
  { icon: MousePointerClick, label: "Interacción y eLearning" },
  { icon: Lightbulb, label: "Investigación-innovación en tecnología educativa" },
  { icon: Megaphone, label: "Comunicación y Educación" },
  { icon: Stethoscope, label: "Medicina y Educación" },
  { icon: Bot, label: "Inteligencia artificial y robótica en la educación" },
  { icon: Cog, label: "Ingeniería y Educación" },
  { icon: Library, label: "Educación, bibliotecas y cultura científica" },
];

interface GroupMini {
  acronym: string;
  desc: string;
  chip: string | null;
  logo: string | null;
}

/** Grupos del gestor (lista oficial de 9 como fallback sin BD). */
async function getGrupos(): Promise<GroupMini[]> {
  try {
    const rows = await prisma.researchGroup.findMany({
      orderBy: { acronym: "asc" },
    });
    if (rows.length > 0) {
      return rows.map((g) => ({
        acronym: g.acronym,
        desc: g.name,
        chip: g.chip,
        logo: g.logo,
      }));
    }
  } catch {
    // BD no disponible
  }
  return groupsFallback.map((g) => ({
    acronym: g.acronym,
    desc: g.name,
    chip: g.chip ?? null,
    logo: g.logo ?? null,
  }));
}

interface Coordinator {
  name: string;
  photo: string | null;
  email: string | null;
  portalUrl: string | null;
}

/** Coordinador del programa (García Peñalvo), con foto y enlaces del gestor. */
async function getCoordinador(): Promise<Coordinator> {
  const fallback: Coordinator = {
    name: "Francisco José García Peñalvo",
    photo: null,
    email: "fgarcia@usal.es",
    portalUrl:
      "https://produccioncientifica.usal.es/investigadores/56361/detalle",
  };
  try {
    const row = await prisma.member.findFirst({
      where: { role: "Subdirector" },
    });
    if (row) {
      return {
        name: row.name,
        photo: row.photo,
        email: row.email,
        portalUrl: row.portalUrl ?? fallback.portalUrl,
      };
    }
  } catch {
    // BD no disponible
  }
  return fallback;
}

/** ORCID del coordinador (no consta en el export; verificar con el IUCE). */
const COORDINATOR_ORCID = "https://orcid.org/0000-0001-9987-5584";

const pasos = [
  {
    n: "1",
    title: "Grado universitario en áreas afines",
    desc: "Educación, Psicología, Ciencias de la Salud, Ingeniería, Información y Documentación, Comunicación, Sociología y Ciencias Sociales afines.",
  },
  {
    n: "2",
    title: "Máster universitario",
    desc: "Título de Máster Universitario o equivalente que acredite para cursar un programa de doctorado.",
  },
  {
    n: "3",
    title: "Vocación investigadora",
    desc: "Interés por la producción científica: cada doctorando se integra en un grupo de investigación del programa.",
  },
];

export default async function DoctoradoPage() {
  // Bloque editable (doctorado:programa) + grupos y coordinador del gestor
  const [programa, grupos, coordinador] = await Promise.all([
    getBlock("doctorado", "programa"),
    getGrupos(),
    getCoordinador(),
  ]);

  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pb-11 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "Doctorado" }]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            Programa de Doctorado · Escuela de Doctorado «Studii Salamantini»
          </p>
          <h1 className="mb-3.5 max-w-[24ch] text-balance text-4xl font-bold leading-tight tracking-tight text-ink">
            Formación en la Sociedad del Conocimiento
          </h1>
          <div
            className="page-block mb-6 max-w-[75ch] text-base leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: programa }}
          />
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://knowledgesociety.usal.es"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName({ size: "lg" })}
            >
              Portal del programa ↗
            </a>
            <a
              href="https://doctorado.usal.es"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName({ variant: "outline", size: "lg" })}
            >
              Escuela de Doctorado ↗
            </a>
          </div>
        </div>
      </section>

      {/* Líneas de investigación */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
            Líneas de investigación
          </h2>
          <p className="mb-7 max-w-[80ch] text-sm text-gray-500">
            Grandes descriptores del programa, cubiertos por investigadores de
            la USAL y un amplio plantel nacional e internacional.
          </p>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {lineas.map((l) => {
              const Icon = l.icon;
              return (
                <div
                  key={l.label}
                  className="flex flex-col gap-2.5 rounded-xl border border-gray-200 bg-surface-card p-[18px] shadow-sm"
                >
                  <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-snug text-gray-900">
                    {l.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grupos */}
      <section className="border-y border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-6">
            <div>
              <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
                Grupos de investigación
              </h2>
              <p className="text-sm text-gray-500">
                Grupos de Investigación Reconocidos de la USAL que soportan el
                programa.
              </p>
            </div>
            <Link
              href="/investigacion"
              className="flex-none text-sm font-medium text-iuce-blue hover:underline"
            >
              Toda la investigación del IUCE →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grupos.map((g) => (
              <div
                key={g.acronym}
                className="rounded-xl border border-gray-200 bg-surface-page p-5 shadow-sm"
              >
                {g.logo ? (
                  // Placa blanca fija: logos oscuros visibles también en
                  // modo oscuro.
                  <div className="mb-3 flex h-12 items-center rounded-md bg-white px-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.logo}
                      alt={`Logotipo de ${g.acronym}`}
                      className="max-h-9 max-w-[130px] object-contain"
                    />
                  </div>
                ) : null}
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-base font-bold text-ink">{g.acronym}</p>
                  {g.chip ? (
                    <span className="rounded-full bg-iuce-blue-pale px-2.5 py-[3px] text-[10px] font-bold tracking-[.04em] text-ink">
                      {g.chip}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs leading-snug text-gray-500">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfil de ingreso */}
      <section>
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
              Perfil de ingreso
            </h2>
            <div className="flex flex-col gap-3.5">
              {pasos.map((p) => (
                <div
                  key={p.n}
                  className="flex items-start gap-3.5 rounded-xl border border-gray-200 bg-surface-card px-5 py-[18px] shadow-sm"
                >
                  <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-iuce-blue-pale text-sm font-bold text-ink">
                    {p.n}
                  </span>
                  <div>
                    <p className="mb-[3px] text-sm font-semibold text-gray-900">
                      {p.title}
                    </p>
                    <p className="text-sm leading-normal text-gray-600">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border border-gray-200 border-t-[3px] border-t-usal-red bg-surface-card p-6 shadow-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-usal-red">
                Coordinación
              </p>
              <div className="mb-3.5 flex items-center gap-4">
                {coordinador.photo ? (
                  <Image
                    src={coordinador.photo}
                    alt={`Fotografía de ${coordinador.name}`}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] flex-none rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {coordinador.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Coordinador del programa · Subdirector del IUCE
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {coordinador.email ? (
                  <a
                    href={`mailto:${coordinador.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-iuce-blue hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    {coordinador.email}
                  </a>
                ) : null}
                {coordinador.portalUrl ? (
                  <a
                    href={coordinador.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-iuce-blue hover:underline"
                  >
                    <BookOpenCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Producción científica (Portal USAL) ↗
                  </a>
                ) : null}
                <a
                  href={COORDINATOR_ORCID}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-iuce-blue hover:underline"
                >
                  <Fingerprint className="h-3.5 w-3.5" aria-hidden="true" />
                  ORCID ↗
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-surface-tinted px-6 py-5">
              <div className="mb-2 flex items-center gap-3">
                <CalendarRange
                  className="h-[18px] w-[18px] text-ink"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-gray-900">
                  Semana Doctoral
                </p>
              </div>
              <p className="text-xs leading-relaxed text-gray-600">
                Cada otoño, el programa celebra su Semana Doctoral: seminarios,
                defensa de avances y encuentro entre doctorandos y grupos.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
