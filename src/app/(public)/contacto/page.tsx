import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { MapEmbed } from "@/components/ui/map-embed";
import { ContactForm } from "@/components/contact/contact-form";
import { getBlock } from "@/lib/content-blocks-service";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con la Secretaría del IUCE: formación, investigación, doctorado y uso de espacios. Paseo de Canalejas 169, Salamanca.",
};

export const dynamic = "force-dynamic";

export default async function ContactoPage() {
  // Todos los textos de datos salen del gestor (Contenido → Páginas → Contacto).
  const [intro, direccion, telefonos, horario] = await Promise.all([
    getBlock("contacto", "intro"),
    getBlock("contacto", "direccion"),
    getBlock("contacto", "telefonos"),
    getBlock("contacto", "horario"),
  ]);

  const datos = [
    { icon: MapPin, title: "Dirección", html: direccion },
    { icon: Phone, title: "Teléfono", html: telefonos },
    {
      icon: Mail,
      title: "Correo electrónico",
      html: `<p><a href="mailto:iuce@usal.es">iuce@usal.es</a></p>`,
    },
    { icon: Clock, title: "Horario de Secretaría", html: horario },
  ];

  return (
    <>
      {/* Cabecera */}
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
            />
          </div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
            Contacto
          </p>
          <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
            Contacta con el IUCE
          </h1>
          <div
            className="page-block max-w-[70ch] text-base leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        </div>
      </section>

      {/* Datos y formulario */}
      <section>
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 pb-16 pt-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            {datos.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="flex items-start gap-3.5">
                  <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {d.title}
                    </p>
                    <div
                      className="page-block mt-0.5 text-sm leading-normal text-gray-600"
                      dangerouslySetInnerHTML={{ __html: d.html }}
                    />
                  </div>
                </div>
              );
            })}

            <MapEmbed className="h-[280px]" />

            <div className="rounded-md border border-gray-200 border-l-[3px] border-l-usal-red bg-surface-card px-[18px] py-3.5">
              <p className="text-sm leading-relaxed text-gray-600">
                ¿Necesitas un aula o una sala? Usa el sistema de{" "}
                <a
                  href="https://reservas.iuce.usal.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-iuce-blue hover:underline"
                >
                  reserva de espacios ↗
                </a>
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
