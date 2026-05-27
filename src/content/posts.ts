export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  publishedAt: string;
};

export const posts: Post[] = [
  {
    slug: 'why-devpilotx',
    title: 'Why DevPilotX',
    excerpt:
      'A short note on why I started DevPilotX, what kind of work the studio takes on, and how it tries to do that work well.',
    body:
      'I started DevPilotX because most sites and internal tools I saw were stuck in two failure modes: lifeless templates, or sprawling agency builds nobody could maintain.\n\nDevPilotX is the third option. Senior craft, small surface area, code you can read. Websites that load fast on real devices. Automation that you can actually trust to run unattended. AI agents that do one job extremely well, with logs, evals, and an off switch.\n\nIf you want to talk about a project, the contact page is open.',
    tags: ['intro', 'studio'],
    publishedAt: '2026-05-01'
  }
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
