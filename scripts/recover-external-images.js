/**
 * Rescate de las imágenes que 6 noticias históricas (2013–2019) hotlinkeaban
 * de webs externas (Flickr, teemconference.eu, grial.usal.es) y que por eso
 * no entraron en la migración del export de WordPress: se descargan de la
 * fuente viva o de la Wayback Machine, se localizan en public/uploads/legacy/
 * y se actualizan content + coverImage en la base de datos.
 *
 * Irrecuperables (se retira la <img> muerta del contenido): el logo
 * ACM_ICPS_v.2B.jpg y el logo de EFI-cinco (agora.grial.eu), sin copia en
 * el archivo. Idempotente: ficheros ya presentes no se vuelven a descargar.
 *
 * Ejecutar con:  node scripts/recover-external-images.js
 */
require("dotenv").config();
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");
const sharp = require("sharp");
const { PrismaClient } = require("@prisma/client");

const LEGACY = path.join(__dirname, "..", "public", "uploads", "legacy");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "iuce-recover-"));

/** [urlOriginal, urlDescarga (null = probar Flickr _b y luego la original), ficheroDestino] */
const RESCUES = [
  // «Una selección de imágenes del congreso TEEM13» — Flickr, 4 fotos
  ["http://farm3.staticflickr.com/2893/11840181076_756519a2f8.jpg", null, "teem13-galeria-1.jpg"],
  ["http://farm6.staticflickr.com/5493/11840081326_3788d9b7f9.jpg", null, "teem13-galeria-2.jpg"],
  ["http://farm6.staticflickr.com/5539/11840132746_d0cc5cc51f.jpg", null, "teem13-galeria-3.jpg"],
  ["http://farm6.staticflickr.com/5537/11839648583_81f45d7519.jpg", null, "teem13-galeria-4.jpg"],
  // «Reunión de seguimiento del grupo de Evaluación educativa y orientación» — Flickr
  ["http://farm4.staticflickr.com/3721/9330896698_b547d261ae.jpg", null, "reunion-evaluacion-2013-1.jpg"],
  ["http://farm4.staticflickr.com/3757/9330893398_49c583b0ba.jpg", null, "reunion-evaluacion-2013-2.jpg"],
  // Wayback Machine (el sufijo im_ sirve los bytes originales, sin banner)
  [
    "https://grial.usal.es/sites/default/files/img/FINAL%20Cartell_RGB_CASTELLA%CC%80.jpg",
    "http://web.archive.org/web/20191212144936im_/https://grial.usal.es/sites/default/files/img/FINAL%20Cartell_RGB_CASTELLA%CC%80.jpg",
    "ired19-barcelona-cartel.jpg",
  ],
  [
    "http://teemconference.eu/wp-content/uploads/imagenperfil-01.jpg",
    "http://web.archive.org/web/20140807175644im_/http://teemconference.eu/wp-content/uploads/imagenperfil-01.jpg",
    "teem14-perfil.jpg",
  ],
  [
    "http://teemconference.eu/wp-content/uploads/TEEM_title_logo.jpg",
    "http://web.archive.org/web/20150627060613im_/http://teemconference.eu/wp-content/uploads/TEEM_title_logo.jpg",
    "teem-2013-logo.jpg",
  ],
  [
    "http://teemconference.eu/wp-content/uploads/acm.gif",
    "http://web.archive.org/web/20130711230738im_/http://teemconference.eu/wp-content/uploads/acm.gif",
    "teem-acm.gif",
  ],
];

/** Sin copia en ningún archivo: se retira la etiqueta <img> del contenido. */
const REMOVE_SRC = [
  "http://teemconference.eu/wp-content/uploads/ACM_ICPS_v.2B.jpg",
  "http://agora.grial.eu/efi-cinco/files/2013/06/logo6pq.png",
];

const SLUGS = [
  "una-seleccion-de-imagenes-del-congreso-teem13",
  "reunion-de-seguimiento-del-grupo-de-evaluacion-educativa-y-orientacion",
  "i-conferencia-internacional-de-investigacion-en-educacion-en-barcelona",
  "technological-ecosystems-for-enhancing-multiculturality-teem14",
  "teem-2013",
  "la-gestion-de-la-informacion-nuevo-reto-de-los-centros-educativos",
];

/** Los logos pequeños no sirven de portada. */
const NOT_COVER = new Set(["/uploads/legacy/teem-acm.gif"]);

function flickrLarge(url) {
  // farmX .../ID_secret.jpg → variante _b (1024 px) si existe
  return url.replace(/(_[0-9a-f]+)\.jpg$/i, "$1_b.jpg");
}

function download(url, dest) {
  execSync(`curl -sL -m 60 --fail -o "${dest}" "${url}"`, { stdio: "pipe" });
  const buf = fs.readFileSync(dest);
  if (buf.length < 500) throw new Error(`descarga sospechosa (${buf.length} B)`);
  if (/<!doctype|<html/i.test(buf.slice(0, 64).toString("latin1"))) {
    throw new Error("la descarga devolvió HTML");
  }
}

async function main() {
  const prisma = new PrismaClient();
  const mapping = new Map(); // urlOriginal → ruta pública local

  for (const [original, altUrl, outName] of RESCUES) {
    const destFile = path.join(LEGACY, outName);
    const publicPath = `/uploads/legacy/${outName}`;

    if (!fs.existsSync(destFile)) {
      const tmpFile = path.join(TMP, outName);
      let got = false;
      for (const u of altUrl ? [altUrl] : [flickrLarge(original), original]) {
        try {
          download(u, tmpFile);
          console.log(`  ✓ descargada ${outName} ← ${u}`);
          got = true;
          break;
        } catch (e) {
          console.log(`  … falló ${u}: ${e.message}`);
        }
      }
      if (!got) {
        console.log(`  ✗ IRRECUPERABLE ${original}`);
        continue;
      }
      if (outName.endsWith(".gif")) {
        fs.copyFileSync(tmpFile, destFile);
      } else {
        // limitInputPixels: el cartel de Barcelona viene a resolución de imprenta
        await sharp(tmpFile, { limitInputPixels: false })
          .resize({ width: 1200, withoutEnlargement: true })
          .toFile(destFile);
      }
    }
    mapping.set(original, publicPath);
  }

  for (const slug of SLUGS) {
    const n = await prisma.news.findUnique({ where: { slug } });
    if (!n) {
      console.log(`  ? no existe ${slug}`);
      continue;
    }
    let content = n.content;

    for (const [oldUrl, newPath] of mapping) {
      content = content.split(oldUrl).join(newPath);
    }
    for (const dead of REMOVE_SRC) {
      const esc = dead.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      content = content
        .replace(new RegExp(`<a[^>]*>\\s*<img[^>]+src="${esc}"[^>]*/?>\\s*</a>`, "gi"), "")
        .replace(new RegExp(`<img[^>]+src="${esc}"[^>]*/?>`, "gi"), "");
    }

    let cover = n.coverImage;
    if (!cover) {
      const imgs = [...content.matchAll(/<img[^>]+src="(\/uploads\/legacy\/[^"]+)"/gi)]
        .map((m) => m[1])
        .filter((s) => !NOT_COVER.has(s));
      cover = imgs[0] ?? null;
    }

    if (content !== n.content || cover !== n.coverImage) {
      await prisma.news.update({ where: { slug }, data: { content, coverImage: cover } });
      console.log(`  ✍ ${slug} → cover=${cover ?? "—"}`);
    } else {
      console.log(`  = sin cambios ${slug}`);
    }
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
