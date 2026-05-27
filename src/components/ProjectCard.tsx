import Link from 'next/link';
import { ArrowUpRight, Lock, Sparkles } from 'lucide-react';
import type { Project } from '@/content/projects';
import { cn } from '@/lib/utils';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card relative overflow-hidden p-6 flex flex-col gap-4 h-full"
    >
      <div
        aria-hidden
        className={cn('absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity')}
      />
      <div
        aria-hidden
        className={cn('absolute inset-0 -z-0 opacity-30 bg-gradient-to-br', project.gradient)}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <StatusPill status={project.status} />
          <span className="text-xs text-ink-muted">{project.year}</span>
        </div>
        <ArrowUpRight
          size={18}
          className="text-ink-dim group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
        />
      </div>
      <div className="relative">
        <div className="text-lg font-semibold tracking-tight">{project.name}</div>
        <p className="mt-1.5 text-sm text-ink-dim line-clamp-3 leading-relaxed">{project.oneLiner}</p>
      </div>
      <div className="relative mt-auto flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((t) => (
          <span key={t} className="chip text-[11px]">{t}</span>
        ))}
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: Project['status'] }) {
  const map = {
    live: { label: 'Live', color: 'text-emerald-400', dot: 'bg-emerald-400', icon: null },
    'in-progress': { label: 'In progress', color: 'text-amber-300', dot: 'bg-amber-300', icon: <Sparkles size={11} /> },
    private: { label: 'Private', color: 'text-fuchsia-300', dot: 'bg-fuchsia-300', icon: <Lock size={11} /> }
  } as const;
  const s = map[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-medium', s.color)}>
      <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse-soft', s.dot)} />
      {s.label}
      {s.icon}
    </span>
  );
}
