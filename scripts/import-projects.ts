/**
 * Importa los proyectos competitivos de la memoria de acreditación
 * (scripts/data/projects.json, extraído de la Tabla 4) a la tabla Project.
 * Idempotente: no duplica títulos ya existentes.
 *
 *   npx ts-node --compiler-options "{\"module\":\"CommonJS\",\"target\":\"ES2020\"}" scripts/import-projects.ts
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
}

async function main() {
  const file = path.join(__dirname, "data", "projects.json");
  const projects = JSON.parse(fs.readFileSync(file, "utf-8")) as RawProject[];

  let created = 0;
  let skipped = 0;
  for (const p of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: p.title },
    });
    if (existing) {
      skipped += 1;
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
        active: true,
      },
    });
    created += 1;
  }
  console.log(`✓ proyectos: ${created} creados, ${skipped} ya existían`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
