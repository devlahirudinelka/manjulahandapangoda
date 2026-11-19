import { Suspense } from "react";
import { site } from "@/lib/site";
import { InstagramGrid, InstagramGridSkeleton, InstagramIcon } from "./instagram-grid";

/** Instagram strip shown on every page, just above the footer. */
export function InstagramSection() {
  return (
    <section aria-labelledby="instagram-heading" className="border-t border-line bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="eyebrow">Follow along</p>
            <a
              id="instagram-heading"
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="display mt-4 inline-flex items-center gap-2.5 text-[1.4rem] hover:text-gold sm:gap-3 sm:text-4xl"
            >
              <InstagramIcon className="size-6 shrink-0 sm:size-7" />
              @manjulahandapangodabridal
            </a>
          </div>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-line shrink-0">
            Follow on Instagram
          </a>
        </div>
        <Suspense fallback={<InstagramGridSkeleton limit={6} />}>
          <InstagramGrid limit={6} />
        </Suspense>
      </div>
    </section>
  );
}
