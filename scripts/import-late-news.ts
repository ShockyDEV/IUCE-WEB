/**
 * Importa las noticias publicadas en la web ANTIGUA después del export de
 * WordPress (la migración congeló mayo-2026; lo posterior se añade aquí).
 *
 * Datos en scripts/data/late-news/*.json — cada fichero es una noticia con
 * sus campos ES y EN. Idempotente y de solo-relleno: si el slug ya existe no
 * se toca (así no pisa retoques hechos desde el panel); con --force se
 * actualiza desde el JSON.
 *
 *   npx ts-node --compiler-options {"module":"CommonJS"} scripts/import-late-news.ts [--force]
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DATA_DIR = path.join(__dirname, "data", "late-news");
const FORCE = process.argv.includes("--force");

interface LateNews {
  slug: string;
  publishedAt: string;
  category: string;
  coverImage: string | null;
  title: string;
  excerpt: string;
  content: string;
  titleEn?: string;
  excerptEn?: string;
  contentEn?: string;
}

async function main() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const n: LateNews = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, file), "utf8"),
    );
    const existing = await prisma.news.findUnique({ where: { slug: n.slug } });
    const data = {
      title: n.title,
      titleEn: n.titleEn ?? null,
      excerpt: n.excerpt,
      excerptEn: n.excerptEn ?? null,
      content: n.content,
      contentEn: n.contentEn ?? null,
      coverImage: n.coverImage,
      category: n.category,
      status: "PUBLISHED" as const,
      publishedAt: new Date(n.publishedAt),
    };
    if (existing) {
      if (FORCE) {
        await prisma.news.update({ where: { slug: n.slug }, data });
        updated += 1;
        console.log(`  ✍ actualizada: ${n.slug}`);
      } else {
        skipped += 1;
        console.log(`  = ya existe (sin tocar): ${n.slug}`);
      }
      continue;
    }
    await prisma.news.create({ data: { slug: n.slug, ...data } });
    created += 1;
    console.log(`  + creada: ${n.slug}`);
  }

  console.log(
    `\nNoticias tardías — creadas: ${created} · actualizadas: ${updated} · sin tocar: ${skipped}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
