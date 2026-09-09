# Launch checklist

The build is finished. The site does not go public until the items in the
first section are done, because each one would either mislead a visitor or
use something that is not yours.

---

## Hard blockers

### 1. Real projects
`src/content/projects.ts` holds six invented projects. They are labelled as
placeholders on the page in red, deliberately, so this cannot ship by
accident.

Replace with 5 to 8 real ones. Each needs a name, a live URL, a one-line
caption and a cover image. Then set `isPlaceholderWork` to `false` and the
warning banner disappears.

### 2. The 3D scene
The hero currently uses a CSS backdrop, so nothing third-party is being
served. The Spline scene URL in `src/config/site.ts` still points at
somebody else's scene and must not be switched on as it stands.

If you want a 3D hero, build your own scene, put its URL in
`heroBackdrop.splineScene`, set `provider` to `"spline"`, and measure the
frame rate before deciding. The old scene ran at single-digit frames per
second.

### 3. Booking link
`siteConfig.bookingUrl` falls back to the contact page. Every "book a call"
control on the site points at it. Put your Cal.com or Calendly URL there and
the contact page switches from an email-first layout to a booking-first one
on its own.

### 4. Contact form destination
The form works, validates and rate limits, but has nowhere to deliver. Set
either `CONTACT_WEBHOOK_URL` for n8n, or `RESEND_API_KEY` with
`CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. See `.env.example`.

Send one real test message after configuring. Until then the form refuses
submissions and tells the sender to email instead, which is honest but not
what you want live.

### 5. Logo
`src/components/site/monogram.tsx` is my approximation of your S mark, drawn
from the images you sent. Replace the path with your real SVG.

---

## Should do before launch

### Portrait
`siteConfig.portrait` is null, so the about page shows a stand-in. The
headshot you supplied has a white studio background and cannot sit on a
near-black page. Supply a cut-out on transparency, drop it in `/public`, and
set the path.

### Blog posts
Three posts are written and live on the preview. They are drafts in your
voice, and the opinions in them will be attributed to you. Read them.

### Legacy redirects
`src/config/redirects.ts` is empty. Open Search Console on the old site,
take every page with impressions, and add a permanent redirect to the
nearest equivalent. Anything left out loses its search traffic on cutover.

### Search Console
Set `siteConfig.googleSiteVerification` to the verification token, deploy,
then verify and submit `https://stefanstankovski.com/sitemap.xml`.

### Chat widget
`chatConfig` in `src/config/site.ts` is set to `"none"`. Create the account,
set the provider and id, and it loads itself once the browser goes idle.

---

## Deployment

I could not do this part. It needs your Vercel login.

1. Push the repository to GitHub.
2. Import it in Vercel. The framework preset is detected.
3. Add the contact form environment variables in the project settings.
4. Deploy, check the preview URL, then promote.
5. Point the domain's DNS at Vercel.
6. Deploy `playground/` as a second project on a subdomain, if you want it
   public. It is set to noindex either way.

Analytics and speed insights are already wired in and start reporting the
moment the site runs on Vercel. They do nothing anywhere else.

---

## What was verified

Measured on the production build, not asserted.

| Check | Result |
|---|---|
| Routes returning 200 with unique titles | 8 of 8 |
| Canonical URL per page | Present and unique |
| Share card per page | Generated, in Sora |
| Structured data | Person, ProfessionalService, FAQPage, Article |
| Sitemap entries | 10 |
| Heading order | No skipped levels on any route |
| Form fields with labels | All |
| Links and buttons with accessible text | All |
| Keyboard focus ring | Visible, green, on every control |
| Text contrast, body on background | 15.96 to 1 |
| Text contrast, muted on background | 6.11 to 1 |
| Form field border contrast | 3.27 to 1 |
| Horizontal overflow at 375, 768, 1024, 1440, 1920 | None, 40 combinations |
| JavaScript, homepage | 158 KB compressed |
| Cumulative layout shift | 0 |
| Console errors | None |

Two numbers in that table are not trustworthy as real-world figures because
they were measured over localhost: load time and largest contentful paint.
Re-run Lighthouse against the deployed URL to get honest ones. The payload
sizes are real and are what the budget was about.
