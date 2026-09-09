// Renderiza los diagramas SVG (diagrams/*.html) a PNG nítidos (2x).
const puppeteer = require("C:/Users/USUARIO/Desktop/IUCE/ICED26+/assets/node_modules/puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const DIAGS = [
  ["diag-jerarquia.html", 900, 560],
  ["diag-estados.html", 940, 380],
  ["diag-secuencia.html", 1000, 640],
  ["diag-er.html", 1080, 730],
  ["diag-capas.html", 1000, 700],
  ["diag-en.html", 1060, 470],
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: "new",
    args: ["--no-sandbox", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  for (const [file, w, h] of DIAGS) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await page.goto("file:///" + path.join(__dirname, "diagrams", file).replace(/\\/g, "/"));
    await new Promise((r) => setTimeout(r, 250));
    const out = path.join(__dirname, "diagrams", file.replace(".html", ".png"));
    await page.screenshot({ path: out });
    console.log("ok", path.basename(out), fs.statSync(out).size, "bytes");
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
