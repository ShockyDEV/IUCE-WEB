import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface ImagePlaceholderProps {
  /** Texto descriptivo de la foto que irá aquí en producción. */
  label?: string;
  className?: string;
  /** Redondeo de esquinas. Por defecto `lg` (12px, como las tarjetas). */
  rounded?: "none" | "md" | "lg";
}

const roundedMap = {
  none: "rounded-none",
  md: "rounded-md",
  lg: "rounded-xl",
} as const;

/**
 * Hueco de imagen. Recrea el `<image-slot>` de los prototipos: reserva el
 * espacio con una foto real pendiente de aportar por el IUCE. En producción
 * se sustituirá por `next/image` con la imagen subida desde el gestor.
 */
export function ImagePlaceholder({
  label,
  className,
  rounded = "lg",
}: Readonly<ImagePlaceholderProps>) {
  return (
    <div
      role="img"
      aria-label={label ?? "Imagen pendiente"}
      className={cn(
        "flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 bg-gray-100 p-4 text-center",
        roundedMap[rounded],
        className,
      )}
    >
      <ImageIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
      {label ? (
        <span className="max-w-[80%] text-xs leading-snug text-gray-500">
          {label}
        </span>
      ) : null}
    </div>
  );
}
