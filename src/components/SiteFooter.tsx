import Link from 'next/link';
import { Github, Linkedin, Twitter, Youtube, Mail } from 'lucide-react';
import { site } from '@/content/site';
import Container from './Container';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-border">
      <Container as="div" className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
              <span className="text-white font-bold text-sm">D</span>
            </span>
            <span className="font-semibold tracking-tight">{site.name}</span>
          </div>
          <p className="mt-4 text-sm text-ink-dim max-w-md leading-relaxed">{site.tagline}</p>
          <div className="mt-5 flex items-center gap-2">
            <Link href={site.links.github} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg glass hover:border-strong text-ink-dim hover:text-white transition-colors" aria-label="GitHub"><Github size={15} /></Link>
            <Link href={site.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg glass hover:border-strong text-ink-dim hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin size={15} /></Link>
            <Link href={site.links.twitter} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg glass hover:border-strong text-ink-dim hover:text-white transition-colors" aria-label="Twitter"><Twitter size={15} /></Link>
            <Link href={site.links.youtube} target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg glass hover:border-strong text-ink-dim hover:text-white transition-colors" aria-label="YouTube"><Youtube size={15} /></Link>
            <Link href={`mailto:${site.email.hello}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg glass hover:border-strong text-ink-dim hover:text-white transition-colors" aria-label="Email"><Mail size={15} /></Link>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-ink-muted mb-3">Site</div>
          <ul className="space-y-2 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-ink-dim hover:text-white transition-colors">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-ink-muted mb-3">Other work</div>
          <ul className="space-y-2 text-sm">
            <li><a href={site.links.paisareality} target="_blank" rel="noreferrer" className="text-ink-dim hover:text-white transition-colors">Paisa Reality</a></li>
            <li><a href={site.links.valueCodes} target="_blank" rel="noreferrer" className="text-ink-dim hover:text-white transition-colors">Value Codes</a></li>
            <li><a href={site.links.epicenterExchange} target="_blank" rel="noreferrer" className="text-ink-dim hover:text-white transition-colors">Epicenter Exchange</a></li>
          </ul>
          <div className="text-xs uppercase tracking-[0.18em] text-ink-muted mt-6 mb-3">Legal</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/legal/privacy" className="text-ink-dim hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/legal/terms" className="text-ink-dim hover:text-white transition-colors">Terms</Link></li>
            <li><Link href="/legal/cookies" className="text-ink-dim hover:text-white transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container as="div" className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-ink-muted">
          <div>© {year} {site.ownerName}. Built solo. No tracking beyond GA + AdSense.</div>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" /> All systems operational</div>
        </Container>
      </div>
    </footer>
  );
}
