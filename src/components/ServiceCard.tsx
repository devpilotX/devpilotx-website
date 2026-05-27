import Link from 'next/link';
import type { Service } from '@/content/services';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{service.name}</h3>
        {service.startingAtUSD ? (
          <span className="text-sm text-slate-500 dark:text-slate-400">from ${service.startingAtUSD}</span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{service.tagline}</p>
      <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{service.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
        {service.deliverables.map((d) => (
          <li key={d} className="flex gap-2">
            <span aria-hidden="true" className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-600" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href={'/contact?service=' + service.slug} className="btn-secondary w-full">
          Request a quote
        </Link>
      </div>
    </article>
  );
}
