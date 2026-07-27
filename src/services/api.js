export const salonApi = {
  requestAppointment: async (details) => {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { ok: true, details };
  },
};