import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { getProject, projects } from '@/content/projects';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.tagline,
    path: '/projects/' + p.slug
  });
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  return (
    <Container className="py-20">
      <p className="text-sm uppercase tracking-widest text-brand-600 dark:text-brand-400">Project</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{p.title}</h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{p.tagline}</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="prose-body space-y-5 text-base leading-7">
          <p>{p.description}</p>
          {p.highlights && p.highlights.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Highlights</h2>
              <ul className="list-disc space-y-2 pl-5">
                {p.highlights.map((h) => (<li key={h}>{h}</li>))}
              </ul>
            </>
          ) : null}
        </div>
        <aside className="card h-fit">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">Details</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-900 dark:text-white">Status</dt>
              <dd className="text-slate-700 dark:text-slate-300">{p.status.replace('_', ' ')}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900 dark:text-white">Stack</dt>
              <dd className="flex flex-wrap gap-1.5 pt-1">
                {p.techStack.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">{t}</span>
                ))}
              </dd>
            </div>
            {p.liveUrl ? (
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">Live</dt>
                <dd><a className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300" href={p.liveUrl} target="_blank" rel="noreferrer">{p.liveUrl.replace(/^https?:\/\//, '')}</a></dd>
              </div>
            ) : null}
            {p.repoUrl ? (
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">Source</dt>
                <dd><a className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300" href={p.repoUrl} target="_blank" rel="noreferrer">View repo</a></dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-6">
            <Link href="/projects" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Back to all projects</Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
