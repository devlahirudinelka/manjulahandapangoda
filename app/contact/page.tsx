import type { Metadata } from "next";
import { Photo } from "@/components/photo";
import { PageIntro } from "@/components/sections";
import { site, whatsappLink } from "@/lib/site";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Book bridal hair, makeup and dressing with Manjula Handapangoda in Sri Jayawardenepura Kotte, Colombo. Call or WhatsApp +94 77 626 1006.",
};

const details = [
  {
    label: "Call",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    label: "WhatsApp",
    value: site.phone,
    href: whatsappLink(),
    external: true,
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "Studio",
    value: `${site.addressLine}, ${site.city}`,
    href: site.mapsUrl,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title={<>Tell us about <em>your day</em></>}>
        <p>
          Share your date and style and we’ll confirm availability. The sooner
          you reach out, the better the chance your date is free.
        </p>
      </PageIntro>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:pb-36">
        <div className="lg:col-span-7">
          <h2 className="display text-4xl">Send an enquiry</h2>
          <p className="mt-3 text-stone">
            Fill this in and it will open in WhatsApp or your email, ready to send.
          </p>
          <div className="mt-12">
            <EnquiryForm />
          </div>
        </div>

        <aside className="lg:col-span-5">
          <Photo name="kandyanWhite" className="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {details.map((d) => (
              <div key={d.label} className="flex flex-col gap-1 py-5 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="eyebrow pt-1">{d.label}</dt>
                <dd className="sm:text-right">
                  <a
                    href={d.href}
                    className="break-all hover:text-gold sm:break-normal"
                    {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {d.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex gap-8">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-line">
              Instagram
            </a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="link-line">
              Facebook
            </a>
          </div>
        </aside>
      </section>

      <section aria-label="Map" className="border-t border-line">
        <iframe
          title="Map showing the studio in Sri Jayawardenepura Kotte"
          src={site.mapsEmbed}
          className="block h-[420px] w-full grayscale-[0.6]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
