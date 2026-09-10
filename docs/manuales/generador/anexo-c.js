// Anexo C — Documentación técnica de programación (web institucional del IUCE).
const { DocCtx, t, b, i, c, cellLines } = require("./lib");

function build(ctx) {
  ctx.h1("Anexo C", "Documentación técnica de programación");

  // ── C.1 Introducción ─────────────────────────────────────────────────────
  ctx.h2("C.1. Introducción");
  ctx.p("Este anexo documenta el sistema desde la perspectiva del desarrollo y está dirigido a quien tenga que mantener o evolucionar el código. Recoge la organización del proyecto, la puesta en marcha, el manual del programador (servicios, API, contenido editable, scripts de datos), la estrategia de pruebas y el procedimiento de despliegue.");
  ctx.p("El proyecto es una aplicación full-stack en un único repositorio, escrita íntegramente en TypeScript sobre Next.js 14 con el App Router: no hay un backend separado, sino rutas y componentes que conviven bajo src/, y un esquema de datos (prisma/schema.prisma) que actúa como fuente única de verdad de la que derivan tanto la sincronización con la base de datos como los tipos del resto de capas.");

  // ── C.2 Estructura ───────────────────────────────────────────────────────
  ctx.h2("C.2. Estructura de directorios");
  ctx.code([
    "iuce-web/",
    "├─ prisma/            schema.prisma (modelo) · seed.ts (semilla)",
    "├─ public/            logos, imágenes y documentos públicos",
    "│  └─ uploads/        imágenes subidas + histórico (fuera de git)",
    "├─ storage/intranet/  documentos internos (fuera de git y public/)",
    "├─ scripts/           migración y carga de datos (véase C.4.5)",
    "│  └─ data/           datos congelados de los scripts (json)",
    "├─ docs/              design/ (prototipos) · manuales/ (esta doc.)",
    "└─ src/",
    "   ├─ middleware.ts   idioma /en + protección de zonas privadas",
    "   ├─ auth.config.ts  sesión edge-safe (JWT, roles)",
    "   ├─ app/",
    "   │  ├─ (public)/    sitio público + área de miembros /miembros",
    "   │  ├─ (admin)/backstage/  panel: news, pages, visualizacion,",
    "   │  │               members, groups, events, projects, files,",
    "   │  │               messages, intranet, settings",
    "   │  ├─ api/         REST: admin/, intranet/, contact, auth",
    "   │  ├─ auth/signin/ login del panel",
    "   │  └─ feed.xml/, sitemap.ts, robots.ts, opengraph-image…",
    "   ├─ components/     admin/ auth/ contact/ instituto/ intranet/",
    "   │                  investigacion/ layout/ news/ stats/ ui/",
    "   └─ lib/            servicios (C.4.2)",
    "      └─ content/     registros de fábrica ES+EN (bloques, listas,",
    "                      grupos, miembros, eventos, páginas ocultables)",
  ]);
  ctx.p("Las pruebas unitarias viven junto al código que verifican, en carpetas __tests__ (src/lib/__tests__ y src/components/__tests__).");

  // ── C.3 Puesta en marcha ─────────────────────────────────────────────────
  ctx.h2("C.3. Puesta en marcha, compilación y ejecución");
  ctx.h3("C.3.1. Requisitos e instalación en local");
  ctx.p("Se necesitan Node.js (18.17 o superior, requisito de Next.js 14), Docker con Docker Compose y Git. Docker se emplea únicamente para la base de datos en desarrollo; la aplicación corre con el servidor de desarrollo de Next.js:");
  ctx.code([
    "git clone <URL-del-repositorio> iuce-web",
    "cd iuce-web",
    "npm install              # instala dependencias y genera el cliente Prisma",
    "cp .env.example .env     # rellenar variables (véase C.3.2)",
    "docker compose up -d     # PostgreSQL 16 en el puerto 5433",
    "npm run db:push          # crea el esquema en la base de datos",
    "npm run db:seed          # contenido de fábrica + cuenta SUPER_ADMIN",
    "npm run dev              # http://localhost:3000",
  ]);
  ctx.p([t("El puerto de PostgreSQL es el "), c("5433"), t(" para no chocar con la base de datos local de IUCE Reservas (5432). El panel queda en "), c("http://localhost:3000/backstage"), t("; la cuenta inicial la crea la semilla con las variables "), c("ADMIN_EMAIL"), t(" / "), c("ADMIN_PASSWORD"), t(" (por defecto, la cuenta institucional del Instituto con una contraseña de desarrollo que debe cambiarse en producción). Para reconstruir el contenido completo (histórico de noticias incluido) se ejecutan además los scripts de datos de C.4.5.")]);

  ctx.h3("C.3.2. Variables de entorno");
  ctx.table({
    caption: "Variables de entorno.",
    headers: ["Variable", "Uso"],
    widths: [0.3, 0.7],
    rows: [
      [[c("DATABASE_URL")], "Cadena de conexión de PostgreSQL."],
      [[c("NEXTAUTH_URL")], "URL pública de la aplicación (localhost en desarrollo; dominio real en producción)."],
      [[c("NEXTAUTH_SECRET")], "Secreto de firma de las sesiones JWT (generar uno propio por entorno)."],
      [[c("RESEND_API_KEY")], "Clave del servicio de correo. Sin ella no salen correos: la solicitud de acceso al área de miembros devuelve el enlace en modo desarrollo y el contacto informa del fallo."],
      [[c("EMAIL_FROM")], "Remitente de los correos (debe pertenecer a un dominio verificado en Resend)."],
      [[c("CONTACT_TO")], "Buzón que recibe los avisos del formulario de contacto."],
      [[c("DEEPL_API_KEY")], "Opcional. Con clave, al guardar noticias y bloques se genera su versión inglesa; sin clave, la traducción se omite."],
      [[c("ADMIN_EMAIL"), t(" / "), c("ADMIN_PASSWORD")], "Credenciales de la cuenta SUPER_ADMIN que crea la semilla."],
      [[c("MIGRATION_EXPORT_DIR")], "Solo para la migración: carpeta del export de WordPress."],
    ],
  });

  ctx.h3("C.3.3. Comandos");
  ctx.table({
    caption: "Comandos npm del proyecto.",
    headers: ["Comando", "Acción"],
    widths: [0.3, 0.7],
    rows: [
      [[c("npm run dev")], "Servidor de desarrollo con recarga en caliente."],
      [[c("npm run build"), t(" / "), c("npm run start")], "Compilación de producción y arranque del servidor compilado."],
      [[c("npm run lint")], "ESLint con la configuración de Next."],
      [[c("npm run test"), t(" / "), c("npm run test:watch")], "Suite de pruebas Vitest (una pasada / en vigilancia)."],
      [[c("npm run db:push")], "Sincroniza el esquema Prisma con la base de datos."],
      [[c("npm run db:seed")], "Ejecuta la semilla (idempotente)."],
      [[c("npm run db:generate")], "Regenera el cliente Prisma."],
    ],
  });
  ctx.p([b("Avisos prácticos (Windows/desarrollo): "), t("tras un "), c("npm run build"), t(" de verificación conviene borrar la carpeta "), c(".next"), t(" antes de volver a "), c("npm run dev"), t(" (arrancar sobre artefactos de producción produce estados incoherentes); tras un "), c("db:push"), t(" con modelos nuevos hay que reiniciar el servidor de desarrollo (y, si persisten tipos antiguos, limpiar "), c(".next"), t("); y "), c("prisma generate"), t(" falla con EPERM si el servidor está corriendo, porque la DLL del cliente está bloqueada: parar el servidor, generar y arrancar de nuevo.")]);

  // ── C.4 Manual del programador ───────────────────────────────────────────
  ctx.h2("C.4. Manual del programador");
  ctx.h3("C.4.1. Convenciones generales");
  ctx.bullets([
    "TypeScript en modo estricto en todo el proyecto.",
    "Server Components por defecto; los componentes de cliente (\"use client\") se reservan para interactividad y reciben el idioma y los datos como propiedades (nunca importan helpers de servidor).",
    "La lógica de negocio y el acceso a datos viven en src/lib (servicios), no en las páginas; las páginas orquestan y presentan.",
    "Toda entrada de usuario se valida en servidor con Zod; los esquemas del panel están centralizados en lib/admin-schemas.ts.",
    "Las rutas de administración comprueban la sesión con el guard común (lib/admin-guard.ts) además de la protección del middleware.",
    "La interfaz del panel está íntegramente en español; los textos públicos bilingües siguen el sistema de contenido de C.4.4.",
  ]);

  ctx.h3("C.4.2. Servicios principales (src/lib)");
  ctx.table({
    caption: "Servicios y módulos de src/lib.",
    headers: ["Módulo", "Responsabilidad"],
    widths: [0.32, 0.68],
    size: 20,
    rows: [
      [[c("news-service.ts")], "Consultas de noticias públicas e internas (listados, filtros, detalle, RSS) con resolución de idioma."],
      [[c("content-blocks-service.ts")], "getBlock/getListBlock: resolución en cascada BD → registro EN → registro ES de bloques y listas."],
      [[c("projects-service.ts")], "Proyectos públicos (activos y del IUCE) y su explorador."],
      [[c("page-visibility.ts")], "assertVisible (404 si la página está oculta, salvo sesión de administración) y getHiddenPaths para menús y sitemap."],
      [[c("intranet-access.ts")], "Regla de acceso al área de miembros (veto, lista de autorizados, correo de miembro con alta automática)."],
      [[c("intranet-session.ts")], "Utilidades de la sesión de miembro (identidad, avatar con la foto de su ficha)."],
      [[c("auth.ts"), t(" · "), c("auth.config.ts")], "NextAuth v5: proveedor de credenciales del panel (bcrypt) y proveedor «intranet» (magic link) con rol INTRANET; configuración edge-safe para el middleware."],
      [[c("email.ts")], "Plantillas HTML institucionales (enlace de acceso, aviso y acuse de contacto) con logo incrustado (adjunto en línea) y versión de texto plano."],
      [[c("translate.ts")], "Cliente de DeepL para la traducción al guardar y bajo demanda (se omite sin clave)."],
      [[c("orcid.ts")], "Últimos artículos de la dirección vía la API pública de ORCID (caché de 24 h; null si falla, y la página usa la lista editable de reserva)."],
      [[c("rate-limit.ts")], "Limitación de tasa en memoria para los puntos sensibles."],
      [[c("metadata.ts")], "metadataBilingue: títulos y descripciones de página en el idioma de la petición."],
      [[c("locale.ts"), t(" · "), c("locale-server.ts")], "Idioma en cliente (pathLocale, withLocale, pick) y en servidor (getLocale desde la cabecera x-locale)."],
      [[c("validations.ts"), t(" · "), c("admin-schemas.ts")], "Esquemas Zod compartidos (contacto, entidades del panel)."],
      [[c("slugify.ts")], "Generación de slugs estables (con normalización de tildes y ñ)."],
      [[c("prisma.ts")], "Cliente Prisma único (singleton) del proceso."],
      [[c("icon-map.ts")], "Catálogo de iconos seleccionables en las listas estructuradas."],
      [[c("content/*")], "Registros de fábrica: page-blocks y list-blocks (ES y EN), groups, members, events, news (categorías) y public-pages (páginas ocultables)."],
    ],
  });

  ctx.h3("C.4.3. Cómo añadir contenido editable a una página");
  ctx.p("Para incorporar un texto o una lista nuevos al sistema de edición: (1) declarar la pieza en el registro correspondiente (lib/content/page-blocks.ts o list-blocks.ts) con su página, clave, etiqueta y valor de fábrica; (2) añadir su traducción de fábrica al registro -en homólogo; (3) leerla en la página con getBlock(pageSlug, blockKey) o getListBlock(...). La pieza aparece automáticamente en el panel (Contenido → Páginas) con su editor y su botón de restablecer. Dos reglas: las listas no se traducen automáticamente (sus versiones inglesas se mantienen en el registro -en o desde el panel) y las claves nunca se renombran a la ligera (la fila editada en base de datos quedaría huérfana).");

  ctx.h3("C.4.4. Endpoints de la API");
  ctx.p("Todos los endpoints devuelven JSON y validan con Zod. Los de /api/admin exigen sesión de administración (middleware + guard); los del área de miembros, la sesión que se indica.");
  ctx.table({
    caption: "Endpoints públicos y del área de miembros.",
    headers: ["Endpoint", "Métodos", "Función"],
    widths: [0.34, 0.14, 0.52],
    size: 20,
    rows: [
      [[c("/api/contact")], "POST", "Envío del formulario de contacto (valida, guarda, notifica y acusa; con límite de tasa)."],
      [[c("/api/intranet/request-link")], "POST", "Solicitud del enlace de acceso al área de miembros (regla de acceso + límite de tasa)."],
      [[c("/api/intranet/files/[id]")], "GET", "Descarga de un documento interno (requiere sesión INTRANET o de administración)."],
      [[c("/api/intranet/profile")], "PUT", "Actualización de la ficha del propio miembro."],
      [[c("/api/intranet/profile/photo")], "POST", "Subida de la foto del propio miembro (sharp, 512 px)."],
      [[c("/api/intranet/dev-access")], "GET", "Acceso directo de desarrollo (devuelve 404 en producción)."],
      [[c("/api/auth/[...nextauth]")], "—", "Rutas internas de NextAuth (login del panel y callback del magic link)."],
    ],
  });
  ctx.table({
    caption: "Endpoints de administración (/api/admin).",
    headers: ["Recurso", "Métodos", "Función"],
    widths: [0.34, 0.24, 0.42],
    size: 20,
    rows: [
      [[c("news"), t(" · "), c("news/[id]")], "GET POST · GET PUT DELETE", "CRUD de noticias."],
      [[c("members"), t(" · "), c("members/[id]")], "GET POST · PUT DELETE", "CRUD de miembros."],
      [[c("members/photo"), t(" · "), c("members/photos")], "POST · GET", "Subida de foto (sharp 512 px) y biblioteca de fotos existentes."],
      [[c("groups"), t(" · "), c("groups/[id]")], "GET POST · PUT DELETE", "CRUD de grupos de investigación."],
      [[c("events"), t(" · "), c("events/[id]")], "GET POST · PUT DELETE", "CRUD de eventos."],
      [[c("projects"), t(" · "), c("projects/[id]")], "GET POST · PUT DELETE", "CRUD de proyectos (incluida la marca «del IUCE»)."],
      [[c("files"), t(" · "), c("files/[id]")], "GET POST · DELETE", "Biblioteca de archivos (subidas a /uploads)."],
      [[c("messages/[id]")], "PUT DELETE", "Estado y borrado de mensajes de contacto."],
      [[c("content-blocks")], "GET PUT", "Lectura y guardado de bloques y listas editables."],
      [[c("page-visibility")], "GET PUT", "Interruptores de visibilidad de páginas."],
      [[c("intranet/users"), t(" · "), c("intranet/users/[id]")], "GET POST · PUT DELETE", "Usuarios del área de miembros (autorizar, vetar)."],
      [[c("intranet/files"), t(" · "), c("intranet/files/[id]")], "GET POST · PUT DELETE", "Documentos internos (metadatos y fichero)."],
      [[c("accounts")], "GET POST", "Cuentas de administración (solo SUPER_ADMIN)."],
      [[c("translate")], "POST", "Traducción bajo demanda vía DeepL."],
    ],
  });

  ctx.h3("C.4.5. Scripts de migración y carga de datos");
  ctx.p("Los scripts de scripts/ reconstruyen el contenido real. Todos son idempotentes y los que tocan datos editables son de solo-relleno: no pisan cambios hechos desde el panel. En un despliegue desde cero se ejecutan tras la semilla, en el orden de la tabla.");
  ctx.table({
    caption: "Scripts de datos.",
    headers: ["Script", "Función"],
    widths: [0.34, 0.66],
    size: 20,
    rows: [
      [[c("migrate-wordpress.ts")], "Migración del export de WordPress: 212 noticias (2010–2026) con sus imágenes, categorías mapeadas y fichas de miembros con foto y correo institucional."],
      [[c("recover-external-images.js")], "Recupera las imágenes de noticias antiguas que enlazaban a servicios externos desaparecidos (Flickr, Wayback Machine)."],
      [[c("copy-audit-media.js")], "Copia los medios recuperados en la auditoría de contenido de la web antigua (documentos, planos, PDF)."],
      [[c("import-projects.ts")], "Importa los proyectos de la Tabla 4 de la memoria de acreditación (scripts/data/projects.json)."],
      [[c("assign-member-groups.ts")], "Asigna grupo y responsables a los miembros según la evidencia recopilada (scripts/data/member-groups.json) y aplica las bajas dictadas por la dirección."],
      [[c("patch-member-contacts.ts")], "Completa extensiones telefónicas y ORCID verificados de la dirección y el personal."],
      [[c("apply-news-en.ts")], "Aplica los lotes de traducción de noticias (scripts/data/news-en/batch-*.json); solo-relleno, con --force para regenerar."],
      [[c("import-late-news.ts")], "Noticias publicadas en la web antigua DESPUÉS del export congelado (scripts/data/late-news/*.json, con ES y EN); solo-relleno, con --force para pisar. Mientras la web antigua siga viva, las noticias nuevas se añaden aquí."],
      [[c("backfill-news-en.ts")], "Vía alternativa: traduce con DeepL las noticias sin versión inglesa (requiere clave)."],
      [[c("fetch-orcids.py")], "Auxiliar de verificación de ORCID contra la API pública."],
    ],
  });

  ctx.h3("C.4.6. Correo transaccional");
  ctx.p([t("lib/email.ts construye los tres correos del sistema (enlace de acceso, aviso de contacto con responder-a al remitente y acuse de recibo) con una plantilla común: cabecera institucional con el logo "), b("incrustado como adjunto en línea"), t(" (de modo que se ve en cualquier cliente, sin depender de una URL pública), cuerpo con botón de acción, pie institucional y versión de texto plano. El SDK de Resend no lanza excepciones en los errores de API: los devuelve en el campo error de la respuesta, y las rutas lo comprueban explícitamente para no dar confirmaciones en falso.")]);

  ctx.h3("C.4.7. Internacionalización para el programador");
  ctx.bullets([
    "El middleware reescribe /en/* a la ruta española con la cabecera x-locale; getLocale() (solo servidor) la lee. Los componentes de cliente reciben locale como propiedad.",
    "Todo enlace interno de una página bilingüe se construye con withLocale(href, locale) para no salirse del idioma.",
    "Los metadatos de página usan metadataBilingue(es, en); el html lang es dinámico.",
    "El conmutador de idioma es un <a> nativo a propósito (navegación de documento completo): con un Link de cliente, ambos idiomas compartirían la caché del router y el contenido no cambiaría. Cualquier enlace futuro que cruce idiomas debe mantener esa regla.",
    "Textos nuevos: en páginas con pocos literales se usa un diccionario inline const T = { es, en } y pick(locale, T); el contenido editable sigue el sistema de registros de C.4.3.",
  ]);

  // ── C.5 Pruebas ──────────────────────────────────────────────────────────
  ctx.h2("C.5. Pruebas del sistema");
  ctx.p([t("La suite de pruebas unitarias corre con Vitest (entorno jsdom para los componentes) y cubre la lógica pura más sensible y los componentes de interfaz básicos. A fecha de esta documentación la suite comprende "), b("27 pruebas en 4 ficheros"), t(", todas en verde: slugify (6, incluida la normalización de tildes y ñ), validaciones Zod (10), tratamiento de la imagen de portada en el contenido (5) y componentes de UI (6). Se ejecuta con "), c("npm run test"), t(" y en modo vigilancia con "), c("npm run test:watch"), t("; las pruebas viven junto al código en carpetas __tests__.")]);
  ctx.p("La verificación funcional se completa con la compilación estricta de TypeScript y ESLint, y con la comprobación manual guiada de los flujos de usuario (incluido el correo real de extremo a extremo y la navegación de idioma, que debe verificarse con clic real en el navegador: las cargas directas de URL no reproducen el matiz de caché descrito en C.4.7).");

  // ── C.6 Despliegue ───────────────────────────────────────────────────────
  ctx.h2("C.6. Despliegue en producción");
  ctx.p("El modelo de producción replica el de IUCE Reservas en el CPD de la USAL: aplicación y PostgreSQL como contenedores Docker tras Apache 2 (proxy inverso con certificado Let's Encrypt). Lista de comprobación del despliegue:");
  ctx.bullets([
    "Variables de entorno de producción: NEXTAUTH_URL con el dominio real, NEXTAUTH_SECRET propio, credenciales de base de datos, RESEND_API_KEY y EMAIL_FROM de un dominio verificado.",
    "Cambiar la contraseña de la cuenta de administración inicial y dar de alta las cuentas reales (Configuración, con la cuenta SUPER_ADMIN).",
    "npm run build y arranque del contenedor de la aplicación; base de datos con db:push + seed + scripts de datos (C.4.5) o restauración de un volcado.",
    "Copiar los datos que no viajan con git: public/uploads (imágenes migradas y subidas), storage/ (documentos internos) y el volcado de la base de datos. Estos tres conjuntos forman también la copia de seguridad periódica.",
    "Verificar tras el arranque: envío real de un enlace de acceso y del formulario de contacto, navegación /en, robots y sitemap con el dominio real y redirecciones de la web antigua.",
    "Opcional: solicitar al CPD los registros DNS para un remitente de correo propio de la web.",
  ]);

}

async function main() {
  const pages = process.argv[2] ? JSON.parse(require("fs").readFileSync(process.argv[2], "utf8")) : {};
  const ctx = new DocCtx({ docLabel: "Anexo C", docTitle: "Documentación Técnica", pages });
  build(ctx);
  await ctx.save(require("path").join(__dirname, "out", "Anexo_C_Documentacion_Tecnica.docx"));
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { build };
