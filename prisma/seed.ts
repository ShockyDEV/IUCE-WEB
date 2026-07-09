/**
 * Semilla de la base de datos con el contenido real de los prototipos
 * (docs/design). Es idempotente: usa upsert/creación condicional, así que
 * puede ejecutarse varias veces sin duplicar datos.
 *
 * Ejecutar con: npm run db:seed
 *
 * La cuenta SUPER_ADMIN inicial se controla con las variables de entorno
 * ADMIN_EMAIL / ADMIN_PASSWORD (con valores de desarrollo por defecto).
 */
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { news } from "../src/lib/content/news";
import { featuredEvent, pastEvents, upcomingEvents } from "../src/lib/content/events";
import { groups } from "../src/lib/content/groups";
import { members } from "../src/lib/content/members";

const prisma = new PrismaClient();

async function main() {
  // --- Cuenta SUPER_ADMIN inicial -----------------------------------------
  const adminEmail = process.env.ADMIN_EMAIL ?? "iuce@usal.es";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "iuce-admin-2026";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Administración IUCE",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`✓ Usuario SUPER_ADMIN: ${adminEmail}`);

  // --- Noticias -------------------------------------------------------------
  for (const n of news) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {},
      create: {
        title: n.title,
        slug: n.slug,
        excerpt: n.excerpt,
        content: n.content,
        category: n.category,
        status: "PUBLISHED",
        publishedAt: new Date(n.publishedAt),
      },
    });
  }
  console.log(`✓ ${news.length} noticias`);

  // --- Grupos de investigación ----------------------------------------------
  const groupIds = new Map<string, string>();
  for (const g of groups) {
    const existing = await prisma.researchGroup.findFirst({
      where: { acronym: g.acronym },
    });
    const row =
      existing ??
      (await prisma.researchGroup.create({
        data: { acronym: g.acronym, name: g.name, lead: g.lead, url: g.url },
      }));
    groupIds.set(g.acronym, row.id);
  }
  console.log(`✓ ${groups.length} grupos de investigación`);

  // --- Miembros ---------------------------------------------------------------
  for (const m of members) {
    const existing = await prisma.member.findFirst({
      where: { name: m.name },
    });
    if (!existing) {
      await prisma.member.create({
        data: {
          name: m.name,
          area: m.area,
          email: m.email,
          role: m.role,
          order: m.order,
          groupId: m.group ? groupIds.get(m.group) : undefined,
        },
      });
    }
  }
  console.log(`✓ ${members.length} miembros`);

  // --- Eventos ------------------------------------------------------------------
  const allEvents = [
    {
      title: featuredEvent.title,
      type: featuredEvent.type,
      startsAt: new Date(featuredEvent.startsAt),
      location: featuredEvent.location,
      url: featuredEvent.url,
      status: "UPCOMING" as const,
    },
    ...upcomingEvents.map((e) => ({
      title: e.title,
      type: e.type,
      startsAt: new Date(e.startsAt),
      location: e.location,
      url: e.url,
      status: e.status,
    })),
    ...pastEvents.map((e) => ({
      title: e.title,
      type: e.type,
      startsAt: new Date(e.startsAt),
      location: e.location,
      url: e.url,
      status: e.status,
    })),
  ];
  for (const e of allEvents) {
    const existing = await prisma.event.findFirst({
      where: { title: e.title },
    });
    if (!existing) {
      await prisma.event.create({ data: e });
    }
  }
  console.log(`✓ ${allEvents.length} eventos`);

  console.log("Seed completado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
