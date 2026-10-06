import { BadgeCheck, Cpu, Leaf, NotebookPen } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const REASONS = [
  { icon: BadgeCheck, title: "Experienced Dental Professionals", text: "Skilled, gentle dentists who explain every step." },
  { icon: Leaf, title: "Comfortable and Relaxing Environment", text: "Soft lighting, calm music and zero rush." },
  { icon: Cpu, title: "Modern Dental Technology", text: "Precise diagnostics with less discomfort." },
  { icon: NotebookPen, title: "Personalized Treatment Plans", text: "Care shaped around your goals and budget." },
];

export function WhyChoose() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Why SmileCare" title="Why Patients Choose SmileCare" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <div className="h-full rounded-3xl bg-teal-soft p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-card text-teal shadow-soft">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
