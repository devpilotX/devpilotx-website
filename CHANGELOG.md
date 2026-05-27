# DevPilotX site changelog

## 2026-05-27 · Theme system + AI Engineering Toolkit

Major visual and functional overhaul.

### New

- **Light + dark themes with system default.** Full CSS-variable token system in `globals.css` (`--bg`, `--fg`, `--brand`, etc.) wired through Tailwind. Three-state segmented theme toggle in the header (light / system / dark) powered by `next-themes`. Theme persists across reloads and tabs.
- **AI Engineering Toolkit at `/tools`** — four free, client-side tools for AI engineers and developers, no signup required:
  - `/tools/token-cost` — multi-provider token + cost calculator across 14 frontier and value LLMs (GPT-5, Claude 4.5, Gemini 2.5, DeepSeek V3.2, Mistral Large 2, Llama 3.1 405B, Qwen 2.5 72B, Grok 4, and more). Side-by-side cost ranking for the same prompt.
  - `/tools/model-compare` — sortable model matrix: context window, max output, modality, input/output pricing per 1M tokens, with provider and tier filters.
  - `/tools/rag-sizer` — plan a retrieval system end to end: chunks, vector DB size (float32 + metadata overhead), one-time embedding cost across five embedding models, and monthly storage cost across Pinecone, pgvector, and Chroma.
  - `/tools/prompt-diff` — word-level LCS diff between two prompts with token counts and delta.
- **Deep case-study layout for `/projects/[slug]`.** Hero, metrics grid, problem, architecture, highlights, lessons learned, what I would do differently, sticky sidebar with stack/tags/links, and related projects.
- **Project content expanded** with optional `problem`, `architecture`, `lessons`, and `differently` fields. Populated for live and private projects (PaisaReality, Value Codes, Epicenter Exchange, OU-MRS).
- **Tools group in the Cmd+K palette** so every tool is one keystroke away from anywhere on the site.

### Changed

- **Every page rewritten** to use themable tokens (`bg-bg`, `text-fg`, `border-border`) instead of hardcoded dark colors. Light mode is now first-class.
- **Resume skills** restructured as three-column grouped cards instead of a single dense chip blob. Much better breathing room.
- **Site header** now includes the theme toggle and a more polished mobile menu.
- **Site footer** rebuilt with a four-column structure and the same theme tokens.
- **Service cards, project cards, section headings** refined for spacing and contrast across both themes.
- **Homepage** restructured: cleaner hero, trust strip, AI Toolkit highlight, selected work, services, about snippet.
- **Sitemap** now includes all `/tools` routes for SEO.

### Fixed

- Added missing `.btn-secondary` utility (was referenced but not defined).
- Replaced invalid `border-strong` class with proper `border-border-strong` tokens throughout touched components.
- Body no longer hardcoded to `#0a0a0f`; uses the theme background variable so light mode works.

## 2026-05-26 · Static export for Hostinger

- Switched Next.js build to `output: 'export'` with `trailingSlash: true` and `images.unoptimized: true`.
- Removed API routes (`/api/ask`, `/api/contact`, `/api/status`) and wired AskBubble to a local in-browser RAG fallback so the assistant works without an API.
- Added `public/.htaccess` for Apache pretty URLs on Hostinger Business shared hosting.

## 2026-05-24 · Premium rewrite

- Initial 46-file premium UI rewrite: hero, project cards, services, command palette, ask bubble, status card.
