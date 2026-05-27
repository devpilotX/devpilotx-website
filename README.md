# devpilotx-website

The source for [devpilotx.com](https://devpilotx.com), the studio site for DevPilotX. Portfolio, paid services, resume, blog, and a private operator dashboard.

## Architecture

Two applications live in this repo:

- `./` (root): the public Next.js 14 frontend. Deploys to Hostinger via Git auto-deploy.
- `./api`: an Express + Prisma + Nodemailer backend that runs on the VPS at `https://api.devpilotx.com`. Owns Postgres access and outbound email.

The frontend never talks to Postgres directly. The contact form posts JSON to `NEXT_PUBLIC_API_BASE + '/contact'`, which is the VPS API. That keeps secrets and the database on the VPS only.

A private dashboard at `https://profile.devpilotx.com` will be added under `./api` (or a sibling `./dashboard`) in a later milestone.

## Stack

- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, Zod, Inter font
- Backend: Node.js, Express, Prisma, Nodemailer, Helmet, express-rate-limit, Pino
- Database: PostgreSQL on the VPS
- Mail: Hostinger SMTP (mailboxes on `devpilotx.com`)
- Hosting: Hostinger Business (Next.js Node app) + Linux VPS (Postgres, API, Nginx, Lets Encrypt)
- SEO and analytics: Google Analytics 4, Google AdSense, sitemap, robots, OG, Twitter cards

## Local development

Frontend:

```
cp .env.example .env.local
npm install
npm run dev
```

Backend:

```
cd api
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Deployment

- Frontend: Hostinger imports this repo. Build command `npm run build`, start command `npm start`, root directory `./`.
- Backend: VPS clones this repo, runs `cd api && npm install && npm run prisma:deploy && npm run build && pm2 start dist/index.js --name devpilotx-api`.
- Nginx on the VPS proxies `api.devpilotx.com` to `127.0.0.1:4000` and serves TLS via Lets Encrypt.

## Repository layout

```
devpilotx-website/
  src/
    app/        Next.js App Router pages and route handlers
    components/ Shared UI primitives (universal design system)
    content/    Typed content modules: projects, services, resume, posts, site
    lib/        Frontend utilities (SEO, classnames)
  public/       Static assets (favicon, ads.txt, manifest)
  api/
    src/        Express + Prisma + Nodemailer backend
    prisma/     Prisma schema and migrations
  README.md     This file
  CHANGELOG.md  Release notes
```

## Conventions

- ASCII punctuation only. No em-dashes anywhere.
- Strict TypeScript, no `any` without justification.
- All secrets via env vars. Nothing real is committed.
- WCAG AA accessibility. Skip link, semantic HTML, alt text, keyboard navigation.
- Compliance: no policy violating content. AdSense client `ca-pub-6484525483464374`, GA4 `G-5XLBZN8M7M`.
