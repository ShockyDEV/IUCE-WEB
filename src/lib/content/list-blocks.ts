/**
 * Registro de LISTAS EDITABLES de las páginas públicas: secciones con
 * estructura (icono + título + texto, filas de datos…) que no encajan en un
 * bloque de texto corrido. Cada lista se guarda como JSON en ContentBlock
 * (blockKey con prefijo "list:", que además excluye la auto-traducción) y se
 * edita desde Contenido → Páginas con el editor genérico de listas.
 *
 * Los defaultItems son el contenido actual aprobado del diseño: la web usa
 * el JSON guardado si existe y, si no, estos valores.
 */

export type ListFieldType = "text" | "textarea" | "icon" | "url" | "check";

export interface ListField {
  key: string;
  label: string;
  type: ListFieldType;
  hint?: string;
}

export type ListItem = Record<string, string | boolean>;

export interface ListBlockDef {
  pageSlug: string;
  /** Con prefijo "list:" (p. ej. "list:funciones"). */
  blockKey: string;
  title: string;
  /** Nombre de cada elemento en el editor ("hito", "tarjeta"…). */
  itemLabel: string;
  fields: ListField[];
  defaultItems: ListItem[];
}

const ICON_FIELD: ListField = {
  key: "icon",
  label: "Icono",
  type: "icon",
  hint: "nombre de icono Lucide (elige de la lista)",
};

export const LIST_BLOCKS: ListBlockDef[] = [
  // ── Inicio ────────────────────────────────────────────────────────────────
  {
    pageSlug: "inicio",
    blockKey: "list:hitos-hero",
    title: "Portada — hitos bajo el titular",
    itemLabel: "hito",
    fields: [ICON_FIELD, { key: "texto", label: "Texto", type: "text" }],
    defaultItems: [
      { icon: "landmark", texto: "Origen ICE, 1969" },
      { icon: "shield-check", texto: "Verificado ACSUCYL, 2008" },
      { icon: "map-pin", texto: "Edificio Solís, Salamanca" },
    ],
  },
  {
    pageSlug: "inicio",
    blockKey: "list:accesos-rapidos",
    title: "Portada — tarjetas de acceso rápido",
    itemLabel: "tarjeta",
    fields: [
      ICON_FIELD,
      { key: "titulo", label: "Título", type: "text" },
      { key: "descripcion", label: "Descripción", type: "textarea" },
      {
        key: "enlace",
        label: "Enlace",
        type: "url",
        hint: "ruta interna (/formacion) o URL externa (https://…)",
      },
      { key: "destacado", label: "Icono en rojo (acento)", type: "check" },
    ],
    defaultItems: [
      {
        icon: "microscope",
        titulo: "Investigación",
        descripcion: "Grupos, proyectos y publicaciones en Educación Superior",
        enlace: "/investigacion",
        destacado: false,
      },
      {
        icon: "graduation-cap",
        titulo: "Formación",
        descripcion:
          "Plan de Formación Docente del PDI y actividades formativas",
        enlace: "/formacion",
        destacado: false,
      },
      {
        icon: "book-open",
        titulo: "Doctorado",
        descripcion: "Programa «Formación en la Sociedad del Conocimiento»",
        enlace: "/doctorado",
        destacado: false,
      },
      {
        icon: "calendar-check",
        titulo: "Reserva de espacios",
        descripcion: "Aulas y salas del IUCE — reservas.iuce.usal.es",
        enlace: "https://reservas.iuce.usal.es",
        destacado: true,
      },
    ],
  },

  // ── Instituto ─────────────────────────────────────────────────────────────
  {
    pageSlug: "instituto",
    blockKey: "list:funciones",
    title: "Perfil — funciones del Instituto",
    itemLabel: "función",
    fields: [{ key: "texto", label: "Texto", type: "textarea" }],
    defaultItems: [
      { texto: "Investigación interdisciplinar, básica y aplicada, en el ámbito de la formación y de la educación" },
      { texto: "Cursos especializados de postgrado y doctorado, y formación del personal investigador" },
      { texto: "Programas de investigación educativa en colaboración con otras universidades e institutos" },
      { texto: "Contratos y convenios con entidades públicas o privadas, nacionales o extranjeras" },
      { texto: "Participación en los procesos de evaluación de la calidad institucional" },
      { texto: "Colaboración con los niveles no universitarios para la mejora del sistema educativo" },
    ],
  },
  {
    pageSlug: "instituto",
    blockKey: "list:hitos",
    title: "Perfil — cronología de hitos",
    itemLabel: "hito",
    fields: [
      ICON_FIELD,
      { key: "etiqueta", label: "Año / etiqueta", type: "text" },
      { key: "texto", label: "Texto", type: "text" },
    ],
    defaultItems: [
      { icon: "landmark", etiqueta: "1969", texto: "creación de los ICE en España" },
      { icon: "school", etiqueta: "Años 80", texto: "especialización en educación universitaria" },
      { icon: "shield-check", etiqueta: "2008", texto: "verificación como Instituto de Investigación (ACSUCYL)" },
      { icon: "file-check", etiqueta: "2023", texto: "nuevo Reglamento del IUCE" },
    ],
  },
  {
    pageSlug: "instituto",
    blockKey: "list:instalaciones",
    title: "Instalaciones — tarjetas",
    itemLabel: "instalación",
    fields: [
      { key: "titulo", label: "Título", type: "text" },
      { key: "texto", label: "Descripción", type: "textarea" },
      {
        key: "foto",
        label: "Foto (URL)",
        type: "url",
        hint: "súbela en Archivos y pega aquí la URL; vacío = hueco gris",
      },
    ],
    defaultItems: [
      { titulo: "Aula 12", texto: "Docencia y cursos del Plan de Formación del Profesorado", foto: "/images/instalaciones/aula-12.jpg" },
      { titulo: "Aula 17", texto: "Seminarios, talleres y actividades formativas", foto: "/images/instalaciones/aula-17.jpg" },
      { titulo: "Laboratorio", texto: "Equipamiento especializado para experimentación e investigación", foto: "/images/instalaciones/laboratorio.webp" },
      { titulo: "Sala de usos múltiples", texto: "Reuniones, defensa de trabajos y actividades del Instituto", foto: "/images/instalaciones/sala-usos-multiples.webp" },
    ],
  },

  // ── Formación ─────────────────────────────────────────────────────────────
  {
    pageSlug: "formacion",
    blockKey: "list:datos",
    title: "Cabecera — tarjetas de datos",
    itemLabel: "dato",
    fields: [
      { key: "cifra", label: "Cifra grande", type: "text" },
      { key: "texto", label: "Texto", type: "textarea" },
    ],
    defaultItems: [
      { cifra: "100+", texto: "actividades planificadas en 2026, el plan de mayor magnitud de los últimos años" },
      { cifra: "4", texto: "universidades públicas de Castilla y León coordinadas en la formación inicial" },
      { cifra: "1969", texto: "Desde 1969 apoyando la formación del profesorado, primero como ICE y hoy como instituto de investigación." },
    ],
  },
  {
    pageSlug: "formacion",
    blockKey: "list:destinatarios",
    title: "¿A quién va dirigido? — tarjetas",
    itemLabel: "tarjeta",
    fields: [
      ICON_FIELD,
      { key: "titulo", label: "Título", type: "text" },
      { key: "texto", label: "Texto", type: "textarea" },
    ],
    defaultItems: [
      { icon: "users", titulo: "Todo el PDI de la USAL", texto: "Formación permanente a lo largo de la carrera docente, dentro del Plan General." },
      { icon: "sprout", titulo: "Profesorado novel", texto: "Contratos predoctorales, posdoctorales y ayudantes doctores con tareas docentes asignadas." },
      { icon: "badge-check", titulo: "Profesorado asociado acreditado", texto: "Con acreditación a ayudante doctor y docencia asignada, para la formación inicial." },
    ],
  },
  {
    pageSlug: "formacion",
    blockKey: "list:actividades",
    title: "Actividades formativas — tarjetas",
    itemLabel: "tarjeta",
    fields: [
      ICON_FIELD,
      { key: "titulo", label: "Título", type: "text" },
      { key: "texto", label: "Texto", type: "textarea" },
      { key: "cta", label: "Texto del enlace", type: "text" },
      { key: "enlace", label: "Enlace", type: "url" },
      { key: "acentoRojo", label: "Borde superior rojo", type: "check" },
    ],
    defaultItems: [
      {
        icon: "calendar-days",
        titulo: "Plan General 2026",
        texto: "Cursos, talleres y seminarios presenciales y en línea a lo largo de todo el año: metodologías docentes, evaluación, tecnología educativa, idiomas o gestión de datos de investigación.",
        cta: "Consultar convocatoria →",
        enlace: "/uploads/legacy/plan-de-formacion-2026.pdf",
        acentoRojo: false,
      },
      {
        icon: "monitor-play",
        titulo: "SPOCs USAL",
        texto: "Cursos online en formato SPOC para la formación autónoma del profesorado, disponibles dentro del Plan de Formación.",
        cta: "Ver catálogo →",
        enlace: "",
        acentoRojo: false,
      },
      {
        icon: "map",
        titulo: "Formación Docente Inicial",
        texto: "Programa conjunto de las universidades públicas de Castilla y León para el profesorado ayudante doctor en su primer año de contrato.",
        cta: "Más información ↓",
        enlace: "#inicial",
        acentoRojo: true,
      },
    ],
  },
  {
    pageSlug: "formacion",
    blockKey: "list:fdi-unidades",
    title: "Formación Docente Inicial — unidades",
    itemLabel: "unidad",
    fields: [
      { key: "sigla", label: "Sigla", type: "text" },
      { key: "nombre", label: "Nombre", type: "text" },
      { key: "propia", label: "Es la de la USAL (resaltada)", type: "check" },
    ],
    defaultItems: [
      { sigla: "USAL", nombre: "IUCE — Instituto Universitario de Ciencias de la Educación", propia: true },
      { sigla: "UBU", nombre: "Instituto de Formación e Innovación Educativa (IFIE)", propia: false },
      { sigla: "ULE", nombre: "Escuela de Formación", propia: false },
      { sigla: "UVA", nombre: "Centro VirtUVa", propia: false },
    ],
  },
  {
    pageSlug: "formacion",
    blockKey: "list:fdi-ediciones",
    title: "Formación Docente Inicial — ediciones 2026",
    itemLabel: "edición",
    fields: [
      { key: "codigo", label: "Código", type: "text" },
      { key: "titulo", label: "Título", type: "text" },
      { key: "cuando", label: "Cuándo", type: "text" },
    ],
    defaultItems: [
      { codigo: "M4", titulo: "Módulos 4 y 5", cuando: "Ediciones en marzo y mayo" },
      { codigo: "M1", titulo: "Módulo 1", cuando: "Junio (Plan General) y septiembre" },
      { codigo: "M2", titulo: "Módulo 2", cuando: "Julio (dentro del Plan General)" },
    ],
  },

  // ── Doctorado ─────────────────────────────────────────────────────────────
  {
    pageSlug: "doctorado",
    blockKey: "list:lineas",
    title: "Líneas de investigación",
    itemLabel: "línea",
    fields: [ICON_FIELD, { key: "texto", label: "Texto", type: "text" }],
    defaultItems: [
      { icon: "clipboard-check", texto: "Evaluación educativa y orientación" },
      { icon: "mouse-pointer-click", texto: "Interacción y eLearning" },
      { icon: "lightbulb", texto: "Investigación-innovación en tecnología educativa" },
      { icon: "megaphone", texto: "Comunicación y Educación" },
      { icon: "stethoscope", texto: "Medicina y Educación" },
      { icon: "bot", texto: "Inteligencia artificial y robótica en la educación" },
      { icon: "cog", texto: "Ingeniería y Educación" },
      { icon: "library", texto: "Educación, bibliotecas y cultura científica" },
    ],
  },
  {
    pageSlug: "doctorado",
    blockKey: "list:pasos",
    title: "Perfil de ingreso — pasos",
    itemLabel: "paso",
    fields: [
      { key: "titulo", label: "Título", type: "text" },
      { key: "texto", label: "Texto", type: "textarea" },
    ],
    defaultItems: [
      { titulo: "Grado universitario en áreas afines", texto: "Educación, Psicología, Ciencias de la Salud, Ingeniería, Información y Documentación, Comunicación, Sociología y Ciencias Sociales afines." },
      { titulo: "Máster universitario", texto: "Título de Máster Universitario o equivalente que acredite para cursar un programa de doctorado." },
      { titulo: "Vocación investigadora", texto: "Interés por la producción científica: cada doctorando se integra en un grupo de investigación del programa." },
    ],
  },

  // ── Investigación ─────────────────────────────────────────────────────────
  {
    pageSlug: "investigacion",
    blockKey: "list:proyectos",
    title: "Proyectos — filas",
    itemLabel: "proyecto",
    fields: [
      { key: "titulo", label: "Título", type: "textarea" },
      { key: "meta", label: "Financiador · IP", type: "text" },
      { key: "anos", label: "Años", type: "text", hint: "p. ej. 2024–2027" },
    ],
    defaultItems: [
      { titulo: "Competencia digital docente y evaluación auténtica en la universidad", meta: "Plan Estatal de Investigación · IP: Susana Olmos Migueláñez", anos: "2024–2027" },
      { titulo: "Analítica del aprendizaje para la mejora de la retención universitaria", meta: "Junta de Castilla y León · IP: Fernando Martínez Abad", anos: "2025–2028" },
      { titulo: "Alfabetización mediática y contenidos audiovisuales en la adolescencia", meta: "Observatorio de los Contenidos Audiovisuales · IP: Juan José Igartua", anos: "2024–2026" },
    ],
  },
  {
    pageSlug: "investigacion",
    blockKey: "list:publicaciones",
    title: "Publicaciones — artículos destacados",
    itemLabel: "artículo",
    fields: [
      { key: "eyebrow", label: "Antetítulo", type: "text", hint: "p. ej. Artículo · 2026" },
      { key: "titulo", label: "Título", type: "textarea" },
      { key: "autores", label: "Autores", type: "text" },
      { key: "revista", label: "Revista", type: "text" },
    ],
    defaultItems: [
      { eyebrow: "Artículo · 2026", titulo: "Inteligencia artificial generativa en la evaluación universitaria: usos y límites", autores: "García-Peñalvo, F. J. et al.", revista: "Education in the Knowledge Society" },
      { eyebrow: "Artículo · 2025", titulo: "Evaluación diagnóstica de competencias informacionales en el acceso a la universidad", autores: "Martínez-Abad, F.; Olmos-Migueláñez, S.", revista: "RELIEVE" },
      { eyebrow: "Artículo · 2025", titulo: "Objetos de aprendizaje reutilizables para la formación del profesorado", autores: "Morales Morgado, E. M. et al.", revista: "Comunicar" },
    ],
  },
];
