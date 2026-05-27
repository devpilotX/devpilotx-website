import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: Props) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}
