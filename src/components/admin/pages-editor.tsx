"use client";

import { useMemo, useState } from "react";
import { Languages } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ListBlockEditor } from "@/components/admin/list-block-editor";
import { PAGE_BLOCKS } from "@/lib/content/page-blocks";
import { LIST_BLOCKS, type ListItem } from "@/lib/content/list-blocks";

const inputClass =
  "h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";

interface BlockEditorProps {
  pageSlug: string;
  blockKey: string;
  title: string;
  initialContent: string;
}

function BlockEditor({
  pageSlug,
  blockKey,
  title,
  initialContent,
}: Readonly<BlockEditorProps>) {
  const [content, setContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const dirty = content !== savedContent;

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content-blocks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageSlug, blockKey, content }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo guardar");
      setSavedContent(content);
      toast.success("Guardado y traducido automáticamente (EN)");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
          {dirty ? (
            <span
              title="Cambios sin guardar"
              className="inline-block h-2 w-2 rounded-full bg-[#FBBF24]"
            />
          ) : null}
        </div>
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <Languages className="h-3 w-3" aria-hidden="true" />
            Auto EN
          </span>
          <Button
            variant={dirty ? "primary" : "outline"}
            size="sm"
            onClick={handleSave}
            disabled={saving || !dirty}
          >
            {saving ? "Guardando…" : "Guardar"}
          </Button>
        </div>
      </div>
      <div className="px-6 pb-6">
        <RichTextEditor value={content} onChange={setContent} minHeight={130} />
      </div>
    </div>
  );
}

interface PagesEditorProps {
  /** Contenido guardado en BD: clave "pageSlug:blockKey" → HTML. */
  saved: Record<string, string>;
}

export function PagesEditor({ saved }: Readonly<PagesEditorProps>) {
  const [pageSlug, setPageSlug] = useState(PAGE_BLOCKS[0].pageSlug);
  const page = useMemo(
    () => PAGE_BLOCKS.find((p) => p.pageSlug === pageSlug) ?? PAGE_BLOCKS[0],
    [pageSlug],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
        <label
          htmlFor="page-select"
          className="flex-none text-[13px] font-medium text-gray-700"
        >
          Página
        </label>
        <select
          id="page-select"
          value={pageSlug}
          onChange={(e) => setPageSlug(e.target.value)}
          className={inputClass + " min-w-[280px]"}
        >
          {PAGE_BLOCKS.map((p) => (
            <option key={p.pageSlug} value={p.pageSlug}>
              {p.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500">
          Cada página se compone de bloques de texto. Los cambios se guardan
          por bloque y se traducen automáticamente al inglés.
        </p>
      </div>

      {page.blocks.map((b) => (
        <BlockEditor
          // Remonta el editor al cambiar de página o de contenido guardado
          key={`${page.pageSlug}:${b.blockKey}`}
          pageSlug={page.pageSlug}
          blockKey={b.blockKey}
          title={b.title}
          initialContent={
            saved[`${page.pageSlug}:${b.blockKey}`] ?? b.defaultContent
          }
        />
      ))}

      {/* Listas estructuradas de la página (iconos, tarjetas, filas…) */}
      {LIST_BLOCKS.filter((l) => l.pageSlug === pageSlug).map((def) => {
        const raw = saved[`${def.pageSlug}:${def.blockKey}`];
        let initial = def.defaultItems;
        if (raw) {
          try {
            const parsed: unknown = JSON.parse(raw);
            if (Array.isArray(parsed)) initial = parsed as ListItem[];
          } catch {
            // JSON corrupto: se parte de los valores por defecto
          }
        }
        return (
          <ListBlockEditor
            key={`${def.pageSlug}:${def.blockKey}`}
            def={def}
            initialItems={initial}
          />
        );
      })}
    </div>
  );
}
