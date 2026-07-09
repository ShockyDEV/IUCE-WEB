import type { Metadata } from "next";
import {
  Check,
  FileCheck,
  Fingerprint,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Quote,
  School,
  Search,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionSubnav } from "@/components/layout/section-subnav";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { InitialsAvatar } from "@/components/ui/initials-avatar";
import { buttonClassName } from "@/components/ui/button";
import { getBlock } from "@/lib/content-blocks-service";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Instituto",
  description:
    "Perfil del IUCE, equipo de dirección, miembros, ubicación en el Edificio Solís, instalaciones y edificio histórico.",
};

const subnav = [
  { id: "perfil", label: "Perfil" },
  { id: "equipo", label: "Equipo de dirección" },
  { id: "miembros", label: "Miembros" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "instalaciones", label: "Instalaciones" },
  { id: "edificio", label: "Edificio histórico" },
];

const funciones = [
  "Investigación interdisciplinar, básica y aplicada, en el ámbito de la formación y de la educación",
  "Cursos especializados de postgrado y doctorado, y formación del personal investigador",
  "Programas de investigación educativa en colaboración con otras universidades e institutos",
  "Contratos y convenios con entidades públicas o privadas, nacionales o extranjeras",
  "Participación en los procesos de evaluación de la calidad institucional",
  "Colaboración con los niveles no universitarios para la mejora del sistema educativo",
];

const hitos = [
  { icon: Landmark, year: "1969", text: "creación de los ICE en España" },
  { icon: School, year: "Años 80", text: "especialización en educación universitaria" },
  {
    icon: ShieldCheck,
    year: "2008",
    text: "verificación como Instituto de Investigación (ACSUCYL)",
  },
  { icon: FileCheck, year: "2023", text: "nuevo Reglamento del IUCE" },
];

const direccion = [
  {
    name: "Susana Olmos Migueláñez",
    role: "Directora",
    email: "solmos@usal.es",
  },
  {
    name: "Francisco José García Peñalvo",
    role: "Subdirector",
    email: "fgarcia@usal.es",
  },
  {
    name: "Javier Félix Merchán Sánchez-Jara",
    role: "Secretario",
    email: "javiermerchan@usal.es",
  },
];

// Miembros por defecto (si la BD no está disponible); en producción salen
// del gestor (Equipo y miembros).
const miembrosFallback = [
  {
    name: "María José Rodríguez Conde",
    area: "Métodos de Investigación y Diagnóstico en Educación",
  },
  { name: "Fernando Martínez Abad", area: "Evaluación educativa · Grupo GRIAL" },
  {
    name: "Erla Mariela Morales Morgado",
    area: "Tecnología educativa · Grupo GRIAL",
  },
  { name: "Susana Olmos Migueláñez", area: "Directora · Evaluación educativa" },
  {
    name: "Francisco José García Peñalvo",
    area: "Director del grupo GRIAL · Informática",
  },
];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

async function getMiembros(): Promise<Array<{ name: string; area: string }>> {
  try {
    const rows = await prisma.member.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
    if (rows.length > 0) {
      return rows.map((m) => ({
        name: m.name,
        area: [m.role, m.area].filter(Boolean).join(" · "),
      }));
    }
  } catch {
    // BD no disponible
  }
  return miembrosFallback;
}

const contacto = [
  {
    icon: MapPin,
    title: "Dirección",
    lines: ["Paseo de Canalejas, 169 · Edificio Solís, 1.ª planta", "37008 Salamanca"],
  },
  {
    icon: Phone,
    title: "Teléfono",
    lines: ["+34 923 294 634 (Secretaría)", "+34 923 294 500 (centralita USAL + extensión)"],
  },
];

const instalaciones = [
  {
    photo: "Foto — aulas",
    title: "Aulas de formación",
    desc: "Docencia, cursos del Plan de Formación y seminarios",
  },
  {
    photo: "Foto — laboratorios",
    title: "Laboratorios",
    desc: "Equipamiento especializado para experimentación e investigación",
  },
  {
    photo: "Foto — salas de trabajo",
    title: "Salas de trabajo",
    desc: "Análisis de datos, redacción y preparación de proyectos",
  },
  {
    photo: "Foto — dirección",
    title: "Dirección y secretaría",
    desc: "Coordinación de proyectos y atención a la comunidad",
  },
];

export default async function InstitutoPage() {
  // Bloques editables desde el panel (Contenido → Páginas) + miembros del gestor
  const [perfilIntro, edificioTexto, miembros] = await Promise.all([
    getBlock("instituto", "perfil-intro"),
    getBlock("instituto", "edificio"),
    getMiembros(),
  ]);

  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <div className="mb-3.5">
            <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Instituto" }]} />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            Instituto Universitario de Ciencias de la Educación
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            El Instituto
          </h1>
          <p className="max-w-[70ch] text-base leading-relaxed text-gray-600">
            Un instituto interdisciplinar que congrega a profesorado e
            investigadores de todas las ramas de conocimiento de la Universidad
            de Salamanca en torno a la investigación en Educación Superior.
          </p>
          <div className="mt-7">
            <SectionSubnav items={subnav} />
          </div>
        </div>
      </section>

      {/* Perfil */}
      <section id="perfil" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
              Perfil
            </h2>
            <div
              className="page-block mb-7 text-base leading-relaxed text-gray-600"
              // Bloque editable desde el gestor (instituto:perfil-intro)
              dangerouslySetInnerHTML={{ __html: perfilIntro }}
            />
            <h3 className="mb-3.5 text-lg font-semibold text-gray-900">
              Funciones del Instituto
            </h3>
            <ul className="mb-2.5 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
              {funciones.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm leading-normal text-gray-600"
                >
                  <Check
                    className="mt-[3px] h-[15px] w-[15px] flex-none text-usal-red"
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400">
              Art. 3 del Reglamento del IUCE, aprobado por Consejo de Gobierno
              de 28 de junio de 2023.{" "}
              <a href="#" className="text-iuce-blue hover:underline">
                Descargar reglamento
              </a>
            </p>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border border-gray-200 border-t-[3px] border-t-usal-red bg-surface-card p-6 shadow-sm">
              <Quote className="h-[22px] w-[22px] text-usal-red" aria-hidden="true" />
              <p className="my-3 mb-4 text-sm leading-relaxed text-gray-600">
                «En esta casa que es la vuestra, os invitamos a profesores,
                alumnos, investigadores, empresas e instituciones a vincularos y
                desarrollar proyectos en nuestra querida Universidad. Aprovecho
                para daros la bienvenida al IUCE de la Universidad de
                Salamanca.»
              </p>
              <div className="flex items-center gap-3">
                <ImagePlaceholder
                  icon={User}
                  rounded="full"
                  className="h-11 w-11 flex-none"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Dra. Susana Olmos Migueláñez
                  </p>
                  <p className="text-xs text-gray-500">Directora del IUCE</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-surface-tinted px-6 py-5">
              {hitos.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.year} className="flex items-center gap-3">
                    <Icon
                      className="h-[18px] w-[18px] flex-none text-ink"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-gray-600">
                      <strong className="text-gray-900">{h.year}</strong> —{" "}
                      {h.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      {/* Equipo de dirección */}
      <section
        id="equipo"
        className="scroll-mt-20 border-y border-gray-200 bg-surface-card"
      >
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
            Equipo de dirección
          </h2>
          <p className="mb-7 max-w-[80ch] text-sm text-gray-500">
            Para contactar por teléfono: 923 294 634 (Secretaría del IUCE) o 923
            294 500 (centralita de la USAL) seguido de la extensión.
          </p>
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {direccion.map((p) => (
              <div
                key={p.email}
                className="flex flex-col items-start gap-3.5 rounded-xl border border-gray-200 bg-surface-page p-6 shadow-sm"
              >
                <ImagePlaceholder
                  icon={User}
                  rounded="full"
                  className="h-[72px] w-[72px] flex-none"
                />
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {p.name}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-usal-red">
                    {p.role}
                  </p>
                </div>
                <a
                  href={`mailto:${p.email}`}
                  className="inline-flex items-center gap-1.5 text-sm text-iuce-blue hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {p.email}
                </a>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-surface-tinted px-6 py-[18px] sm:flex-row sm:items-center">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gray-200 bg-surface-card text-ink">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                Secretaría administrativa — Begoña Sánchez Martín
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                begosan@usal.es · Ext. 4634
              </p>
            </div>
            <a
              href="mailto:begosan@usal.es"
              className={buttonClassName({ variant: "outline", size: "sm" })}
            >
              Escribir
            </a>
          </div>
        </div>
      </section>

      {/* Miembros */}
      <section id="miembros" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
                Miembros
              </h2>
              <p className="max-w-[70ch] text-sm text-gray-500">
                Investigadoras e investigadores de todas las ramas de
                conocimiento vinculados al Instituto. El listado se gestiona
                desde el panel de administración.
              </p>
            </div>
            <div className="flex w-[280px] items-center gap-2 rounded-md border border-gray-300 bg-surface-card px-3.5 py-2.5 text-gray-400">
              <Search className="h-[15px] w-[15px]" aria-hidden="true" />
              <span className="text-sm">Buscar por nombre o área…</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {miembros.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-3.5 rounded-xl border border-gray-200 bg-surface-card px-[18px] py-4 shadow-sm"
              >
                <InitialsAvatar initials={initialsOf(m.name)} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {m.name}
                  </p>
                  <p className="mt-px text-xs text-gray-500">{m.area}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center gap-2.5 rounded-xl border border-dashed border-gray-300 px-[18px] py-4 text-gray-500">
              <Users className="h-[17px] w-[17px]" aria-hidden="true" />
              <span className="text-sm">
                Listado completo — se cargará desde el gestor
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section
        id="ubicacion"
        className="scroll-mt-20 border-y border-gray-200 bg-surface-card"
      >
        <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-6 py-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
              Ubicación
            </h2>
            <div className="flex flex-col gap-[18px]">
              {contacto.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="flex items-start gap-3.5">
                    <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {c.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-normal text-gray-600">
                        {c.lines.map((line, i) => (
                          <span key={line}>
                            {i > 0 ? <br /> : null}
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-start gap-3.5">
                <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                  <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Correo electrónico
                  </p>
                  <p className="mt-0.5 text-sm text-gray-600">
                    <a
                      href="mailto:iuce@usal.es"
                      className="text-iuce-blue hover:underline"
                    >
                      iuce@usal.es
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                  <Fingerprint className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Identificador ROR
                  </p>
                  <p className="mt-0.5 text-sm text-gray-600">
                    <a
                      href="https://ror.org/00xnj6419"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-iuce-blue hover:underline"
                    >
                      ror.org/00xnj6419
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ImagePlaceholder
            icon={MapPin}
            label="Mapa — cómo llegar al Edificio Solís"
            className="min-h-[320px] w-full"
          />
        </div>
      </section>

      {/* Instalaciones */}
      <section id="instalaciones" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-6 flex items-baseline justify-between gap-6">
            <div>
              <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-gray-900">
                Instalaciones
              </h2>
              <p className="max-w-[70ch] text-sm text-gray-500">
                Espacios de investigación, formación y trabajo en la primera
                planta del Edificio Solís.
              </p>
            </div>
            <a
              href="https://reservas.iuce.usal.es"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none text-sm font-medium text-iuce-blue hover:underline"
            >
              Reservar un espacio ↗
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {instalaciones.map((f) => (
              <figure
                key={f.title}
                className="m-0 overflow-hidden rounded-xl border border-gray-200 bg-surface-card shadow-sm"
              >
                <ImagePlaceholder
                  label={f.photo}
                  rounded="none"
                  className="h-[140px] w-full border-x-0 border-t-0"
                />
                <figcaption className="px-4 py-3.5">
                  <p className="text-sm font-semibold text-gray-900">
                    {f.title}
                  </p>
                  <p className="mt-[3px] text-xs leading-snug text-gray-500">
                    {f.desc}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Edificio histórico */}
      <section
        id="edificio"
        className="scroll-mt-20 border-t border-gray-200 bg-surface-card"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
              Edificio histórico
            </h2>
            <div
              className="page-block text-base leading-relaxed text-gray-600"
              // Bloque editable desde el gestor (instituto:edificio)
              dangerouslySetInnerHTML={{ __html: edificioTexto }}
            />
          </div>
          <ImagePlaceholder
            label="Foto histórica del Edificio Solís"
            className="h-[340px] w-full"
          />
        </div>
      </section>
    </>
  );
}
