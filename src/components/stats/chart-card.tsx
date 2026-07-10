import { Reveal } from "@/components/ui/reveal";

/**
 * Tarjeta contenedora de una gráfica: título, lectura rápida (qué contar)
 * y el lienzo. El Reveal anima la tarjeta; la gráfica se anima sola al
 * entrar en pantalla (useInView de stat-charts).
 */
export function ChartCard({
  title,
  insight,
  children,
  wide = false,
  delay = 0,
}: Readonly<{
  title: string;
  insight?: string;
  children: React.ReactNode;
  wide?: boolean;
  delay?: number;
}>) {
  return (
    <Reveal
      delay={delay}
      className={wide ? "lg:col-span-2" : undefined}
    >
      <article className="card-lift h-full rounded-xl border border-gray-200 bg-surface-card p-6 shadow-sm hover:shadow-md">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {insight ? (
          <p className="mb-4 mt-0.5 text-[13px] leading-snug text-gray-500">
            {insight}
          </p>
        ) : (
          <div className="mb-4" />
        )}
        {children}
      </article>
    </Reveal>
  );
}
