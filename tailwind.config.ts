import type { Config } from "tailwindcss";

/**
 * Tokens de diseño del IUCE.
 *
 * La capa semántica (grises, marca, superficies, sombras) se respalda con
 * variables CSS definidas en `src/app/globals.css`, con overrides bajo la
 * clase `.dark`. Así el modo oscuro funciona escribiendo clases normales de
 * Tailwind (`bg-surface-card`, `text-gray-600`, `border-gray-200`…), sin
 * duplicar `dark:` por todo el markup.
 *
 * Se mantienen estáticas las escalas `brand`, `success`, `warning` y `danger`
 * porque se usan con modificadores de opacidad (p. ej. `hover:bg-brand-700/90`),
 * que requieren color literal.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutros: respaldados por variables → cambian con el tema
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
          950: "var(--gray-950)",
        },
        // Marca: azul IUCE y rojo USAL (cambian de tono en oscuro)
        usal: {
          red: "var(--usal-red)",
          "red-dark": "var(--usal-red-dark)",
        },
        iuce: {
          blue: "var(--iuce-blue)",
          "blue-dark": "var(--iuce-blue-dark)",
          "blue-pale": "var(--iuce-blue-pale)",
        },
        // Rampa azul de marca (estática, admite opacidad)
        brand: {
          50: "#F2F7FE",
          100: "#E3EEFB",
          400: "#7DAFEA",
          500: "#3B7DD8",
          700: "#1B3A5C",
          800: "#142E4A",
        },
        success: { 50: "#ECFDF3", 500: "#12B76A", 700: "#027A48" },
        warning: { 50: "#FFFAEB", 500: "#F79009", 700: "#B54708" },
        danger: { 50: "#FEF3F2", 500: "#D92D20", 700: "#B42318" },
        // Superficies semánticas (valores propios en oscuro)
        surface: {
          page: "var(--surface-page)",
          card: "var(--surface-card)",
          tinted: "var(--surface-tinted)",
          inverse: "var(--surface-inverse)",
        },
        // Tinta de titulares/logo (azul marino claro → azul suave en oscuro)
        ink: "var(--brand-ink)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        "6xl": "72rem",
      },
      letterSpacing: {
        tight: "-0.02em",
        wider: "0.05em",
      },
    },
  },
  plugins: [],
};

export default config;
