"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { InitialsAvatar } from "@/components/ui/initials-avatar";

export interface PublicMember {
  name: string;
  area: string;
  photo: string | null;
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

/**
 * Rejilla pública de miembros del IUCE: buscador + tarjetas compactas con
 * foto (o iniciales si no hay). Los datos salen del gestor.
 */
export function MembersGrid({
  members,
}: Readonly<{ members: PublicMember[] }>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) || m.area.toLowerCase().includes(q),
    );
  }, [members, query]);

  return (
    <div>
      <div className="mb-6 flex h-11 w-full max-w-[360px] items-center gap-2.5 rounded-md border border-gray-300 bg-surface-card px-3.5">
        <Search
          className="h-4 w-4 flex-none text-gray-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o área…"
          aria-label="Buscar miembros por nombre o área"
          className="min-w-0 flex-1 border-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>

      <p className="mb-4 text-xs text-gray-400" aria-live="polite">
        {filtered.length === members.length
          ? `${members.length} miembros`
          : `${filtered.length} de ${members.length} miembros`}
      </p>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-3.5 rounded-xl border border-gray-200 bg-surface-card px-[18px] py-4 shadow-sm"
          >
            {m.photo ? (
              <Image
                src={m.photo}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 flex-none rounded-full object-cover"
              />
            ) : (
              <InitialsAvatar initials={initialsOf(m.name)} />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {m.name}
              </p>
              <p className="mt-px truncate text-xs text-gray-500">{m.area}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 ? (
          <p className="col-span-full py-8 text-center text-sm text-gray-400">
            Sin resultados para «{query}».
          </p>
        ) : null}
      </div>
    </div>
  );
}
