import { ArrowUpRight, CalendarDays, Camera, Clock3, MapPin, MessageCircle } from "lucide-react";
import { useBusiness, useContact } from "../../hooks/useSalonData";

function ContactSection({ onBook }) {
  const business = useBusiness();
  const contact = useContact();

  return (
    <section id="contact" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] md:py-32">
      <div className="section-wrap grid gap-12 md:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="eyebrow text-[hsl(var(--secondary))]">Come by</p>
          <h2 className="section-title mt-5">
            Your chair
            <br />
            <i className="text-[hsl(var(--secondary))]">is waiting.</i>
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-7 text-[hsl(var(--background)/.62)]">
            Find us in the heart of Indira Nagar. Come as you are; leave feeling looked after.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button className="btn-primary !bg-[hsl(var(--secondary))] !text-[hsl(var(--primary))]" onClick={onBook} data-testid="button-contact-book">
              <CalendarDays size={16} /> Book a visit
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(contact.whatsappMessage)}`} target="_blank" rel="noreferrer" className="btn-outline !border-[hsl(var(--background)/.3)] !text-[hsl(var(--background))]" data-testid="link-whatsapp">
              <MessageCircle size={16} /> WhatsApp us
            </a>
          </div>
        </div>
        <div className="grid gap-3">
          <a href={business.mapUrl} target="_blank" rel="noreferrer" className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[hsl(var(--accent)/.35)] p-6" data-testid="link-map">
            <div className="absolute -right-8 -top-8 h-52 w-52 rounded-full border border-[hsl(var(--secondary)/.55)] group-hover:scale-110 transition-transform" />
            <div className="relative flex justify-between">
              <MapPin className="text-[hsl(var(--secondary))]" />
              <ArrowUpRight className="text-[hsl(var(--secondary))]" />
            </div>
            <div className="relative">
              <p className="eyebrow text-[hsl(var(--secondary))]">The address</p>
              <p className="mt-3 max-w-xs text-sm leading-6">
                {business.address.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-xs text-[hsl(var(--background)/.5)]">{business.plusCode}</p>
            </div>
          </a>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[hsl(var(--background)/.14)] p-5">
              <Clock3 size={17} className="text-[hsl(var(--secondary))]" />
              <p className="eyebrow mt-8 text-[hsl(var(--background)/.48)]">Open today</p>
              <p className="mt-2 text-sm">10:00 am — 8:30 pm</p>
            </div>
            <div className="rounded-[1.5rem] border border-[hsl(var(--background)/.14)] p-5">
              <Camera size={17} className="text-[hsl(var(--secondary))]" />
              <p className="eyebrow mt-8 text-[hsl(var(--background)/.48)]">Stay inspired</p>
              <a href={contact.instagram} className="mt-2 block text-sm underline underline-offset-4">Follow the studio</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
