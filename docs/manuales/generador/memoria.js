// Memoria del proyecto — Web institucional del IUCE.
const { DocCtx, t, b, i, c } = require("./lib");

async function main() {
  const pages = process.argv[2] ? JSON.parse(require("fs").readFileSync(process.argv[2], "utf8")) : {};
  const ctx = new DocCtx({ docTitle: "Memoria del proyecto", pages });

  ctx.h1("Documentación del proyecto", "Memoria del proyecto");

  // ── 1. Introducción ──────────────────────────────────────────────────────
  ctx.h2("1. Introducción");
  ctx.p("El Instituto Universitario de Ciencias de la Educación (IUCE) de la Universidad de Salamanca disponía de una web institucional construida sobre WordPress y alimentada desde 2010, que había quedado desactualizada en lo tecnológico y en lo funcional: un diseño no adaptado a móviles, un gestor pensado para perfiles técnicos, contenido en un único idioma y ninguna integración con las fuentes de datos actuales del Instituto (portal de producción científica, memoria de acreditación, sistema de reservas de espacios).");
  ctx.p("Este proyecto entrega una web institucional completamente nueva, desarrollada a medida, que sustituye a la anterior conservando todo su patrimonio: el histórico completo de noticias desde 2010 se ha migrado de forma automatizada y las direcciones antiguas siguen funcionando mediante redirecciones permanentes. Sobre esa base, la nueva web añade lo que la antigua no podía ofrecer: un panel de administración pensado para personal no técnico, desde el que se edita absolutamente todo el contenido; una versión en inglés de todo el sitio público; un área privada para los miembros del Instituto; y una capa de presentación moderna, rápida, accesible y adaptada a cualquier dispositivo.");
  ctx.p([t("El sistema es continuista con la plataforma de reservas de espacios del Instituto ("), i("IUCE Reservas"), t(", reservas.iuce.usal.es), desarrollada previamente por el mismo autor: comparte stack tecnológico, convenciones de código y modelo de despliegue, lo que reduce el coste de mantenimiento conjunto de ambos sistemas y permite reutilizar la experiencia operativa ya adquirida (correo transaccional, contenedores, proxy institucional).")]);
  ctx.p("Esta memoria resume el proyecto: sus objetivos y alcance, las tecnologías elegidas y las alternativas estudiadas, y los aspectos más relevantes del desarrollo. El detalle se recoge en cuatro anexos: Especificación de Requisitos (Anexo A), Especificación de Diseño (Anexo B), Documentación Técnica (Anexo C) y Documentación de Usuario (Anexo D).");

  // ── 2. Objetivos ─────────────────────────────────────────────────────────
  ctx.h2("2. Objetivos del proyecto");
  ctx.h3("2.1. Objetivo general");
  ctx.p("Dotar al IUCE de una web institucional propia, moderna y bilingüe, cuyo contenido pueda ser gestionado íntegramente por el personal del Instituto sin conocimientos técnicos, y que integre en un único lugar la identidad, la actividad y la producción del Instituto: quiénes lo forman, qué investiga, qué proyectos ejecuta, qué formación ofrece y qué transfiere a la sociedad.");
  ctx.h3("2.2. Objetivos específicos del producto");
  ctx.bullets([
    "Recrear todas las páginas institucionales (Instituto, Investigación, Transferencia, Formación, Doctorado, Eventos, Noticias, Contacto) con un diseño propio, responsivo y con modo claro y oscuro.",
    "Migrar el histórico completo de la web anterior: las 212 noticias publicadas entre 2010 y 2026, con sus imágenes, y las fichas de los 72 miembros con su fotografía.",
    "Hacer editable el cien por cien del contenido desde un panel de administración: noticias, miembros, grupos, proyectos, eventos, y también los textos y listas de las páginas estáticas.",
    "Publicar la web en español y en inglés, con un conmutador de idioma en cada página.",
    "Ofrecer un área privada («Área de miembros») con acceso sin contraseña para el personal del Instituto: documentos internos, noticias internas y edición del propio perfil público.",
    "Presentar los indicadores de actividad del Instituto (proyectos, publicaciones, formación, transferencia) con estadísticas interactivas alimentadas por la memoria de acreditación 2020–2025.",
    "Cuidar el posicionamiento y la continuidad: redirecciones desde todas las URL antiguas, sitemap, RSS, metadatos sociales y datos estructurados.",
    "Cumplir las obligaciones legales de un sitio institucional: aviso legal, accesibilidad (RD 1112/2018), política de cookies y tratamiento de datos conforme al RGPD.",
  ]);
  ctx.h3("2.3. Objetivos específicos del proceso");
  ctx.bullets([
    "Mantener un único lenguaje (TypeScript) y una única base de código para frontend, backend y modelo de datos.",
    "Garantizar la reproducibilidad: base de datos en contenedor, semillas y scripts de migración idempotentes que permiten reconstruir el contenido desde cero.",
    "Asegurar la calidad de forma continua con pruebas unitarias automatizadas y compilación estricta de tipos.",
    "Reutilizar patrones ya probados por el autor en otros sistemas del Instituto (IUCE Reservas) para minimizar el riesgo técnico.",
  ]);

  // ── 3. Alcance ───────────────────────────────────────────────────────────
  ctx.h2("3. Alcance y delimitación");
  ctx.h3("3.1. Dentro del alcance");
  ctx.p("El sistema cubre tres grandes áreas, descritas en detalle en el Anexo A:");
  ctx.bullets([
    [b("Sitio público. "), t("Portada; Instituto (historia, equipo de dirección, miembros con buscador, consejo asesor, instalaciones); Investigación (grupos, proyectos con explorador filtrable, publicaciones); Transferencia (incluidos los Grupos de Transferencia del Conocimiento); Formación; Doctorado; Estadísticas interactivas; Eventos y Seminario del IUCE; Noticias con buscador, categorías y RSS; Contacto con formulario; páginas legales. Todo ello en español e inglés, con tema claro y oscuro.")],
    [b("Panel de administración. "), t("Gestor completo en /backstage para personal no técnico: edición de noticias con editor visual, gestión de miembros (foto, ORCID, Scopus, grupo, extensión), grupos, proyectos, eventos, archivos, mensajes de contacto, bloques y listas de las páginas estáticas, visibilidad de páginas, documentos y usuarios del área de miembros, y cuentas de administración.")],
    [b("Área de miembros. "), t("Zona privada con acceso por enlace de un solo uso al correo institucional: documentos internos, noticias internas y edición del propio perfil.")],
  ]);
  ctx.h3("3.2. Fuera del alcance");
  ctx.p("Quedan deliberadamente fuera del alcance de esta versión: el inicio de sesión único institucional (SSO/SAML con idUSAL), que se plantea como línea futura; las aplicaciones móviles nativas (la web es responsiva); la gestión multi-instituto; un buscador global de sitio (existe buscador dentro de Noticias y de Miembros); y la integración con calendarios externos. La reserva de espacios no forma parte de este sistema porque ya la cubre IUCE Reservas, con el que la web enlaza.");
  ctx.h3("3.3. Entregables");
  ctx.bullets([
    [t("La aplicación web completa, con su código fuente en el repositorio público "), c("github.com/ShockyDEV/IUCE-WEB"), t(" (rama "), c("main"), t("), lista para desplegar en la infraestructura institucional.")],
    "La base de datos de contenido real: histórico migrado, miembros, grupos, proyectos de la memoria de acreditación y bloques editoriales.",
    "Los scripts de migración y carga de datos, re-ejecutables en el despliegue.",
    "La presente documentación (memoria y anexos A–D), en el directorio docs/manuales del repositorio.",
  ]);

  // ── 4. Técnicas y herramientas ───────────────────────────────────────────
  ctx.h2("4. Técnicas y herramientas");
  ctx.h3("4.1. Stack tecnológico");
  ctx.p("La aplicación es full-stack sobre Next.js con TypeScript de extremo a extremo: el mismo proyecto y lenguaje cubren la interfaz, la lógica de servidor y el acceso a datos. La tabla siguiente resume las piezas principales.");
  ctx.table({
    caption: "Visión general del stack.",
    headers: ["Capa", "Tecnología"],
    widths: [0.3, 0.7],
    rows: [
      ["Frontend", "Next.js 14 (App Router) + TypeScript 5 + React 18 (Server Components por defecto)"],
      ["Estilos / UI", "Tailwind CSS 3 · componentes propios · tokens de marca en variables CSS (tema claro/oscuro)"],
      ["Backend / API", "Route Handlers de Next.js (REST) + Prisma 6 (ORM)"],
      ["Base de datos", "PostgreSQL 16 (contenedor Docker; puerto 5433 en desarrollo)"],
      ["Autenticación", "NextAuth.js v5 · panel: credenciales con hash bcrypt · área de miembros: magic link sin contraseña"],
      ["Editor de contenido", "TipTap 3 (editor visual WYSIWYG con imágenes, tablas y enlaces)"],
      ["Email", "Resend (plantillas HTML propias con el logo incrustado)"],
      ["Gráficas", "Recharts (estadísticas interactivas)"],
      ["Imágenes", "sharp (miniaturas de miembros, imagen OpenGraph)"],
      ["Calidad", "Vitest (pruebas unitarias) · ESLint · TypeScript en modo estricto"],
      ["Despliegue", "Docker (app + PostgreSQL) tras Apache 2 como proxy inverso con Let's Encrypt, en la infraestructura del CPD de la USAL (mismo modelo que IUCE Reservas)"],
    ],
  });
  ctx.p([t("La elección replica deliberadamente el stack de "), i("IUCE Reservas"), t(": es un conjunto homogéneo, bien documentado y ya operado en producción por el Instituto. Prisma aporta un esquema tipado como única fuente de verdad del modelo de datos; los Server Components reducen el JavaScript servido al navegador; y Docker hace el entorno reproducible tanto en desarrollo como en producción.")]);

  ctx.h3("4.2. Alternativas estudiadas");
  ctx.p("Antes de desarrollar a medida se valoraron las alternativas naturales, que se descartaron por razones concretas:");
  ctx.bullets([
    [b("Continuar con WordPress. "), t("Habría conservado el gestor conocido, pero arrastraba los problemas de partida (plantilla obsoleta, dependencia de plugins, mantenimiento de seguridad constante) y no encajaba con los requisitos nuevos: bilingüismo estructurado, área privada con acceso institucional y estadísticas alimentadas por datos propios. El coste de personalizarlo superaba al de construir a medida con un stack ya dominado.")],
    [b("CMS headless (Strapi, Directus…) con frontend aparte. "), t("Separa el gestor del sitio, pero duplica infraestructura y lenguajes de configuración, y el gestor genérico habría exigido tanta personalización como el panel propio para lograr la edición por bloques y listas que se buscaba. El panel a medida, construido sobre el mismo patrón que ya usa el gestor de la web del MUPES y el de IUCE Reservas, ofrece exactamente los formularios que el personal necesita, en castellano y sin conceptos ajenos.")],
    [b("Traducción automática en tiempo real (widget). "), t("Se descartó frente a una versión en inglés real y revisable: los textos institucionales en inglés viven en la base de datos y en registros versionados, se sirven en rutas propias /en/… indexables y pueden corregirse desde el panel.")],
    [b("Contraseñas para el área de miembros. "), t("Se optó por el acceso por enlace de un solo uso (magic link) sobre el correo institucional @usal.es, el mismo mecanismo validado en IUCE Reservas: elimina la gestión de contraseñas y de altas, porque cualquier miembro con su correo en la ficha entra automáticamente.")],
  ]);

  ctx.h3("4.3. Método de trabajo y papel de la IA generativa");
  ctx.p("El desarrollo partió de una fase de diseño con prototipos navegables de todas las páginas (conservados en docs/design junto con el sistema de diseño y la especificación de handoff), que la dirección del Instituto revisó antes de construir. La implementación avanzó por áreas funcionales completas —páginas públicas, migración del histórico, panel, editabilidad total, versión inglesa, área de miembros, estadísticas—, validando cada área con la dirección del IUCE, cuyas indicaciones (jerarquía de contenidos, responsables de grupo, textos institucionales, visibilidad de secciones) se incorporaron de forma continua.");
  ctx.p("Como herramienta de apoyo se ha empleado IA generativa (Claude, de Anthropic) integrada en el flujo de trabajo, bajo la dirección y revisión del autor: aceleró la escritura de código repetitivo, la migración de datos y las traducciones al inglés, mientras que las decisiones de arquitectura, el modelo de datos, la validación funcional con los usuarios y el control de calidad final han sido en todo momento responsabilidad humana. El resultado práctico es un alcance que en un desarrollo tradicional habría requerido un equipo, ejecutado por una sola persona en un plazo contenido.");

  // ── 5. Aspectos relevantes ───────────────────────────────────────────────
  ctx.h2("5. Aspectos relevantes del desarrollo");

  ctx.h3("5.1. Migración del histórico de WordPress");
  ctx.p([t("El activo más valioso de la web antigua era su archivo: dieciséis años de noticias. A partir del export XML de WordPress se construyó un script de migración idempotente ("), c("scripts/migrate-wordpress.ts"), t(") que importó las 212 noticias (2010–2026) conservando su HTML, descargó sus imágenes (unos 108 MB, servidos desde uploads/legacy), mapeó las categorías antiguas a la taxonomía nueva con una regla determinista y recreó las fichas de los 72 miembros con su fotografía. Seis noticias antiguas enlazaban sus fotos en caliente desde servicios externos ya desaparecidos; se recuperaron de Flickr y de la Wayback Machine con un script específico. Las direcciones antiguas ("), c("/blog/aaaa/mm/dd/slug"), t(") redirigen de forma permanente (HTTP 308) a las nuevas, de modo que ningún enlace externo ni resultado de buscador se pierde.")]);

  ctx.h3("5.2. Editabilidad total: bloques y listas de contenido");
  ctx.p("La petición central del Instituto era no depender de un técnico para tocar ningún texto. Además de los CRUD clásicos (noticias, miembros, grupos, proyectos, eventos), las páginas «estáticas» se descomponen en piezas editables registradas en código y almacenadas en base de datos: 69 bloques de texto y 35 listas estructuradas (con campos tipados, iconos seleccionables y reordenación). El panel las presenta en Contenido → Páginas con un editor genérico, y cada pieza puede restablecerse a su texto original con un clic. Añadir una pieza nueva es una operación de desarrollo trivial (una entrada en un registro y una llamada en la página), documentada en el Anexo C.");

  ctx.h3("5.3. Versión en inglés sin duplicar rutas");
  ctx.p([t("Todo el sitio público existe en español y en inglés bajo "), c("/en/…"), t(". En lugar de duplicar el árbol de rutas, un middleware reescribe las peticiones /en/* a la ruta española equivalente marcándolas con una cabecera de idioma; las páginas resuelven entonces cada texto en cascada: fila en base de datos con sufijo :en, registro estático en inglés y, en último término, el español. Las noticias usan campos paralelos (titleEn, contentEn…) que pueden rellenarse automáticamente al guardar si se configura una clave de DeepL; en su ausencia, las traducciones institucionales se han generado por lotes revisables. El conmutador ES|EN de la cabecera mantiene la página y los filtros activos al cambiar de idioma.")]);

  ctx.h3("5.4. Área de miembros con acceso sin contraseña");
  ctx.p("El área privada (/miembros) usa enlaces de acceso de un solo uso enviados al correo institucional, con caducidad de 30 minutos. La política de acceso se apoya en los propios datos públicos: cualquier persona cuya ficha de miembro tenga correo entra automáticamente (con alta silenciosa en el primer acceso), la administración puede autorizar direcciones adicionales y también vetar cuentas concretas. Dentro, el miembro dispone de los documentos internos (almacenados fuera del directorio público y servidos solo con sesión), de las noticias marcadas como internas (que nunca aparecen en la web pública) y de la edición de su propio perfil, fotografía incluida.");

  ctx.h3("5.5. Datos de investigación: proyectos y estadísticas");
  ctx.p("La sección de Investigación se alimenta de datos reales de la memoria de acreditación 2020–2025. Los proyectos competitivos de su Tabla 4 se importaron a un modelo propio con un script idempotente; conforme al criterio del Instituto, la web pública lista únicamente los proyectos del IUCE (los firmados por el Instituto o con más de la mitad del equipo perteneciente a él, 57 en el momento de la importación), distinguidos mediante un campo específico que el panel permite ajustar proyecto a proyecto. La página de Estadísticas presenta los indicadores del Instituto con quince gráficas interactivas y seis indicadores de cabecera, todos editables desde el panel como listas de datos; a fecha de esta memoria la página está oculta a la espera del visto bueno de la dirección, mediante el mecanismo de visibilidad descrito a continuación.");

  ctx.h3("5.6. Visibilidad de páginas");
  ctx.p("La dirección puede ocultar temporalmente páginas completas sin intervención técnica (panel → Visualización): una página oculta desaparece del menú, de la portada y del sitemap, y su URL devuelve 404 al público, mientras que la administración sigue pudiendo previsualizarla. El estado vive en base de datos y es reversible con un interruptor.");

  ctx.h3("5.7. Seguridad y endurecimiento");
  ctx.bullets([
    "Panel bajo /backstage con autenticación de credenciales (hash bcrypt) y dos roles (ADMIN y SUPER_ADMIN); el middleware protege tanto las páginas como las API de administración.",
    "Limitación de tasa en memoria sobre los puntos sensibles: solicitud de enlaces de acceso, formulario de contacto e inicio de sesión del panel.",
    "Cabeceras de seguridad HTTP configuradas en la aplicación; robots.txt excluye el área privada; los documentos internos se sirven únicamente con sesión válida.",
    "Versión de Next.js fijada (14.2.35) tras auditoría de dependencias; los avisos restantes no afectan a la configuración desplegada y se resolverán con la migración mayor a Next 16, planificada como línea futura.",
  ]);

  ctx.h3("5.8. Correo transaccional");
  ctx.p("Los envíos (enlaces de acceso, avisos de contacto y acuse al remitente) salen por Resend con plantillas HTML propias coherentes con la identidad visual, versión de texto plano y el logotipo incrustado como adjunto en línea, de modo que se muestra correctamente en cualquier cliente de correo. El remitente utiliza el dominio institucional ya verificado del sistema de reservas; el paso a un remitente propio de la web requiere únicamente los registros DNS correspondientes.");

  ctx.h3("5.9. Posicionamiento, accesibilidad y calidad");
  ctx.p("La web genera sitemap (incluidas las rutas /en), robots.txt, canal RSS, imagen OpenGraph institucional y datos estructurados JSON-LD (organización de investigación y artículos de noticia); las páginas legales exigibles (aviso legal, accesibilidad conforme al RD 1112/2018, cookies) son editables desde el panel. La calidad del código se asegura con una suite de pruebas unitarias en Vitest, lint y compilación estricta de TypeScript; el contenido migrado se auditó página por página contra la web original para garantizar que nada se perdía.");

  // ── 6. Estado y líneas futuras ───────────────────────────────────────────
  ctx.h2("6. Estado del proyecto y líneas de trabajo futuras");
  ctx.p("El desarrollo está funcionalmente completo y verificado en entorno local con el contenido real: todas las páginas públicas en ambos idiomas, el panel con edición total, el área de miembros operativa de extremo a extremo (correo real incluido) y la base de datos poblada con el histórico migrado. Queda pendiente la puesta en producción sobre la infraestructura del CPD (build de producción, contenedores, proxy y certificado, cambio de credenciales iniciales y copia de los datos que viven fuera del repositorio), siguiendo el mismo procedimiento ya rodado con IUCE Reservas.");
  ctx.p("Como líneas futuras se identifican:");
  ctx.bullets([
    "Mantener al día la versión inglesa de las noticias que se publiquen (el histórico completo ya está traducido); puede automatizarse con una clave de DeepL o seguir el procedimiento por lotes documentado en el Anexo C.",
    "Incorporar las fotografías pendientes de instalaciones y personal.",
    "Single sign-on institucional (idUSAL) como evolución del acceso al área de miembros.",
    "Migración mayor a Next.js 16 cuando el ecosistema la haga conveniente.",
    "Remitente de correo propio de la web mediante los registros DNS del CPD.",
  ]);

  // ── 7. Referencias ───────────────────────────────────────────────────────
  ctx.h2("7. Referencias");
  ctx.bullets([
    [t("Next.js — documentación oficial del App Router: "), c("https://nextjs.org/docs")],
    [t("Prisma ORM — documentación oficial: "), c("https://www.prisma.io/docs")],
    [t("NextAuth.js (Auth.js) v5 — documentación oficial: "), c("https://authjs.dev")],
    [t("Tailwind CSS — documentación oficial: "), c("https://tailwindcss.com/docs")],
    [t("TipTap — documentación oficial: "), c("https://tiptap.dev/docs")],
    [t("Resend — documentación oficial: "), c("https://resend.com/docs")],
    [t("Real Decreto 1112/2018, de 7 de septiembre, sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público. BOE núm. 227.")],
    [t("Reglamento (UE) 2016/679 (RGPD) y Ley Orgánica 3/2018 (LOPDGDD).")],
    [t("IUCE Reservas — sistema de gestión de reservas de espacios del IUCE: "), c("https://github.com/ShockyDEV/IUCE-Reservas-TFG")],
  ]);

  await ctx.save(require("path").join(__dirname, "out", "Memoria.docx"));
}

main().catch((e) => { console.error(e); process.exit(1); });
