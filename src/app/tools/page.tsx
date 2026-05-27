import Link from 'next/link';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { buildMetadata } from '@/lib/seo';
import { ArrowRight, Calculator, Database, Diff, GitCompareArrows, Lock, Sparkles, Zap } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'AI Engineering Toolkit',
  description: 'Free, no-signup tools for AI engineers and developers. Token + cost calculator, model comparison, RAG sizing, prompt diff.',
  path: '/tools'
});

const tools = [
  {
    href: '/tools/token-cost',
    name: 'Token & cost calculator',
    desc: 'Paste a prompt, pick a model, see input + output tokens and a per-call, per-1000, and per-million cost across 14 frontier and value models.',
    icon: Calculator,
    bullets: ['14 models', 'GPT-5, Claude 4.5, Gemini 2.5', 'Late-2025 pricing']
  },
  {
    href: '/tools/model-compare',
    name: 'Model comparison matrix',
    desc: 'Sortable table of context window, max output, modality, input/output pricing, and tier across providers. Find your best $/token tradeoff.',
    icon: GitCompareArrows,
    bullets: ['Sortable', 'Filter by provider', 'Modality tags']
  },
  {
    href: '/tools/rag-sizer',
    name: 'RAG sizing & cost',
    desc: 'Plan a retrieval system end to end: chunks, vector DB size (float32), one-time embedding cost, and monthly cost across Pinecone, pgvector, and Chroma.',
    icon: Database,
    bullets: ['Chunks + overlap', 'Vector DB cost', 'Per-month estimate']
  },
  {
    href: '/tools/prompt-diff',
    name: 'Prompt diff',
    desc: 'Word-level diff between two prompts with token counts on each side and a delta. Spot prompt drift across iterations.',
    icon: Diff,
    bullets: ['Word-level LCS', 'Token delta', 'Side-by-side']
  }
];

export default function ToolsPage() {
  return (
    <Container className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="Free · No signup · Runs in your browser"
        title="AI Engineering Toolkit"
        description="Four tools I built for myself, opened up for every AI engineer and developer. No accounts, no tracking inside the tools, no data leaves your browser."
      />

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
        <span className="chip"><Zap size={11} className="text-amber-500" /> 100% client-side</span>
        <span className="chip"><Lock size={11} className="text-emerald-500" /> Your text never leaves the browser</span>
        <span className="chip"><Sparkles size={11} className="text-fuchsia-500" /> Pricing refreshed late 2025</span>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.href} href={t.href} className="card card-hover relative overflow-hidden flex flex-col gap-5 focus-ring">
              <div className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
                  <Icon size={20} className="text-white" />
                </span>
                <ArrowRight size={16} className="text-fg-dim" />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-tight text-fg">{t.name}</div>
                <p className="mt-2 text-sm text-fg-dim leading-relaxed">{t.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {t.bullets.map((b) => (<span key={b} className="chip text-[11px]">{b}</span>))}
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-20">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-fg">Why this exists</h2>
          <div className="flex-1 h-px divider-grad" />
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            ['No signup', 'Most calculators want your email. These four run entirely in your browser — no API keys, no accounts, no telemetry.'],
            ['Pricing that is current', 'Provider pricing changes monthly. This data is refreshed for late 2025 and called out wherever it is approximate.'],
            ['Built by an engineer using them', 'I use these every day to scope client RAG work and ship features at PaisaReality and Epicenter Exchange. If a number lies, I notice fast.']
          ].map(([t, b]) => (
            <div key={t} className="card">
              <h3 className="text-sm font-semibold text-fg">{t}</h3>
              <p className="mt-2 text-sm text-fg-dim leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
