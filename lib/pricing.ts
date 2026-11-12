/**
 * Published rates, in Sri Lankan rupees (LKR).
 * Edit the numbers here and the Pricing page updates.
 */

export type PriceItem = {
  /** Stable id, shared across years so a visitor's selection carries over. */
  id: string;
  label: string;
  price: number;
  /** Shown under the label, e.g. "per maid". */
  unit?: string;
  /** Lets the visitor choose a quantity (maids, flower girls, days). */
  countable?: boolean;
  /** Word used in the quantity stepper, e.g. "maids". */
  countLabel?: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  description: string;
  items: PriceItem[];
  note?: string;
};

export type YearRates = { year: string; groups: PriceGroup[] };

export function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-US")}`;
}

function dressing(bridal: number): PriceGroup {
  return {
    id: "dressing",
    title: "Dressing",
    description: "Hair, makeup and dressing for the bride and her party.",
    items: [
      { id: "dressing-bridal", label: "Bridal", price: bridal },
      {
        id: "dressing-maid",
        label: "Bridesmaid",
        price: 30000,
        unit: "per maid",
        countable: true,
        countLabel: "maids",
      },
      {
        id: "dressing-flower-girl",
        label: "Flower girl",
        price: 5000,
        unit: "per flower girl",
        countable: true,
        countLabel: "flower girls",
      },
      { id: "dressing-going-away", label: "Going away", price: 60000 },
      { id: "dressing-homecoming", label: "Homecoming", price: 75000 },
      { id: "dressing-engagement", label: "Engagement", price: 75000 },
    ],
  };
}

const bouquets: PriceGroup = {
  id: "bouquets",
  title: "Bouquets",
  description: "Fresh bouquets designed to match each look.",
  items: [
    { id: "bouquet-bridal", label: "Bridal", price: 35000 },
    {
      id: "bouquet-maid",
      label: "Bridesmaid",
      price: 20000,
      unit: "per maid",
      countable: true,
      countLabel: "maids",
    },
    {
      id: "bouquet-flower-girl",
      label: "Flower girl",
      price: 7000,
      unit: "per flower girl",
      countable: true,
      countLabel: "flower girls",
    },
    { id: "bouquet-going-away", label: "Going away", price: 25000 },
    { id: "bouquet-homecoming", label: "Homecoming", price: 25000 },
  ],
};

const extras: PriceGroup = {
  id: "extras",
  title: "Extras",
  description: "Trials, design and rentals to complete the day.",
  items: [
    { id: "extra-trial", label: "Trial", price: 10000 },
    { id: "extra-designing", label: "Designing", price: 10000 },
    { id: "extra-nails", label: "Bridal nails", price: 10000 },
    {
      id: "extra-maid-jewellery",
      label: "Maid jewellery on rent",
      price: 2000,
      unit: "per maid",
      countable: true,
      countLabel: "maids",
    },
    {
      id: "extra-kandyan-jewellery",
      label: "Kandyan jewellery on rent",
      price: 30000,
      unit: "per day",
      countable: true,
      countLabel: "days",
    },
  ],
  note: "Kandyan jewellery sets are returned on the same day.",
};

export const rates: YearRates[] = [
  { year: "2027", groups: [dressing(150000), bouquets, extras] },
  { year: "2028", groups: [dressing(200000), bouquets, extras] },
];

/** Selected by default so the estimate starts from something meaningful. */
export const defaultSelection: Record<string, number> = { "dressing-bridal": 1 };

/** Smaller combined package from the separate 2027 price sheet. */
export const homecomingPackage = {
  title: "Homecoming & Engagement",
  year: "2027",
  intro:
    "A lighter package for a combined homecoming and engagement look.",
  items: [
    { label: "Homecoming & engagement dressing", price: 75000 },
    { label: "Bridal bouquet", price: 30000 },
    { label: "Trial", price: 5000 },
    { label: "Accessories on rent", price: 5000 },
  ],
};

export const bookingSteps = [
  {
    amount: 30000,
    title: "Reserve your date",
    text: "An advance of Rs. 30,000 confirms your date. It is not refunded on cancellation.",
  },
  {
    amount: 20000,
    title: "Refundable deposit",
    text: "A deposit of Rs. 20,000 is kept with the studio and is refundable.",
  },
  {
    amount: null,
    title: "Settle on your trial day",
    text: "The full payment is settled on the day of your trial.",
  },
] as const;
