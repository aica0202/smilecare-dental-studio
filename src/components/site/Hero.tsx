import { Award, Cpu, HeartHandshake, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { Reveal } from "./Reveal";

const TRUST = [
  { icon: Award, title: "Experienced Dentists", text: "Over 40 years of combined care" },
  { icon: Cpu, title: "Modern Dental Technology", text: "Digital X-rays & gentle tools" },
  { icon: HeartHandshake, title: "Comfortable & Friendly Care", text: "Calm visits, at your pace" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 lg:grid-cols-2 lg:px-8 lg:pb-24 lg:pt-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-teal shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Healthy Smiles. Happier You.
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
            Your Smile Deserves <span className="text-primary">the Best Care</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Modern dental care designed to keep your smile healthy, confident, and beautiful.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg">
              <a href="#booking">Book an Appointment</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#services">View Our Services</a>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={150} className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-primary opacity-15 blur-2xl" />
          <img
            src={hero}
            alt="A smiling dentist with a relaxed patient in a bright, modern treatment room"
            width={1200}
            height={1408}
            className="aspect-[5/5] w-full rounded-4xl object-cover object-top shadow-lift sm:aspect-[6/5] lg:aspect-[5/5]"
          />
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card sm:left-8">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-star text-star" />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-semibold text-foreground">4.9 rating</p>
              <p className="text-xs text-muted-foreground">from 1,200+ patients</p>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 100}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/80 p-5 shadow-soft backdrop-blur">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal">
                  <t.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
