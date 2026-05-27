import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import type { Project } from '@/content/projects';
import { cn } from '@/lib/utils';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card card-hover relative flex flex-col gap-5 h-full focus-ring"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <StatusPill status={project.status} />
          <span className="text-[11px] text-fg-muted numeric">{project.year}</span>
        </div>
        <ArrowUpRight size={16} className="text-fg-muted group-hover:text-fg group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>
      <div>
        <div className="font-display text-2xl font-medium tracking-tight text-fg leading-tight">{project.name}</div>
        <p className="mt-2 text-[13.5px] text-fg-dim line-clamp-3 leading-relaxed">{project.oneLiner}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {project.tags.slice(0, 4).map((t) => (
          <span key={t} className="chip text-[11px]">{t}</span>
        ))}
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: Project['status'] }) {
  const map = {
    live: { label: 'Live', color: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500 dark:bg-emerald-400', icon: null },
    'in-progress': { label: 'In progress', color: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500 dark:bg-amber-300', icon: null },
    private: { label: 'Private', color: 'text-fg-dim', dot: 'bg-fg-dim', icon: <Lock size={10} /> }
  } as const;
  const s = map[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.10em]', s.color)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', status === 'live' && 'animate-pulse-soft', s.dot)} />
      {s.label}
      {s.icon}
    </span>
  );
}
