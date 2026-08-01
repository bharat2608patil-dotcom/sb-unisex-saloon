function SectionIntro({ eyebrow, title, description, light = false }) {
  return (
    <div className={`mb-12 max-w-3xl ${light ? "text-[hsl(var(--background))]" : ""}`}>
      <p className={`eyebrow mb-5 ${light ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--accent))]"}`}>{eyebrow}</p>
      <h2 className="section-title whitespace-pre-line">{title}</h2>
      {description && (
        <p className={`mt-6 max-w-xl text-base leading-7 ${light ? "text-[hsl(var(--background)/.68)]" : "text-[hsl(var(--muted-foreground))]"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionIntro;
