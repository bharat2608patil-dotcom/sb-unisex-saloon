import { ArrowUpRight, Star } from "lucide-react";
import { useBusiness, useStatistics } from "../../hooks/useSalonData";

function TrustStrip() {
  const business = useBusiness();
  const stats = useStatistics();

  return (
    <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="section-wrap grid gap-0 divide-y divide-[hsl(var(--border))] py-1 md:grid-cols-4 md:divide-x md:divide-y-0">
        <div className="flex items-center gap-3 py-5 md:px-7 md:py-7 md:first:pl-0">
          <Star size={20} fill="currentColor" className="text-[hsl(var(--secondary))]" />
          <div>
            <p className="text-sm font-bold">{business.rating}/5</p>
            <p className="eyebrow mt-1 text-[hsl(var(--muted-foreground))]">Google rating</p>
          </div>
        </div>
        {stats.slice(1).map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 py-5 md:px-7 md:py-7">
            <span className="serif text-3xl">
              {stat.value}
              <small className="text-xl text-[hsl(var(--accent))]">{stat.suffix}</small>
            </span>
            <span className="eyebrow text-[hsl(var(--muted-foreground))]">{stat.label}</span>
          </div>
        ))}
        <a href="#contact" className="flex items-center justify-between py-5 text-sm font-bold md:px-7 md:py-7 md:pr-0" data-testid="link-trust-location">
          <span>Find us in Nashik</span>
          <ArrowUpRight size={17} className="text-[hsl(var(--accent))]" />
        </a>
      </div>
    </section>
  );
}

export default TrustStrip;
