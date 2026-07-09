/**
 * Registro de bloques editables de las páginas públicas (patrón ContentEditor
 * de mupes): cada página se compone de bloques (pageSlug + blockKey) que el
 * panel de administración edita y guarda en la tabla ContentBlock. El
 * contenido por defecto es el texto actual de los prototipos; la web pública
 * usa el bloque de la BD si existe y, si no, este valor.
 */
export interface PageBlockDef {
  blockKey: string;
  title: string;
  defaultContent: string;
}

export interface PageDef {
  pageSlug: string;
  label: string;
  blocks: PageBlockDef[];
}

export const PAGE_BLOCKS: PageDef[] = [
  {
    pageSlug: "instituto",
    label: "Instituto — Perfil",
    blocks: [
      {
        blockKey: "perfil-intro",
        title: "Perfil — introducción",
        defaultContent: `<p>En su origen, el Instituto se crea como centro de referencia nacional de investigación y apoyo a la formación inicial y permanente del profesorado no universitario (antiguo ICE, 1969). Desde la década de los años 80 se perfila como un centro especializado exclusivamente en educación universitaria.</p>
<p>A raíz de la aprobación de la LOU (2001, modificada en 2007), los Institutos Universitarios de Investigación se conforman como piezas clave del desarrollo de las Universidades, en paralelo a Escuelas, Facultades y Departamentos. El IUCE es verificado como Instituto de Investigación por la Agencia para la Calidad del Sistema Universitario de Castilla y León (ACSUCYL) en junio de 2008.</p>
<p>Ante la transformación de la Universidad hacia el Espacio Europeo de Educación Superior, el IUCE investiga, forma e informa para avanzar en el conocimiento de los procesos de enseñanza-aprendizaje, centrados en el estudiante.</p>`,
      },
      {
        blockKey: "edificio",
        title: "Edificio histórico",
        defaultContent: `<p>La sede del IUCE se encuentra en el Edificio Solís, en el Paseo de Canalejas. El Instituto ocupa la primera planta, donde conviven los espacios de dirección, investigación y formación.</p>
<p>El edificio forma parte del patrimonio de la Universidad de Salamanca, cuya historia se extiende a lo largo de más de ocho siglos al servicio del conocimiento.</p>`,
      },
    ],
  },
  {
    pageSlug: "inicio",
    label: "Inicio — Portada",
    blocks: [
      {
        blockKey: "hero-parrafo",
        title: "Portada — párrafo de presentación",
        defaultContent: `<p>El IUCE es el instituto interdisciplinar de la Universidad de Salamanca dedicado a la investigación científica en Educación, el desarrollo tecnológico y la transferencia al ámbito educativo.</p>`,
      },
    ],
  },
  {
    pageSlug: "formacion",
    label: "Formación — Plan de Formación Docente",
    blocks: [
      {
        blockKey: "intro",
        title: "Plan de Formación — introducción",
        defaultContent: `<p>A iniciativa del Vicerrectorado de Estudios de Grado y Calidad, el Plan recoge la propuesta institucional de formación inicial y permanente para todo el personal docente e investigador de la Universidad de Salamanca.</p>`,
      },
    ],
  },
  {
    pageSlug: "doctorado",
    label: "Doctorado — Programa",
    blocks: [
      {
        blockKey: "programa",
        title: "Programa — descripción",
        defaultContent: `<p>Configurado en el seno del IUCE, el programa nace con la vocación de presentar los procesos de enseñanza-aprendizaje como auténticos motores de la Sociedad del Conocimiento, en simbiosis con los avances tecnológicos más punteros. Un enfoque totalmente interdisciplinar que reúne a investigadores de la práctica totalidad de las ramas de conocimiento.</p>`,
      },
    ],
  },
];
