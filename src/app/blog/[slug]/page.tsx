import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/Container';
import { getPost, posts } from '@/content/posts';
import { formatDate } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: '/blog/' + p.slug });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  return (
    <Container className="py-20">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">{formatDate(p.date)}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{p.title}</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{p.excerpt}</p>
        <div className="prose-body mt-8 space-y-5 text-base leading-7">
          {p.body.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))}
        </div>
        <div className="mt-10">
          <Link href="/blog" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Back to blog</Link>
        </div>
      </article>
    </Container>
  );
}
