import { ArrowUpRight } from "lucide-react";
import SectionIntro from "../common/SectionIntro";
import { useTransformations } from "../../hooks/useSalonData";

function BeforeAfterSection() {
  const items = useTransformations();

  return (
    <section className="section-wrap py-24 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionIntro eyebrow="The quiet transformation" title={"See the difference\nin the details."} />
        <span className="eyebrow mb-12 text-[hsl(var(--muted-foreground))]">Swipe the feeling, not the filter</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <div key={item.label} className="rounded-[1.5rem] bg-[hsl(var(--muted))] p-4" data-testid={`card-transformation-${index}`}>
            <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl">
              <div className="relative flex aspect-[1.15] items-end justify-start bg-[hsl(var(--primary)/.68)] p-4 text-[hsl(var(--background))]">
                <span className="eyebrow">{item.before}</span>
                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--secondary)/.6)]" />
              </div>
              <div className="relative flex aspect-[1.15] items-end justify-start bg-[hsl(var(--accent)/.72)] p-4 text-[hsl(var(--background))]">
                <span className="eyebrow">{item.after}</span>
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--background)/.6)]" />
              </div>
            </div>
            <div className="flex items-end justify-between px-1 pb-1 pt-5">
              <div>
                <h3 className="font-bold">{item.label}</h3>
                <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{item.description}</p>
              </div>
              <ArrowUpRight size={18} className="text-[hsl(var(--accent))]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BeforeAfterSection;
