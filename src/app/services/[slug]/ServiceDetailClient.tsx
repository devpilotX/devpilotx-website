'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ShieldCheck, Sparkles, Clock, Globe } from 'lucide-react';
import Container from '@/components/Container';
import type { Service } from '@/content/services';
import { site } from '@/content/site';
import { detectRegion, REGION_LABELS, type RegionCode } from '@/lib/region';

const REGION_ORDER: RegionCode[] = ['IN', 'APAC', 'EU', 'GB', 'US'];
const STORAGE_KEY = 'dpx-region';

export default function ServiceDetailClient({ service }: { service: Service }) {
  const [region, setRegion] = useState<RegionCode>('US');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let r: RegionCode | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as RegionCode | null;
      if (stored && REGION_ORDER.indexOf(stored) !== -1) r = stored;
    } catch (_) {}
    if (!r) r = detectRegion();
    setRegion(r);
    setHydrated(true);
  }, []);

  function pickRegion(next: RegionCode) {
    setRegion(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
  }

  const Icon =
    (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.icon] ??
    Sparkles;

  return (
    <Container className="py-16 sm:py-20">
      <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-fg-dim hover:text-fg transition-colors">
        <ArrowLeft size={14} /> All services
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl surface text-fg">
            <Icon size={22} />
          </span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-fg-muted">DevPilotX Services</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-tight text-fg leading-[1.02]">{service.name}</h1>
        <p className="mt-5 text-lg text-fg-dim leading-[1.55]">{service.tagline}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-dim">
          <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {service.timeline}</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} /> Fixed price, signed before work</span>
          <span className="inline-flex items-center gap-1.5"><Sparkles size={13} /> Starts at {hydrated ? service.startsAt[region] : service.startsAt.US}</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn btn-primary">Start a project <ArrowRight size={14} className="ml-2" /></Link>
          <a
            href={'mailto:' + site.email.services + '?subject=' + encodeURIComponent('Service inquiry: ' + service.name)}
            className="btn btn-secondary"
          >
            Email about this
          </a>
        </div>
      </header>

      <section className="mt-20">
        <SectionTitle>What you get</SectionTitle>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {service.deliverables.map((d) => (
            <li key={d} className="card flex items-start gap-3 text-sm text-fg-dim leading-relaxed">
              <Check size={16} className="mt-0.5 shrink-0 text-fg" /> <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionTitle>Transparent pricing</SectionTitle>
          <div className="flex items-center gap-2 text-[12px]">
            <Globe size={13} className="text-fg-muted" />
            <span className="text-fg-muted uppercase tracking-[0.18em] text-[11px]">Pricing for</span>
            <select
              value={region}
              onChange={(e) => pickRegion(e.target.value as RegionCode)}
              className="bg-bg-elev border border-border rounded-lg px-2.5 py-1.5 text-[12px] text-fg focus-ring"
            >
              {REGION_ORDER.map((r) => (
                <option key={r} value={r}>{REGION_LABELS[r]}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-fg-dim leading-relaxed">{service.pricingNote}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {service.pricing.map((tier) => (
            <div
              key={tier.tier}
              className={'card relative flex flex-col gap-4 ' + (tier.popular ? 'ring-1 ring-brand-500/60' : '')}
            >
              {tier.popular ? (
                <span className="absolute -top-3 left-5 chip text-[10px] bg-bg text-fg">Most chosen</span>
              ) : null}
              <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted">{tier.tier}</div>
              <div className="font-display text-2xl text-fg numeric">{hydrated ? tier.prices[region] : tier.prices.US}</div>
              <p className="text-[13px] text-fg-dim leading-relaxed">{tier.description}</p>
              <ul className="mt-2 space-y-2 text-[13px]">
                {tier.includes.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-fg-dim">
                    <Check size={14} className="mt-0.5 shrink-0 text-fg/70" /> <span>{it}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-secondary mt-auto justify-center">Pick this tier</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle>Why I charge this</SectionTitle>
          <ul className="mt-6 space-y-4 text-[14px] text-fg-dim leading-relaxed">
            {service.whyThisPrice.map((w) => (
              <li key={w} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>Why work with me</SectionTitle>
          <ul className="mt-6 space-y-4 text-[14px] text-fg-dim leading-relaxed">
            {service.whyTrust.map((w) => (
              <li key={w} className="flex gap-3">
                <ShieldCheck size={14} className="mt-1 shrink-0 text-emerald-500" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20">
        <SectionTitle>How an engagement runs</SectionTitle>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {service.process.map((p, i) => (
            <li key={p.step} className="card">
              <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted">Step {String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-2 text-sm font-semibold text-fg">{p.step}</h3>
              <p className="mt-2 text-[13px] text-fg-dim leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-2">
        <div className="card">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-fg">Ideal for</h3>
          <ul className="mt-4 space-y-3 text-[13.5px] text-fg-dim leading-relaxed">
            {service.idealFor.map((i) => (
              <li key={i} className="flex gap-2">
                <Check size={14} className="mt-0.5 text-emerald-500 shrink-0" /> <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-fg">Not the right fit if</h3>
          <ul className="mt-4 space-y-3 text-[13.5px] text-fg-dim leading-relaxed">
            {service.notFor.map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-px w-3 bg-fg-muted shrink-0" /> <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20">
        <SectionTitle>Common questions</SectionTitle>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {service.faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-medium text-fg">
                <span>{f.q}</span>
                <ArrowUpRight size={14} className="text-fg-muted transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-[13.5px] text-fg-dim leading-relaxed max-w-3xl">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-20 card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl text-fg">Ready to scope this?</h3>
          <p className="mt-2 text-sm text-fg-dim max-w-md leading-relaxed">
            Free 30 minute call. By the end of it you have a written scope, a price, and a timeline. No pressure to proceed.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/contact" className="btn btn-primary">Book the call <ArrowRight size={14} className="ml-2" /></Link>
          <Link href="/services" className="btn btn-secondary">Other services</Link>
        </div>
      </section>
    </Container>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-xl font-semibold tracking-tight text-fg">{children}</h2>
      <div className="flex-1 h-px divider-grad" />
    </div>
  );
}
