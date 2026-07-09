# IUCE Reservas — Design System

Brand and UI system for **IUCE Reservas**, the space-reservation platform of the **Instituto Universitario de Ciencias de la Educación (IUCE)** — a research and teaching center of the **Universidad de Salamanca (USAL)**. The system digitizes booking of the institute's classrooms, labs and multi-purpose rooms: catalog, availability filtering, request + admin approval, email notifications and a calendar view.

This design system is derived directly from the production codebase and the institutional logos, so designs made with it match the real product.

## Sources
- **GitHub (product codebase, ground truth):** [github.com/ShockyDEV/IUCE-Reservas-TFG](https://github.com/ShockyDEV/IUCE-Reservas-TFG) — Next.js 14 · TypeScript · Tailwind CSS 3 · Prisma · PostgreSQL. Explore this repo to build higher-fidelity designs; the color scale, components and screens here are lifted from `tailwind.config.ts` and `src/components` / `src/app`.
- **Live product:** reservas.iuce.usal.es · **Institute:** iuce.usal.es
- **Logos (uploaded):** IUCE and Universidad de Salamanca marks → `assets/`.
- Related repo (same author, congress site): [ShockyDEV/ICED26-Programme-Web](https://github.com/ShockyDEV/ICED26-Programme-Web).

## Index
- `styles.css` — global entry point (`@import`s all tokens). Consumers link only this.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`.
- `components/core/` — **Button**, **Badge**, **Card** (+ Header/Title/Description/Content/Footer), **Input**, **Textarea**, **Icon**.
- `components/layout/` — **Navbar**, **InstitutionalFooter**.
- `ui_kits/iuce-reservas/` — interactive recreation of the app (landing, sign-in, dashboard, catalog, admin).
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand).
- `assets/` — IUCE + USAL logos (color & white) and real space photography.
- `SKILL.md` — Agent-Skill wrapper for use in Claude Code.

## Components
Reusable primitives, all copied 1:1 from the app's `src/components`:
- **Button** — 8 variants (default=IUCE navy, primary=USAL red, secondary, ghost, link, success, danger, outline), 5 sizes; presses to scale 0.98.
- **Badge** — status pill (default, info, success, warning, danger, outline, secondary); maps to reservation states.
- **Card** — white surface, 12px radius, gray-200 border, shadow-sm; with CardHeader / CardTitle / CardDescription / CardContent / CardFooter.
- **Input** — text/date/time/number field, blue focus ring.
- **Textarea** — multi-line field.
- **Icon** — Lucide glyph set the app ships (2px stroke). *Intentional addition* (see below).
- **Navbar** — sticky app bar with role-gated admin link.
- **InstitutionalFooter** — dark IUCE + USAL footer.

### Intentional additions
- **Icon** — the app imports `lucide-react` per-icon in TSX. Since design-system components may only import React, `Icon` bundles the exact Lucide path data the app uses (`calendar-check`, `building-2`, `shield-check`, …) so consumers get pixel-identical iconography with no CDN dependency.

---

## Content fundamentals
The product is **entirely in Spanish (Spain)**, formal-institutional but friendly.

- **Voice:** addresses the user directly with the informal *tú* imperative — "Reserva aulas…", "Solicita en segundos", "Introduce tu correo", "Revisa tu correo". Warm but efficient.
- **Person:** second person *tú* to the user; the institution refers to itself as *el IUCE* / *el equipo del IUCE* (third person), never "we/nosotros" marketing-speak.
- **Casing:** sentence case for headings and buttons ("Iniciar sesión", "Ver catálogo completo"). UPPERCASE + wide tracking only for tiny eyebrow labels ("PENDIENTES", "ACCESO RÁPIDO (DEV)").
- **Domain vocabulary:** *espacio, reserva, solicitud, franja horaria, disponibilidad, aprobación, cuenta @usal.es, magic link, bloqueo, aforo/capacidad, equipamiento, accesibilidad*.
- **Status language (fixed):** Pendiente · Aprobada · Rechazada · Cancelada · Expirada. Roles: Usuario · Administrador · Super Administrador.
- **Microcopy is reassuring and concrete:** "Sin contraseñas que recordar", "El enlace es válido durante 10 minutos", "Solicitudes esperando revisión". States promises + timeframes plainly.
- **No emoji.** Iconography carries visual accent, not emoji. Buttons pair a short verb phrase with a leading Lucide icon.
- **Punctuation:** Spanish typography — "@usal.es", "923 294 634", medium/short date formats via `es-ES` ("12 jun 2026, 10:00").

## Visual foundations
- **Two brand colors.** IUCE **navy `#1B3A5C`** (primary actions, headings, dark login panel) and **blue `#3B7DD8`** (links, focus, interactive accents), balanced by USAL **red `#C8102E`** reserved for institutional / administrative emphasis (admin nav link, admin CTAs, danger, footer contact icons, the small red accent bar). A pale blue `#EFF4FB` tints info surfaces. Red is an *accent*, never a background wash.
- **Neutrals** are a standard Tailwind gray ramp; page background is `gray-50`, cards are white, footer is near-black `gray-950`.
- **Type:** the **native system UI font stack** (`system-ui, -apple-system, "Segoe UI", Roboto…`) — no webfonts are shipped, matching production exactly. Headings are bold (700) with tight tracking at large sizes; body is 14px `gray-600`; eyebrow labels are 12px uppercase with wide tracking. See font substitution note below.
- **Spacing:** 4px base grid. Cards pad 24px (`p-6`); page containers are `max-w-6xl` (1152px) with 24px gutters; navbar is 64px tall.
- **Corners:** inputs/sm-buttons 6px (`rounded-md`), buttons/alerts 8px (`rounded-lg`), cards 12px (`rounded-xl`), badges/avatars/chips fully round.
- **Cards:** white, 12px radius, 1px `gray-200` border, `shadow-sm`. Interactive cards lift on hover (`shadow-md` + faint blue border) and images inside zoom to 1.05.
- **Shadows** are soft and shallow — two levels only (`shadow-sm`, `shadow-md`). No heavy or colored drop-shadows.
- **Backgrounds:** mostly flat. A single subtle top-down gradient (`brand-50/50 → white`) on public pages; real photography fills space cards (4:3, cover). No patterns, textures, or decorative blobs. Occasional translucent white + backdrop-blur on the sticky navbar/header.
- **Borders & dividers** are 1px `gray-200`/`gray-100`; dashed borders mark empty states.
- **Motion:** restrained. 150ms `ease` transitions on color/shadow/border; buttons scale to **0.98 on press**; image zoom on card hover (300ms). No bounces, no looping/decorative animation.
- **Hover states:** solid buttons darken to their `-dark`/`-700` shade; secondary/ghost pick up `gray-50`/`gray-100`; nav links shift to IUCE navy; cards raise elevation.
- **Focus:** 2px `brand-400` ring with 2px offset (buttons) or 2px ring + IUCE-blue border (inputs). Always visible.
- **Imagery vibe:** natural, warm, well-lit interior photography of real IUCE rooms — no filters, grain or duotone.
- **Layout rule:** centered `max-w-6xl` column, generous vertical rhythm (sections ~80px apart on landing, ~32px on app screens); sticky translucent navbar; dark institutional footer with IUCE (left) + USAL (right) logos.

## Iconography
- **Lucide** (`lucide-react` in the app) is the sole icon system — 24×24 viewBox, 2px stroke, round caps/joins, `none` fill. Sizes are small and consistent: 12px in badges, 14–16px inline in buttons/nav, 20px in card titles/stat tiles.
- Icons are **monochrome**, inheriting text color (navy, gray, USAL red on the footer/admin).
- In this system, use the **`Icon`** component (`<Icon name="calendar-check" size={16} />`) which carries the exact Lucide paths the app uses — no CDN required. Full name list on `Icon.names`. In plain HTML cards you can also load Lucide from CDN if preferred.
- **No emoji, no unicode-glyph icons.** The only custom SVG in the source is the X/Twitter mark in the footer.
- **Logos** are raster assets in `assets/` (IUCE color `iuce-logo.png` + white `iuce-logo-white.webp`; USAL `usal-logo.png` + white `usal-logo-white.webp`). Never redraw them.

## Font substitution note
No webfont files exist — the product deliberately uses the OS **system UI stack**. Nothing was substituted. If IUCE later adopts a brand webfont, add its `@font-face` under `tokens/` and update `typography.css`.
