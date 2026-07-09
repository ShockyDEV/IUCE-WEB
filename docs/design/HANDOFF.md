# Handoff: Rediseño web institucional del IUCE (iuce.usal.es)

Paquete de traspaso para implementar el rediseño de la web del IUCE — Instituto
Universitario de Ciencias de la Educación (Universidad de Salamanca) — con el
**mismo stack que IUCE-Reservas-TFG y mupes**. Pensado para trabajarse con
Claude Code (o cualquier desarrollador) dentro de un repo privado.

## Resumen

Web institucional pública completa (Inicio, Instituto, Investigación,
Formación, Eventos, Doctorado, Noticias con detalle y Contacto) + panel de
administración completo calcado al patrón de `ShockyDEV/mupes`, para que
personal no técnico gestione todo el contenido.

## Sobre los archivos de diseño

Los archivos de `prototipos/` son **referencias de diseño hechas en HTML**
(prototipos navegables), NO código de producción. La tarea es **recrear estas
pantallas en Next.js 14 (App Router) + TypeScript + Tailwind CSS 3**, siguiendo
los patrones ya establecidos en:

- `github.com/ShockyDEV/IUCE-Reservas-TFG` → stack, despliegue, tokens visuales
- `github.com/ShockyDEV/mupes` → **patrón del panel de administración** (sidebar,
  tablas CRUD, editor TipTap, ContentEditor por bloques, auto-traducción EN)

Para ver los prototipos: servir la carpeta `prototipos/` con un servidor
estático (p. ej. `npx serve`) y abrir los `.dc.html`. Cada archivo incluye su
markup completo con estilos inline; `_ds/` contiene los tokens CSS.

## Fidelidad

**Alta (hi-fi).** Colores, tipografía, espaciados, radios, sombras y copys son
finales (dirección visual "1a — Institucional clásico" aprobada). Recrear
pixel-perfect con Tailwind, mapeando los tokens de abajo a `tailwind.config.ts`.
El contenido (noticias, miembros, textos) es real, extraído de iuce.usal.es —
sirve como datos semilla (seed).

## Stack obligatorio (idéntico al TFG)

- Next.js 14 App Router + TypeScript 5 (modo estricto)
- Tailwind CSS 3 (nada de CSS-in-JS ni otras librerías de estilos)
- API Routes de Next.js
- PostgreSQL 16 + Prisma 6
- **NextAuth.js v5 con Credentials (email + contraseña)** — decisión tomada en
  el proyecto: NO magic link; solo cuentas dadas de alta por el rol
  SUPER_ADMIN pueden entrar. Hash con bcrypt.
- Resend 4 (formulario de contacto → email a iuce@usal.es + registro en BD)
- Vitest para tests
- Docker + docker-compose, desplegado tras Apache 2 con SSL Let's Encrypt
- npm

## Tokens de diseño (→ tailwind.config.ts)

Copiados del design system de IUCE Reservas (`_ds/…/tokens/*.css`, fuente de
verdad). Principales:

Colores de marca
- `iuce-navy` #1B3A5C (primario: header oscuro admin-hero, botón default, titulares)
- `iuce-blue` #3B7DD8 (enlaces, focus, acentos interactivos)
- `iuce-blue-pale` #EFF4FB (fondos de chips/iconos informativos)
- `usal-red` #C8102E (SOLO acento institucional: barra superior de 3px,
  eyebrows, subrayado del ítem activo del nav, énfasis admin). Nunca como
  fondo extenso.
- Neutros: escala gray de Tailwind; fondo de página `gray-50`, tarjetas blancas.

Modo oscuro (clase `dark` en `<html>`, persistida en localStorage `iuce-theme`)
- fondo página #0B1724 · tarjeta #13253A · pale #152A42
- enlaces #7DAFEA · rojo acento #E56276 · titulares #A9C7EE
- El panel de administración es SOLO claro (como mupes).

Tipografía
- Pila del sistema (`system-ui, -apple-system, "Segoe UI", Roboto…`), sin webfonts.
- H1 44px/700 tracking-tight · H2 24px/700 · body 16px/relaxed gray-600 ·
  eyebrow 12px/700 uppercase tracking-wider en usal-red.

Espaciado y forma
- Grid de 4px. Contenedor `max-w-6xl` (1152px) con gutter 24px. Navbar 68px.
- Radios: inputs 6px, botones/alertas 8px, tarjetas 12px, pills 999px.
- Sombras: solo `shadow-sm` y `shadow-md`. Transiciones 150ms ease.
- Iconos: lucide-react, stroke 2, monocromos. Sin emoji.

## Páginas públicas (prototipos)

Todas comparten: skip-link "Saltar al contenido principal", barra roja 3px,
header sticky blanco 68px (logo IUCE izquierda, nav centro, buscador + toggle
claro/oscuro + ES·EN derecha), ítem activo con borde inferior rojo 2px,
footer institucional oscuro (componente InstitutionalFooter del TFG).

### Inicio (`Inicio.dc.html` → ruta `/`)
1. Hero partido: izquierda eyebrow rojo + H1 "Investigación e innovación en
   Educación Superior" + párrafo + 2 CTAs (navy sólido "Conoce el Instituto",
   outline "Plan de Formación Docente") + fila de 3 hitos con iconos rojos
   (Origen ICE 1969 · Verificado ACSUCYL 2008 · Edificio Solís). Derecha: foto
   (hueco 380px, radio 12px) con etiqueta navy superpuesta con la dirección.
2. Banda gris `gray-50` con 4 tarjetas de acceso rápido (Investigación,
   Formación, Doctorado, Reserva de espacios — esta última con icono rojo y
   enlace externo a reservas.iuce.usal.es). Hover: borde azul + shadow-md.
3. "Actualidad": H2 + "Ver todas las noticias →"; grid de 3 tarjetas de
   noticia (imagen 150px, chip de categoría pale-blue, fecha, título, extracto).
4. Banda EKS `surface-tinted`: cuadrado navy "EKS", nombre de la revista,
   descripción y botón outline "Visitar la revista ↗" (enlace externo, no se
   reconstruye la plataforma).

### Instituto (`Instituto.dc.html` → `/instituto`)
Cabecera con breadcrumb + subnav de anclas (Perfil · Equipo de dirección ·
Miembros · Ubicación · Instalaciones · Edificio histórico). Secciones:
- Perfil: 2 columnas; texto histórico (ICE 1969 → ACSUCYL 2008) + lista de
  funciones (2 col, checks rojos) + nota al Reglamento 2023. Aside: tarjeta de
  cita de la directora (borde superior rojo) + timeline de hitos.
- Equipo de dirección: 3 tarjetas (foto circular 72px, nombre, cargo en
  eyebrow rojo, email) — Olmos (Directora), García Peñalvo (Subdirector),
  Merchán (Secretario) + banda de Secretaría (Begoña Sánchez, ext. 4634).
- Miembros: buscador + grid 3 col de tarjetas compactas (avatar iniciales,
  nombre, área); los datos salen del gestor.
- Ubicación: datos de contacto con iconos + hueco de mapa. ROR 00xnj6419.
- Instalaciones: 4 figuras con foto 140px + caption; enlace a reservas.
- Edificio histórico: texto + foto 340px.

### Formación (`Formacion.dc.html` → `/formacion`)
- Cabecera 2 col: H1 "Plan de Formación Docente 2026", CTA "Programa e
  inscripciones"; derecha 3 tarjetas-dato (100+ actividades, 4 universidades,
  desde 1969).
- "¿A quién va dirigido?": 3 tarjetas (todo el PDI, profesorado novel,
  asociado acreditado).
- "Actividades formativas": 3 tarjetas con borde superior de color (Plan
  General azul, SPOCs azul, Formación Docente Inicial rojo).
- Sección FDI: texto LOSU art. 78.b + lista de las 4 unidades (USAL/IUCE,
  UBU/IFIE, ULE, UVA/VirtUVa) + aside "Ediciones 2026" (M4-M5, M1, M2) +
  contacto coord.docencia@usal.es.
- CTA final de contacto con Secretaría.

### Doctorado (`Doctorado.dc.html` → `/doctorado`)
- Cabecera: programa "Formación en la Sociedad del Conocimiento", botones a
  knowledgesociety.usal.es y doctorado.usal.es (externos).
- Líneas de investigación: grid 4×2 de tarjetas con icono.
- Grupos de investigación: grid 3 col (GRIAL con chip "UIC 081", GITE, OCA,
  VisualMed System, Robótica y Sociedad, E-LECTRA).
- Perfil de ingreso: 3 pasos numerados + aside con coordinador (García
  Peñalvo) y tarjeta "Semana Doctoral".

### Investigación (`Investigacion.dc.html` → `/investigacion`)
Cabecera con subnav de anclas (Grupos · Proyectos · Publicaciones).
- Grupos: grid 3×2 de tarjetas (acrónimo navy bold, chip UIC 081 en GRIAL,
  descripción, responsable con icono, web externa).
- Proyectos: filas divididas por hairline (título, financiador + IP, chip de
  años pale-blue a la derecha).
- Publicaciones: banda EKS + 3 tarjetas de artículo (eyebrow rojo "Artículo ·
  año", título, autores + revista en cursiva) + enlace al Portal de
  Investigación de la USAL.

### Eventos (`Eventos.dc.html` → `/eventos`)
- Cabecera + chips de filtro (Todos activo navy sólido; Congresos, Seminarios,
  Jornadas outline).
- Destacado: tarjeta 2 col (chips Congreso + Próximo azul, título ICED26,
  descripción, fecha/lugar con iconos rojos, botón outline "Web del congreso",
  hueco de imagen).
- Próximos: filas con bloque de fecha navy 56px (día/mes) + título + meta.
- Celebrados: grid de filas (fecha uppercase gris, título, organizador, chip
  gris "Celebrado").

### Noticias (`Noticias.dc.html` → `/noticias`)
- Cabecera + chips de categoría (Todas, Congresos, Formación, Innovación
  docente, Premios, Doctorado).
- Destacada: tarjeta horizontal grande enlazada al detalle (imagen +
  categoría/fecha + H2 + extracto + "Leer la noticia →").
- Feed: grid 3×2 de tarjetas (imagen 150px, chip categoría, fecha, título,
  extracto), toda la tarjeta es enlace con hover azul + shadow-md.
- Paginación centrada: ← 1(activo navy) 2 3 … 8 →.

### Detalle de noticia (`Noticia.dc.html` → `/noticias/[slug]`)
- Columna de lectura 800px: breadcrumb, chip + fecha + autoría, H1 4xl,
  entradilla en gris 18px.
- Imagen principal 960px de ancho, 420px, radio 12, con pie de foto.
- Cuerpo 17px/1.75 con negritas y blockquote con borde izquierdo rojo sobre
  fondo tinted.
- Fila "Compartir" (X, LinkedIn, copiar enlace — botones circulares outline).
- "Más actualidad": 3 mini-tarjetas.

### Contacto (`Contacto.dc.html` → `/contacto`)
- 2 columnas: izquierda datos con iconos (dirección, teléfonos, email,
  horario L–V 9:00–14:00) + hueco de mapa + aviso con borde rojo hacia el
  sistema de reservas.
- Derecha: tarjeta-formulario "Escríbenos" (Nombre*, Correo*, Asunto* select
  con 6 opciones, Mensaje* textarea, checkbox RGPD* con enlace a política de
  privacidad, botón navy lg "Enviar mensaje" + nota "Recibirás copia").
- Backend: POST → API Route → Resend (email a iuce@usal.es + autorespuesta) +
  registro en ContactMessage para la bandeja del admin.

## Panel de administración (`Admin IUCE.dc.html` → `/admin`)

**Copiar la arquitectura de mupes** (`src/app/(admin)/`, `src/components/admin/`,
`admin-sidebar.tsx`, `admin-header.tsx`):

- Login (`/auth/signin`): tarjeta centrada, logo, email + contraseña,
  "¿Has olvidado tu contraseña?", botón navy "Iniciar sesión". Nota: tener
  cuenta @usal.es NO da acceso; solo cuentas creadas por el Super Admin.
- Shell: sidebar fija 260px blanca (logo + grupos con títulos 10px uppercase;
  ítem activo `bg-usal-red/10 text-usal-red`; footer "Volver al sitio" y
  "Cerrar sesión") + header sticky 64px (título de página, usuario + rol,
  logout) + main `p-8 bg-gray-50 max-w-[1200px]`.
- Grupos del sidebar: Dashboard, Noticias / CONTENIDO: Páginas, Archivos /
  INSTITUTO: Equipo y miembros, Grupos de investigación / ACTIVIDAD: Eventos,
  Mensajes de contacto / SISTEMA: Configuración.
- Dashboard: bienvenida; 3 tarjetas de analítica (hoy/semana/mes — patrón
  analytics de mupes); 6 tarjetas de recuento (noticias, miembros, grupos,
  eventos, archivos, mensajes) con icono en cuadrado de color 48px
  (green/purple/orange/red/cyan/pale); "Acciones rápidas"; fuentes de tráfico.
- Noticias: tabla (Título, Categoría, Estado-pill, Publicación, Acciones
  lápiz/papelera). Estados: Publicada `green-100/700`, Borrador
  `gray-100/700`, Archivada `yellow-100/700`.
- Editor de noticia: Volver; Título + Slug (auto-slugify como en mupes);
  Extracto; editor TipTap con toolbar (deshacer/rehacer, select de párrafo,
  B/I/U/S, listas, cita, enlace, imagen, tabla) + contador de caracteres y
  palabras; Imagen de portada (file-picker), Categoría, Estado, Fecha;
  "Guardar cambios" + nota "Se traduce automáticamente al inglés al guardar"
  (patrón `/api/admin/translate` de mupes).
- Páginas (ContentEditor de mupes): selector de página y bloques editables
  independientes (pageSlug + blockKey), cada uno con toolbar, dirty-dot ámbar,
  "Auto EN" y Guardar. Así TODAS las páginas públicas son editables.
- Equipo y miembros / Grupos / Eventos / Archivos (dropzone + tabla) /
  Mensajes (bandeja del formulario de contacto; no leídos resaltados) /
  Configuración (datos del sitio + cuentas autorizadas con roles).
- Toasts estilo react-hot-toast arriba a la derecha.

## Autenticación y roles

- NextAuth v5, provider Credentials, sesión JWT. bcrypt para hash.
- Roles: `SUPER_ADMIN` (gestiona cuentas), `ADMIN`. Middleware protege
  `/admin/**` y `/api/admin/**`.
- Solo el SUPER_ADMIN crea cuentas (pantalla Configuración → "Crear cuenta").

## Esquema Prisma propuesto

```prisma
enum Role { ADMIN SUPER_ADMIN }
enum NewsStatus { DRAFT PUBLISHED ARCHIVED }
enum EventStatus { UPCOMING PAST CANCELLED }

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String
  passwordHash String
  role         Role     @default(ADMIN)
  createdAt    DateTime @default(now())
}

model News {
  id          String     @id @default(cuid())
  title       String
  titleEn     String?
  slug        String     @unique
  excerpt     String?
  excerptEn   String?
  content     String     // HTML de TipTap
  contentEn   String?
  coverImage  String?
  category    String
  status      NewsStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

model ContentBlock {   // patrón mupes: contenido de páginas estáticas
  id       String @id @default(cuid())
  pageSlug String // "instituto", "formacion", "doctorado", "inicio"
  blockKey String // "perfil-intro", "funciones", …  (+ ":en" para inglés)
  content  String
  @@unique([pageSlug, blockKey])
}

model Member {
  id       String  @id @default(cuid())
  name     String
  area     String?
  email    String?
  photo    String?
  role     String? // Directora, Subdirector, Secretario, null = miembro
  active   Boolean @default(true)
  order    Int     @default(0)
  groupId  String?
  group    ResearchGroup? @relation(fields: [groupId], references: [id])
}

model ResearchGroup {
  id       String  @id @default(cuid())
  acronym  String
  name     String
  nameEn   String?
  lead     String?
  url      String?
  members  Member[]
}

model Event {
  id        String      @id @default(cuid())
  title     String
  titleEn   String?
  type      String      // Congreso, Seminario, Jornada
  startsAt  DateTime
  endsAt    DateTime?
  location  String?
  url       String?
  status    EventStatus @default(UPCOMING)
}

model FileAsset {
  id        String   @id @default(cuid())
  filename  String
  mimeType  String
  size      Int
  url       String
  createdAt DateTime @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  body      String
  status    String   @default("NEW") // NEW | REPLIED
  createdAt DateTime @default(now())
}

model PageView {   // analítica ligera como en mupes
  id        String   @id @default(cuid())
  path      String
  referrer  String?
  visitorId String
  date      DateTime @default(now())
}
```

## Rutas

Públicas: `/`, `/instituto`, `/investigacion`, `/formacion`, `/eventos`,
`/doctorado`, `/noticias`, `/noticias/[slug]`, `/contacto`. EKS = enlace
externo a `revistas.usal.es/index.php/eks`, y "Reserva de espacios" a
`reservas.iuce.usal.es` (no reconstruir).
i18n: `es` por defecto sin prefijo, inglés bajo `/en/...`; contenidos EN desde
los campos `*En` / bloques `:en` (auto-traducción al guardar, patrón mupes).

Admin: `/admin` (+ `/admin/news`, `/admin/news/new`, `/admin/news/[id]`,
`/admin/pages`, `/admin/members`, `/admin/groups`, `/admin/events`,
`/admin/files`, `/admin/messages`, `/admin/settings`) con API paralela en
`/api/admin/...` (patrón mupes 1:1).

## Requisitos no funcionales

- **WCAG 2.1 AA** (RD 1112/2018): skip-link, foco visible (anillo 2px azul),
  `aria-current` en nav, iconos `aria-hidden`, alt en imágenes, contraste AA
  en ambos temas, navegación completa por teclado, `lang` correcto.
- SEO: `generateMetadata` por página, Open Graph, `sitemap.xml`, `robots.txt`.
- Rendimiento: `next/image`, lazy-loading, estáticas/ISR donde aplique.
- Tests Vitest: utilidades (slugify), API routes admin, render de componentes.
- Docker: mismo `Dockerfile`/`docker-compose.yml` que el TFG (app + postgres),
  detrás de Apache como reverse proxy con SSL.

## Assets

- `prototipos/assets/`: logos IUCE y USAL en color y blanco (usar tal cual,
  no redibujar).
- Las fotos son huecos (`<image-slot>`): el IUCE aportará fotografía real de
  espacios y retratos. En producción: `next/image` + subida vía Archivos.
- Iconos: lucide-react.

## Archivos del paquete

- `prototipos/Inicio.dc.html` — portada aprobada (dirección 1a)
- `prototipos/Instituto.dc.html`, `Investigacion.dc.html`, `Formacion.dc.html`,
  `Eventos.dc.html`, `Doctorado.dc.html`, `Noticias.dc.html`,
  `Noticia.dc.html` (detalle), `Contacto.dc.html`
- `prototipos/Admin IUCE.dc.html` — panel completo (login → dashboard → CRUDs)
- `prototipos/Portada IUCE -exploracion-.dc.html` — las 4 variaciones descartadas/aprobada
- `prototipos/_ds/` — tokens CSS y bundle del design system (fuente de verdad visual)
- `prototipos/support.js`, `image-slot.js`, `lucide-icon.js` — runtime de los prototipos

## Cómo empezar en el repo

1. Crear repo privado y volcar este paquete en `docs/design/` (o similar).
2. Bootstrapping: clonar la estructura de IUCE-Reservas-TFG (config TS,
   Tailwind, Prisma, Docker) y el árbol `(admin)` de mupes.
3. Mapear los tokens de arriba a `tailwind.config.ts`.
4. Implementar público (Inicio → Instituto → Formación → Doctorado) y luego
   admin, sembrando la BD con el contenido real de los prototipos.
