'use client';

import { useMemo, useState } from 'react';
import { wordDiff, estimateTokens } from '@/lib/tokens';
import { ArrowRight } from 'lucide-react';

const SAMPLE_A = `You are a helpful assistant. Answer the user's question in two short paragraphs.`;
const SAMPLE_B = `You are an expert technical writer. Answer the user's question in two crisp, well-cited paragraphs.`;

export default function PromptDiff() {
  const [a, setA] = useState(SAMPLE_A);
  const [b, setB] = useState(SAMPLE_B);

  const tokensA = useMemo(() => estimateTokens(a), [a]);
  const tokensB = useMemo(() => estimateTokens(b), [b]);
  const delta = tokensB - tokensA;

  const segs = useMemo(() => wordDiff(a, b), [a, b]);

  const added = segs.filter((s) => s.type === 'added').reduce((n, s) => n + s.value.length, 0);
  const removed = segs.filter((s) => s.type === 'removed').reduce((n, s) => n + s.value.length, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] uppercase tracking-[0.20em] text-fg-muted">Prompt A</label>
            <span className="text-[11px] text-fg-muted font-mono">{tokensA} tokens</span>
          </div>
          <textarea value={a} onChange={(e) => setA(e.target.value)} rows={10} className="input-base font-mono text-[13px]" />
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] uppercase tracking-[0.20em] text-fg-muted">Prompt B</label>
            <span className="text-[11px] text-fg-muted font-mono">{tokensB} tokens</span>
          </div>
          <textarea value={b} onChange={(e) => setB(e.target.value)} rows={10} className="input-base font-mono text-[13px]" />
        </div>
      </div>

      <div className="card surface-elevated">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-semibold text-fg">Word-level diff</h3>
          <div className="flex items-center gap-3 text-[12px] font-mono">
            <span className="text-emerald-600 dark:text-emerald-400">+{added} chars</span>
            <span className="text-rose-600 dark:text-rose-400">−{removed} chars</span>
            <span className="text-fg-dim">delta</span>
            <span className={delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
              {delta >= 0 ? '+' : ''}{delta} tokens
            </span>
          </div>
        </div>
        <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-fg-dim">
          {segs.map((s, i) => {
            if (s.type === 'equal') return <span key={i}>{s.value}</span>;
            if (s.type === 'added') return <span key={i} className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 rounded px-0.5">{s.value}</span>;
            return <span key={i} className="bg-rose-500/15 text-rose-700 dark:text-rose-300 line-through rounded px-0.5">{s.value}</span>;
          })}
        </pre>
      </div>

      <div className="text-[11px] text-fg-muted flex items-center gap-2">
        <span>Edit either side</span> <ArrowRight size={11} /> <span>diff updates instantly. Nothing leaves your browser.</span>
      </div>
    </div>
  );
}
