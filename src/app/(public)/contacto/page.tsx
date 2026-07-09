import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con la Secretaría del IUCE: formación, investigación, doctorado y uso de espacios. Paseo de Canalejas 169, Salamanca.",
};

const datos = [
  {
    icon: MapPin,
    title: "Dirección",
    lines: [
      "Paseo de Canalejas, 169 · Edificio Solís, 1.ª planta",
      "37008 Salamanca",
    ],
  },
  {
    icon: Phone,
    title: "Teléfono",
    lines: [
      "+34 923 294 634 (Secretaría)",
      "+34 923 294 500, ext. 4634 (centralita USAL)",
    ],
  },
];

export default function ContactoPage() {
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
            Habla con el IUCE
          </h1>
          <p className="max-w-[70ch] text-base leading-relaxed text-gray-600">
            La Secretaría del Instituto atiende consultas sobre formación,
            investigación, doctorado y uso de espacios.
          </p>
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
                    <p className="mt-0.5 text-sm leading-normal text-gray-600">
                      {d.lines.map((line, i) => (
                        <span key={line}>
                          {i > 0 ? <br /> : null}
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="flex items-start gap-3.5">
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Correo electrónico
                </p>
                <p className="mt-0.5 text-sm text-gray-600">
                  <a
                    href="mailto:iuce@usal.es"
                    className="text-iuce-blue hover:underline"
                  >
                    iuce@usal.es
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                <Clock className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Horario de Secretaría
                </p>
                <p className="mt-0.5 text-sm leading-normal text-gray-600">
                  Lunes a viernes, 9:00–14:00
                </p>
              </div>
            </div>

            <ImagePlaceholder
              icon={MapPin}
              label="Mapa — Edificio Solís, Paseo de Canalejas 169"
              className="h-[240px] w-full"
            />

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
