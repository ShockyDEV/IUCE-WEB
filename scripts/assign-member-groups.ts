/**
 * Asigna el grupo de investigación a cada miembro según su ficha del Portal
 * de Producción Científica de la USAL (el enlace de su tarjeta pública).
 *
 * Los datos vienen congelados en `scripts/data/member-groups.json`
 * (nombre → acrónimo del grupo IUCE + evidencia del portal). Cómo se
 * construyó el mapeo:
 *  - GTC «Evaluación Educativa - GRIALE2» y «… - GRIALhci» → GRIAL
 *  - GTC «Observatorio de Contenidos Audiovisuales - TOCA» → OCA
 *  - GTC «DIDEROT TransferLab» → DIDEROT
 *  - GIR «Robótica y Sociedad» → GROUSAL · GIR «Visualización Médica
 *    Avanzada» → VisualMed
 *  - GTC «Aprendizaje en Entornos Digitales - ConectaEDU» → EduDIG (la web
 *    del grupo, edudig.usal.es, se presenta como «(EduDIG) / GTC … (conectaEDU)»)
 *  - Juan José Mena → INDIE (equipo en indieusal.es/quienes-somos/)
 * Los GIR ajenos al IUCE (HESPERIA, Diversitas, PROCESOS, Memoria y
 * Proyecto…) se dejan sin asignar a propósito.
 *
 * Idempotente y SOLO-RELLENO: no pisa un grupo ya asignado (los cambios
 * hechos a mano en el panel ganan). Ejecutar tras `prisma db push`:
 *   npx tsx scripts/assign-member-groups.ts
 */
import { PrismaClient } from "@prisma/client";
import assignments from "./data/member-groups.json";
import removals from "./data/member-removals.json";

const prisma = new PrismaClient();

/**
 * Responsables de grupo confirmados por el IUCE (jul-2026); GRIAL, OCA y
 * VisualMed ya venían en la semilla. Los 9 grupos tienen responsable.
 * Mismo estilo abreviado que el resto («J. J. Igartua»).
 */
const GROUP_LEADS: Array<{ acronym: string; lead: string }> = [
  { acronym: "CaUSAL", lead: "C. López San Segundo" },
  { acronym: "DIDEROT", lead: "J. F. Merchán" },
  { acronym: "EduDIG", lead: "S. Casillas" },
  { acronym: "GROUSAL", lead: "V. Moreno" },
  { acronym: "INDIE", lead: "J. J. Mena" },
  { acronym: "MOVERE", lead: "J. Prieto" },
];

async function main() {
  const groups = await prisma.researchGroup.findMany({
    select: { id: true, acronym: true },
  });
  const byAcronym = new Map(groups.map((g) => [g.acronym, g.id]));

  let asignados = 0;
  let yaTenian = 0;
  let noEncontrados = 0;

  for (const a of assignments as Array<{ name: string; group: string }>) {
    const groupId = byAcronym.get(a.group);
    if (!groupId) {
      console.warn(`  ✗ grupo desconocido «${a.group}» (${a.name})`);
      continue;
    }
    const member = await prisma.member.findFirst({
      where: { name: a.name, active: true },
    });
    if (!member) {
      noEncontrados++;
      console.warn(`  ✗ miembro no encontrado: ${a.name}`);
      continue;
    }
    if (member.groupId) {
      yaTenian++;
      continue;
    }
    await prisma.member.update({
      where: { id: member.id },
      data: { groupId },
    });
    asignados++;
    console.log(`  ${a.group.padEnd(10)} → ${a.name}`);
  }

  // Bajas de la web pública (active=false; reversible desde el panel).
  let bajas = 0;
  for (const name of removals.desactivar) {
    const r = await prisma.member.updateMany({
      where: { name, active: true },
      data: { active: false },
    });
    if (r.count > 0) {
      bajas++;
      console.log(`  BAJA       → ${name}`);
    }
  }

  // Responsables de grupo. OJO: un `NOT: { lead }` a secas NO captura los
  // NULL (en SQL, NULL != 'x' evalúa a NULL) — de ahí el OR explícito.
  for (const { acronym, lead } of GROUP_LEADS) {
    const r = await prisma.researchGroup.updateMany({
      where: {
        acronym,
        OR: [{ lead: null }, { NOT: { lead } }],
      },
      data: { lead },
    });
    if (r.count > 0) console.log(`  LEAD       → ${acronym}: ${lead}`);
  }

  const conGrupo = await prisma.member.count({
    where: { active: true, NOT: { groupId: null } },
  });
  const activos = await prisma.member.count({ where: { active: true } });
  console.log(
    `\nAsignados ahora: ${asignados} · ya tenían grupo: ${yaTenian} · no encontrados: ${noEncontrados} · bajas aplicadas: ${bajas}`,
  );
  console.log(`Miembros activos: ${activos} · con grupo: ${conGrupo}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
