import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VerifiedBadge({
  label,
  size = 'md',
  className
}: {
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const dim = size === 'sm' ? 14 : 16;
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs text-sky-300', className)} title={label}>
      <BadgeCheck size={dim} className="text-sky-400" aria-hidden />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
