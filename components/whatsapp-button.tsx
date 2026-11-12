"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { services, whatsappLink } from "@/lib/site";

/** Floating "Chat on WhatsApp" button shown on every page. */
export function WhatsAppButton() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  // Slide in shortly after load so it doesn't compete with the page opening.
  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const service = services.find((s) => pathname === `/services/${s.slug}`);
  const text = service
    ? `Hello! I'd like to enquire about ${service.title}.`
    : "Hello! I'd like to enquire about bridal styling.";

  // The pricing page has its own WhatsApp bar on mobile.
  const hideOnMobile = pathname === "/pricing";

  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed right-5 bottom-5 z-40 items-center gap-3 sm:right-8 sm:bottom-8 ${
        hideOnMobile ? "hidden lg:flex" : "flex"
      } transition-all duration-700 ease-[cubic-bezier(0.2,0.6,0.2,1)] ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="pointer-events-none hidden translate-x-2 bg-paper px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.22em] text-ink opacity-0 shadow-[0_8px_30px_rgb(31_28_24/0.12)] transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        Chat with us
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgb(31_28_24/0.25)] transition-transform duration-500 group-hover:scale-105">
        <span
          aria-hidden
          className="wa-ping absolute inset-0 rounded-full bg-[#25D366]"
        />
        <svg
          aria-hidden
          viewBox="0 0 32 32"
          className="relative h-7 w-7"
          fill="currentColor"
        >
          <path d="M16.04 3C8.86 3 3.02 8.83 3.02 16c0 2.3.6 4.54 1.75 6.52L3 29l6.65-1.74A12.96 12.96 0 0 0 16.04 29C23.2 29 29 23.17 29 16S23.2 3 16.04 3Zm0 23.62c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.95 1.03 1.05-3.84-.27-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62 5.86 0 10.6 4.76 10.6 10.62 0 5.86-4.74 10.62-10.6 10.62Zm5.83-7.95c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.21-.18-.32-.02-.5.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.2 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </span>
    </a>
  );
}
