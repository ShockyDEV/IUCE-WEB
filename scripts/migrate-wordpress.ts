/**
 * Migración del archivo histórico de iuce.usal.es (export WordPress) a la
 * nueva base de datos: 212 noticias (2010–2026) con sus imágenes, 72
 * miembros con foto y los 9 grupos de investigación oficiales con logo.
 *
 * Fuente: export de la API REST de WordPress en
 *   C:\Users\USUARIO\Desktop\IUCE\NUEVA WEB IUCE\export
 *   (configurable con la variable MIGRATION_EXPORT_DIR)
 *
 * Es IDEMPOTENTE: upserts por slug/nombre/acrónimo y las imágenes ya
 * procesadas se reutilizan. Ejecutar con:
 *   npx ts-node --compiler-options {"module":"CommonJS"} scripts/migrate-wordpress.ts
 */
import { PrismaClient } from "@prisma/client";
import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";
import { slugify } from "../src/lib/slugify";
import { groups as officialGroups } from "../src/lib/content/groups";

const EXPORT_DIR =
  process.env.MIGRATION_EXPORT_DIR ??
  "C:/Users/USUARIO/Desktop/IUCE/NUEVA WEB IUCE/export";
const MEDIA_DIR = path.join(EXPORT_DIR, "media");
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const LEGACY_DIR = path.join(PUBLIC_DIR, "uploads", "legacy");
const MEMBERS_DIR = path.join(LEGACY_DIR, "members");
const GROUPS_DIR = path.join(PUBLIC_DIR, "images", "groups");

const prisma = new PrismaClient();

// ─── Tipos mínimos del export WP ───────────────────────────────────────────

interface WpPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  featured_media: number;
}

interface WpMedia {
  id: number;
  source_url: string;
}

interface ExportMember {
  name: string;
  role: string | null;
  area: string | null;
  email: string | null;
  photoPath: string | null;
  group: string | null;
  /** Perfil en produccioncientifica.usal.es (enlace de la web original). */
  portalUrl?: string | null;
}

// ─── Utilidades ────────────────────────────────────────────────────────────

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8220;|&ldquo;/g, "«")
    .replace(/&#8221;|&rdquo;/g, "»")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** Nombre de archivo público seguro: slug del nombre + extensión original. */
function safeName(basename: string): string {
  const ext = path.extname(basename).toLowerCase();
  const stem = slugify(path.basename(basename, ext)) || "archivo";
  return `${stem}${ext}`;
}

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

/**
 * Procesa un archivo del export hacia public/uploads/legacy y devuelve su
 * URL pública, o null si el archivo no existe en el export.
 * Las imágenes (salvo GIF, por la animación) se acotan a maxWidth con sharp;
 * el resto (PDF, zip, mp4…) se copia tal cual. Con caché por nombre.
 */
const processed = new Map<string, string | null>();

async function processAsset(
  basename: string,
  maxWidth = 1600,
): Promise<string | null> {
  const cacheKey = `${basename}@${maxWidth}`;
  if (processed.has(cacheKey)) return processed.get(cacheKey)!;

  let src = path.join(MEDIA_DIR, basename);
  if (!fs.existsSync(src)) {
    // Variante -NNNxNNN que no se descargó: probar el original.
    const m = /^(.*)-\d+x\d+(\.[a-z0-9]+)$/i.exec(basename);
    if (m && fs.existsSync(path.join(MEDIA_DIR, `${m[1]}${m[2]}`))) {
      basename = `${m[1]}${m[2]}`;
      src = path.join(MEDIA_DIR, basename);
    } else {
      processed.set(cacheKey, null);
      return null;
    }
  }

  const out = safeName(basename);
  const dest = path.join(LEGACY_DIR, out);
  const url = `/uploads/legacy/${out}`;

  if (!fs.existsSync(dest)) {
    const ext = path.extname(out);
    if (IMAGE_EXTS.has(ext) && ext !== ".gif") {
      try {
        await sharp(src)
          .resize({ width: maxWidth, withoutEnlargement: true })
          .toFile(dest);
      } catch {
        fs.copyFileSync(src, dest); // imagen rara: copia sin tocar
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  processed.set(cacheKey, url);
  return url;
}

/** Extrae el basename si la URL apunta a wp-content/uploads del IUCE. */
function uploadsBasename(url: string): string | null {
  const m =
    /^(?:https?:\/\/iuce\.usal\.es)?(?:\.\.)?\/wp-content\/uploads\/([^/?#]+)/i.exec(
      url.trim(),
    );
  return m ? decodeURIComponent(m[1]) : null;
}

// ─── Limpieza y reescritura del HTML de los posts ──────────────────────────

const YT_ID = /(?:youtube\.com\/(?:v|embed)\/|youtu\.be\/)([\w-]{6,})/i;

async function cleanContent(
  html: string,
  slugSet: Set<string>,
): Promise<string> {
  let out = html;

  // 1) Fuera scripts, estilos y comentarios (incl. basura de Word [if mso]).
  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<style[\s\S]*?<\/style>/gi, "");
  out = out.replace(/<!--[\s\S]*?-->/g, "");
  // Div oculto que deja Word al pegar (posicionado fuera de pantalla).
  out = out.replace(
    /<div[^>]+style="[^"]*-10000px[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
    "",
  );

  // 2) Objetos/embeds de YouTube de la era Flash → iframe moderno.
  out = out.replace(/<object[\s\S]*?<\/object>/gi, (block) => {
    const m = YT_ID.exec(block);
    if (m) {
      return `<iframe width="640" height="360" src="https://www.youtube.com/embed/${m[1]}" title="Vídeo de YouTube" frameborder="0" allowfullscreen></iframe>`;
    }
    // <object> de PDF u otros: conservar el enlace al recurso si es de uploads
    const data = /data="([^"]+)"/i.exec(block);
    if (data) {
      const base = uploadsBasename(data[1]);
      if (base) return `<p data-pdf-link="${base}"></p>`;
    }
    return "";
  });
  out = out.replace(/<embed[^>]*>/gi, (tag) => {
    const m = YT_ID.exec(tag);
    return m
      ? `<iframe width="640" height="360" src="https://www.youtube.com/embed/${m[1]}" title="Vídeo de YouTube" frameborder="0" allowfullscreen></iframe>`
      : "";
  });

  // 3) Iframes con protocolo relativo //… → https://
  out = out.replace(/(<iframe[^>]+src=")\/\//gi, "$1https://");

  // 4) Imágenes: reescribir a /uploads/legacy y quitar srcset/sizes.
  const imgSrcs = [...out.matchAll(/<img[^>]+src="([^"]+)"/gi)].map(
    (m) => m[1],
  );
  for (const src of imgSrcs) {
    const base = uploadsBasename(src);
    if (!base) continue;
    const url = await processAsset(base);
    if (url) {
      out = out.split(src).join(url);
    }
  }
  out = out.replace(/\s(?:srcset|sizes)="[^"]*"/gi, "");

  // 5) Enlaces (PDF y demás adjuntos) y <video src> hacia uploads.
  const hrefs = [
    ...out.matchAll(/(?:href|src|data-pdf-link)="([^"]+)"/gi),
  ].map((m) => m[1]);
  for (const href of hrefs) {
    const base = uploadsBasename(href);
    if (!base) continue;
    const url = await processAsset(base);
    if (url) out = out.split(href).join(url);
  }
  // Materializa los marcadores de PDF embebido como enlace visible.
  out = out.replace(
    /<p data-pdf-link="([^"]+)"><\/p>/gi,
    (_, u) => `<p><a href="${u}" target="_blank" rel="noopener">Documento (PDF)</a></p>`,
  );

  // 6) Enlaces internos a otras noticias → ruta nueva /noticias/<slug>.
  out = out.replace(
    /href="https?:\/\/iuce\.usal\.es\/([a-z0-9-]+)\/?"/gi,
    (full, slug) => (slugSet.has(slug) ? `href="/noticias/${slug}"` : full),
  );

  return out.trim();
}

// ─── Migración de grupos ───────────────────────────────────────────────────

/** Logos originales del export por acrónimo (basenames en media/). */
const GROUP_LOGOS: Record<string, string> = {
  GRIAL: "grial_negro-1024x1024.png",
  OCA: "logograndeoca-edited.png",
  VisualMed: "visualmed_logoweb.png",
  GROUSAL: "grousal_logo_mediano.gif",
  DIDEROT: "image.png",
  CaUSAL: "GIR_CaUSAL_C1_azul.jpg",
  MOVERE: "Movere.png",
  EduDIG: "edudig-1024x449.png",
  INDIE: "indie.png",
};

async function migrateGroups(): Promise<Map<string, string>> {
  fs.mkdirSync(GROUPS_DIR, { recursive: true });

  // Copia los logos a public/images/groups/<acronimo>.<ext> (versionados).
  for (const g of officialGroups) {
    const original = GROUP_LOGOS[g.acronym];
    if (!original) continue;
    const srcPath = path.join(MEDIA_DIR, original);
    if (!fs.existsSync(srcPath)) {
      console.warn(`  ! logo no encontrado: ${original}`);
      continue;
    }
    const ext = path.extname(original).toLowerCase();
    const dest = path.join(GROUPS_DIR, `${slugify(g.acronym)}${ext}`);
    if (!fs.existsSync(dest)) {
      if (IMAGE_EXTS.has(ext) && ext !== ".gif") {
        await sharp(srcPath)
          .resize({ width: 600, withoutEnlargement: true })
          .toFile(dest);
      } else {
        fs.copyFileSync(srcPath, dest);
      }
    }
  }

  // Reconciliación: la lista oficial manda. Desvincular miembros, borrar los
  // grupos que ya no existen y upsert de los 9 oficiales.
  const wanted = new Set(officialGroups.map((g) => g.acronym));
  const existing = await prisma.researchGroup.findMany();
  for (const row of existing) {
    if (!wanted.has(row.acronym)) {
      await prisma.member.updateMany({
        where: { groupId: row.id },
        data: { groupId: null },
      });
      await prisma.researchGroup.delete({ where: { id: row.id } });
      console.log(`  − grupo retirado: ${row.acronym} (no consta en la web original)`);
    }
  }

  const ids = new Map<string, string>();
  for (const g of officialGroups) {
    const current = await prisma.researchGroup.findFirst({
      where: { acronym: g.acronym },
    });
    const data = {
      acronym: g.acronym,
      name: g.name,
      lead: g.lead ?? null,
      url: g.url ?? null,
      logo: g.logo ?? null,
      chip: g.chip ?? null,
    };
    const row = current
      ? await prisma.researchGroup.update({ where: { id: current.id }, data })
      : await prisma.researchGroup.create({ data });
    ids.set(g.acronym, row.id);
  }
  console.log(`✓ ${officialGroups.length} grupos oficiales sincronizados`);
  return ids;
}

// ─── Migración de miembros ─────────────────────────────────────────────────

async function migrateMembers(groupIds: Map<string, string>) {
  const file = path.join(__dirname, "data", "members-export.json");
  const { members } = JSON.parse(fs.readFileSync(file, "utf-8")) as {
    members: ExportMember[];
  };
  fs.mkdirSync(MEMBERS_DIR, { recursive: true });

  // Orden: equipo directivo primero, luego el orden de la página original.
  const roleOrder = (m: ExportMember) =>
    m.role === "Directora" ? 1 : m.role === "Subdirector" ? 2 : m.role === "Secretario" ? 3 : 10;

  let order = 0;
  let created = 0;
  let updated = 0;
  for (const m of members.sort((a, b) => roleOrder(a) - roleOrder(b))) {
    order += 1;

    // Foto → public/uploads/legacy/members/<slug>.<ext>
    let photoUrl: string | null = null;
    if (m.photoPath) {
      const srcPath = path.join(EXPORT_DIR, m.photoPath);
      if (fs.existsSync(srcPath)) {
        const ext = path.extname(m.photoPath).toLowerCase();
        const out = `${slugify(m.name)}${ext}`;
        const dest = path.join(MEMBERS_DIR, out);
        if (!fs.existsSync(dest)) {
          if (IMAGE_EXTS.has(ext) && ext !== ".gif") {
            await sharp(srcPath)
              .resize({ width: 512, height: 512, fit: "cover", withoutEnlargement: true })
              .toFile(dest);
          } else {
            fs.copyFileSync(srcPath, dest);
          }
        }
        photoUrl = `/uploads/legacy/members/${out}`;
      } else {
        console.warn(`  ! foto no encontrada: ${m.photoPath} (${m.name})`);
      }
    }

    const data = {
      name: m.name,
      role: m.role,
      area: m.area,
      email: m.email || null,
      photo: photoUrl,
      portalUrl: m.portalUrl || null,
      order,
      active: true,
      groupId: m.group ? (groupIds.get(m.group) ?? null) : null,
    };

    const existing = await prisma.member.findFirst({ where: { name: m.name } });
    if (existing) {
      await prisma.member.update({ where: { id: existing.id }, data });
      updated += 1;
    } else {
      await prisma.member.create({ data });
      created += 1;
    }
  }

  // Miembros de la BD que no figuran en el export (semilla antigua): fuera.
  const names = new Set(members.map((m) => m.name));
  const all = await prisma.member.findMany({ select: { id: true, name: true } });
  let removed = 0;
  for (const row of all) {
    if (!names.has(row.name)) {
      await prisma.member.delete({ where: { id: row.id } });
      console.log(`  − miembro retirado (no está en la web original): ${row.name}`);
      removed += 1;
    }
  }
  console.log(
    `✓ Miembros: ${created} creados, ${updated} actualizados, ${removed} retirados (total export: ${members.length})`,
  );
}

// ─── Migración de noticias ─────────────────────────────────────────────────

/** Regla determinista de mapeo de categorías (ver análisis del export). */
function mapCategory(cats: number[]): string {
  if (cats.includes(6)) return "Premios";
  if (cats.includes(143)) return "Doctorado";
  if (cats.includes(4)) return "Formación";
  if (cats.includes(438)) return "Congresos";
  if (cats.includes(5)) return "Investigación";
  return "Institucional";
}

/** Slugs de las 7 noticias inventadas del seed inicial (se retiran). */
const SEED_SLUGS = [
  "xxii-congreso-tecnologia-conocimiento-sociedad",
  "plan-formacion-profesorado-2026",
  "jiducyl26-jornada-innovacion-docente",
  "premio-ennova-health-visualmed",
  "congreso-evaluacion-educativa-bilbao",
  "semana-doctoral-2025",
  "memoria-actividades-2025",
];

async function migrateNews() {
  const posts = JSON.parse(
    fs.readFileSync(path.join(EXPORT_DIR, "raw", "posts.json"), "utf-8"),
  ) as WpPost[];
  const media = JSON.parse(
    fs.readFileSync(path.join(EXPORT_DIR, "raw", "media.json"), "utf-8"),
  ) as WpMedia[];
  const mediaById = new Map(media.map((m) => [m.id, m.source_url]));
  const slugSet = new Set(posts.map((p) => p.slug));

  // Retirar el contenido de muestra del seed (los posts reales lo sustituyen).
  const removedSeed = await prisma.news.deleteMany({
    where: { slug: { in: SEED_SLUGS } },
  });
  if (removedSeed.count > 0) {
    console.log(`  − ${removedSeed.count} noticias de muestra del seed retiradas`);
  }

  let done = 0;
  let noCover = 0;
  for (const p of posts) {
    if (p.status !== "publish") continue;

    const content = await cleanContent(p.content.rendered, slugSet);

    // Portada: featured_media o, en su defecto, primera imagen del contenido.
    let cover: string | null = null;
    if (p.featured_media && mediaById.has(p.featured_media)) {
      const base = uploadsBasename(mediaById.get(p.featured_media)!);
      if (base) cover = await processAsset(base, 1200);
    }
    if (!cover) {
      const img = /<img[^>]+src="(\/uploads\/legacy\/[^"]+)"/i.exec(content);
      cover = img?.[1] ?? null;
    }
    if (!cover) noCover += 1;

    let excerpt = stripTags(p.excerpt.rendered)
      .replace(/\s*\[…\]\s*$/, "…")
      .replace(/\s*Leer más.*$/i, "");
    if (excerpt.length > 400) excerpt = `${excerpt.slice(0, 397).trimEnd()}…`;

    const data = {
      title: decodeEntities(p.title.rendered).trim(),
      slug: p.slug,
      excerpt: excerpt || null,
      content,
      coverImage: cover,
      category: mapCategory(p.categories),
      status: "PUBLISHED" as const,
      publishedAt: new Date(p.date),
    };

    await prisma.news.upsert({
      where: { slug: p.slug },
      update: data,
      create: data,
    });
    done += 1;
    if (done % 50 === 0) console.log(`  … ${done}/${posts.length} noticias`);
  }
  console.log(`✓ ${done} noticias migradas (${noCover} sin imagen de portada)`);
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(MEDIA_DIR)) {
    throw new Error(`No se encuentra el export en ${EXPORT_DIR}`);
  }
  fs.mkdirSync(LEGACY_DIR, { recursive: true });

  console.log("— Grupos de investigación —");
  const groupIds = await migrateGroups();

  console.log("— Miembros —");
  await migrateMembers(groupIds);

  console.log("— Noticias históricas —");
  await migrateNews();

  console.log("Migración completada.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
