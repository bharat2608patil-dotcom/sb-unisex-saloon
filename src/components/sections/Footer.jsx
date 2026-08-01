import { useBusiness, useNavigation } from "../../hooks/useSalonData";

function Footer() {
  const business = useBusiness();
  const nav = useNavigation();

  return (
    <footer className="bg-[hsl(var(--primary))] px-4 pb-8 text-[hsl(var(--background))]">
      <div className="mx-auto max-w-[1180px] border-t border-[hsl(var(--background)/.16)] pt-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="serif text-3xl">The Premium Studio</p>
            <p className="eyebrow mt-2 text-[hsl(var(--background)/.45)]">Unisex salon · Nashik</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-[hsl(var(--background)/.62)]">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[hsl(var(--secondary))]">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 text-[.65rem] text-[hsl(var(--background)/.35)] sm:flex-row">
          <span>© {new Date().getFullYear()} {business.name}</span>
          <span>Made for good hair days.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
