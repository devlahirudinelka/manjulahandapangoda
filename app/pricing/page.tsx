import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageIntro, SectionHeading } from "@/components/sections";
import { bookingSteps, formatPrice } from "@/lib/pricing";
import { PricingPlans } from "./pricing-plans";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Bridal dressing, bouquet and styling rates for 2027 and 2028, plus a homecoming & engagement package, from Manjula Handapangoda Bridal Salon.",
  path: "/pricing",
  image: "pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageIntro eyebrow="Pricing" title={<>Clear, <em>honest rates</em></>}>
        <p>
          Three ways to begin, priced for the year of your wedding. Build an
          exact estimate further down.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10 lg:pb-36">
        <PricingPlans />
      </section>

      {/* Booking steps */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <SectionHeading eyebrow="Booking" title="How booking works" />
        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          <span
            aria-hidden
            className="absolute top-3 right-[16%] left-[16%] hidden h-px bg-line md:block"
          />
          {bookingSteps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              data-reveal-delay={i}
              className="relative text-center"
            >
              <span className="relative mx-auto flex h-6 w-6 items-center justify-center rounded-full border border-gold bg-ivory text-[0.65rem] text-gold">
                {i + 1}
              </span>
              <p className="display mt-8 text-4xl tabular-nums lining-nums text-gold">
                {step.amount ? formatPrice(step.amount) : "Balance"}
              </p>
              <h3 className="display mt-3 text-2xl">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-stone">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
