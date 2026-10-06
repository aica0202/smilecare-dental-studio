import { useEffect, useState } from "react";
import { Check, ChevronLeft, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DENTIST_OPTIONS,
  SERVICES,
  emptyBooking,
  isBookingComplete,
  submitAppointment,
  validatePatient,
  type BookingPayload,
} from "@/lib/booking";
import { cn } from "@/lib/utils";
import { useBooking } from "../BookingContext";
import { SectionHeading } from "../Reveal";
import { AppointmentCalendar } from "./AppointmentCalendar";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { BookingSummary } from "./BookingSummary";
import { BookingSuccess } from "./BookingSuccess";
import { BookingError, BookingLoading } from "./BookingError";

const STEPS = ["Your details", "Service", "Dentist", "Date", "Time", "Notes", "Review"];
type Phase = "form" | "loading" | "success" | "unavailable" | "error";

export function BookingForm() {
  const { preselect } = useBooking();
  const [step, setStep] = useState(0);
  const [b, setB] = useState<BookingPayload>(emptyBooking);
  const [touched, setTouched] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [reference, setReference] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!preselect.nonce) return;
    setPhase("form");
    setB((prev) => ({ ...prev, ...(preselect.service ? { service: preselect.service } : {}), ...(preselect.dentist ? { dentist: preselect.dentist, appointmentTime: "" } : {}) }));
  }, [preselect]);

  const set = <K extends keyof BookingPayload>(k: K, v: BookingPayload[K]) => setB((p) => ({ ...p, [k]: v }));
  const patientErrors = validatePatient(b);

  const canNext = [
    Object.keys(patientErrors).length === 0,
    !!b.service,
    !!b.dentist,
    !!b.appointmentDate,
    !!b.appointmentTime,
    true,
    isBookingComplete(b),
  ][step];

  const next = () => {
    if (step === 0) setTouched(true);
    if (canNext) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const confirm = async () => {
    if (!isBookingComplete(b)) return;
    setPhase("loading");
    const res = await submitAppointment(b);
    if (res.status === "confirmed") {
      setReference(res.reference);
      setPhase("success");
    } else if (res.status === "unavailable") {
      setPhase("unavailable");
    } else {
      setErrorMsg(res.message);
      setPhase("error");
    }
  };

  const reset = () => {
    setB(emptyBooking());
    setStep(0);
    setTouched(false);
    setPhase("form");
  };

  return (
    <section id="booking" className="relative py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-hero opacity-70" />
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeading eyebrow="Online booking" title="Book Your Dental Appointment" subtitle="Choose your preferred service, dentist, date, and time. We'll take care of the rest." />
        <div className="rounded-4xl border border-border bg-card p-5 shadow-lift sm:p-10">
          {phase === "form" && (
            <>
              <Stepper step={step} onJump={(i) => i < step && setStep(i)} />
              <div key={step} className="animate-in fade-in slide-in-from-right-2 mt-8 min-h-[280px] duration-300">
                <h3 className="mb-6 text-xl font-semibold text-foreground">
                  <span className="mr-2 text-primary">Step {step + 1}.</span>
                  {["Tell us about you", "Select a service", "Choose your dentist", "Pick a date", "Pick a time", "Anything we should know?", "Review your booking"][step]}
                </h3>

                {step === 0 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="fullName" label="Full Name" error={touched ? patientErrors.fullName : undefined} className="sm:col-span-2">
                      <Input id="fullName" autoComplete="name" value={b.fullName} onChange={(e) => set("fullName", e.target.value)} className="h-13 rounded-xl text-base" placeholder="Jane Doe" />
                    </Field>
                    <Field id="email" label="Email Address" error={touched ? patientErrors.email : undefined}>
                      <Input id="email" type="email" autoComplete="email" value={b.email} onChange={(e) => set("email", e.target.value)} className="h-13 rounded-xl text-base" placeholder="jane@email.com" />
                    </Field>
                    <Field id="phone" label="Phone Number" error={touched ? patientErrors.phone : undefined}>
                      <Input id="phone" type="tel" autoComplete="tel" value={b.phone} onChange={(e) => set("phone", e.target.value)} className="h-13 rounded-xl text-base" placeholder="(555) 123-4567" />
                    </Field>
                  </div>
                )}

                {step === 1 && (
                  <div role="radiogroup" aria-label="Service" className="grid gap-3 sm:grid-cols-2">
                    {SERVICES.map((s) => (
                      <Choice key={s.id} selected={b.service === s.name} onClick={() => set("service", s.name)} title={s.name} text={s.description} />
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div role="radiogroup" aria-label="Dentist" className="grid gap-3 sm:grid-cols-2">
                    {DENTIST_OPTIONS.map((d) => (
                      <Choice key={d} selected={b.dentist === d} onClick={() => setB((p) => ({ ...p, dentist: d, appointmentTime: "" }))} title={d} icon />
                    ))}
                  </div>
                )}

                {step === 3 && <AppointmentCalendar value={b.appointmentDate} onChange={(v) => setB((p) => ({ ...p, appointmentDate: v, appointmentTime: "" }))} />}

                {step === 4 && <TimeSlotSelector date={b.appointmentDate} dentist={b.dentist} value={b.appointmentTime} onChange={(t) => set("appointmentTime", t)} />}

                {step === 5 && (
                  <Field id="notes" label="Tell us anything we should know before your appointment. (Optional)">
                    <Textarea id="notes" rows={5} value={b.notes} onChange={(e) => set("notes", e.target.value)} className="rounded-xl text-base" placeholder="e.g. I feel anxious at the dentist, or I have sensitive teeth." />
                  </Field>
                )}

                {step === 6 && <BookingSummary booking={b} />}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                <Button variant="outline" size="lg" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="w-full sm:w-auto">
                  <ChevronLeft /> Back
                </Button>
                {step < STEPS.length - 1 ? (
                  <Button variant="hero" size="lg" onClick={next} disabled={step > 0 && !canNext} className="w-full sm:w-auto">
                    Continue
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" onClick={confirm} disabled={!isBookingComplete(b)} className="w-full sm:w-auto">
                    Confirm Appointment
                  </Button>
                )}
              </div>
            </>
          )}
          {phase === "loading" && <BookingLoading />}
          {phase === "success" && (
            <BookingSuccess
              booking={b}
              reference={reference}
              onAnother={reset}
              onHome={() => {
                reset();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
          {phase === "unavailable" && (
            <BookingError
              onRetry={() => {
                set("appointmentTime", "");
                setStep(4);
                setPhase("form");
              }}
            />
          )}
          {phase === "error" && (
            <BookingError title="Something went wrong." message={errorMsg} onRetry={() => { setStep(4); setPhase("form"); }} />
          )}
        </div>
      </div>
    </section>
  );
}

function Stepper({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm sm:hidden">
        <span className="font-semibold text-foreground">{STEPS[step]}</span>
        <span className="text-muted-foreground">{step + 1} of {STEPS.length}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted sm:hidden">
        <div className="h-full rounded-full bg-gradient-primary transition-all duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
      <ol className="hidden items-center sm:flex">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center last:flex-none">
            <button type="button" onClick={() => onJump(i)} disabled={i >= step} className="flex flex-col items-center gap-1.5 disabled:cursor-default" aria-current={i === step ? "step" : undefined}>
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  i < step && "bg-teal text-primary-foreground",
                  i === step && "bg-primary text-primary-foreground shadow-card",
                  i > step && "bg-muted text-muted-foreground",
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={cn("text-[11px] font-medium", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
            </button>
            {i < STEPS.length - 1 && <span className={cn("mx-1 mb-5 h-0.5 flex-1 rounded-full", i < step ? "bg-teal" : "bg-muted")} />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Field({ id, label, error, children, className }: { id: string; label: string; error?: string | undefined; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold text-foreground">{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
    </div>
  );
}

function Choice({ selected, onClick, title, text, icon }: { selected: boolean; onClick: () => void; title: string; text?: string; icon?: boolean }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-16 items-start gap-3 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected ? "border-primary bg-primary-soft shadow-soft" : "border-border bg-card hover:border-primary/40 hover:bg-primary-soft/50",
      )}
    >
      {icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal">
          <UserRound className="h-5 w-5" />
        </span>
      )}
      <span className="flex-1">
        <span className="block font-semibold text-foreground">{title}</span>
        {text && <span className="mt-1 block text-sm text-muted-foreground">{text}</span>}
      </span>
      <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2", selected ? "border-primary bg-primary text-primary-foreground" : "border-input")}>
        {selected && <Check className="h-3 w-3" />}
      </span>
    </button>
  );
}
