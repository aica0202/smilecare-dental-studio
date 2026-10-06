import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#dentists", label: "Dentists" },
  { href: "/#booking", label: "Book Appointment" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-border bg-background/85 shadow-soft backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 lg:px-8" aria-label="Main">
        <a href="/#home" aria-label="SmileCare Dental Studio home">
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/my-appointment" className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary">
              My Appointment
            </Link>
          </li>
        </ul>
        <div className="hidden lg:block">
          <Button asChild variant="hero">
            <a href="/#booking">Book Appointment</a>
          </Button>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-primary-soft lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border px-5 pb-6 pt-2 lg:hidden animate-in fade-in slide-in-from-top-2">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3.5 text-base font-medium text-foreground hover:bg-primary-soft">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/my-appointment" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3.5 text-base font-medium text-foreground hover:bg-primary-soft">
                My Appointment
              </Link>
            </li>
          </ul>
          <Button asChild variant="hero" size="lg" className="mt-4 w-full">
            <a href="/#booking" onClick={() => setOpen(false)}>Book Appointment</a>
          </Button>
        </div>
      )}
    </header>
  );
}
