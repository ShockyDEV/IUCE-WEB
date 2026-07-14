import Image from "next/image";
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
 * Distintivo del grupo de investigación de un miembro: logo (o acrónimo) en
 * una pastilla que enlaza a la sección de grupos. El `title` muestra el
 * nombre completo del grupo al pasar el ratón.
 */
export function GroupBadge({
  group,
  className,
}: Readonly<{ group: MemberGroup; className?: string }>) {
  return (
    <Link
      href="/investigacion#grupos"
      title={group.name}
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-[3px] transition-colors hover:border-brand-400",
        className,
      )}
    >
      {group.logo ? (
        <Image
          src={group.logo}
          alt=""
          width={56}
          height={20}
          className="h-3.5 w-auto max-w-[70px] flex-none object-contain"
        />
      ) : null}
      <span className="truncate text-[11px] font-semibold text-gray-600">
        {group.acronym}
      </span>
    </Link>
  );
}
