import { Star } from "lucide-react";
import SectionIntro from "../common/SectionIntro";
import { useBusiness, useReviews } from "../../hooks/useSalonData";

function ReviewsSection() {
  const reviews = useReviews();
  const business = useBusiness();

  return (
    <section id="reviews" className="bg-[hsl(var(--accent))] py-24 text-[hsl(var(--background))] md:py-32">
      <div className="section-wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro eyebrow="Kind words, kept" title={"The best part is\nhearing it back."} light />
          <div className="mb-12 flex items-center gap-3">
            <Star fill="currentColor" size={18} className="text-[hsl(var(--secondary))]" />
            <span className="text-2xl font-bold">{business.rating}</span>
            <span className="text-xs text-[hsl(var(--background)/.7)]">from {business.reviews} Google Reviews</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.name} className="flex min-h-[250px] flex-col justify-between rounded-[1.5rem] border border-[hsl(var(--background)/.22)] p-6">
              <div className="flex gap-1 text-[hsl(var(--secondary))]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={13} fill="currentColor" />
                ))}
              </div>
              <blockquote className="serif text-2xl leading-tight">“{review.quote}”</blockquote>
              <figcaption>
                <p className="text-sm font-bold">{review.name}</p>
                <p className="eyebrow mt-1 text-[hsl(var(--background)/.58)]">{review.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
