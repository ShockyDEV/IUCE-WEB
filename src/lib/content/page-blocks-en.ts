/**
 * Traducciones EN por defecto de los bloques de página (clave
 * "pageSlug:blockKey"). Se usan en /en cuando no existe la fila «clave:en»
 * en la BD (que escribe la auto-traducción DeepL al guardar desde el panel).
 * Los bloques que solo contienen URLs o datos de configuración no se
 * traducen (caen al valor español, que es la propia URL).
 */
export const PAGE_BLOCKS_EN: Record<string, string> = {
  // ── Instituto ──────────────────────────────────────────────────────────
  "instituto:hero-parrafo": `<p>An interdisciplinary institute that brings together lecturers and researchers from every branch of knowledge at the University of Salamanca around research in Higher Education.</p>`,
  "instituto:perfil-intro": `<p>The IUCE is the Interdisciplinary Research Institute of the University of Salamanca specialising in Higher Education research: scientific research in Education, technological development and knowledge transfer to the educational sphere.</p>
<p>Interdisciplinarity has defined the Institute from its very structural conception, in research and teaching alike: its teams and subjects of study — from the application of technology to training processes to methodology and didactics — bring together different disciplines depending on each topic.</p>
<p>Heir to the former ICE and accredited as a Research Institute by ACSUCYL in June 2008, the IUCE researches, trains and informs in order to advance the understanding of the challenges facing higher education and their improvement.</p>`,
  "instituto:cita-directora": `<p>«The University Institute of Education Sciences of the University of Salamanca (IUCE) is an Interdisciplinary Research Institute, specialising in Higher Education research, created to promote and put into practice initiatives in scientific research in Education, in technological development and in knowledge transfer to the educational sphere.</p>
<p>The Institute was originally created as a national reference centre for research and for supporting the initial and in-service training of non-university teachers (the former ICE); since the 1980s, however, it has taken shape as a centre specialising exclusively in university education (IUCE).</p>
<p>Following the passing of the LOU (2001, amended in 2007), University Research Institutes became key building blocks in the development of universities, alongside Schools, Faculties and Departments (art. 7, chap. I, Title II). The IUCE was accredited as a Research Institute by the Quality Assurance Agency for the University System of Castilla y León (ACSUCYL) and, therefore, by the Regional Ministry of Education of the Junta de Castilla y León in June 2008.</p>
<p>Over this time, the IUCE's interdisciplinary team has succeeded in bringing together university lecturers and researchers from every branch of knowledge around research into training processes in higher education, focused in particular on the design, implementation and evaluation of technological resources in education. The Institute pursues a range of interdisciplinary research lines on issues that are fundamental to the optimal development of the university's work, collaborating with other Spanish, European and Latin American universities, foundations, education authorities, technology and research centres, companies and organisations connected with university education.</p>
<p>It is also a centre that provides training, support and advice to university teaching staff and promotes the dissemination and use of new methodologies, resources and educational technologies, contributing to the process of innovation and quality assessment in university teaching.</p>
<p>On this institutional website of the IUCE we wish to highlight information on research work completed and under way, the annual call of the Training Programme for PDI (teaching and research staff) and the publication of our electronic journal “TESI”. We invite you to take an active part in the various initiatives and programmes that we lead together. In this house, which is yours, we invite lecturers, students, researchers, companies, institutions… to get involved and develop projects at our beloved University.</p>
<p>May I take this opportunity to welcome you to the IUCE of the University of Salamanca.»</p>`,
  "instituto:riie": `<p>The IUCE is a member of the <strong>Network of Education Research Institutes (RIIE)</strong>, which brings together Spain's university institutes for educational research — more than 85 research groups — to share procedures, train researchers and jointly disseminate the science of education.</p>`,
  "instituto:edificio": `<p>The college, founded in 1542, takes its name from that of its patroness, the Immaculate Conception. Its full name was «Colegio de la Purísima Concepción de los niños huérfanos» (College of the Most Pure Conception for Orphaned Children), although it is also known as the «Colegio de Huérfanos» (Orphans' College), and in time it would come to house the University Institute of Education Sciences (IUCE).</p>
<p>The Solís Building conceals among its stones and its vítores — Salamanca's traditional painted inscriptions — a wealth of knowledge, youth, creativity, research, education and life, thus fulfilling the original wishes of its founder, Francisco de Solís.</p>`,
  "instituto:edificio-biblio": `<ul><li>MARTÍN SÁNCHEZ, M.: <em>Historia y pedagogía del Colegio Menor de la Concepción de Huérfanos de Salamanca</em>. Salamanca: Universidad de Salamanca, 2007.</li>
<li>MARTÍN SÁNCHEZ, M.: Un mecenas de la educación: Francisco de Solís, fundador del Colegio Menor de Huérfanos. In <em>Aula. Revista de Enseñanza e Investigación Educativa</em>, 13, 2001, pp. 113-126.</li>
<li>MARTÍN SÁNCHEZ, M.: Los orígenes del Colegio Menor de la Concepción de Huérfanos de Salamanca. In <em>Studia Historica. Historia Moderna</em>, 25, 2003, pp. 217-240.</li></ul>`,

  // ── Inicio ─────────────────────────────────────────────────────────────
  "inicio:hero-eyebrow": `<p>University Research Institute · USAL</p>`,
  "inicio:hero-titulo": `<p>University Institute of Education Sciences</p>`,
  "inicio:hero-parrafo": `<p>The IUCE is the interdisciplinary institute of the University of Salamanca devoted to scientific research in Education, technological development and knowledge transfer to the educational sphere.</p>`,
  "inicio:estadisticas-teaser": `<p>The Institute's activity, told through interactive data: projects, theses, training and knowledge transfer.</p>`,
  "inicio:eks-descripcion": `<p>The IUCE's scientific journal: interdisciplinary research on the Knowledge Society, with an emphasis on technology-mediated educational processes.</p>`,

  // ── Investigación ──────────────────────────────────────────────────────
  "investigacion:intro": `<p>Interdisciplinary research, both basic and applied, into training processes in Higher Education: educational assessment, technology, communication and transfer to the education system.</p>`,
  "investigacion:proyectos-descripcion": `<p>Competitive research projects involving the Institute's researchers. Search by title, principal investigator, funding body or group.</p>`,
  "investigacion:publicaciones-descripcion": `<p>The scientific output of the Institute's members is available on the Research Portal of the University of Salamanca. The IUCE also publishes the journal Education in the Knowledge Society (EKS).</p>`,
  "investigacion:muestra-titulo": `<p>Read the latest articles by the IUCE's management team</p>`,
  "investigacion:portal-descripcion": `<p>Articles, books, chapters, projects and supervised theses by IUCE researchers, always up to date on the USAL Research Portal.</p>`,
  "investigacion:eks-descripcion": `<p>The IUCE's open-access scientific journal: interdisciplinary research on the Knowledge Society and technology-mediated educational processes. Indexed in Scopus and in the Emerging Sources Citation Index (ESCI) of Web of Science. ISSN 2444-8729 (until 2014 it was published as <em>Teoría de la Educación: Educación y Cultura en la Sociedad de la Información</em>, TESI).</p>`,

  // ── Noticias ───────────────────────────────────────────────────────────
  "noticias:intro": `<p>The Institute's activity since 2010: conferences, research, training, awards and academic life.</p>`,

  // ── Eventos ────────────────────────────────────────────────────────────
  "eventos:intro": `<p>Conferences, seminars and workshops organised by the IUCE or with the Institute's participation.</p>`,
  "eventos:destacado-descripcion": `<p>Salamanca hosts the leading international conference on educational development in higher education, organised with the participation of the IUCE. Three days of lectures, workshops and papers on teacher training in Higher Education.</p>`,

  // ── Intranet ───────────────────────────────────────────────────────────
  "intranet:intro": `<p>A space reserved for IUCE members: minutes, meeting notices, internal regulations and other documents for internal use.</p>`,

  // ── Contacto ───────────────────────────────────────────────────────────
  "contacto:intro": `<p>The Institute's Secretariat handles enquiries about training, research, doctoral studies and the use of its premises.</p>`,
  "contacto:direccion": `<p>Paseo de Canalejas, 169 · Solís Building, first floor<br>37008 Salamanca</p>`,
  "contacto:telefonos": `<p>+34 923 294 634 (Secretariat)<br>+34 923 294 500, ext. 4634 (USAL switchboard)</p>`,
  "contacto:horario": `<p>Monday to Friday, 9:00–14:00</p>`,
  "contacto:como-llegar": `<p>The IUCE is on the first floor of the Solís Building, within the Education Campus (Paseo de Canalejas, 169). Classroom 2A is on the ground floor.</p>
<ul><li><strong>By train:</strong> Vialia station (Paseo de la Estación, s/n) offers direct connections to Madrid, Ávila and Valladolid. Timetables and tickets at renfe.com.</li>
<li><strong>By coach:</strong> the Bus Station (Avda. Filiberto Villalobos, 71-85) connects Salamanca with the main cities through ALSA and Avanza; Avanza runs a direct service to Madrid-Barajas airport.</li>
<li><strong>By car:</strong> via the A-62 (Valladolid–Portugal) or the A-50 (Ávila–Madrid); the campus is next to Paseo de Canalejas, with public parking in the area.</li>
<li><strong>City buses:</strong> several routes stop next to the Education Campus; see the route map on the Salamanca public transport website.</li></ul>
<p>Floor plan of the IUCE facilities (classrooms, secretariat and management offices):</p>
<p><img src="/images/plano-iuce.png" alt="Floor plan of the first floor of the IUCE in the Solís Building, showing the location of classrooms, the secretariat and the management offices" /></p>`,

  // ── Formación ──────────────────────────────────────────────────────────
  "formacion:hero-eyebrow": `<p>Teaching staff training</p>`,
  "formacion:hero-titulo": `<p>Teaching Staff Training Plan 2026</p>`,
  "formacion:intro": `<p>An initiative of the Vice-Rectorate for Undergraduate Studies and Quality, the Plan sets out the institutional programme of initial and in-service training for all teaching and research staff of the University of Salamanca. Its aim is to contribute to improving teaching in official degree programmes by supporting the acquisition of competences, assessment and teaching innovation.</p>`,
  "formacion:aviso-preinscripcion": `<p><strong>Pre-enrolment:</strong> from 27 January to 4 February 2026.</p>`,
  "formacion:inscripcion-nota": `<p>Although the platform may ask for it, it is <strong>not necessary</strong> to give a reason for enrolling or state a preference, or to attach any document.</p>`,
  "formacion:fdi-intro": `<p>The LOSU entrusts universities with guaranteeing the initial and continuing teacher training of their teaching staff (art. 67) and establishes that assistant professors (ayudantes doctores) must complete, during the first year of their contract, an initial teacher training course defined by the universities through their teaching training and innovation units (art. 78.b).</p>
<p>In response to this context, the four training units of the public universities of Castilla y León — linked by a collaboration agreement since 2012 — deliver the programme jointly. The training consists of five independent but related modules, offered at regular intervals so that they can be taken over the years of the assistant professor (ayudante doctor) contract.</p>
<p>Each module carries its own certificate and, on completing all five, participants receive a joint certificate accrediting full completion of the programme.</p>`,
  "formacion:cta": `<p><strong>Questions about enrolment or certificates?</strong></p>
<p>The IUCE Secretariat can be reached on 923 294 634 (ext. 4634 via the USAL switchboard) and at iuce@usal.es.</p>`,

  // ── Doctorado ──────────────────────────────────────────────────────────
  "doctorado:programa": `<p>Shaped within the IUCE, the programme was born with the vocation of presenting teaching–learning processes as true driving forces of the Knowledge Society, in symbiosis with the most cutting-edge technological advances. A fully interdisciplinary approach that brings together researchers from almost every branch of knowledge.</p>`,
  "doctorado:semana-doctoral": `<p>Every autumn the programme holds its Doctoral Week: seminars, presentations of research progress and a meeting point for doctoral candidates and research groups.</p>`,

  // ── Transferencia ──────────────────────────────────────────────────────
  "transferencia:intro": `<p>Transferring knowledge to society is one of the IUCE's main objectives: ensuring that educational research does not stay in scientific journals, but improves the practice of public authorities, educational institutions, companies and social organisations.</p>`,
  "transferencia:mision": `<p>Article 60 of the LOSU recognises knowledge transfer as an essential function of the university. The IUCE exercises it by placing its research (educational assessment, technology, training, communication) at the service of those who need it: through contracts and agreements, tailor-made developments, specialised training and expert advice.</p>`,
  "transferencia:otc-descripcion": `<p>The Knowledge Transfer Office of the University of Salamanca channels Article 60 contracts, patents and collaboration with companies and institutions.</p>`,
  "transferencia:datos-descripcion": `<p>60 contracts and 4 agreements with foundations, public authorities and companies during 2020–2025.</p>`,
  "transferencia:cta": `<p><strong>Does your organisation face an educational challenge?</strong></p>
<p>Write to us and we will look at how the IUCE's research can help you: assessment, training, educational technology or communication.</p>`,

  // ── Estadísticas ───────────────────────────────────────────────────────
  "estadisticas:hero-eyebrow": `<p>2020–2025 Report</p>`,
  "estadisticas:intro": `<p>The Institute's activity over the 2020–2025 period, in figures: projects, knowledge transfer, theses, training, networks and management. The figures come from the IUCE's accreditation report.</p>`,
  "estadisticas:proyectos-descripcion": `<p>114 research projects involving the IUCE, mobilising €11.9 million. The European Commission is the main funder, followed by the Government of Spain.</p>`,
  "estadisticas:transferencia-descripcion": `<p>64 knowledge transfer contracts and agreements (art. 60 LOSU) worth a total of €766,970, with foundations, public authorities and companies (2020–2025).</p>`,
  "estadisticas:doctorado-descripcion": `<p>101 doctoral theses defended — 91% awarded Cum Laude and 4 in 10 with International Mention — and 213 master's dissertations supervised, with a clearly rising trend.</p>`,
  "estadisticas:formacion-descripcion": `<p>More than 2,600 hours of continuing training: the IUCE's teaching staff not only carry out research on teaching, they also deliver it and train continuously under the Training Plan for PDI (teaching and research staff).</p>`,
  "estadisticas:redes-descripcion": `<p>40 research networks (half of them with international reach) and 26 mobility stays in 12 countries underpin the Institute's international outreach.</p>`,
  "estadisticas:gestion-descripcion": `<p>IUCE staff hold 292 academic and scientific management positions and take part in 27 postgraduate programmes — with a notable leap in the 2024-25 academic year.</p>`,
  "estadisticas:nota-fuente": `<p>Source: IUCE accreditation report (2020–2025 period). The data are updated from the administration panel; figures for 2025 may be partial.</p>`,

  // ── Seminario ──────────────────────────────────────────────────────────
  "seminario:intro": `<p>Once a year, the IUCE's research groups sit down in the same room to tell one another what they are working on. The IUCE Seminar is the internal gathering that turns an interdisciplinary institute into a team: results are shared, common interests are discovered and collaborations are born that would otherwise never happen.</p>`,
  "seminario:objetivo": `<p>The aim is threefold: <strong>cooperation</strong> between groups working on complementary problems, <strong>transfer</strong> of methods and tools from one field to another, and <strong>synergies</strong> that translate into joint projects and publications. Each edition is recorded in proceedings that document the state of the Institute's research.</p>`,
  "seminario:cta": `<p><strong>Would your group like to present its work at the next edition?</strong></p>
<p>Write to the IUCE Secretariat and we will send you the call for participation.</p>`,

  // ── Legal ──────────────────────────────────────────────────────────────
  "legal:aviso-legal": `<p>This website is the institutional site of the <strong>University Institute of Education Sciences (IUCE)</strong>, an institute of the University of Salamanca, based at Paseo de Canalejas, 169 (Solís Building, first floor), 37008 Salamanca. Contact: iuce@usal.es · +34 923 294 634.</p>
<h2>Ownership and terms of use</h2>
<p>The site is owned by the University of Salamanca (CIF Q3718001E, Patio de Escuelas 1, 37008 Salamanca). Accessing the site confers the status of user and implies acceptance of these terms. The contents are provided for information purposes; the IUCE strives to keep them accurate and up to date, although the content of this website does not, in itself, constitute a source of binding legal effects.</p>
<h2>Intellectual property</h2>
<p>Unless expressly indicated otherwise, the site's own content (texts, images and institutional logos) belongs to the University of Salamanca or is published with the permission of its owners. Quotation and linking are permitted provided the source is acknowledged; any other use requires prior authorisation.</p>
<h2>Data protection</h2>
<p>The processing of personal data (contact form and members' area) is governed by the <a href="https://www.usal.es/proteccion-de-datos">data protection policy of the University of Salamanca</a>, in accordance with the GDPR and the Spanish Data Protection Act (LOPDGDD). Data are used solely to deal with enquiries or to manage access for the Institute's staff.</p>
<h2>External links</h2>
<p>This site links to third-party pages (journals, research portals, partner organisations) for whose content the IUCE bears no responsibility.</p>`,
  "legal:accesibilidad": `<p>The University Institute of Education Sciences (IUCE) of the University of Salamanca is committed to making its website accessible in accordance with <strong>Royal Decree 1112/2018</strong> of 7 September on the accessibility of public sector websites and mobile applications.</p>
<p>This accessibility statement applies to the website <strong>iuce.usal.es</strong>.</p>
<h2>Compliance status</h2>
<p>This website is <strong>partially compliant</strong> with Royal Decree 1112/2018 owing to the exceptions and the non-compliant aspects listed below.</p>
<h2>Non-accessible content</h2>
<p>The content listed below is not accessible for the following reasons:</p>
<ul><li>Some historical PDF documents (training plans and minutes prior to 2026) may not be fully tagged.</li>
<li>Some images in news items migrated from the previous website (2010–2026) may lack descriptive alternative text.</li>
<li>The embedded historical video of the Solís Building, hosted on YouTube, may lack subtitles.</li></ul>
<h2>Preparation of this statement</h2>
<p>This statement was prepared on 13 July 2026 by means of a self-assessment carried out by the Institute itself.</p>
<h2>Feedback and contact details</h2>
<p>You can report any accessibility problem or request information about excluded content by writing to <a href="mailto:iuce.tecnico@usal.es">iuce.tecnico@usal.es</a> or calling 923 294 634. You can also submit a complaint or request through the <a href="https://www.usal.es/accesibilidad">accessibility channel of the University of Salamanca</a>.</p>
<h2>Enforcement procedure</h2>
<p>If a request for accessible information or a complaint has been rejected, or if you disagree with the decision taken, you may lodge a claim under Article 13 of Royal Decree 1112/2018 with the unit responsible for accessibility at the University of Salamanca.</p>`,
  "legal:cookies": `<p>A cookie is a small piece of information sent by a website and stored in the browser, so that the site can remember the user's previous activity.</p>
<p>This website uses only <strong>strictly necessary cookies</strong>: those essential to provide services expressly requested (for example, keeping you signed in to the intranet or the administration panel). No analytics or advertising cookies are used, and no data are passed on to third parties.</p>
<h2>Disabling cookies</h2>
<p>You can choose at any time which cookies work on this site by configuring your browser. Please note that, if you disable the necessary cookies, the intranet and the panel will stop working:</p>
<ul><li><strong>Chrome:</strong> Settings → Privacy and security → Cookies.</li>
<li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data.</li>
<li><strong>Safari:</strong> Preferences → Privacy.</li>
<li><strong>Edge:</strong> Settings → Cookies and site permissions.</li></ul>
<p>For more information on the processing of personal data, see the <a href="https://www.usal.es/proteccion-de-datos">data protection policy of the University of Salamanca</a>.</p>`,
};
