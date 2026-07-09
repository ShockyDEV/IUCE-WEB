/**
 * Semilla de la base de datos.
 *
 * De momento es un esqueleto. Cuando implementemos el panel de administración
 * sembraremos aquí el contenido real extraído de los prototipos: la cuenta
 * SUPER_ADMIN inicial, las noticias, los grupos de investigación, el equipo de
 * dirección, los eventos y los bloques de contenido de las páginas.
 *
 * Ejecutar con: npm run db:seed
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed pendiente: se completará con el panel de administración.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
