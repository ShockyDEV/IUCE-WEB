"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";

const inputClass =
  "h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";
const labelClass = "text-[13px] font-medium text-gray-700";

export interface GroupRow {
  id: string;
  acronym: string;
  name: string;
  lead: string | null;
  url: string | null;
  logo: string | null;
  chip: string | null;
  memberCount: number;
}

interface FormState {
  id?: string;
  acronym: string;
  name: string;
  lead: string;
  url: string;
  logo: string;
  chip: string;
}

const EMPTY: FormState = {
  acronym: "",
  name: "",
  lead: "",
  url: "",
  logo: "",
  chip: "",
};

export function GroupsSection({ rows }: Readonly<{ rows: GroupRow[] }>) {
  const router = useRouter();
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!form) return;
    if (!form.acronym.trim() || form.name.trim().length < 2) {
      toast.error("Acrónimo y nombre son obligatorios");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        acronym: form.acronym,
        name: form.name,
        lead: form.lead || null,
        url: form.url || "",
        logo: form.logo || null,
        chip: form.chip || null,
      };
      const res = await fetch(
        form.id ? `/api/admin/groups/${form.id}` : "/api/admin/groups",
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

  async function handleDelete(row: GroupRow) {
    if (
      !window.confirm(
        `¿Eliminar el grupo «${row.acronym}»? Sus miembros quedarán sin grupo.`,
      )
    )
      return;
    const res = await fetch(`/api/admin/groups/${row.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("No se pudo eliminar");
      return;
    }
    toast.success("Grupo eliminado");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end">
        <Button variant="primary" onClick={() => setForm(EMPTY)}>
          + Nuevo grupo
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900">
            Grupos de investigación ({rows.length})
          </h3>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-gray-100">
              <th scope="col" className="px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Acrónimo
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Responsable
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Miembros
              </th>
              <th scope="col" className="w-[110px] px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="px-6 py-3 text-sm font-bold text-iuce-blue-dark">
                  {row.acronym}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-600">
                  {row.name}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-600">
                  {row.lead ?? "—"}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-500">
                  {row.memberCount}
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label="Editar"
                      onClick={() =>
                        setForm({
                          id: row.id,
                          acronym: row.acronym,
                          name: row.name,
                          lead: row.lead ?? "",
                          url: row.url ?? "",
                          logo: row.logo ?? "",
                          chip: row.chip ?? "",
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
            {rows.length === 0 ? (
              <tr className="border-t border-gray-100">
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  No hay grupos todavía.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {form ? (
        <Modal
          title={form.id ? "Editar grupo" : "Nuevo grupo"}
          onClose={() => setForm(null)}
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="g-acronym" className={labelClass}>
                  Acrónimo
                </label>
                <input
                  id="g-acronym"
                  type="text"
                  value={form.acronym}
                  onChange={(e) => setForm({ ...form, acronym: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="g-lead" className={labelClass}>
                  Responsable
                </label>
                <input
                  id="g-lead"
                  type="text"
                  value={form.lead}
                  onChange={(e) => setForm({ ...form, lead: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="g-name" className={labelClass}>
                Nombre / descripción
              </label>
              <textarea
                id="g-name"
                rows={3}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="g-url" className={labelClass}>
                Web (opcional)
              </label>
              <input
                id="g-url"
                type="url"
                placeholder="https://…"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="g-logo" className={labelClass}>
                  Logo (URL — súbelo antes en Archivos)
                </label>
                <input
                  id="g-logo"
                  type="text"
                  placeholder="/uploads/… o /images/groups/…"
                  value={form.logo}
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="g-chip" className={labelClass}>
                  Distintivo (p. ej. UIC 081)
                </label>
                <input
                  id="g-chip"
                  type="text"
                  value={form.chip}
                  onChange={(e) => setForm({ ...form, chip: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
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
