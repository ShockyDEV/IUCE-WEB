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
        blockKey: "cita-directora",
        title: "Perfil — cita de la directora",
        defaultContent: `<p>«En la actual coyuntura de cambio y transformación de la Universidad hacia el espacio europeo de educación superior, las tareas y actividades docentes se replantean desde nuevas perspectivas a las que los profesores universitarios tienen que acomodar sus esquemas docentes. Se precisan reformulaciones que adecuen la docencia a las características actuales de la sociedad de la información y a los modos de ser y aprender, centradas en el estudiante.</p>
<p>Aunque, como en otros muchos problemas, las medidas fundamentales sean estructurales, el IUCE debe investigar, formar e informar para que, en la medida de sus posibilidades, se avance en el conocimiento de estos problemas y en su mejoramiento.»</p>`,
      },
      {
        blockKey: "url-reglamento",
        title: "Instituto — URL de «Descargar reglamento» (vacío = ocultar el enlace)",
        defaultContent: `<p></p>`,
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
        blockKey: "hero-eyebrow",
        title: "Portada — antetítulo (línea roja pequeña)",
        defaultContent: `<p>Instituto Universitario de Investigación · USAL</p>`,
      },
      {
        blockKey: "hero-titulo",
        title: "Portada — título principal",
        defaultContent: `<p>Instituto Universitario de Ciencias de la Educación</p>`,
      },
      {
        blockKey: "hero-parrafo",
        title: "Portada — párrafo de presentación",
        defaultContent: `<p>El IUCE es el instituto interdisciplinar de la Universidad de Salamanca dedicado a la investigación científica en Educación, el desarrollo tecnológico y la transferencia al ámbito educativo.</p>`,
      },
      {
        blockKey: "eks-descripcion",
        title: "Portada — banda de la revista EKS",
        defaultContent: `<p>La revista científica del IUCE: investigación interdisciplinar sobre la Sociedad del Conocimiento, con énfasis en los procesos educativos mediados por tecnologías.</p>`,
      },
    ],
  },
  {
    pageSlug: "investigacion",
    label: "Investigación",
    blocks: [
      {
        blockKey: "intro",
        title: "Investigación — párrafo de cabecera",
        defaultContent: `<p>Investigación interdisciplinar, básica y aplicada, sobre los procesos de formación en Educación Superior: evaluación educativa, tecnología, comunicación y transferencia al sistema educativo.</p>`,
      },
      {
        blockKey: "publicaciones-descripcion",
        title: "Publicaciones — párrafo introductorio de la sección",
        defaultContent: `<p>La producción científica de los miembros del Instituto se recoge en el Portal de Investigación de la Universidad de Salamanca. El IUCE edita además la revista Education in the Knowledge Society (EKS).</p>`,
      },
      {
        blockKey: "portal-descripcion",
        title: "Publicaciones — banda principal del Portal de Investigación",
        defaultContent: `<p>Artículos, libros, capítulos, proyectos y tesis dirigidas de los investigadores del IUCE, siempre actualizados en el Portal de Investigación de la USAL.</p>`,
      },
      {
        blockKey: "url-portal",
        title: "Publicaciones — URL del botón «Ver la producción científica»",
        defaultContent: `<p>https://produccioncientifica.usal.es</p>`,
      },
      {
        blockKey: "eks-descripcion",
        title: "Publicaciones — tarjeta de la revista EKS",
        defaultContent: `<p>Revista científica del IUCE en acceso abierto: investigación interdisciplinar sobre la Sociedad del Conocimiento y los procesos educativos mediados por tecnología.</p>`,
      },
      {
        blockKey: "url-eks",
        title: "Publicaciones — URL de la revista EKS",
        defaultContent: `<p>https://revistas.usal.es/index.php/eks</p>`,
      },
    ],
  },
  {
    pageSlug: "noticias",
    label: "Noticias",
    blocks: [
      {
        blockKey: "intro",
        title: "Noticias — párrafo de cabecera",
        defaultContent: `<p>La actividad del Instituto desde 2010: congresos, investigación, formación, premios y vida académica.</p>`,
      },
    ],
  },
  {
    pageSlug: "eventos",
    label: "Eventos",
    blocks: [
      {
        blockKey: "intro",
        title: "Eventos — párrafo de cabecera",
        defaultContent: `<p>Congresos, seminarios y jornadas organizados por el IUCE o con participación del Instituto.</p>`,
      },
      {
        blockKey: "destacado-descripcion",
        title: "Eventos — descripción del evento destacado",
        defaultContent: `<p>Salamanca acoge el congreso internacional de referencia en desarrollo educativo universitario, organizado con la participación del IUCE. Tres días de conferencias, talleres y comunicaciones en torno a la formación docente en Educación Superior.</p>`,
      },
    ],
  },
  {
    pageSlug: "intranet",
    label: "Intranet",
    blocks: [
      {
        blockKey: "intro",
        title: "Intranet — texto de bienvenida (solo lo ven los autorizados)",
        defaultContent: `<p>Espacio reservado al personal del IUCE: actas, convocatorias, normativa interna y otra documentación de uso interno. Los documentos se gestionan desde el panel de administración.</p>`,
      },
    ],
  },
  {
    pageSlug: "contacto",
    label: "Contacto",
    blocks: [
      {
        blockKey: "intro",
        title: "Contacto — párrafo de cabecera",
        defaultContent: `<p>La Secretaría del Instituto atiende consultas sobre formación, investigación, doctorado y uso de espacios.</p>`,
      },
      {
        blockKey: "url-privacidad",
        title: "Contacto — URL de la política de privacidad (RGPD)",
        defaultContent: `<p>https://www.usal.es/proteccion-de-datos</p>`,
      },
      {
        blockKey: "direccion",
        title: "Contacto — dirección postal",
        defaultContent: `<p>Paseo de Canalejas, 169 · Edificio Solís, 1.ª planta<br>37008 Salamanca</p>`,
      },
      {
        blockKey: "telefonos",
        title: "Contacto — teléfonos",
        defaultContent: `<p>+34 923 294 634 (Secretaría)<br>+34 923 294 500, ext. 4634 (centralita USAL)</p>`,
      },
      {
        blockKey: "horario",
        title: "Contacto — horario de Secretaría",
        defaultContent: `<p>Lunes a viernes, 9:00–14:00</p>`,
      },
    ],
  },
  {
    pageSlug: "formacion",
    label: "Formación — Plan de Formación Docente",
    blocks: [
      {
        blockKey: "hero-eyebrow",
        title: "Cabecera — antetítulo",
        defaultContent: `<p>Formación del profesorado</p>`,
      },
      {
        blockKey: "hero-titulo",
        title: "Cabecera — título (incluye el año)",
        defaultContent: `<p>Plan de Formación Docente 2026</p>`,
      },
      {
        blockKey: "intro",
        title: "Plan de Formación — introducción",
        defaultContent: `<p>A iniciativa del Vicerrectorado de Estudios de Grado y Calidad, el Plan recoge la propuesta institucional de formación inicial y permanente para todo el personal docente e investigador de la Universidad de Salamanca.</p>`,
      },
      {
        blockKey: "url-programa",
        title: "Formación — URL del botón «Programa e inscripciones» (vacío = ocultar)",
        defaultContent: `<p>/uploads/legacy/plan-de-formacion-2026.pdf</p>`,
      },
      {
        blockKey: "url-calendario",
        title: "Formación — URL del botón «Ver calendario completo» (vacío = ocultar)",
        defaultContent: `<p></p>`,
      },
      {
        blockKey: "fdi-intro",
        title: "Formación Docente Inicial — texto",
        defaultContent: `<p>La LOSU establece que las profesoras y profesores ayudantes doctores deberán realizar, en el primer año de contrato, un curso de formación docente inicial definido por las universidades a través de sus unidades de formación e innovación docente (art. 78.b).</p>
<p>Para dar respuesta a este contexto, las cuatro unidades de formación de las universidades públicas de Castilla y León —unidas por un convenio de colaboración desde 2012— ejecutan conjuntamente el programa, con ediciones periódicas de cada módulo a lo largo del año.</p>`,
      },
      {
        blockKey: "cta",
        title: "Formación — llamada final de contacto",
        defaultContent: `<p><strong>¿Dudas sobre inscripciones o certificados?</strong></p>
<p>La Secretaría del IUCE atiende en el 923 294 634 y en iuce@usal.es.</p>`,
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
      {
        blockKey: "semana-doctoral",
        title: "Semana Doctoral — texto de la tarjeta",
        defaultContent: `<p>Cada otoño, el programa celebra su Semana Doctoral: seminarios, defensa de avances y encuentro entre doctorandos y grupos.</p>`,
      },
    ],
  },
];
