import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'left',
  className,
  display = true
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  display?: boolean;
}) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto' : '', 'max-w-3xl', className)}>
      {eyebrow ? (
        <div className={cn('inline-flex items-center gap-2 mb-4', align === 'center' && 'justify-center')}>
          <span className="h-px w-6 bg-fg/40" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-fg-muted">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className={cn(display ? 'font-display' : 'font-sans', 'text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-fg leading-[1.1]')}>
        {title}
      </h2>
      {(subtitle ?? description) ? <p className="mt-5 text-fg-dim text-base sm:text-lg leading-relaxed max-w-2xl">{subtitle ?? description}</p> : null}
    </div>
  );
}
