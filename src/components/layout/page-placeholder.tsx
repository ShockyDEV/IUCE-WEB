import Link from "next/link";
import { Construction } from "lucide-react";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

/**
 * Marcador temporal para las páginas públicas aún no implementadas. Mantiene la
 * navegación funcional mientras recreamos cada pantalla del handoff
 * (docs/design). Se irá sustituyendo página a página.
 */
export function PagePlaceholder({
  title,
  description,
}: Readonly<PagePlaceholderProps>) {
  return (
    <section className="bg-surface-card">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <nav aria-label="Migas de pan" className="mb-6 text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Inicio
          </Link>
          <span className="mx-1.5 text-gray-300">/</span>
          <span className="text-gray-700">{title}</span>
        </nav>

        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-usal-red">
            Instituto Universitario de Ciencias de la Educación
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink">
            {title}
          </h1>
          <p className="text-base leading-relaxed text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-10 flex items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-surface-page p-5 text-sm text-gray-500">
          <Construction
            className="h-5 w-5 flex-none text-usal-red"
            aria-hidden="true"
          />
          <span>
            Esta página está en construcción. La recrearemos a partir del
            prototipo de diseño en las próximas iteraciones.
          </span>
        </div>
      </div>
    </section>
  );
}
