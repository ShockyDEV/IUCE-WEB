import { cn } from "@/lib/cn";
import { getLocale } from "@/lib/locale-server";

export interface SubnavItem {
  id: string;
  label: string;
}

interface SectionSubnavProps {
  items: SubnavItem[];
  /** Ancla activa por defecto (la primera si no se indica). */
  activeId?: string;
}

/**
 * Subnavegación de anclas dentro de una página larga (patrón de las cabeceras
 * de Instituto e Investigación). El ítem activo lleva subrayado rojo. Los
 * enlaces saltan a cada sección; las secciones destino usan `scroll-mt` para
 * dejar hueco a la cabecera fija.
 */
export function SectionSubnav({
  items,
  activeId,
}: Readonly<SectionSubnavProps>) {
  const active = activeId ?? items[0]?.id;
  return (
    <nav
      aria-label={
        getLocale() === "en" ? "Sections on this page" : "Secciones de esta página"
      }
      className="flex gap-6 overflow-x-auto text-sm font-medium"
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "whitespace-nowrap border-b-2 py-2.5 transition-colors",
              isActive
                ? "border-usal-red text-ink"
                : "border-transparent text-gray-600 hover:text-gray-900",
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
