/**
 * Aplica traducciones EN de noticias preparadas a mano (sin DeepL ni ninguna
 * API): lee todos los lotes `scripts/data/news-en/*.json` — array de
 * `{ slug, titleEn, excerptEn, contentEn }` — y rellena los campos *En de
 * cada noticia, emparejando por slug.
 *
 * Idempotente y SOLO-RELLENO: si la noticia ya tiene titleEn (p. ej. porque
 * alguien la guardó desde el panel con DeepL configurado), no se toca; con
 * `--force` se sobrescribe. Ejecutar tras `prisma db push` en el deploy:
 *   npx tsx scripts/apply-news-en.ts [--force]
 */
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const FORCE = process.argv.includes("--force");
const DIR = join(__dirname, "data", "news-en");

interface Traduccion {
  slug: string;
  titleEn: string;
  excerptEn: string | null;
  contentEn: string;
}

async function main() {
  const lotes = readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
  let aplicadas = 0;
  let saltadas = 0;
  let sinNoticia = 0;

  for (const lote of lotes) {
    const items: Traduccion[] = JSON.parse(
      readFileSync(join(DIR, lote), "utf8"),
    );
    for (const t of items) {
      const noticia = await prisma.news.findUnique({
        where: { slug: t.slug },
        select: { id: true, titleEn: true },
      });
      if (!noticia) {
        sinNoticia++;
        console.warn(`  ✗ sin noticia para slug ${t.slug}`);
        continue;
      }
      if (noticia.titleEn && !FORCE) {
        saltadas++;
        continue;
      }
      await prisma.news.update({
        where: { id: noticia.id },
        data: {
          titleEn: t.titleEn,
          excerptEn: t.excerptEn,
          contentEn: t.contentEn,
        },
      });
      aplicadas++;
    }
    console.log(`  ${lote}: procesado`);
  }

  const restantes = await prisma.news.count({
    where: { status: "PUBLISHED", internal: false, titleEn: null },
  });
  console.log(
    `\nAplicadas: ${aplicadas} · ya traducidas (saltadas): ${saltadas} · slug sin noticia: ${sinNoticia}`,
  );
  console.log(`Noticias publicadas aún sin traducir: ${restantes}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
