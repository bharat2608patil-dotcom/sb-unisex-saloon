import SectionIntro from "../common/SectionIntro";
import { usePricing } from "../../hooks/useSalonData";

function PricingSection() {
  const pricing = usePricing();

  return (
    <section id="pricing" className="section-wrap py-24 md:py-32">
      <SectionIntro eyebrow="A considered menu" title={"Good work,\nclearly priced."} description="Your final recommendation is always personal. These starting points help you find your way in." />
      <div className="divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
        {pricing.map((item, index) => (
          <div key={item.name} className="group grid gap-3 py-6 transition hover:px-3 md:grid-cols-[.12fr_1fr_auto] md:items-center" data-testid={`row-price-${index}`}>
            <span className="eyebrow text-[hsl(var(--accent))]">0{index + 1}</span>
            <div>
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                {item.detail} <span className="mx-2 text-[hsl(var(--border))]">·</span> {item.note}
              </p>
            </div>
            <span className="text-sm font-bold md:text-right">{item.price}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-[hsl(var(--muted-foreground))]">
        Prices are starting points. We will always discuss your service and price before we begin.
      </p>
    </section>
  );
}

export default PricingSection;
