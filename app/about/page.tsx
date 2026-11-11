import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/photo";
import { BookingBand, Ornament, PageIntro, SectionHeading } from "@/components/sections";
import { bridalStyles } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Manjula",
  description:
    "Manjula Handapangoda is a Colombo-based bridal dresser, fashion stylist and hair & makeup artist specialising in Kandyan, Western and Indian bridal styling.",
};

const values = [
  {
    title: "Individuality",
    text: "Every look is designed around the bride: her personality, her features, her attire and the theme of her wedding.",
  },
  {
    title: "Tradition",
    text: "A deep understanding of the cultural elements and fashion traditions behind each bridal style, honoured in every detail.",
  },
  {
    title: "Precision",
    text: "Artistry paired with precision: the pleat of a drape, the placement of jewellery, makeup that lasts the whole day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title={<>The artist behind <em>the look</em></>} />

      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-28 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:pb-40">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Photo
              name="manjula"
              className="aspect-[4/5]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              preload
            />
            <p className="mt-4 text-sm text-stone">Manjula Handapangoda</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="display text-3xl leading-snug sm:text-4xl">
            Sophisticated, elegant and timeless bridal looks that celebrate
            individuality and tradition.
          </p>
          <div className="prose-calm mt-10 max-w-2xl text-lg leading-relaxed text-stone">
            <p>
              Manjula Handapangoda is a prominent Sri Lankan bridal dresser,
              fashion stylist and professional hair and makeup artist based in
              Colombo, renowned for creating sophisticated, elegant and timeless
              bridal looks that beautifully celebrate individuality and
              tradition.
            </p>
            <p>
              With a passion for beauty, fashion and creative styling, Manjula
              brings together artistry, precision and contemporary trends to
              create unforgettable looks for brides on one of the most important
              days of their lives.
            </p>
            <p>
              Specialising in Kandyan, Western and Indian bridal styling,
              Manjula has a deep understanding of the unique beauty, cultural
              elements and fashion traditions associated with each style. From
              the regal elegance of a traditional Kandyan bride to the refined
              glamour of a Western bride and the vibrant sophistication of
              Indian bridal fashion, every look is carefully designed to
              complement the bride’s personality, features, attire and overall
              wedding theme.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4">
            <Photo name="kandyanProfile" className="aspect-[3/4]" sizes="(min-width: 1024px) 28vw, 50vw" />
            <Photo name="laceVeil" className="mt-12 aspect-[3/4]" sizes="(min-width: 1024px) 28vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="bg-paper py-28 lg:py-36">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeading eyebrow="Philosophy" title="What every look is built on" />
          <div className="mt-16 grid gap-12 text-center md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title}>
                <Ornament />
                <h3 className="display mt-6 text-3xl">{v.title}</h3>
                <p className="mt-4 leading-relaxed text-stone">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <SectionHeading eyebrow="Specialities" title="Kandyan, Western & Indian" />
        <ul className="mt-14 divide-y divide-line border-y border-line">
          {bridalStyles.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="display text-4xl transition-colors group-hover:text-gold">
                  {s.title}
                </span>
                <span className="max-w-md text-stone">{s.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <BookingBand photo="bouquet" />
    </>
  );
}
