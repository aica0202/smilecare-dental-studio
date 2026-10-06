import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime, type BookingPayload } from "@/lib/booking";

export function BookingSuccess({ booking, reference, onHome, onAnother }: { booking: BookingPayload; reference: string; onHome: () => void; onAnother: () => void }) {
  return (
    <div className="animate-in fade-in zoom-in-95 text-center duration-500" role="status">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-foreground sm:text-3xl">Appointment Confirmed!</h3>
      <p className="mt-2 text-muted-foreground">Thank you, {booking.fullName}. Your appointment request has been received.</p>
      <div className="mx-auto mt-7 grid max-w-md gap-3 rounded-3xl border border-border bg-primary-soft/60 p-5 text-left sm:grid-cols-2">
        {[
          ["Service", booking.service],
          ["Dentist", booking.dentist],
          ["Date", formatDate(booking.appointmentDate)],
          ["Time", formatTime(booking.appointmentTime)],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="text-sm font-semibold text-foreground">{v}</p>
          </div>
        ))}
        <div className="sm:col-span-2">
          <p className="text-xs text-muted-foreground">Reference number</p>
          <p className="font-display text-lg font-semibold tracking-wide text-primary">{reference}</p>
        </div>
      </div>
      <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4 text-teal" /> We've sent your appointment details to your email.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="outline" size="lg" onClick={onHome}>Back to Home</Button>
        <Button variant="hero" size="lg" onClick={onAnother}>Book Another Appointment</Button>
      </div>
    </div>
  );
}
