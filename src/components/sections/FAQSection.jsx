import { useState } from "react";
import { Plus } from "lucide-react";
import SectionIntro from "../common/SectionIntro";
import { useFAQ } from "../../hooks/useSalonData";

function FAQSection() {
  const faqs = useFAQ();
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="section-wrap grid gap-12 py-24 md:grid-cols-[.7fr_1.3fr] md:py-32">
      <SectionIntro eyebrow="Before you come in" title={"A few useful\nanswers."} description="Still have a question? Bring it with you — we are happy to talk it through." />
      <div className="divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
        {faqs.map((faq, index) => (
          <div key={faq.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-5 py-5 text-left font-bold"
              onClick={() => setActive(active === index ? -1 : index)}
              aria-expanded={active === index}
              data-testid={`button-faq-${index}`}
            >
              <span>{faq.question}</span>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[hsl(var(--border))] transition ${active === index ? "rotate-45 bg-[hsl(var(--primary))] text-[hsl(var(--background))]" : ""}`}>
                <Plus size={15} />
              </span>
            </button>
            {active === index && <p className="max-w-xl pb-5 pr-12 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
