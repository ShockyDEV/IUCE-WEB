import type { News } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { news as staticNews, type NewsItem } from "@/lib/content/news";

/**
 * Servicio de noticias para las páginas públicas: lee de la base de datos
 * (contenido gestionado desde el panel) y, si la BD no está disponible
 * (p. ej. desarrollo sin Docker), recurre al contenido semilla estático.
 */

function formatShort(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(".", "");
}

function formatLong(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function toItem(row: News): NewsItem {
  const published = row.publishedAt ?? row.createdAt;
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    publishedAt: published.toISOString().slice(0, 10),
    dateDisplay: formatShort(published),
    dateLong: formatLong(published),
    author: "Redacción IUCE",
    excerpt: row.excerpt ?? "",
    photoLabel: "Imagen de la noticia",
    coverImage: row.coverImage,
    content: row.content,
  };
}

/**
 * Noticias publicadas, más recientes primero. Para listados (tarjetas) el
 * cuerpo no se necesita: `withContent: false` (por defecto) lo omite de la
 * consulta — con 212 noticias históricas la diferencia importa.
 */
export async function getPublishedNews(
  options: { withContent?: boolean; category?: string } = {},
): Promise<NewsItem[]> {
  try {
    const rows = await prisma.news.findMany({
      where: {
        status: "PUBLISHED",
        ...(options.category ? { category: options.category } : {}),
      },
      orderBy: [
        { publishedAt: { sort: "desc", nulls: "last" } },
        { createdAt: "desc" },
      ],
      ...(options.withContent
        ? {}
        : {
            select: {
              id: true,
              title: true,
              slug: true,
              excerpt: true,
              coverImage: true,
              category: true,
              status: true,
              publishedAt: true,
              createdAt: true,
              updatedAt: true,
            },
          }),
    });
    if (rows.length > 0) {
      // Sin withContent la consulta no trae `content`: se rellena con "".
      return rows.map((r) =>
        toItem({
          ...r,
          content: (r as { content?: string }).content ?? "",
        } as News),
      );
    }
  } catch {
    // BD no disponible: seguimos con el contenido semilla.
  }
  const fallback = [...staticNews].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  return options.category
    ? fallback.filter((n) => n.category === options.category)
    : fallback;
}

export async function getPublishedNewsBySlug(
  slug: string,
): Promise<NewsItem | null> {
  try {
    const row = await prisma.news.findUnique({ where: { slug } });
    if (row && row.status === "PUBLISHED") return toItem(row);
    if (row) return null; // existe pero no está publicada
  } catch {
    // BD no disponible
  }
  return staticNews.find((n) => n.slug === slug) ?? null;
}
