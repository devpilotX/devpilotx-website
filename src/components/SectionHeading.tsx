import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'left',
  className
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto' : '', 'max-w-2xl', className)}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500" />
          <span className="text-xs uppercase tracking-[0.18em] text-ink-dim">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight">{title}</h2>
      {(subtitle ?? description) ? <p className="mt-3 text-ink-dim text-base sm:text-lg leading-relaxed">{subtitle ?? description}</p> : null}
    </div>
  );
}
