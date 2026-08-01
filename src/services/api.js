export const salonApi = {
  requestAppointment: async (details) => {
    const payload = {
      name: details.name || "",
      phone: details.phone || "",
      email: details.email || "",
      service: details.service || "",
      date: details.date || "",
      time: details.time || "",
      notes: details.notes || "",
      _subject: "New booking enquiry",
    };

    const response = await fetch("http://localhost:3001/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Unable to send booking request.");
    }

    return await response.json();
  },
};