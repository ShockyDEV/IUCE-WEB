import { prisma } from "@/lib/prisma";
import {
  GroupsSection,
  type GroupRow,
} from "@/components/admin/groups-section";

export const dynamic = "force-dynamic";

export default async function AdminGroupsPage() {
  const [groups, members] = await Promise.all([
    prisma.researchGroup.findMany({
      orderBy: { acronym: "asc" },
      include: { _count: { select: { members: true } } },
    }),
    // Para el selector de responsable: los miembros activos del Instituto.
    prisma.member.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: { name: true },
    }),
  ]);

  const rows: GroupRow[] = groups.map((g) => ({
    id: g.id,
    acronym: g.acronym,
    name: g.name,
    lead: g.lead,
    url: g.url,
    logo: g.logo,
    chip: g.chip,
    memberCount: g._count.members,
  }));

  return (
    <GroupsSection rows={rows} memberNames={members.map((m) => m.name)} />
  );
}
