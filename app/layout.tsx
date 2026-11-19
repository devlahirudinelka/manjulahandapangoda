import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InstagramSection } from "@/components/instagram-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ogImage } from "@/lib/seo";
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

export const viewport: Viewport = {
  themeColor: "#fffdf9",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Bridal Dresser & Makeup Artist, Colombo`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.name }],
  creator: site.name,
  category: "Beauty & Bridal",
  keywords: [
    "Manjula Handapangoda",
    "bridal dresser Sri Lanka",
    "bridal dresser Colombo",
    "Kandyan bridal",
    "osari dressing",
    "bridal makeup Colombo",
    "bridal makeup Kotte",
    "bridal salon Hanwella",
    "Western bridal",
    "Indian bridal",
    "hair and makeup artist Colombo",
    "wedding hair and makeup Sri Lanka",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: site.brand,
    locale: "en_LK",
    url: "/",
    title: `${site.brand} | Bridal Dresser & Makeup Artist, Colombo`,
    description: site.description,
    images: [ogImage("home")],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} | Bridal Dresser & Makeup Artist, Colombo`,
    description: site.description,
    images: [ogImage("home").url],
  },
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
          <InstagramSection />
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
