import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { IntranetShell } from "@/components/intranet/intranet-shell";
import { ProfileForm } from "@/components/intranet/profile-form";
import { getIntranetSession, getMemberBadge } from "@/lib/intranet-session";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Mi perfil — Intranet",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

/**
 * Perfil del usuario de la intranet: datos de su cuenta y, si su correo
 * corresponde a un miembro del IUCE, su ficha pública editable (la misma
 * que se muestra en Instituto → Miembros).
 */
export default async function IntranetPerfilPage() {
  const session = await getIntranetSession();
  if (!session) redirect("/miembros");
  const badge = await getMemberBadge(session?.user?.email);
  const email = (session.user?.email ?? "").toLowerCase();

  const [account, member] = await Promise.all([
    prisma.intranetUser.findUnique({ where: { email } }),
    prisma.member.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      include: { group: { select: { acronym: true } } },
    }),
  ]);

  return (
    <IntranetShell
      active="/miembros/perfil"
      email={session.user?.email ?? ""}
      member={badge}
      breadcrumbLabel="Mi perfil"
    >
      <ProfileForm
        account={{
          email,
          name: account?.name ?? "",
          lastLogin: account?.lastLogin?.toISOString() ?? null,
        }}
        member={
          member
            ? {
                name: member.name,
                role: member.role,
                group: member.group?.acronym ?? null,
                area: member.area ?? "",
                photo: member.photo,
                orcid: member.orcid ?? "",
                portalUrl: member.portalUrl ?? "",
              }
            : null
        }
      />
    </IntranetShell>
  );
}
