import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Camera,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Star,
  X
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter, Link } from "wouter";
import { getIcon } from "./utils/iconMapper";
import { salonApi } from "./services/api";
import { useBridal, useBusiness, useContact, useFAQ, useGallery, useHairTreatments, useHero, useNavigation, usePricing, useReviews, useServices, useStatistics, useStylists, useTransformations, useWorkingHours } from "./hooks/useSalonData";

const queryClient = new QueryClient();
const img = (path) => path;

function SectionIntro({ eyebrow, title, description, light = false }) {
  return <div className={`mb-12 max-w-3xl ${light ? "text-[hsl(var(--background))]" : ""}`}>
    <p className={`eyebrow mb-5 ${light ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--accent))]"}`}>{eyebrow}</p>
    <h2 className="section-title whitespace-pre-line">{title}</h2>
    {description && <p className={`mt-6 max-w-xl text-base leading-7 ${light ? "text-[hsl(var(--background)/.68)]" : "text-[hsl(var(--muted-foreground))]"}`}>{description}</p>}
  </div>;
}

function Header({ onBook }) {
  const nav = useNavigation();
  const business = useBusiness();
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-30 px-4 py-4 md:px-8">
    <div className="mx-auto flex max-w-[1280px] items-center justify-between rounded-full border border-[hsl(var(--background)/.2)] bg-[hsl(var(--primary)/.87)] px-4 py-3 text-[hsl(var(--background))] shadow-lg backdrop-blur-md md:px-6">
      <a href="#top" className="flex items-center gap-3" data-testid="link-brand">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--secondary))] text-sm font-semibold text-[hsl(var(--secondary))]">PS</span>
        <span className="hidden text-[.68rem] font-bold uppercase leading-tight tracking-[.16em] sm:block">{business.name}</span>
      </a>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        {nav.map((item) => <a key={item.href} href={item.href} className="text-xs font-semibold text-[hsl(var(--background)/.72)] transition hover:text-[hsl(var(--secondary))]" data-testid={`link-nav-${item.label.toLowerCase().replaceAll(" ", "-")}`}>{item.label}</a>)}
      </nav>
      <button type="button" className="btn-primary !bg-[hsl(var(--secondary))] !px-5 !py-2.5 !text-[hsl(var(--primary))]" onClick={onBook} data-testid="button-header-book">Book a visit <ArrowUpRight size={14} /></button>
      <button type="button" className="ml-2 rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} data-testid="button-mobile-menu">{open ? <X size={19} /> : <Menu size={19} />}</button>
    </div>
    {open && <nav className="mx-auto mt-2 flex max-w-[1280px] flex-col gap-1 rounded-3xl bg-[hsl(var(--primary))] p-4 lg:hidden" aria-label="Mobile navigation">
      {nav.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-[hsl(var(--background)/.8)] hover:bg-[hsl(var(--background)/.1)]" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(" ", "-")}`}>{item.label}</a>)}
    </nav>}
  </header>;
}

function Hero({ onBook }) {
  const hero = useHero();
  const business = useBusiness();
  return <section id="top" className="relative min-h-[760px] overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--background))]">
    <div className="absolute inset-0 opacity-40"><img src={img(hero.image)} alt="The Premium Studio salon interior" className="h-full w-full object-cover object-center mix-blend-screen" /></div>
    <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--primary))_8%,hsl(var(--primary)/.76)_45%,hsl(var(--primary)/.18)_100%)]" />
    <div className="section-wrap relative flex min-h-[760px] items-end pb-20 pt-40 md:items-center md:pb-10">
      <div className="max-w-3xl">
        <p className="eyebrow reveal text-[hsl(var(--secondary))]">{hero.kicker}</p>
        <h1 className="display-title reveal reveal-delay-1 mt-6 whitespace-pre-line">{hero.title}</h1>
        <p className="reveal reveal-delay-2 mt-7 max-w-lg text-base leading-7 text-[hsl(var(--background)/.68)]">{hero.description}</p>
        <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
          <button className="btn-primary !bg-[hsl(var(--secondary))] !text-[hsl(var(--primary))]" onClick={onBook} data-testid="button-hero-book"><CalendarDays size={16} /> Book your visit</button>
          <a className="btn-outline !border-[hsl(var(--background)/.35)] !text-[hsl(var(--background))]" href="#services" data-testid="link-hero-explore">Explore the studio <ArrowDown size={15} /></a>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[hsl(var(--background)/.2)] pt-5 text-xs text-[hsl(var(--background)/.64)]">
          {hero.features.map((feature) => <span key={feature} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--secondary))]" />{feature}</span>)}
        </div>
      </div>
      <div className="absolute bottom-10 right-8 hidden max-w-[190px] text-right text-xs leading-5 text-[hsl(var(--background)/.55)] lg:block">
        <MapPin size={16} className="ml-auto mb-2 text-[hsl(var(--secondary))]" />{business.address.slice(0, 2).join(", ")}
      </div>
    </div>
  </section>;
}

function TrustStrip() {
  const business = useBusiness();
  const stats = useStatistics();
  return <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]"><div className="section-wrap grid gap-0 divide-y divide-[hsl(var(--border))] py-1 md:grid-cols-4 md:divide-x md:divide-y-0">
    <div className="flex items-center gap-3 py-5 md:px-7 md:py-7 md:first:pl-0"><Star size={20} fill="currentColor" className="text-[hsl(var(--secondary))]" /><div><p className="text-sm font-bold">{business.rating}/5</p><p className="eyebrow mt-1 text-[hsl(var(--muted-foreground))]">Google rating</p></div></div>
    {stats.slice(1).map((stat) => <div key={stat.label} className="flex items-center gap-3 py-5 md:px-7 md:py-7"><span className="serif text-3xl">{stat.value}<small className="text-xl text-[hsl(var(--accent))]">{stat.suffix}</small></span><span className="eyebrow text-[hsl(var(--muted-foreground))]">{stat.label}</span></div>)}
    <a href="#contact" className="flex items-center justify-between py-5 text-sm font-bold md:px-7 md:py-7 md:pr-0" data-testid="link-trust-location"><span>Find us in Nashik</span><ArrowUpRight size={17} className="text-[hsl(var(--accent))]" /></a>
  </div></section>;
}

function StudioStory() {
  const business = useBusiness();
  return <section id="studio" className="section-wrap grid gap-12 py-24 md:grid-cols-[.8fr_1.2fr] md:items-center md:py-36">
    <div><p className="eyebrow mb-5 text-[hsl(var(--accent))]">The studio</p><h2 className="section-title">A little more<br /><i className="text-[hsl(var(--accent))]">you.</i></h2><div className="gold-line mt-8" /></div>
    <div className="max-w-xl"><p className="text-xl leading-8 md:text-2xl">Beauty should feel like a conversation, not a performance. At The Premium Studio, we take the time to understand what makes you feel most like yourself.</p><p className="mt-6 text-sm leading-7 text-[hsl(var(--muted-foreground))]">Tucked into Oasis Life Society near Indira Nagar Church, our studio is a warm, considered space for the everyday refresh and the big day alike. Come for the craft. Stay for the feeling.</p><p className="mt-8 text-xs font-semibold text-[hsl(var(--accent))]">{business.hindiName}</p></div>
  </section>;
}

function Services() {
  const services = useServices();
  return <section id="services" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] md:py-32"><div className="section-wrap"><SectionIntro eyebrow="What we do" title={"The edit, not\nthe overwhelm."} description="A focused menu of hair, beauty and grooming services — designed around your time, your texture and your way of showing up." light /><div className="grid gap-4 lg:grid-cols-3">{services.map((service, index) => { const Icon = getIcon(service.icon); return <article key={service.id} className={`rounded-[2rem] border border-[hsl(var(--background)/.14)] p-7 transition duration-500 hover:-translate-y-2 hover:border-[hsl(var(--secondary)/.7)] ${index === 1 ? "bg-[hsl(var(--background)/.07)]" : ""}`} data-testid={`card-service-${service.id}`}><div className="flex items-start justify-between"><Icon size={22} strokeWidth={1.4} className="text-[hsl(var(--secondary))]" /><span className="eyebrow text-[hsl(var(--background)/.45)]">0{index + 1}</span></div><p className="eyebrow mt-14 text-[hsl(var(--secondary))]">{service.tag}</p><h3 className="serif mt-3 text-3xl">{service.title}</h3><p className="mt-4 text-sm leading-6 text-[hsl(var(--background)/.58)]">{service.description}</p><ul className="mt-7 space-y-2 border-t border-[hsl(var(--background)/.14)] pt-5">{service.items.map((item) => <li key={item} className="flex items-center gap-2 text-xs text-[hsl(var(--background)/.72)]"><Check size={13} className="text-[hsl(var(--secondary))]" />{item}</li>)}</ul></article>; })}</div></div></section>;
}

function Pricing() {
  const pricing = usePricing();
  return <section id="pricing" className="section-wrap py-24 md:py-32"><SectionIntro eyebrow="A considered menu" title={"Good work,\nclearly priced."} description="Your final recommendation is always personal. These starting points help you find your way in." /><div className="divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">{pricing.map((item, index) => <div key={item.name} className="group grid gap-3 py-6 transition hover:px-3 md:grid-cols-[.12fr_1fr_auto] md:items-center" data-testid={`row-price-${index}`}><span className="eyebrow text-[hsl(var(--accent))]">0{index + 1}</span><div><h3 className="text-lg font-bold">{item.name}</h3><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{item.detail} <span className="mx-2 text-[hsl(var(--border))]">·</span> {item.note}</p></div><span className="text-sm font-bold md:text-right">{item.price}</span></div>)}</div><p className="mt-5 text-xs text-[hsl(var(--muted-foreground))]">Prices are starting points. We will always discuss your service and price before we begin.</p></section>;
}

function Treatments() {
  const treatments = useHairTreatments();
  return <section className="bg-[hsl(var(--muted))] py-24 md:py-32"><div className="section-wrap grid gap-12 md:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow mb-5 text-[hsl(var(--accent))]">The treatment room</p><h2 className="section-title">For hair that<br /><i className="text-[hsl(var(--accent))]">moves well.</i></h2><p className="mt-7 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">The right treatment is never one-size-fits-all. We look at the hair you have and the life you lead.</p></div><div className="divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">{treatments.map((item) => <div key={item.title} className="grid gap-4 py-6 md:grid-cols-[.14fr_1fr]"><span className="eyebrow text-[hsl(var(--accent))]">{item.number}</span><div className="flex items-start justify-between gap-8"><div><h3 className="serif text-3xl">{item.title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">{item.text}</p></div><ArrowUpRight className="shrink-0 text-[hsl(var(--accent))]" size={20} /></div></div>)}</div></div></section>;
}

function Bridal() {
  const bridal = useBridal();
  return <section className="section-wrap grid gap-10 py-24 md:grid-cols-[1fr_1fr] md:items-center md:py-32"><div className="image-frame relative overflow-hidden rounded-[2rem]"><img loading="lazy" src={img(bridal.image)} alt="Bridal makeup editorial" className="image-hover aspect-[4/5] w-full object-cover" /><span className="absolute bottom-5 left-5 rounded-full bg-[hsl(var(--background)/.8)] px-4 py-2 text-xs font-bold backdrop-blur-md">The bridal edit</span></div><div className="md:pl-8"><p className="eyebrow mb-5 text-[hsl(var(--accent))]">For your day</p><h2 className="section-title">{bridal.title}</h2><p className="mt-7 text-base leading-7 text-[hsl(var(--muted-foreground))]">{bridal.description}</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{bridal.services.map((item) => <li key={item} className="flex items-center gap-2 text-sm"><span className="grid h-5 w-5 place-items-center rounded-full border border-[hsl(var(--secondary))] text-[hsl(var(--accent))]"><Check size={12} /></span>{item}</li>)}</ul><a href="#contact" className="btn-outline mt-9" data-testid="link-bridal-enquiry">Enquire for your date <ArrowRight size={15} /></a></div></section>;
}

function Gallery() {
  const gallery = useGallery();
  return <section id="gallery" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] md:py-32"><div className="section-wrap"><SectionIntro eyebrow="The visual diary" title={"A few things we've\nbeen making."} light /><div className="grid gap-4 md:grid-cols-12 md:grid-rows-[260px_260px]">{gallery.map((item, index) => <article key={item.title} className={`image-frame relative overflow-hidden rounded-[1.5rem] ${index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}><img loading="lazy" src={img(item.image)} alt={item.title} className="image-hover h-full min-h-[240px] w-full object-cover opacity-90" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[hsl(var(--primary)/.9)] to-transparent p-5 pt-16"><p className="eyebrow text-[hsl(var(--secondary))]">{item.category}</p><h3 className="serif mt-1 text-2xl">{item.title}</h3></div></article>)}</div></div></section>;
}

function BeforeAfter() {
  const items = useTransformations();
  return <section className="section-wrap py-24 md:py-32"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionIntro eyebrow="The quiet transformation" title={"See the difference\nin the details."} /><span className="eyebrow mb-12 text-[hsl(var(--muted-foreground))]">Swipe the feeling, not the filter</span></div><div className="grid gap-4 md:grid-cols-2">{items.map((item, index) => <div key={item.label} className="rounded-[1.5rem] bg-[hsl(var(--muted))] p-4" data-testid={`card-transformation-${index}`}><div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl"><div className="relative flex aspect-[1.15] items-end justify-start bg-[hsl(var(--primary)/.68)] p-4 text-[hsl(var(--background))]"><span className="eyebrow">{item.before}</span><div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--secondary)/.6)]" /></div><div className="relative flex aspect-[1.15] items-end justify-start bg-[hsl(var(--accent)/.72)] p-4 text-[hsl(var(--background))]"><span className="eyebrow">{item.after}</span><div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--background)/.6)]" /></div></div><div className="flex items-end justify-between px-1 pb-1 pt-5"><div><h3 className="font-bold">{item.label}</h3><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{item.description}</p></div><ArrowUpRight size={18} className="text-[hsl(var(--accent))]" /></div></div>)}</div></section>;
}

function Reviews() {
  const reviews = useReviews();
  const business = useBusiness();
  return <section id="reviews" className="bg-[hsl(var(--accent))] py-24 text-[hsl(var(--background))] md:py-32"><div className="section-wrap"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionIntro eyebrow="Kind words, kept" title={"The best part is\nhearing it back."} light /><div className="mb-12 flex items-center gap-3"><Star fill="currentColor" size={18} className="text-[hsl(var(--secondary))]" /><span className="text-2xl font-bold">{business.rating}</span><span className="text-xs text-[hsl(var(--background)/.7)]">from {business.reviews} Google Reviews</span></div></div><div className="grid gap-4 md:grid-cols-3">{reviews.map((review) => <figure key={review.name} className="flex min-h-[250px] flex-col justify-between rounded-[1.5rem] border border-[hsl(var(--background)/.22)] p-6"><div className="flex gap-1 text-[hsl(var(--secondary))]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div><blockquote className="serif text-2xl leading-tight">“{review.quote}”</blockquote><figcaption><p className="text-sm font-bold">{review.name}</p><p className="eyebrow mt-1 text-[hsl(var(--background)/.58)]">{review.meta}</p></figcaption></figure>)}</div></div></section>;
}

function Team() {
  const stylists = useStylists();
  return <section className="section-wrap py-24 md:py-32"><SectionIntro eyebrow="The people" title={"Good hands.\nGood energy."} description="The studio is a team effort: skilled hands, sharp eyes and a shared belief that the best beauty work still feels like you." /><div className="grid gap-4 md:grid-cols-2">{stylists.map((stylist) => <article key={stylist.name} className="group flex gap-5 rounded-[1.5rem] border border-[hsl(var(--border))] p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-sm)]"><div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[hsl(var(--primary))] text-xl text-[hsl(var(--secondary))]">{stylist.initials}</div><div><h3 className="serif text-2xl">{stylist.name}</h3><p className="eyebrow mt-1 text-[hsl(var(--accent))]">{stylist.role}</p><p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{stylist.text}</p></div></article>)}</div></section>;
}

function Hours({ onBook }) {
  const hours = useWorkingHours();
  return <section className="bg-[hsl(var(--muted))] py-20"><div className="section-wrap grid gap-10 md:grid-cols-[1fr_auto] md:items-center"><div><p className="eyebrow text-[hsl(var(--accent))]">Make some time</p><h2 className="serif mt-4 text-4xl md:text-5xl">The door is open.</h2></div><div className="grid gap-3 text-sm md:min-w-[450px]">{hours.map((item) => <div key={item.day} className="flex justify-between gap-8 border-b border-[hsl(var(--border))] pb-3"><span className="font-semibold">{item.day}</span><span className="text-[hsl(var(--muted-foreground))]">{item.time}</span></div>)}<button className="btn-primary mt-4 w-fit" onClick={onBook} data-testid="button-hours-book"><CalendarDays size={16} /> Start an appointment</button></div></div></section>;
}

function FAQ() {
  const faqs = useFAQ();
  const [active, setActive] = useState(0);
  return <section id="faq" className="section-wrap grid gap-12 py-24 md:grid-cols-[.7fr_1.3fr] md:py-32"><SectionIntro eyebrow="Before you come in" title={"A few useful\nanswers."} description="Still have a question? Bring it with you — we are happy to talk it through." /><div className="divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">{faqs.map((faq, index) => <div key={faq.question}><button type="button" className="flex w-full items-center justify-between gap-5 py-5 text-left font-bold" onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index} data-testid={`button-faq-${index}`}><span>{faq.question}</span><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[hsl(var(--border))] transition ${active === index ? "rotate-45 bg-[hsl(var(--primary))] text-[hsl(var(--background))]" : ""}`}><Plus size={15} /></span></button>{active === index && <p className="max-w-xl pb-5 pr-12 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{faq.answer}</p>}</div>)}</div></section>;
}

function Contact({ onBook }) {
  const business = useBusiness();
  const contact = useContact();
  return <section id="contact" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] md:py-32"><div className="section-wrap grid gap-12 md:grid-cols-[.9fr_1.1fr]"><div><p className="eyebrow text-[hsl(var(--secondary))]">Come by</p><h2 className="section-title mt-5">Your chair<br /><i className="text-[hsl(var(--secondary))]">is waiting.</i></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[hsl(var(--background)/.62)]">Find us in the heart of Indira Nagar. Come as you are; leave feeling looked after.</p><div className="mt-9 flex flex-wrap gap-3"><button className="btn-primary !bg-[hsl(var(--secondary))] !text-[hsl(var(--primary))]" onClick={onBook} data-testid="button-contact-book"><CalendarDays size={16} /> Book a visit</button><a href={`https://wa.me/?text=${encodeURIComponent(contact.whatsappMessage)}`} target="_blank" rel="noreferrer" className="btn-outline !border-[hsl(var(--background)/.3)] !text-[hsl(var(--background))]" data-testid="link-whatsapp"><MessageCircle size={16} /> WhatsApp us</a></div></div><div className="grid gap-3"><a href={business.mapUrl} target="_blank" rel="noreferrer" className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[hsl(var(--accent)/.35)] p-6" data-testid="link-map"><div className="absolute -right-8 -top-8 h-52 w-52 rounded-full border border-[hsl(var(--secondary)/.55)] group-hover:scale-110 transition-transform" /><div className="relative flex justify-between"><MapPin className="text-[hsl(var(--secondary))]" /><ArrowUpRight className="text-[hsl(var(--secondary))]" /></div><div className="relative"><p className="eyebrow text-[hsl(var(--secondary))]">The address</p><p className="mt-3 max-w-xs text-sm leading-6">{business.address.map((line) => <span className="block" key={line}>{line}</span>)}</p><p className="mt-3 text-xs text-[hsl(var(--background)/.5)]">{business.plusCode}</p></div></a><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-[1.5rem] border border-[hsl(var(--background)/.14)] p-5"><Clock3 size={17} className="text-[hsl(var(--secondary))]" /><p className="eyebrow mt-8 text-[hsl(var(--background)/.48)]">Open today</p><p className="mt-2 text-sm">10:00 am — 8:30 pm</p></div><div className="rounded-[1.5rem] border border-[hsl(var(--background)/.14)] p-5"><Camera size={17} className="text-[hsl(var(--secondary))]" /><p className="eyebrow mt-8 text-[hsl(var(--background)/.48)]">Stay inspired</p><a href={contact.instagram} className="mt-2 block text-sm underline underline-offset-4">Follow the studio</a></div></div></div></div></section>;
}

function Footer() {
  const business = useBusiness();
  const nav = useNavigation();
  return <footer className="bg-[hsl(var(--primary))] px-4 pb-8 text-[hsl(var(--background))]"><div className="mx-auto max-w-[1180px] border-t border-[hsl(var(--background)/.16)] pt-8"><div className="flex flex-col justify-between gap-8 md:flex-row"><div><p className="serif text-3xl">The Premium Studio</p><p className="eyebrow mt-2 text-[hsl(var(--background)/.45)]">Unisex salon · Nashik</p></div><div className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-[hsl(var(--background)/.62)]">{nav.map((item) => <a key={item.href} href={item.href} className="hover:text-[hsl(var(--secondary))]">{item.label}</a>)}</div></div><div className="mt-14 flex flex-col justify-between gap-3 text-[.65rem] text-[hsl(var(--background)/.35)] sm:flex-row"><span>© {new Date().getFullYear()} {business.name}</span><span>Made for good hair days.</span></div></div></footer>;
}

function BookingDialog({ onClose }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", service: "", date: "", time: "" });
  const submit = async (event) => { event.preventDefault(); setStep("loading"); await salonApi.requestAppointment(form); setStep("success"); };
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[hsl(var(--primary)/.72)] p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Book an appointment"><div className="relative max-h-[90dvh] w-full max-w-lg overflow-auto rounded-[2rem] bg-[hsl(var(--background))] p-7 shadow-2xl md:p-10"><button type="button" onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 hover:bg-[hsl(var(--muted))]" aria-label="Close booking dialog" data-testid="button-close-booking"><X size={19} /></button>{step === "success" ? <div className="py-10 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[hsl(var(--secondary))]"><Check size={25} /></span><p className="eyebrow mt-7 text-[hsl(var(--accent))]">Enquiry received</p><h2 className="serif mt-3 text-4xl">We’ll be in touch.</h2><p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">Your appointment request is noted. The studio team will confirm the details with you shortly.</p><button className="btn-primary mt-8" onClick={onClose} data-testid="button-booking-done">Back to the studio</button></div> : <><p className="eyebrow text-[hsl(var(--accent))]">Start with a hello</p><h2 className="serif mt-3 text-4xl">Let’s find your time.</h2><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Tell us a little about what you’re looking for. This is an enquiry, not a commitment.</p><form onSubmit={submit} className="mt-8 space-y-4"><label className="block"><span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">Your name</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]" placeholder="How should we call you?" data-testid="input-booking-name" /></label><label className="block"><span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">What are you considering?</span><select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]" data-testid="select-booking-service"><option value="">Choose a service</option>{useServices().flatMap((service) => service.items).map((item) => <option key={item}>{item}</option>)}</select></label><div className="grid gap-4 sm:grid-cols-2"><label><span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">Preferred date</span><input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]" data-testid="input-booking-date" /></label><label><span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">Preferred time</span><input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]" data-testid="input-booking-time" /></label></div><button disabled={step === "loading"} className="btn-primary mt-3 w-full disabled:opacity-60" data-testid="button-submit-booking">{step === "loading" ? "Sending your enquiry…" : "Send appointment enquiry"} <ArrowRight size={16} /></button></form></>}</div></div>;
}

function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  useEffect(() => { document.title = "The Premium Studio | Unisex Salon, Nashik"; }, []);
  return <div className="noise min-h-[100dvh] overflow-hidden"><Header onBook={() => setBookingOpen(true)} /><main><Hero onBook={() => setBookingOpen(true)} /><TrustStrip /><StudioStory /><Services /><Pricing /><Treatments /><Bridal /><Gallery /><BeforeAfter /><Reviews /><Team /><Hours onBook={() => setBookingOpen(true)} /><FAQ /><Contact onBook={() => setBookingOpen(true)} /></main><Footer />{bookingOpen && <BookingDialog onClose={() => setBookingOpen(false)} />}<a href="#top" className="fixed bottom-5 right-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] shadow-lg transition hover:-translate-y-1" aria-label="Back to top" data-testid="link-back-to-top"><ArrowUpRight size={17} className="-rotate-45" /></a></div>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route component={() => <div className="grid min-h-screen place-items-center"><Link href="/" className="btn-primary">Return to studio</Link></div>} /></Switch>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;