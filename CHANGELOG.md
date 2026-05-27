# Changelog

## 0.3.0 - 2026-05-27

- Architecture: switched the public site to a Next.js static export so it can ship on Hostinger Premium Web Hosting (static Apache). All HTML, CSS, and JS are precompiled into ./out and served as flat files.
- Removed the in-app API routes (/api/ask, /api/contact, /api/status). These move to the VPS Express service at api.devpilotx.com. Until that service is up, the Ask Dipanshu bubble runs the same RAG retrieval client-side over the bundled resume and project content, so the assistant always works even with the API offline.
- Added a public/.htaccess that forces HTTPS, rewrites pretty URLs to /path/index.html, sets long cache headers on hashed assets, and short cache on HTML.
- Tightened next.config.mjs: output: 'export', trailingSlash: true, images.unoptimized: true.

## 0.2.0 - 2026-05-27

- Premium rewrite: AI assistant bubble, LinkedIn-style resume, real project data (OU-MRS, Paisa Reality, Value Codes, Epicenter Exchange, Minecraft Server Panel), services catalogue, blog with first two posts, dark mode, command palette.

## 0.1.0 - 2026-05-26

- Bootstrap: Next.js 14 + TypeScript + Tailwind + Prisma scaffold, baseline pages, Hostinger deployment hook.
