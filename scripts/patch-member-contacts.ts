/**
 * Ajustes de contacto de miembros que no vienen del export de WordPress:
 * extensiones telefónicas del PTGAS y ORCID que faltaban. Idempotente
 * (empareja por correo o por nombre exacto). Ejecutar tras `prisma db push`:
 *   npx ts-node --compiler-options {"module":"CommonJS"} scripts/patch-member-contacts.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Extensiones telefónicas internas (por correo). */
const EXTENSIONS: Array<{ email: string; extension: string }> = [
  { email: "solmos@usal.es", extension: "3406" }, // Directora
  { email: "fgarcia@usal.es", extension: "6095" }, // Subdirector
  { email: "javiermerchan@usal.es", extension: "3368" }, // Secretario Académico
  { email: "fdecastro@usal.es", extension: "4634" }, // Secretaría administrativa
  { email: "iuce.tecnico@usal.es", extension: "1903" }, // Técnico informático
];

/** ORCID verificados (pub.orcid.org) que faltaban (por nombre exacto). */
const ORCIDS: Array<{ name: string; orcid: string }> = [
  { name: "Faraón Llorens Largo", orcid: "https://orcid.org/0000-0002-2117-0784" },
  { name: "Erla Mariela Morales Morgado", orcid: "https://orcid.org/0000-0001-5447-8251" },
  { name: "Nastaran Shoeibi", orcid: "https://orcid.org/0000-0003-4574-6220" },
  { name: "Alicia García Holgado", orcid: "https://orcid.org/0000-0001-9663-1103" },
  { name: "Erika García Silva", orcid: "https://orcid.org/0000-0001-8636-5534" },
  { name: "José Antonio Caride Gómez", orcid: "https://orcid.org/0000-0002-8651-4859" },
  { name: "María Soledad Ramírez Montoya", orcid: "https://orcid.org/0000-0002-1274-706X" },
];

async function main() {
  for (const { email, extension } of EXTENSIONS) {
    const r = await prisma.member.updateMany({
      where: { email },
      data: { extension },
    });
    console.log(`  ext ${extension} → ${email} (${r.count} fila/s)`);
  }

  for (const { name, orcid } of ORCIDS) {
    const r = await prisma.member.updateMany({
      where: { name, OR: [{ orcid: null }, { orcid: "" }] },
      data: { orcid },
    });
    console.log(`  orcid → ${name} (${r.count} fila/s)`);
  }

  const sinOrcid = await prisma.member.count({
    where: { active: true, OR: [{ orcid: null }, { orcid: "" }] },
  });
  console.log(`\nMiembros activos aún sin ORCID: ${sinOrcid}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
