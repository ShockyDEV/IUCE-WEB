// Anexo D — Documentación de usuario (web institucional del IUCE).
const path = require("path");
const { DocCtx, t, b, i, c } = require("./lib");

const SHOTS = path.join(__dirname, "shots-doc");
const fig = (f) => path.join(SHOTS, f.replace(/\.png$/, ".jpg"));

function build(ctx) {
  const W = 14.6; // ancho estándar de las capturas, en cm

  ctx.h1("Anexo D", "Documentación de usuario");

  // ── D.1 ──────────────────────────────────────────────────────────────────
  ctx.h2("D.1. Introducción");
  ctx.p("Este anexo es la guía práctica de la web institucional del IUCE. Está pensado para que cualquier persona del Instituto pueda manejar el sistema sin conocimientos técnicos, y se organiza en tres guías según el perfil: la guía del sitio público (cualquier visitante), la guía del área de miembros (personal del Instituto) y la guía del panel de administración (personal autorizado).");
  ctx.p("El sistema distingue cuatro perfiles: el visitante, que navega por el sitio público sin cuenta; el miembro del IUCE, que además accede al área privada con su correo institucional; el administrador (ADMIN), que gestiona todo el contenido desde el panel; y el superadministrador (SUPER_ADMIN), que además gestiona las cuentas de administración. Las capturas de este anexo son reales, tomadas sobre el sistema en funcionamiento con el contenido del Instituto.");

  ctx.h2("D.2. Requisitos de acceso");
  ctx.p([t("No hay nada que instalar: basta un navegador moderno (Chrome, Firefox, Edge o Safari actuales) en ordenador, tableta o móvil. Las direcciones de las tres zonas son: el sitio público en la raíz del dominio; el área de miembros en "), c("/miembros"), t("; y el panel de administración en "), c("/backstage"), t(" (con su acceso en "), c("/auth/signin"), t("). El sitio público está disponible en español y en inglés ("), c("/en"), t("). Para el área de miembros solo hace falta el correo institucional; para el panel, una cuenta de administración creada por el superadministrador.")]);

  ctx.h2("D.3. Instalación y puesta en marcha");
  ctx.p("La puesta en marcha del sistema (entorno local de evaluación y despliegue en producción) es una tarea técnica documentada en el Anexo C (apartados C.3 y C.6): en local se levanta con Docker (base de datos), la semilla de contenido y el servidor de desarrollo; en producción, como contenedores tras el proxy institucional del CPD. Este anexo asume el sistema ya en marcha.");

  // ── D.4 Sitio público ────────────────────────────────────────────────────
  ctx.h2("D.4. Guía del sitio público");
  ctx.h4("Portada y navegación");
  ctx.p("La portada presenta el Instituto con sus accesos principales: la cabecera lleva a todas las secciones (en pantallas pequeñas, mediante el menú desplegable), y bajo ella se suceden la presentación, los accesos rápidos y las últimas noticias y eventos. El pie repite la navegación y añade el contacto y las páginas legales. Dos controles de la cabecera acompañan a toda la web: el conmutador de idioma ES|EN y el interruptor de tema claro/oscuro; junto a ellos, el icono de la llave conduce al área de miembros.");
  ctx.figure({ caption: "Portada del sitio público.", file: fig("home.png"), widthCm: W });
  ctx.figure({ caption: "La misma portada con el tema oscuro activado; la preferencia se recuerda entre visitas.", file: fig("home-dark.png"), widthCm: W });
  ctx.h4("Versión en inglés");
  ctx.p("Al pulsar EN, la página actual se muestra en inglés bajo la dirección /en/…, conservando los filtros o la búsqueda activos; el enlace ES devuelve al español. Todas las secciones públicas están disponibles en ambos idiomas.");
  ctx.figure({ caption: "Portada en su versión inglesa (/en).", file: fig("en-home.png"), widthCm: W });

  ctx.h4("El Instituto");
  ctx.p("La página Instituto reúne la historia del edificio (con su vídeo y bibliografía), el equipo de dirección con sus datos de contacto (extensión, ORCID y botón de copiar el correo), el personal de administración, el directorio completo de miembros y las instalaciones con el plano de la primera planta y cómo llegar.");
  ctx.figure({ caption: "Instituto: historia y presentación.", file: fig("instituto.png"), widthCm: W });
  ctx.figure({ caption: "Equipo de dirección, con extensiones y perfiles de investigación.", file: fig("instituto-equipo.png"), widthCm: W });
  ctx.p("El directorio de miembros dispone de buscador por nombre. Cada ficha muestra la fotografía, el área, el distintivo de su grupo de investigación (que enlaza a la sección de grupos) y los accesos a su perfil del Portal de la Investigación, ORCID y Scopus; el correo se copia al portapapeles con un clic. El consejo asesor aparece en su propia banda bajo el directorio.");
  ctx.figure({ caption: "Directorio de miembros con buscador y distintivos de grupo.", file: fig("instituto-miembros.png"), widthCm: W });

  ctx.h4("Investigación");
  ctx.p("La sección de Investigación presenta los nueve grupos oficiales del Instituto (con su logo, responsable y enlace), el explorador de proyectos y las publicaciones destacadas, con acceso directo a la producción científica del Instituto en el Portal de la Investigación de la USAL.");
  ctx.figure({ caption: "Grupos de investigación del Instituto.", file: fig("investigacion.png"), widthCm: W });
  ctx.p("El explorador de proyectos permite buscar por texto y filtrar por estado (activos o finalizados) y por ámbito (europeo, nacional, autonómico…). Se listan los proyectos del IUCE conforme al criterio de la memoria de acreditación.");
  ctx.figure({ caption: "Explorador de proyectos con búsqueda y filtros.", file: fig("investigacion-proyectos.png"), widthCm: W });

  ctx.h4("Transferencia");
  ctx.p("La página de Transferencia expone la misión y los indicadores del Instituto en este ámbito y presenta los Grupos de Transferencia del Conocimiento (GTC), cada uno con su dirección y el grupo de investigación al que está vinculado.");
  ctx.figure({ caption: "Grupos de Transferencia del Conocimiento en la página de Transferencia.", file: fig("transferencia-gtc.png"), widthCm: W });

  ctx.h4("Noticias");
  ctx.p("El archivo de noticias reúne la actualidad del Instituto desde 2010. Se puede buscar por texto y filtrar por año y categoría; los filtros funcionan incluso sin JavaScript y se conservan al cambiar de página o de idioma. Cada noticia tiene su página propia, con su imagen, su categoría y su fecha; el canal RSS (/feed.xml) permite suscribirse.");
  ctx.figure({ caption: "Noticias: buscador, filtros por año y categoría, y archivo desde 2010.", file: fig("noticias.png"), widthCm: W });
  ctx.figure({ caption: "Detalle de una noticia.", file: fig("noticia-detalle.png"), widthCm: W });

  ctx.h4("Eventos y Seminario del IUCE");
  ctx.p("La página de Eventos separa los próximos de los pasados, con tipo, fechas y lugar. Desde ella se accede a la página del Seminario del IUCE, el encuentro anual de los grupos, organizada por ediciones anuales con su crónica y sus actas.");
  ctx.figure({ caption: "Eventos del Instituto.", file: fig("eventos.png"), widthCm: W });
  ctx.figure({ caption: "Página del Seminario del IUCE por ediciones.", file: fig("seminario.png"), widthCm: W });

  ctx.h4("Formación y Doctorado");
  ctx.p("Formación recoge el plan de formación docente del profesorado (con el acceso al portal de inscripciones, los módulos del plan FDI y los manuales), y Doctorado presenta los programas en los que participa el Instituto y los grupos implicados; ambas con subnavegación propia y documentos consultables sin salir de la página.");
  ctx.figure({ caption: "Página de Formación.", file: fig("formacion.png"), widthCm: W });
  ctx.figure({ caption: "Página de Doctorado.", file: fig("doctorado.png"), widthCm: W });

  ctx.h4("Contacto");
  ctx.p("La página de Contacto reúne dirección, teléfono, correo y el formulario de contacto. Al enviarlo, el mensaje llega a la administración del Instituto y el remitente recibe un acuse de recibo automático en su correo.");
  ctx.figure({ caption: "Contacto: datos, cómo llegar y formulario.", file: fig("contacto.png"), widthCm: W });

  ctx.h4("Estadísticas");
  ctx.p("La página de Estadísticas («El IUCE en cifras») presenta los indicadores del Instituto del periodo 2020–2025 con gráficas interactivas: proyectos y financiación, publicaciones, formación, doctorado, transferencia y gestión. Nota: la dirección puede mantener esta página (o cualquier otra) temporalmente oculta al público mediante el panel (véase «Visualización» en D.6); en ese estado, la administración sigue pudiendo previsualizarla.");
  ctx.figure({ caption: "Estadísticas interactivas del Instituto.", file: fig("estadisticas.png"), widthCm: W });

  // ── D.5 Área de miembros ─────────────────────────────────────────────────
  ctx.h2("D.5. Guía del área de miembros");
  ctx.h4("Acceder al área");
  ctx.p("El área de miembros se abre desde el icono de la llave de la cabecera (o directamente en /miembros). No hay contraseñas: se escribe el correo institucional y el sistema envía un enlace de acceso de un solo uso, válido durante 30 minutos. Puede entrar cualquier miembro del Instituto cuyo correo figure en su ficha pública; además, la administración puede autorizar otras direcciones. Si el sistema no reconoce la dirección, indica a quién escribir para solicitar el acceso.");
  ctx.figure({ caption: "Acceso al área de miembros: se solicita el enlace con el correo institucional.", file: fig("miembros-acceso.png"), widthCm: W });
  ctx.h4("Documentos");
  ctx.p("La pestaña de Documentos reúne los ficheros internos publicados por la administración (planes, memorias, reglamentos, plantillas). Solo son accesibles con sesión iniciada: sus enlaces no funcionan fuera del área.");
  ctx.figure({ caption: "Documentos internos del área de miembros.", file: fig("area-documentos.png"), widthCm: W });
  ctx.h4("Noticias internas");
  ctx.p("La pestaña de Noticias muestra las comunicaciones internas del Instituto: noticias que la administración marca como internas y que nunca aparecen en la web pública.");
  ctx.figure({ caption: "Noticias internas.", file: fig("area-noticias.png"), widthCm: W });
  ctx.h4("Mi perfil");
  ctx.p("En Mi perfil, cada miembro edita su propia ficha pública: área de investigación, enlaces (ORCID, portal de investigación) y fotografía, que el sistema recorta y optimiza automáticamente. Los cambios se reflejan al instante en el directorio público del Instituto.");
  ctx.figure({ caption: "Mi perfil: el miembro gestiona su ficha pública.", file: fig("area-perfil.png"), widthCm: W });

  // ── D.6 Panel ────────────────────────────────────────────────────────────
  ctx.h2("D.6. Guía del panel de administración");
  ctx.h4("Acceso al panel");
  ctx.p("El panel vive en /backstage y requiere una cuenta de administración (correo y contraseña). Tras iniciar sesión, el panel de inicio resume el estado del contenido con recuentos reales y accesos directos a cada sección; el menú lateral organiza todas las áreas de gestión.");
  ctx.figure({ caption: "Inicio de sesión del panel.", file: fig("signin.png"), widthCm: W });
  ctx.figure({ caption: "Panel de inicio con recuentos y accesos directos.", file: fig("backstage-dashboard.png"), widthCm: W });

  ctx.h4("Noticias");
  ctx.p("La sección de Noticias lista todas las existentes (con su estado: borrador, publicada o archivada) y permite crear nuevas. El editor es visual: negritas, títulos, enlaces, tablas e imágenes que se suben arrastrándolas o desde el botón correspondiente, sin salir del editor. Cada noticia admite extracto, categoría, imagen de portada y los campos en inglés; la casilla «Noticia interna» la reserva para el área de miembros. Al guardar, si hay traducción automática configurada, la versión inglesa se rellena sola y puede retocarse.");
  ctx.figure({ caption: "Gestión de noticias.", file: fig("bs-news.png"), widthCm: W });
  ctx.figure({ caption: "Editor visual de una noticia.", file: fig("bs-news-editor.png"), widthCm: W });

  ctx.h4("Contenido → Páginas (bloques y listas)");
  ctx.p("Todos los textos de las páginas «fijas» (Instituto, Formación, Transferencia, Estadísticas…) se editan aquí, organizados por página. Hay dos tipos de pieza: bloques de texto y listas estructuradas (elementos con campos como etiqueta y valor, icono seleccionable y flechas para reordenar; con los botones de añadir y eliminar). Cada pieza tiene su botón «Restablecer original» para volver al texto de fábrica. Los cambios se publican al guardar, sin pasos intermedios.");
  ctx.figure({ caption: "Edición por bloques y listas de las páginas estáticas.", file: fig("bs-pages.png"), widthCm: W });

  ctx.h4("Visualización");
  ctx.p("Visualización muestra un interruptor por página pública. Al desactivar el ojo de una página, esta desaparece del menú, de la portada y del sitemap, y su dirección deja de ser accesible para el público (la administración sí puede seguir viéndola para prepararla). Reactivar el interruptor la restaura por completo. La portada, las páginas legales y el área de miembros no se pueden ocultar.");
  ctx.figure({ caption: "Visualización: ocultar y mostrar páginas completas.", file: fig("bs-visualizacion.png"), widthCm: W });

  ctx.h4("Miembros");
  ctx.p("La sección de Miembros gestiona el directorio: datos de la ficha (nombre, área, cargo, correo, extensión), enlaces de investigación (portal, ORCID, Scopus), grupo de investigación, orden y visibilidad. La fotografía puede subirse desde el equipo (se recorta y optimiza automáticamente), elegirse de las ya existentes en la biblioteca o indicarse por URL. Los miembros del consejo asesor se gestionan igual, asignándoles su área.");
  ctx.figure({ caption: "Gestión de miembros.", file: fig("bs-members.png"), widthCm: W });

  ctx.h4("Grupos, Eventos y Proyectos");
  ctx.p("Grupos mantiene los grupos de investigación (nombre en ambos idiomas, responsable, logo, distintivo y enlace). Eventos gestiona la agenda (tipo, fechas, lugar, enlace e imagen ilustrativa). Proyectos administra el catálogo importado de la memoria de acreditación: la casilla «Proyecto del IUCE» decide si un proyecto aparece en la web pública, y cada ficha admite editar financiador, investigadores principales, ámbito, importe y periodo.");
  ctx.figure({ caption: "Gestión de grupos de investigación.", file: fig("bs-groups.png"), widthCm: W });
  ctx.figure({ caption: "Gestión de eventos.", file: fig("bs-events.png"), widthCm: W });
  ctx.figure({ caption: "Gestión de proyectos, con la casilla «Proyecto del IUCE».", file: fig("bs-projects.png"), widthCm: W });

  ctx.h4("Archivos y Mensajes");
  ctx.p("Archivos es la biblioteca de ficheros de la web: imágenes y documentos subidos desde el panel o desde el editor de noticias, con su dirección lista para copiar. Mensajes recoge lo enviado desde el formulario de contacto, con su estado (nuevo o respondido); el aviso llega también por correo con «responder» apuntando directamente al remitente.");
  ctx.figure({ caption: "Biblioteca de archivos.", file: fig("bs-files.png"), widthCm: W });
  ctx.figure({ caption: "Mensajes del formulario de contacto.", file: fig("bs-messages.png"), widthCm: W });

  ctx.h4("Área de miembros (administración)");
  ctx.p("Desde Intranet se gestiona el área privada: en Documentos se publican los ficheros internos (título, descripción y archivo), y en Usuarios se controla el acceso: los miembros con correo en su ficha entran solos (aparecen aquí tras su primer acceso), se pueden autorizar direcciones adicionales (colaboradores externos) y desactivar cuentas concretas, lo que les veta el acceso aunque sean miembros.");
  ctx.figure({ caption: "Documentos internos publicados para los miembros.", file: fig("bs-intranet.png"), widthCm: W });
  ctx.figure({ caption: "Usuarios del área de miembros: autorizados, automáticos y vetados.", file: fig("bs-intranet-users.png"), widthCm: W });

  ctx.h4("Configuración");
  ctx.p("Configuración reúne los datos generales del sitio y, para el superadministrador, la gestión de cuentas del panel: alta de nuevos administradores y cambio de contraseñas. Conviene que cada persona tenga su propia cuenta y que la contraseña inicial del sistema se cambie en el primer acceso.");
  ctx.figure({ caption: "Configuración y cuentas de administración.", file: fig("bs-settings.png"), widthCm: W });

  ctx.h4("Buenas prácticas");
  ctx.bullets([
    "Cambiar la contraseña inicial y usar una cuenta por persona; reservar SUPER_ADMIN para quien administre las cuentas.",
    "Subir imágenes razonables (fotografías ya recortadas); el sistema optimiza las fotos de miembros automáticamente.",
    "Usar «Borrador» para preparar noticias con calma y publicar cuando estén listas; «Archivada» retira una noticia sin borrarla.",
    "Revisar la versión inglesa tras editar contenido importante (el conmutador EN de la web pública muestra el resultado real).",
    "Antes de borrar (una noticia, un miembro, un documento), valorar desactivar u ocultar: casi todo en el sistema es reversible salvo el borrado.",
  ]);

}

async function main() {
  const pages = process.argv[2] ? JSON.parse(require("fs").readFileSync(process.argv[2], "utf8")) : {};
  const ctx = new DocCtx({ docLabel: "Anexo D", docTitle: "Documentación de Usuario", pages });
  build(ctx);
  await ctx.save(path.join(__dirname, "out", "Anexo_D_Documentacion_de_Usuario.docx"));
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { build };
