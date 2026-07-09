"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { cn } from "@/lib/cn";

const inputClass =
  "h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";
const labelClass = "text-[13px] font-medium text-gray-700";

export interface MemberRow {
  id: string;
  name: string;
  area: string | null;
  email: string | null;
  role: string | null;
  active: boolean;
  order: number;
  groupId: string | null;
  groupAcronym: string | null;
}

export interface GroupOption {
  id: string;
  acronym: string;
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

interface FormState {
  id?: string;
  name: string;
  area: string;
  email: string;
  role: string;
  order: number;
  groupId: string;
  active: boolean;
}

const EMPTY: FormState = {
  name: "",
  area: "",
  email: "",
  role: "",
  order: 0,
  groupId: "",
  active: true,
};

export function MembersSection({
  rows,
  groups,
}: Readonly<{ rows: MemberRow[]; groups: GroupOption[] }>) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.area ?? "").toLowerCase().includes(q),
    );
  }, [rows, query]);

  async function handleSave() {
    if (!form) return;
    if (form.name.trim().length < 2) {
      toast.error("El nombre es obligatorio");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        area: form.area || null,
        email: form.email || null,
        role: form.role || null,
        order: form.order,
        groupId: form.groupId || null,
        active: form.active,
      };
      const res = await fetch(
        form.id ? `/api/admin/members/${form.id}` : "/api/admin/members",
        {
          method: form.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo guardar");
      toast.success("Guardado");
      setForm(null);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(row: MemberRow) {
    if (!window.confirm(`¿Eliminar a «${row.name}»?`)) return;
    const res = await fetch(`/api/admin/members/${row.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("No se pudo eliminar");
      return;
    }
    toast.success("Miembro eliminado");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-10 w-[300px] items-center gap-2 rounded-md border border-gray-300 bg-white px-3">
          <Search className="h-[15px] w-[15px] text-gray-400" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o área…"
            className="min-w-0 flex-1 border-none bg-transparent text-sm text-gray-900 outline-none"
          />
        </div>
        <Button variant="primary" onClick={() => setForm(EMPTY)}>
          + Nuevo miembro
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900">
            Equipo y miembros ({filtered.length})
          </h3>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-gray-100">
              <th scope="col" className="px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Cargo / Área
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Email
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Estado
              </th>
              <th scope="col" className="w-[110px] px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-iuce-blue-pale text-xs font-bold text-iuce-blue-dark"
                    >
                      {initialsOf(row.name)}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-600">
                  {[row.role, row.area].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-500">
                  {row.email ?? "—"}
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
                    {row.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label="Editar"
                      onClick={() =>
                        setForm({
                          id: row.id,
                          name: row.name,
                          area: row.area ?? "",
                          email: row.email ?? "",
                          role: row.role ?? "",
                          order: row.order,
                          groupId: row.groupId ?? "",
                          active: row.active,
                        })
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Eliminar"
                      onClick={() => handleDelete(row)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr className="border-t border-gray-100">
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  Sin resultados.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {form ? (
        <Modal
          title={form.id ? "Editar miembro" : "Nuevo miembro"}
          onClose={() => setForm(null)}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="m-name" className={labelClass}>
                Nombre y apellidos
              </label>
              <input
                id="m-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="m-role" className={labelClass}>
                  Cargo (opcional)
                </label>
                <input
                  id="m-role"
                  type="text"
                  value={form.role}
                  placeholder="Directora, Subdirector…"
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="m-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="m-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="m-area" className={labelClass}>
                Área
              </label>
              <input
                id="m-area"
                type="text"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="m-group" className={labelClass}>
                  Grupo de investigación
                </label>
                <select
                  id="m-group"
                  value={form.groupId}
                  onChange={(e) => setForm({ ...form, groupId: e.target.value })}
                  className={inputClass}
                >
                  <option value="">— Sin grupo —</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.acronym}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="m-order" className={labelClass}>
                  Orden
                </label>
                <input
                  id="m-order"
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: Number(e.target.value) })
                  }
                  className={inputClass}
                />
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="h-4 w-4 accent-iuce-blue-dark"
              />
              Miembro activo (visible en la web)
            </label>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? "Guardando…" : "Guardar"}
              </Button>
              <Button variant="ghost" onClick={() => setForm(null)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
