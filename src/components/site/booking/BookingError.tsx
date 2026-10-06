import { CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingError({ title, message, onRetry }: { title?: string; message?: string; onRetry: () => void }) {
  return (
    <div className="animate-in fade-in zoom-in-95 py-6 text-center duration-500" role="alert">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warning-soft text-warning">
        <CalendarX2 className="h-8 w-8" />
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-foreground">{title ?? "This appointment time is no longer available."}</h3>
      <p className="mt-2 text-muted-foreground">{message ?? "Please select another available time."}</p>
      <Button variant="hero" size="lg" className="mt-7 w-full sm:w-auto" onClick={onRetry}>Choose Another Time</Button>
    </div>
  );
}

export function BookingLoading() {
  return (
    <div className="py-14 text-center" role="status" aria-live="polite">
      <div className="relative mx-auto h-14 w-14">
        <span className="absolute inset-0 rounded-full border-4 border-primary-soft" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      </div>
      <p className="mt-6 font-medium text-foreground">Checking appointment availability...</p>
      <p className="mt-1 text-sm text-muted-foreground">This only takes a moment.</p>
    </div>
  );
}
