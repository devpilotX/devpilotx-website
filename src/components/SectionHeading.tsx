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
        <div className={cn('inline-flex items-center gap-2 mb-3', align === 'center' && 'justify-center')}>
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500" />
          <span className="text-xs uppercase tracking-[0.20em] text-fg-muted">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fg leading-tight">{title}</h2>
      {(subtitle ?? description) ? <p className="mt-4 text-fg-dim text-base sm:text-lg leading-relaxed">{subtitle ?? description}</p> : null}
    </div>
  );
}
