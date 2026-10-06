import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Visit SmileCare Dental Studio" />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="flex flex-col gap-4">
            {[
              [MapPin, "Address", "123 Smile Avenue, Downtown", null],
              [Phone, "Phone", "(555) 123-4567", "tel:5551234567"],
              [Mail, "Email", "hello@smilecaredental.com", "mailto:hello@smilecaredental.com"],
            ].map(([Icon, k, v, href]) => {
              const I = Icon as typeof MapPin;
              return (
                <div key={k as string} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><I className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs text-muted-foreground">{k as string}</p>
                    {href ? <a href={href as string} className="font-semibold text-foreground hover:text-primary">{v as string}</a> : <p className="font-semibold text-foreground">{v as string}</p>}
                  </div>
                </div>
              );
            })}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="mb-3 flex items-center gap-2 font-semibold text-foreground"><Clock className="h-5 w-5 text-teal" /> Clinic Hours</p>
              <dl className="space-y-2 text-sm">
                {[["Monday – Friday", "9:00 AM – 5:00 PM"], ["Saturday", "9:00 AM – 2:00 PM"], ["Sunday", "Closed"]].map(([d, h]) => (
                  <div key={d} className="flex justify-between"><dt className="text-muted-foreground">{d}</dt><dd className="font-medium text-foreground">{h}</dd></div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative flex h-full min-h-80 items-center justify-center overflow-hidden rounded-3xl border border-border bg-teal-soft" role="img" aria-label="Map placeholder showing clinic location">
              <svg className="absolute inset-0 h-full w-full text-sky" aria-hidden="true">
                <defs>
                  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path d="M0 220 C 200 180, 300 300, 700 240" stroke="currentColor" strokeWidth="14" fill="none" opacity="0.6" />
                <path d="M380 0 C 360 160, 420 260, 380 600" stroke="currentColor" strokeWidth="10" fill="none" opacity="0.5" />
              </svg>
              <div className="relative flex flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift"><MapPin className="h-7 w-7" /></span>
                <span className="mt-3 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-card">SmileCare Dental Studio</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
