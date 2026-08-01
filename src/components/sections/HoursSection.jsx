import { CalendarDays } from "lucide-react";
import { useWorkingHours } from "../../hooks/useSalonData";

function HoursSection({ onBook }) {
  const hours = useWorkingHours();

  return (
    <section className="bg-[hsl(var(--muted))] py-20">
      <div className="section-wrap grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="eyebrow text-[hsl(var(--accent))]">Make some time</p>
          <h2 className="serif mt-4 text-4xl md:text-5xl">The door is open.</h2>
        </div>
        <div className="grid gap-3 text-sm md:min-w-[450px]">
          {hours.map((item) => (
            <div key={item.day} className="flex justify-between gap-8 border-b border-[hsl(var(--border))] pb-3">
              <span className="font-semibold">{item.day}</span>
              <span className="text-[hsl(var(--muted-foreground))]">{item.time}</span>
            </div>
          ))}
          <button className="btn-primary mt-4 w-fit" onClick={onBook} data-testid="button-hours-book">
            <CalendarDays size={16} /> Start an appointment
          </button>
        </div>
      </div>
    </section>
  );
}

export default HoursSection;
