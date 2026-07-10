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
      { titulo: "Laboratorio GRIAL", texto: "Espacio de trabajo del grupo GRIAL: análisis de datos, informes y preparación de publicaciones", foto: "/images/instalaciones/laboratorio-grial.jpg" },
      { titulo: "Laboratorio CEDETEL", texto: "Laboratorio de investigación con equipamiento técnico especializado", foto: "/images/instalaciones/laboratorio-cedetel.jpg" },
      { titulo: "Dirección", texto: "Oficinas de la dirección del Instituto: coordinación de proyectos y decisiones estratégicas", foto: "/images/instalaciones/direccion.jpg" },
      { titulo: "Edificio Solís", texto: "El Instituto ocupa la primera planta del Edificio Solís, en el Campus de Educación", foto: "/images/instalaciones/edificio-solis-exterior.jpg" },
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
    blockKey: "list:subplanes",
    title: "Cómo inscribirse — subplanes del Portal de Formación",
    itemLabel: "subplan",
    fields: [
      { key: "titulo", label: "Título", type: "text" },
      { key: "texto", label: "Texto", type: "textarea" },
    ],
    defaultItems: [
      { titulo: "Programa General", texto: "Formación permanente abierta a todo el personal docente e investigador de la USAL: se pueden solicitar hasta 6 cursos." },
      { titulo: "Programa de Formación en centros", texto: "Formación organizada en los propios centros: se pueden solicitar todos los cursos que se consideren." },
    ],
  },
  {
    pageSlug: "formacion",
    blockKey: "list:fdi-modulos",
    title: "Formación Docente Inicial — los 5 módulos",
    itemLabel: "módulo",
    fields: [
      { key: "codigo", label: "Código", type: "text" },
      { key: "titulo", label: "Título", type: "textarea" },
      { key: "coordina", label: "Quién lo coordina", type: "text" },
    ],
    defaultItems: [
      { codigo: "M1", titulo: "Gestión de la docencia en la Universidad de Salamanca: bases normativas y responsabilidad docente", coordina: "Independiente en cada universidad" },
      { codigo: "M2", titulo: "Herramientas para la digitalización de la docencia universitaria", coordina: "Independiente en cada universidad" },
      { codigo: "M3", titulo: "Planificación docente: metodologías docentes y evaluación", coordina: "Coordina la UVA" },
      { codigo: "M4", titulo: "Innovación docente", coordina: "Coordina la ULE" },
      { codigo: "M5", titulo: "Competencias relacionales y responsabilidad social: diseño universal para el aprendizaje, perspectiva de género e inclusión social", coordina: "Coordinan UBU y USAL" },
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
      { codigo: "M3", titulo: "Módulo 3", cuando: "13 ene – 9 feb (preinscripción 1–11 dic) y abril–mayo" },
      { codigo: "M4", titulo: "Módulo 4", cuando: "Ediciones en marzo y en mayo" },
      { codigo: "M5", titulo: "Módulo 5", cuando: "Ediciones en marzo y en mayo" },
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

  // ── Estadísticas («El IUCE en cifras», datos de la memoria 2020-2025) ────
  // Cada gráfica de /estadisticas lee su lista. Campos «valor»/«valor2» son
  // numéricos (se admite coma decimal). Fuente: DEFINITIVA_GRAFICAS (memoria
  // de acreditación, julio 2026).
  {
    pageSlug: "estadisticas",
    blockKey: "list:kpis",
    title: "Cabecera — cifras destacadas (contadores)",
    itemLabel: "cifra",
    fields: [
      { key: "cifra", label: "Cifra grande", type: "text", hint: "p. ej. 108 o 11,5 M€" },
      { key: "texto", label: "Texto", type: "textarea" },
    ],
    defaultItems: [
      { cifra: "108", texto: "proyectos competitivos de investigación" },
      { cifra: "11,5M€", texto: "captados en convocatorias competitivas" },
      { cifra: "101", texto: "tesis doctorales defendidas" },
      { cifra: "213", texto: "trabajos fin de máster dirigidos" },
      { cifra: "420", texto: "actividades de formación continua" },
      { cifra: "45", texto: "redes de investigación nacionales e internacionales" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:proyectos-por-ano",
    title: "Proyectos — iniciados por año",
    itemLabel: "año",
    fields: [
      { key: "etiqueta", label: "Año", type: "text" },
      { key: "valor", label: "Proyectos", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "2020", valor: "38" },
      { etiqueta: "2021", valor: "13" },
      { etiqueta: "2022", valor: "21" },
      { etiqueta: "2023", valor: "21" },
      { etiqueta: "2024", valor: "8" },
      { etiqueta: "2025", valor: "7" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:proyectos-importe",
    title: "Proyectos — importe acumulado (miles de €)",
    itemLabel: "año",
    fields: [
      { key: "etiqueta", label: "Año", type: "text" },
      { key: "valor", label: "Acumulado (miles €)", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "2020", valor: "2288" },
      { etiqueta: "2021", valor: "2574" },
      { etiqueta: "2022", valor: "3745" },
      { etiqueta: "2023", valor: "10512" },
      { etiqueta: "2024", valor: "10862" },
      { etiqueta: "2025", valor: "11527" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:proyectos-financiadoras",
    title: "Proyectos — por entidad financiadora",
    itemLabel: "entidad",
    fields: [
      { key: "etiqueta", label: "Entidad", type: "text" },
      { key: "valor", label: "Proyectos", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "Comisión Europea / UE", valor: "38" },
      { etiqueta: "Ministerio (Gob. de España)", valor: "30" },
      { etiqueta: "Universidad de Salamanca", valor: "14" },
      { etiqueta: "FECYT", valor: "8" },
      { etiqueta: "Junta de Castilla y León", valor: "6" },
      { etiqueta: "INCIBE", valor: "5" },
      { etiqueta: "Otras", valor: "7" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:contratos-importe",
    title: "Transferencia — importe contratado por año (€)",
    itemLabel: "año",
    fields: [
      { key: "etiqueta", label: "Año", type: "text" },
      { key: "valor", label: "Importe (€)", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "2020", valor: "122316" },
      { etiqueta: "2021", valor: "103208" },
      { etiqueta: "2022", valor: "86080" },
      { etiqueta: "2023", valor: "189305" },
      { etiqueta: "2024", valor: "216674" },
      { etiqueta: "2025", valor: "53765" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:contratos-entidades",
    title: "Transferencia — entidades contratantes (top)",
    itemLabel: "entidad",
    fields: [
      { key: "etiqueta", label: "Entidad", type: "text" },
      { key: "valor", label: "Contratos", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "Fund. Vodafone España", valor: "13" },
      { etiqueta: "Ayto. Salamanca (Mayores)", valor: "8" },
      { etiqueta: "IES Abroad Salamanca", valor: "5" },
      { etiqueta: "Universidad de Salamanca", valor: "4" },
      { etiqueta: "Corporación RTVE", valor: "2" },
      { etiqueta: "Compl. Asistencial USAL", valor: "2" },
      { etiqueta: "Otras (29 entidades)", valor: "30" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:contratos-implicacion",
    title: "Transferencia — grado de implicación del IUCE",
    itemLabel: "tramo",
    fields: [
      { key: "etiqueta", label: "Tramo", type: "text" },
      { key: "valor", label: "Contratos", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "100% del IUCE", valor: "42" },
      { etiqueta: "50%–99%", valor: "15" },
      { etiqueta: "Menos del 50%", valor: "4" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:tesis-por-ano",
    title: "Doctorado — tesis por año y acumulado",
    itemLabel: "año",
    fields: [
      { key: "etiqueta", label: "Año", type: "text" },
      { key: "valor", label: "Tesis del año", type: "text" },
      { key: "valor2", label: "Acumulado", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "2020", valor: "15", valor2: "15" },
      { etiqueta: "2021", valor: "21", valor2: "36" },
      { etiqueta: "2022", valor: "12", valor2: "48" },
      { etiqueta: "2023", valor: "15", valor2: "63" },
      { etiqueta: "2024", valor: "19", valor2: "82" },
      { etiqueta: "2025", valor: "19", valor2: "101" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:tesis-menciones",
    title: "Doctorado — calidad de las tesis (menciones)",
    itemLabel: "mención",
    fields: [
      { key: "etiqueta", label: "Mención", type: "text" },
      { key: "valor", label: "Tesis", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "Sobresaliente Cum Laude", valor: "73" },
      { etiqueta: "Cum Laude + Premio Extraordinario", valor: "19" },
      { etiqueta: "Sobresaliente", valor: "7" },
      { etiqueta: "Notable", valor: "2" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:tfm-por-ano",
    title: "Doctorado — TFM dirigidos por año",
    itemLabel: "año",
    fields: [
      { key: "etiqueta", label: "Año", type: "text" },
      { key: "valor", label: "TFM", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "2020", valor: "25" },
      { etiqueta: "2021", valor: "19" },
      { etiqueta: "2022", valor: "40" },
      { etiqueta: "2023", valor: "32" },
      { etiqueta: "2024", valor: "36" },
      { etiqueta: "2025", valor: "61" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:formacion-plan-pdi",
    title: "Formación — Plan PDI: impartidas y recibidas por año",
    itemLabel: "año",
    fields: [
      { key: "etiqueta", label: "Año", type: "text" },
      { key: "valor", label: "Impartidas", type: "text" },
      { key: "valor2", label: "Recibidas", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "2020", valor: "1", valor2: "5" },
      { etiqueta: "2021", valor: "14", valor2: "35" },
      { etiqueta: "2022", valor: "24", valor2: "42" },
      { etiqueta: "2023", valor: "27", valor2: "45" },
      { etiqueta: "2024", valor: "22", valor2: "36" },
      { etiqueta: "2025", valor: "18", valor2: "42" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:formacion-horas",
    title: "Formación — horas por bloque",
    itemLabel: "bloque",
    fields: [
      { key: "etiqueta", label: "Bloque", type: "text" },
      { key: "valor", label: "Horas", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "Recibidas (Plan PDI)", valor: "1623" },
      { etiqueta: "Impartidas (Plan PDI)", valor: "585" },
      { etiqueta: "Seminarios de doctorado", valor: "250,5" },
      { etiqueta: "Otras impartidas", valor: "142" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:estancias-pais",
    title: "Movilidad — estancias por país de destino",
    itemLabel: "país",
    fields: [
      { key: "etiqueta", label: "País", type: "text" },
      { key: "valor", label: "Estancias", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "España", valor: "8" },
      { etiqueta: "Portugal", valor: "8" },
      { etiqueta: "México", valor: "5" },
      { etiqueta: "Chile", valor: "3" },
      { etiqueta: "Reino Unido", valor: "3" },
      { etiqueta: "Otros (7 países)", valor: "7" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:redes-ambito",
    title: "Redes — por ámbito",
    itemLabel: "ámbito",
    fields: [
      { key: "etiqueta", label: "Ámbito", type: "text" },
      { key: "valor", label: "Redes", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "Internacional", valor: "25" },
      { etiqueta: "Nacional", valor: "19" },
      { etiqueta: "Local", valor: "1" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:posgrados-curso",
    title: "Posgrado — títulos con docencia del IUCE por curso",
    itemLabel: "curso",
    fields: [
      { key: "etiqueta", label: "Curso", type: "text" },
      { key: "valor", label: "Posgrados", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "2020-21", valor: "11" },
      { etiqueta: "2021-22", valor: "12" },
      { etiqueta: "2022-23", valor: "8" },
      { etiqueta: "2023-24", valor: "11" },
      { etiqueta: "2024-25", valor: "22" },
    ],
  },
  {
    pageSlug: "estadisticas",
    blockKey: "list:gestion-cargos",
    title: "Gestión — cargos de gestión activos acumulados",
    itemLabel: "año",
    fields: [
      { key: "etiqueta", label: "Año", type: "text" },
      { key: "valor", label: "Cargos acumulados", type: "text" },
    ],
    defaultItems: [
      { etiqueta: "2020", valor: "169" },
      { etiqueta: "2021", valor: "206" },
      { etiqueta: "2022", valor: "228" },
      { etiqueta: "2023", valor: "251" },
      { etiqueta: "2024", valor: "266" },
      { etiqueta: "2025", valor: "292" },
    ],
  },
];
