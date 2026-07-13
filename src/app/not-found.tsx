import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

/** Página 404 con la identidad del IUCE y salidas útiles. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[60vh] items-center">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-iuce-blue-pale text-ink">
            <Compass className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-usal-red">
            Error 404
          </p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-ink">
            Esta página no existe
          </h1>
          <p className="mx-auto mb-8 max-w-[55ch] text-base leading-relaxed text-gray-600">
            Puede que el enlace haya cambiado con la nueva web del IUCE. Prueba
            desde la portada o busca en las noticias.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className={buttonClassName({ size: "lg" })}>
              Ir a la portada
            </Link>
            <Link
              href="/noticias"
              className={buttonClassName({ variant: "outline", size: "lg" })}
            >
              Ver las noticias
            </Link>
          </div>
        </div>
      </main>
      <InstitutionalFooter />
    </>
  );
}
