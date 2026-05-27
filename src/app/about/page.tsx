import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/content/site';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, Youtube } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'About',
  description: 'About DevPilotX, the studio, and the engineer behind it.',
  path: '/about'
});

export default function AboutPage() {
  return (
    <Container className="py-20 sm:py-24">
      <SectionHeading eyebrow="About" title="A small studio with a senior bar." description="DevPilotX is a one-person studio. I work directly with founders and teams to ship things that hold up in production." />
      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6 text-base leading-7 text-fg-dim">
          <p>I am Dipanshu. I have been writing software full time for years, mostly for products that need to feel calm and fast: finance tools, research sites, internal dashboards, and AI features that actually do their job.</p>
          <p>My focus is craft. I would rather ship a smaller surface area that you can read, run, and maintain than a sprawling system nobody understands a quarter later.</p>
          <p>Outside of client work, I run a few of my own products: PaisaReality for Indian personal finance, Value.Codes as a developer tools hub, and Epicenter Exchange as a non-profit finance research site. Those products fund the time I spend on long-term research and open source.</p>
          <p>If something on this site resonates with you, the contact page is the fastest way to reach me. I read every message.</p>
        </div>
        <aside className="card h-fit">
          <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-3">Reach out</div>
          <ul className="space-y-3 text-sm">
            <li><a className="text-fg-dim hover:text-fg inline-flex items-center gap-2" href={'mailto:' + site.email.hello}><Mail size={14} /> {site.email.hello}</a></li>
            <li><a className="text-fg-dim hover:text-fg inline-flex items-center gap-2" href={site.github} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a></li>
            <li><a className="text-fg-dim hover:text-fg inline-flex items-center gap-2" href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a></li>
            <li><a className="text-fg-dim hover:text-fg inline-flex items-center gap-2" href={site.youtube} target="_blank" rel="noreferrer"><Youtube size={14} /> YouTube</a></li>
          </ul>
          <div className="mt-6">
            <Link href="/contact" className="btn btn-primary w-full justify-center">Start a project <ArrowRight size={14} className="ml-2" /></Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
