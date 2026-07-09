# IUCE — Web institucional

Web pública del **Instituto Universitario de Ciencias de la Educación (IUCE)** de
la **Universidad de Salamanca** (`iuce.usal.es`) + panel de administración para
que personal no técnico gestione todo el contenido.

Mismo stack y convenciones que
[`IUCE-Reservas-TFG`](https://github.com/ShockyDEV/IUCE-Reservas-TFG); el panel
de administración replica el patrón de [`mupes`](https://github.com/ShockyDEV/mupes).

## Stack

- **Next.js 14** (App Router) + **TypeScript 5** (modo estricto)
- **Tailwind CSS 3** (tokens de marca en `tailwind.config.ts` + `globals.css`)
- **PostgreSQL 16** + **Prisma 6**
- **NextAuth.js v5** con Credentials (email + contraseña, hash bcrypt)
- **Resend** para el formulario de contacto
- **Vitest** para tests · **Docker** + Apache (reverse proxy, SSL Let's Encrypt)

## Puesta en marcha

```bash
npm install                 # instala dependencias y genera el cliente Prisma
cp .env.example .env        # rellena DATABASE_URL, NEXTAUTH_SECRET, RESEND_API_KEY…
docker compose up -d        # PostgreSQL local en el puerto 5432
npm run db:push             # crea el esquema en la base de datos
npm run dev                 # http://localhost:3000
```

Otros comandos: `npm run build`, `npm run start`, `npm run lint`,
`npm run test`, `npm run db:seed`.

## Modo claro / oscuro

Las páginas públicas soportan tema claro y oscuro. La preferencia se guarda en
`localStorage['iuce-theme']` y se aplica añadiendo la clase `.dark` al `<html>`
(ver `src/components/theme-script.tsx` y `theme-toggle.tsx`). Los tokens de color
son variables CSS en `src/app/globals.css`; Tailwind las consume vía
`tailwind.config.ts`, por lo que basta usar clases normales (`bg-surface-card`,
`text-gray-600`, `text-ink`…) para que el tema cambie solo. El panel de
administración será **solo claro** (como en `mupes`).

## Estructura

```
src/
  app/
    layout.tsx              # layout raíz (html/body, tema, toasts)
    globals.css             # tokens de diseño (variables CSS + modo oscuro)
    (public)/               # sitio público (cabecera + footer institucional)
      layout.tsx
      page.tsx              # Inicio
      instituto/ …          # resto de páginas públicas
  components/
    layout/                 # site-header, institutional-footer, theme-toggle…
    ui/                     # button, card, badge, image-placeholder
    theme-script.tsx        # anti-parpadeo de tema
    toast-provider.tsx
  lib/                      # cn (clases Tailwind)
prisma/schema.prisma        # modelo de datos (News, Member, Event, ContactMessage…)
docs/design/                # paquete de handoff: prototipos + design system
public/images/              # logos IUCE y USAL
```

## Diseño (handoff)

`docs/design/` contiene los **prototipos navegables** (`*.dc.html`), el **design
system** (`_ds/`, fuente de verdad visual) y `HANDOFF.md` con la especificación
página por página. Para verlos, servir esa carpeta con un estático
(`npx serve docs/design`) y abrir los `.dc.html`.

## Estado

- [x] Bootstrap del repo: stack, tokens, layout base, modo claro/oscuro
- [x] **Inicio** (`/`) recreada desde el prototipo
- [ ] Páginas públicas: Instituto, Investigación, Formación, Doctorado, Eventos,
      Noticias (+ detalle), Contacto — actualmente marcadores «en construcción»
- [ ] Panel de administración (`/admin`) — patrón `mupes`
- [ ] Autenticación (NextAuth v5 Credentials) y modelo de datos sembrado
- [ ] i18n ES/EN, SEO (sitemap, OG), accesibilidad WCAG 2.1 AA, tests
