export type ResumeRole = {
  company: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export type ResumeProject = {
  name: string;
  description: string;
  link?: string;
};

export type Resume = {
  name: string;
  headline: string;
  location: string;
  summary: string;
  email: string;
  links: { label: string; href: string }[];
  skills: { group: string; items: string[] }[];
  experience: ResumeRole[];
  projects: ResumeProject[];
  education: { school: string; degree: string; start: string; end: string }[];
};

export const resume: Resume = {
  name: 'Dipanshu (DevPilotX)',
  headline: 'Full-stack engineer building websites, automation, and AI agents.',
  location: 'India (remote)',
  summary:
    'I design and ship production web products end to end. My focus is small, senior craft: clean systems, fast pages, real business outcomes. I run DevPilotX, the studio behind PaisaReality, Value.Codes, and Epicenter Exchange.',
  email: 'hello@devpilotx.com',
  links: [
    { label: 'Website', href: 'https://devpilotx.com' },
    { label: 'GitHub', href: 'https://github.com/devpilotX' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/112110060' },
    { label: 'YouTube', href: 'https://www.youtube.com/@value_codes' }
  ],
  skills: [
    {
      group: 'Frontend',
      items: ['TypeScript', 'React', 'Next.js (App Router)', 'Tailwind CSS', 'Accessibility (WCAG AA)']
    },
    {
      group: 'Backend',
      items: ['Node.js', 'Next.js Route Handlers', 'Express', 'FastAPI', 'REST', 'GraphQL']
    },
    {
      group: 'Data',
      items: ['PostgreSQL', 'MariaDB', 'Prisma', 'SQL modelling', 'Redis']
    },
    {
      group: 'Infra',
      items: ['Linux VPS administration', 'Nginx', 'PM2', 'Docker', 'Let\u2019s Encrypt', 'CI/CD']
    },
    {
      group: 'AI and automation',
      items: ['LLM integration', 'Agent design', 'Vector search', 'Workflow automation']
    }
  ],
  experience: [
    {
      company: 'DevPilotX (independent studio)',
      title: 'Founder and lead engineer',
      start: '2024',
      summary:
        'Founded a small senior studio shipping production sites, automation, and AI agents for founders and SMBs.',
      highlights: [
        'Built and operate PaisaReality.com, Value.Codes, and Epicenter Exchange',
        'Run the studio infrastructure on a single VPS with PostgreSQL, MariaDB, Redis, Nginx, and Docker',
        'Designed reusable patterns for SEO, analytics, AdSense compliance, and accessibility'
      ]
    }
  ],
  projects: [
    {
      name: 'PaisaReality.com',
      description: "India's trusted salary and personal finance tools.",
      link: 'https://paisareality.com'
    },
    {
      name: 'Epicenter Exchange',
      description: 'Free, non-profit finance research and education site.',
      link: 'https://epicenterexchange.com'
    },
    {
      name: 'Value.Codes',
      description: 'Editorial and product hub for the DevPilotX brand.',
      link: 'https://value.codes'
    }
  ],
  education: []
};
