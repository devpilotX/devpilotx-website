import Link from 'next/link';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import ServiceCard from '@/components/ServiceCard';
import { featuredProjects } from '@/content/projects';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { ArrowRight, ArrowUpRight, Calculator, Database, Diff, GitCompareArrows } from 'lucide-react';

export const metadata = buildMetadata({
  title: site.name + ' · ' + site.role,
  description: site.description,
  path: '/'
});

const tools = [
  { href: '/tools/token-cost', name: 'Token & cost calculator', desc: 'Tokens, cost, and side-by-side ranking across 14 frontier and value models.', icon: Calculator },
  { href: '/tools/model-compare', name: 'Model comparison matrix', desc: 'Context, max output, modality, pricing across eight providers.', icon: GitCompareArrows },
  { href: '/tools/rag-sizer', name: 'RAG sizing & cost', desc: 'Chunks, vector DB size, embedding cost, monthly storage estimate.', icon: Database },
  { href: '/tools/prompt-diff', name: 'Prompt diff', desc: 'Word-level diff between prompts with token deltas.', icon: Diff }
];

const stats = [
  { label: 'Live products operated', value: '4', suffix: '' },
  { label: 'Markets covered', value: '4', suffix: '+', sub: 'India · US · UK · Crypto' },
  { label: 'Open-source repos', value: '12', suffix: '+' },
  { label: 'Cities (Paisa Reality)', value: '50', suffix: '+' }
];

export default function HomePage() {
  const featured = featuredProjects();
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border">
        <Container className="pt-16 pb-24 sm:pt-24 sm:pb-32 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-7">
              <span className="h-px w-8 bg-fg/40" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-fg-muted">DevPilotX Studio · Est. 2024</span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[80px] leading-[0.98] tracking-tight text-fg">
              Engineering for the<br className="hidden sm:block" />
              <em className="font-display italic">next</em> generation of <span className="text-gradient">AI products.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-[1.55] text-fg-dim">
              I am Dipanshu. DevPilotX is a one-person studio that ships production-grade AI agents, RAG systems, and full-stack platforms for founders and teams who care about craft.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn-primary">Start a project <ArrowRight size={14} className="ml-2" /></Link>
              <Link href="/projects" className="btn btn-secondary">View the work</Link>
              <Link href="/tools" className="btn btn-ghost">Open the AI toolkit <ArrowUpRight size={13} className="ml-1" /></Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats row — BlackRock-style trust strip */}
      <section className="relative border-b border-border bg-bg-soft/60">
        <Container className="py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
            {stats.map((s, i) => (
              <div key={s.label} className={i > 0 ? 'lg:border-l lg:border-border lg:pl-8' : ''}>
                <div className="font-display text-5xl sm:text-6xl text-fg numeric leading-none">
                  {s.value}<span className="text-fg-dim">{s.suffix}</span>
                </div>
                <div className="mt-3 text-[12px] uppercase tracking-[0.18em] text-fg-muted">{s.label}</div>
                {s.sub ? <div className="mt-1 text-[12px] text-fg-dim">{s.sub}</div> : null}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section className="relative">
        <Container className="py-24 sm:py-28">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <SectionHeading eyebrow="Selected work" title="Real products, in production today." description="A short, honest tour of what is live, what is in progress, and what is intentionally private." />
            <Link href="/projects" className="text-sm font-medium text-fg-dim hover:text-fg inline-flex items-center gap-1.5">
              All projects <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (<ProjectCard key={p.slug} project={p} />))}
          </div>
        </Container>
      </section>

      {/* AI Toolkit */}
      <section className="relative border-t border-border bg-bg-soft/40">
        <Container className="py-24 sm:py-28">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <SectionHeading eyebrow="Free · No signup · Client-side" title="An AI Engineering Toolkit, opened up." description="Four tools I built for myself, now free for every AI engineer and developer. Token math, model comparisons, RAG planning, prompt diffs — pricing refreshed for late 2025." />
            <Link href="/tools" className="text-sm font-medium text-fg-dim hover:text-fg inline-flex items-center gap-1.5">
              Open the toolkit <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t, idx) => {
              const Icon = t.icon;
              return (
                <Link key={t.href} href={t.href} className="card card-hover h-full flex flex-col gap-5 focus-ring">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl surface text-fg">
                      <Icon size={18} />
                    </span>
                    <span className="text-[11px] text-fg-muted numeric tracking-wider">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <div className="font-display text-lg font-medium tracking-tight text-fg leading-tight">{t.name}</div>
                    <p className="mt-2 text-[13px] text-fg-dim leading-relaxed">{t.desc}</p>
                  </div>
                  <ArrowUpRight size={14} className="mt-auto text-fg-muted" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="relative border-t border-border">
        <Container className="py-24 sm:py-28">
          <SectionHeading eyebrow="Services" title="Four clear ways to work together." description="Pick the scope that fits, or write to me and we will scope it together. Every engagement begins with a free 30-minute call." />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (<ServiceCard key={s.slug} service={s} index={i} />))}
          </div>
        </Container>
      </section>

      {/* About + CTA */}
      <section className="relative border-t border-border bg-bg-soft/40">
        <Container className="py-24 sm:py-28 grid items-center gap-14 lg:grid-cols-[1.3fr,1fr]">
          <div>
            <SectionHeading eyebrow="About the studio" title="Senior craft. One engineer. No layers between you and the work." />
            <p className="mt-7 text-base sm:text-lg leading-relaxed text-fg-dim max-w-xl">
              DevPilotX is intentionally small. You work directly with the engineer building your product — every commit, every email, every deploy. No account managers, no junior handoffs, no surprises.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-secondary">More about me</Link>
              <Link href="/contact" className="btn btn-primary">Get in touch <ArrowRight size={14} className="ml-2" /></Link>
            </div>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {[
              ['Operating', 'PaisaReality, Value.Codes, Epicenter Exchange'],
              ['Built on', 'Next.js, TypeScript, Tailwind, PostgreSQL, Nginx'],
              ['Discipline', 'SEO, accessibility, performance treated as first-class'],
              ['Posture', 'AdSense compliant, GDPR-aware, IP-anonymised analytics']
            ].map(([k, v]) => (
              <li key={k} className="py-5 flex items-baseline justify-between gap-6">
                <span className="text-[11px] uppercase tracking-[0.20em] text-fg-muted shrink-0">{k}</span>
                <span className="text-sm text-fg-dim text-right max-w-md">{v}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
