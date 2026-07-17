/**
 * Sincroniza los proyectos de la memoria de acreditación (Tabla 4, volcada
 * en scripts/data/projects.json) con la tabla Project.
 *
 * La Tabla 4 tiene DOS bloques y el JSON los distingue con `iuceLed`:
 *  - true  → proyectos DEL IUCE: firmados por el Instituto o con más del 50%
 *            del equipo del IUCE. Son los únicos que lista la web pública.
 *  - false → proyectos en los que el IUCE solo participa con un porcentaje
 *            mínimo. Se conservan (sirven para las estadísticas y el panel),
 *            pero no salen en el explorador público.
 *
 * Idempotente: crea los que faltan y actualiza `iuceLed` de los que ya están
 * (emparejando por título). NO toca `active` de los proyectos existentes: si
 * alguien ocultó uno desde el panel, sigue oculto.
 *
 *   npx tsx scripts/import-projects.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RawProject {
  title: string;
  funder: string | null;
  period: string | null;
  startYear: number | null;
  endYear: number | null;
  amount: string | null;
  ip: string | null;
  line: string | null;
  scope: string | null;
  iuceLed: boolean;
}

/**
 * La fila que separa los dos bloques de la Tabla 4 se coló como proyecto en
 * la importación inicial. No es un proyecto: se borra si aparece.
 */
const SEPARADOR = "PORCENTAJE MÍNIMO DESDE EL IUCE";

/**
 * Los títulos del Excel traen espacios dobles y tildes; comparar en crudo
 * crearía duplicados del mismo proyecto ante cualquier retoque tipográfico.
 */
const clave = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

async function main() {
  const file = path.join(__dirname, "data", "projects.json");
  const projects = JSON.parse(fs.readFileSync(file, "utf-8")) as RawProject[];

  const enBd = await prisma.project.findMany({
    select: { id: true, title: true, iuceLed: true },
  });
  const porClave = new Map(enBd.map((p) => [clave(p.title), p]));

  let created = 0;
  let updated = 0;
  let sinCambios = 0;
  for (const p of projects) {
    const existing = porClave.get(clave(p.title));
    if (existing) {
      if (existing.iuceLed !== p.iuceLed) {
        await prisma.project.update({
          where: { id: existing.id },
          data: { iuceLed: p.iuceLed },
        });
        updated += 1;
      } else {
        sinCambios += 1;
      }
      continue;
    }
    await prisma.project.create({
      data: {
        title: p.title,
        funder: p.funder,
        period: p.period,
        startYear: p.startYear,
        endYear: p.endYear,
        amount: p.amount,
        ip: p.ip,
        line: p.line,
        scope: p.scope,
        iuceLed: p.iuceLed,
        active: true,
      },
    });
    created += 1;
  }

  const basura = await prisma.project.deleteMany({
    where: { title: { contains: SEPARADOR } },
  });

  // La importación inicial dejó pares casi idénticos del mismo proyecto: la
  // memoria retocó algún título y la fila vieja se quedó. Se borra la versión
  // obsoleta (no está en el JSON pero comparte los 60 primeros caracteres con
  // una que sí). Los proyectos que la memoria ha RETIRADO no comparten prefijo
  // con ninguno, así que se conservan.
  const enJson = new Set(projects.map((p) => clave(p.title)));
  const prefijos = new Set(projects.map((p) => clave(p.title).slice(0, 60)));
  const obsoletos = (
    await prisma.project.findMany({ select: { id: true, title: true } })
  ).filter(
    (p) =>
      !enJson.has(clave(p.title)) && prefijos.has(clave(p.title).slice(0, 60)),
  );
  if (obsoletos.length > 0) {
    await prisma.project.deleteMany({
      where: { id: { in: obsoletos.map((p) => p.id) } },
    });
    for (const p of obsoletos)
      console.log(`  ✗ duplicado obsoleto: ${p.title.slice(0, 60)}…`);
  }

  const led = await prisma.project.count({ where: { iuceLed: true } });
  const total = await prisma.project.count();
  console.log(
    `✓ proyectos: ${created} creados · ${updated} actualizados · ${sinCambios} sin cambios`,
  );
  if (basura.count > 0)
    console.log(`  ✗ eliminada la fila separadora de la Tabla 4 (no era un proyecto)`);
  console.log(`  BD: ${total} proyectos · ${led} del IUCE (los que salen en la web)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
