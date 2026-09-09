// Generador común de la documentación del proyecto iuce-web.
// Estilo replicado de la documentación del TFG IUCE Reservas:
// cuerpo Times New Roman 12 justificado, títulos Arial negrita con numeración
// manual, tablas con cabecera azul marino, pies "Tabla N."/"Figura N.",
// portada institucional y "Índice" con puntos de relleno (2.ª pasada).

const fs = require("fs");
const path = require("path");
const {
  AlignmentType, BorderStyle, Document, Footer, HeadingLevel, ImageRun,
  LeaderType, LevelFormat, PageNumber, Packer, Paragraph, ShadingType,
  Table, TableCell, TableRow, TabStopType, TextRun, VerticalAlign, WidthType,
} = require("docx");

const NAVY = "1F4257";       // cabeceras de tabla
const GRAY = "595959";       // rótulo "Anexo X"
const BODY_FONT = "Times New Roman";
const HEAD_FONT = "Arial";
const CODE_FONT = "Courier New";

const CM = 567; // dxa por cm
const PAGE_W = 11906, PAGE_H = 16838; // A4
const MARGIN = { top: 1418, bottom: 1418, left: 1701, right: 1418 };
const CONTENT_W = PAGE_W - MARGIN.left - MARGIN.right; // 8787 dxa

const IMG = {
  usal: "C:/Users/USUARIO/Desktop/IUCE/iuce-web/public/images/usal-logo.png",
  iuce: "C:/Users/USUARIO/Desktop/IUCE/iuce-web/public/images/iuce-logo-full.png",
};

function pngSize(file) {
  const b = fs.readFileSync(file);
  if (b.readUInt32BE(12) === 0x49484452) {
    return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  }
  throw new Error("No es PNG: " + file);
}

// ── runs ────────────────────────────────────────────────────────────────────
// t(): texto normal; b(): negrita; i(): cursiva; c(): código en línea.
const t = (text, extra = {}) => new TextRun({ text, font: BODY_FONT, size: 24, ...extra });
const b = (text) => t(text, { bold: true });
const i = (text) => t(text, { italics: true });
const c = (text) => new TextRun({ text, font: CODE_FONT, size: 22 });

class DocCtx {
  constructor(opts) {
    this.opts = opts;             // { docLabel, docTitle, fileBase, pages }
    this.children = [];
    this.toc = [];                // { level, text }
    this.nTable = 0;
    this.nFigure = 0;
    this.pages = opts.pages || {}; // texto de entrada → nº de página (2.ª pasada)
  }

  // ── títulos (numeración manual en el texto) ──────────────────────────────
  h1(label, title) {
    // "Anexo A" en gris + título grande; una sola entrada de índice.
    this.toc.push({ level: 1, text: title });
    this.children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 0, after: 240 },
      children: [
        new TextRun({ text: label, font: HEAD_FONT, size: 24, bold: true, color: GRAY, break: 0 }),
        new TextRun({ text: title, font: HEAD_FONT, size: 40, bold: true, color: "000000", break: 1 }),
      ],
    }));
  }

  h2(text) {
    this.toc.push({ level: 2, text });
    this.children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 360, after: 180 },
      children: [new TextRun({ text, font: HEAD_FONT, size: 28, bold: true, color: "000000" })],
    }));
  }

  h3(text) {
    this.toc.push({ level: 3, text });
    this.children.push(new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 300, after: 140 },
      children: [new TextRun({ text, font: HEAD_FONT, size: 24, bold: true, color: "000000" })],
    }));
  }

  h4(text) { // apartado sin numerar (estilo "Guía del usuario" del TFG)
    this.toc.push({ level: 3, text });
    this.children.push(new Paragraph({
      heading: HeadingLevel.HEADING_4,
      spacing: { before: 280, after: 120 },
      children: [new TextRun({ text, font: HEAD_FONT, size: 23, bold: true, color: "1F1F1F" })],
    }));
  }

  // ── cuerpo ───────────────────────────────────────────────────────────────
  p(content, extra = {}) {
    const children = typeof content === "string" ? [t(content)] : content;
    this.children.push(new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 160, line: 300 },
      children, ...extra,
    }));
  }

  bullets(items) {
    for (const item of items) {
      const children = typeof item === "string" ? [t(item)] : item;
      this.children.push(new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 80, line: 280 },
        children,
      }));
    }
    this.children[this.children.length - 1].root; // no-op
  }

  code(lines) {
    lines.forEach((line, idx) => {
      this.children.push(new Paragraph({
        spacing: { after: idx === lines.length - 1 ? 200 : 0, line: 240 },
        indent: { left: 400 },
        shading: { type: ShadingType.CLEAR, fill: "F5F5F5" },
        children: [new TextRun({ text: line === "" ? " " : line, font: CODE_FONT, size: 19 })],
      }));
    });
  }

  caption(kind, text) {
    const n = kind === "Tabla" ? ++this.nTable : ++this.nFigure;
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: kind === "Tabla" ? 60 : 120, after: 240, line: 240 },
      keepNext: kind === "Tabla",
      children: [
        new TextRun({ text: `${kind} ${n}. `, font: BODY_FONT, size: 22, bold: true }),
        new TextRun({ text, font: BODY_FONT, size: 22, italics: true }),
      ],
    });
  }

  // tabla con cabecera azul; widths en fracciones que suman 1
  table({ caption, headers, rows, widths, size = 21, align = [] }) {
    const wDxa = widths.map((w) => Math.round(w * CONTENT_W));
    const border = { style: BorderStyle.SINGLE, size: 4, color: "808080" };
    const borders = { top: border, bottom: border, left: border, right: border };
    const mk = (content, isHead, colIdx) => new TableCell({
      width: { size: wDxa[colIdx], type: WidthType.DXA },
      shading: isHead ? { type: ShadingType.CLEAR, fill: NAVY } : undefined,
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      borders,
      children: (Array.isArray(content) && content[0] instanceof Paragraph) ? content : [
        new Paragraph({
          alignment: isHead ? AlignmentType.LEFT : (align[colIdx] || AlignmentType.LEFT),
          spacing: { after: 0, line: 240 },
          children: typeof content === "string"
            ? [new TextRun({
                text: content,
                font: isHead ? HEAD_FONT : BODY_FONT,
                size: isHead ? size : size + 1,
                bold: isHead,
                color: isHead ? "FFFFFF" : "000000",
              })]
            : content,
        }),
      ],
    });
    const tRows = [
      new TableRow({ tableHeader: true, children: headers.map((h, ci) => mk(h, true, ci)) }),
      ...rows.map((r) => new TableRow({ children: r.map((cell, ci) => mk(cell, false, ci)) })),
    ];
    this.children.push(new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: wDxa,
      rows: tRows,
    }));
    if (caption) this.children.push(this.caption("Tabla", caption));
    else this.children.push(new Paragraph({ spacing: { after: 160 }, children: [] }));
  }

  figure({ caption, file, widthCm, ratio }) {
    // .png: dimensiones del propio fichero; .jpg: relación de aspecto dada
    // (las capturas comparten viewport 1280×800 → 1.6)
    const isJpg = /\.jpe?g$/i.test(file);
    const r = isJpg ? (ratio || 1.6) : (() => { const { w, h } = pngSize(file); return w / h; })();
    const wPx = Math.round(widthCm * 37.8);
    const hPx = Math.round(wPx / r);
    this.children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 60 },
      children: [new ImageRun({
        type: isJpg ? "jpg" : "png", data: fs.readFileSync(file),
        transformation: { width: wPx, height: hPx },
      })],
    }));
    if (caption) this.children.push(this.caption("Figura", caption));
  }

  pageBreak() {
    this.children.push(new Paragraph({ pageBreakBefore: true, children: [] }));
  }

  spacer(pts = 8) {
    this.children.push(new Paragraph({ spacing: { after: pts * 20 }, children: [] }));
  }

  // ── portada ──────────────────────────────────────────────────────────────
  coverChildren() {
    const { docLabel, docTitle } = this.opts;
    const usal = pngSize(IMG.usal), iuce = pngSize(IMG.iuce);
    const usalW = 220, iuceW = 300;
    const kids = [];
    const center = (children, spacingAfter = 0, spacingBefore = 0) =>
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: spacingAfter, before: spacingBefore }, children });

    kids.push(center([new ImageRun({
      type: "png", data: fs.readFileSync(IMG.usal),
      transformation: { width: usalW, height: Math.round(usalW * usal.h / usal.w) },
    })], 500, 700));
    kids.push(center([new ImageRun({
      type: "png", data: fs.readFileSync(IMG.iuce),
      transformation: { width: iuceW, height: Math.round(iuceW * iuce.h / iuce.w) },
    })], 200));
    kids.push(center([new TextRun({
      text: "Instituto Universitario de Ciencias de la Educación", font: BODY_FONT, size: 26, bold: true,
    })], 60, 400));
    kids.push(center([new TextRun({
      text: "Universidad de Salamanca", font: BODY_FONT, size: 26, bold: true,
    })], 900));

    kids.push(center([new TextRun({
      text: "Documentación del proyecto", font: BODY_FONT, size: 26, bold: true,
    })], 500));

    // caja de título sombreada, como la portada del TFG
    kids.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      shading: { type: ShadingType.CLEAR, fill: "E9E8F6" },
      spacing: { before: 100, after: 0, line: 300 },
      indent: { left: 400, right: 400 },
      children: [new TextRun({
        text: "Web institucional del IUCE", font: BODY_FONT, size: 32, bold: true,
      })],
    }));
    kids.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      shading: { type: ShadingType.CLEAR, fill: "E9E8F6" },
      spacing: { before: 0, after: 700, line: 300 },
      indent: { left: 400, right: 400 },
      children: [new TextRun({
        text: docLabel ? `${docLabel}: ${docTitle}` : docTitle,
        font: BODY_FONT, size: 28, bold: true,
      })],
    }));

    kids.push(center([new TextRun({ text: "Elaborado por", font: BODY_FONT, size: 24, italics: true })], 60, 500));
    kids.push(center([new TextRun({ text: "Enrique González Gutiérrez", font: BODY_FONT, size: 26, bold: true })], 700));
    kids.push(center([new TextRun({ text: "Salamanca, septiembre de 2026", font: BODY_FONT, size: 24 })], 0));
    kids.push(new Paragraph({ pageBreakBefore: true, children: [] }));
    return kids;
  }

  // ── índice (estático con puntos de relleno; páginas en la 2.ª pasada) ────
  tocChildren() {
    const kids = [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 360 },
      children: [new TextRun({ text: "Índice", font: HEAD_FONT, size: 32, bold: true })],
    })];
    for (const entry of this.toc) {
      const page = this.pages[entry.text] || "";
      const indent = { 1: 0, 2: 400, 3: 800 }[entry.level];
      kids.push(new Paragraph({
        spacing: { after: 60, line: 276 },
        indent: { left: indent },
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W, leader: LeaderType.DOT }],
        children: [
          new TextRun({
            text: entry.text, font: BODY_FONT, size: 22,
            bold: entry.level === 1,
          }),
          new TextRun({ text: `\t${page}`, font: BODY_FONT, size: 22 }),
        ],
      }));
    }
    kids.push(new Paragraph({ pageBreakBefore: true, children: [] }));
    return kids;
  }

  // ── documento ────────────────────────────────────────────────────────────
  async save(outFile) {
    const doc = new Document({
      styles: {
        default: {
          document: { run: { font: BODY_FONT, size: 24 } },
        },
      },
      numbering: {
        config: [{
          reference: "bullets",
          levels: [{
            level: 0, format: LevelFormat.BULLET, text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 640, hanging: 280 } } },
          }],
        }],
      },
      sections: [{
        properties: {
          page: { size: { width: PAGE_W, height: PAGE_H }, margin: MARGIN },
          titlePage: true,
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ children: [PageNumber.CURRENT], font: BODY_FONT, size: 20 })],
            })],
          }),
          first: new Footer({ children: [new Paragraph({ children: [] })] }),
        },
        children: [...this.coverChildren(), ...this.tocChildren(), ...this.children],
      }],
    });
    const buf = await Packer.toBuffer(doc);
    fs.writeFileSync(outFile, buf);
    // volcado del índice para la 2.ª pasada
    fs.writeFileSync(outFile.replace(/\.docx$/, ".toc.json"), JSON.stringify(this.toc, null, 2));
    console.log("OK", outFile, `(${this.toc.length} entradas de índice, ${this.nTable} tablas, ${this.nFigure} figuras)`);
  }
}

// celda de tabla con varias líneas (cada línea, un párrafo compacto)
function cellLines(lines, { size = 22 } = {}) {
  return lines.map((line) => new Paragraph({
    spacing: { after: 40, line: 240 },
    children: (typeof line === "string" ? [t(line, { size })] : line),
  }));
}

module.exports = { DocCtx, t, b, i, c, cellLines, AlignmentType, CM };
