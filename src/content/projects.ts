export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  status: 'live' | 'in-progress' | 'private';
  year: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  gradient: string;
  summary: string;
  highlights: string[];
  stack: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'paisareality',
    name: 'Paisa Reality',
    oneLiner: "India's money platform: daily prices, schemes, calculators, bank rates.",
    status: 'live',
    year: '2026',
    tags: ['Next.js 16', 'MySQL', 'Razorpay', 'Resend', 'Bilingual'],
    liveUrl: 'https://paisareality.com',
    repoUrl: 'https://github.com/devpilotX/paisarealitymoney',
    gradient: 'from-emerald-500/30 via-cyan-500/20 to-indigo-500/30',
    summary:
      'Free, ad-supported financial information platform for India. Four pillars: daily prices (gold, silver, petrol, diesel, LPG) across 50+ Indian cities, a profile-based government scheme matcher, 10+ financial calculators, and bank rate comparison across 50+ banks. Bilingual English and Hindi, markdown blog, admin CMS, Razorpay-billed paid tier.',
    highlights: [
      'Next.js 16 App Router with React Server Components, strict TypeScript, MySQL via mysql2.',
      'JWT auth with bcrypt, per-IP rate limiting on auth, match, payment, and scraper routes.',
      'Razorpay signature verification on payment callback, Resend transactional mail.',
      'PDF report generation for scheme matches and calculator outputs via @react-pdf/renderer.',
      'Dynamic sitemap, JSON-LD WebSite and Organization, AdSense monetization.'
    ],
    stack: ['Next.js 16', 'TypeScript', 'MySQL', 'Razorpay', 'Resend', 'Tailwind', 'AdSense'],
    metrics: [
      { label: 'Cities covered', value: '50+' },
      { label: 'Banks compared', value: '50+' },
      { label: 'Calculators', value: '10+' },
      { label: 'Languages', value: 'EN + HI' }
    ],
    featured: true
  },
  {
    slug: 'value-codes',
    name: 'Value Codes',
    oneLiner: 'Free, fast, private developer tools with a 19-language compiler.',
    status: 'live',
    year: '2026',
    tags: ['Express', 'EJS', 'MySQL', 'Security', 'CSP nonces'],
    liveUrl: 'https://value.codes',
    gradient: 'from-amber-500/30 via-rose-500/20 to-indigo-500/30',
    summary:
      'A no-signup, no-tracking developer utility hub with a small community and content layer. Ten client-side tools (JSON formatter, regex builder, diff checker, base64, color picker, cron builder, JWT decoder, hash generator, mock data, code formatter) plus a sandboxed 19-language online compiler, snippet library, public API directory, blog, and authenticated profiles.',
    highlights: [
      'Express 4 with nonce-based CSP, no unsafe-inline anywhere.',
      'CSRF protection via csrf-csrf double-submit cookie pattern.',
      'MySQL-backed sessions with auto-expiration, helmet, rate limiting, dompurify sanitization.',
      'Dynamic sitemap cached 6h, auto-includes articles, snippet categories, API entries.',
      'Octokit-powered GitHub data for community profiles.'
    ],
    stack: ['Node.js', 'Express', 'EJS', 'MySQL', 'Helmet CSP', 'Octokit'],
    metrics: [
      { label: 'Client tools', value: '10' },
      { label: 'Compiler languages', value: '19' },
      { label: 'Tracking', value: 'None' }
    ],
    featured: true
  },
  {
    slug: 'epicenter-exchange',
    name: 'Epicenter Exchange',
    oneLiner: 'Non-profit finance research and education. Free, open-source, ad-free where it matters.',
    status: 'live',
    year: '2026',
    tags: ['FastAPI', 'GitHub Pages', 'Stooq', 'CoinGecko', 'Resend'],
    liveUrl: 'https://epicenterexchange.com',
    repoUrl: 'https://github.com/devpilotX/epicenter-exchange',
    gradient: 'from-sky-500/30 via-indigo-500/20 to-emerald-500/30',
    summary:
      'Solo non-profit finance education site covering India, US, UK, and crypto. Static HTML and Tailwind frontend on GitHub Pages, FastAPI backend on a Hostinger Mumbai VPS behind nginx and Let\'s Encrypt. No advice, no tip groups, no paid signals.',
    highlights: [
      'Live equity and crypto dashboards: 13+ instruments via Stooq, top 12 coins via CoinGecko.',
      'In-browser backtester for SMA, RSI, and MACD strategies with equity-curve rendering.',
      'Seven long-form research articles, four working financial calculators.',
      'Resend transactional and newsletter mail with two verified sender identities.',
      'Google Consent Mode v2 cookie banner, GA4 and AdSense in non-personalized mode by default.'
    ],
    stack: ['FastAPI', 'Python 3.12', 'SQLite', 'Nginx', 'systemd', "Let's Encrypt", 'Resend'],
    metrics: [
      { label: 'Markets covered', value: 'IN, US, UK, Crypto' },
      { label: 'Articles', value: '7' },
      { label: 'License', value: 'MIT' }
    ],
    featured: true
  },
  {
    slug: 'ou-mrs',
    name: 'OU-MRS · Mean-Reversion Strategy',
    oneLiner: 'Live paper-trading bot for Indian index futures. Calibrated Ornstein-Uhlenbeck mean-reversion with a five-layer risk armor stack.',
    status: 'private',
    year: '2026',
    tags: ['Python', 'Quant', 'Angel One SmartAPI', 'systemd', 'Walk-forward'],
    gradient: 'from-violet-500/30 via-fuchsia-500/20 to-cyan-500/30',
    summary:
      'Private research and trading bot. Fits an Ornstein-Uhlenbeck process on log-prices, generates z-score signals around an estimated equilibrium, sizes positions by capital tier under regime and drawdown constraints, and routes orders through Angel One SmartAPI. Identical signal logic powers backtests and live execution: what you backtest is what trades.',
    highlights: [
      'Symbols: BANKNIFTY, NIFTY, MIDCPNIFTY futures via Angel One SmartAPI.',
      'Five-layer risk armor: notional leverage cap (3.0x), dual-cap max-lots, daily loss kill switch, tight Z-stops (2.5), paper-side STOP enforcement with breakeven ratchet.',
      'Validation: vectorized backtest engine, walk-forward, Monte Carlo, tearsheet metrics.',
      'Capital tiers (SEED to QUANT_ELITE): as capital grows, risk-per-trade shrinks, concurrency grows, stops widen, entry threshold lowers (LLN smooths variance).',
      'Realistic Indian F&O cost model: brokerage, STT, exchange transaction, SEBI, GST, stamp duty.'
    ],
    stack: ['Python 3.11+', 'numpy', 'pandas', 'Angel One SmartAPI', 'systemd', 'Nginx SSE proxy'],
    metrics: [
      { label: 'Paper capital', value: '₹37,50,000' },
      { label: 'Net P&L', value: '+₹1,77,428' },
      { label: 'Win rate', value: '68%' },
      { label: 'Sharpe / Sortino', value: '1.32 / 1.41' }
    ],
    featured: true
  },
  {
    slug: 'devpilotx-panel',
    name: 'DevPilotX Panel',
    oneLiner: 'Self-hosted Minecraft server panel with live console, RCON, and in-browser file editor.',
    status: 'private',
    year: '2026',
    tags: ['Next.js 14', 'xterm.js', 'Monaco', 'RCON', 'JWT'],
    gradient: 'from-emerald-500/30 via-teal-500/20 to-indigo-500/30',
    summary:
      'Single-operator, single-server alternative to Pterodactyl and Crafty. Operate the Minecraft server from any browser: live xterm.js console, RCON command execution, Monaco-powered file editor, scheduled tasks, and player ops. JWT sessions via jose with edge middleware route guards.',
    highlights: [
      'Live console with @xterm/xterm 5.5 plus fit, search, and web-links addons.',
      'In-browser file editor via @monaco-editor/react.',
      'RCON execution via rcon-client, real-time resource usage charts via recharts.',
      'TanStack Query for server state, Zustand for client state, Zod-validated forms.',
      'Edge middleware auth guard with HTTP-only dpx-session cookie.'
    ],
    stack: ['Next.js 14', 'TypeScript', 'Radix UI', 'TanStack Query', 'xterm.js', 'Monaco', 'JWT (jose)'],
    featured: false
  },
  {
    slug: 'devpilotx-studio',
    name: 'DevPilotX Studio',
    oneLiner: 'This very site. AI agent and automation studio.',
    status: 'in-progress',
    year: '2026',
    tags: ['Next.js 14', 'PostgreSQL', 'Local RAG', 'Cmd+K'],
    liveUrl: 'https://devpilotx.com',
    repoUrl: 'https://github.com/devpilotX/devpilotx-website',
    gradient: 'from-indigo-500/30 via-cyan-500/20 to-emerald-500/30',
    summary:
      'The brand site itself: portfolio, services, LinkedIn-style verified resume, and an embedded AI assistant that answers questions about my work using a local RAG index over the resume and projects. Cmd+K command palette, live stack status, and a private dashboard at profile.devpilotx.com (in progress) for inbox and content management.',
    highlights: [
      'Next.js 14 App Router, TypeScript, Tailwind, Framer Motion, Geist font.',
      'Local RAG retrieval over resume and project content. No external LLM required to ship.',
      'Cmd+K command palette to jump anywhere and search projects.',
      'Live stack status surfaced from the VPS API.',
      'Hostinger for the public site, VPS for PostgreSQL and the private dashboard.'
    ],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Prisma', 'pm2', 'Nginx'],
    featured: false
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects() { return projects.filter((p) => p.featured); }
