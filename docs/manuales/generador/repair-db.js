// Repara lo que los scripts de datos no cubren tras reconstruir la BD:
//  1) vuelve a ocultar /estadisticas (orden de la dirección, 27-jul-2026)
//  2) re-registra los documentos internos cuyos ficheros siguen en storage/intranet
// Idempotente (upserts). Ejecutar desde iuce-web con su node_modules.
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require(path.join("C:/Users/USUARIO/Desktop/IUCE/iuce-web", "node_modules", "@prisma/client"));
const prisma = new PrismaClient();

const STORAGE = "C:/Users/USUARIO/Desktop/IUCE/iuce-web/storage/intranet";
const DOCS = [
  {
    storedName: "plan-estrategico-2025-2029-iuce-aprobado-consejo-iuce-22-07-2025-65a2cb73ac03.pdf",
    filename: "Plan Estrategico 2025-2029-IUCE_Aprobado-Consejo IUCE-22-07-2025.pdf",
    title: "Plan Estratégico 2025–2029",
    description: "Aprobado por el Consejo del IUCE el 22 de julio de 2025.",
  },
  {
    storedName: "memoria-iuce-curso-2024-2025-aprobada-consejo-iuce-22-07-2025-4d9fd782bb0d.pdf",
    filename: "Memoria IUCE_Curso 2024-2025-Aprobada Consejo IUCE-22-07-2025.pdf",
    title: "Memoria del curso 2024–2025",
    description: "Aprobada por el Consejo del IUCE el 22 de julio de 2025.",
  },
  {
    storedName: "12740-ri-ciencias-educacion-812333e09da4.pdf",
    filename: "Reglamento de Régimen Interno del IUCE (12740-RI).pdf",
    title: "Reglamento de Régimen Interno del IUCE",
    description: "Aprobado por el Consejo de Gobierno de la USAL el 28 de junio de 2023.",
  },
];

(async () => {
  // 1) ocultar /estadisticas
  await prisma.pageVisibility.upsert({
    where: { slug: "estadisticas" },
    update: { hidden: true },
    create: { slug: "estadisticas", hidden: true },
  });
  console.log("ok /estadisticas oculta");

  // 2) documentos internos
  for (const d of DOCS) {
    const file = path.join(STORAGE, d.storedName);
    if (!fs.existsSync(file)) { console.log("!! falta", d.storedName); continue; }
    const size = fs.statSync(file).size;
    const existing = await prisma.intranetDocument.findFirst({ where: { storedName: d.storedName } });
    if (existing) {
      console.log("ya registrado:", d.title);
      continue;
    }
    await prisma.intranetDocument.create({
      data: { title: d.title, description: d.description, filename: d.filename, storedName: d.storedName, mimeType: "application/pdf", size },
    });
    console.log("registrado:", d.title, `(${Math.round(size / 1024)} KB)`);
  }

  // resumen de control
  const counts = {};
  for (const [k, q] of Object.entries({
    noticias: prisma.news.count(),
    miembros: prisma.member.count(),
    grupos: prisma.researchGroup.count(),
    proyectos: prisma.project.count(),
    documentosInternos: prisma.intranetDocument.count(),
    bloquesEditados: prisma.contentBlock.count(),
  })) counts[k] = await q;
  console.log("RECUENTOS:", JSON.stringify(counts));
  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
