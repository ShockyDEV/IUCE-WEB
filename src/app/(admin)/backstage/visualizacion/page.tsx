import { prisma } from "@/lib/prisma";
import { PUBLIC_PAGES } from "@/lib/content/public-pages";
import {
  VisibilitySection,
  type VisibilityRow,
} from "@/components/admin/visibility-section";

export const dynamic = "force-dynamic";

export default async function AdminVisibilidadPage() {
  const saved = await prisma.pageVisibility.findMany();
  const state = new Map(saved.map((r) => [r.slug, r.hidden]));

  const rows: VisibilityRow[] = PUBLIC_PAGES.map((p) => ({
    slug: p.slug,
    label: p.label,
    path: p.path,
    hint: p.hint,
    hidden: state.get(p.slug) ?? false,
  }));

  return <VisibilitySection rows={rows} />;
}
