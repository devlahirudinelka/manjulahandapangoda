import type { Metadata } from "next";
import { Photo } from "@/components/photo";
import { PageIntro, SectionHeading } from "@/components/sections";
import { bookingSteps, formatPrice, homecomingPackage } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";
import { PriceEstimator } from "./price-estimator";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Bridal dressing, bouquet and styling rates for 2027 and 2028, plus a homecoming & engagement package, from Manjula Handapangoda Bridal Salon.",
};

export default function PricingPage() {
  const pkgTotal = homecomingPackage.items.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <PageIntro eyebrow="Pricing" title={<>Clear, <em>honest rates</em></>}>
        <p>
          Choose your year, tick what you need and see an estimate straight
          away. All prices are in Sri Lankan rupees.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10 lg:pb-36">
        <PriceEstimator />
      </section>

      {/* Homecoming & engagement package */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <Photo
            name="sareeGarden"
            className="aspect-[4/3] lg:aspect-auto lg:min-h-[640px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div data-reveal className="px-6 py-20 lg:px-16 lg:py-24">
            <p className="eyebrow !text-gold-soft">
              Package · {homecomingPackage.year} rates
            </p>
            <h2 className="display mt-5 text-5xl">{homecomingPackage.title}</h2>
            <p className="mt-5 max-w-md text-paper/70">{homecomingPackage.intro}</p>
            <ul className="mt-10">
              {homecomingPackage.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-end gap-4 border-b border-paper/10 py-4"
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden
                    className="mb-1.5 flex-1 border-b border-dotted border-paper/25"
                  />
                  <span className="display text-xl tabular-nums lining-nums">
                    {formatPrice(item.price)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-end justify-between">
              <span className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/60">
                All four together
              </span>
              <span className="display text-4xl tabular-nums lining-nums">
                {formatPrice(pkgTotal)}
              </span>
            </div>
            <a
              href={whatsappLink(
                `Hello! I'm interested in the ${homecomingPackage.title} package (${homecomingPackage.year} rates).`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light mt-10"
            >
              Ask about this package
            </a>
          </div>
        </div>
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
