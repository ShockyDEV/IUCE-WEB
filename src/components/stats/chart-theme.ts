"use client";

import { useEffect, useState } from "react";

/**
 * Tema de las gráficas. Los valores replican las variables de
 * `globals.css` (light/dark): recharts necesita colores concretos, no
 * `var(--…)`, así que se eligen según la clase `.dark` del <html> y se
 * recalculan cuando el usuario cambia el tema (MutationObserver).
 */
export interface ChartTheme {
  /** Paleta de series (azul IUCE primero, rojo USAL segundo). */
  series: string[];
  axis: string;
  grid: string;
  cardBg: string;
  cardBorder: string;
  text: string;
  dark: boolean;
}

const LIGHT: ChartTheme = {
  series: [
    "#3b7dd8", // iuce-blue
    "#c8102e", // usal-red
    "#1b3a5c", // iuce-blue-dark
    "#7fb0e6",
    "#d97706",
    "#0d9488",
    "#8b5cf6",
    "#6b7280",
  ],
  axis: "#6b7280",
  grid: "#e5e7eb",
  cardBg: "#ffffff",
  cardBorder: "#e5e7eb",
  text: "#111827",
  dark: false,
};

const DARK: ChartTheme = {
  series: [
    "#7dafea",
    "#e56276",
    "#a9c9f2",
    "#4a7dbb",
    "#f0a35e",
    "#2dd4bf",
    "#a78bfa",
    "#94a3b8",
  ],
  axis: "#93a5bb",
  grid: "#24384f",
  cardBg: "#13253a",
  cardBorder: "#24384f",
  text: "#e8eef6",
  dark: true,
};

export function useChartTheme(): ChartTheme {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark ? DARK : LIGHT;
}

/** ¿El usuario prefiere reducir el movimiento? (animaciones desactivadas) */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// ── Formateadores (es-ES) ────────────────────────────────────────────────
const nf = new Intl.NumberFormat("es-ES");

export const fmtNum = (v: number) => nf.format(v);
export const fmtEuro = (v: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(v);
/** Valores que vienen en miles de €: 6.767 → «6,77 M€». */
export const fmtMilesEuro = (v: number) =>
  v >= 1000
    ? `${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(v / 1000)} M€`
    : `${nf.format(v)} mil €`;

export type ValueFormat = "num" | "euro" | "milesEuro";

export const FORMATTERS: Record<ValueFormat, (v: number) => string> = {
  num: fmtNum,
  euro: fmtEuro,
  milesEuro: fmtMilesEuro,
};
