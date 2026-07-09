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
    photoLabel: row.coverImage ? row.coverImage : "Imagen de la noticia",
    content: row.content,
  };
}

/** Noticias publicadas, más recientes primero. */
export async function getPublishedNews(): Promise<NewsItem[]> {
  try {
    const rows = await prisma.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [
        { publishedAt: { sort: "desc", nulls: "last" } },
        { createdAt: "desc" },
      ],
    });
    if (rows.length > 0) return rows.map(toItem);
  } catch {
    // BD no disponible: seguimos con el contenido semilla.
  }
  return [...staticNews].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
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
