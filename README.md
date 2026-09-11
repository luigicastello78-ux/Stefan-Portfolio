# Stefan-Portfolio

stefanstankovski.com. Next.js on Vercel, dark only, content for the work
section managed through Sveltia CMS.

## Running it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

The playground is a separate application with its own dependencies:

```bash
npm install --prefix playground
npm run dev --prefix playground
```

## Adding a project

Open `/admin` and use the Projects collection. Adding work is a form, not a
code change.

Signing in, pick one:

- **Access token.** Simplest for one person. Create a fine-grained GitHub
  token with read and write access to Contents on this repository, then
  choose "Sign In Using Access Token".
- **Local repository.** Run the site, open `/admin` in Chrome or Edge, and
  choose "Work with Local Repository". It writes straight to the working
  tree. Firefox and Safari cannot do this.
- **GitHub sign-in.** Needs an OAuth client. Deploy the Sveltia CMS
  Authenticator to Cloudflare Workers and add `base_url` under `backend` in
  `public/admin/config.yml`.

Each project is one JSON file in `content/projects`, and screenshots go in
`public/work`. Editing those files by hand works exactly the same.

Screenshots want 16:10, ideally 1600 by 1000. Cards crop from the top, so
the top of the page is what shows.

## Layout

```
content/projects/     Work entries, written by the CMS
public/admin/         Sveltia CMS: index.html and config.yml
public/work/          Project screenshots
src/app/              Routes, metadata, sitemap, robots, share cards
src/components/       Sections and shared pieces
src/config/site.ts    Name, email, booking URL, chat widget, keywords
src/content/          Posts, services, process, FAQ, project loader
docs/                 PRD, build plan, launch checklist, engineering notes
playground/           Separate Vite app for experiments
```

## Before it goes live

`docs/LAUNCH.md` is the checklist. The short version: real screenshots, a
booking URL, a contact form destination, and the real logo SVG.

## Environment

The contact form needs a destination. Copy `.env.example` to `.env.local`
and set either `CONTACT_WEBHOOK_URL`, or `RESEND_API_KEY` with
`CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. Without one the form refuses
submissions and says so rather than pretending to have sent them.
