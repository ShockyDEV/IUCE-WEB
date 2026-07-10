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
        blockKey: "hero-parrafo",
        title: "Cabecera — párrafo de presentación del Instituto",
        defaultContent: `<p>Un instituto interdisciplinar que congrega a profesorado e investigadores de todas las ramas de conocimiento de la Universidad de Salamanca en torno a la investigación en Educación Superior.</p>`,
      },
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
        blockKey: "riie",
        title: "Instituto — banda de la red RIIE",
        defaultContent: `<p>El IUCE forma parte de la <strong>Red de Institutos de Investigación en Educación (RIIE)</strong>, que agrupa a los institutos universitarios de investigación educativa de España —más de 85 grupos de investigación— para compartir procedimientos, formar investigadores y difundir la ciencia de la educación de manera conjunta.</p>`,
      },
      {
        blockKey: "url-riie",
        title: "Instituto — URL de la RIIE (vacío = ocultar la banda)",
        defaultContent: `<p>https://riie.org/</p>`,
      },
      {
        blockKey: "edificio",
        title: "Edificio histórico — texto",
        defaultContent: `<p>El colegio, fundado en 1542, recibe su nombre del de su patrona, la Inmaculada Concepción. Su nombre completo era «Colegio de la Purísima Concepción de los niños huérfanos», aunque también se conoce como «Colegio de Huérfanos», y con el tiempo pasaría a albergar el Instituto Universitario de Ciencias de la Educación (IUCE).</p>
<p>El Edificio Solís esconde, entre sus piedras y vítores, grandes dosis de conocimiento, juventud, creatividad, investigación, educación y vida, cumpliendo así los deseos originales de su fundador, Francisco de Solís.</p>`,
      },
      {
        blockKey: "url-video-historia",
        title: "Edificio histórico — URL del vídeo de YouTube (vacío = ocultar)",
        defaultContent: `<p>https://www.youtube-nocookie.com/embed/SQnP-IOOO5g</p>`,
      },
      {
        blockKey: "edificio-biblio",
        title: "Edificio histórico — bibliografía",
        defaultContent: `<ul><li>MARTÍN SÁNCHEZ, M.: <em>Historia y pedagogía del Colegio Menor de la Concepción de Huérfanos de Salamanca</em>. Salamanca: Universidad de Salamanca, 2007.</li>
<li>MARTÍN SÁNCHEZ, M.: Un mecenas de la educación: Francisco de Solís, fundador del Colegio Menor de Huérfanos. En <em>Aula. Revista de Enseñanza e Investigación Educativa</em>, 13, 2001, pp. 113-126.</li>
<li>MARTÍN SÁNCHEZ, M.: Los orígenes del Colegio Menor de la Concepción de Huérfanos de Salamanca. En <em>Studia Historica. Historia Moderna</em>, 25, 2003, pp. 217-240.</li></ul>`,
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
        blockKey: "estadisticas-teaser",
        title: "Portada — párrafo de la banda de estadísticas",
        defaultContent: `<p>La actividad del Instituto, contada con datos interactivos: proyectos, tesis, formación y transferencia.</p>`,
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
        blockKey: "proyectos-descripcion",
        title: "Proyectos — subtítulo del explorador",
        defaultContent: `<p>Proyectos de investigación competitivos con participación de investigadores del Instituto. Busca por título, investigador principal, entidad financiadora o grupo.</p>`,
      },
      {
        blockKey: "publicaciones-descripcion",
        title: "Publicaciones — párrafo introductorio de la sección",
        defaultContent: `<p>La producción científica de los miembros del Instituto se recoge en el Portal de Investigación de la Universidad de Salamanca. Abajo, una pequeña muestra de artículos recientes; el IUCE edita además la revista Education in the Knowledge Society (EKS).</p>`,
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
        defaultContent: `<p>Revista científica del IUCE en acceso abierto: investigación interdisciplinar sobre la Sociedad del Conocimiento y los procesos educativos mediados por tecnología. Indexada en Scopus y en el Emerging Sources Citation Index (ESCI) de Web of Science. ISSN 2444-8729 (hasta 2014 se publicó como <em>Teoría de la Educación: Educación y Cultura en la Sociedad de la Información</em>, TESI).</p>`,
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
    label: "Área de miembros (intranet)",
    blocks: [
      {
        blockKey: "intro",
        title: "Área de miembros — texto de bienvenida (solo lo ven los autorizados)",
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
      {
        blockKey: "como-llegar",
        title: "Contacto — Cómo llegar (transporte y plano)",
        defaultContent: `<p>El IUCE está en la primera planta del Edificio Solís, dentro del Campus de Educación (Paseo de Canalejas, 169). El aula 2A se encuentra en la planta baja.</p>
<ul><li><strong>En tren:</strong> la estación Vialia (Paseo de la Estación, s/n) ofrece conexiones directas con Madrid, Ávila y Valladolid. Horarios y billetes en renfe.com.</li>
<li><strong>En autobús:</strong> la Estación de Autobuses (Avda. Filiberto Villalobos, 71-85) conecta Salamanca con las principales ciudades a través de ALSA y Avanza; Avanza ofrece servicio directo con el aeropuerto de Madrid-Barajas.</li>
<li><strong>En coche:</strong> por la A-62 (Valladolid–Portugal) o la A-50 (Ávila–Madrid); el campus está junto al Paseo de Canalejas, con aparcamiento público en la zona.</li>
<li><strong>Bus urbano:</strong> varias líneas paran junto al Campus de Educación; consulta el plano de líneas en la web de transportes de Salamanca.</li></ul>
<p>Plano de las instalaciones del IUCE (aulas, secretaría y dirección):</p>
<p><img src="/images/plano-iuce.png" alt="Plano de la primera planta del IUCE en el Edificio Solís, con la ubicación de aulas, secretaría y dirección" /></p>`,
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
        defaultContent: `<p>A iniciativa del Vicerrectorado de Estudios de Grado y Calidad, el Plan recoge la propuesta institucional de formación inicial y permanente para todo el personal docente e investigador de la Universidad de Salamanca. Su objetivo es contribuir a la mejora de la actividad docente en las titulaciones oficiales, apoyando la adquisición de competencias, la evaluación y la innovación docente.</p>`,
      },
      {
        blockKey: "aviso-preinscripcion",
        title: "Formación — aviso destacado de preinscripción (vacío = ocultar)",
        defaultContent: `<p><strong>Preinscripción:</strong> del 27 de enero al 4 de febrero de 2026.</p>`,
      },
      {
        blockKey: "url-portal",
        title: "Formación — URL del botón «Acceso al Portal de Formación» (vacío = ocultar)",
        defaultContent: `<p>https://portalservicios.usal.es/formacion</p>`,
      },
      {
        blockKey: "url-manual",
        title: "Formación — URL del manual de usuario del Portal (vacío = ocultar)",
        defaultContent: `<p>https://sicpd.usal.es/go/formacion</p>`,
      },
      {
        blockKey: "inscripcion-nota",
        title: "Formación — nota sobre la inscripción",
        defaultContent: `<p>Aunque la plataforma lo pueda solicitar, <strong>no es necesario</strong> indicar motivo de inscripción ni preferencia, ni adjuntar ningún documento.</p>`,
      },
      {
        blockKey: "url-plan",
        title: "Formación — URL del PDF del Plan (visor embebido y descarga; vacío = ocultar)",
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
        defaultContent: `<p>La LOSU encarga a las universidades garantizar la formación docente inicial y continuada de su profesorado (art. 67) y establece que las profesoras y profesores ayudantes doctores deberán realizar, en el primer año de contrato, un curso de formación docente inicial definido por las universidades a través de sus unidades de formación e innovación docente (art. 78.b).</p>
<p>Para dar respuesta a este contexto, las cuatro unidades de formación de las universidades públicas de Castilla y León —unidas por un convenio de colaboración desde 2012— ejecutan conjuntamente el programa. La formación consta de cinco módulos independientes pero relacionados, con ediciones periódicas para poder cursarlos durante los años de contrato como ayudante doctor/a.</p>
<p>Cada módulo tiene certificado propio y, al completar los cinco, se obtiene un certificado conjunto que acredita la superación total del programa.</p>`,
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
  {
    pageSlug: "transferencia",
    label: "Transferencia de conocimiento",
    blocks: [
      {
        blockKey: "intro",
        title: "Transferencia — párrafo de cabecera",
        defaultContent: `<p>Transferir el conocimiento a la sociedad es uno de los objetivos principales del IUCE: que la investigación educativa no se quede en las revistas científicas, sino que mejore la práctica de administraciones, centros educativos, empresas y entidades sociales.</p>`,
      },
      {
        blockKey: "mision",
        title: "Transferencia — texto de misión (banda destacada)",
        defaultContent: `<p>El artículo 60 de la LOSU reconoce la transferencia como una función esencial de la universidad. El IUCE la ejerce poniendo su investigación —evaluación educativa, tecnología, formación, comunicación— al servicio de quien la necesita: mediante contratos y convenios, desarrollos a medida, formación especializada y asesoramiento experto.</p>`,
      },
      {
        blockKey: "url-otc",
        title: "Transferencia — URL de la Oficina de Transferencia de la USAL",
        defaultContent: `<p>https://transferencia.usal.es</p>`,
      },
      {
        blockKey: "otc-descripcion",
        title: "Transferencia — texto de la tarjeta de la OTC USAL",
        defaultContent: `<p>La Oficina de Transferencia de Conocimiento de la Universidad de Salamanca canaliza los contratos del artículo 60, las patentes y la colaboración con empresas e instituciones.</p>`,
      },
      {
        blockKey: "datos-descripcion",
        title: "Transferencia — subtítulo de «La transferencia, en datos»",
        defaultContent: `<p>64 contratos y convenios con 36 entidades durante 2020–2025.</p>`,
      },
      {
        blockKey: "cta",
        title: "Transferencia — llamada final (trabaja con el IUCE)",
        defaultContent: `<p><strong>¿Tu entidad tiene un reto educativo?</strong></p>
<p>Escríbenos y estudiamos cómo puede ayudarte la investigación del IUCE: evaluación, formación, tecnología educativa o comunicación.</p>`,
      },
    ],
  },
  {
    pageSlug: "estadisticas",
    label: "Estadísticas — El IUCE en cifras",
    blocks: [
      {
        blockKey: "hero-eyebrow",
        title: "Cabecera — antetítulo (periodo de la memoria)",
        defaultContent: `<p>Memoria 2020–2025</p>`,
      },
      {
        blockKey: "intro",
        title: "Cabecera — párrafo introductorio",
        defaultContent: `<p>La actividad del Instituto durante el periodo 2020–2025, en datos: proyectos, transferencia, tesis, formación, redes y gestión. Las cifras proceden de la memoria de acreditación del IUCE.</p>`,
      },
      {
        blockKey: "url-gredos-tfm",
        title: "Doctorado — URL del repositorio Gredos con los TFM (vacío = ocultar)",
        defaultContent: `<p>https://gredos.usal.es/handle/10366/4827</p>`,
      },
      {
        blockKey: "proyectos-descripcion",
        title: "Sección Proyectos — lectura rápida",
        defaultContent: `<p>108 proyectos competitivos con 11,5 millones de euros de financiación. La Comisión Europea es la principal financiadora, seguida del Gobierno de España.</p>`,
      },
      {
        blockKey: "transferencia-descripcion",
        title: "Sección Transferencia — lectura rápida",
        defaultContent: `<p>64 contratos y convenios de transferencia (art. 60 LOSU) por más de 770.000 €, con 36 entidades: fundaciones, administraciones públicas y empresas.</p>`,
      },
      {
        blockKey: "doctorado-descripcion",
        title: "Sección Doctorado — lectura rápida",
        defaultContent: `<p>101 tesis doctorales defendidas — el 91% con Cum Laude y 4 de cada 10 con Mención Internacional — y 213 trabajos fin de máster dirigidos, con una tendencia claramente creciente.</p>`,
      },
      {
        blockKey: "formacion-descripcion",
        title: "Sección Formación — lectura rápida",
        defaultContent: `<p>Más de 2.600 horas de formación continua: el profesorado del IUCE no solo investiga sobre docencia, también la imparte y se forma continuamente en el Plan de Formación del PDI.</p>`,
      },
      {
        blockKey: "redes-descripcion",
        title: "Sección Redes y movilidad — lectura rápida",
        defaultContent: `<p>45 redes de investigación (25 internacionales) y 34 estancias de movilidad en 12 países respaldan la proyección exterior del Instituto.</p>`,
      },
      {
        blockKey: "gestion-descripcion",
        title: "Sección Gestión y posgrado — lectura rápida",
        defaultContent: `<p>El personal del IUCE sostiene 292 cargos de gestión académica y científica, y participa en 27 títulos de posgrado — con un salto notable en el curso 2024-25.</p>`,
      },
      {
        blockKey: "nota-fuente",
        title: "Nota final — fuente de los datos",
        defaultContent: `<p>Fuente: memoria de acreditación del IUCE (periodo 2020–2025). Los datos se actualizan desde el panel de administración; el año 2025 puede recoger cifras parciales.</p>`,
      },
    ],
  },
  {
    pageSlug: "legal",
    label: "Legal — Política de cookies",
    blocks: [
      {
        blockKey: "cookies",
        title: "Política de cookies — texto completo",
        defaultContent: `<p>Una cookie es una pequeña información enviada por un sitio web y almacenada en el navegador, de manera que el sitio puede recordar la actividad previa de la persona usuaria.</p>
<p>Este sitio web utiliza únicamente <strong>cookies estrictamente necesarias</strong>: las imprescindibles para prestar servicios solicitados expresamente (por ejemplo, mantener la sesión iniciada en la intranet o en el panel de administración). No se utilizan cookies analíticas ni publicitarias, ni se ceden datos a terceros.</p>
<h2>Desactivación de cookies</h2>
<p>Puedes elegir en cualquier momento qué cookies funcionan en este sitio configurando tu navegador. Ten en cuenta que, si desactivas las cookies necesarias, la intranet y el panel dejarán de funcionar:</p>
<ul><li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies.</li>
<li><strong>Firefox:</strong> Ajustes → Privacidad y seguridad → Cookies y datos del sitio.</li>
<li><strong>Safari:</strong> Preferencias → Privacidad.</li>
<li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio.</li></ul>
<p>Para más información sobre el tratamiento de datos personales, consulta la <a href="https://www.usal.es/proteccion-de-datos">política de protección de datos de la Universidad de Salamanca</a>.</p>`,
      },
    ],
  },
];
