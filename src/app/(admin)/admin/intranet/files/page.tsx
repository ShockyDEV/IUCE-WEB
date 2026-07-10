import { prisma } from "@/lib/prisma";
import {
  IntranetFilesSection,
  type IntranetDocRow,
} from "@/components/admin/intranet-files-section";

export const dynamic = "force-dynamic";

export default async function AdminIntranetFilesPage() {
  const docs = await prisma.intranetDocument.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows: IntranetDocRow[] = docs.map((d) => ({
    id: d.id,
    title: d.title,
    description: d.description,
    filename: d.filename,
    size: d.size,
    createdAt: d.createdAt.toISOString(),
  }));

  return <IntranetFilesSection rows={rows} />;
}
