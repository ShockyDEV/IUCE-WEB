/**
 * Grupos de investigación que conforman el IUCE.
 *
 * FUENTE DE VERDAD: página «Investigación» (id 69) de la web original
 * (iuce.usal.es, export WordPress de julio 2026), verificada de forma
 * exhaustiva contra el archivo histórico. Son 9 grupos; DIDEROT es un
 * grupo de investigación (no un proyecto). GITE y E-LECTRA aparecían en
 * los prototipos del handoff pero NO constan en la lista vigente de la
 * web original, por lo que quedan fuera.
 *
 * Los responsables no figuran en la web original: los confirmó el IUCE
 * (jul-2026). Editables desde el panel.
 */
export interface GroupSeed {
  acronym: string;
  name: string;
  /** Nombre en inglés (la web /en usa nameEn ?? name). */
  nameEn?: string;
  lead?: string;
  url?: string;
  /** Ruta del logo bajo public/ (copiado del export original). */
  logo?: string;
  /** Distintivo (p. ej. Unidad de Investigación Consolidada). */
  chip?: string;
}

export const groups: GroupSeed[] = [
  {
    acronym: "GRIAL",
    name: "Grupo de Investigación en InterAcción y eLearning",
    nameEn: "Research Group in InterAction and eLearning",
    lead: "Francisco José García Peñalvo",
    url: "https://grial.usal.es",
    logo: "/images/groups/grial.png",
  },
  {
    acronym: "OCA",
    name: "Observatorio de los Contenidos Audiovisuales",
    nameEn: "Audiovisual Content Observatory",
    lead: "Juan José Igartua Perosanz",
    url: "https://www.ocausal.es/",
    logo: "/images/groups/oca.png",
    // Reconocido UIC nº 313 de Castilla y León el 1-jun-2021 (noticia del 2021-06-10).
  },
  {
    acronym: "VisualMed",
    name: "Grupo de investigación en sistemas de visualización médica avanzada",
    nameEn: "Research Group on Advanced Medical Visualisation Systems",
    lead: "Juan Antonio Juanes Méndez",
    url: "https://visualmed.usal.es/",
    logo: "/images/groups/visualmed.png",
  },
  {
    acronym: "GROUSAL",
    name: "Grupo de Robótica y Sociedad",
    nameEn: "Robotics and Society Group",
    lead: "Vidal Moreno Rodilla",
    url: "http://gro.usal.es",
    logo: "/images/groups/grousal.gif",
  },
  {
    acronym: "DIDEROT",
    name: "Didácticas Digitales de la Expresión Musical y las Artes Performativas",
    nameEn: "Digital Didactics of Musical Expression and the Performing Arts",
    lead: "Javier Félix Merchán Sánchez-Jara",
    url: "https://diderot.usal.es/",
    logo: "/images/groups/diderot.png",
  },
  {
    acronym: "CaUSAL",
    name: "Cultura académica, patrimonio y memoria social",
    nameEn: "Academic Culture, Heritage and Social Memory",
    lead: "Carmen López San Segundo",
    url: "https://causal.usal.es",
    logo: "/images/groups/causal.jpg",
  },
  {
    acronym: "MOVERE",
    name: "Grupo de Investigación sobre Actividad Física, Movimiento y Educación",
    nameEn: "Research Group on Physical Activity, Movement and Education",
    lead: "Josué Prieto Prieto",
    url: "https://movere.usal.es/",
    logo: "/images/groups/movere.png",
  },
  {
    acronym: "EduDIG",
    name: "Grupo de Investigación en Innovación y Educación Digital",
    nameEn: "Research Group on Digital Innovation and Education",
    lead: "Sonia Casillas Martín",
    url: "https://edudig.usal.es/",
    logo: "/images/groups/edudig.png",
  },
  {
    acronym: "INDIE",
    name: "Grupo de investigación interdisciplinar sobre inteligencia digital en procesos educativos",
    nameEn: "Interdisciplinary Research Group on Digital Intelligence in Educational Processes",
    lead: "Juan José Mena Marcos",
    url: "https://indieusal.es/",
    logo: "/images/groups/indie.png",
  },
];
