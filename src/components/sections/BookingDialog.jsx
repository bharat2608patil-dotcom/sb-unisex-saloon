import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { salonApi } from "../../services/api";
import { useContact, useServices } from "../../hooks/useSalonData";

function BookingDialog({ onClose }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({
    name: "bharat",
    phone: "9999999999",
    email: "bharat2611patil@gmail.com",
    service: "Beard Styling",
    date: "2026-08-27",
    time: "23:59",
    notes: "",
  });

  const [error, setError] = useState("");
  const [autoOpenWhatsApp, setAutoOpenWhatsApp] = useState(false);

  const services = useServices();
  const contact = useContact();

  const buildWhatsAppMessage = (bookingForm) => {
    return [
      "Hello,",
      "",
      "I would like to confirm my booking.",
      "",
      `Name: ${bookingForm.name || "Not provided"}`,
      `Phone: ${bookingForm.phone || "Not provided"}`,
      `Email: ${bookingForm.email || "Not provided"}`,
      `Service: ${bookingForm.service || "Not provided"}`,
      `Preferred Date: ${bookingForm.date || "Not provided"}`,
      `Preferred Time: ${bookingForm.time || "Not provided"}`,
      `Additional Notes: ${bookingForm.notes || "Not provided"}`,
      "",
      "Please confirm my appointment.",
      "",
      "Thank you.",
    ].join("\n");
  };

  const openWhatsApp = () => {
    const message = buildWhatsAppMessage(form);
    const normalizedPhone = String(contact.phone || "").replace(/[^\d]/g, "");

    const whatsappUrl = normalizedPhone
      ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  const validateForm = () => {
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();

    if (!/^[A-Za-z ]{2,50}$/.test(name)) {
      return "Please enter a valid name.";
    }

    if (!/^\d{10}$/.test(phone)) {
      return "Phone number must contain exactly 10 digits.";
    }

    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      return "Please enter a valid email address.";
    }

    if (!form.service) {
      return "Please select a service.";
    }

    if (!form.date || !form.time) {
      return "Please select preferred date and time.";
    }

    const selectedDateTime = new Date(`${form.date}T${form.time}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      return "Preferred appointment must be in the future.";
    }

    return "";
  };

  const submit = async (event) => {
    event.preventDefault();

    if (step === "loading") {
      return;
    }

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setStep("loading");

    try {
      await salonApi.requestAppointment(form);

      if (autoOpenWhatsApp) {
        openWhatsApp();
        onClose();
        return;
      }

      setStep("confirm");
    } catch {
      setError("We couldn't send your request right now. Please try again.");
      setStep("form");
    }
  };

  const handleConfirm = (shouldOpenWhatsApp) => {
    if (shouldOpenWhatsApp) {
      openWhatsApp();
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[hsl(var(--primary)/.72)] p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
    >
      <div className="relative max-h-[90dvh] w-full max-w-lg overflow-auto rounded-[2rem] bg-[hsl(var(--background))] p-7 shadow-2xl md:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 hover:bg-[hsl(var(--muted))]"
          aria-label="Close booking dialog"
          data-testid="button-close-booking"
        >
          <X size={19} />
        </button>

        {step === "confirm" ? (
          <div className="py-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[hsl(var(--secondary))]">
              <Check size={25} />
            </span>

            <p className="eyebrow mt-7 text-[hsl(var(--accent))]">
              Booking request sent
            </p>

            <h2 className="serif mt-3 text-4xl">
              Your booking request has been sent successfully.
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              Would you also like to confirm your booking on WhatsApp?
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                className="btn-primary"
                onClick={() => handleConfirm(true)}
                data-testid="button-booking-whatsapp-yes"
              >
                Yes
              </button>

              <button
                className="btn-outline"
                onClick={() => handleConfirm(false)}
                data-testid="button-booking-whatsapp-no"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow text-[hsl(var(--accent))]">
              Start with a hello
            </p>

            <h2 className="serif mt-3 text-4xl">
              Let’s find your time.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              Tell us a little about what you're looking for. This is an enquiry,
              not a commitment.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-4">              <label className="block">
                <span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">
                  Your name
                </span>

                <input
                  required
                  maxLength={50}
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value.replace(/[^A-Za-z\s]/g, ""),
                    })
                  }
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]"
                  placeholder="How should we call you?"
                  data-testid="input-booking-name"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">
                    Phone
                  </span>

                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]"
                    placeholder="10-digit mobile number"
                    data-testid="input-booking-phone"
                  />
                </label>

                <label className="block">
                  <span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">
                    Email
                  </span>

                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value.trim(),
                      })
                    }
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]"
                    placeholder="example@gmail.com"
                    data-testid="input-booking-email"
                  />
                </label>
              </div>

              <label className="block">
                <span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">
                  What are you considering?
                </span>

                <select
                  required
                  value={form.service}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      service: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]"
                  data-testid="select-booking-service"
                >
                  <option value="">Choose a service</option>

                  {services.flatMap((category, categoryIndex) =>
                    category.items.map((item, itemIndex) => (
                      <option
                        key={`${category.title}-${item}-${itemIndex}`}
                        value={item}
                      >
                        {item}
                      </option>
                    ))
                  )}
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">
                    Preferred date
                  </span>

                  <input
                    required
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]"
                    data-testid="input-booking-date"
                  />
                </label>

                <label>
                  <span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">
                    Preferred time
                  </span>

                  <input
                    required
                    type="time"
                    value={form.time}
                    min={
                      form.date === new Date().toISOString().split("T")[0]
                        ? new Date(Date.now() + 5 * 60000)
                            .toTimeString()
                            .slice(0, 5)
                        : undefined
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        time: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]"
                    data-testid="input-booking-time"
                  />
                </label>
              </div>

              <label className="block">
                <span className="eyebrow mb-2 block text-[hsl(var(--muted-foreground))]">
                  Additional notes
                </span>

                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value,
                    })
                  }
                  className="min-h-[100px] w-full rounded-xl border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-[hsl(var(--accent))]"
                  placeholder="Tell us a little more if you'd like"
                  data-testid="input-booking-notes"
                />
              </label>

              <label className="flex items-center justify-between gap-3 rounded-xl border border-[hsl(var(--border))] px-4 py-3">
                <span className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  Automatically open WhatsApp after email confirmation
                </span>

                <input
                  type="checkbox"
                  checked={autoOpenWhatsApp}
                  onChange={(e) =>
                    setAutoOpenWhatsApp(e.target.checked)
                  }
                  className="h-5 w-5 rounded border-[hsl(var(--border))] accent-[hsl(var(--accent))]"
                  data-testid="toggle-booking-whatsapp"
                />
              </label>

              {error && (
                <p className="text-sm text-[hsl(var(--destructive))]">
                  {error}
                </p>
              )}

              <button
                disabled={step === "loading"}
                className="btn-primary mt-3 w-full disabled:cursor-not-allowed disabled:opacity-60"
                data-testid="button-submit-booking"
              >
                {step === "loading"
                  ? "Sending your enquiry…"
                  : "Send appointment enquiry"}

                <ArrowRight size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingDialog;