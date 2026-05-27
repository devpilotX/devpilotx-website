export const site = {
  name: 'DevPilotX',
  tagline: 'Custom websites, automation, and AI agents. Built with senior craft.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://devpilotx.com',
  description:
    'DevPilotX is the portfolio and services studio of Dipanshu. Custom websites, automation pipelines, and AI agents built end to end with senior craft.',
  twitter: '@value_codes',
  github: 'https://github.com/devpilotX',
  linkedin: 'https://www.linkedin.com/company/112110060',
  youtube: 'https://www.youtube.com/@value_codes',
  email: {
    hello: 'hello@devpilotx.com',
    contact: 'contact@devpilotx.com',
    services: 'services@devpilotx.com',
    admin: 'admin@devpilotx.com'
  },
  adsense: { client: 'ca-pub-6484525483464374' },
  analytics: { measurementId: 'G-5XLBZN8M7M' },
  nav: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/services', label: 'Services' },
    { href: '/resume', label: 'Resume' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]
} as const;
