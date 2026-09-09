// Capturas reales de la web para el Anexo D (documentación de usuario).
// Reutiliza el puppeteer-core del pipeline de ICED26 + Chrome del sistema.
const puppeteer = require("C:/Users/USUARIO/Desktop/IUCE/ICED26+/assets/node_modules/puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3000";
const OUT = path.join(__dirname, "shots");
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ADMIN_EMAIL = "iuce@usal.es";
const ADMIN_PASS = "iuce-admin-2026";

async function shot(page, file) {
  await sleep(350);
  await page.screenshot({ path: path.join(OUT, file) });
  console.log("ok", file);
}

async function goto(page, url, extra = 0) {
  await page.goto(BASE + url, { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(600 + extra);
}

// desplaza hasta que el elemento cuyo texto empiece por `txt` quede arriba
async function scrollToText(page, txt, offset = 90) {
  await page.evaluate((t, off) => {
    const el = [...document.querySelectorAll("h1,h2,h3")].find((e) => (e.innerText || "").trim().startsWith(t));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off });
  }, txt, offset);
  await sleep(500);
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--lang=es-ES", "--hide-scrollbars"],
    defaultViewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
  });

  const ONLY_ADMIN = !!process.env.ONLY_ADMIN;

  // ── sitio público ─────────────────────────────────────────────────────────
  const pub = await browser.newPage();
  if (ONLY_ADMIN) { console.log("(solo panel)"); } else {
  await goto(pub, "/", 600);
  await shot(pub, "home.png");

  // portada en oscuro — en contexto incógnito para que el localStorage del
  // tema no contamine el resto de capturas (comprobado: se filtraba)
  const darkCtx = await browser.createBrowserContext();
  const dark = await darkCtx.newPage();
  await dark.evaluateOnNewDocument(() => { try { localStorage.setItem("iuce-theme", "dark"); } catch {} });
  await dark.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(900);
  await shot(dark, "home-dark.png");
  await darkCtx.close();

  await goto(pub, "/instituto");
  await shot(pub, "instituto.png");
  await scrollToText(pub, "Equipo de dirección");
  await shot(pub, "instituto-equipo.png");
  await scrollToText(pub, "Miembros");
  await shot(pub, "instituto-miembros.png");

  await goto(pub, "/investigacion");
  await shot(pub, "investigacion.png");
  await scrollToText(pub, "Proyectos");
  await shot(pub, "investigacion-proyectos.png");

  await goto(pub, "/transferencia");
  await scrollToText(pub, "Grupos de Transferencia");
  await shot(pub, "transferencia-gtc.png");

  await goto(pub, "/noticias");
  await shot(pub, "noticias.png");
  // detalle: primera noticia del listado
  const firstNews = await pub.evaluate(() => {
    const a = document.querySelector('a[href^="/noticias/"]');
    return a ? a.getAttribute("href") : null;
  });
  if (firstNews) {
    await goto(pub, firstNews);
    await shot(pub, "noticia-detalle.png");
  }

  await goto(pub, "/eventos");
  await shot(pub, "eventos.png");
  await goto(pub, "/formacion");
  await shot(pub, "formacion.png");
  await goto(pub, "/doctorado");
  await shot(pub, "doctorado.png");
  await goto(pub, "/contacto");
  await shot(pub, "contacto.png");
  await goto(pub, "/seminario-iuce");
  await shot(pub, "seminario.png");

  // versión inglesa
  await goto(pub, "/en", 400);
  await shot(pub, "en-home.png");

  // ── área de miembros (acceso + dentro, vía acceso directo de desarrollo) ──
  await goto(pub, "/miembros");
  await shot(pub, "miembros-acceso.png");
  // acceso directo de desarrollo: la ruta encadena los redirects de NextAuth
  await pub.goto(BASE + "/api/intranet/dev-access", { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(1200);
  await pub.goto(BASE + "/miembros", { waitUntil: "networkidle2" });
  await sleep(900);
  const dentro = await pub.evaluate(() => !document.querySelector('input[type="email"]'));
  if (!dentro) console.log("!! el área sigue mostrando el formulario (dev-access no entró)");
  await shot(pub, "area-documentos.png");
  await goto(pub, "/miembros/noticias");
  await shot(pub, "area-noticias.png");
  await goto(pub, "/miembros/perfil");
  await shot(pub, "area-perfil.png");
  } // fin ONLY_ADMIN
  await pub.close();

  // ── panel de administración ──────────────────────────────────────────────
  const adm = await browser.newPage();
  await goto(adm, "/auth/signin");
  if (!ONLY_ADMIN) await shot(adm, "signin.png");
  await adm.type('input[name="email"]', ADMIN_EMAIL, { delay: 15 });
  await adm.type('input[name="password"]', ADMIN_PASS, { delay: 15 });
  await adm.click('button[type="submit"]');
  // el login usa signIn(redirect:false) + router.push: no hay navegación
  // clásica, se espera al cambio de ruta del cliente
  await adm.waitForFunction(() => location.pathname.startsWith("/backstage"), { timeout: 30000 });
  await sleep(1200);
  await shot(adm, "backstage-dashboard.png");

  const bs = [
    ["/backstage/news", "bs-news.png"],
    ["/backstage/pages", "bs-pages.png"],
    ["/backstage/visualizacion", "bs-visualizacion.png"],
    ["/backstage/members", "bs-members.png"],
    ["/backstage/groups", "bs-groups.png"],
    ["/backstage/events", "bs-events.png"],
    ["/backstage/projects", "bs-projects.png"],
    ["/backstage/files", "bs-files.png"],
    ["/backstage/messages", "bs-messages.png"],
    ["/backstage/intranet", "bs-intranet.png"],
    ["/backstage/intranet/users", "bs-intranet-users.png"],
    ["/backstage/settings", "bs-settings.png"],
  ];
  for (const [url, file] of bs) {
    await goto(adm, url);
    await shot(adm, file);
  }

  // editor de una noticia (la primera del listado del panel)
  await goto(adm, "/backstage/news");
  const firstEdit = await adm.evaluate(() => {
    const a = [...document.querySelectorAll('a[href^="/backstage/news/"]')].find((x) => !x.href.endsWith("/new"));
    return a ? a.getAttribute("href") : null;
  });
  if (firstEdit) {
    await goto(adm, firstEdit, 700);
    await shot(adm, "bs-news-editor.png");
  }

  // estadísticas (oculta al público; visible con sesión de administración)
  await goto(adm, "/estadisticas", 900);
  await shot(adm, "estadisticas.png");

  console.log("DONE");
  await browser.close();
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
