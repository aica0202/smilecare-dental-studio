import { Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const ITEMS = [
  { q: "The booking process was so easy and the staff made me feel very comfortable.", a: "Maria S." },
  { q: "Beautiful clinic, friendly dentists, and very professional service.", a: "John R." },
  { q: "I was nervous about my appointment, but the team made the entire experience stress-free.", a: "Angela T." },
];

export function Testimonials() {
  return (
    <section className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What Our Patients Say" />
        <div className="grid gap-6 md:grid-cols-3">
          {ITEMS.map((t, i) => (
            <Reveal key={t.a} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                <Quote className="h-8 w-8 text-sky" />
                <div className="mt-4 flex gap-0.5" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-4 w-4 fill-star text-star" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">“{t.q}”</blockquote>
                <figcaption className="mt-6 font-semibold text-muted-foreground">— {t.a}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
