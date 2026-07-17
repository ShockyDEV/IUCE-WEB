import { prisma } from "@/lib/prisma";
import {
  ProjectsSection,
  type ProjectRow,
} from "@/components/admin/projects-section";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const items = await prisma.project.findMany({
    orderBy: [{ endYear: { sort: "desc", nulls: "last" } }, { title: "asc" }],
  });

  const rows: ProjectRow[] = items.map((p) => ({
    id: p.id,
    title: p.title,
    funder: p.funder,
    ip: p.ip,
    line: p.line,
    scope: p.scope,
    amount: p.amount,
    period: p.period,
    startYear: p.startYear,
    endYear: p.endYear,
    active: p.active,
    iuceLed: p.iuceLed,
  }));

  return <ProjectsSection rows={rows} />;
}
