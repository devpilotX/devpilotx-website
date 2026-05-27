import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/content/site';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'About',
  description: 'About DevPilotX, the studio, and the engineer behind it.',
  path: '/about'
});

export default function AboutPage() {
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="About" title="A small studio with a senior bar." description="DevPilotX is a one person studio. I work directly with founders and teams to ship things that hold up in production." />
      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="prose-body space-y-5 text-base leading-7">
          <p>
            I am Dipanshu. I have been writing software full time for years, mostly for products that need to feel calm and fast: finance tools, research sites, internal dashboards, and AI features that actually do their job.
          </p>
          <p>
            My focus is craft. I would rather ship a smaller surface area that you can read, run, and maintain than a sprawling system that nobody understands a quarter later.
          </p>
          <p>
            Outside of client work, I run a few of my own products: PaisaReality for Indian personal finance, Value.Codes as an editorial hub, and Epicenter Exchange as a non profit finance research site. Those products fund the time I spend on long term research and open source.
          </p>
          <p>
            If something on this site resonates with you, the contact page is the fastest way to reach me. I read every message.
          </p>
        </div>
        <aside className="card h-fit">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">Reach out</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li><a className="hover:text-brand-600 dark:hover:text-brand-400" href={'mailto:' + site.email.hello}>{site.email.hello}</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-brand-400" href={site.github} rel="noreferrer">GitHub</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-brand-400" href={site.linkedin} rel="noreferrer">LinkedIn</a></li>
            <li><a className="hover:text-brand-600 dark:hover:text-brand-400" href={site.youtube} rel="noreferrer">YouTube</a></li>
          </ul>
          <div className="mt-6">
            <Link href="/contact" className="btn-primary w-full">Start a project</Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
