import { Calendar } from "@/components/ui/calendar";
import { isDateSelectable, toISODate } from "@/lib/booking";

export function AppointmentCalendar({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  const selected = value ? new Date(`${value}T00:00:00`) : undefined;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-3xl border border-border bg-card p-2 shadow-soft">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => d && onChange(toISODate(d))}
          disabled={(d) => !isDateSelectable(d)}
          startMonth={new Date()}
          className="[--cell-size:2.75rem] sm:[--cell-size:3rem]"
        />
      </div>
      <p className="text-xs text-muted-foreground">We're closed on Sundays. Saturday appointments end at 2:00 PM.</p>
    </div>
  );
}
