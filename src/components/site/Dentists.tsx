import { Button } from "@/components/ui/button";
import sophia from "@/assets/dr-sophia.jpg";
import daniel from "@/assets/dr-daniel.jpg";
import emma from "@/assets/dr-emma.jpg";
import { Reveal, SectionHeading } from "./Reveal";
import { useBooking } from "./BookingContext";

const DENTISTS = [
  { name: "Dr. Sophia Martinez", role: "General Dentist", img: sophia, bio: "Focused on preventive care and helping patients feel comfortable during every visit." },
  { name: "Dr. Daniel Reyes", role: "Cosmetic Dentist", img: daniel, bio: "Specializes in smile enhancement, whitening, and restorative treatments." },
  { name: "Dr. Emma Collins", role: "Orthodontic Specialist", img: emma, bio: "Helping patients achieve healthier and more confident smiles through modern orthodontic care." },
];

export function Dentists() {
  const { bookWith } = useBooking();
  return (
    <section id="dentists" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Our team" title="Meet Our Dentists" subtitle="Kind, experienced people who genuinely care about how you feel." />
        <div className="grid gap-6 md:grid-cols-3">
          {DENTISTS.map((d, i) => (
            <Reveal key={d.name} delay={i * 100}>
              <article className="card-hover flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <img src={d.img} alt={`Portrait of ${d.name}`} width={800} height={912} loading="lazy" className="aspect-[4/4] w-full object-cover object-top" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">{d.role}</p>
                  <h3 className="mt-1.5 text-xl font-semibold text-foreground">{d.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{d.bio}</p>
                  <Button variant="soft" className="mt-6 w-full" onClick={() => bookWith({ dentist: d.name })}>
                    Book with this Dentist
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
