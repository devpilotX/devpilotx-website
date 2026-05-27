export type Experience = {
  role: string;
  company: string;
  type: string;
  start: string;
  end: string;
  location: string;
  description: string[];
  skills: string[];
  logoColor: string;
  url?: string;
};

export type Education = {
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
  note?: string;
  logoColor: string;
};

export type Resume = {
  name: string;
  headline: string;
  location: string;
  email: string;
  linkedinUrl: string;
  linkedinHandle: string;
  githubUrl: string;
  githubHandle: string;
  openToWork: boolean;
  about: string;
  verifications: { kind: 'linkedin' | 'github' | 'email'; label: string; verified: boolean }[];
  experience: Experience[];
  skills: Record<string, string[]>;
  education: Education[];
};

export const resume: Resume = {
  name: 'Dipanshu Kumar',
  headline: 'AI Engineer · Independent · LLMs, RAG, Agents',
  location: 'Patna, Bihar, India',
  email: 'hello@devpilotx.com',
  linkedinUrl: 'https://linkedin.com/in/dipanshu03j',
  linkedinHandle: 'linkedin.com/in/dipanshu03j',
  githubUrl: 'https://github.com/devpilotX',
  githubHandle: 'github.com/devpilotX',
  openToWork: true,
  about:
    'Independent AI engineer building production-grade AI agents, RAG systems, and full-stack platforms in finance and developer tooling. BCA graduate from Maharishi Markandeshwar University (NAAC A++). I ship solo, in production, for real users. Current focus: LLM applications, RAG, MCP servers, and the infrastructure that makes them reliable.',
  verifications: [
    { kind: 'linkedin', label: 'LinkedIn account', verified: true },
    { kind: 'github', label: 'GitHub account', verified: true },
    { kind: 'email', label: 'Email address', verified: true }
  ],
  experience: [
    {
      role: 'Founder, AI Engineer',
      company: 'DevPilotX',
      type: 'Self-employed · Full-time',
      start: '2025',
      end: 'Present',
      location: 'Remote, India',
      url: 'https://devpilotx.com',
      logoColor: 'from-indigo-500 to-cyan-500',
      description: [
        'Building custom AI agents and MCP servers for workflow automation across Notion, Slack, GitHub, Gmail, and Calendar.',
        'Architecting Next.js + Node.js + PostgreSQL platforms on self-managed VPS infrastructure with Nginx, TLS, and pm2.',
        'Designing RAG pipelines on pgvector for portfolio-scale information retrieval and AI assistants.'
      ],
      skills: ['LLM apps', 'RAG', 'MCP', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Linux']
    },
    {
      role: 'Founder, Independent Engineer',
      company: 'Paisa Reality',
      type: 'Self-employed · Founder',
      start: '2026',
      end: 'Present',
      location: 'Remote, India',
      url: 'https://paisareality.com',
      logoColor: 'from-emerald-500 to-cyan-500',
      description: [
        "Built and operate paisareality.com — India's financial information platform serving daily prices across 50+ cities, government scheme matching, 10+ financial calculators, and bank rate comparison across 50+ banks.",
        'Next.js 16 (App Router, RSC), MySQL, Razorpay payments, Resend transactional email, bilingual Hindi + English content.',
        'Implemented JWT auth, admin CMS, dynamic sitemap, JSON-LD, and AdSense monetization.'
      ],
      skills: ['Next.js', 'TypeScript', 'MySQL', 'Razorpay', 'Resend', 'SEO', 'Tailwind']
    },
    {
      role: 'Founder, Independent Engineer',
      company: 'Value Codes',
      type: 'Self-employed · Founder',
      start: '2026',
      end: 'Present',
      location: 'Remote, India',
      url: 'https://value.codes',
      logoColor: 'from-amber-500 to-rose-500',
      description: [
        'Built and operate value.codes — developer utility hub with 10 client-side tools, a sandboxed 19-language online compiler, snippet library, public API directory, and authenticated profiles.',
        'Express + EJS + MySQL with nonce-based CSP, CSRF double-submit, MySQL session store, and Octokit GitHub integration.'
      ],
      skills: ['Node.js', 'Express', 'MySQL', 'Security', 'EJS', 'Octokit']
    },
    {
      role: 'Quantitative Research Engineer',
      company: 'OU-MRS Strategy (Private)',
      type: 'Self-directed · Research',
      start: '2026',
      end: 'Present',
      location: 'Remote, India',
      logoColor: 'from-violet-500 to-fuchsia-500',
      description: [
        'Designed and operate a live paper-trading bot for Indian index futures (BANKNIFTY, NIFTY, MIDCPNIFTY) using a calibrated Ornstein-Uhlenbeck mean-reversion model with an ADX regime filter.',
        'Built walk-forward and Monte Carlo validation, tier-aware capital sizing, and a five-layer risk armor stack covering leverage cap, dual-cap max-lots, daily loss kill switch, tight Z-stops, and paper-side STOP enforcement.',
        'Live paper-trading on ₹37,50,000 simulated capital: +₹1,77,428 net P&L, 68% win rate, Sharpe 1.32, Sortino 1.41 (20d rolling).'
      ],
      skills: ['Python', 'numpy', 'pandas', 'Quantitative finance', 'Linux', 'systemd', 'Nginx']
    },
    {
      role: 'Engineer',
      company: 'Epicenter Exchange',
      type: 'Non-profit · Volunteer',
      start: '2026',
      end: 'Present',
      location: 'Remote, India',
      url: 'https://epicenterexchange.com',
      logoColor: 'from-sky-500 to-emerald-500',
      description: [
        'Built epicenterexchange.com — free non-profit finance education site with live equity and crypto dashboards, an in-browser backtester (SMA, RSI, MACD), seven long-form articles, and four calculators.',
        "Static HTML and Tailwind frontend on GitHub Pages, FastAPI backend on a Hostinger Mumbai VPS behind nginx and Let's Encrypt, Resend transactional email, Consent Mode v2 cookie banner."
      ],
      skills: ['FastAPI', 'Python', 'GitHub Pages', 'Nginx', "Let's Encrypt", 'Resend']
    }
  ],
  skills: {
    'AI and ML': [
      'LLM applications',
      'Prompt engineering',
      'OpenAI API',
      'Anthropic API',
      'RAG',
      'pgvector',
      'Chroma',
      'Pinecone',
      'MCP servers',
      'AI agents',
      'Tool calling',
      'PyTorch',
      'scikit-learn',
      'pandas',
      'numpy'
    ],
    'Languages and Frameworks': [
      'Python',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Next.js (App Router, RSC)',
      'React',
      'Express',
      'FastAPI',
      'Tailwind CSS'
    ],
    Databases: ['PostgreSQL', 'MySQL', 'SQLite', 'pgvector', 'Redis', 'Prisma'],
    Infrastructure: [
      'Linux (Ubuntu)',
      'Docker',
      'Nginx',
      'systemd',
      "Let's Encrypt",
      'pm2',
      'VPS administration',
      'GitHub Actions'
    ],
    Integrations: ['Angel One SmartAPI', 'Razorpay', 'Resend', 'Octokit', 'Notion API', 'Slack API', 'Webhooks']
  },
  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      school: 'Maharishi Markandeshwar University',
      location: 'Ambala, Haryana, India',
      start: '2021',
      end: '2024',
      note: 'NAAC A++ Accredited University',
      logoColor: 'from-blue-500 to-indigo-500'
    }
  ]
};
