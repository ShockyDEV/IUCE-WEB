import { prisma } from "@/lib/prisma";

/** Escapa comas, puntos y coma y saltos de línea según RFC 5545. */
function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function icsDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

/**
 * «Añadir a mi calendario»: archivo iCalendar del evento (público — los
 * eventos ya son visibles en la web). Si no hay hora de fin, se asume un
 * evento de día completo desde la fecha de inicio.
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event || event.status === "CANCELLED") {
    return new Response("Evento no encontrado", { status: 404 });
  }

  const end =
    event.endsAt ?? new Date(event.startsAt.getTime() + 8 * 60 * 60 * 1000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//IUCE - Universidad de Salamanca//Eventos//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@iuce.usal.es`,
    `DTSTAMP:${icsDate(new Date(event.startsAt))}`,
    `DTSTART:${icsDate(event.startsAt)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${esc(event.title)}`,
    ...(event.location ? [`LOCATION:${esc(event.location)}`] : []),
    ...(event.url ? [`URL:${event.url}`] : []),
    `DESCRIPTION:${esc(`${event.type} del IUCE — Universidad de Salamanca${event.url ? `. Más información: ${event.url}` : ""}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="evento-iuce.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
