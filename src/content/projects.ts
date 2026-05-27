export type ProjectStatus = 'live' | 'in_progress' | 'planned' | 'archived';

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  status: ProjectStatus;
  featured?: boolean;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: 'paisareality',
    title: 'PaisaReality',
    tagline: "India's trusted salary and personal finance tools",
    description:
      'A consumer finance platform with a take-home salary calculator, EMI and SIP planners, tax estimators, and explainers tailored to Indian salary structures. Built with a focus on accuracy, fast load on low-end devices, and a clean reading experience.',
    techStack: ['Node.js', 'Express', 'EJS', 'Tailwind CSS', 'MariaDB', 'Nginx'],
    liveUrl: 'https://paisareality.com',
    repoUrl: 'https://github.com/devpilotX/paisareality',
    status: 'live',
    featured: true,
    highlights: [
      'Indian salary breakdown engine (CTC, gross, in-hand, tax regimes)',
      'SEO oriented content site with structured data',
      'Hosted on the same VPS as the rest of the studio'
    ]
  },
  {
    slug: 'value-codes',
    title: 'Value.Codes (DevPilotX)',
    tagline: 'Editorial and product hub for the DevPilotX brand',
    description:
      'A long form publication and project hub covering engineering, finance, and product craft. Hand built front end, server rendered, optimised for reading and search.',
    techStack: ['Node.js', 'EJS', 'Tailwind CSS', 'Nginx'],
    liveUrl: 'https://value.codes',
    repoUrl: 'https://github.com/devpilotX/DevPilotX',
    status: 'live',
    featured: true
  },
  {
    slug: 'epicenter-exchange',
    title: 'Epicenter Exchange',
    tagline: 'Free, non-profit finance research and education',
    description:
      'Static research site plus open source algorithmic signal demos. Designed to be a neutral teaching resource: clear explanations, reproducible notebooks, and example trading research that runs end to end.',
    techStack: ['HTML', 'Tailwind CSS', 'Python', 'GitHub Pages'],
    liveUrl: 'https://epicenterexchange.com',
    repoUrl: 'https://github.com/devpilotX/epicenter-exchange',
    status: 'live',
    featured: true
  },
  {
    slug: 'algo-engine',
    title: 'Algo Engine',
    tagline: 'Backtesting and signal research for systematic trading',
    description:
      'A research and backtesting engine for systematic trading strategies, exposed through a small operator dashboard. Used internally to evaluate ideas before any live deployment.',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js'],
    liveUrl: 'https://algo.devpilotx.com',
    status: 'in_progress',
    featured: true
  },
  {
    slug: 'ou-mrs',
    title: 'OU-MRS',
    tagline: 'Operational research and modelling sandbox',
    description:
      'Python toolkit for operations research style modelling: scheduling, routing, and resource allocation problems with reusable solver wrappers.',
    techStack: ['Python', 'OR-Tools', 'NumPy'],
    repoUrl: 'https://github.com/devpilotX/OU-MRS',
    status: 'in_progress'
  },
  {
    slug: 'minecraft-server-panel',
    title: 'Minecraft Server Panel',
    tagline: 'A clean control surface for self hosted game servers',
    description:
      'A TypeScript control panel for managing self hosted Minecraft servers, built on top of Pterodactyl and Wings. Focus on a calm operator UI and reliable lifecycle controls.',
    techStack: ['TypeScript', 'Next.js', 'Pterodactyl', 'Docker'],
    repoUrl: 'https://github.com/devpilotX/Minecraft-server-panel',
    status: 'in_progress'
  },
  {
    slug: 'devpilotx-website',
    title: 'devpilotx.com',
    tagline: 'This site',
    description:
      'The studio site you are looking at. Next.js 14 App Router, Tailwind, Prisma + Postgres, Resend for email, with a private operator dashboard at profile.devpilotx.com.',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Resend', 'Nginx'],
    repoUrl: 'https://github.com/devpilotX/devpilotx-website',
    status: 'in_progress'
  },
  {
    slug: 'agent-studio',
    title: 'Agent Studio',
    tagline: 'Custom AI agents wired into your stack',
    description:
      'A planned offering: bespoke AI agents that connect to your databases, inboxes, and tools, with audit logs and approval flows.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI', 'Anthropic'],
    status: 'planned'
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
