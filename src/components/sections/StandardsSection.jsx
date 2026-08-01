import { CheckCircle2, Droplets, ShieldCheck, Sparkles } from "lucide-react";
import SectionIntro from "../common/SectionIntro";

function StandardsSection() {
  const items = [
    { title: "Certified professionals", text: "Our team includes trained stylists and service professionals with experience across modern salon techniques." },
    { title: "Premium products", text: "We use professional-grade products chosen to support healthy hair and skin." },
    { title: "Sanitized tools", text: "Tools are cleaned and maintained with care before and after every appointment." },
    { title: "Customer safety", text: "We follow safe, hygienic practices to ensure a clean, comfortable experience." },
  ];

  return (
    <section className="bg-[hsl(var(--muted))] py-24 md:py-32">
      <div className="section-wrap">
        <SectionIntro
          eyebrow="Certifications & hygiene"
          title={"Professional care,\nwith premium standards."}
          description="We take pride in combining expert styling with a clean, carefully managed salon environment."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.title} className="rounded-[1.5rem] border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 transition hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--secondary)/.14)] text-[hsl(var(--accent))]">
                  {index === 0 ? <ShieldCheck size={18} /> : index === 1 ? <Sparkles size={18} /> : index === 2 ? <Droplets size={18} /> : <CheckCircle2 size={18} />}
                </div>
                <h3 className="text-base font-semibold">{item.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StandardsSection;
