import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

const QUICK = [["Home", "/#home"], ["About", "/#about"], ["Services", "/#services"], ["Dentists", "/#dentists"], ["Book Appointment", "/#booking"], ["Contact", "/#contact"]];
const SERV = ["Dental Consultation", "Cleaning", "Whitening", "Orthodontics", "Emergency Dental Care"];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-navy-foreground/70">Healthy Smiles. Happier You.</p>
          <div className="mt-6 flex gap-3">
            {[[Facebook, "Facebook"], [Instagram, "Instagram"], [Linkedin, "LinkedIn"]].map(([I, l]) => {
              const Icon = I as typeof Facebook;
              return (
                <a key={l as string} href="#" aria-label={l as string} className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-foreground/10 transition-colors hover:bg-primary">
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <p className="font-display font-semibold">Quick Links</p>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
            {QUICK.map(([l, h]) => <li key={l}><a href={h} className="hover:text-navy-foreground">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
            {SERV.map((s) => <li key={s}><a href="/#services" className="hover:text-navy-foreground">{s}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
            <li>123 Smile Avenue, Downtown</li>
            <li><a href="tel:5551234567" className="hover:text-navy-foreground">(555) 123-4567</a></li>
            <li><a href="mailto:hello@smilecaredental.com" className="hover:text-navy-foreground">hello@smilecaredental.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-6 text-center text-sm text-navy-foreground/60">© 2026 SmileCare Dental Studio. All rights reserved.</div>
    </footer>
  );
}
