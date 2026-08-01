import { ArrowRight, Check } from "lucide-react";
import { useBridal } from "../../hooks/useSalonData";
import { img } from "../../utils/image";

function BridalSection() {
  const bridal = useBridal();

  return (
    <section className="section-wrap grid gap-10 py-24 md:grid-cols-[1fr_1fr] md:items-center md:py-32">
      <div className="image-frame relative overflow-hidden rounded-[2rem]">
        <img loading="lazy" src={img(bridal.image)} alt="Bridal makeup editorial" className="image-hover aspect-[4/5] w-full object-cover" />
        <span className="absolute bottom-5 left-5 rounded-full bg-[hsl(var(--background)/.8)] px-4 py-2 text-xs font-bold backdrop-blur-md">The bridal edit</span>
      </div>
      <div className="md:pl-8">
        <p className="eyebrow mb-5 text-[hsl(var(--accent))]">For your day</p>
        <h2 className="section-title">{bridal.title}</h2>
        <p className="mt-7 text-base leading-7 text-[hsl(var(--muted-foreground))]">{bridal.description}</p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {bridal.services.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-[hsl(var(--secondary))] text-[hsl(var(--accent))]">
                <Check size={12} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn-outline mt-9" data-testid="link-bridal-enquiry">
          Enquire for your date <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

export default BridalSection;
