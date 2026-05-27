export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  startingAtUSD?: number;
  deliverables: string[];
  idealFor: string[];
};

export const services: Service[] = [
  {
    slug: 'custom-website',
    name: 'Custom Website',
    tagline: 'Marketing site, product site, or portfolio built like a flagship.',
    description:
      'A senior level custom build on Next.js or a static stack of your choice. Design system, content model, analytics, SEO, and hosting decisions handled end to end.',
    startingAtUSD: 1200,
    deliverables: [
      'Discovery and information architecture',
      'Tailored design system with light and dark mode',
      'Up to eight pages, fully responsive and accessible',
      'SEO, sitemap, robots, structured data, Open Graph',
      'Analytics (GA4 or Plausible) and basic conversion events',
      'Deploy to Hostinger, Vercel, or your own VPS'
    ],
    idealFor: [
      'Founders launching a startup or service business',
      'Creators who want a real home, not a template',
      'Teams replacing a clunky legacy site'
    ]
  },
  {
    slug: 'automation',
    name: 'Automation',
    tagline: 'Wire your tools together so the boring work stops.',
    description:
      'Custom automation across your stack: data pipelines, scheduled syncs, internal tooling, CRM glue, scrapers (within terms of service), and bespoke API integrations.',
    startingAtUSD: 800,
    deliverables: [
      'Process audit and ROI estimate before we build',
      'Reliable, observable jobs with logs and retries',
      'Documentation and a runbook your team can actually use',
      'Optional dashboards for monitoring'
    ],
    idealFor: [
      'Operations teams drowning in spreadsheet work',
      'Founders who need a v1 internal tool fast',
      'Anyone repeating the same task more than once a week'
    ]
  },
  {
    slug: 'ai-agent',
    name: 'Custom AI Agent',
    tagline: 'A focused agent that does one job extremely well.',
    description:
      'Bespoke AI agents wired into your data and tools. Used for triage, drafting, lookup, classification, and structured output. Built with safety, audit logs, and human approval where it matters.',
    startingAtUSD: 1500,
    deliverables: [
      'Use case scoping and evaluation plan',
      'Agent with tool access, memory, and guardrails',
      'Eval harness with regression tests',
      'Hosting on your infra or ours, with logs and metrics',
      'Handover doc and a short training session'
    ],
    idealFor: [
      'Support and sales teams swamped by repetitive queries',
      'Operators who want structured output from unstructured input',
      'Founders prototyping an AI feature for their product'
    ]
  },
  {
    slug: 'retainer',
    name: 'Engineering Retainer',
    tagline: 'A senior engineer on call, by the month.',
    description:
      'A monthly retainer for ongoing builds, fixes, and reviews. Best for teams that need senior judgement without a full-time hire.',
    startingAtUSD: 2000,
    deliverables: [
      'A fixed monthly bucket of focused engineering time',
      'Weekly check-in and a shared backlog',
      'Code reviews, architecture calls, and pair sessions',
      'Priority response on incidents'
    ],
    idealFor: [
      'Early stage teams without a senior engineer in house',
      'Solo founders who need a sparring partner',
      'Agencies overflowing on a hot project'
    ]
  }
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
