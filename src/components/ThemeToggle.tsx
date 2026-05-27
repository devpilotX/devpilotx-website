'use client';

import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="inline-flex h-9 w-[96px] rounded-full surface" aria-hidden />;
  }

  const current = theme ?? 'system';
  const opts = [
    { id: 'light', icon: Sun, label: 'Light theme' },
    { id: 'system', icon: Monitor, label: 'System theme' },
    { id: 'dark', icon: Moon, label: 'Dark theme' }
  ] as const;

  return (
    <div role="radiogroup" aria-label="Theme" className="inline-flex items-center gap-0.5 p-1 rounded-full surface">
      {opts.map((o) => {
        const Icon = o.icon;
        const active = current === o.id;
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={active}
            aria-label={o.label}
            title={o.label}
            type="button"
            onClick={() => setTheme(o.id)}
            className={cn(
              'relative inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors focus-ring',
              active ? 'bg-fg/[0.08] text-fg' : 'text-fg-muted hover:text-fg'
            )}
          >
            <Icon size={14} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
