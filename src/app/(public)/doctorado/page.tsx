import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Doctorado" };

export default function DoctoradoPage() {
  return (
    <PagePlaceholder
      title="Doctorado"
      description="Programa de doctorado «Formación en la Sociedad del Conocimiento»: líneas y grupos de investigación y perfil de ingreso."
    />
  );
}
