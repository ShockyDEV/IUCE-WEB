import { prisma } from "@/lib/prisma";
import { PAGE_BLOCKS } from "@/lib/content/page-blocks";

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
