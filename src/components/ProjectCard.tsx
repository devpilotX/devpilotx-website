import Link from 'next/link';
import type { Project } from '@/content/projects';
import { cn } from '@/lib/utils';

const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  in_progress: 'In progress',
  planned: 'Planned',
  archived: 'Archived'
};

const statusClass: Record<Project['status'], string> = {
  live: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  in_progress: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  planned: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  archived: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
};

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={cn('card flex h-full flex-col', compact ? 'p-5' : 'p-6')}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          <Link href={'/projects/' + project.slug} className="hover:text-brand-600 dark:hover:text-brand-400">
            {project.title}
          </Link>
        </h3>
        <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', statusClass[project.status])}>
          {statusLabel[project.status]}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{project.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 6).map((t) => (
          <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4 text-sm">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
            Visit site
          </a>
        ) : null}
        <Link href={'/projects/' + project.slug} className="font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
          Details
        </Link>
      </div>
    </article>
  );
}
