'use client';

import { useMemo, useState } from 'react';
import { embeddingModels, formatUSD, formatTokens, formatBytes } from '@/lib/llm-pricing';

// Vector DB monthly cost models (approximate, USD)
// Pinecone Serverless: ~$0.33 per GB-month storage + read/write usage. We'll use storage only as a planning floor.
// pgvector (self-hosted): assume $6/month base for a small VPS + linear-ish scaling. Floor at $6.
// Chroma (self-hosted): same as pgvector for planning purposes — floor at $6.
function monthlyCost(host: 'pinecone' | 'pgvector' | 'chroma', bytes: number): number {
  const gb = bytes / (1024 ** 3);
  if (host === 'pinecone') return Math.max(0, gb * 0.33);
  if (host === 'pgvector') return Math.max(6, 6 + Math.max(0, gb - 1) * 2);
  return Math.max(6, 6 + Math.max(0, gb - 1) * 2);
}

export default function RagSizer() {
  const [docs, setDocs] = useState(5_000);
  const [avgLengthTokens, setAvgLengthTokens] = useState(1_200);
  const [chunkSize, setChunkSize] = useState(512);
  const [overlap, setOverlap] = useState(64);
  const [embeddingId, setEmbeddingId] = useState(embeddingModels[0].id);

  const embedding = useMemo(() => embeddingModels.find((e) => e.id === embeddingId) ?? embeddingModels[0], [embeddingId]);

  const calc = useMemo(() => {
    const effective = Math.max(1, chunkSize - overlap);
    const chunksPerDoc = Math.max(1, Math.ceil(avgLengthTokens / effective));
    const totalChunks = docs * chunksPerDoc;
    const totalTokens = totalChunks * chunkSize;
    const oneTimeEmbedCost = (totalTokens / 1_000_000) * embedding.pricePer1M;
    // float32 vector size = dim * 4 bytes. Add a small overhead for ids/metadata (~256 bytes/chunk).
    const vectorBytes = totalChunks * (embedding.dim * 4 + 256);
    return {
      effective,
      chunksPerDoc,
      totalChunks,
      totalTokens,
      oneTimeEmbedCost,
      vectorBytes,
      pinecone: monthlyCost('pinecone', vectorBytes),
      pgvector: monthlyCost('pgvector', vectorBytes),
      chroma: monthlyCost('chroma', vectorBytes)
    };
  }, [docs, avgLengthTokens, chunkSize, overlap, embedding]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
      <div className="space-y-5">
        <div className="card">
          <h3 className="text-sm font-semibold text-fg mb-4">Corpus</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Number of documents" value={docs} setValue={setDocs} min={1} />
            <Field label="Avg length (tokens)" value={avgLengthTokens} setValue={setAvgLengthTokens} min={1} />
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-fg mb-4">Chunking</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Chunk size (tokens)" value={chunkSize} setValue={setChunkSize} min={32} />
            <Field label="Overlap (tokens)" value={overlap} setValue={setOverlap} min={0} />
          </div>
          <p className="mt-3 text-[11px] text-fg-muted">Effective stride: {calc.effective} tokens per chunk → {calc.chunksPerDoc.toLocaleString()} chunks per document.</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-fg mb-4">Embedding model</h3>
          <select value={embeddingId} onChange={(e) => setEmbeddingId(e.target.value)} className="input-base">
            {embeddingModels.map((e) => (
              <option key={e.id} value={e.id}>{e.name} · {e.dim}d · ${e.pricePer1M.toFixed(3)}/M</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-5">
        <div className="card surface-elevated">
          <h3 className="text-sm font-semibold text-fg mb-4">Sizing</h3>
          <dl className="space-y-3">
            <Row k="Total chunks" v={calc.totalChunks.toLocaleString()} />
            <Row k="Total tokens to embed" v={formatTokens(calc.totalTokens)} />
            <Row k="Vector DB size (float32)" v={formatBytes(calc.vectorBytes)} />
            <div className="divider-grad my-2" />
            <Row k="One-time embedding cost" v={formatUSD(calc.oneTimeEmbedCost)} strong />
          </dl>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-fg mb-4">Estimated monthly storage cost</h3>
          <dl className="space-y-3">
            <Row k="Pinecone Serverless" v={formatUSD(calc.pinecone) + ' /mo'} />
            <Row k="pgvector (self-hosted)" v={formatUSD(calc.pgvector) + ' /mo'} />
            <Row k="Chroma (self-hosted)" v={formatUSD(calc.chroma) + ' /mo'} />
          </dl>
          <p className="mt-4 text-[11px] text-fg-muted">Pinecone uses ~$0.33 / GB-month storage; reads/writes are billed separately and not included here. Self-hosted estimates assume a small VPS as a floor.</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, setValue, min }: { label: string; value: number; setValue: (n: number) => void; min: number }) {
  return (
    <label>
      <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-1.5">{label}</div>
      <input type="number" min={min} value={value} onChange={(e) => setValue(Math.max(min, Number(e.target.value) || min))} className="input-base" />
    </label>
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
