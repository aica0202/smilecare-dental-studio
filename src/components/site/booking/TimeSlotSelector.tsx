import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchAvailableSlots, formatTime } from "@/lib/booking";
import { cn } from "@/lib/utils";

export function TimeSlotSelector({ date, dentist, value, onChange }: { date: string; dentist: string; value: string; onChange: (t: string) => void }) {
  const [slots, setSlots] = useState<string[] | null>(null);
  useEffect(() => {
    let alive = true;
    setSlots(null);
    fetchAvailableSlots(date, dentist).then((s) => alive && setSlots(s));
    return () => {
      alive = false;
    };
  }, [date, dentist]);

  if (!slots)
    return (
      <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading available times…
      </div>
    );
  if (!slots.length) return <p className="py-10 text-center text-sm text-muted-foreground">No times left on this day. Please pick another date.</p>;

  return (
    <div role="radiogroup" aria-label="Available times" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {slots.map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={value === s}
          onClick={() => onChange(s)}
          className={cn(
            "h-14 rounded-2xl border text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            value === s
              ? "border-primary bg-primary text-primary-foreground shadow-card"
              : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary-soft",
          )}
        >
          {formatTime(s)}
        </button>
      ))}
    </div>
  );
}
