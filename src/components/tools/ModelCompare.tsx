'use client';

import { useMemo, useState } from 'react';
import { llmModels, formatUSD, formatTokens } from '@/lib/llm-pricing';
import type { LLMModel, LLMProvider } from '@/lib/llm-pricing';
import { ArrowUpDown, Search } from 'lucide-react';

type SortKey = 'name' | 'provider' | 'context' | 'inputPer1M' | 'outputPer1M' | 'tier';

const providers: LLMProvider[] = ['OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Mistral', 'Meta', 'Alibaba', 'xAI'];
const tiers = ['frontier', 'workhorse', 'fast', 'value'] as const;

export default function ModelCompare() {
  const [q, setQ] = useState('');
  const [providerFilter, setProviderFilter] = useState<LLMProvider | 'all'>('all');
  const [tierFilter, setTierFilter] = useState<typeof tiers[number] | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('inputPer1M');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = llmModels.filter((m) => {
      if (providerFilter !== 'all' && m.provider !== providerFilter) return false;
      if (tierFilter !== 'all' && m.tier !== tierFilter) return false;
      if (query && !`${m.name} ${m.provider}`.toLowerCase().includes(query)) return false;
      return true;
    });
    list = list.slice().sort((a, b) => {
      const av = a[sortKey] as string | number;
      const bv = b[sortKey] as string | number;
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return list;
  }, [q, providerFilter, tierFilter, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(k); setSortDir('asc'); }
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <label className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search model or provider…" className="input-base pl-9" />
        </label>
        <select value={providerFilter} onChange={(e) => setProviderFilter(e.target.value as LLMProvider | 'all')} className="input-base w-auto">
          <option value="all">All providers</option>
          {providers.map((p) => (<option key={p} value={p}>{p}</option>))}
        </select>
        <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value as typeof tiers[number] | 'all')} className="input-base w-auto">
          <option value="all">All tiers</option>
          {tiers.map((t) => (<option key={t} value={t}>{t}</option>))}
        </select>
      </div>

      <div className="overflow-x-auto card !p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.16em] text-fg-muted">
              <Th onClick={() => toggleSort('name')}>Model</Th>
              <Th onClick={() => toggleSort('provider')}>Provider</Th>
              <Th onClick={() => toggleSort('tier')}>Tier</Th>
              <Th onClick={() => toggleSort('context')} numeric>Context</Th>
              <Th numeric>Max out</Th>
              <Th onClick={() => toggleSort('inputPer1M')} numeric>Input / 1M</Th>
              <Th onClick={() => toggleSort('outputPer1M')} numeric>Output / 1M</Th>
              <Th>Modality</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-t border-border align-top">
                <Td>
                  <div className="text-fg font-medium">{m.name}</div>
                  {m.notes ? <div className="text-[11px] text-fg-muted mt-0.5">{m.notes}</div> : null}
                </Td>
                <Td><span className="text-fg-dim">{m.provider}</span></Td>
                <Td><span className="chip text-[11px] capitalize">{m.tier}</span></Td>
                <Td numeric><span className="text-fg-dim font-mono text-[12px]">{formatTokens(m.context)}</span></Td>
                <Td numeric><span className="text-fg-dim font-mono text-[12px]">{formatTokens(m.maxOutput)}</span></Td>
                <Td numeric><span className="text-fg font-mono text-[12px]">{formatUSD(m.inputPer1M)}</span></Td>
                <Td numeric><span className="text-fg font-mono text-[12px]">{formatUSD(m.outputPer1M)}</span></Td>
                <Td>
                  <div className="flex flex-wrap gap-1">
                    {m.modality.map((md) => (<span key={md} className="chip text-[11px]">{md}</span>))}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[11px] text-fg-muted">Pricing is per 1M tokens, refreshed for late 2025. “Tier” is a subjective bucket meant to help triage, not a benchmark ranking.</p>
    </div>
  );
}

function Th({ children, onClick, numeric }: { children: React.ReactNode; onClick?: () => void; numeric?: boolean }) {
  const base = 'px-4 py-3 select-none ' + (numeric ? 'text-right ' : '') + (onClick ? 'cursor-pointer hover:text-fg' : '');
  return (
    <th className={base} onClick={onClick}>
      <span className="inline-flex items-center gap-1">{children}{onClick ? <ArrowUpDown size={10} className="opacity-60" /> : null}</span>
    </th>
  );
}

function Td({ children, numeric }: { children: React.ReactNode; numeric?: boolean }) {
  return <td className={'px-4 py-3 ' + (numeric ? 'text-right' : '')}>{children}</td>;
}

export type _SlotsForLint = LLMModel;
