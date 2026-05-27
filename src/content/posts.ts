export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string;
};

export const posts: Post[] = [
  {
    slug: 'building-a-local-rag-portfolio',
    title: 'Building a local RAG over my portfolio without an LLM bill',
    date: '2026-05-27',
    excerpt:
      'How the Ask Dipanshu widget on this site retrieves relevant resume and project snippets without calling any external model.',
    tags: ['RAG', 'Next.js', 'Engineering notes'],
    body: `Most portfolio chat widgets pay an LLM per request. This one does not. The goal was to keep the assistant on the site useful, fast, and free to operate, even if traffic spikes.\n\nThe retrieval index lives in process. On boot, the corpus is tokenized once: every project description, every resume bullet, every service deliverable, the about text. Each document keeps a term-frequency map. A query is tokenized the same way, scored against every document with a small log-weighted sum, and the top matches are returned with a snippet window.\n\nThere is no neural model and no API call. The site responds in single-digit milliseconds and never has a cold start cost from an external provider. For a portfolio Q&A it is more than enough. You can see it working on every page through the floating Ask Dipanshu bubble.\n\nThe trade off is that the assistant cannot reason. It cannot summarize across documents or write fresh prose. It surfaces the right document fast and shows where the answer came from. For an interview signal or a recruiter scan, this is the better default. Cite the source, do not hallucinate it.`
  },
  {
    slug: 'five-layer-risk-armor',
    title: 'Five layers of defense between an algo and a margin call',
    date: '2026-05-24',
    excerpt:
      'Notes from hardening the OU-MRS paper-trading bot after a 20.6x leverage anomaly. Notional caps, dual-cap max lots, kill switches.',
    tags: ['Quant', 'Risk', 'Python'],
    body: `OU-MRS runs an Ornstein-Uhlenbeck mean-reversion strategy on Indian index options. After a phase eight bug let a single position approach 20x notional leverage on a small paper account, the rule became: never let one number be the only thing standing between the strategy and ruin.\n\nThe risk stack now has five independent layers. A pre-trade leverage check rejects orders that exceed a hard notional cap. A position cap rejects orders that would put more than a configured percentage of capital in one symbol. A dual-cap max-lots layer takes the minimum of two independent lot-size calculations. A real-time drawdown monitor flattens everything when daily loss crosses a threshold. A heartbeat-driven kill switch trips if the strategy stops emitting health beacons.\n\nEach layer is dumb on purpose. Smart code is the kind that fails interestingly. Risk code should fail boringly: a noisy log, a flat book, and a person paged. The strategy itself can be as adventurous as it wants because the rails are paranoid.`
  }
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
