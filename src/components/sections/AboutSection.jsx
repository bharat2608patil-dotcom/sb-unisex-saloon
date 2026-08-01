import { ArrowRight, BadgeCheck, HeartHandshake, Sparkles, ShieldCheck } from "lucide-react";
import SectionIntro from "../common/SectionIntro";
import { useBusiness } from "../../hooks/useSalonData";

function AboutSection() {
  const business = useBusiness();

  const highlights = [
    {
      title: "Personalised service",
      text: "Every visit is tailored to your hair type, lifestyle, and personal style.",
      icon: Sparkles,
    },
    {
      title: "Trusted comfort",
      text: "We create a calm, welcoming experience where you can relax and feel looked after.",
      icon: HeartHandshake,
    },
    {
      title: "Professional standards",
      text: "Our approach combines craftsmanship, hygiene, and thoughtful guidance.",
      icon: ShieldCheck,
    },
    {
      title: "Premium finish",
      text: "The result is polished, modern, and designed to suit who you are.",
      icon: BadgeCheck,
    },
  ];

  return (
    <section id="about" className="section-wrap py-24 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-[var(--shadow-sm)]">
          <img
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80"
            alt="Premium salon interior with stylists and clients"
            className="h-[420px] w-full rounded-[1.5rem] object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <SectionIntro
            eyebrow="About us"
            title={"A salon experience\nbuilt around confidence."}
            description="We are a modern unisex salon focused on elevated styling, thoughtful consultation, and a polished experience from the first hello to the final reveal."
          />
          <p className="mt-2 text-base leading-7 text-[hsl(var(--muted-foreground))]">
            {business.name} blends contemporary techniques with a warm, personal approach. Whether you are visiting for a refresh, a special occasion, or a complete transformation, our team is here to make the experience feel effortless and memorable.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.25rem] border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--accent)/.1)] text-[hsl(var(--accent))]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{item.text}</p>
                </div>
              );
            })}
          </div>
          <a href="#contact" className="btn-outline mt-8 inline-flex items-center gap-2" data-testid="link-about-book">
            Plan your visit <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
