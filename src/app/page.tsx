import Link from 'next/link';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import ServiceCard from '@/components/ServiceCard';
import { featuredProjects } from '@/content/projects';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import { ArrowRight, Calculator, Database, Diff, GitCompareArrows, Sparkles } from 'lucide-react';

export const metadata = buildMetadata({
  title: site.name + ' · ' + site.role,
  description: site.description,
  path: '/'
});

const tools = [
  { href: '/tools/token-cost', name: 'Token & cost calculator', desc: 'Estimate tokens and cost across GPT, Claude, Gemini, DeepSeek and more.', icon: Calculator },
  { href: '/tools/model-compare', name: 'Model comparison matrix', desc: 'Context, pricing, modality, and tradeoffs for 12+ frontier models.', icon: GitCompareArrows },
  { href: '/tools/rag-sizer', name: 'RAG sizing & cost', desc: 'Plan chunks, vector DB size, embedding cost, monthly storage.', icon: Database },
  { href: '/tools/prompt-diff', name: 'Prompt diff', desc: 'Word-level diff between two prompts with token delta.', icon: Diff }
];

export default function HomePage() {
  const featured = featuredProjects();
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Container className="pt-20 pb-24 sm:pt-28 sm:pb-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 chip">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
              <span>Open to work · remote, India</span>
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
              I ship <span className="text-gradient">production-grade</span> AI agents,<br className="hidden sm:inline" />
              RAG systems, and full-stack platforms.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-fg-dim">
              I am <strong className="text-fg font-medium">Dipanshu</strong>. I run DevPilotX as a one-person studio. Solo, in production, for real users — finance tools, developer infrastructure, quant research, and AI features that actually do their job.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn-primary">Start a project <ArrowRight size={14} className="ml-2" /></Link>
              <Link href="/projects" className="btn btn-secondary">See work</Link>
              <Link href="/tools" className="btn btn-ghost">Try the free AI toolkit</Link>
            </div>
          </div>

          {/* trust strip */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {[
              { k: 'Live products', v: '4' },
              { k: 'Markets covered', v: 'IN · US · UK · ₿' },
              { k: 'Stack discipline', v: 'TS · Py · Linux' },
              { k: 'Tracking', v: 'GA + AdSense only' }
            ].map((s) => (
              <div key={s.k} className="surface rounded-xl px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">{s.k}</div>
                <div className="mt-1 text-sm font-medium text-fg">{s.v}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* AI Toolkit highlight */}
      <section className="relative">
        <Container className="pb-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <SectionHeading eyebrow="Free · No signup" title="AI Engineering Toolkit" description="Four tools I built for myself, opened to every AI engineer and developer. Pricing data refreshed for late 2025." />
            <Link href="/tools" className="text-sm font-medium text-fg-dim hover:text-fg inline-flex items-center gap-1.5">
              Open the toolkit <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link key={t.href} href={t.href} className="card card-hover h-full flex flex-col gap-3 focus-ring">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
                    <Icon size={18} className="text-white" />
                  </span>
                  <div className="text-base font-semibold tracking-tight text-fg">{t.name}</div>
                  <p className="text-sm text-fg-dim leading-relaxed">{t.desc}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section className="relative border-t border-border">
        <Container className="py-24">
          <SectionHeading eyebrow="Selected work" title="Live and in-progress" description="A short, honest tour of what I have shipped and what I am building right now." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (<ProjectCard key={p.slug} project={p} />))}
          </div>
          <div className="mt-10">
            <Link href="/projects" className="text-sm font-medium text-fg-dim hover:text-fg inline-flex items-center gap-1.5">
              View all projects <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="relative border-t border-border bg-bg-soft">
        <Container className="py-24">
          <SectionHeading eyebrow="Services" title="How we can work together" description="Four ways to engage. Pick the one that fits, or write to me and we will scope it together." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (<ServiceCard key={s.slug} service={s} index={i} />))}
          </div>
        </Container>
      </section>

      {/* About snippet */}
      <section className="relative border-t border-border">
        <Container className="py-24 grid items-center gap-12 lg:grid-cols-[1.2fr,1fr]">
          <div>
            <SectionHeading eyebrow="About the studio" title="A one-person studio with a senior engineering bar." />
            <p className="mt-6 text-base leading-7 text-fg-dim">
              DevPilotX is intentionally small. You work directly with the engineer building your product. Every line of code, every email, every deploy. No account managers, no junior handoffs, no surprises.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-secondary">More about me</Link>
              <Link href="/contact" className="btn btn-primary">Get in touch <ArrowRight size={14} className="ml-2" /></Link>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-fg-dim" />
              <p className="text-[11px] uppercase tracking-[0.20em] text-fg-muted">Highlights</p>
            </div>
            <ul className="space-y-3 text-sm text-fg-dim leading-relaxed">
              <li>Operate PaisaReality, Value.Codes, and Epicenter Exchange on a single VPS.</li>
              <li>Built on Next.js, TypeScript, Tailwind, PostgreSQL, Nginx.</li>
              <li>SEO, accessibility, and performance treated as first-class.</li>
              <li>AdSense compliant, GDPR aware, analytics with IP anonymisation.</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
