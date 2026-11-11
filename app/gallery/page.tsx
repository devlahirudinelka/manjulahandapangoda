import type { Metadata } from "next";
import { BookingBand, PageIntro } from "@/components/sections";
import { site } from "@/lib/site";
import { GalleryGrid } from "./gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Kandyan, Western and Indian brides styled by Manjula Handapangoda in Colombo, Sri Lanka.",
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro eyebrow="Gallery" title={<>Brides, <em>beautifully themselves</em></>}>
        <p>
          A selection of recent looks. For the latest, follow us on{" "}
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
            Instagram
          </a>
          .
        </p>
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-10 lg:pb-40">
        <GalleryGrid />
      </section>

      <BookingBand photo="goldDetail" />
    </>
  );
}
