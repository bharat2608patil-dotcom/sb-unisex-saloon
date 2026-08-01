import SectionIntro from "../common/SectionIntro";
import { useStylists } from "../../hooks/useSalonData";

function TeamSection() {
  const stylists = useStylists();

  return (
    <section className="section-wrap py-24 md:py-32">
      <SectionIntro
        eyebrow="The people"
        title={"Good hands.\nGood energy."}
        description="The studio is a team effort: skilled hands, sharp eyes and a shared belief that the best beauty work still feels like you."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {stylists.map((stylist) => (
          <article key={stylist.name} className="group flex gap-5 rounded-[1.5rem] border border-[hsl(var(--border))] p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-sm)]">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[hsl(var(--primary))] text-xl text-[hsl(var(--secondary))]">{stylist.initials}</div>
            <div>
              <h3 className="serif text-2xl">{stylist.name}</h3>
              <p className="eyebrow mt-1 text-[hsl(var(--accent))]">{stylist.role}</p>
              <p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{stylist.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
