export const site = {
  name: 'DevPilotX',
  description: 'I build production-grade AI agents, RAG systems, and full-stack platforms. Solo, in production, for real users.',
  adsense: 'ca-pub-6484525483464374',
  ownerName: 'Dipanshu Kumar',
  role: 'AI Engineer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://devpilotx.com',
  tagline:
    'I build production-grade AI agents, RAG systems, and full-stack platforms. Solo, in production, for real users.',
  shortBio:
    'Independent AI engineer from India. BCA graduate from Maharishi Markandeshwar University. I ship live AI agents, automation pipelines, finance tools, and developer infrastructure.',
  primaryEmail: 'hello@devpilotx.com',
  email: {
    hello: 'hello@devpilotx.com',
    contact: 'contact@devpilotx.com',
    services: 'services@devpilotx.com',
    support: 'support@devpilotx.com',
    billing: 'billing@devpilotx.com',
    legal: 'legal@devpilotx.com',
    security: 'security@devpilotx.com',
    careers: 'careers@devpilotx.com',
    founder: 'dipanshu@devpilotx.com',
    admin: 'admin@devpilotx.com',
    noreply: 'no-reply@devpilotx.com'
  },
  github: 'https://github.com/devpilotX',
  linkedin: 'https://linkedin.com/in/dipanshu03j',
  twitter: 'https://twitter.com/dipanshu03j',
  youtube: 'https://www.youtube.com/@StackAndSyntax',
  paisareality: 'https://paisareality.com',
  valueCodes: 'https://value.codes',
  epicenterExchange: 'https://epicenterexchange.com',
  links: {
    github: 'https://github.com/devpilotX',
    linkedin: 'https://linkedin.com/in/dipanshu03j',
    twitter: 'https://twitter.com/dipanshu03j',
    youtube: 'https://www.youtube.com/@StackAndSyntax',
    paisareality: 'https://paisareality.com',
    valueCodes: 'https://value.codes',
    epicenterExchange: 'https://epicenterexchange.com'
  },
  analytics: {
    ga: 'G-5XLBZN8M7M',
    adsense: 'ca-pub-6484525483464374'
  },
  nav: [
    { href: '/projects', label: 'Projects' },
    { href: '/tools', label: 'Tools' },
    { href: '/services', label: 'Services' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' }
  ]
} as const;

export type Site = typeof site;
