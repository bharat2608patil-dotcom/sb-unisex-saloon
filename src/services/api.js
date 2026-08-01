export const salonApi = {
  requestAppointment: async (details) => {
    const payload = {
      name: details.name,
      phone: details.phone,
      email: details.email,
      service: details.service,
      date: details.date,
      time: details.time,
      notes: details.notes,
      _subject: "New Booking Request",
    };

    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Unable to send booking request.");
    }

    return result;
  },
};