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
    slug: 'multi-tenant-ai-assistant-single-vps',
    title: 'How we shipped a three-brand AI assistant on a single VPS',
    date: '2026-05-28',
    excerpt:
      'Three production sites. Three AI personas. One small ARM VPS. The architecture, the retrieval index, and the trade-offs we made to keep the LLM bill at zero.',
    tags: ['AI', 'RAG', 'Multi-tenant', 'Architecture'],
    body: `DevPilotX, PaisaReality, and Value.Codes are three very different sites. One is a studio portfolio. One is an Indian personal finance hub. One is a developer tools library. They share one thing: every page now has a small floating assistant that actually knows the site it lives on.\n\nThe constraint was non-negotiable. No LLM bill, no third-party AI API, and one 4 GB ARM VPS shared with three Next.js apps and three databases. So the whole stack had to be retrieval-only, locally hosted, and tiny enough to start in under a second.\n\nThe shape of the system is three personas registered in a single assistants table. DevSage answers code and snippet questions on Value.Codes. Yojana Mitra explains government schemes and bank rates on PaisaReality. DevPilotX Builder answers questions about the studio itself. Each persona has its own colour, voice, knowledge cutoff, and most importantly its own knowledge namespace.\n\nThe knowledge layer is a simple but disciplined ingestion pipeline. Every published page on each site is crawled, normalised, split into chunks, hashed, and stored in a per-namespace SQLite table. Term-frequency scoring with a small inverse-document-frequency boost picks the top chunks for any incoming query. The whole thing fits comfortably in memory and adds about 30 ms to a response. There is no neural model in the loop.\n\nThe answer composer is intentionally conservative. It quotes from the retrieved chunks, never invents new facts, and always shows the source URL. If retrieval finds nothing relevant, the assistant says so and offers the contact form. That single rule killed an entire category of hallucination bugs that more ambitious systems run into.\n\nThe widget on the page is one self-contained script tag. It loads the persona config, paints the bubble in the right brand colour, and posts to a single ask endpoint with the persona slug. Because it carries no framework, it embeds cleanly on a Next.js page, a server-rendered EJS page, and a vanilla PHP page without surprises.\n\nOperationally the win is that we never pay per token. A traffic spike on Value.Codes costs the same as a quiet weekend. The cost ceiling is the VPS itself, which is fixed. The trade-off is exactly what you would expect: the assistant cannot reason across documents or write fresh prose. For a site assistant whose job is to surface the right answer fast, that is the better trade.\n\nIf you want to copy the pattern, the three things that mattered most were a strict per-namespace index, a composer that refuses to invent, and an embed widget light enough to drop on any framework. Everything else is fungible.`
  },
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
