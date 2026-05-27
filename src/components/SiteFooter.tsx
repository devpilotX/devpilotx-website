import Link from 'next/link';
import { site } from '@/content/site';
import { Container } from '@/components/Container';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
      <Container className="grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 18l4-12 4 8 4-6 4 10" />
              </svg>
            </span>
            <span className="font-semibold tracking-tight text-slate-900 dark:text-white">{site.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-600 dark:text-slate-400">{site.tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Studio</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/projects" className="hover:text-slate-900 dark:hover:text-white">Projects</Link></li>
            <li><Link href="/services" className="hover:text-slate-900 dark:hover:text-white">Services</Link></li>
            <li><Link href="/about" className="hover:text-slate-900 dark:hover:text-white">About</Link></li>
            <li><Link href="/resume" className="hover:text-slate-900 dark:hover:text-white">Resume</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/blog" className="hover:text-slate-900 dark:hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-slate-900 dark:hover:text-white">Contact</Link></li>
            <li><a href={site.github} rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white">GitHub</a></li>
            <li><a href={site.linkedin} rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/legal/privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy</Link></li>
            <li><Link href="/legal/terms" className="hover:text-slate-900 dark:hover:text-white">Terms</Link></li>
            <li><Link href="/legal/cookies" className="hover:text-slate-900 dark:hover:text-white">Cookies</Link></li>
            <li><a href={'mailto:' + site.email.hello} className="hover:text-slate-900 dark:hover:text-white">{site.email.hello}</a></li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 flex flex-col items-start gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-400">
        <p>&copy; {year} {site.name}. All rights reserved.</p>
        <p>Built in India. Hosted on a single tidy VPS.</p>
      </Container>
    </footer>
  );
}
