/**
 * Contenido semilla de los grupos de investigación del IUCE
 * (de los prototipos del handoff). Lo usan las páginas públicas y el seed.
 */
export interface GroupSeed {
  acronym: string;
  name: string;
  lead?: string;
  url?: string;
  /** Distintivo (p. ej. Unidad de Investigación Consolidada). */
  chip?: string;
}

export const groups: GroupSeed[] = [
  {
    acronym: "GRIAL",
    name: "Interacción y eLearning. Unidad de Investigación Consolidada de Castilla y León.",
    lead: "F. J. García Peñalvo",
    url: "https://grial.usal.es",
    chip: "UIC 081",
  },
  {
    acronym: "GITE",
    name: "Grupo de Investigación en Tecnología Educativa: integración de las TIC en los procesos de enseñanza.",
    lead: "A. García-Valcárcel",
  },
  {
    acronym: "OCA",
    name: "Observatorio de Contenidos Audiovisuales: comunicación, educación mediática y opinión pública.",
    lead: "J. J. Igartua",
  },
  {
    acronym: "VisualMed System",
    name: "Visualización médica y tecnologías aplicadas a la formación en Ciencias de la Salud. Premio Ennova Health 2025.",
    lead: "J. A. Juanes",
  },
  {
    acronym: "Robótica y Sociedad",
    name: "Robótica educativa, pensamiento computacional e impacto social de la automatización.",
    lead: "Equipo interdisciplinar",
  },
  {
    acronym: "E-LECTRA",
    name: "Lectura, edición digital y sociedad de la información: libro electrónico y humanidades digitales.",
    lead: "J. A. Cordón",
  },
];
