import { Check } from "lucide-react";
import SectionIntro from "../common/SectionIntro";
import { useServices } from "../../hooks/useSalonData";
import { getIcon } from "../../utils/iconMapper";

function ServicesSection() {
  const services = useServices();

  return (
    <section id="services" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] md:py-32">
      <div className="section-wrap">
        <SectionIntro
          eyebrow="What we do"
          title={"The edit, not\nthe overwhelm."}
          description="A focused menu of hair, beauty and grooming services — designed around your time, your texture and your way of showing up."
          light
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <article
                key={service.id}
                className={`rounded-[2rem] border border-[hsl(var(--background)/.14)] p-7 transition duration-500 hover:-translate-y-2 hover:border-[hsl(var(--secondary)/.7)] ${index === 1 ? "bg-[hsl(var(--background)/.07)]" : ""}`}
                data-testid={`card-service-${service.id}`}
              >
                <div className="flex items-start justify-between">
                  <Icon size={22} strokeWidth={1.4} className="text-[hsl(var(--secondary))]" />
                  <span className="eyebrow text-[hsl(var(--background)/.45)]">0{index + 1}</span>
                </div>
                <p className="eyebrow mt-14 text-[hsl(var(--secondary))]">{service.tag}</p>
                <h3 className="serif mt-3 text-3xl">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[hsl(var(--background)/.58)]">{service.description}</p>
                <ul className="mt-7 space-y-2 border-t border-[hsl(var(--background)/.14)] pt-5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[hsl(var(--background)/.72)]">
                      <Check size={13} className="text-[hsl(var(--secondary))]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
