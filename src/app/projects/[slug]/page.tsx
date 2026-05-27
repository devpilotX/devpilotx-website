import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft, ArrowUpRight, Lightbulb, Layers, AlertCircle, RotateCcw } from 'lucide-react';
import Container from '@/components/Container';
import { getProject, projects } from '@/content/projects';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return buildMetadata({
    title: p.name,
    description: p.oneLiner,
    path: '/projects/' + p.slug
  });
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <Container className="py-16 sm:py-20">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-fg-dim hover:text-fg mb-8">
        <ArrowLeft size={14} /> All projects
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl surface p-8 sm:p-12">
        <div aria-hidden className={cn('absolute inset-0 -z-0 opacity-[0.18] bg-gradient-to-br', p.gradient)} />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <StatusBadge status={p.status} />
            <span className="text-xs text-fg-muted">{p.year}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-fg leading-tight">{p.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-fg-dim leading-relaxed">{p.oneLiner}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {p.liveUrl ? (
              <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                Visit live <ExternalLink size={14} className="ml-2" />
              </a>
            ) : null}
            {p.repoUrl ? (
              <a href={p.repoUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <Github size={14} className="mr-2" /> View source
              </a>
            ) : null}
            {!p.liveUrl && !p.repoUrl ? (
              <span className="chip">Private · not publicly accessible</span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Metrics */}
      {p.metrics && p.metrics.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {p.metrics.map((m) => (
            <div key={m.label} className="surface rounded-xl px-4 py-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">{m.label}</div>
              <div className="mt-1 text-lg font-semibold tracking-tight text-fg">{m.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Main grid */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr,1fr]">
        <article className="space-y-12">
          <Block title="Summary">
            <p className="text-fg-dim leading-relaxed">{p.summary}</p>
          </Block>

          {p.problem ? (
            <Block title="The problem" icon={<AlertCircle size={15} />}>
              <p className="text-fg-dim leading-relaxed">{p.problem}</p>
            </Block>
          ) : null}

          {p.architecture && p.architecture.length > 0 ? (
            <Block title="Architecture" icon={<Layers size={15} />}>
              <ul className="space-y-3">
                {p.architecture.map((a) => (
                  <li key={a} className="flex gap-3 text-fg-dim leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-cyan-400" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {p.highlights && p.highlights.length > 0 ? (
            <Block title="Highlights">
              <ul className="space-y-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-fg-dim leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-cyan-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {p.lessons && p.lessons.length > 0 ? (
            <Block title="What I learned" icon={<Lightbulb size={15} />}>
              <ul className="space-y-3">
                {p.lessons.map((l) => (
                  <li key={l} className="flex gap-3 text-fg-dim leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {p.differently && p.differently.length > 0 ? (
            <Block title="What I would do differently" icon={<RotateCcw size={15} />}>
              <ul className="space-y-3">
                {p.differently.map((d) => (
                  <li key={d} className="flex gap-3 text-fg-dim leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-fuchsia-400" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 self-start">
          <div className="card">
            <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-3">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="chip text-[11px]">{s}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-3">Tags</div>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="chip text-[11px]">{t}</span>
              ))}
            </div>
          </div>
          {p.liveUrl || p.repoUrl ? (
            <div className="card">
              <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-3">Links</div>
              <ul className="space-y-2 text-sm">
                {p.liveUrl ? (
                  <li><a className="text-fg-dim hover:text-fg inline-flex items-center gap-1.5" href={p.liveUrl} target="_blank" rel="noreferrer">{p.liveUrl.replace(/^https?:\/\//, '')} <ArrowUpRight size={12} /></a></li>
                ) : null}
                {p.repoUrl ? (
                  <li><a className="text-fg-dim hover:text-fg inline-flex items-center gap-1.5" href={p.repoUrl} target="_blank" rel="noreferrer">View repo <ArrowUpRight size={12} /></a></li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      {/* Related */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-fg">More from the studio</h2>
          <div className="flex-1 h-px divider-grad" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/projects/${r.slug}`} className="card card-hover flex flex-col gap-3 focus-ring">
              <div className="flex items-center justify-between">
                <StatusBadge status={r.status} />
                <ArrowUpRight size={14} className="text-fg-muted" />
              </div>
              <div className="text-base font-semibold text-fg">{r.name}</div>
              <p className="text-sm text-fg-dim line-clamp-2">{r.oneLiner}</p>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}

function Block({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-4">
        {icon ? <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg surface text-fg-dim">{icon}</span> : null}
        <h2 className="text-xl font-semibold tracking-tight text-fg">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: 'live' | 'in-progress' | 'private' }) {
  const map = {
    live: { label: 'Live', color: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500 dark:bg-emerald-400' },
    'in-progress': { label: 'In progress', color: 'text-amber-600 dark:text-amber-300', dot: 'bg-amber-500 dark:bg-amber-300' },
    private: { label: 'Private', color: 'text-fuchsia-600 dark:text-fuchsia-300', dot: 'bg-fuchsia-500 dark:bg-fuchsia-300' }
  } as const;
  const s = map[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 chip text-[11px] font-medium', s.color)}>
      <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse-soft', s.dot)} />
      {s.label}
    </span>
  );
}
