'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Command, Github, Linkedin } from 'lucide-react';
import { site } from '@/content/site';
import Container from './Container';
import { cn } from '@/lib/utils';

function openCommandPalette() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('dpx:cmdk:open'));
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    setIsMac(typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled ? 'backdrop-blur-md bg-bg/70 border-b border-border' : 'bg-transparent'
      )}
    >
      <Container as="div" className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label={site.name}>
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
            <span className="text-white font-bold text-sm tracking-tight">D</span>
          </span>
          <span className="font-semibold tracking-tight text-ink group-hover:text-white transition-colors">{site.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => {
            const active = pathname === item.href || ((item.href as string) !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  active ? 'text-white bg-white/5' : 'text-ink-dim hover:text-white hover:bg-white/5'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-lg text-xs text-ink-dim glass hover:border-strong transition-colors"
            aria-label="Open command palette"
          >
            <Command size={14} className="opacity-80" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="ml-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
          <Link href={site.links.github} target="_blank" rel="noreferrer" className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg glass hover:border-strong text-ink-dim hover:text-white transition-colors" aria-label="GitHub">
            <Github size={16} />
          </Link>
          <Link href={site.links.linkedin} target="_blank" rel="noreferrer" className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg glass hover:border-strong text-ink-dim hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin size={16} />
          </Link>
          <Link href="/contact" className="btn btn-primary h-9 px-4 text-[13px]">Get in touch</Link>
        </div>
      </Container>
    </header>
  );
}
