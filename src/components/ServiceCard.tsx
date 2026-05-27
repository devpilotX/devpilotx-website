import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/content/services';

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon =
    (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.icon] ??
    Icons.Sparkles;
  const fromINR = service.startsAt.IN;
  const fromUSD = service.startsAt.US;
  return (
    <Link
      href={'/services/' + service.slug}
      className="card card-hover relative flex flex-col gap-5 h-full focus-ring group"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl surface text-fg">
          <Icon size={18} />
        </div>
        <span className="text-[11px] text-fg-muted numeric tracking-wider">
          {String(index + 1).padStart(2, '0')} / 04
        </span>
      </div>
      <div>
        <h3 className="font-display text-2xl font-medium tracking-tight text-fg leading-tight">{service.name}</h3>
        <p className="mt-2 text-[13.5px] text-fg-dim leading-relaxed">{service.oneLiner}</p>
      </div>
      <ul className="space-y-2 text-[13.5px]">
        {service.bullets.slice(0, 4).map((b) => (
          <li key={b} className="flex gap-2.5 text-fg-dim">
            <span className="mt-2 h-px w-3 shrink-0 bg-fg/30" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5 hairline flex items-center justify-between text-[12px]">
        <div className="flex flex-col gap-1">
          <span className="text-fg-muted uppercase tracking-[0.16em]">Starts at</span>
          <span className="text-fg numeric text-[13px]">{fromINR} · {fromUSD}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-fg-dim group-hover:text-fg transition-colors">
          See pricing <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}
