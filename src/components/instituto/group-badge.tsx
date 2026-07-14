import Link from "next/link";
import { cn } from "@/lib/cn";

/** Grupo de investigación al que pertenece un miembro (para el badge). */
export interface MemberGroup {
  acronym: string;
  name: string;
  logo: string | null;
  url: string | null;
}

/**
 * Distintivo del grupo de investigación de un miembro: logo dentro de una
 * cajita blanca (para que cualquier logo —cuadrado como GRIAL o alargado como
 * DIDEROT— se vea a un tamaño legible) + acrónimo, enlazando a la sección de
 * grupos. El `title` muestra el nombre completo del grupo.
 */
export function GroupBadge({
  group,
  className,
}: Readonly<{ group: MemberGroup; className?: string }>) {
  return (
    <Link
      href="/investigacion#grupos"
      title={`Grupo de investigación ${group.name}`}
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1 transition-colors hover:border-brand-400 hover:shadow-sm",
        className,
      )}
    >
      {group.logo ? (
        // Alto fijo y ancho automático: cada logo se ve a tamaño legible sea
        // cuadrado (GRIAL) o alargado (DIDEROT), sin deformarse.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={group.logo}
          alt=""
          className="h-6 w-auto max-w-[88px] flex-none object-contain"
        />
      ) : null}
      <span className="truncate text-xs font-semibold text-gray-700">
        {group.acronym}
      </span>
    </Link>
  );
}
