import type { Metadata } from "next";
import { BookingBand, PageIntro } from "@/components/sections";
import { PricingTabs } from "./pricing-tabs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Bridal dressing, bouquet and styling rates for 2027 and 2028, plus a homecoming & engagement package, from Manjula Handapangoda Bridal Salon.",
};

export default function PricingPage() {
  return (
    <>
      <PageIntro eyebrow="Pricing" title={<>Clear, <em>honest rates</em></>}>
        <p>
          Our rates for 2027 and 2028. All prices are in Sri Lankan rupees.
          Message us your date and we’ll prepare a quotation for your day.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-3xl px-6 pb-28 lg:pb-40">
        <PricingTabs />
      </section>

      <BookingBand photo="goldDetail" title="Ready to reserve your date?" />
    </>
  );
}
