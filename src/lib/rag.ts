import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { resume } from '@/content/resume';
import { site } from '@/content/site';

export type Doc = { id: string; title: string; url: string; text: string };
export type Match = Doc & { score: number; snippet: string };

const STOP = new Set([
  'the','a','an','and','or','but','of','for','to','in','on','at','by','with','from','as','is','are','was','were','be','been','being','it','its','this','that','these','those','i','you','he','she','we','they','what','which','who','how','when','where','why','can','do','does','did','have','has','had','will','would','should','could','about','my','your'
]);

function tokenize(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t));
}

function buildCorpus(): Doc[] {
  const docs: Doc[] = [];
  docs.push({
    id: 'about',
    title: `About ${resume.name}`,
    url: '/about',
    text: `${resume.name}. ${resume.headline}. ${resume.about} Location: ${resume.location}. Skills: ${Object.values(resume.skills).flat().join(', ')}.`
  });
  docs.push({
    id: 'resume',
    title: 'Resume',
    url: '/resume',
    text: `${resume.headline}. ${resume.experience.map((e) => `${e.role} at ${e.company}: ${e.description.join(" ")}`).join(' ')} Education: ${resume.education.map((e) => `${e.degree} from ${e.school}, ${e.start} to ${e.end}. ${e.note ?? ''}`).join(' ')}`
  });
  for (const p of projects) {
    docs.push({
      id: `project-${p.slug}`,
      title: p.name,
      url: `/projects/${p.slug}`,
      text: `${p.name}. ${p.oneLiner}. ${p.summary} Highlights: ${p.highlights.join(' ')} Stack: ${p.stack.join(', ')}. Tags: ${p.tags.join(', ')}.`
    });
  }
  for (const s of services) {
    docs.push({
      id: `service-${s.slug}`,
      title: s.name,
      url: `/services`,
      text: `${s.name}. ${s.oneLiner}. ${s.bullets.join(' ')} Deliverables: ${s.deliverables.join(' ')}.`
    });
  }
  docs.push({
    id: 'contact',
    title: 'Contact',
    url: '/contact',
    text: `Get in touch with ${resume.name}. Email ${site.email.hello}. LinkedIn ${resume.linkedinHandle}. GitHub ${resume.githubHandle}.`
  });
  return docs;
}

const CORPUS = buildCorpus();
const TOKENIZED: { doc: Doc; tokens: string[]; tf: Map<string, number> }[] = CORPUS.map((doc) => {
  const tokens = tokenize(doc.text + ' ' + doc.title);
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  return { doc, tokens, tf };
});

function snippetFor(text: string, qTerms: string[]): string {
  const lower = text.toLowerCase();
  let bestIdx = 0;
  let bestHits = 0;
  const windowSize = 220;
  for (let i = 0; i < lower.length; i += 40) {
    const chunk = lower.slice(i, i + windowSize);
    let hits = 0;
    for (const q of qTerms) if (chunk.includes(q)) hits += 1;
    if (hits > bestHits) { bestHits = hits; bestIdx = i; }
  }
  const start = Math.max(0, bestIdx - 10);
  const end = Math.min(text.length, start + windowSize);
  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = '… ' + snippet;
  if (end < text.length) snippet = snippet + ' …';
  return snippet;
}

export function search(query: string, limit = 4): Match[] {
  const qTerms = tokenize(query);
  if (qTerms.length === 0) return [];
  const scored = TOKENIZED.map(({ doc, tokens, tf }) => {
    let score = 0;
    for (const q of qTerms) {
      const count = tf.get(q) ?? 0;
      if (count > 0) score += 1 + Math.log(1 + count);
      if (doc.title.toLowerCase().includes(q)) score += 2;
    }
    if (tokens.length > 0) score = score / Math.log(2 + tokens.length);
    return { doc, score };
  })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map(({ doc, score }) => ({ ...doc, score, snippet: snippetFor(doc.text, qTerms) }));
}

export function summarize(query: string, matches: Match[]): string {
  if (matches.length === 0) {
    return `I do not have an indexed answer for that. Try asking about projects (PaisaReality, Value Codes, Epicenter Exchange, OU-MRS), services, skills, or contact info.`;
  }
  const top = matches[0];
  const others = matches.slice(1, 3).map((m) => m.title).join(', ');
  const tail = others ? ` See also: ${others}.` : '';
  return `${top.snippet}${tail}`;
}
