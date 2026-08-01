import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "../layout/Header";
import Hero from "../sections/Hero";
import TrustStrip from "../sections/TrustStrip";
import AboutSection from "../sections/AboutSection";
import StandardsSection from "../sections/StandardsSection";
import StudioStory from "../sections/StudioStory";
import ServicesSection from "../sections/ServicesSection";
import PricingSection from "../sections/PricingSection";
import TreatmentsSection from "../sections/TreatmentsSection";
import BridalSection from "../sections/BridalSection";
import GallerySection from "../sections/GallerySection";
import BeforeAfterSection from "../sections/BeforeAfterSection";
import ReviewsSection from "../sections/ReviewsSection";
import TeamSection from "../sections/TeamSection";
import HoursSection from "../sections/HoursSection";
import FAQSection from "../sections/FAQSection";
import ContactSection from "../sections/ContactSection";
import Footer from "../sections/Footer";
import BookingDialog from "../sections/BookingDialog";

function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    document.title = "SB Unisex Salon | Premium Hair & Beauty Studio";
  }, []);

  return (
    <div className="noise min-h-[100dvh] overflow-hidden">
      <Header onBook={() => setBookingOpen(true)} />
      <main>
        <Hero onBook={() => setBookingOpen(true)} />
        <TrustStrip />
        <AboutSection />
        <StandardsSection />
        <StudioStory />
        <ServicesSection />
        <PricingSection />
        <TreatmentsSection />
        <BridalSection />
        <GallerySection />
        <BeforeAfterSection />
        <ReviewsSection />
        <TeamSection />
        <HoursSection onBook={() => setBookingOpen(true)} />
        <FAQSection />
        <ContactSection onBook={() => setBookingOpen(true)} />
      </main>
      <Footer />
      {bookingOpen && <BookingDialog onClose={() => setBookingOpen(false)} />}
      <a href="#top" className="fixed bottom-5 right-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] shadow-lg transition hover:-translate-y-1" aria-label="Back to top" data-testid="link-back-to-top">
        <ArrowUpRight size={17} className="-rotate-45" />
      </a>
    </div>
  );
}

export default HomePage;
