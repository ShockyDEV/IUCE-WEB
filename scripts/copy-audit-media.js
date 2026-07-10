/**
 * Copia puntual de medios del export de WordPress recuperados en la
 * auditoría de contenido (julio 2026): espacios, plano, logo FIUNI e
 * índices de los libros 2009-2010. Idempotente.
 *
 *   node scripts/copy-audit-media.js
 */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const MEDIA = "C:/Users/USUARIO/Desktop/IUCE/NUEVA WEB IUCE/export/media";
const PUB = path.join(__dirname, "..", "public");

const IMAGES = [
  // [origen, destino, ancho máx]
  ["Direccion-editada_1-scaled.jpg", "images/instalaciones/direccion.jpg", 1600],
  ["GRIAL_4-editada-scaled.jpg", "images/instalaciones/laboratorio-grial.jpg", 1600],
  ["Laboratorio-de-investigacion-CEDETEL_4-editda-scaled.jpg", "images/instalaciones/laboratorio-cedetel.jpg", 1600],
  ["IUCE-exterior-editada_3-scaled.jpg", "images/instalaciones/edificio-solis-exterior.jpg", 1600],
  ["fiuni-1.png", "images/fiuni.png", 900],
  ["planoIUCE.png", "images/plano-iuce.png", 1400],
];

const COPIES = [
  ["MJNieto.pdf", "docs/publicaciones/indice-investigacion-evaluacion-educativa-2010.pdf"],
  ["Libro1.pdf", "docs/publicaciones/indice-investigacion-formacion-vol1-2009.pdf"],
  ["Libro2.pdf", "docs/publicaciones/indice-investigacion-formacion-vol2-2009.pdf"],
  ["Libro1Small.png", "docs/publicaciones/portada-investigacion-evaluacion-educativa.png"],
  ["Libro2Small.png", "docs/publicaciones/portada-investigacion-formacion-vol1.png"],
  ["Libro3Small.png", "docs/publicaciones/portada-investigacion-formacion-vol2.png"],
];

async function main() {
  for (const [src, dest, width] of IMAGES) {
    const out = path.join(PUB, dest);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    if (fs.existsSync(out)) {
      console.log(`= ${dest} (ya existe)`);
      continue;
    }
    await sharp(path.join(MEDIA, src))
      .resize({ width, withoutEnlargement: true })
      .toFile(out);
    console.log(`✓ ${dest}`);
  }
  for (const [src, dest] of COPIES) {
    const out = path.join(PUB, dest);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    if (!fs.existsSync(out)) {
      fs.copyFileSync(path.join(MEDIA, src), out);
      console.log(`✓ ${dest}`);
    } else {
      console.log(`= ${dest} (ya existe)`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
