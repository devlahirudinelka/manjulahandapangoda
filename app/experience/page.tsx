import type { Metadata } from "next";
import { Photo } from "@/components/photo";
import { BookingBand, PageIntro, SectionHeading } from "@/components/sections";
import { faqs, journey } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Bridal Experience & FAQs",
  description:
    "How bridal styling with Manjula Handapangoda works, from consultation and trial to the wedding morning, plus answers to common questions.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro eyebrow="The experience" title={<>Calm, considered, <em>completely yours</em></>}>
        <p>
          Your wedding morning should feel unhurried. Here is how we get you
          there, step by step.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10 lg:pb-36">
        <Photo name="couple" className="aspect-[16/9] lg:aspect-[21/9]" sizes="100vw" preload />
        <ol className="mx-auto mt-20 max-w-4xl">
          {journey.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-4 border-t border-line py-10 sm:grid-cols-[8rem_1fr] sm:gap-10"
            >
              <span className="display text-6xl text-gold">0{i + 1}</span>
              <div>
                <h2 className="display text-3xl sm:text-4xl">{step.title}</h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper py-28 lg:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="Questions" title="Frequently asked" />
          <div className="mt-14 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <span className="display text-2xl">{f.q}</span>
                  <span
                    aria-hidden
                    className="text-2xl font-light text-gold transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-stone">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BookingBand photo="bouquet" />
    </>
  );
}
