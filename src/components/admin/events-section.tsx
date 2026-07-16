"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { cn } from "@/lib/cn";

const inputClass =
  "h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";
const labelClass = "text-[13px] font-medium text-gray-700";

export interface EventRow {
  id: string;
  title: string;
  type: string;
  startsAt: string; // ISO
  endsAt: string | null;
  location: string | null;
  url: string | null;
  image: string | null;
  status: "UPCOMING" | "PAST" | "CANCELLED";
}

const STATUS_STYLES: Record<
  EventRow["status"],
  { label: string; cls: string }
> = {
  UPCOMING: { label: "Próximo", cls: "bg-[#DBEAFE] text-[#1D4ED8]" },
  PAST: { label: "Celebrado", cls: "bg-gray-100 text-gray-700" },
  CANCELLED: { label: "Cancelado", cls: "bg-[#FEF2F2] text-[#B42318]" },
};

interface FormState {
  id?: string;
  title: string;
  type: string;
  date: string; // yyyy-mm-dd
  location: string;
  url: string;
  image: string;
  status: EventRow["status"];
}

const EMPTY: FormState = {
  title: "",
  type: "Congreso",
  date: "",
  location: "",
  url: "",
  image: "",
  status: "UPCOMING",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(new Date(iso))
    .replace(".", "");
}

export function EventsSection({ rows }: Readonly<{ rows: EventRow[] }>) {
  const router = useRouter();
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!form) return;
    if (form.title.trim().length < 3 || !form.date) {
      toast.error("Título y fecha son obligatorios");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        type: form.type,
        startsAt: new Date(`${form.date}T09:00:00Z`).toISOString(),
        endsAt: null,
        location: form.location || null,
        url: form.url || "",
        status: form.status,
      };
      const res = await fetch(
        form.id ? `/api/admin/events/${form.id}` : "/api/admin/events",
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

  async function handleDelete(row: EventRow) {
    if (!window.confirm(`¿Eliminar el evento «${row.title}»?`)) return;
    const res = await fetch(`/api/admin/events/${row.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("No se pudo eliminar");
      return;
    }
    toast.success("Evento eliminado");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end">
        <Button variant="primary" onClick={() => setForm(EMPTY)}>
          + Nuevo evento
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900">
            Eventos ({rows.length})
          </h3>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-gray-100">
              <th scope="col" className="px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Evento
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Tipo
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Fecha
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Lugar
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
            {rows.map((row) => {
              const status = STATUS_STYLES[row.status];
              return (
                <tr key={row.id} className="border-t border-gray-100">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    {row.title}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-iuce-blue-pale px-2.5 py-0.5 text-xs font-medium text-iuce-blue-dark">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-gray-500">
                    {formatDate(row.startsAt)}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-gray-600">
                    {row.location ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        status.cls,
                      )}
                    >
                      {status.label}
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
                            title: row.title,
                            type: row.type,
                            date: row.startsAt.slice(0, 10),
                            location: row.location ?? "",
                            url: row.url ?? "",
                            image: row.image ?? "",
                            status: row.status,
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
              );
            })}
            {rows.length === 0 ? (
              <tr className="border-t border-gray-100">
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                  No hay eventos todavía.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {form ? (
        <Modal
          title={form.id ? "Editar evento" : "Nuevo evento"}
          onClose={() => setForm(null)}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="e-title" className={labelClass}>
                Título
              </label>
              <input
                id="e-title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="e-type" className={labelClass}>
                  Tipo
                </label>
                <select
                  id="e-type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={inputClass}
                >
                  <option>Congreso</option>
                  <option>Seminario</option>
                  <option>Jornada</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="e-date" className={labelClass}>
                  Fecha
                </label>
                <input
                  id="e-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="e-location" className={labelClass}>
                  Lugar
                </label>
                <input
                  id="e-location"
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="e-status" className={labelClass}>
                  Estado
                </label>
                <select
                  id="e-status"
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as EventRow["status"],
                    })
                  }
                  className={inputClass}
                >
                  <option value="UPCOMING">Próximo</option>
                  <option value="PAST">Celebrado</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="e-url" className={labelClass}>
                Web del evento (opcional)
              </label>
              <input
                id="e-url"
                type="url"
                placeholder="https://…"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="e-image" className={labelClass}>
                Imagen (URL)
              </label>
              <input
                id="e-image"
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="súbela en Archivos y pega aquí la URL"
                className={inputClass}
              />
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
