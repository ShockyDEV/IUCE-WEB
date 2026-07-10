"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const inputClass =
  "h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";

export interface IntranetUserRow {
  id: string;
  email: string;
  name: string | null;
  active: boolean;
  lastLogin: string | null; // ISO
  createdAt: string; // ISO
}

function formatDate(iso: string | null) {
  if (!iso) return "Nunca";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/**
 * Gestión de acceso al área de miembros. Los miembros del IUCE (ficha con correo
 * en Miembros) entran automáticamente y aparecen aquí tras su primer
 * acceso; esta lista sirve para autorizar correos adicionales o para
 * bloquear a alguien (desactivar invalida sus enlaces pendientes).
 */
export function IntranetUsersSection({
  rows,
}: Readonly<{ rows: IntranetUserRow[] }>) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/intranet/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || null }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo añadir");
      toast.success(`Autorizado: ${email}`);
      setEmail("");
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo añadir");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(row: IntranetUserRow) {
    const res = await fetch(`/api/admin/intranet/users/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !row.active }),
    });
    if (!res.ok) {
      toast.error("No se pudo actualizar");
      return;
    }
    toast.success(
      row.active
        ? `Acceso desactivado para ${row.email}`
        : `Acceso reactivado para ${row.email}`,
    );
    router.refresh();
  }

  async function handleDelete(row: IntranetUserRow) {
    if (!window.confirm(`¿Quitar de la lista a ${row.email}?`)) return;
    const res = await fetch(`/api/admin/intranet/users/${row.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("No se pudo eliminar");
      return;
    }
    toast.success("Eliminado de la lista");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="rounded-md border border-iuce-blue/25 bg-iuce-blue-pale px-4 py-3 text-[13px] leading-relaxed text-ink">
        <strong>Los miembros del IUCE entran automáticamente</strong> con el
        correo de su ficha (sección Miembros): no hace falta darlos de alta
        aquí, y aparecerán en la lista tras su primer acceso. Usa este panel
        para autorizar correos de personas que no son miembros o para{" "}
        <strong>bloquear</strong> a alguien (desactivar gana siempre, también
        para miembros).
      </p>
      {/* Alta */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end"
      >
        <div className="flex flex-1 flex-col gap-2">
          <label
            htmlFor="iu-email"
            className="text-[13px] font-medium text-gray-700"
          >
            Correo a autorizar
          </label>
          <input
            id="iu-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="persona@usal.es"
            className={inputClass}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label
            htmlFor="iu-name"
            className="text-[13px] font-medium text-gray-700"
          >
            Nombre (opcional)
          </label>
          <input
            id="iu-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <Button type="submit" variant="primary" disabled={saving} className="gap-1.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          {saving ? "Añadiendo…" : "Autorizar"}
        </Button>
      </form>

      {/* Tabla */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-baseline justify-between p-6">
          <h3 className="text-base font-semibold text-gray-900">
            Usuarios autorizados ({rows.length})
          </h3>
          <p className="text-xs text-gray-400">
            Lista blanca manual + miembros que ya han accedido
          </p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-gray-100">
              <th scope="col" className="px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Correo
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Último acceso
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Estado
              </th>
              <th scope="col" className="w-[190px] px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  {row.email}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-600">
                  {row.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-500">
                  {formatDate(row.lastLogin)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                      row.active
                        ? "bg-[#DCFCE7] text-[#15803D]"
                        : "bg-gray-100 text-gray-700",
                    )}
                  >
                    {row.active ? "Activo" : "Desactivado"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleActive(row)}
                      className="text-xs font-medium text-iuce-blue hover:underline"
                    >
                      {row.active ? "Desactivar" : "Reactivar"}
                    </button>
                    <button
                      type="button"
                      aria-label={`Eliminar a ${row.email}`}
                      onClick={() => handleDelete(row)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr className="border-t border-gray-100">
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  Nadie autorizado todavía. Añade el primer correo arriba.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
