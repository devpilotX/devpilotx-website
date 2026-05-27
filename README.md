# devpilotx-website

The source for [devpilotx.com](https://devpilotx.com), the studio site for DevPilotX. Portfolio, paid services, resume, blog, AI assistant, and a private operator dashboard at [profile.devpilotx.com](https://profile.devpilotx.com).

## Architecture

Three applications make up the platform. Only the first one lives in this repo today; the other two run from their own packages on the VPS.

- `./` (this repo): the public Next.js 14 frontend. Static export. Deployed to Hostinger via Git auto-deploy on push to `main`.
- VPS service `devpilotx-api` (port 8100, exposed as `https://api.devpilotx.com`): Express + pg + Nodemailer. Owns Postgres access, the contact form, the RAG bot, and the country-pricing endpoint.
- VPS service `devpilotx-dashboard` (port 8300, exposed as `https://profile.devpilotx.com`): Express + EJS + argon2 sessions. Private owner dashboard for contacts, service inquiries, and bot conversations. Single-tenant.
- VPS service `devpilotx-mcp` (exposed as `https://api.devpilotx.com/mcp`): JSON-RPC MCP server with seven Hostinger and VPS tools. Bearer or `x-api-key` auth.

The frontend never talks to Postgres directly. It posts JSON to `NEXT_PUBLIC_API_BASE` for `/contact`, `/service-inquiry`, `/ask`, and `/pricing-tier`. That keeps secrets and the database on the VPS only.

## Live endpoints

| Endpoint | What it does |
|---|---|
| `GET  https://api.devpilotx.com/health` | Liveness check |
| `POST https://api.devpilotx.com/ask` | SSE-streamed RAG (Groq Llama 3.3 70B with Gemini fallback) |
| `POST https://api.devpilotx.com/contact` | Contact form: writes to `contacts` table and sends confirmation + admin email |
| `POST https://api.devpilotx.com/service-inquiry` | Service-page lead form |
| `GET  https://api.devpilotx.com/pricing-tier` | Country-based pricing multiplier (IP-geolocated, `?cc=XX` override) |
| `POST https://api.devpilotx.com/mcp` | MCP JSON-RPC (Bearer or `x-api-key`) |

## Country-aware pricing

Prices on the services pages are calibrated to purchasing-power parity, not raw FX. Each service ships five region-specific price tables (IN, APAC, EU, GB, US). The region for a visitor is resolved in two layers:

1. `src/lib/region.ts`: instant timezone-based guess on first render (zero network).
2. `src/lib/regionApi.ts`: post-mount fetch to `/pricing-tier` for a precise country -> region mapping, cached in `localStorage` for 24 hours.

The server endpoint also returns a numeric multiplier (`1.0` / `0.6` / `0.3`) and the local currency code, so future custom-quoted services can scale a single base price instead of maintaining tables.

## Stack

- Frontend: Next.js 14 (App Router, static export), TypeScript, Tailwind, Zod
- API: Node.js + Express + pg, Nodemailer (Hostinger SMTP), Pino
- Dashboard: Node.js + Express + EJS + argon2 + connect-pg-simple sessions
- MCP server: Node.js + Express, Bearer / x-api-key auth, 7 tools over Hostinger and VPS APIs
- Database: PostgreSQL 16 with pgvector on the VPS
- Mail: Hostinger SMTP (`smtp.hostinger.com:465`, mailboxes on `devpilotx.com`)
- Hosting: Hostinger Business (static site) + Linux VPS (Postgres, API, dashboard, MCP, Nginx, Lets Encrypt)
- SEO + analytics: Google Analytics 4, Google AdSense, JSON-LD, sitemap, robots, Open Graph, Twitter cards

## Dashboard (profile.devpilotx.com)

Owner-only. Single account. Argon2-hashed credentials.

Pages:

- `/`        Overview: contact + service inquiry + 7-day bot counts, quick actions
- `/contacts`        Filterable + searchable contact submissions, per-row status (`new` / `read` / `replied` / `archived`), CSV export
- `/services`        Service inquiry pipeline (`new` / `contacted` / `quoted` / `won` / `lost` / `archived`)
- `/bot`        Recent Ask Dipanshu conversations: question, answer preview, citation count, latency

Authentication: argon2id over `dashboard_users`. Sessions in Postgres via `connect-pg-simple`. Strict cookies (httpOnly, secure, sameSite=lax). 7-day TTL.

## Local development

Frontend:

```
cp .env.example .env.local
npm install
npm run dev
```

Backend and dashboard live on the VPS only. They are not part of this repo. See the runbook in `~/runbooks/devpilotx.md` on the VPS for build, env, and pm2 commands.

## Deployment

- Frontend: Hostinger imports this repo. Auto-deploys on push to `main`. Static export from `next.config.mjs` (`output: 'export'`).
- API: VPS pm2 process `devpilotx-api`. `pm2 restart devpilotx-api --update-env` after changing env.
- Dashboard: VPS pm2 process `devpilotx-dashboard`. Same restart pattern.
- MCP: VPS pm2 process `devpilotx-mcp`. Token rotation requires editing `/home/mcpagent/secrets/devpilotx-app.env` and restarting.
- TLS via Lets Encrypt on `devpilotx.com`, `www.devpilotx.com`, `api.devpilotx.com`, `profile.devpilotx.com`. Auto-renewed by certbot.

## Repository layout

```
devpilotx-website/
  src/
    app/        Next.js App Router pages and route handlers
    components/ Shared UI primitives (universal design system)
    content/    Typed content modules: projects, services, resume, posts, site
    lib/        Frontend utilities (SEO, region, regionApi, classnames)
  public/       Static assets (favicon, ads.txt, manifest, .htaccess)
  README.md     This file
  CHANGELOG.md  Release notes
```

## Conventions

- ASCII punctuation only. No em-dashes anywhere.
- Strict TypeScript, no `any` without justification.
- All secrets via env vars. Nothing real is committed.
- WCAG AA accessibility. Skip link, semantic HTML, alt text, keyboard navigation.
- Compliance: no policy-violating content. AdSense client `ca-pub-6484525483464374`, GA4 `G-5XLBZN8M7M`.
