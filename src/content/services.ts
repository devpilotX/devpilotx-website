export type Service = {
  slug: string;
  name: string;
  oneLiner: string;
  icon: string; // lucide-react icon name
  bullets: string[];
  deliverables: string[];
  timeline: string;
  startsAt: string;
  gradient: string;
};

export const services: Service[] = [
  {
    slug: 'custom-ai-agents',
    name: 'Custom AI Agents',
    oneLiner: 'Domain-specific AI agents and MCP servers that actually run in your workflow.',
    icon: 'Bot',
    bullets: [
      'Notion AI custom agents with scoped tool access',
      'MCP servers for your internal APIs, databases, and SaaS tools',
      'LLM orchestration with retries, evals, and guardrails',
      'Logging, observability, and a kill switch'
    ],
    deliverables: [
      'Working agent deployed to your environment',
      'Tool definitions and prompt library checked into your repo',
      'Eval harness with at least 20 ground-truth tasks',
      'Runbook and operator guide'
    ],
    timeline: '1 to 3 weeks',
    startsAt: 'Quote on scope',
    gradient: 'from-indigo-500/30 via-violet-500/20 to-cyan-500/30'
  },
  {
    slug: 'automation-pipelines',
    name: 'Automation Pipelines',
    oneLiner: 'Reliable background workflows across Slack, GitHub, Gmail, Calendar, Notion, and your APIs.',
    icon: 'Workflow',
    bullets: [
      'Webhook handlers with idempotency and retries',
      'Scheduled jobs on your infra or mine (VPS, pm2, systemd)',
      'End-to-end monitoring and alerting',
      'Secrets handled correctly: env vars, vaults, no plaintext'
    ],
    deliverables: [
      'Production-deployed pipeline with health checks',
      'Source code in your repo with CI on lint and typecheck',
      'Operator dashboard or status endpoint',
      'Failure-mode documentation'
    ],
    timeline: '1 to 2 weeks',
    startsAt: 'Quote on scope',
    gradient: 'from-emerald-500/30 via-teal-500/20 to-indigo-500/30'
  },
  {
    slug: 'nextjs-websites',
    name: 'Next.js Websites and Dashboards',
    oneLiner: 'Production-grade Next.js 14+ apps. Same stack that powers paisareality.com and value.codes.',
    icon: 'LayoutDashboard',
    bullets: [
      'App Router, TypeScript, Tailwind, server components where they help',
      'PostgreSQL or MySQL with Prisma, JWT auth, payments (Razorpay or Stripe)',
      'SEO done properly: sitemap, robots, JSON-LD, Open Graph, Twitter cards',
      'Analytics, AdSense, Consent Mode v2 if you monetize'
    ],
    deliverables: [
      'Deployed Next.js app on Hostinger, Vercel, or your VPS',
      'Admin CMS or content editor where needed',
      'Performance budget passed: Lighthouse 90+ on mobile',
      'Handover doc covering env, deploys, and DNS'
    ],
    timeline: '2 to 6 weeks',
    startsAt: 'Quote on scope',
    gradient: 'from-amber-500/30 via-rose-500/20 to-indigo-500/30'
  },
  {
    slug: 'ai-integration',
    name: 'AI Integration',
    oneLiner: 'Add chatbots, RAG over your knowledge base, summarization, and content generation to existing apps.',
    icon: 'Sparkles',
    bullets: [
      'RAG pipelines on pgvector, Chroma, or Pinecone with citations',
      'OpenAI and Anthropic completions with cost controls',
      'Embedded chat widgets and search-augmented assistants',
      'Eval pipeline so quality does not silently drift'
    ],
    deliverables: [
      'Live AI feature in your product, behind a feature flag if you want',
      'Embedding ingestion pipeline you can run on demand',
      'Eval set covering tone, accuracy, and refusals',
      'Cost dashboard and rate-limit defaults'
    ],
    timeline: '1 to 4 weeks',
    startsAt: 'Quote on scope',
    gradient: 'from-sky-500/30 via-indigo-500/20 to-fuchsia-500/30'
  }
];
