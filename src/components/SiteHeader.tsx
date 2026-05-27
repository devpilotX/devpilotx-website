'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Command, Github, Linkedin, Menu, X } from 'lucide-react';
import { site } from '@/content/site';
import Container from './Container';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

function openCommandPalette() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('dpx:cmdk:open'));
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    setIsMac(typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled ? 'backdrop-blur-md bg-bg/75 border-b border-border' : 'bg-transparent'
      )}
    >
      <Container as="div" className="flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 group focus-ring rounded-md" aria-label={site.name}>
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
            <span className="text-white font-bold text-sm tracking-tight">D</span>
          </span>
          <span className="font-semibold tracking-tight text-fg">{site.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {site.nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg transition-colors focus-ring',
                  active ? 'text-fg bg-fg/[0.06]' : 'text-fg-dim hover:text-fg hover:bg-fg/[0.04]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={openCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-lg text-xs text-fg-dim surface hover:border-border-strong transition-colors focus-ring"
            aria-label="Open command palette"
          >
            <Command size={14} className="opacity-80" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="ml-1 px-1.5 py-0.5 rounded bg-fg/[0.05] border border-border text-[10px] font-mono">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
          <Link href={site.links.github} target="_blank" rel="noreferrer" className="hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-lg surface hover:border-border-strong text-fg-dim hover:text-fg transition-colors focus-ring" aria-label="GitHub">
            <Github size={16} />
          </Link>
          <Link href={site.links.linkedin} target="_blank" rel="noreferrer" className="hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-lg surface hover:border-border-strong text-fg-dim hover:text-fg transition-colors focus-ring" aria-label="LinkedIn">
            <Linkedin size={16} />
          </Link>
          <Link href="/contact" className="hidden sm:inline-flex btn btn-primary h-9 px-4 text-[13px]">Get in touch</Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg surface text-fg-dim focus-ring"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md">
          <Container className="py-3 flex flex-col gap-1">
            {site.nav.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm transition-colors',
                    active ? 'text-fg bg-fg/[0.06]' : 'text-fg-dim hover:text-fg hover:bg-fg/[0.04]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/contact" className="mt-2 btn btn-primary w-full justify-center">Get in touch</Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
