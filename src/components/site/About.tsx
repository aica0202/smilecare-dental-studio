import { HeartPulse, Microscope, Smile } from "lucide-react";
import clinic from "@/assets/clinic.jpg";
import { Reveal } from "./Reveal";

const HIGHLIGHTS = [
  { icon: HeartPulse, label: "Patient-Centered Care" },
  { icon: Microscope, label: "Modern Equipment" },
  { icon: Smile, label: "Friendly Dental Team" },
];

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <img src={clinic} alt="A calm, sunlit treatment room at SmileCare Dental Studio" width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full rounded-4xl object-cover shadow-card" />
        </Reveal>
        <Reveal delay={120}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">About us</p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Welcome to SmileCare Dental Studio</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            At SmileCare Dental Studio, we believe dental care should be comfortable, simple, and stress-free. Our team combines modern technology with personalized care to help every patient achieve a healthy and confident smile.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h.label} className="flex flex-col gap-3 rounded-2xl bg-mint-soft p-4">
                <h.icon className="h-6 w-6 text-teal" />
                <span className="text-sm font-semibold text-foreground">{h.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
