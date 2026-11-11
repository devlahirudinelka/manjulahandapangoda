import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/photo";
import { BookingBand, PageIntro } from "@/components/sections";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kandyan, Western and Indian bridal dressing, bridal hair & makeup, trials and saree dressing in Colombo, Sri Lanka.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title={<>Bridal styling, <em>start to finish</em></>}>
        <p>
          Dressing, draping, hair and makeup, designed as one complete look and
          tailored to your tradition, your outfit and you.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-7xl space-y-24 px-6 pb-28 lg:space-y-36 lg:px-10 lg:pb-40">
        {services.map((s, i) => (
          <article
            key={s.slug}
            className="grid items-center gap-10 lg:grid-cols-12 lg:gap-20"
          >
            <Link
              href={`/services/${s.slug}`}
              className={`block lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}
              tabIndex={-1}
              aria-hidden
            >
              <Photo
                name={s.cover}
                className="aspect-[4/5]"
                sizes="(min-width: 1024px) 40vw, 100vw"
                preload={i === 0}
                zoom
              />
            </Link>
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
              <p className="eyebrow">
                0{i + 1} · {s.kicker}
              </p>
              <h2 className="display mt-5 text-5xl sm:text-6xl">
                <Link href={`/services/${s.slug}`} className="hover:text-gold">
                  {s.title}
                </Link>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone">
                {s.summary}
              </p>
              <ul className="mt-8 max-w-lg space-y-2 text-sm text-stone">
                {s.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/services/${s.slug}`} className="link-line mt-10">
                View details
              </Link>
            </div>
          </article>
        ))}
      </section>

      <BookingBand />
    </>
  );
}
