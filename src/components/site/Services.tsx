import { AlarmClock, Brush, ClipboardCheck, Layers, ShieldPlus, Sparkles, Stethoscope, Syringe, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/booking";
import { Reveal, SectionHeading } from "./Reveal";
import { useBooking } from "./BookingContext";

const ICONS = [Stethoscope, Brush, Syringe, Sparkles, Layers, ClipboardCheck, ShieldPlus, AlarmClock];

export function Services() {
  const { bookWith } = useBooking();
  return (
    <section id="services" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Services" title="Our Dental Services" subtitle="Gentle, thorough care for every stage of your smile." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={s.id} delay={(i % 4) * 70}>
                <article className="card-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  <button
                    onClick={() => bookWith({ service: s.name })}
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Book This Service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
