import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SmoothScroll } from "@/components/smooth-scroll";
import { photos, photoSrc } from "@/lib/images";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = localFont({
  src: [
    {
      path: "./fonts/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = localFont({
  src: [
    {
      path: "./fonts/jost-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Bridal Dresser & Makeup Artist, Colombo`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "Manjula Handapangoda",
    "bridal dresser Sri Lanka",
    "Kandyan bridal",
    "bridal makeup Colombo",
    "Western bridal",
    "Indian bridal",
    "hair and makeup artist Colombo",
  ],
  openGraph: {
    type: "website",
    siteName: site.brand,
    locale: "en_LK",
    images: [{ url: photoSrc(photos.terrace), width: 2560, height: 1209 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`[data-reveal],[data-reveal] img{opacity:1!important;transform:none!important}.img-fade{opacity:1!important;filter:none!important}`}</style>
        </noscript>
        <SmoothScroll>
          <ScrollReveal />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
