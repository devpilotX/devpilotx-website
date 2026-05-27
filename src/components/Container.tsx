import { cn } from '@/lib/utils';

export default function Container({
  children,
  className,
  as: Tag = 'div'
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
}) {
  return <Tag className={cn('mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8', className)}>{children}</Tag>;
}
