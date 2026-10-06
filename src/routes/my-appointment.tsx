import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { checkAppointmentStatus, formatDate, formatTime, type AppointmentRecord, type AppointmentStatus } from "@/lib/booking";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-appointment")({
  head: () => ({
    meta: [
      { title: "My Appointment — SmileCare Dental Studio" },
      { name: "description", content: "Check the status of your SmileCare dental appointment with your email and reference number." },
      { property: "og:title", content: "My Appointment — SmileCare Dental Studio" },
      { property: "og:description", content: "Check the status of your SmileCare dental appointment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyAppointment,
});

const BADGE: Record<AppointmentStatus, string> = {
  Pending: "bg-warning-soft text-warning",
  Confirmed: "bg-success-soft text-success",
  Completed: "bg-primary-soft text-primary",
  Cancelled: "bg-destructive/10 text-destructive",
  Rescheduled: "bg-teal-soft text-teal",
};

function MyAppointment() {
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AppointmentRecord | null | undefined>(undefined);
  const valid = /\S+@\S+\.\S+/.test(email) && ref.trim().length > 0;

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setResult(await checkAppointmentStatus(email, ref));
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="bg-hero min-h-[70vh] py-16 lg:py-24">
        <div className="mx-auto max-w-xl px-5">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-teal">Appointment status</p>
          <h1 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">My Appointment</h1>
          <p className="mt-3 text-center text-muted-foreground">Enter the email you booked with and your reference number (e.g. SC-123456).</p>
          <form onSubmit={check} className="mt-10 space-y-5 rounded-4xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="e" className="font-semibold">Email Address</Label>
              <Input id="e" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-13 rounded-xl text-base" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="r" className="font-semibold">Appointment Reference Number</Label>
              <Input id="r" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="SC-123456" className="h-13 rounded-xl text-base uppercase" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={!valid || loading}>
              {loading && <Loader2 className="animate-spin" />} Check Appointment
            </Button>
          </form>

          {result === null && (
            <div className="mt-6 flex items-center gap-3 rounded-3xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-soft" role="alert">
              <SearchX className="h-5 w-5 text-warning" /> We couldn't find that appointment. Please check your details.
            </div>
          )}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-2 mt-6 rounded-3xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-primary">{result.reference}</span>
                <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", BADGE[result.status])}>{result.status}</span>
              </div>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {[["Service", result.service], ["Dentist", result.dentist], ["Date", formatDate(result.appointmentDate)], ["Time", formatTime(result.appointmentTime)]].map(([k, v]) => (
                  <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="text-sm font-semibold text-foreground">{v}</dd></div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
