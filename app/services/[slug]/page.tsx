import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/photo";
import { BookingBand, Ornament } from "@/components/sections";
import { photos, photoSrc } from "@/lib/images";
import { getService, services, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    openGraph: { images: [photoSrc(photos[service.cover])] },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pt-32 pb-24 lg:grid-cols-12 lg:items-end lg:gap-20 lg:px-10 lg:pt-40">
        <div className="lg:col-span-6 lg:pb-10">
          <nav aria-label="Breadcrumb" className="rise text-xs uppercase tracking-[0.2em] text-stone">
            <Link href="/services" className="hover:text-ink">
              Services
            </Link>
            <span className="mx-3 text-gold">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <p className="eyebrow rise rise-2 mt-12">{service.kicker}</p>
          <h1 className="display rise rise-2 mt-5 text-6xl sm:text-7xl">{service.title}</h1>
          <p className="rise rise-3 mt-8 max-w-lg text-lg leading-relaxed text-stone">
            {service.summary}
          </p>
        </div>
        <div className="lg:col-span-6">
          <Photo
            name={service.cover}
            className="aspect-[4/5]"
            sizes="(min-width: 1024px) 45vw, 100vw"
            preload
          />
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <div className="prose-calm text-lg leading-relaxed text-stone">
            {service.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="!mt-10 text-base">
              <span className="eyebrow mr-3">Ideal for</span>
              {service.idealFor}
            </p>
          </div>
          <div className="border border-line p-8 lg:p-12">
            <h2 className="display text-3xl">What’s included</h2>
            <ul className="mt-8 space-y-4">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed">
                  <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(
                `Hello! I'd like to enquire about ${service.title} for my wedding.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark mt-10 w-full"
            >
              Enquire on WhatsApp
            </a>
            <p className="mt-4 text-center text-xs text-stone">
              Every booking is tailored, so we’ll share pricing once we know your date and needs.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Ornament />
        <h2 className="display mt-8 text-center text-4xl sm:text-5xl">The look</h2>
        <div
          className={`mt-14 grid grid-cols-2 gap-3 md:gap-4 ${
            service.looks.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          {service.looks.map((key) => (
            <Photo
              key={key}
              name={key}
              className="aspect-[3/4]"
              sizes="(min-width: 768px) 25vw, 50vw"
              zoom
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/gallery" className="link-line">
            See the full gallery
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow text-center">Also explore</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center gap-6">
                <Photo name={s.cover} className="aspect-square w-24 shrink-0" sizes="96px" />
                <div>
                  <h3 className="display text-2xl group-hover:text-gold">{s.title}</h3>
                  <p className="mt-1 text-sm text-stone">{s.kicker}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingBand photo={service.hero} />
    </>
  );
}
