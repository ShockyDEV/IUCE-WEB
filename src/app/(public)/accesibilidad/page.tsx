import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getBlock } from "@/lib/content-blocks-service";

export const metadata: Metadata = {
  title: "Declaración de accesibilidad",
  description:
    "Declaración de accesibilidad del sitio web del IUCE conforme al RD 1112/2018.",
};

export const dynamic = "force-dynamic";

export default async function AccesibilidadPage() {
  const contenido = await getBlock("legal", "accesibilidad");

  return (
    <section>
      <div className="mx-auto max-w-[800px] px-6 pb-16 pt-12">
        <div className="mb-5">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Accesibilidad" },
            ]}
          />
        </div>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-ink">
          Declaración de accesibilidad
        </h1>
        <div
          className="page-block text-base leading-relaxed text-gray-600 [&_a]:text-iuce-blue [&_a]:underline [&_h2]:mb-2 [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_li]:mb-1.5 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: contenido }}
        />
      </div>
    </section>
  );
}
