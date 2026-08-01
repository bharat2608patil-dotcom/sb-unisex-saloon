import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useBusiness, useNavigation } from "../../hooks/useSalonData";

function Header({ onBook }) {
  const nav = useNavigation();
  const business = useBusiness();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between rounded-full border border-[hsl(var(--background)/.2)] bg-[hsl(var(--primary)/.87)] px-4 py-3 text-[hsl(var(--background))] shadow-lg backdrop-blur-md md:px-6">
        <a href="#top" className="flex items-center gap-3" data-testid="link-brand">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--secondary))] text-sm font-semibold text-[hsl(var(--secondary))]">PS</span>
          <span className="hidden text-[.68rem] font-bold uppercase leading-tight tracking-[.16em] sm:block">{business.name}</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold text-[hsl(var(--background)/.72)] transition hover:text-[hsl(var(--secondary))]"
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(" ", "-")}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button type="button" className="btn-primary !bg-[hsl(var(--secondary))] !px-5 !py-2.5 !text-[hsl(var(--primary))]" onClick={onBook} data-testid="button-header-book">
          Book a visit <ArrowUpRight size={14} />
        </button>
        <button type="button" className="ml-2 rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} data-testid="button-mobile-menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <nav className="mx-auto mt-2 flex max-w-[1280px] flex-col gap-1 rounded-3xl bg-[hsl(var(--primary))] p-4 lg:hidden" aria-label="Mobile navigation">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-[hsl(var(--background)/.8)] hover:bg-[hsl(var(--background)/.1)]"
              data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(" ", "-")}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
