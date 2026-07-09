"use client";

import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface RichTextEditorProps {
  /** HTML inicial. */
  value: string;
  /** Notifica el HTML actualizado en cada cambio. */
  onChange: (html: string) => void;
  minHeight?: number;
}

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: Readonly<{
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // conserva la selección del editor
      onClick={onClick}
      className={cn(
        "flex h-[30px] w-[30px] items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40",
        active && "bg-gray-200 text-gray-900",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1.5 h-5 w-px bg-gray-200" aria-hidden="true" />;
}

function Toolbar({ editor }: Readonly<{ editor: Editor }>) {
  function setLink() {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL del enlace:", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  }

  function addImage() {
    const url = window.prompt("URL de la imagen (súbela antes en Archivos):");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }

  const headingValue = editor.isActive("heading", { level: 2 })
    ? "h2"
    : editor.isActive("heading", { level: 3 })
      ? "h3"
      : "p";

  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-md border border-gray-300 bg-gray-50 px-2 py-1.5">
      <ToolbarButton
        label="Deshacer"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Rehacer"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>

      <Divider />

      <select
        aria-label="Estilo de párrafo"
        value={headingValue}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "p") editor.chain().focus().setParagraph().run();
          if (v === "h2")
            editor.chain().focus().setHeading({ level: 2 }).run();
          if (v === "h3")
            editor.chain().focus().setHeading({ level: 3 }).run();
        }}
        className="h-[30px] rounded border border-gray-300 bg-white px-1.5 text-[13px] text-gray-700"
      >
        <option value="p">Párrafo</option>
        <option value="h2">Título 2</option>
        <option value="h3">Título 3</option>
      </select>

      <Divider />

      <ToolbarButton
        label="Negrita"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Cursiva"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Subrayado"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Tachado"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Lista"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Lista numerada"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Cita"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Enlace"
        active={editor.isActive("link")}
        onClick={setLink}
      >
        <LinkIcon className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="Imagen" onClick={addImage}>
        <ImageIcon className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="Tabla"
        active={editor.isActive("table")}
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <TableIcon className="h-[15px] w-[15px]" aria-hidden="true" />
      </ToolbarButton>
    </div>
  );
}

/**
 * Editor de texto enriquecido (TipTap) con la toolbar del prototipo y
 * contador de caracteres y palabras. Produce/consume HTML.
 */
export function RichTextEditor({
  value,
  onChange,
  minHeight = 260,
}: Readonly<RichTextEditorProps>) {
  const editor = useEditor({
    extensions: [StarterKit, TableKit, Image],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "rte-content focus:outline-none",
        style: `min-height:${minHeight}px`,
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  if (!editor) {
    return (
      <div
        className="rounded-md border border-gray-300 bg-white"
        style={{ minHeight: minHeight + 80 }}
      />
    );
  }

  const text = editor.getText();
  const chars = text.length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div>
      <Toolbar editor={editor} />
      <div className="border border-t-0 border-gray-300 bg-white px-[18px] py-4 text-[14.5px] leading-[1.65] text-gray-700">
        <EditorContent editor={editor} />
      </div>
      <div className="flex justify-end gap-4 rounded-b-md border border-t-0 border-gray-300 bg-gray-50 px-3 py-1.5 text-[11px] text-gray-400">
        <span>
          {chars.toLocaleString("es-ES")} caracteres
        </span>
        <span>{words.toLocaleString("es-ES")} palabras</span>
      </div>
    </div>
  );
}
