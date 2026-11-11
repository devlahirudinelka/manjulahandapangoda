"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useScrollLock } from "./smooth-scroll";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useScrollLock(open);

  const overlay = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        overlay
          ? "bg-transparent text-paper"
          : "border-b border-line/70 bg-ivory/90 text-ink backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="Manjula Handapangoda, home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.7rem] uppercase tracking-[0.24em] transition-opacity hover:opacity-100 ${
                  active ? "opacity-100" : "opacity-70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`btn btn-line !px-5 !py-2.5 ${
              overlay ? "hover:!border-paper hover:!bg-paper hover:!text-ink" : ""
            }`}
          >
            Book
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-50 -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 top-20 z-40 h-[calc(100dvh-5rem)] bg-ivory text-ink lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col items-center justify-center gap-7"
        >
          <Link href="/" className="display text-4xl">
            Home
          </Link>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="display text-4xl">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-dark mt-6">
            Book a consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
