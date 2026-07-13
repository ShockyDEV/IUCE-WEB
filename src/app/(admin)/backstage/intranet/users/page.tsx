import { prisma } from "@/lib/prisma";
import {
  IntranetUsersSection,
  type IntranetUserRow,
} from "@/components/admin/intranet-users-section";

export const dynamic = "force-dynamic";

export default async function AdminIntranetUsersPage() {
  const users = await prisma.intranetUser.findMany({
    orderBy: { createdAt: "asc" },
  });

  const rows: IntranetUserRow[] = users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    active: u.active,
    lastLogin: u.lastLogin?.toISOString() ?? null,
    createdAt: u.createdAt.toISOString(),
  }));

  return <IntranetUsersSection rows={rows} />;
}
