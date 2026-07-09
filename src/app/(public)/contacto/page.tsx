import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <PagePlaceholder
      title="Contacto"
      description="Datos de contacto del IUCE, ubicación y formulario para escribirnos. Recuerda que las reservas de espacios se gestionan en reservas.iuce.usal.es."
    />
  );
}
