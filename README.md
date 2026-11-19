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

- **Contact details, the two locations (Bridal Studio in Kotte, Salon in Hanwella), social links, service text, FAQs** → `lib/site.ts`
- **Prices and payment notes** → `lib/pricing.ts`
- **Photos, alt text and gallery order** → `lib/images.ts`
- **Colours and type** → `app/globals.css` (`@theme` block)
- **Live domain** → set `NEXT_PUBLIC_SITE_URL` (used for SEO, sitemap and social previews)

## Photos

Every photo lives in `public/images/`, copied from the original WordPress uploads folder
(including a few extras that are not used yet, such as `m1`–`m4`, `BDW…`, `Slide-1`–`4`).
To use one, add an entry in `lib/images.ts` and add its key to `galleryOrder`.

## Instagram feed

The home page and gallery show the latest posts from @manjulahandapangodabridal
(`components/instagram-grid.tsx`, `lib/instagram.ts`). Until it is connected,
or if Instagram is ever unreachable, the grid shows studio photos instead, so
the site never breaks. New posts appear within about an hour.

**Connect it (one time, about 15 minutes):**

1. In the Instagram app, make sure the account is a **professional account**
   (Settings → Account type and tools → Switch to professional account → Creator or Business).
2. Go to <https://developers.facebook.com/apps>, **Create app**, and choose the
   use case **"Manage messaging & content on Instagram"** (Instagram API with Instagram Login).
3. In the app, open **Instagram → API setup with Instagram login** →
   **Generate access tokens** → **Add account**, and log in as @manjulahandapangodabridal.
   Copy the token it shows (it is long-lived: 60 days).
4. In Vercel → Project → Settings → Environment Variables, add
   - `INSTAGRAM_ACCESS_TOKEN` = the token from step 3
   - `CRON_SECRET` = any long random string
   then redeploy.

**Keeping it alive:** tokens expire after 60 days unless refreshed.
`vercel.json` runs `/api/instagram/refresh` every Monday, which extends the
token by another 60 days. If the log ever says the refresh returned a new
token, paste it into `INSTAGRAM_ACCESS_TOKEN`. If the token does expire, repeat step 3.

To test locally, copy `.env.example` to `.env.local` and fill in the token.

## Contact form

The enquiry form has no backend. It composes the message and opens WhatsApp (or the visitor's email app),
so enquiries arrive straight to +94 77 626 1006 / +94 71 326 1006 (WhatsApp uses the first) or info.ManjulaStudio@gmail.com.
