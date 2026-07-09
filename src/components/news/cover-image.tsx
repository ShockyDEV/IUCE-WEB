import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/cn";

interface CoverImageProps {
  /** Ruta de la portada (p. ej. /uploads/legacy/foto.jpg) o null. */
  src?: string | null;
  alt: string;
  className?: string;
  rounded?: "none" | "xl";
  /** Atributo sizes de next/image para el responsive. */
  sizes?: string;
  /** Zoom suave al pasar el ratón (requiere `group` en la tarjeta padre). */
  zoom?: boolean;
}

/**
 * Portada de noticia: imagen real si existe, hueco ImagePlaceholder si no
 * (45 noticias históricas no traían imagen).
 */
export function CoverImage({
  src,
  alt,
  className,
  rounded = "none",
  sizes = "(max-width: 1024px) 100vw, 33vw",
  zoom = false,
}: Readonly<CoverImageProps>) {
  if (!src) {
    return (
      <ImagePlaceholder
        label={alt}
        rounded={rounded === "xl" ? "lg" : "none"}
        className={cn("border-0", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-100",
        rounded === "xl" && "rounded-xl",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover",
          zoom &&
            "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.05]",
        )}
      />
    </div>
  );
}
