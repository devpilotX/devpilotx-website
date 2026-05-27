export type ServiceTier = {
  tier: string;
  price: string;
  description: string;
  includes: string[];
  popular?: boolean;
};

export type ServiceFaq = { q: string; a: string };
export type ServiceProcessStep = { step: string; desc: string };

export type Service = {
  slug: string;
  name: string;
  oneLiner: string;
  tagline: string;
  icon: string;
  bullets: string[];
  deliverables: string[];
  timeline: string;
  startsAt: string;
  gradient: string;
  pricing: ServiceTier[];
  pricingNote: string;
  whyThisPrice: string[];
  whyTrust: string[];
  idealFor: string[];
  notFor: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: 'custom-ai-agents',
    name: 'Custom AI Agents',
    oneLiner: 'Domain-specific agents and MCP servers wired into your real tools, with real guardrails.',
    tagline: 'I build the autonomous teammates your business actually needs. Not a chatbot. Not a demo. A production agent connected to your stack, with evals, observability, and a kill switch.',
    icon: 'Bot',
    bullets: [
      'Custom MCP servers for Notion, Slack, GitHub, Gmail, Calendar',
      'OpenAI and Anthropic tool-calling agents with strict schemas',
      'Evaluation harness so you can prove it works before it ships',
      'Cost dashboard and per-call rate limits built in'
    ],
    deliverables: [
      'Production MCP server or agent running in your environment',
      'Eval set of 20 to 50 real tasks with measured pass rate',
      'Cost and latency dashboard with per-tool breakdown',
      'Kill switch and dry-run mode for every destructive action',
      'Written runbook for operations and incident response',
      'Repository access from day one in your GitHub org'
    ],
    timeline: '1 to 3 weeks',
    startsAt: '₹85,000  ·  $1,050',
    gradient: 'from-indigo-500/30 via-violet-500/20 to-cyan-500/30',
    pricing: [
      {
        tier: 'Single agent',
        price: '₹85,000  ·  $1,050',
        description: 'One focused agent with up to 5 tools, deployed to one platform.',
        includes: ['1 agent or assistant', 'Up to 5 tool integrations', 'Eval set of 20 tasks', 'Runbook and handover', '2 weeks post-launch support']
      },
      {
        tier: 'Multi-tool agent or MCP server',
        price: '₹1,50,000  ·  $1,850',
        description: 'Full MCP server with 10 to 15 tools, OAuth, error handling, observability.',
        includes: ['Production MCP server', '10 to 15 tool integrations', 'OAuth and secret management', 'Cost and latency dashboard', '4 weeks post-launch support'],
        popular: true
      },
      {
        tier: 'Agent system',
        price: '₹2,50,000+  ·  $3,000+',
        description: 'Coordinated multi-agent workflow with planner, executor, critic, and a custom UI.',
        includes: ['Multi-agent orchestration', 'Custom React or Next.js UI', 'Full eval harness with regression tests', 'On-call rotation for first 8 weeks', 'Source code and full IP transfer']
      }
    ],
    pricingNote: 'Every price is fixed and written before work starts. No hourly creep. If a change in scope is needed, I send a one-page amendment first.',
    whyThisPrice: [
      'You pay for senior engineering, not an agency markup. Comparable scope at a London or SF agency lands between $15k and $50k.',
      'I have already shipped five production AI systems on my own time. You do not pay me to learn the basics.',
      'Every project includes an eval harness. That alone saves the cost of a QA engineer and gives you proof the agent works before go-live.',
      'Indian engineering rates, global engineering standard. The math just works in your favour.'
    ],
    whyTrust: [
      'One accountable person from first call to handover. No project managers, no rotating offshore team, no language gap.',
      'Code lives in your GitHub from day one. Every commit is visible. You are never surprised by what was built.',
      'No proprietary lock-in. TypeScript, Python, Postgres, MCP. Your team can take over any time, with no consultant tax.',
      'Public track record on devpilotx.com, paisareality.com, value.codes, epicenterexchange.com. You can read the code that runs them.',
      'Direct email, no ticketing system. Same-day replies on weekdays. One Slack or Calendar invite per call if needed.'
    ],
    idealFor: [
      'Founders and teams with a workflow that wastes 5+ hours a week and is ready to be automated',
      'Companies running on Notion, Airtable, Slack, or custom dashboards that need a thoughtful AI layer',
      'Teams that tried no-code agent builders and hit a wall on reliability or integration depth'
    ],
    notFor: [
      'A chatbot for a marketing site. Use a no-code widget and save your money.',
      'Anyone who wants an agent to replace an entire role without human review. Agents are coworkers, not replacements.',
      'Projects where the AI is the marketing pitch but the actual need is a plain script or a cron job.'
    ],
    process: [
      { step: 'Discovery call', desc: 'Free 30 minute call. I learn your workflow, your tools, and the decision the agent needs to make.' },
      { step: 'Written scope', desc: 'Within 48 hours you get a one-page scope with milestones, fixed price, and a clear out clause.' },
      { step: 'Build and preview', desc: 'I build against your real tools. You see commits and previews from day one.' },
      { step: 'Eval and sign-off', desc: 'I run the eval set with you, we agree the pass bar, you sign off in writing.' },
      { step: 'Ship and support', desc: 'Production deploy, runbook, and a 2 to 8 week post-launch support window.' }
    ],
    faqs: [
      { q: 'Which LLMs do you use?', a: 'OpenAI GPT-4o and GPT-5, Anthropic Claude 3.5 and 4 Sonnet, and open models via Together or Groq when cost matters. I pick per task based on eval scores and price, not on hype.' },
      { q: 'Will the agent get expensive to run?', a: 'Every agent ships with a cost dashboard and per-call rate limits. A typical agent doing around 100 runs a day costs $20 to $80 a month in LLM spend.' },
      { q: 'What if the agent makes a mistake in production?', a: 'Every destructive action has a dry-run mode and a confirmation gate by default. There is a kill switch you can hit from a single command. Critical actions like sending email or modifying records are always logged.' },
      { q: 'Do you sign NDAs?', a: 'Yes, before the first call if needed. I keep a clean mutual NDA template that I can send in minutes.' },
      { q: 'Can you start next week?', a: 'Sometimes. I take 2 to 3 clients at a time so the queue varies. Email me at services@devpilotx.com to ask about availability.' }
    ]
  },
  {
    slug: 'automation-pipelines',
    name: 'Automation Pipelines',
    oneLiner: 'End-to-end pipelines across Notion, Slack, GitHub, Gmail, Calendar, and your databases.',
    tagline: 'The slow, repetitive work in your week is the easy stuff to automate. I build the pipelines that make it disappear, with retries, alerting, and a status dashboard so you trust them.',
    icon: 'Workflow',
    bullets: [
      'Cross-tool workflows that survive failures with retries and dead-letter queues',
      'Scheduled jobs with cron precision and observability',
      'Status dashboards so the team can see what ran and why',
      'Notion-first databases, GitHub-first repos, you choose the source of truth'
    ],
    deliverables: [
      'Production pipeline running in your environment or my managed VPS',
      'Status dashboard with run history, errors, and retry button',
      'Alerting to email or Slack when something fails twice in a row',
      'Runbook covering deploy, rollback, and common incidents',
      'Source code in your GitHub from day one'
    ],
    timeline: '3 to 14 days',
    startsAt: '₹45,000  ·  $550',
    gradient: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
    pricing: [
      {
        tier: 'Single workflow',
        price: '₹45,000  ·  $550',
        description: '1 to 2 step automation. Example: GitHub PR opened triggers a Slack summary.',
        includes: ['1 workflow', 'Up to 3 integrations', 'Error alerts to email', 'Runbook', '1 week post-launch support']
      },
      {
        tier: 'Multi-step pipeline',
        price: '₹85,000  ·  $1,050',
        description: 'End-to-end workflow across 3 to 5 services with retries and monitoring.',
        includes: ['Up to 3 chained workflows', '3 to 5 integrations', 'Retries and dead-letter queue', 'Status dashboard', '2 weeks post-launch support'],
        popular: true
      },
      {
        tier: 'Scheduled job system',
        price: '₹1,25,000  ·  $1,500',
        description: 'Cron-style background jobs with full observability and a custom status page.',
        includes: ['Cron scheduling layer', '5+ jobs', 'Postgres-backed run history', 'Custom status page', '4 weeks post-launch support']
      }
    ],
    pricingNote: 'Hosting on my VPS is free for the first 3 months. After that, $15 a month covers infrastructure if you do not want to host it yourself.',
    whyThisPrice: [
      'Most teams pay an engineer for a week to wire up Zapier-style flows that break in 4 months. I build something that is observable, version-controlled, and easy to extend.',
      'You get a real Git repository, not a black-box no-code config. That means the next engineer can pick it up in an hour, not a week.',
      'Failure handling is included by default. Retries, dead-letter queues, and alerting are not add-ons; they are how every pipeline I build is shaped.'
    ],
    whyTrust: [
      'I run my own infrastructure on a VPS for paisareality.com, value.codes, devpilotx.com, and a private quant bot. The same operational hygiene goes into your pipeline.',
      'You see every run in the dashboard. If something breaks at 2am, you know about it before I do.',
      'No vendor lock-in. Plain Node.js, Python, and Postgres. Move it to your own infra any time.',
      'I never put credentials in code or in chat. Secrets are stored in environment variables or a secret manager you control.'
    ],
    idealFor: [
      'Teams whose Ops or Engineering hours are burning on the same 3 to 5 repeat tasks every week',
      'Founders running a business on Notion or Airtable who need it to talk to invoicing, email, or Slack',
      'Companies that outgrew Zapier or n8n and need something more reliable'
    ],
    notFor: [
      'A one-off script that only runs once. You can probably do that yourself in an afternoon.',
      'Workflows that depend on tools without an API or webhook. We will hit a wall fast.'
    ],
    process: [
      { step: 'Map your workflow', desc: 'Free 30 minute call where we whiteboard your current flow and what the automated version should look like.' },
      { step: 'Written scope', desc: 'One-page scope with steps, integrations, fixed price, and timeline.' },
      { step: 'Build', desc: 'I build in small commits. You get a preview link or a Notion update each working day.' },
      { step: 'Soft launch', desc: 'We run the pipeline alongside the manual process for a few days to catch edge cases.' },
      { step: 'Cut over', desc: 'Manual process retired. Dashboard hands off. Support window starts.' }
    ],
    faqs: [
      { q: 'Where will it run?', a: 'Three options: your own cloud (Railway, Render, AWS), a Hostinger VPS I help you set up, or a managed VPS I already operate. We pick during scoping.' },
      { q: 'What if an integration changes its API?', a: 'I write the integration layer so external changes break in one place, not everywhere. Maintenance is straightforward and well-documented.' },
      { q: 'Do you support self-hosting?', a: 'Yes. Every pipeline I build can be self-hosted with a single environment file and a Docker container or pm2 process.' },
      { q: 'Will it work with our existing tools?', a: 'If your tools have an API, webhooks, or even an email-in endpoint, almost always yes. We confirm on the discovery call.' }
    ]
  },
  {
    slug: 'nextjs-websites',
    name: 'Next.js Websites and Dashboards',
    oneLiner: 'Modern marketing sites, web apps, and dashboards built on Next.js 14+ with care.',
    tagline: 'I design and build Next.js sites and web apps that feel as good as they perform. SEO done right, accessibility default-on, Lighthouse 90+, and a codebase your team will not curse in six months.',
    icon: 'Layers',
    bullets: [
      'Marketing sites, web apps, dashboards, and full SaaS platforms',
      'Next.js App Router, Tailwind, React Server Components, edge-friendly',
      'SEO, JSON-LD, sitemap, accessibility, dark mode, performance budget',
      'CMS, auth, payments, transactional email wired in cleanly'
    ],
    deliverables: [
      'Production Next.js site or web app, hosted on Vercel, Hostinger, or your own infra',
      'CMS or content layer matching your needs (MDX, Notion, Sanity, or custom)',
      'Lighthouse score above 90 on Performance, Accessibility, Best Practices, SEO',
      'Analytics, sitemap, JSON-LD, and Open Graph all configured',
      'Source code in your GitHub from day one'
    ],
    timeline: '2 to 6 weeks',
    startsAt: '₹65,000  ·  $800',
    gradient: 'from-amber-500/30 via-orange-500/20 to-rose-500/30',
    pricing: [
      {
        tier: 'Marketing site',
        price: '₹65,000  ·  $800',
        description: 'Up to 8 pages, content-driven, SEO done right, Lighthouse 90+.',
        includes: ['Up to 8 pages', 'Custom design system', 'SEO, sitemap, JSON-LD', 'Dark mode', 'Hosting setup', '2 weeks post-launch support']
      },
      {
        tier: 'Web app',
        price: '₹1,75,000  ·  $2,100',
        description: 'Authenticated app with database, payments, and an admin panel.',
        includes: ['Auth (NextAuth or Clerk)', 'Postgres or MySQL', 'Payments (Stripe or Razorpay)', 'Admin panel', 'Transactional email', '4 weeks post-launch support'],
        popular: true
      },
      {
        tier: 'Full platform',
        price: '₹3,50,000+  ·  $4,200+',
        description: 'Multi-tenant SaaS with auth, billing, dashboards, content, and analytics.',
        includes: ['Multi-tenancy', 'Billing and subscription plans', 'Internal dashboards', 'CMS and marketing site', 'Analytics and event tracking', '8 weeks post-launch support']
      }
    ],
    pricingNote: 'Domain, hosting, and third-party services (Stripe, Razorpay, Resend, Sentry) are billed to your accounts. I do not mark them up.',
    whyThisPrice: [
      'A studio agency charges $8k to $25k for the same marketing site. I deliver the same quality solo because there is no project manager layer to fund.',
      'I write production-grade TypeScript. Your next hire can read it. No proprietary template debt.',
      'Lighthouse 90+, accessibility, and SEO are not upsells. They are how I build by default.',
      'You get a real component system, not a one-shot template. Adding pages later costs hours, not days.'
    ],
    whyTrust: [
      'You can audit my work on paisareality.com (Next.js 16 finance platform), value.codes (Express utility hub), epicenterexchange.com (non-profit dashboard), and devpilotx.com itself.',
      'I deploy live, not in a slide deck. Every milestone ends with a real URL you can click.',
      'Real CI checks before merge. TypeScript strict, ESLint, accessibility lint, Lighthouse smoke test.',
      'I will not vanish after launch. The support window is in writing and I keep it.'
    ],
    idealFor: [
      'Founders launching a real product who need a site that converts and a codebase that scales',
      'Companies with an old WordPress or static site that needs to grow up',
      'Teams that want to move off Wix, Webflow, or Framer onto a developer-friendly stack'
    ],
    notFor: [
      'Pure brochure sites under 4 pages where Framer or Webflow will serve you better and cheaper',
      'Anyone expecting a finished platform in a week. Quality takes the time it takes.'
    ],
    process: [
      { step: 'Discovery and scope', desc: 'Free 30 minute call. I send a written scope, fixed price, and a milestone plan within 48 hours.' },
      { step: 'Design', desc: 'I design in Figma or directly in code, depending on what you prefer. You see a working homepage in the first week.' },
      { step: 'Build', desc: 'Page by page, with previews deployed to a staging URL. You comment as I build.' },
      { step: 'Launch', desc: 'Production deploy, DNS, SSL, analytics, sitemap, and submission to Google Search Console.' },
      { step: 'Support', desc: '2 to 8 weeks of post-launch support depending on tier. Small fixes are free during this window.' }
    ],
    faqs: [
      { q: 'Where will my site be hosted?', a: 'Vercel by default. Hostinger or AWS if you prefer. I set everything up and document it.' },
      { q: 'Will I be able to update content myself?', a: 'Yes. Depending on your stack, you get an MDX repo with simple edits, a Notion-driven CMS, or a full admin panel.' },
      { q: 'Do you handle SEO?', a: 'I handle the technical foundation: titles, descriptions, JSON-LD, sitemap, robots.txt, Open Graph, canonical URLs, performance. Content strategy is separate and not my service.' },
      { q: 'What about ongoing maintenance?', a: 'Optional. After the support window, I offer monthly retainers for small changes, performance audits, and new pages.' }
    ]
  },
  {
    slug: 'ai-integration',
    name: 'AI Integration',
    oneLiner: 'Add AI features to your existing product without breaking what already works.',
    tagline: 'You already have a product. I bolt AI onto it carefully: search, summarization, generation, RAG, classification. Production-ready, observable, and reversible.',
    icon: 'Sparkles',
    bullets: [
      'RAG over your docs, knowledge base, or product database',
      'AI chat and search built into your existing app',
      'Summarization, classification, and generation features with eval coverage',
      'OpenAI, Anthropic, and open models on the same evaluation rail'
    ],
    deliverables: [
      'Production AI feature deployed in your app or as a standalone service',
      'Eval set proving the feature works on your real data',
      'Cost and latency telemetry plus a simple admin to monitor it',
      'Documentation for your engineering team',
      'Source code in your GitHub from day one'
    ],
    timeline: '1 to 4 weeks',
    startsAt: '₹55,000  ·  $650',
    gradient: 'from-fuchsia-500/30 via-pink-500/20 to-rose-500/30',
    pricing: [
      {
        tier: 'Chatbot or AI search',
        price: '₹55,000  ·  $650',
        description: 'AI chat widget or search-augmented assistant on your existing site or app.',
        includes: ['Chat or search widget', 'Embedded into your site', 'Basic eval set', 'Cost dashboard', '2 weeks post-launch support']
      },
      {
        tier: 'RAG over your docs',
        price: '₹1,25,000  ·  $1,500',
        description: 'Production RAG pipeline with embeddings, retrieval, citations, and ingestion.',
        includes: ['Embeddings pipeline', 'Vector database (pgvector, Chroma, or Pinecone)', 'Citation UI', 'Reindex on demand', '4 weeks post-launch support'],
        popular: true
      },
      {
        tier: 'Custom AI feature',
        price: '₹2,00,000+  ·  $2,400+',
        description: 'A real AI feature in your app: summarization, generation, classification, or scoring.',
        includes: ['End-to-end feature', 'Full eval harness', 'A/B comparison versus baseline', 'Telemetry and admin panel', '8 weeks post-launch support']
      }
    ],
    pricingNote: 'LLM API costs are billed to your accounts. I optimize prompts and pick models so your monthly inference bill is predictable, not a surprise.',
    whyThisPrice: [
      'Bolting AI onto a real product without breaking it is harder than building a demo. You are paying for restraint, evals, and a careful rollout, not for stack-overflow snippets.',
      'Every feature ships with an eval set. We measure quality before launch and after every prompt change. Your future self will thank you.',
      'I never lock you to one provider. The same feature can run on OpenAI, Anthropic, or open models with a single config change.'
    ],
    whyTrust: [
      'I have built RAG and agent features for finance, developer tools, and education. The pitfalls are familiar; I will not learn them on your dime.',
      'No black box. Every prompt, model, and retrieval step is in your repo and documented.',
      'You see real responses on your real data within the first week, not a generic ChatGPT demo.',
      'If the AI feature does not pass the eval bar, I tell you. I do not ship something that lies to your users.'
    ],
    idealFor: [
      'SaaS teams that want a real AI feature, not a tacked-on chatbot',
      'Companies sitting on a pile of internal docs, tickets, or contracts that should be queryable',
      'Founders who want AI in their product but want a sober engineer making the calls'
    ],
    notFor: [
      'Pure prompt engineering with no engineering work. Talk to a prompt consultant for that.',
      'AI features that need a research-grade fine-tune. I integrate, I do not train foundation models.'
    ],
    process: [
      { step: 'Discovery call', desc: 'Free 30 minute call. We pick the feature with the highest leverage on your roadmap.' },
      { step: 'Eval-first scoping', desc: 'I draft an eval set on your real data before writing the feature. We agree the bar in writing.' },
      { step: 'Build', desc: 'Feature built behind a flag, with previews shipped to staging. You see responses on your data within a week.' },
      { step: 'Compare and launch', desc: 'We benchmark versus baseline (manual or pre-AI). If it does not clear the bar, we iterate or stop. No vibes.' },
      { step: 'Monitor', desc: 'Telemetry, cost dashboard, and 2 to 8 weeks of post-launch support.' }
    ],
    faqs: [
      { q: 'Will my data train someone elses model?', a: 'No. I default to OpenAI and Anthropic with the no-training settings configured, or to open models running on infrastructure you control.' },
      { q: 'What does it cost to run?', a: 'For a small SaaS doing 10k AI calls a month, expect $30 to $200 in LLM spend. RAG over a typical knowledge base adds about $5 to $30 in monthly embedding and vector storage.' },
      { q: 'How do you measure quality?', a: 'A real eval set: 30 to 100 representative inputs, each with a clear pass criterion. We compute pass rate on every prompt or model change.' },
      { q: 'Can you work with my existing engineering team?', a: 'Yes, and I prefer it. I leave a clean codebase, write the docs, and pair with your engineers if you want.' }
    ]
  }
];
