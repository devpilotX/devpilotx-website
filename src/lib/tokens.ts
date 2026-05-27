// Rough but useful token estimator.
// Heuristic: most BPE tokenizers land near 1 token per ~4 chars of English prose.
// Anthropic’s tokenizer is slightly denser (~3.8 chars/token), so we expose a per-model ratio.

export function estimateTokens(text: string, charsPerToken = 4): number {
  if (!text) return 0;
  // Roughly count chars excluding excessive whitespace
  const normalised = text.replace(/\s+/g, ' ').trim();
  if (!normalised) return 0;
  return Math.max(1, Math.ceil(normalised.length / charsPerToken));
}

// Word-level diff: produces an array of segments tagged equal/added/removed.
// Uses a longest common subsequence over whitespace-split tokens.
export type DiffSegment = { type: 'equal' | 'added' | 'removed'; value: string };

function tokenise(s: string): string[] {
  // Split keeping punctuation and whitespace as separate units so the diff is readable.
  return s.match(/\s+|[A-Za-z0-9_']+|[^\sA-Za-z0-9_']/g) ?? [];
}

export function wordDiff(a: string, b: string): DiffSegment[] {
  const x = tokenise(a);
  const y = tokenise(b);
  const n = x.length;
  const m = y.length;
  // Build LCS table (O(n*m)). For typical prompt sizes this is fine.
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = x[i] === y[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: DiffSegment[] = [];
  let i = 0; let j = 0;
  while (i < n && j < m) {
    if (x[i] === y[j]) { pushSeg(out, 'equal', x[i]); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { pushSeg(out, 'removed', x[i]); i++; }
    else { pushSeg(out, 'added', y[j]); j++; }
  }
  while (i < n) { pushSeg(out, 'removed', x[i++]); }
  while (j < m) { pushSeg(out, 'added', y[j++]); }
  return out;
}

function pushSeg(out: DiffSegment[], type: DiffSegment['type'], value: string) {
  const last = out[out.length - 1];
  if (last && last.type === type) last.value += value;
  else out.push({ type, value });
}
