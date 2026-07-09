import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Formación" };

export default function FormacionPage() {
  return (
    <PagePlaceholder
      title="Formación"
      description="Plan de Formación Docente del profesorado, actividades formativas y Formación Docente Inicial (FDI)."
    />
  );
}
