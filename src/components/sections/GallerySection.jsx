import SectionIntro from "../common/SectionIntro";
import { useGallery } from "../../hooks/useSalonData";
import { img } from "../../utils/image";

function GallerySection() {
  const gallery = useGallery();

  return (
    <section id="gallery" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] md:py-32">
      <div className="section-wrap">
        <SectionIntro eyebrow="The visual diary" title={"A few things we've\nbeen making."} light />
        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-[260px_260px]">
          {gallery.map((item, index) => (
            <article key={item.title} className={`image-frame relative overflow-hidden rounded-[1.5rem] ${index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}>
              <img loading="lazy" src={img(item.image)} alt={item.title} className="image-hover h-full min-h-[240px] w-full object-cover opacity-90" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[hsl(var(--primary)/.9)] to-transparent p-5 pt-16">
                <p className="eyebrow text-[hsl(var(--secondary))]">{item.category}</p>
                <h3 className="serif mt-1 text-2xl">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
