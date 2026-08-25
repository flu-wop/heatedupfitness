import { createEvent, type EventAttributes } from "ics";

export function generateBookingIcs(opts: {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  mode: string;
}): string | null {
  const [year, month, day] = opts.date.split("-").map(Number);
  const [hour, minute] = opts.time.split(":").map(Number);

  const event: EventAttributes = {
    start: [year, month, day, hour, minute],
    duration: { hours: 1 },
    title: `HeatedUpFitness Consult — ${opts.name}`,
    description: `Consult (${opts.mode}) with Mikia Gumms, HeatedUpFitness.`,
    status: "CONFIRMED",
    organizer: { name: "HeatedUpFitness", email: process.env.RESEND_TO_EMAIL || "mikiagbusiness@gmail.com" },
  };

  const { error, value } = createEvent(event);
  if (error || !value) return null;
  return value;
}
