# Changelog

All notable changes to this project are recorded here.

## [Unreleased]

### Added
- Initial repository scaffolding (Next.js 14 frontend, Express + Prisma backend).
- Public pages: home, about, projects (with detail pages), services, resume, blog, contact, legal (privacy, terms, cookies).
- Universal design system: SiteHeader, SiteFooter, ProjectCard, ServiceCard, ContactForm, ThemeToggle, Container, SectionHeading.
- Backend `api/`: Express server with `/health` and `/contact` endpoints, Zod validation, rate limiting, Helmet, Pino logging, Nodemailer over Hostinger SMTP.
- Prisma schema covering `Contact`, `Project`, `Post`, `User`.
- SEO: sitemap, robots, per-page metadata, Open Graph, Twitter cards, JSON-LD where applicable.
- Analytics and ads: Google Analytics 4 (`G-5XLBZN8M7M`), Google AdSense (`ca-pub-6484525483464374`), `ads.txt`.
- Light and dark themes with no flash of unstyled content.
