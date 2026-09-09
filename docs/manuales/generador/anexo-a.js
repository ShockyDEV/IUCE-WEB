// Anexo A — Especificación de Requisitos (web institucional del IUCE).
const { DocCtx, t, b, i, c, cellLines } = require("./lib");

function build(ctx) {
  ctx.h1("Anexo A", "Especificación de Requisitos");

  // ── A.1 Introducción ─────────────────────────────────────────────────────
  ctx.h2("A.1. Introducción");
  ctx.h3("A.1.1. Propósito");
  ctx.p("Este anexo especifica los requisitos de la web institucional del IUCE: qué debe hacer el sistema (requisitos funcionales), con qué calidad (requisitos no funcionales), quiénes lo usan (actores), bajo qué reglas de negocio opera y cuáles son sus casos de uso principales. Sirve de referencia doble: deja constancia del análisis realizado y orienta a quien mantenga el sistema en el futuro sobre qué debe hacer el software y por qué. Los requisitos aquí recogidos reflejan el sistema realmente construido.");
  ctx.h3("A.1.2. Ámbito del sistema");
  ctx.p("El Instituto Universitario de Ciencias de la Educación (IUCE) es un instituto interdisciplinar de investigación de la Universidad de Salamanca, especializado en investigación en Educación Superior, que además ofrece formación al profesorado universitario, coordina programas de doctorado y desarrolla actividad de transferencia. Su web institucional (iuce.usal.es) es su carta de presentación pública: recoge quiénes lo forman, sus grupos y proyectos de investigación, su oferta formativa, sus noticias y eventos, y sus vías de contacto.");
  ctx.p("El sistema especificado sustituye a la web anterior (WordPress, 2010–2026) y cubre tres áreas: el sitio público bilingüe, el panel de administración con el que el personal del Instituto gestiona todo el contenido, y el área privada de miembros. La gestión de reservas de espacios queda fuera: la cubre la aplicación IUCE Reservas, con la que la web enlaza.");
  ctx.h3("A.1.3. Origen de los requisitos");
  ctx.p("Los requisitos no se fijaron de una vez, sino que se elicitaron y refinaron de forma incremental a partir de cuatro fuentes: (1) la web antigua, cuya estructura y contenido se auditaron página a página como línea base de lo que no podía perderse; (2) una fase de diseño previa con prototipos navegables de todas las páginas, revisados por la dirección del Instituto, que fijó la estructura, la identidad visual y buena parte del alcance; (3) la memoria de acreditación 2020–2025 del Instituto, como fuente de datos verificada para miembros, grupos, proyectos y estadísticas; y (4) las indicaciones de la dirección y del personal durante el desarrollo (jerarquía de contenidos, responsables de grupos, textos institucionales, visibilidad de secciones), incorporadas de forma continua sobre la aplicación ya operativa.");
  ctx.h3("A.1.4. Restricciones");
  ctx.bullets([
    "El tratamiento de datos personales queda sujeto al RGPD (Reglamento UE 2016/679) y a la LOPDGDD (Ley Orgánica 3/2018): publicación únicamente de datos profesionales de los miembros, con edición y baja a su alcance o al de la administración.",
    "Como sitio del sector público, la web debe atender el Real Decreto 1112/2018 sobre accesibilidad, incluida su declaración de accesibilidad.",
    "El acceso al área privada se apoya en las cuentas institucionales de correo existentes, sin crear credenciales nuevas.",
    "El sistema se despliega sobre la infraestructura del CPD de la USAL (mismo modelo que IUCE Reservas), no en plataformas comerciales.",
    "Se prioriza el software de código abierto y sin coste de licencias.",
    "El panel debe poder usarlo personal no técnico, íntegramente en español.",
  ]);
  ctx.h3("A.1.5. Dependencias");
  ctx.bullets([
    "El servicio de correo transaccional (Resend) entrega los mensajes con fiabilidad: de él dependen el acceso al área de miembros y los avisos del formulario de contacto.",
    "La disponibilidad del sistema en producción depende de la infraestructura gestionada por el CPD de la Universidad de Salamanca.",
    "Los usuarios acceden con navegadores modernos con JavaScript habilitado (la mayor parte del sitio público, no obstante, se renderiza en servidor y es legible sin JavaScript).",
    "La traducción automática al guardar es opcional y depende de una clave de API de DeepL; sin ella, el sistema funciona con las traducciones almacenadas.",
  ]);

  // ── A.2 Objetivos generales ──────────────────────────────────────────────
  ctx.h2("A.2. Objetivos generales");
  ctx.p("El objetivo general es dotar al IUCE de una web institucional bilingüe, completa y autogestionable. De él se derivan los objetivos de producto que el catálogo de requisitos concreta:");
  ctx.bullets([
    "Presentar la identidad y la actividad del Instituto: historia, equipo, miembros, grupos, proyectos, formación, doctorado, transferencia y estadísticas.",
    "Conservar y servir el histórico completo de noticias (2010–2026) sin romper ningún enlace antiguo.",
    "Permitir que personal no técnico edite todo el contenido desde un panel: desde una noticia hasta el último texto de una página estática.",
    "Servir todo el sitio público en español y en inglés.",
    "Ofrecer a los miembros un área privada con documentos, noticias internas y edición de su perfil, con acceso sin contraseñas.",
    "Cumplir las obligaciones de un sitio institucional: accesibilidad, aviso legal, cookies, protección de datos y buen posicionamiento.",
  ]);

  // ── A.3 Catálogo de requisitos ───────────────────────────────────────────
  ctx.h2("A.3. Catálogo de requisitos");
  ctx.h3("A.3.1. Requisitos funcionales");
  ctx.p("Los requisitos funcionales se agrupan por área del sistema. Cada requisito se identifica como RF-nn.");

  ctx.table({
    caption: "Requisitos funcionales del sitio público (transversales).",
    headers: ["Código", "Requisito"],
    widths: [0.13, 0.87],
    rows: [
      ["RF-01", "El sitio público ofrece navegación completa por secciones (Instituto, Investigación, Transferencia, Formación, Doctorado, Eventos, Noticias, Contacto) con menú responsivo accesible y pie institucional."],
      ["RF-02", "Todas las páginas públicas existen en español y en inglés (/en/…); un conmutador ES|EN mantiene la página actual y sus filtros al cambiar de idioma."],
      ["RF-03", "El sitio ofrece tema claro y oscuro conmutables; la preferencia del visitante se recuerda en su navegador."],
      ["RF-04", "La interfaz es responsiva (móvil, tableta y escritorio) e incluye enlace de salto al contenido para lectores de pantalla."],
      ["RF-05", "La administración puede ocultar temporalmente páginas completas; una página oculta desaparece de menús, portada y sitemap y devuelve 404 al público, pero sigue siendo previsualizable con sesión de administración."],
      ["RF-06", "Las direcciones de la web antigua redirigen de forma permanente (HTTP 308) a sus equivalentes nuevas, incluidas las 212 noticias del histórico y el feed RSS."],
    ],
  });

  ctx.table({
    caption: "Requisitos funcionales de noticias y eventos.",
    headers: ["Código", "Requisito"],
    widths: [0.13, 0.87],
    rows: [
      ["RF-07", "Listado público de noticias con paginación, buscador por texto y filtros por año y categoría (operativos sin JavaScript)."],
      ["RF-08", "Cada noticia tiene página propia con URL estable (slug), imagen de portada, categoría y fecha; si carece de imagen, se muestra una portada de marca generada."],
      ["RF-09", "Las noticias marcadas como internas no aparecen en ningún punto del sitio público; solo en el área de miembros."],
      ["RF-10", "El sitio publica un canal RSS 2.0 con las últimas noticias."],
      ["RF-11", "Sección de eventos con próximos y pasados, tipo, fechas, lugar e imagen opcional; página del Seminario del IUCE con sus ediciones por año (crónica y actas)."],
    ],
  });

  ctx.table({
    caption: "Requisitos funcionales de Instituto, Investigación y Transferencia.",
    headers: ["Código", "Requisito"],
    widths: [0.13, 0.87],
    rows: [
      ["RF-12", "Página del Instituto con historia documentada del edificio, vídeo institucional, equipo de dirección (con fotografía, ORCID y extensión), personal de administración, instalaciones y cómo llegar."],
      ["RF-13", "Directorio de miembros con buscador, fotografía, área, distintivo de su grupo de investigación y enlaces a su perfil del Portal de la Investigación, ORCID y Scopus; el correo se ofrece con botón de copiar (no mailto). El consejo asesor se muestra en banda propia."],
      ["RF-14", "Página de Investigación con los nueve grupos oficiales (logo, responsable, distintivo UIC y enlace), publicaciones destacadas de la dirección y acceso a la producción científica del Portal de la Investigación."],
      ["RF-15", "Explorador de proyectos de investigación con búsqueda y filtros por estado y ámbito; la web pública lista únicamente los proyectos del IUCE (criterio de la memoria de acreditación), marcados como tales en el gestor."],
      ["RF-16", "Página de Transferencia con misión, indicadores y los Grupos de Transferencia del Conocimiento (GTC), cada uno con su dirección (con fotografía si es miembro) y su grupo de investigación vinculado."],
      ["RF-17", "Página de Estadísticas con seis indicadores de cabecera y quince gráficas interactivas por secciones (proyectos, publicaciones, formación, doctorado, transferencia, gestión), con animación de entrada y respeto de la preferencia de movimiento reducido."],
      ["RF-18", "Páginas de Formación (portal de formación, módulos FDI, manuales) y Doctorado (programas, grupos participantes) con subnavegación propia y documentos PDF embebidos."],
    ],
  });

  ctx.table({
    caption: "Requisitos funcionales de contacto y páginas legales.",
    headers: ["Código", "Requisito"],
    widths: [0.13, 0.87],
    rows: [
      ["RF-19", "Formulario de contacto con validación; cada envío queda registrado, notifica a la administración por correo (con responder-a al remitente) y devuelve un acuse de recibo automático."],
      ["RF-20", "Páginas legales editables: aviso legal, declaración de accesibilidad (RD 1112/2018) y política de cookies, enlazadas desde el pie."],
      ["RF-21", "SEO técnico: sitemap.xml (incluidas rutas /en), robots.txt (que excluye el área privada), metadatos y título por página en ambos idiomas, imagen OpenGraph institucional, datos estructurados JSON-LD y página 404 propia."],
    ],
  });

  ctx.table({
    caption: "Requisitos funcionales del área de miembros.",
    headers: ["Código", "Requisito"],
    widths: [0.13, 0.87],
    rows: [
      ["RF-22", "El acceso al área privada se realiza mediante enlace de un solo uso enviado al correo, con caducidad de 30 minutos y sin contraseñas."],
      ["RF-23", "Cualquier miembro del Instituto cuya ficha pública tenga correo accede automáticamente (alta silenciosa en el primer acceso); la administración puede autorizar direcciones adicionales y vetar cuentas concretas."],
      ["RF-24", "El área ofrece los documentos internos publicados por la administración; los ficheros se almacenan fuera del directorio público y solo se sirven con sesión válida."],
      ["RF-25", "El área muestra las noticias internas del Instituto."],
      ["RF-26", "Cada miembro puede editar su propia ficha pública (área, ORCID, enlaces, fotografía, que se redimensiona automáticamente) desde «Mi perfil»."],
    ],
  });

  ctx.table({
    caption: "Requisitos funcionales del panel de administración.",
    headers: ["Código", "Requisito"],
    widths: [0.13, 0.87],
    rows: [
      ["RF-27", "El panel (/backstage) requiere inicio de sesión con correo y contraseña; existen dos roles: ADMIN y SUPER_ADMIN (este último gestiona además las cuentas de administración)."],
      ["RF-28", "Gestión completa de noticias con editor visual (negritas, enlaces, tablas, imágenes subidas directamente), extracto, categoría, imagen de portada, estado (borrador/publicada/archivada), marca de interna y campos en inglés."],
      ["RF-29", "Gestión de miembros: datos de la ficha, área, correo, extensión, ORCID, Scopus, portal de investigación, grupo, orden y estado; la fotografía puede subirse, elegirse de las ya existentes o referenciarse por URL."],
      ["RF-30", "Gestión de grupos de investigación (nombre bilingüe, responsable, logo, distintivo, enlace), de eventos (con imagen), de proyectos (con la casilla «Proyecto del IUCE» y visibilidad) y de archivos (subida y biblioteca de ficheros)."],
      ["RF-31", "Edición de las páginas estáticas por piezas: 69 bloques de texto y 35 listas estructuradas (con campos tipados, iconos y reordenación), cada pieza con botón de «Restablecer original»."],
      ["RF-32", "Bandeja de mensajes del formulario de contacto con estado (nuevo/respondido)."],
      ["RF-33", "Gestión del área de miembros: usuarios autorizados/vetados y publicación de documentos internos."],
      ["RF-34", "Si hay clave de DeepL configurada, al guardar noticias y bloques se genera automáticamente su versión inglesa; existe además un punto de traducción bajo demanda."],
      ["RF-35", "Panel de inicio (dashboard) con recuentos reales del contenido y accesos directos."],
    ],
  });

  ctx.h3("A.3.2. Requisitos no funcionales");
  ctx.table({
    caption: "Requisitos no funcionales.",
    headers: ["Código", "Requisito"],
    widths: [0.13, 0.87],
    rows: [
      ["RNF-01", "Seguridad: contraseñas de administración con hash bcrypt; middleware que protege páginas y API privadas; limitación de tasa en los puntos sensibles (acceso por enlace, contacto, inicio de sesión); cabeceras de seguridad HTTP; tokens de acceso de un solo uso; documentos internos nunca expuestos en rutas públicas."],
      ["RNF-02", "Protección de datos: solo datos profesionales en la web pública; correo de los miembros no expuesto como enlace mailto; cumplimiento de RGPD/LOPDGDD con información al usuario en las páginas legales."],
      ["RNF-03", "Rendimiento: renderizado en servidor (Server Components) con JavaScript de cliente mínimo; imágenes optimizadas y redimensionadas en servidor; consultas tipadas con índices únicos donde procede."],
      ["RNF-04", "Accesibilidad: objetivo RD 1112/2018 (WCAG 2.1 AA): navegación por teclado, enlace de salto, textos alternativos, contraste en ambos temas y respeto de la preferencia de movimiento reducido."],
      ["RNF-05", "Compatibilidad: navegadores modernos de escritorio y móvil; el contenido esencial es legible sin JavaScript."],
      ["RNF-06", "Mantenibilidad: TypeScript estricto de extremo a extremo, esquema de datos como fuente única de verdad, pruebas unitarias automatizadas, semillas y migraciones idempotentes y documentación (este conjunto de anexos)."],
      ["RNF-07", "Idioma: toda la interfaz de administración en español; el sitio público, íntegro en español e inglés."],
    ],
  });

  // ── A.4 Actores, reglas y casos de uso ───────────────────────────────────
  ctx.h2("A.4. Actores, reglas de negocio y casos de uso");
  ctx.h3("A.4.1. Actores");
  ctx.table({
    caption: "Actores del sistema.",
    headers: ["Actor", "Descripción"],
    widths: [0.24, 0.76],
    rows: [
      ["Visitante", "Cualquier persona que navega por el sitio público, en español o inglés. No requiere cuenta."],
      ["Miembro del IUCE", "Personal investigador o técnico del Instituto. Accede al área privada con su correo institucional y gestiona su propio perfil público."],
      ["ADMIN", "Personal autorizado del Instituto. Gestiona todo el contenido desde el panel."],
      ["SUPER_ADMIN", "Administración técnica. Además de lo anterior, gestiona las cuentas de administración."],
      ["Sistemas externos", "Resend (entrega de correo transaccional) y, opcionalmente, DeepL (traducción automática al guardar)."],
    ],
  });
  ctx.h3("A.4.2. Reglas de negocio");
  ctx.table({
    caption: "Reglas de negocio.",
    headers: ["Código", "Regla"],
    widths: [0.13, 0.87],
    rows: [
      ["RN-01", "Acceso al área de miembros: una cuenta vetada por la administración nunca entra; en ausencia de veto, entra quien esté en la lista de autorizados o quien tenga correo en una ficha de miembro activa (en cuyo caso se registra automáticamente en el primer acceso)."],
      ["RN-02", "Una noticia interna no aparece jamás en el sitio público, su RSS ni su sitemap; solo en el área de miembros."],
      ["RN-03", "En la web pública solo se listan los proyectos activos marcados como «del IUCE» (firmados por el Instituto o con más de la mitad del equipo perteneciente a él)."],
      ["RN-04", "Una página oculta desde Visualización devuelve 404 al público y desaparece de menú, portada y sitemap; la sesión de administración sigue viéndola para previsualizar. La portada, las páginas legales y el área de miembros no son ocultables."],
      ["RN-05", "Cada grupo de investigación tiene un responsable que es, a su vez, miembro activo del propio grupo."],
      ["RN-06", "El consejo asesor se presenta separado de la rejilla general de miembros."],
      ["RN-07", "Las listas estructuradas no se traducen automáticamente (para no corromper sus datos); sus versiones inglesas se mantienen en registros propios o desde el panel."],
      ["RN-08", "Los textos editados desde el panel prevalecen sobre los valores de fábrica; «Restablecer original» recupera el texto de fábrica de la pieza. Los scripts de datos son de solo-relleno: nunca pisan cambios hechos desde el panel."],
      ["RN-09", "Sin clave de DeepL, la ruta /en sirve el texto español allí donde no exista traducción almacenada (nunca una página rota)."],
    ],
  });

  ctx.h3("A.4.3. Casos de uso principales");
  ctx.p("Se documentan los casos de uso que cubren los flujos más representativos del sistema; el resto de operaciones del panel siguen el mismo patrón CRUD.");

  const cu = (num, titulo, rows) => ctx.table({
    caption: `CU-${num} ${titulo}.`,
    headers: ["Campo", "Descripción"],
    widths: [0.22, 0.78],
    rows,
  });

  cu(1, "Publicar una noticia", [
    ["Actor", "ADMIN"],
    ["Precondición", "Sesión iniciada en el panel."],
    ["Flujo principal", cellLines([
      "1. El administrador entra en Noticias → Nueva noticia.",
      "2. Redacta título (el slug se genera automáticamente), extracto y cuerpo con el editor visual; puede subir imágenes al vuelo.",
      "3. Asigna categoría e imagen de portada y, si procede, marca «Noticia interna».",
      "4. Guarda con estado Publicada.",
      "5. El sistema fija la fecha de publicación, genera la versión inglesa si hay clave de traducción y la noticia aparece en el listado público, el RSS y el sitemap.",
    ])],
    ["Alternativas", cellLines([
      "4a. Guardada como Borrador: no es visible al público hasta publicarse.",
      "3a. Marcada interna: solo se muestra en el área de miembros (RN-02).",
    ])],
    ["Postcondición", "La noticia queda almacenada y visible según su estado."],
  ]);

  cu(2, "Editar el contenido de una página estática", [
    ["Actor", "ADMIN"],
    ["Precondición", "Sesión iniciada en el panel."],
    ["Flujo principal", cellLines([
      "1. El administrador entra en Contenido → Páginas y elige la página (p. ej., Instituto).",
      "2. Edita un bloque de texto, o una lista estructurada (añadir, eliminar o reordenar elementos y elegir icono).",
      "3. Guarda; la página pública muestra el cambio de inmediato.",
    ])],
    ["Alternativas", cellLines([
      "2a. «Restablecer original» recupera el texto de fábrica de esa pieza (RN-08).",
    ])],
    ["Postcondición", "El contenido editado prevalece sobre el valor de fábrica."],
  ]);

  cu(3, "Ocultar temporalmente una página", [
    ["Actor", "ADMIN"],
    ["Precondición", "Sesión iniciada en el panel."],
    ["Flujo principal", cellLines([
      "1. El administrador entra en Visualización.",
      "2. Desactiva el interruptor de la página (p. ej., Estadísticas).",
      "3. La página desaparece del menú, de la portada y del sitemap, y su URL pasa a devolver 404 al público (RN-04).",
    ])],
    ["Alternativas", cellLines(["2a. Reactivar el interruptor restaura la página en todos esos puntos."])],
    ["Postcondición", "El estado de visibilidad queda persistido y es reversible."],
  ]);

  cu(4, "Acceder al área de miembros", [
    ["Actor", "Miembro del IUCE"],
    ["Precondición", "Correo institucional operativo."],
    ["Flujo principal", cellLines([
      "1. El miembro abre /miembros y escribe su correo.",
      "2. El sistema valida la regla de acceso (RN-01) y envía un enlace de un solo uso (caducidad: 30 minutos).",
      "3. El miembro abre el enlace desde su correo y entra en el área: Documentos, Noticias internas y Mi perfil.",
    ])],
    ["Alternativas", cellLines([
      "2a. Dirección no autorizada: se le indica que escriba a la secretaría técnica del Instituto.",
      "3a. Enlace caducado o ya usado: puede solicitar uno nuevo (con limitación de tasa).",
    ])],
    ["Postcondición", "Sesión de miembro iniciada; si era su primer acceso como miembro con ficha, su cuenta queda registrada automáticamente."],
  ]);

  cu(5, "Editar mi perfil (miembro)", [
    ["Actor", "Miembro del IUCE"],
    ["Precondición", "Sesión iniciada en el área de miembros."],
    ["Flujo principal", cellLines([
      "1. El miembro entra en Mi perfil.",
      "2. Actualiza su área, sus enlaces (ORCID, portal) o su fotografía (el sistema la redimensiona automáticamente).",
      "3. Guarda; su ficha pública en /instituto refleja el cambio.",
    ])],
    ["Postcondición", "La ficha pública del miembro queda actualizada sin intervención de la administración."],
  ]);

  cu(6, "Publicar un documento interno", [
    ["Actor", "ADMIN"],
    ["Precondición", "Sesión iniciada en el panel."],
    ["Flujo principal", cellLines([
      "1. El administrador entra en Intranet → Documentos y sube el fichero con título y descripción.",
      "2. El sistema lo almacena fuera del directorio público.",
      "3. Los miembros lo ven y descargan desde el área privada, siempre con sesión (RF-24).",
    ])],
    ["Postcondición", "Documento disponible solo para miembros autenticados."],
  ]);

  cu(7, "Atender un mensaje de contacto", [
    ["Actor", "Visitante; ADMIN"],
    ["Precondición", "—"],
    ["Flujo principal", cellLines([
      "1. El visitante envía el formulario de contacto (validado y con limitación de tasa).",
      "2. El sistema guarda el mensaje, avisa por correo a la administración (responder-a: el remitente) y envía un acuse de recibo al visitante.",
      "3. El administrador lo consulta en Mensajes y lo marca como respondido tras contestarlo desde su correo.",
    ])],
    ["Postcondición", "El mensaje queda registrado con su estado de atención."],
  ]);

  cu(8, "Consultar el sitio en inglés", [
    ["Actor", "Visitante"],
    ["Precondición", "—"],
    ["Flujo principal", cellLines([
      "1. El visitante pulsa EN en la cabecera desde cualquier página.",
      "2. El sistema le sirve la misma página bajo /en/…, conservando filtros y paginación.",
      "3. Los textos se resuelven en cascada: traducción almacenada → registro en inglés → español (RN-09).",
    ])],
    ["Postcondición", "Navegación íntegra en inglés con URL indexables propias."],
  ]);

}

async function main() {
  const pages = process.argv[2] ? JSON.parse(require("fs").readFileSync(process.argv[2], "utf8")) : {};
  const ctx = new DocCtx({ docLabel: "Anexo A", docTitle: "Especificación de Requisitos", pages });
  build(ctx);
  await ctx.save(require("path").join(__dirname, "out", "Anexo_A_Especificacion_de_Requisitos.docx"));
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { build };
