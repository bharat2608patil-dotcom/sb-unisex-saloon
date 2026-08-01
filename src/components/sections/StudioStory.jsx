import { useBusiness } from "../../hooks/useSalonData";

function StudioStory() {
  const business = useBusiness();

  return (
    <section id="studio" className="section-wrap grid gap-12 py-24 md:grid-cols-[.8fr_1.2fr] md:items-center md:py-36">
      <div>
        <p className="eyebrow mb-5 text-[hsl(var(--accent))]">The studio</p>
        <h2 className="section-title">
          A little more
          <br />
          <i className="text-[hsl(var(--accent))]">you.</i>
        </h2>
        <div className="gold-line mt-8" />
      </div>
      <div className="max-w-xl">
        <p className="text-xl leading-8 md:text-2xl">
          Beauty should feel like a conversation, not a performance. At The Premium Studio, we take the time to understand what makes you feel most like yourself.
        </p>
        <p className="mt-6 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
          Tucked into Oasis Life Society near Indira Nagar Church, our studio is a warm, considered space for the everyday refresh and the big day alike. Come for the craft. Stay for the feeling.
        </p>
        <p className="mt-8 text-xs font-semibold text-[hsl(var(--accent))]">{business.hindiName}</p>
      </div>
    </section>
  );
}

export default StudioStory;
