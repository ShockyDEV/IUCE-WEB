import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Noticias" };

export default function NoticiasPage() {
  return (
    <PagePlaceholder
      title="Noticias"
      description="Actualidad del IUCE: congresos, formación, innovación docente, premios y doctorado."
    />
  );
}
