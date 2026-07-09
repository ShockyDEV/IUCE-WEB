import { prisma } from "@/lib/prisma";
import { PAGE_BLOCKS } from "@/lib/content/page-blocks";
import { LIST_BLOCKS, type ListItem } from "@/lib/content/list-blocks";

/**
 * Contenido de bloques de páginas estáticas (patrón mupes): devuelve el HTML
 * guardado desde el panel de administración o, si no existe (o la BD no está
 * disponible), el contenido por defecto registrado en page-blocks.ts.
 */
export async function getBlock(
  pageSlug: string,
  blockKey: string,
): Promise<string> {
  const def = PAGE_BLOCKS.find((p) => p.pageSlug === pageSlug)?.blocks.find(
    (b) => b.blockKey === blockKey,
  );
  const fallback = def?.defaultContent ?? "";

  try {
    const row = await prisma.contentBlock.findUnique({
      where: { pageSlug_blockKey: { pageSlug, blockKey } },
    });
    return row?.content ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Variante para textos planos (títulos, eyebrows, líneas de datos): devuelve
 * el bloque sin etiquetas HTML, para poder inyectarlo dentro de <h1>, <p>…
 */
export async function getBlockText(
  pageSlug: string,
  blockKey: string,
): Promise<string> {
  const html = await getBlock(pageSlug, blockKey);
  return html
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Lista editable (JSON en ContentBlock, blockKey con prefijo "list:").
 * Devuelve los elementos guardados desde el gestor o, si no existen o no son
 * un JSON válido, los defaultItems del registro.
 */
export async function getListBlock(
  pageSlug: string,
  blockKey: string,
): Promise<ListItem[]> {
  const def = LIST_BLOCKS.find(
    (l) => l.pageSlug === pageSlug && l.blockKey === blockKey,
  );
  const fallback = def?.defaultItems ?? [];

  try {
    const row = await prisma.contentBlock.findUnique({
      where: { pageSlug_blockKey: { pageSlug, blockKey } },
    });
    if (!row) return fallback;
    const parsed: unknown = JSON.parse(row.content);
    if (Array.isArray(parsed)) return parsed as ListItem[];
  } catch {
    // BD no disponible o JSON corrupto: usamos el contenido por defecto.
  }
  return fallback;
}
