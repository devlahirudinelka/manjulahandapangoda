import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { Photo } from "@/components/photo";
import { BookingBand, Ornament, SectionHeading } from "@/components/sections";
import { photos, photoSrc } from "@/lib/images";
import { bridalStyles, journey, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: site.brand,
  description: site.description,
  url: site.url,
  image: photoSrc(photos.terrace),
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sri Jayawardenepura Kotte",
    addressRegion: "Western Province",
    addressCountry: "LK",
  },
  sameAs: [site.facebook, site.instagram],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <HeroSlider />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/30" />
        <div className="mx-auto w-full max-w-7xl px-6 pb-32 text-paper lg:px-10 lg:pb-28">
          <p className="eyebrow rise !text-gold-soft">
            Bridal dresser · Hair &amp; makeup · Colombo
          </p>
          <h1 className="display rise rise-2 mt-6 max-w-3xl text-6xl sm:text-7xl lg:text-8xl">
            Effortless elegance, <em className="font-light">for your biggest day</em>
          </h1>
          <div className="rise rise-3 mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="btn btn-light">
              Book a consultation
            </Link>
            <Link
              href="/gallery"
              className="btn btn-line text-paper hover:!border-paper hover:!bg-paper hover:!text-ink"
            >
              See our looks
            </Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section data-reveal className="mx-auto max-w-4xl px-6 py-28 text-center lg:py-40">
        <Ornament />
        <p className="display mt-10 text-3xl leading-snug sm:text-4xl lg:text-[2.75rem]">
          A studio built around one goal: helping every bride feel entirely like
          herself, <em>only more radiant.</em>
        </p>
        <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-stone">
          Sophisticated, timeless bridal looks that celebrate individuality and
          tradition. Every look is designed around the bride’s personality,
          features, attire and wedding theme.
        </p>
      </section>

      {/* Bridal styles */}
      <section className="bg-paper py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow="Specialities" title="Three traditions, one eye for detail" />
          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
            {bridalStyles.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-reveal
                data-reveal-delay={i}
                className={`group block ${i === 1 ? "md:mt-16" : ""}`}
              >
                <Photo
                  name={s.cover}
                  className="aspect-[3/4]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  zoom
                />
                <p className="eyebrow mt-6">{s.kicker}</p>
                <h3 className="display mt-3 text-3xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{s.summary}</p>
                <span className="link-line mt-5">Discover</span>
              </Link>
            ))}
          </div>
          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/services" className="btn btn-line">
              All services
            </Link>
            <Link href="/pricing" className="link-line sm:ml-6">
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-28 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:py-40">
        <div className="lg:col-span-5">
          <Photo
            name="manjula"
            className="aspect-[4/5]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
        <div data-reveal className="lg:col-span-7">
          <p className="eyebrow">Our founder</p>
          <h2 className="display mt-5 text-5xl sm:text-6xl">
            An artist <em>for every bride</em>
          </h2>
          <div className="prose-calm mt-8 max-w-xl leading-relaxed text-stone">
            <p>
              Manjula Handapangoda is a prominent Sri Lankan bridal dresser,
              fashion stylist and professional hair and makeup artist based in
              Colombo, renowned for sophisticated, elegant and timeless bridal
              looks.
            </p>
            <p>
              With a passion for beauty, fashion and creative styling, Manjula
              brings together artistry, precision and contemporary trends to
              create unforgettable looks for one of the most important days of a
              bride’s life.
            </p>
          </div>
          <Link href="/about" className="link-line mt-10">
            Read the story
          </Link>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="bg-sand/60 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Portfolio" title="Recent brides" align="left" />
            <Link href="/gallery" className="link-line">
              View the gallery
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <Photo name="kandyanIvory" className="col-span-2 row-span-2 aspect-[4/5] md:aspect-auto" sizes="(min-width: 768px) 50vw, 100vw" zoom />
            <Photo name="westernVeil" className="aspect-[3/4]" sizes="25vw" zoom delay={1} />
            <Photo name="indianRed" className="aspect-[3/4]" sizes="25vw" zoom delay={2} />
            <Photo name="laceVeil" className="aspect-[3/4]" sizes="25vw" zoom delay={3} />
            <Photo name="goldGaze" className="aspect-[3/4]" sizes="25vw" zoom delay={4} />
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <SectionHeading eyebrow="The experience" title="From first meeting to final touch" />
        <ol className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, i) => (
            <li key={step.title} data-reveal data-reveal-delay={i} className="bg-ivory p-8 lg:p-10">
              <span className="display text-5xl text-gold">0{i + 1}</span>
              <h3 className="display mt-6 text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Link href="/experience" className="link-line">
            How it works &amp; FAQs
          </Link>
        </div>
      </section>

      {/* Social */}
      <section className="border-t border-line bg-paper py-24 text-center">
        <p className="eyebrow">Follow along</p>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="display mt-5 inline-block text-3xl hover:text-gold sm:text-4xl"
        >
          @manjulahandapangodabridal
        </a>
        <p className="mt-4 text-stone">
          See the latest brides on{" "}
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
            Instagram
          </a>{" "}
          and{" "}
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
            Facebook
          </a>
          .
        </p>
      </section>

      <BookingBand />
    </>
  );
}
