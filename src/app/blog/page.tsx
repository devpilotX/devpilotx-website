import Link from 'next/link';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { posts } from '@/content/posts';
import { formatDate } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Notes from the DevPilotX studio on engineering, product, and craft.',
  path: '/blog'
});

export default function BlogPage() {
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Blog" title="Notes from the studio" description="Short, useful writing on engineering, product, and craft. No filler." />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <article key={p.slug} className="card">
            <p className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">{formatDate(p.date)}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              <Link href={'/blog/' + p.slug} className="hover:text-brand-600 dark:hover:text-brand-400">{p.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.excerpt}</p>
            <div className="mt-4">
              <Link href={'/blog/' + p.slug} className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">Read more</Link>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
