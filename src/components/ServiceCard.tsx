import * as Icons from 'lucide-react';
import type { Service } from '@/content/services';
import { cn } from '@/lib/utils';

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.icon] ?? Icons.Sparkles;
  return (
    <div className="card card-hover relative overflow-hidden flex flex-col gap-5 h-full">
      <div aria-hidden className={cn('absolute inset-0 -z-0 opacity-[0.16] bg-gradient-to-br', service.gradient)} />
      <div className="relative flex items-center justify-between">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
          <Icon size={20} className="text-white" />
        </div>
        <span className="text-xs text-fg-muted font-mono">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="relative">
        <h3 className="text-xl font-semibold tracking-tight text-fg">{service.name}</h3>
        <p className="mt-2 text-sm text-fg-dim leading-relaxed">{service.oneLiner}</p>
      </div>
      <ul className="relative space-y-2 text-sm">
        {service.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-fg/90">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-cyan-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="relative mt-auto pt-4 border-t border-border flex items-center justify-between text-xs">
        <span className="text-fg-muted">Timeline</span>
        <span className="text-fg">{service.timeline}</span>
      </div>
    </div>
  );
}
