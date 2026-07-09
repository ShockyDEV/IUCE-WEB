import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Eventos" };

export default function EventosPage() {
  return (
    <PagePlaceholder
      title="Eventos"
      description="Congresos, seminarios y jornadas del IUCE: próximas convocatorias y actividades celebradas."
    />
  );
}
