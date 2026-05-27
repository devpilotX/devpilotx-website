'use client';

import { useMemo, useState } from 'react';
import { llmModels, formatUSD, formatTokens } from '@/lib/llm-pricing';
import { estimateTokens } from '@/lib/tokens';
import { Sparkles } from 'lucide-react';

const SAMPLE = `You are an expert technical writer. Summarise the following document into three crisp paragraphs aimed at a senior engineer.\n\nDocument:\n[paste content here]`;

export default function TokenCostCalculator() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('A clean, three-paragraph summary suitable for a senior engineer.');
  const [modelId, setModelId] = useState(llmModels[0].id);
  const [callsPerMonth, setCallsPerMonth] = useState(10_000);

  const model = useMemo(() => llmModels.find((m) => m.id === modelId) ?? llmModels[0], [modelId]);

  const inputTokens = useMemo(() => estimateTokens(input, model.charsPerToken), [input, model]);
  const outputTokens = useMemo(() => estimateTokens(output, model.charsPerToken), [output, model]);

  const perCall = useMemo(() => {
    const inCost = (inputTokens / 1_000_000) * model.inputPer1M;
    const outCost = (outputTokens / 1_000_000) * model.outputPer1M;
    return inCost + outCost;
  }, [inputTokens, outputTokens, model]);

  const perThousand = perCall * 1000;
  const perMillion = perCall * 1_000_000;
  const monthly = perCall * callsPerMonth;

  // Side-by-side comparison across all models for the same input/output
  const ranking = useMemo(() => {
    return llmModels
      .map((m) => {
        const it = estimateTokens(input, m.charsPerToken);
        const ot = estimateTokens(output, m.charsPerToken);
        const cost = (it / 1_000_000) * m.inputPer1M + (ot / 1_000_000) * m.outputPer1M;
        return { m, cost };
      })
      .sort((a, b) => a.cost - b.cost);
  }, [input, output]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr,1fr]">
      {/* Inputs */}
      <div className="space-y-5">
        <div className="card">
          <label className="text-[11px] uppercase tracking-[0.20em] text-fg-muted block mb-2">Input prompt</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="input-base font-mono text-[13px]" />
          <div className="mt-2 text-xs text-fg-muted">Estimated <span className="text-fg">{formatTokens(inputTokens)}</span> tokens.</div>
        </div>

        <div className="card">
          <label className="text-[11px] uppercase tracking-[0.20em] text-fg-muted block mb-2">Expected output</label>
          <textarea value={output} onChange={(e) => setOutput(e.target.value)} rows={5} className="input-base font-mono text-[13px]" />
          <div className="mt-2 text-xs text-fg-muted">Estimated <span className="text-fg">{formatTokens(outputTokens)}</span> tokens.</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card">
            <label className="text-[11px] uppercase tracking-[0.20em] text-fg-muted block mb-2">Model</label>
            <select value={modelId} onChange={(e) => setModelId(e.target.value)} className="input-base">
              {llmModels.map((m) => (
                <option key={m.id} value={m.id}>{m.provider} · {m.name}</option>
              ))}
            </select>
            <div className="mt-2 text-xs text-fg-muted">${model.inputPer1M.toFixed(2)} in / ${model.outputPer1M.toFixed(2)} out per 1M</div>
          </div>
          <div className="card">
            <label className="text-[11px] uppercase tracking-[0.20em] text-fg-muted block mb-2">Calls per month</label>
            <input type="number" min={0} value={callsPerMonth} onChange={(e) => setCallsPerMonth(Math.max(0, Number(e.target.value) || 0))} className="input-base" />
            <div className="mt-2 text-xs text-fg-muted">Used for monthly projection</div>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="space-y-5">
        <div className="card surface-elevated">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-fg-dim" />
            <h3 className="text-sm font-semibold tracking-tight text-fg">Cost for {model.provider} · {model.name}</h3>
          </div>
          <dl className="space-y-3">
            <Row k="Per call" v={formatUSD(perCall)} />
            <Row k="Per 1,000 calls" v={formatUSD(perThousand)} />
            <Row k="Per 1,000,000 calls" v={formatUSD(perMillion)} />
            <div className="divider-grad my-2" />
            <Row k="Projected monthly" v={formatUSD(monthly)} strong />
            <div className="text-xs text-fg-muted">Based on {callsPerMonth.toLocaleString()} calls / month</div>
          </dl>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold tracking-tight text-fg mb-3">All models, ranked by cost</h3>
          <div className="space-y-2">
            {ranking.map(({ m, cost }, idx) => (
              <div key={m.id} className="flex items-center justify-between text-sm gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[11px] text-fg-muted w-5">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-fg truncate">{m.name}</span>
                  <span className="text-[11px] text-fg-muted">{m.provider}</span>
                </div>
                <span className="text-fg-dim font-mono text-[12px]">{formatUSD(cost)}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-fg-muted">Token counts are estimated via a character/token heuristic per family. Real tokenizers may differ by 5–15%. Pricing is per provider docs as of late 2025.</p>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-fg-dim">{k}</dt>
      <dd className={'font-mono ' + (strong ? 'text-fg font-semibold text-base' : 'text-fg')}>{v}</dd>
    </div>
  );
}
