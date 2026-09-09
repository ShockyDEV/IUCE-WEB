// Volumen combinado: Anexos A–D con portada única, índice general y
// numeración continua de tablas y figuras (como el Anexos.pdf del TFG).
const { DocCtx } = require("./lib");
const a = require("./anexo-a");
const b = require("./anexo-b");
const c = require("./anexo-c");
const d = require("./anexo-d");

async function main() {
  const pages = process.argv[2] ? JSON.parse(require("fs").readFileSync(process.argv[2], "utf8")) : {};
  const ctx = new DocCtx({ docTitle: "Anexos", pages });
  a.build(ctx);
  ctx.pageBreak();
  b.build(ctx);
  ctx.pageBreak();
  c.build(ctx);
  ctx.pageBreak();
  d.build(ctx);
  await ctx.save(require("path").join(__dirname, "out", "Anexos.docx"));
}

main().catch((e) => { console.error(e); process.exit(1); });
