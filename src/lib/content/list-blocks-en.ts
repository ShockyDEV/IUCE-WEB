import type { ListItem } from "@/lib/content/list-blocks";

/**
 * Traducciones EN por defecto de las listas editables (clave
 * "pageSlug:blockKey"). Se usan en /en cuando no existe la fila
 * «list:clave:en» en la BD. Solo se traducen los campos de texto visibles
 * (etiquetas, títulos, descripciones); los valores numéricos, años, URLs y
 * nombres propios no cambian.
 */
export const LIST_BLOCKS_EN: Record<string, ListItem[]> = {
  // ── Inicio ────────────────────────────────────────────────────────────────
  "inicio:list:hitos-hero": [
    { icon: "landmark", texto: "ICE origins, 1969" },
    { icon: "shield-check", texto: "Verified by ACSUCYL, 2008" },
    { icon: "map-pin", texto: "Solís Building, Salamanca" },
  ],
  "inicio:list:accesos-rapidos": [
    {
      icon: "microscope",
      titulo: "Research",
      descripcion: "Groups, projects and publications in Higher Education",
      enlace: "/investigacion",
      destacado: false,
    },
    {
      icon: "graduation-cap",
      titulo: "Training",
      descripcion:
        "Teaching Staff (PDI) Training Plan and training activities",
      enlace: "/formacion",
      destacado: false,
    },
    {
      icon: "book-open",
      titulo: "Doctorate",
      descripcion: "“Education in the Knowledge Society” programme",
      enlace: "/doctorado",
      destacado: false,
    },
    {
      icon: "calendar-check",
      titulo: "Room booking",
      descripcion: "IUCE classrooms and meeting rooms — reservas.iuce.usal.es",
      enlace: "https://reservas.iuce.usal.es",
      destacado: true,
    },
  ],

  // ── Instituto ─────────────────────────────────────────────────────────────
  "instituto:list:funciones": [
    { texto: "Interdisciplinary research, both basic and applied, in the field of training and education" },
    { texto: "Specialised postgraduate and doctoral courses, and training for research staff" },
    { texto: "Educational research programmes in collaboration with other universities and institutes" },
    { texto: "Contracts and agreements with public and private bodies in Spain and abroad" },
    { texto: "Participation in institutional quality assessment processes" },
    { texto: "Collaboration with non-university education levels to improve the education system" },
  ],
  "instituto:list:hitos": [
    { icon: "landmark", etiqueta: "1969", texto: "creation of the ICEs in Spain" },
    { icon: "school", etiqueta: "1980s", texto: "specialisation in university education" },
    { icon: "shield-check", etiqueta: "2008", texto: "verification as a Research Institute (ACSUCYL)" },
    { icon: "file-check", etiqueta: "2023", texto: "new IUCE Regulations" },
  ],
  "instituto:list:instalaciones": [
    { titulo: "Classroom 12", texto: "Teaching and courses under the Teaching Staff Training Plan", foto: "/images/instalaciones/aula-12.jpg" },
    { titulo: "Classroom 17", texto: "Seminars, workshops and training activities", foto: "/images/instalaciones/aula-17.jpg" },
    { titulo: "Laboratory", texto: "Specialised equipment for experimentation and research", foto: "/images/instalaciones/laboratorio.webp" },
    { titulo: "Multi-purpose room", texto: "Meetings, dissertation defences and Institute activities", foto: "/images/instalaciones/sala-usos-multiples.webp" },
    { titulo: "GRIAL Laboratory", texto: "Workspace of the GRIAL group: data analysis, reports and preparation of publications", foto: "/images/instalaciones/laboratorio-grial.jpg" },
    { titulo: "CEDETEL Laboratory", texto: "Research laboratory with specialised technical equipment", foto: "/images/instalaciones/laboratorio-cedetel.jpg" },
    { titulo: "Management Office", texto: "The Institute's management offices: project coordination and strategic decision-making", foto: "/images/instalaciones/direccion.jpg" },
    { titulo: "Solís Building", texto: "The Institute occupies the first floor of the Solís Building, on the Education Campus", foto: "/images/instalaciones/edificio-solis-exterior.jpg" },
  ],

  // ── Formación ─────────────────────────────────────────────────────────────
  "formacion:list:datos": [
    { cifra: "100+", texto: "activities planned for 2026, the largest plan in recent years" },
    { cifra: "4", texto: "public universities of Castilla y León working in coordination on initial teacher training" },
    { cifra: "1969", texto: "Supporting teacher training since 1969, first as an ICE and today as a research institute." },
  ],
  "formacion:list:destinatarios": [
    { icon: "users", titulo: "All USAL academic staff (PDI)", texto: "Continuing training throughout the teaching career, within the General Plan." },
    { icon: "sprout", titulo: "Early-career teaching staff", texto: "Predoctoral and postdoctoral contract holders and assistant professors (ayudante doctor) with assigned teaching duties." },
    { icon: "badge-check", titulo: "Accredited associate lecturers", texto: "With accreditation for the assistant professor rank and assigned teaching, for initial teacher training." },
  ],
  "formacion:list:actividades": [
    {
      icon: "calendar-days",
      titulo: "2026 General Plan",
      texto: "Face-to-face and online courses, workshops and seminars throughout the year: teaching methodologies, assessment, educational technology, languages and research data management.",
      cta: "View the call →",
      enlace: "/uploads/legacy/plan-de-formacion-2026.pdf",
      acentoRojo: false,
    },
    {
      icon: "monitor-play",
      titulo: "USAL SPOCs",
      texto: "Online courses in SPOC format for self-paced teacher training, available within the Training Plan.",
      cta: "View catalogue →",
      enlace: "",
      acentoRojo: false,
    },
    {
      icon: "map",
      titulo: "Initial Teacher Training",
      texto: "Joint programme of the public universities of Castilla y León for assistant professors (ayudante doctor) in their first year of contract.",
      cta: "More information ↓",
      enlace: "#inicial",
      acentoRojo: true,
    },
  ],
  "formacion:list:subplanes": [
    { titulo: "General Programme", texto: "Continuing training open to all USAL teaching and research staff: up to 6 courses may be requested." },
    { titulo: "Centre-based Training Programme", texto: "Training organised at each centre: as many courses as needed may be requested." },
  ],
  "formacion:list:fdi-modulos": [
    { codigo: "M1", titulo: "Teaching management at the University of Salamanca: regulatory foundations and teaching responsibility", coordina: "Run independently at each university" },
    { codigo: "M2", titulo: "Tools for the digitalisation of university teaching", coordina: "Run independently at each university" },
    { codigo: "M3", titulo: "Teaching planning: teaching methodologies and assessment", coordina: "Coordinated by the UVA" },
    { codigo: "M4", titulo: "Teaching innovation", coordina: "Coordinated by the ULE" },
    { codigo: "M5", titulo: "Interpersonal competences and social responsibility: universal design for learning, gender perspective and social inclusion", coordina: "Coordinated by UBU and USAL" },
  ],
  "formacion:list:fdi-unidades": [
    { sigla: "USAL", nombre: "University of Salamanca — IUCE, University Institute of Education Sciences", propia: true },
    { sigla: "UBU", nombre: "University of Burgos — Institute for Training and Educational Innovation (IFIE)", propia: false },
    { sigla: "ULE", nombre: "University of León — Training School", propia: false },
    { sigla: "UVA", nombre: "University of Valladolid — VirtUVa Centre", propia: false },
  ],
  "formacion:list:fdi-ediciones": [
    { codigo: "M3", titulo: "Module 3", cuando: "13 Jan – 9 Feb (pre-enrolment 1–11 Dec) and April–May" },
    { codigo: "M4", titulo: "Module 4", cuando: "Editions in March and May" },
    { codigo: "M5", titulo: "Module 5", cuando: "Editions in March and May" },
    { codigo: "M1", titulo: "Module 1", cuando: "June (General Plan) and September" },
    { codigo: "M2", titulo: "Module 2", cuando: "July (within the General Plan)" },
  ],

  // ── Doctorado ─────────────────────────────────────────────────────────────
  "doctorado:list:lineas": [
    { icon: "clipboard-check", texto: "Educational assessment and guidance" },
    { icon: "mouse-pointer-click", texto: "Interaction and eLearning" },
    { icon: "lightbulb", texto: "Research and innovation in educational technology" },
    { icon: "megaphone", texto: "Communication and Education" },
    { icon: "stethoscope", texto: "Medicine and Education" },
    { icon: "bot", texto: "Artificial intelligence and robotics in education" },
    { icon: "cog", texto: "Engineering and Education" },
    { icon: "library", texto: "Education, libraries and scientific culture" },
  ],
  "doctorado:list:pasos": [
    { titulo: "Bachelor's degree in related fields", texto: "Education, Psychology, Health Sciences, Engineering, Information and Documentation, Communication, Sociology and related Social Sciences." },
    { titulo: "Master's degree", texto: "An official master's degree or equivalent that qualifies the holder for admission to a doctoral programme." },
    { titulo: "Research vocation", texto: "An interest in scientific output: each doctoral candidate joins one of the programme's research groups." },
  ],

  // ── Investigación ─────────────────────────────────────────────────────────
  "investigacion:list:publicaciones": [
    { eyebrow: "Director · 2026", titulo: "Inequidad educativa en Portugal: análisis del impacto del ESCS en PISA 2022", autores: "Martins Azinheiro, C. A.; Olmos-Migueláñez, S.; Torrecilla Sánchez, E. M.; Martínez Abad, F.", revista: "REICE. Revista Iberoamericana sobre Calidad, Eficacia y Cambio en Educación", enlace: "https://dialnet.unirioja.es/servlet/articulo?codigo=10533146" },
    { eyebrow: "Deputy Director · 2026", titulo: "Evaluación asistida por inteligencia artificial generativa en prácticas de Ingeniería de Software: una prueba de concepto", autores: "García-Peñalvo, F. J.; Alier-Forment, M.; Vázquez-Ingelmo, A.; García-Holgado, A. et al.", revista: "RIED. Revista Iberoamericana de Educación a Distancia", enlace: "https://doi.org/10.5944/ried.47173" },
    { eyebrow: "Academic Secretary · 2026", titulo: "Artificial Intelligence (AI) in Music Education Ecology: AI as an Agent for Understanding, Meaning-Making, and Creative and Cognitive Growth", autores: "Merchán-Sánchez-Jara, J. F.; González-Gutiérrez, S.; Navarro-Cáceres, M.; González-Gutiérrez, E. et al.", revista: "AI in Education", enlace: "https://doi.org/10.3390/aieduc2030022" },
  ],

  // ── Transferencia ─────────────────────────────────────────────────────────
  "transferencia:list:vias": [
    { icon: "handshake", titulo: "Contracts and agreements (art. 60)", texto: "Applied research, programme evaluation and tailor-made developments for public administrations, companies and social organisations." },
    { icon: "lightbulb", titulo: "Industrial and intellectual property", texto: "Patent and software registrations arising from the research of the Institute's groups." },
    { icon: "graduation-cap", titulo: "Training on demand", texto: "Specialised training courses and programmes designed around each organisation's needs." },
    { icon: "megaphone", titulo: "Outreach and scientific culture", texto: "Conferences, publications and activities that bring educational research closer to society." },
  ],

  // ── Seminario IUCE ────────────────────────────────────────────────────────
  "seminario:list:ediciones": [
    {
      anio: "2025",
      titulo: "1st Interdisciplinary Research Seminar",
      texto: "First edition of the annual gathering: the Institute's groups presented their lines of work and recent results to build bridges between fields and explore collaborations.",
      enlaceNoticia: "/noticias/i-seminario-de-investigacion-interdisciplinar-del-instituto-universitario-de-ciencias-de-la-educacion",
      enlaceActas: "",
    },
  ],

  // ── Estadísticas («El IUCE en cifras») ────────────────────────────────────
  "estadisticas:list:kpis": [
    { cifra: "108", texto: "competitive research projects" },
    { cifra: "11,5M€", texto: "in funding from competitive calls" },
    { cifra: "101", texto: "doctoral theses defended" },
    { cifra: "213", texto: "master's dissertations supervised" },
    { cifra: "420", texto: "continuing training activities" },
    { cifra: "45", texto: "national and international research networks" },
  ],
  "estadisticas:list:proyectos-financiadoras": [
    { etiqueta: "European Commission / EU", valor: "38" },
    { etiqueta: "Ministry (Government of Spain)", valor: "30" },
    { etiqueta: "University of Salamanca", valor: "14" },
    { etiqueta: "FECYT", valor: "8" },
    { etiqueta: "Junta de Castilla y León", valor: "6" },
    { etiqueta: "INCIBE", valor: "5" },
    { etiqueta: "Other", valor: "7" },
  ],
  "estadisticas:list:contratos-entidades": [
    { etiqueta: "Fund. Vodafone España", valor: "13" },
    { etiqueta: "Salamanca City Council (Older Adults)", valor: "8" },
    { etiqueta: "IES Abroad Salamanca", valor: "4" },
    { etiqueta: "University of Salamanca", valor: "4" },
    { etiqueta: "RTVE Corporation", valor: "3" },
    { etiqueta: "USAL Healthcare Complex", valor: "2" },
    { etiqueta: "Other entities", valor: "26" },
  ],
  "estadisticas:list:contratos-implicacion": [
    { etiqueta: "100% IUCE", valor: "41" },
    { etiqueta: "75%–99%", valor: "5" },
    { etiqueta: "50%–74%", valor: "10" },
    { etiqueta: "25%–49%", valor: "4" },
  ],
  "estadisticas:list:tesis-menciones": [
    { etiqueta: "Outstanding Cum Laude", valor: "73" },
    { etiqueta: "Cum Laude + Extraordinary Award", valor: "19" },
    { etiqueta: "Outstanding", valor: "7" },
    { etiqueta: "Very Good", valor: "2" },
  ],
  "estadisticas:list:formacion-horas": [
    { etiqueta: "Received (PDI Plan)", valor: "1623" },
    { etiqueta: "Delivered (PDI Plan)", valor: "585" },
    { etiqueta: "Doctoral seminars", valor: "250,5" },
    { etiqueta: "Other delivered", valor: "142" },
  ],
  "estadisticas:list:estancias-pais": [
    { etiqueta: "Portugal", valor: "8" },
    { etiqueta: "Chile", valor: "3" },
    { etiqueta: "Spain", valor: "3" },
    { etiqueta: "United Kingdom", valor: "3" },
    { etiqueta: "Mexico", valor: "2" },
    { etiqueta: "Other (7 countries)", valor: "7" },
  ],
  "estadisticas:list:redes-ambito": [
    { etiqueta: "International", valor: "25" },
    { etiqueta: "National", valor: "19" },
    { etiqueta: "Local", valor: "1" },
  ],
  "estadisticas:list:gestion-categorias": [
    { etiqueta: "Statutory committees (USAL)", valor: "53" },
    { etiqueta: "Editorial committees and boards", valor: "51" },
    { etiqueta: "Project principal investigators", valor: "48" },
    { etiqueta: "Group and unit leadership", valor: "40" },
    { etiqueta: "Evaluation (quality agencies)", valor: "32" },
    { etiqueta: "Other directorships and coordination roles", valor: "26" },
    { etiqueta: "Other management positions", valor: "17" },
    { etiqueta: "Scientific societies and boards", valor: "15" },
    { etiqueta: "Scientific commissions and committees", valor: "14" },
    { etiqueta: "IUCE Directorship/Secretariat", valor: "8" },
  ],
};
