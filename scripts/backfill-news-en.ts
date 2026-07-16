/**
 * Rellena las traducciones EN de las noticias ya publicadas (campos titleEn /
 * excerptEn / contentEn) llamando a DeepL en bloque.
 *
 * La auto-traducción del panel solo actúa al GUARDAR una noticia, así que las
 * 220 noticias migradas del WordPress antiguo se quedaron sin versión inglesa.
 * Este script las traduce todas de una vez.
 *
 * Requisitos:
 *   - DEEPL_API_KEY definida en .env (sin ella, el script avisa y no hace nada).
 *
 * Uso:
 *   npx tsx scripts/backfill-news-en.ts            # solo las que faltan
 *   npx tsx scripts/backfill-news-en.ts --force    # retraduce todas
 *   npx tsx scripts/backfill-news-en.ts --limit 20 # prueba con las 20 primeras
 *
 * Es idempotente: por defecto salta las noticias que ya tienen titleEn.
 * DeepL free admite 500k caracteres/mes; el cuerpo de las 220 noticias puede
 * acercarse a ese límite, así que si se corta, relanzar retoma donde quedó.
 */
import { PrismaClient } from "@prisma/client";
import { translateNewsFields, translationEnabled } from "../src/lib/translate";

const prisma = new PrismaClient();

async function main() {
  const force = process.argv.includes("--force");
  const limitArg = process.argv.indexOf("--limit");
  const limit = limitArg !== -1 ? Number(process.argv[limitArg + 1]) : undefined;

  if (!translationEnabled()) {
    console.error(
      "✗ DEEPL_API_KEY no está configurada en .env. Añádela y vuelve a ejecutar.",
    );
    process.exit(1);
  }

  const news = await prisma.news.findMany({
    where: {
      status: "PUBLISHED",
      internal: false,
      ...(force ? {} : { titleEn: null }),
    },
    orderBy: { publishedAt: "desc" },
    ...(limit ? { take: limit } : {}),
  });

  console.log(
    `${news.length} noticias por traducir${force ? " (--force: todas)" : ""}.`,
  );

  let ok = 0;
  let fail = 0;
  for (const [i, n] of news.entries()) {
    const fields = await translateNewsFields({
      title: n.title,
      excerpt: n.excerpt,
      content: n.content,
    });
    if (!fields.titleEn) {
      fail++;
      console.warn(`  [${i + 1}/${news.length}] ✗ sin traducción: ${n.slug}`);
      continue;
    }
    await prisma.news.update({ where: { id: n.id }, data: fields });
    ok++;
    if ((i + 1) % 10 === 0 || i + 1 === news.length) {
      console.log(`  [${i + 1}/${news.length}] traducidas ${ok}, fallidas ${fail}`);
    }
  }

  const restantes = await prisma.news.count({
    where: { status: "PUBLISHED", internal: false, titleEn: null },
  });
  console.log(`\nHecho. Traducidas ${ok}, fallidas ${fail}. Sin traducir aún: ${restantes}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
