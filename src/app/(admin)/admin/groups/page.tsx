import { prisma } from "@/lib/prisma";
import {
  GroupsSection,
  type GroupRow,
} from "@/components/admin/groups-section";

export const dynamic = "force-dynamic";

export default async function AdminGroupsPage() {
  const groups = await prisma.researchGroup.findMany({
    orderBy: { acronym: "asc" },
    include: { _count: { select: { members: true } } },
  });

  const rows: GroupRow[] = groups.map((g) => ({
    id: g.id,
    acronym: g.acronym,
    name: g.name,
    lead: g.lead,
    url: g.url,
    memberCount: g._count.members,
  }));

  return <GroupsSection rows={rows} />;
}
