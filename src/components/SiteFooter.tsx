import Link from 'next/link';
import { Github, Linkedin, Twitter, Youtube, Mail } from 'lucide-react';
import { site } from '@/content/site';
import Container from './Container';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-28 border-t border-border">
      <Container as="div" className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow ring-1 ring-white/10">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6 4h6c5 0 8.5 3.4 8.5 8s-3.5 8-8.5 8H6V4zm3.4 3v10H12c3 0 5-2 5-5s-2-5-5-5H9.4z" fill="white"/>
                <circle cx="19" cy="19" r="1.6" fill="white"/>
              </svg>
            </span>
            <span className="font-display text-[19px] leading-none font-semibold tracking-tight text-fg">
              {site.name}<span className="text-gradient">.</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-fg-dim max-w-md leading-relaxed">{site.tagline}</p>
          <div className="mt-5 flex items-center gap-2">
            <Link href={site.links.github} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg surface hover:border-border-strong text-fg-dim hover:text-fg transition-colors" aria-label="GitHub"><Github size={15} /></Link>
            <Link href={site.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg surface hover:border-border-strong text-fg-dim hover:text-fg transition-colors" aria-label="LinkedIn"><Linkedin size={15} /></Link>
            <Link href={site.links.twitter} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg surface hover:border-border-strong text-fg-dim hover:text-fg transition-colors" aria-label="Twitter"><Twitter size={15} /></Link>
            <Link href={site.links.youtube} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg surface hover:border-border-strong text-fg-dim hover:text-fg transition-colors" aria-label="YouTube"><Youtube size={15} /></Link>
            <Link href={`mailto:${site.email.hello}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg surface hover:border-border-strong text-fg-dim hover:text-fg transition-colors" aria-label="Email"><Mail size={15} /></Link>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-3">Studio</div>
          <ul className="space-y-2 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-fg-dim hover:text-fg transition-colors">{n.label}</Link></li>
            ))}
            <li><Link href="/about" className="text-fg-dim hover:text-fg transition-colors">About</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-3">Other work</div>
          <ul className="space-y-2 text-sm">
            <li><a href={site.links.paisareality} target="_blank" rel="noreferrer" className="text-fg-dim hover:text-fg transition-colors">Paisa Reality</a></li>
            <li><a href={site.links.valueCodes} target="_blank" rel="noreferrer" className="text-fg-dim hover:text-fg transition-colors">Value Codes</a></li>
            <li><a href={site.links.epicenterExchange} target="_blank" rel="noreferrer" className="text-fg-dim hover:text-fg transition-colors">Epicenter Exchange</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-3">Legal</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/legal/privacy" className="text-fg-dim hover:text-fg transition-colors">Privacy</Link></li>
            <li><Link href="/legal/terms" className="text-fg-dim hover:text-fg transition-colors">Terms</Link></li>
            <li><Link href="/legal/cookies" className="text-fg-dim hover:text-fg transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container as="div" className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-fg-muted">
          <div>© {year} {site.ownerName}. Built solo. Static export, no tracking beyond GA + AdSense.</div>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" /> All systems operational</div>
        </Container>
      </div>
    </footer>
  );
}
