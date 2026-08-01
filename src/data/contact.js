const phone = "919850785148";
const whatsappMessage =
  "Hello, I'd like to book an appointment at SB Unisex Salon.";

export const contact = {
  whatsappMessage,
  instagram: "#",
  email: "bharat2611patil@gmail.com",
  phone: "+91 98507 85148",
  phoneAvailable: true,
  whatsappUrl: `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(
    whatsappMessage
  )}&type=phone_number&app_absent=0`,
};