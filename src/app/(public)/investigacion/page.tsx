import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Investigación" };

export default function InvestigacionPage() {
  return (
    <PagePlaceholder
      title="Investigación"
      description="Grupos de investigación, proyectos y publicaciones del IUCE en Educación Superior."
    />
  );
}
