import bridalImage from "../assets/images/bridal-editorial.jpg";
import heroImage from "../assets/images/salon-hero.jpg";
import hairImage from "../assets/images/hair-editorial.jpg";
import studioImage from "../assets/images/studio-detail.jpg";

export const business = {
  name: "The Premium Studio Unisex Salon",
  hindiName: "द प्रीमियम स्टूडियो यूनिसेक्स सालोन",
  category: "Premium Unisex Salon & Beauty Studio",
  rating: "4.8",
  reviews: "141+",
  address: ["Shop No. 2, Oasis Life Society", "Near Indira Nagar Church", "In front of Chirag Medico", "Nashik, Maharashtra – 422009"],
  plusCode: "2QJ7+2V Nashik, Maharashtra",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Premium+Studio+Unisex+Salon+Nashik",
  email: "Visit the studio or send an enquiry",
};

export const navigation = [
  { label: "The studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "The edit", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
];

export const hero = {
  kicker: "A considered approach to beauty",
  title: "Your best hair day,\nmade personal.",
  description: "A quiet, confident beauty studio in Nashik for cuts, colour, skin, grooming and the celebrations that deserve a little more.",
  image: heroImage,
  features: ["Hair & colour", "Skin rituals", "Bridal artistry"],
};

export const services = [
  { id: "hair", title: "Hair, refined", tag: "Cut · colour · care", description: "Thoughtful cuts, dimensional colour and rituals that leave your hair feeling as good as it looks.", items: ["Hair styling", "Hair spa", "Hair colouring", "Hair smoothening", "Keratin treatment"], icon: "scissors" },
  { id: "beauty", title: "Beauty, considered", tag: "Skin · hands · feet", description: "A softer kind of polish, from a reset facial to the final detail of a manicure.", items: ["Facial", "Cleanup", "Manicure", "Pedicure", "Skin care"], icon: "sparkles" },
  { id: "grooming", title: "Grooming, your way", tag: "For him · for them · for all", description: "Easy, precise grooming for every expression, every age and every occasion.", items: ["Beard styling", "Kids haircut", "Everyday styling", "Occasion grooming"], icon: "user-round" },
];

export const pricing = [
  { name: "Signature cut", detail: "Consultation, cut & finish", price: "From ₹450", note: "A considered starting point" },
  { name: "Hair spa ritual", detail: "Deep care, massage & finish", price: "From ₹800", note: "For hair that needs a reset" },
  { name: "Colour story", detail: "Personalised colour consultation", price: "By consultation", note: "Because no two heads are alike" },
  { name: "Skin reset", detail: "Facial or cleanup ritual", price: "From ₹600", note: "Fresh, calm and unhurried" },
];

export const hairTreatments = [
  { title: "Keratin", text: "Smoother movement and a polished finish, tailored to your texture.", number: "01" },
  { title: "Nanoplastia", text: "A modern restorative ritual for softness, shine and manageable hair.", number: "02" },
  { title: "Smoothening", text: "Reduce frizz and rediscover the way your hair falls naturally.", number: "03" },
];

export const bridal = {
  title: "For the day that lives in photographs.",
  description: "Bridal beauty here is collaborative and calm. We listen first, then build the look around you — your features, your outfit, your kind of celebration.",
  image: bridalImage,
  services: ["Bridal makeup", "Groom makeup", "Bridal hair styling", "Pre-event skin preparation"],
};

export const gallery = [
  { title: "The sculpted bob", category: "Hair", image: hairImage, large: true },
  { title: "A softer ritual", category: "The studio", image: studioImage },
  { title: "The bridal edit", category: "Bridal", image: bridalImage },
];

export const transformations = [
  { label: "Texture reset", before: "Before", after: "After", description: "A smoother, lighter finish with movement left intact." },
  { label: "Colour refresh", before: "Before", after: "After", description: "Dimension that catches light without asking for attention." },
];

export const stylists = [
  { name: "The Studio Team", role: "Hair, beauty & bridal artistry", initials: "TS", text: "A multi-disciplinary team that believes the best result starts with listening." },
  { name: "Your consultation", role: "The most important part", initials: "YC", text: "Bring a reference, a feeling or no idea at all. We will find the right direction together." },
];

export const reviews = [
  { quote: "The team understood exactly what I wanted. I walked out feeling like myself, only more put together.", name: "Aditi", meta: "Hair styling · Google review" },
  { quote: "Such a calm, clean studio. The finish was beautiful and the whole experience felt very personal.", name: "Rohan", meta: "Grooming · Google review" },
  { quote: "My bridal trial was relaxed, thoughtful and so flattering. I never felt rushed or overdone.", name: "Neha", meta: "Bridal makeup · Google review" },
];

export const statistics = [
  { value: "4.8", suffix: "/5", label: "Google rating" },
  { value: "141", suffix: "+", label: "real reviews" },
  { value: "17", suffix: "+", label: "ways to feel renewed" },
];

export const hours = [
  { day: "Monday – Saturday", time: "10:00 am — 8:30 pm" },
  { day: "Sunday", time: "11:00 am — 7:00 pm" },
  { day: "Appointments", time: "Recommended for bridal & colour" },
];

export const faqs = [
  { question: "Do I need an appointment?", answer: "Walk-ins are welcome when the studio has availability. For colour, treatments, bridal services and weekends, we recommend booking ahead so your stylist can give you unhurried time." },
  { question: "How do I choose the right hair treatment?", answer: "Start with a consultation. We look at your current hair, texture, goals and maintenance comfort before recommending keratin, nanoplastia or smoothening." },
  { question: "Do you offer services for men and children?", answer: "Yes. The studio is unisex, with grooming, beard styling and kids haircut services alongside our hair, beauty and skin rituals." },
  { question: "How do I book bridal services?", answer: "Send an enquiry with your date and the services you are considering. We will guide you through a consultation and a personalised plan." },
];

export const contact = { whatsappMessage: "Hello, I would like to enquire about an appointment at The Premium Studio.", instagram: "#", phoneAvailable: false };