/**
 * Páginas públicas que se pueden ocultar desde el panel (Visualización).
 *
 * Fuera del registro quedan a propósito: la portada, las páginas legales
 * (aviso legal, cookies, accesibilidad — obligatorias) y el área de miembros
 * (funcional). Ocultar una página la retira del menú y hace que su URL
 * responda 404 a los visitantes; la administración sí puede seguir viéndola
 * para trabajar en ella.
 */
export interface PublicPageDef {
  /** Clave estable (se guarda en BD). */
  slug: string;
  label: string;
  /** Ruta pública. */
  path: string;
  /** Para qué sirve, en el panel. */
  hint: string;
}

/**
 * Secciones DENTRO de páginas que se pueden ocultar desde el panel. A
 * diferencia de las páginas, una sección oculta simplemente no se pinta (la
 * página sigue existiendo, sin 404) y puede nacer oculta por defecto
 * (defaultHidden) hasta que la administración decida mostrarla.
 */
export interface PublicSectionDef {
  /** Clave estable (comparte la tabla PageVisibility con las páginas). */
  slug: string;
  label: string;
  /** Ruta con ancla, para el enlace «ver» del panel. */
  path: string;
  hint: string;
  /** Estado cuando nadie ha tocado el interruptor todavía. */
  defaultHidden: boolean;
}

export const PUBLIC_SECTIONS: PublicSectionDef[] = [
  {
    slug: "seccion-proyectos",
    label: "Investigación — Proyectos",
    path: "/investigacion#proyectos",
    hint: "Explorador de proyectos (se mantiene a mano desde el panel; oculto por defecto)",
    defaultHidden: true,
  },
];

export const PUBLIC_PAGES: PublicPageDef[] = [
  {
    slug: "instituto",
    label: "Instituto",
    path: "/instituto",
    hint: "Perfil, equipo, miembros, ubicación e instalaciones",
  },
  {
    slug: "investigacion",
    label: "Investigación",
    path: "/investigacion",
    hint: "Grupos, proyectos y publicaciones",
  },
  {
    slug: "transferencia",
    label: "Transferencia",
    path: "/transferencia",
    hint: "Transferencia de conocimiento (art. 60 LOSU)",
  },
  {
    slug: "estadisticas",
    label: "Estadísticas",
    path: "/estadisticas",
    hint: "Gráficas de la memoria 2020–2025",
  },
  {
    slug: "formacion",
    label: "Formación",
    path: "/formacion",
    hint: "Plan de Formación del Profesorado y FDI",
  },
  {
    slug: "eventos",
    label: "Eventos",
    path: "/eventos",
    hint: "Congresos, seminarios y jornadas",
  },
  {
    slug: "seminario-iuce",
    label: "Seminario IUCE",
    path: "/seminario-iuce",
    hint: "Encuentro anual de los grupos del Instituto",
  },
  {
    slug: "doctorado",
    label: "Doctorado",
    path: "/doctorado",
    hint: "Programa Formación en la Sociedad del Conocimiento",
  },
  {
    slug: "noticias",
    label: "Noticias",
    path: "/noticias",
    hint: "Archivo de actualidad del Instituto",
  },
  {
    slug: "contacto",
    label: "Contacto",
    path: "/contacto",
    hint: "Formulario, datos de contacto y cómo llegar",
  },
];
