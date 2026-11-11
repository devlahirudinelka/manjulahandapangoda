# Manjula Handapangoda Bridal

Website for Manjula Handapangoda, bridal dresser and hair & makeup artist in Colombo.
Built with Next.js 16 (App Router, Cache Components) and Tailwind CSS 4.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Site map

| Page | Path |
| --- | --- |
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Kandyan Bridal | `/services/kandyan-bridal` |
| Western Bridal | `/services/western-bridal` |
| Indian Bridal | `/services/indian-bridal` |
| Bridal Hair & Makeup | `/services/hair-and-makeup` |
| Occasion Dressing | `/services/occasion-dressing` |
| Pricing (2027, 2028, homecoming & engagement) | `/pricing` |
| Gallery (filter + lightbox) | `/gallery` |
| Experience & FAQs | `/experience` |
| Contact (WhatsApp / email enquiry form, map) | `/contact` |

Also generated: `/sitemap.xml`, `/robots.txt`, a 404 page and LocalBusiness structured data.

## Where to edit

- **Contact details, social links, service text, FAQs** → `lib/site.ts`
- **Prices and payment notes** → `lib/pricing.ts`
- **Photos, alt text and gallery order** → `lib/images.ts`
- **Colours and type** → `app/globals.css` (`@theme` block)
- **Live domain** → set `NEXT_PUBLIC_SITE_URL` (used for SEO, sitemap and social previews)

## Photos

The photos are the Facebook images already on manjula.ceylexa.com and currently load from there.
To host them in this project (recommended before launch):

```bash
node scripts/download-images.mjs
```

This saves every image to `public/images/` and switches the site to use them.
You can then remove the `remotePatterns` entry from `next.config.ts`.

To add a new photo: drop it into `public/images/`, add an entry in `lib/images.ts`, and add its key to `galleryOrder`.

## Contact form

The enquiry form has no backend. It composes the message and opens WhatsApp (or the visitor's email app),
so enquiries arrive straight to +94 77 626 1006 / info.ManjulaStudio@gmail.com.
