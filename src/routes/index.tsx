import { createFileRoute } from "@tanstack/react-router";
import { BookingProvider } from "@/components/site/BookingContext";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Dentists } from "@/components/site/Dentists";
import { BookingForm } from "@/components/site/booking/BookingForm";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { SmartBooking } from "@/components/site/SmartBooking";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const TITLE = "SmileCare Dental Studio — Healthy Smiles. Happier You.";
const DESC = "Modern, gentle dental care. Explore our services, meet our dentists and book your appointment online in minutes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Dentists />
        <BookingForm />
        <Testimonials />
        <FAQ />
        <SmartBooking />
        <Contact />
      </main>
      <Footer />
    </BookingProvider>
  );
}
