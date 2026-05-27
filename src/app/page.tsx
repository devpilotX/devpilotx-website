import Link from 'next/link';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectCard } from '@/components/ProjectCard';
import { ServiceCard } from '@/components/ServiceCard';
import { featuredProjects } from '@/content/projects';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: site.name + ' | ' + site.tagline,
  description: site.description,
  path: '/'
});

export default function HomePage() {
  const featured = featuredProjects();
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">DevPilotX studio</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              Senior craft for websites, automation, and AI agents.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              I am Dipanshu. I run DevPilotX, a small studio that ships production grade web products end to end. Real engineering, real outcomes, no theatre.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">Start a project</Link>
              <Link href="/projects" className="btn-secondary">See projects</Link>
              <Link href="/resume" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Or read my resume
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Selected work" title="Live and in-progress projects" description="A short, honest tour of what I have shipped and what I am building right now." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (<ProjectCard key={p.slug} project={p} />))}
          </div>
          <div className="mt-10">
            <Link href="/projects" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
              View all projects
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-900/50">
        <Container>
          <SectionHeading eyebrow="Services" title="How we can work together" description="Four ways to engage. Pick the one that fits, or write to me and we will scope it together." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((s) => (<ServiceCard key={s.slug} service={s} />))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.2fr,1fr]">
          <div>
            <SectionHeading eyebrow="About the studio" title="A one person studio with a senior engineering bar." />
            <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-300">
              DevPilotX is intentionally small. You work directly with the engineer building your product. Every line of code, every email, every deploy. No account managers, no junior handoffs, no surprises.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-secondary">More about me</Link>
              <Link href="/contact" className="btn-primary">Get in touch</Link>
            </div>
          </div>
          <div className="card">
            <p className="text-sm uppercase tracking-widest text-brand-600 dark:text-brand-400">Highlights</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li>Operate PaisaReality, Value.Codes, and Epicenter Exchange on a single VPS.</li>
              <li>Built on Next.js, TypeScript, Tailwind, Prisma, PostgreSQL, Nginx.</li>
              <li>SEO, accessibility, and performance treated as first class.</li>
              <li>AdSense compliant, GDPR aware, analytics with IP anonymisation.</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
