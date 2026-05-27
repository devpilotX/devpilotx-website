import Link from 'next/link';
import { site } from '@/content/site';
import { Container } from '@/components/Container';
import { ThemeToggle } from '@/components/ThemeToggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
          <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18l4-12 4 8 4-6 4 10" />
            </svg>
          </span>
          <span className="font-semibold tracking-tight">{site.name}</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {site.nav
            .filter((n) => n.href !== '/')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Start a project
          </Link>
        </div>
      </Container>
    </header>
  );
}
