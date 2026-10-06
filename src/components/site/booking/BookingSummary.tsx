import type { BookingPayload } from "@/lib/booking";
import { formatDate, formatTime } from "@/lib/booking";

export function BookingSummary({ booking }: { booking: BookingPayload }) {
  const rows = [
    ["Patient Name", booking.fullName],
    ["Service", booking.service],
    ["Dentist", booking.dentist],
    ["Appointment Date", formatDate(booking.appointmentDate)],
    ["Appointment Time", booking.appointmentTime ? formatTime(booking.appointmentTime) : ""],
    ["Email", booking.email],
    ["Phone Number", booking.phone],
  ];
  return (
    <div className="rounded-3xl border border-border bg-primary-soft/60 p-6">
      <dl className="divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between sm:gap-6">
            <dt className="text-sm text-muted-foreground">{k}</dt>
            <dd className="text-sm font-semibold text-foreground sm:text-right">{v || "—"}</dd>
          </div>
        ))}
      </dl>
      {booking.notes && <p className="mt-3 rounded-2xl bg-card p-4 text-sm text-muted-foreground">“{booking.notes}”</p>}
    </div>
  );
}
