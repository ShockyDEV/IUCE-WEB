"use client";

import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FORMATTERS,
  useChartTheme,
  useReducedMotion,
  type ValueFormat,
} from "./chart-theme";

/** Punto de datos genérico de las gráficas (viene de las listas editables). */
export interface Datum {
  label: string;
  value: number;
  value2?: number;
}

/* ── Montaje al entrar en pantalla ─────────────────────────────────────────
   La gráfica se monta cuando su hueco entra en el viewport: así la animación
   de entrada de recharts se dispara al hacer scroll, no al cargar. En
   pestañas ocultas (IntersectionObserver mudo) se monta directamente. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    if (document.visibilityState === "hidden") {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    // Ya visible al montar (p. ej. anclas): no esperar al observer.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

/* ── Tooltip propio (tarjeta acorde al tema) ─────────────────────────────*/
interface TipProps {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  format: ValueFormat;
}

function ChartTip({ active, label, payload, format }: Readonly<TipProps>) {
  const theme = useChartTheme();
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3.5 py-2.5 text-sm shadow-lg"
      style={{
        background: theme.cardBg,
        borderColor: theme.cardBorder,
        color: theme.text,
      }}
    >
      {label !== undefined && label !== "" ? (
        <p className="mb-1 text-xs font-semibold opacity-70">{label}</p>
      ) : null}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2 font-medium">
          <span
            className="inline-block h-2.5 w-2.5 flex-none rounded-full"
            style={{ background: p.color }}
            aria-hidden
          />
          {p.name ? `${p.name}: ` : ""}
          {FORMATTERS[format](p.value ?? 0)}
        </p>
      ))}
    </div>
  );
}

const CHART_HEIGHT = 280;

interface BaseProps {
  data: Datum[];
  /** Nombre de la serie (aparece en tooltip y leyenda). */
  name: string;
  format?: ValueFormat;
  height?: number;
}

/* ── Barras verticales ───────────────────────────────────────────────────*/
export function BarsChart({
  data,
  name,
  format = "num",
  height = CHART_HEIGHT,
  accent = false,
}: Readonly<BaseProps & { accent?: boolean }>) {
  const theme = useChartTheme();
  const reduced = useReducedMotion();
  const { ref, visible } = useInView<HTMLDivElement>();
  const color = accent ? theme.series[1] : theme.series[0];

  return (
    <div ref={ref} style={{ height }}>
      {visible ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: theme.axis, fontSize: 12 }}
              axisLine={{ stroke: theme.grid }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.axis, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={54}
            />
            <Tooltip
              cursor={{ fill: theme.grid, opacity: 0.35 }}
              content={<ChartTip format={format} />}
            />
            <Bar
              dataKey="value"
              name={name}
              fill={color}
              radius={[6, 6, 0, 0]}
              maxBarSize={54}
              isAnimationActive={!reduced}
              animationDuration={900}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

/* ── Barras horizontales (rankings, categorías largas) ───────────────────*/
export function HBarsChart({
  data,
  name,
  format = "num",
  height,
}: Readonly<BaseProps>) {
  const theme = useChartTheme();
  const reduced = useReducedMotion();
  const { ref, visible } = useInView<HTMLDivElement>();
  const h = height ?? Math.max(200, data.length * 42 + 30);

  return (
    <div ref={ref} style={{ height: h }}>
      {visible ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 28, left: 8, bottom: 0 }}
          >
            <CartesianGrid stroke={theme.grid} strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: theme.axis, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={172}
              tick={{ fill: theme.axis, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: theme.grid, opacity: 0.35 }}
              content={<ChartTip format={format} />}
            />
            <Bar
              dataKey="value"
              name={name}
              radius={[0, 6, 6, 0]}
              maxBarSize={26}
              isAnimationActive={!reduced}
              animationDuration={900}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={theme.series[0]}
                  fillOpacity={1 - Math.min(i * 0.09, 0.55)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

/* ── Tendencia (área con degradado) ──────────────────────────────────────*/
export function AreaTrend({
  data,
  name,
  format = "num",
  height = CHART_HEIGHT,
}: Readonly<BaseProps>) {
  const theme = useChartTheme();
  const reduced = useReducedMotion();
  const { ref, visible } = useInView<HTMLDivElement>();
  const gid = useRef(`grad-${Math.round(Math.random() * 1e6)}`).current;

  return (
    <div ref={ref} style={{ height }}>
      {visible ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -6, bottom: 0 }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.series[0]} stopOpacity={0.45} />
                <stop offset="100%" stopColor={theme.series[0]} stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={theme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: theme.axis, fontSize: 12 }}
              axisLine={{ stroke: theme.grid }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.axis, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={64}
              tickFormatter={(v: number) => FORMATTERS[format](v)}
            />
            <Tooltip content={<ChartTip format={format} />} />
            <Area
              dataKey="value"
              name={name}
              stroke={theme.series[0]}
              strokeWidth={2.5}
              fill={`url(#${gid})`}
              dot={{ r: 3, fill: theme.series[0] }}
              activeDot={{ r: 5 }}
              isAnimationActive={!reduced}
              animationDuration={1100}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

/* ── Donut con total en el centro ────────────────────────────────────────*/
export function DonutChart({
  data,
  name,
  format = "num",
  height = CHART_HEIGHT,
  centerLabel,
}: Readonly<BaseProps & { centerLabel?: string }>) {
  const theme = useChartTheme();
  const reduced = useReducedMotion();
  const { ref, visible } = useInView<HTMLDivElement>();
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div ref={ref} className="relative" style={{ height }}>
      {visible ? (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<ChartTip format={format} />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={9}
                formatter={(v: string) => (
                  <span style={{ color: theme.axis, fontSize: 12 }}>{v}</span>
                )}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={2}
                strokeWidth={0}
                isAnimationActive={!reduced}
                animationDuration={1000}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={theme.series[i % theme.series.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-8 text-center">
            <p className="text-2xl font-bold" style={{ color: theme.text }}>
              {FORMATTERS[format](total)}
            </p>
            {centerLabel ? (
              <p className="text-[11px]" style={{ color: theme.axis }}>
                {centerLabel}
              </p>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

/* ── Barras dobles (dos series comparadas) ───────────────────────────────*/
export function DuoBarsChart({
  data,
  name,
  name2,
  format = "num",
  height = CHART_HEIGHT,
}: Readonly<BaseProps & { name2: string }>) {
  const theme = useChartTheme();
  const reduced = useReducedMotion();
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} style={{ height }}>
      {visible ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: theme.axis, fontSize: 12 }}
              axisLine={{ stroke: theme.grid }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.axis, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={54}
            />
            <Tooltip
              cursor={{ fill: theme.grid, opacity: 0.35 }}
              content={<ChartTip format={format} />}
            />
            <Legend
              iconType="circle"
              iconSize={9}
              formatter={(v: string) => (
                <span style={{ color: theme.axis, fontSize: 12 }}>{v}</span>
              )}
            />
            <Bar
              dataKey="value"
              name={name}
              fill={theme.series[0]}
              radius={[5, 5, 0, 0]}
              maxBarSize={34}
              isAnimationActive={!reduced}
              animationDuration={900}
            />
            <Bar
              dataKey="value2"
              name={name2}
              fill={theme.series[1]}
              radius={[5, 5, 0, 0]}
              maxBarSize={34}
              isAnimationActive={!reduced}
              animationDuration={900}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

/* ── Combinada: barras (anual) + línea (acumulado) ───────────────────────*/
export function BarsWithLine({
  data,
  name,
  name2,
  format = "num",
  height = CHART_HEIGHT,
}: Readonly<BaseProps & { name2: string }>) {
  const theme = useChartTheme();
  const reduced = useReducedMotion();
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} style={{ height }}>
      {visible ? (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: theme.axis, fontSize: 12 }}
              axisLine={{ stroke: theme.grid }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.axis, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={54}
            />
            <Tooltip
              cursor={{ fill: theme.grid, opacity: 0.35 }}
              content={<ChartTip format={format} />}
            />
            <Legend
              iconType="circle"
              iconSize={9}
              formatter={(v: string) => (
                <span style={{ color: theme.axis, fontSize: 12 }}>{v}</span>
              )}
            />
            <Bar
              dataKey="value"
              name={name}
              fill={theme.series[0]}
              radius={[6, 6, 0, 0]}
              maxBarSize={46}
              isAnimationActive={!reduced}
              animationDuration={900}
            />
            <Line
              dataKey="value2"
              name={name2}
              stroke={theme.series[1]}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: theme.series[1] }}
              activeDot={{ r: 5.5 }}
              isAnimationActive={!reduced}
              animationDuration={1200}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}
