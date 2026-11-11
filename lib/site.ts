import type { PhotoKey } from "./images";

export const site = {
  name: "Manjula Handapangoda",
  brand: "Manjula Handapangoda Bridal",
  description:
    "Bridal dresser, fashion stylist and hair & makeup artist in Colombo, Sri Lanka. Sophisticated, timeless Kandyan, Western and Indian bridal looks.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manjula.ceylexa.com",
  phone: "+94 77 626 1006",
  phoneHref: "tel:+94776261006",
  whatsapp: "94776261006",
  email: "info.ManjulaStudio@gmail.com",
  addressLine: "Sri Jayawardenepura Kotte",
  city: "Colombo, Sri Lanka",
  plusCode: "VWVH+H33",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=VWVH%2BH33%2C%20Sri%20Jayawardenepura%20Kotte%2C%20Sri%20Lanka",
  mapsEmbed:
    "https://www.google.com/maps?q=VWVH%2BH33%2C%20Sri%20Jayawardenepura%20Kotte%2C%20Sri%20Lanka&output=embed",
  facebook: "https://www.facebook.com/ManjulaHandapangodaBridal/",
  instagram: "https://www.instagram.com/manjulahandapangodabridal/",
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export type Service = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  intro: string[];
  includes: string[];
  idealFor: string;
  cover: PhotoKey;
  hero: PhotoKey;
  looks: PhotoKey[];
};

export const services: Service[] = [
  {
    slug: "kandyan-bridal",
    title: "Kandyan Bridal",
    kicker: "Regal & traditional",
    summary:
      "The regal elegance of the traditional Kandyan bride, dressed with care for every heirloom detail.",
    intro: [
      "The Kandyan bride carries centuries of Sri Lankan tradition: the osariya drape, the nalal patiya resting on the forehead, layers of gold at the neckline. Getting it right means understanding what each piece means, as well as how it should sit.",
      "Manjula dresses the Kandyan bride with a quiet, considered hand, balancing tradition with a fresh, modern finish so the look feels true to heritage and true to you.",
    ],
    includes: [
      "Consultation on saree, jewellery and overall look",
      "Traditional osariya draping and dressing",
      "Placement of the nalal patiya and full jewellery set",
      "Bridal hair, including classic konde styles",
      "Long-wear bridal makeup suited to your skin",
    ],
    idealFor: "Poruwa ceremonies and traditional Sri Lankan weddings.",
    cover: "kandyanCover",
    hero: "terrace",
    looks: ["kandyanIvory", "kandyanProfile", "goldGaze", "kandyanSilver"],
  },
  {
    slug: "western-bridal",
    title: "Western Bridal",
    kicker: "Refined glamour",
    summary:
      "Clean lines, luminous skin and soft, romantic hair for the refined Western bride.",
    intro: [
      "A Western bridal look lives in the details: skin that glows rather than shines, a veil that falls exactly right, hair that holds through the first dance.",
      "From classic chignons to loose, polished waves, each look is designed around your gown, your neckline and the feel of your celebration.",
    ],
    includes: [
      "Consultation on gown, veil and accessories",
      "Bridal hair, from sleek updos to soft waves",
      "Veil and headpiece placement",
      "Luminous, photograph-ready bridal makeup",
      "Final dressing and styling before you leave",
    ],
    idealFor: "Church ceremonies, garden weddings and evening receptions.",
    cover: "westernCover",
    hero: "bouquet",
    looks: ["westernVeil", "laceVeil", "westernFull", "softGlam"],
  },
  {
    slug: "indian-bridal",
    title: "Indian Bridal",
    kicker: "Vibrant sophistication",
    summary:
      "Rich colour, statement jewellery and defined, radiant makeup for the Indian bride.",
    intro: [
      "Indian bridal fashion is bold and joyful. Deep reds and jewel tones, the maang tikka, layers of gold, eyes that hold their own against all of it.",
      "Manjula brings that richness together with balance and polish, so the jewellery, the drape and the makeup work as one.",
    ],
    includes: [
      "Consultation on outfit, jewellery and colour story",
      "Saree or lehenga dressing and dupatta draping",
      "Maang tikka, nath and jewellery placement",
      "Defined, long-wear bridal makeup",
      "Bridal hair styled to suit your jewellery",
    ],
    idealFor: "Indian and fusion weddings, mehendi and reception looks.",
    cover: "indianCover",
    hero: "goldDetail",
    looks: ["indianRed", "indianPurple", "sareeGarden"],
  },
  {
    slug: "hair-and-makeup",
    title: "Bridal Hair & Makeup",
    kicker: "Trials to final touches",
    summary:
      "Trials, touch-ups and full wedding-day styling, so you feel entirely like yourself, only more radiant.",
    intro: [
      "Every look begins with your features. Before the day, a trial lets us refine colour, coverage and hairstyle until it feels like you.",
      "On the morning itself, the focus is calm and precision: makeup made to last through tears, heat and photographs, and hair that stays in place from ceremony to reception.",
    ],
    includes: [
      "Pre-wedding consultation",
      "Bridal hair and makeup trial",
      "Wedding-day hair and makeup",
      "Touch-ups for photographs and outfit changes",
      "Homecoming and engagement looks",
    ],
    idealFor: "Brides of every style, plus homecoming and engagement days.",
    cover: "goldGlow",
    hero: "goldDetail",
    looks: ["goldPortrait", "goldGaze", "kandyanWhite", "softGlam"],
  },
  {
    slug: "occasion-dressing",
    title: "Occasion Dressing",
    kicker: "Saree draping & styling",
    summary:
      "Saree draping, hair and makeup for bridesmaids, family members and special occasions.",
    intro: [
      "Not every look is bridal. For bridesmaids, mothers of the bride, engagements and celebrations, the same eye for detail goes into a perfectly pleated saree and a finish that suits the occasion.",
    ],
    includes: [
      "Saree draping in Kandyan (osariya) and Indian styles",
      "Hair styling",
      "Occasion makeup",
      "Group bookings for bridesmaids and family",
    ],
    idealFor: "Bridesmaids, family of the couple and special events.",
    cover: "sareeGarden",
    hero: "couple",
    looks: ["kandyanSilver", "kandyanWhite", "kandyanGold"],
  },
];

export const bridalStyles = services.slice(0, 3);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const journey = [
  {
    title: "Consultation",
    text: "We talk through your date, your attire, your jewellery and the feeling you want on the day. Bring photos of your outfit and any looks you love.",
  },
  {
    title: "Trial",
    text: "A full hair and makeup trial lets us test colour, coverage and hairstyle together, and adjust until the look feels completely like you.",
  },
  {
    title: "Wedding morning",
    text: "A calm, unhurried morning. Dressing, draping, hair and makeup are done in a planned order so you are ready on time and at ease.",
  },
  {
    title: "Final touches",
    text: "Last details are checked before you leave: the drape, the jewellery, the veil. Touch-ups can be arranged for photographs and outfit changes.",
  },
];

export const faqs = [
  {
    q: "How far in advance should I book?",
    a: "Wedding dates, especially during the auspicious seasons, fill early. We recommend getting in touch as soon as your date is confirmed so we can hold it for you.",
  },
  {
    q: "Do I need a trial?",
    a: "A trial is strongly recommended. It is the best way to perfect your look before the day and to make sure the hair and makeup suit your outfit and jewellery.",
  },
  {
    q: "Which bridal styles do you specialise in?",
    a: "Kandyan, Western and Indian bridal styling, along with homecoming and engagement looks, and saree dressing for bridesmaids and family.",
  },
  {
    q: "Can you come to my hotel or venue?",
    a: "Share your venue and timings when you enquire and we will confirm availability and any travel arrangements for your day.",
  },
  {
    q: "What should I bring to the consultation?",
    a: "Photos of your outfit, your jewellery (or photos of it), your venue and timings, and any inspiration images you love.",
  },
  {
    q: "How much does bridal styling cost?",
    a: "Our full 2027 and 2028 rates are on the Pricing page, covering dressing, bouquets, trials and jewellery rental.",
  },
  {
    q: "How do I confirm my booking?",
    a: "Send an enquiry by WhatsApp, phone or email with your date. Your date is confirmed once an advance of Rs. 30,000 is received; it is not refunded on cancellation. A refundable deposit of Rs. 20,000 is also kept, and full payment is settled on your trial day.",
  },
];
