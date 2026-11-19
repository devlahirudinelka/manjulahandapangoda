"use client";

import { useState } from "react";
import {
  formatPrice,
  homecomingPackage,
  rates,
  type PriceItem,
} from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";
import { PriceEstimator } from "./price-estimator";

type Feature = { label: string; price?: number; unit?: string };

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceNote: string;
  featured?: boolean;
  badge?: string;
  groups: { title?: string; features: Feature[] }[];
  enquiry: string;
};

function find(items: PriceItem[], id: string) {
  const item = items.find((i) => i.id === id);
  if (!item) throw new Error(`Missing price item: ${id}`);
  return item;
}

function feature(
  item: PriceItem,
  label = item.label,
  unit = item.unit,
): Feature {
  return {
    label,
    price: item.price,
    unit: unit
      ?.replace("per ", "each ")
      .replace("each maid", "each")
      .replace("each flower girl", "each"),
  };
}

function buildPlans(yearIndex: number): Plan[] {
  const year = rates[yearIndex];
  const items = year.groups.flatMap((g) => g.items);
  const pkgTotal = homecomingPackage.items.reduce((s, i) => s + i.price, 0);
  const bridal = find(items, "dressing-bridal");

  return [
    {
      id: "homecoming",
      name: homecomingPackage.title,
      description:
        "A lighter, all-in package for a combined homecoming and engagement look.",
      price: pkgTotal,
      priceNote: `Package · ${homecomingPackage.year} rate`,
      groups: [
        {
          features: homecomingPackage.items.map((i) => ({
            label: i.label,
            price: i.price,
          })),
        },
      ],
      enquiry: `Hello! I'd like a quote for the ${homecomingPackage.title} package (${homecomingPackage.year} rates).`,
    },
    {
      id: "bridal",
      name: "Bridal",
      description: "Your wedding-day look, styled Kandyan, Western or Indian.",
      price: bridal.price,
      priceNote: `Bridal dressing · ${year.year}`,
      featured: true,
      badge: "Signature",
      groups: [
        {
          features: [
            { label: "Bridal dressing" },
            { label: "Kandyan, Western or Indian styling" },
          ],
        },
        {
          title: "Add as you like",
          features: [
            feature(find(items, "extra-trial")),
            feature(find(items, "bouquet-bridal"), "Bridal bouquet"),
            feature(find(items, "extra-nails")),
            feature(find(items, "extra-designing")),
            feature(
              find(items, "extra-kandyan-jewellery"),
              "Kandyan jewellery on rent",
              "per day",
            ),
          ],
        },
      ],
      enquiry: `Hello! I'd like a quote for bridal dressing (${year.year} rates).`,
    },
    {
      id: "party",
      name: "Bridal Party",
      description:
        "Dress your maids, flower girls and going-away look to match.",
      price: find(items, "dressing-maid").price,
      priceNote: "Per bridesmaid",
      groups: [
        {
          features: [
            feature(find(items, "dressing-maid"), "Bridesmaid dressing"),
            feature(
              find(items, "dressing-flower-girl"),
              "Flower girl dressing",
            ),
            feature(find(items, "bouquet-maid"), "Bridesmaid bouquet"),
            feature(find(items, "bouquet-flower-girl"), "Flower girl bouquet"),
            feature(
              find(items, "extra-maid-jewellery"),
              "Maid jewellery on rent",
            ),
            feature(find(items, "dressing-going-away"), "Going-away dressing"),
            feature(find(items, "bouquet-going-away"), "Going-away bouquet"),
          ],
        },
      ],
      enquiry: `Hello! I'd like a quote for my bridal party (${year.year} rates). Number of maids: , flower girls: `,
    },
  ];
}

function Check({ featured }: { featured?: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-0.5 flex size-[1.15rem] shrink-0 items-center justify-center rounded-full ${
        featured ? "bg-gold text-paper" : "bg-sand text-gold"
      }`}
    >
      <svg
        viewBox="0 0 12 12"
        className="size-2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M2.5 6.2 5 8.5l4.5-5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const f = plan.featured;
  return (
    <article
      data-reveal
      data-reveal-delay={index}
      aria-labelledby={`plan-${plan.id}`}
      className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
        f
          ? "border-gold-soft bg-gradient-to-b from-[#fbf3e2] via-[#fdf8ee] to-paper shadow-[0_24px_60px_-28px_rgba(162,131,74,0.45)] lg:-my-4 lg:py-12"
          : "border-line bg-paper shadow-[0_10px_40px_-30px_rgba(31,28,24,0.35)]"
      }`}
    >
      {plan.badge ? (
        <p className="mb-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft py-2 text-[0.66rem] font-normal uppercase tracking-[0.28em] text-paper shadow-[0_6px_16px_-8px_rgba(162,131,74,0.8)]">
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="size-3"
            fill="currentColor"
          >
            <path d="M8 0l1.6 5.1L15 6.6l-4.4 3 1.6 5.4L8 11.8 3.8 15l1.6-5.4L1 6.6l5.4-1.5z" />
          </svg>
          {plan.badge}
        </p>
      ) : null}

      <h3 id={`plan-${plan.id}`} className="display text-[2rem]">
        {plan.name}
      </h3>
      <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-stone">
        {plan.description}
      </p>

      <div className="mt-6">
        <p
          key={plan.price}
          className="display rise text-5xl tabular-nums lining-nums"
        >
          {formatPrice(plan.price)}
        </p>
        <p className="mt-2 text-[0.68rem] uppercase tracking-[0.24em] text-stone">
          {plan.priceNote}
        </p>
      </div>

      <div className={`my-7 h-px ${f ? "bg-gold-soft/60" : "bg-line"}`} />

      <div className="space-y-6">
        {plan.groups.map((g, gi) => (
          <div key={gi}>
            {g.title ? (
              <p className="mb-3 text-[0.66rem] uppercase tracking-[0.26em] text-gold">
                {g.title}
              </p>
            ) : null}
            <ul className="space-y-3.5">
              {g.features.map((ft) => (
                <li
                  key={ft.label}
                  className="flex items-start gap-3 text-[0.95rem]"
                >
                  <Check featured={f} />
                  <span className="flex-1">{ft.label}</span>
                  {ft.price ? (
                    <span className="shrink-0 text-right text-sm tabular-nums lining-nums text-stone">
                      {formatPrice(ft.price)}
                      {ft.unit ? (
                        <span className="block text-[0.7rem] text-stone/70">
                          {ft.unit}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-10">
        <a
          href={whatsappLink(plan.enquiry)}
          target="_blank"
          rel="noopener noreferrer"
          className={`block rounded-full py-3.5 text-center text-sm tracking-wide transition-all duration-300 ${
            f
              ? "bg-gradient-to-r from-gold to-gold-soft text-paper shadow-[0_10px_24px_-12px_rgba(162,131,74,0.9)] hover:brightness-105"
              : "border border-line bg-paper hover:border-ink"
          }`}
        >
          Request a quote
        </a>
      </div>
    </article>
  );
}

export function PricingPlans() {
  const [yearIndex, setYearIndex] = useState(0);
  const plans = buildPlans(yearIndex);

  return (
    <>
      <div className="flex justify-center">
        <div
          role="radiogroup"
          aria-label="Rates for year"
          className="relative grid grid-cols-2 rounded-full border border-line bg-paper p-1"
        >
          <span
            aria-hidden
            className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.2,0.6,0.2,1)]"
            style={{ transform: `translateX(${yearIndex * 100}%)` }}
          />
          {rates.map((r, i) => (
            <button
              key={r.year}
              type="button"
              role="radio"
              aria-checked={i === yearIndex}
              onClick={() => setYearIndex(i)}
              className={`relative z-10 px-10 py-3 text-[0.72rem] uppercase tracking-[0.3em] transition-colors duration-500 ${
                i === yearIndex ? "text-paper" : "text-stone hover:text-ink"
              }`}
            >
              {r.year}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-5">
        {plans.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} index={i} />
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-stone">
        All prices in Sri Lankan rupees. Mix and match below for an exact
        estimate.
      </p>

      <div id="estimate" className="mt-28 lg:mt-36">
        <div className="mb-14 text-center">
          <p className="eyebrow">Build your own</p>
          <h2 className="display mt-5 text-4xl sm:text-5xl">
            Your <em>estimate</em>, {rates[yearIndex].year}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-stone">
            Tick what you need and send the list to us on WhatsApp.
          </p>
        </div>
        <PriceEstimator yearIndex={yearIndex} onYearChange={setYearIndex} />
      </div>
    </>
  );
}
