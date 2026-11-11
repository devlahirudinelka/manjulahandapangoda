import Link from "next/link";
import { Photo } from "./photo";
import type { PhotoKey } from "@/lib/images";
import { site, whatsappLink } from "@/lib/site";

/** Text-only page opener used at the top of inner pages. */
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-40 pb-16 text-center lg:pt-48 lg:pb-24">
      <p className="eyebrow rise">{eyebrow}</p>
      <h1 className="display rise rise-2 mt-6 text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
      {children ? (
        <div className="rise rise-3 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone">
          {children}
        </div>
      ) : null}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div data-reveal className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-5 text-4xl sm:text-5xl">{title}</h2>
    </div>
  );
}

/** Small decorative divider: a thin gold line with a dot. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-gold/60" />
      <span className="h-1 w-1 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold/60" />
    </div>
  );
}

/** Closing call to action with a full-bleed photo behind it. */
export function BookingBand({
  photo = "couple",
  title = "Let’s create your look",
}: {
  photo?: PhotoKey;
  title?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Photo name={photo} className="!absolute inset-0 -z-10" sizes="100vw" reveal={false} />
      <div className="absolute inset-0 -z-10 bg-ink/55" />
      <div data-reveal className="mx-auto max-w-3xl px-6 py-32 text-center text-paper lg:py-44">
        <p className="eyebrow !text-gold-soft">Now booking</p>
        <h2 className="display mt-6 text-5xl sm:text-6xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-paper/80">
          Share your date and your style, and we’ll take care of the rest.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappLink("Hello! I'd like to enquire about bridal styling for my wedding.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light"
          >
            WhatsApp us
          </a>
          <Link href="/contact" className="btn btn-line text-paper hover:!border-paper hover:!bg-paper hover:!text-ink">
            Send an enquiry
          </Link>
        </div>
        <p className="mt-8 text-sm text-paper/70">
          or call{" "}
          <a href={site.phoneHref} className="underline underline-offset-4">
            {site.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
