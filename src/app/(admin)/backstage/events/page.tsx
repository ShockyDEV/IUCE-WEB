import { prisma } from "@/lib/prisma";
import {
  EventsSection,
  type EventRow,
} from "@/components/admin/events-section";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: "desc" },
  });

  const rows: EventRow[] = events.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    startsAt: e.startsAt.toISOString(),
    endsAt: e.endsAt?.toISOString() ?? null,
    location: e.location,
    url: e.url,
    image: e.image,
    status: e.status,
  }));

  return <EventsSection rows={rows} />;
}
