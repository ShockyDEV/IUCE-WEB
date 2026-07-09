import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Instituto" };

export default function InstitutoPage() {
  return (
    <PagePlaceholder
      title="Instituto"
      description="Perfil del IUCE, equipo de dirección, miembros, ubicación, instalaciones y edificio histórico."
    />
  );
}
