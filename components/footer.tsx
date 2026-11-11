import Link from "next/link";
import { Logo } from "./logo";
import { nav, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-10">
        <div className="flex flex-col items-center text-center text-paper">
          <Logo large />
          <p className="display mt-8 max-w-md text-2xl italic text-paper/80">
            Sophisticated, elegant and timeless bridal looks, crafted in Colombo.
          </p>
        </div>

        <div className="mt-16 grid gap-12 border-t border-paper/10 pt-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow mb-5 !text-gold-soft">Explore</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-paper">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5 !text-gold-soft">Services</h2>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-paper">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5 !text-gold-soft">Contact</h2>
            <ul className="space-y-3">
              <li>
                <a href={site.phoneHref} className="hover:text-paper">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all hover:text-paper">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper"
                >
                  {site.addressLine}
                  <br />
                  {site.city}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5 !text-gold-soft">Follow</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-paper/10 pt-8 text-center text-xs tracking-wide text-paper/50">
          © 2026 {site.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
