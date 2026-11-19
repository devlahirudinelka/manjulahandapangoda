import type { Metadata } from "next";
import { site } from "./site";

/** Preview images live in /public/og (1200x630). */
export function ogImage(name: string) {
  return { url: `/og/${name}.jpg`, width: 1200, height: 630, alt: site.brand };
}

/**
 * Per-page metadata: title, description, canonical URL and the
 * Open Graph / Twitter preview card (with its own 1200x630 image).
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${site.brand}`;
  const img = ogImage(image);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.brand,
      locale: "en_LK",
      title: fullTitle,
      description,
      url: path,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
  };
}
