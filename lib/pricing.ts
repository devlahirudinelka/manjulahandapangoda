/**
 * Published price lists, in Sri Lankan rupees (LKR).
 * Edit the numbers here and the Pricing page updates.
 */

export type PriceItem = { label: string; price: number; note?: string };
export type PriceGroup = { title: string; items: PriceItem[] };
export type PriceList = {
  id: string;
  tab: string;
  title: string;
  intro: string;
  groups: PriceGroup[];
  notes: string[];
};

export function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-US")}`;
}

const standardNotes = [
  "Your date is confirmed once an advance of Rs. 30,000 is received. The advance is not refunded on cancellation.",
  "A refundable deposit of Rs. 20,000 is kept with the studio.",
  "Kandyan jewellery sets must be returned on the same day.",
  "Full payment is settled on your trial day.",
];

const shortNotes = [
  "Your date is confirmed once an advance of Rs. 30,000 is received. The advance is not refunded on cancellation.",
  "A refundable deposit of Rs. 20,000 is kept with the studio.",
  "Full payment is settled on your trial day.",
];

const dressing2027: PriceGroup = {
  title: "Dressing charges",
  items: [
    { label: "Bridal", price: 150000 },
    { label: "Bridesmaid", price: 30000, note: "per maid" },
    { label: "Flower girl", price: 5000, note: "each" },
    { label: "Going away", price: 60000 },
    { label: "Homecoming", price: 75000 },
    { label: "Engagement", price: 75000 },
  ],
};

const bouquets: PriceGroup = {
  title: "Bouquet charges",
  items: [
    { label: "Bridal", price: 35000 },
    { label: "Bridesmaid", price: 20000, note: "per maid" },
    { label: "Flower girl", price: 7000, note: "each" },
    { label: "Going away", price: 25000 },
    { label: "Homecoming", price: 25000 },
  ],
};

const other: PriceGroup = {
  title: "Other charges",
  items: [
    { label: "Trial", price: 10000 },
    { label: "Designing", price: 10000 },
    { label: "Bridal nails", price: 10000 },
    { label: "Accessories on rent", price: 2000, note: "maid jewellery" },
    { label: "Kandyan jewellery on rent", price: 30000, note: "per day" },
  ],
};

export const priceLists: PriceList[] = [
  {
    id: "2027",
    tab: "2027",
    title: "2027 rates",
    intro: "For weddings and events in 2027.",
    groups: [dressing2027, bouquets, other],
    notes: standardNotes,
  },
  {
    id: "2028",
    tab: "2028",
    title: "2028 rates",
    intro: "For weddings and events in 2028.",
    groups: [
      {
        ...dressing2027,
        items: dressing2027.items.map((i) =>
          i.label === "Bridal" ? { ...i, price: 200000 } : i,
        ),
      },
      bouquets,
      other,
    ],
    notes: standardNotes,
  },
  {
    id: "homecoming-engagement",
    tab: "Homecoming & Engagement",
    title: "Homecoming & engagement package",
    intro:
      "A simpler package for a combined homecoming and engagement look, 2027 rates.",
    groups: [
      {
        title: "Dressing charges",
        items: [{ label: "Homecoming & engagement", price: 75000 }],
      },
      {
        title: "Bouquet charges",
        items: [{ label: "Bridal", price: 30000 }],
      },
      {
        title: "Other charges",
        items: [
          { label: "Trial", price: 5000 },
          { label: "Accessories on rent", price: 5000 },
        ],
      },
    ],
    notes: shortNotes,
  },
];
