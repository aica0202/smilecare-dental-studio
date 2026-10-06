import { BellRing, CalendarCheck, MailCheck } from "lucide-react";
import { Reveal } from "./Reveal";

export function SmartBooking() {
  return (
    <section className="pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-8 rounded-4xl bg-mint-soft p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">Smart Appointment Experience</p>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Booking that works around you</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Our online booking system is designed to provide patients with a faster and more convenient way to schedule dental visits while helping the clinic efficiently manage appointments and communication.
              </p>
            </div>
            <ul className="grid gap-3">
              {[
                [CalendarCheck, "Real-time availability"],
                [MailCheck, "Instant email confirmation"],
                [BellRing, "Friendly appointment reminders"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof CalendarCheck;
                return (
                  <li key={label as string} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-soft">
                    <I className="h-5 w-5 text-teal" />
                    <span className="font-medium text-foreground">{label as string}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
