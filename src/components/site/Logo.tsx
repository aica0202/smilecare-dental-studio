import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true">
      <rect width="40" height="40" rx="12" className="fill-primary" />
      <path
        d="M13.5 9.5c-3 0-5 2.4-5 5.6 0 3.2 1.4 5.3 2.2 8.4.8 3.3 1.2 7.5 3.4 7.5 2.3 0 2.2-4.8 3.4-6.6.6-.9 1.9-.9 2.5 0 1.2 1.8 1.1 6.6 3.4 6.6 2.2 0 2.6-4.2 3.4-7.5.8-3.1 2.2-5.2 2.2-8.4 0-3.2-2-5.6-5-5.6-2.4 0-3.4 1.4-5.5 1.4s-3.1-1.4-5.5-1.4Z"
        className="fill-primary-foreground"
      />
      <path d="M15 16.5c1.4 1.7 3 2.5 5 2.5s3.6-.8 5-2.5" fill="none" strokeWidth="1.8" strokeLinecap="round" className="stroke-teal" />
    </svg>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="leading-tight">
        <span className={cn("block font-display text-lg font-semibold", light ? "text-navy-foreground" : "text-foreground")}>SmileCare</span>
        <span className={cn("block text-[11px] font-medium uppercase tracking-[0.18em]", light ? "text-navy-foreground/60" : "text-muted-foreground")}>
          Dental Studio
        </span>
      </span>
    </span>
  );
}
