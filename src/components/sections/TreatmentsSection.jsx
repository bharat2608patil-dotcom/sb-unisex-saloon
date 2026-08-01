import { ArrowUpRight } from "lucide-react";
import { useHairTreatments } from "../../hooks/useSalonData";

function TreatmentsSection() {
  const treatments = useHairTreatments();

  return (
    <section className="bg-[hsl(var(--muted))] py-24 md:py-32">
      <div className="section-wrap grid gap-12 md:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="eyebrow mb-5 text-[hsl(var(--accent))]">The treatment room</p>
          <h2 className="section-title">
            For hair that
            <br />
            <i className="text-[hsl(var(--accent))]">moves well.</i>
          </h2>
          <p className="mt-7 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">
            The right treatment is never one-size-fits-all. We look at the hair you have and the life you lead.
          </p>
        </div>
        <div className="divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
          {treatments.map((item) => (
            <div key={item.title} className="grid gap-4 py-6 md:grid-cols-[.14fr_1fr]">
              <span className="eyebrow text-[hsl(var(--accent))]">{item.number}</span>
              <div className="flex items-start justify-between gap-8">
                <div>
                  <h3 className="serif text-3xl">{item.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">{item.text}</p>
                </div>
                <ArrowUpRight className="shrink-0 text-[hsl(var(--accent))]" size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TreatmentsSection;
