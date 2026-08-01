import { ArrowDown, CalendarDays, MapPin } from "lucide-react";
import { useBusiness, useHero } from "../../hooks/useSalonData";
import { img } from "../../utils/image";

function Hero({ onBook }) {
  const hero = useHero();
  const business = useBusiness();

  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--background))]">
      <div className="absolute inset-0 opacity-40">
        <img src={img(hero.image)} alt="The Premium Studio salon interior" className="h-full w-full object-cover object-center mix-blend-screen" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--primary))_8%,hsl(var(--primary)/.76)_45%,hsl(var(--primary)/.18)_100%)]" />
      <div className="section-wrap relative flex min-h-[760px] items-end pb-20 pt-40 md:items-center md:pb-10">
        <div className="max-w-3xl">
          <p className="eyebrow reveal text-[hsl(var(--secondary))]">{hero.kicker}</p>
          <h1 className="display-title reveal reveal-delay-1 mt-6 whitespace-pre-line">{hero.title}</h1>
          <p className="reveal reveal-delay-2 mt-7 max-w-lg text-base leading-7 text-[hsl(var(--background)/.68)]">{hero.description}</p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
            <button className="btn-primary !bg-[hsl(var(--secondary))] !text-[hsl(var(--primary))]" onClick={onBook} data-testid="button-hero-book">
              <CalendarDays size={16} /> Book your visit
            </button>
            <a className="btn-outline !border-[hsl(var(--background)/.35)] !text-[hsl(var(--background))]" href="#services" data-testid="link-hero-explore">
              Explore the studio <ArrowDown size={15} />
            </a>
          </div>
          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[hsl(var(--background)/.2)] pt-5 text-xs text-[hsl(var(--background)/.64)]">
            {hero.features.map((feature) => (
              <span key={feature} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--secondary))]" />
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 right-8 hidden max-w-[190px] text-right text-xs leading-5 text-[hsl(var(--background)/.55)] lg:block">
          <MapPin size={16} className="ml-auto mb-2 text-[hsl(var(--secondary))]" />
          {business.address.slice(0, 2).join(", ")}
        </div>
      </div>
    </section>
  );
}

export default Hero;
