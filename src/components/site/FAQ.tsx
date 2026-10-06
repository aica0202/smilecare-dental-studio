import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";

const FAQS = [
  ["How do I book an appointment?", "Use the online booking form on this page — choose a service, dentist, date and time, then confirm. It takes about a minute. You can also call us at (555) 123-4567."],
  ["Can I reschedule my appointment?", "Of course. Call us or reply to your confirmation email at least 24 hours before your visit and we'll find a new time that suits you."],
  ["How early should I arrive?", "Please arrive 10–15 minutes early for your first visit so we can complete a short health form. Returning patients can arrive 5 minutes early."],
  ["Do you accept emergency appointments?", "Yes. Choose “Emergency Dental Care” when booking, or call us directly — we keep same-day slots open for urgent problems."],
  ["How do I know if my appointment is confirmed?", "You'll see a confirmation on screen and receive an email with your reference number. You can check its status anytime on the My Appointment page."],
];

export function FAQ() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="rounded-2xl border border-border bg-card px-5 shadow-soft last:border-b">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
