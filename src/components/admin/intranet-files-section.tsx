"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, FileLock2, Pencil, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/modal";
import { cn } from "@/lib/cn";

const inputClass =
  "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";

export interface IntranetDocRow {
  id: string;
  title: string;
  description: string | null;
  filename: string;
  size: number;
  createdAt: string; // ISO
}

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Documentos del área de miembros (intranet): se guardan fuera de public/ y solo se
 * descargan con sesión. Subida por arrastre + título/descripción editables.
 */
export function IntranetFilesSection({
  rows,
}: Readonly<{ rows: IntranetDocRow[] }>) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [editing, setEditing] = useState<IntranetDocRow | null>(null);
  const [saving, setSaving] = useState(false);

  async function upload(files: FileList | File[]) {
    const list = Array.from(files);
    if (!list.length) return;
    setUploading(true);
    try {
      for (const file of list) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/intranet/files", {
          method: "POST",
          body: form,
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(json.error ?? `No se pudo subir ${file.name}`);
        }
      }
      toast.success(
        list.length === 1
          ? "Documento subido"
          : `${list.length} documentos subidos`,
      );
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  }

  async function handleSaveEdit() {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/intranet/files/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editing.title,
          description: editing.description,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo guardar");
      toast.success("Guardado");
      setEditing(null);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(row: IntranetDocRow) {
    if (!window.confirm(`¿Eliminar «${row.title}»?`)) return;
    const res = await fetch(`/api/admin/intranet/files/${row.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("No se pudo eliminar");
      return;
    }
    toast.success("Documento eliminado");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Aviso + dropzone */}
      <div className="flex items-start gap-2.5 rounded-md border border-gray-200 border-l-[3px] border-l-usal-red bg-white px-4 py-3">
        <FileLock2
          className="mt-0.5 h-4 w-4 flex-none text-usal-red"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-gray-600">
          Estos documentos <strong>no son públicos</strong>: se almacenan
          fuera de la web y solo pueden descargarlos las personas autorizadas
          en el área de miembros (o administradores).
        </p>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          upload(e.dataTransfer.files);
        }}
        disabled={uploading}
        className={cn(
          "flex flex-col items-center gap-2.5 rounded-xl border-2 border-dashed bg-white p-9 text-center transition-colors",
          dragOver ? "border-iuce-blue bg-iuce-blue-pale" : "border-gray-300",
          uploading && "opacity-60",
        )}
      >
        <Upload className="h-[26px] w-[26px] text-gray-500" aria-hidden="true" />
        <p className="text-sm font-medium text-gray-700">
          {uploading
            ? "Subiendo…"
            : "Arrastra documentos aquí o haz clic para subir"}
        </p>
        <p className="text-xs text-gray-500">
          Cualquier tipo de archivo · máx. 50 MB por documento
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) upload(e.target.files);
            e.target.value = "";
          }}
        />
      </button>

      {/* Tabla */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900">
            Documentos internos ({rows.length})
          </h3>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-gray-100">
              <th scope="col" className="px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Título
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Archivo
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Tamaño
              </th>
              <th scope="col" className="px-4 py-3 text-left text-[13px] font-medium text-gray-500">
                Subido
              </th>
              <th scope="col" className="w-[140px] px-6 py-3 text-left text-[13px] font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="px-6 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {row.title}
                  </p>
                  {row.description ? (
                    <p className="mt-0.5 text-xs text-gray-500">
                      {row.description}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-500">
                  {row.filename}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-500">
                  {formatSize(row.size)}
                </td>
                <td className="px-4 py-3 text-[13px] text-gray-500">
                  {new Intl.DateTimeFormat("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(row.createdAt))}
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-1">
                    <a
                      href={`/api/intranet/files/${row.id}`}
                      aria-label="Descargar"
                      title="Descargar"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      aria-label="Editar"
                      onClick={() => setEditing(row)}
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
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                  No hay documentos todavía. Sube el primero arriba.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {editing ? (
        <Modal title="Editar documento" onClose={() => setEditing(null)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="doc-title"
                className="text-[13px] font-medium text-gray-700"
              >
                Título
              </label>
              <input
                id="doc-title"
                type="text"
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="doc-desc"
                className="text-[13px] font-medium text-gray-700"
              >
                Descripción (opcional)
              </label>
              <textarea
                id="doc-desc"
                rows={3}
                value={editing.description ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
                className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25"
              />
            </div>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <Button variant="primary" onClick={handleSaveEdit} disabled={saving}>
                {saving ? "Guardando…" : "Guardar"}
              </Button>
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
