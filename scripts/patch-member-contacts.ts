/**
 * Ajustes de contacto de miembros que no vienen del export de WordPress:
 * extensiones telefónicas del PTGAS y ORCID que faltaban. Idempotente
 * (empareja por correo o por nombre exacto). Ejecutar tras `prisma db push`:
 *   npx ts-node --compiler-options {"module":"CommonJS"} scripts/patch-member-contacts.ts
 */
import { PrismaClient } from "@prisma/client";
import scopusProfiles from "./data/member-scopus.json";

const prisma = new PrismaClient();

/** Extensiones telefónicas internas (por correo). */
const EXTENSIONS: Array<{ email: string; extension: string }> = [
  { email: "solmos@usal.es", extension: "3424" }, // Directora
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

  // Perfiles de Scopus sacados de la ficha del Portal de Producción
  // Científica (enlace estructurado title="Scopus"), en member-scopus.json.
  // SOLO-RELLENO: no pisa uno puesto a mano desde el panel.
  let scopus = 0;
  for (const { name, scopus: url } of scopusProfiles) {
    const r = await prisma.member.updateMany({
      where: { name, OR: [{ scopus: null }, { scopus: "" }] },
      data: { scopus: url },
    });
    scopus += r.count;
  }
  console.log(`  scopus → ${scopus} miembros`);

  const sinOrcid = await prisma.member.count({
    where: { active: true, OR: [{ orcid: null }, { orcid: "" }] },
  });
  const conScopus = await prisma.member.count({
    where: { active: true, NOT: { scopus: null } },
  });
  console.log(`\nMiembros activos aún sin ORCID: ${sinOrcid}`);
  console.log(`Miembros activos con Scopus: ${conScopus}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
