import type { RegionCode } from './region';

/**
 * Country code (ISO 3166-1 alpha-2) -> internal RegionCode used by services pricing.
 * The server-side /pricing-tier endpoint returns the country code; we map it here
 * so the existing pricing tables (IN / APAC / EU / GB / US) stay authoritative.
 */
const EU_CODES = ['DE','FR','IT','ES','NL','BE','LU','AT','IE','PT','GR','FI','EE','LV','LT','SK','SI','MT','CY','HR','PL','CZ','HU','RO','BG','SE','DK'];
const US_CODES = ['US','CA','AU','NZ','AE','SA','QA','KW','BH','OM','IL','JP','KR','SG','HK','TW','CH','NO','IS'];

export function countryToRegion(cc: string | null | undefined): RegionCode | null {
  if (!cc) return null;
  const code = cc.toUpperCase();
  if (code === 'IN' || code === 'BD' || code === 'PK' || code === 'LK' || code === 'NP' || code === 'BT') return 'IN';
  if (code === 'GB' || code === 'UK') return 'GB';
  if (EU_CODES.indexOf(code) !== -1) return 'EU';
  if (US_CODES.indexOf(code) !== -1) return 'US';
  return 'APAC';
}

export type PricingTierResponse = {
  country: { code: string; name: string | null };
  tier: 'global' | 'emerging' | 'india_southasia';
  multiplier: number;
  currency: string;
  fxFromUsd: number;
};

const CACHE_KEY = 'devpilotx:region:v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export async function fetchCountryRegion(apiBase: string): Promise<RegionCode | null> {
  if (typeof window === 'undefined') return null;
  try {
    const cached = window.localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as { region: RegionCode; ts: number };
      if (parsed && Date.now() - parsed.ts < CACHE_TTL_MS && parsed.region) return parsed.region;
    }
  } catch (_) { /* ignore */ }
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3000);
    const r = await fetch(apiBase.replace(/\/$/, '') + '/pricing-tier', { signal: ctrl.signal });
    clearTimeout(t);
    if (!r.ok) return null;
    const j = (await r.json()) as PricingTierResponse;
    const region = countryToRegion(j.country && j.country.code);
    if (region) {
      try { window.localStorage.setItem(CACHE_KEY, JSON.stringify({ region, ts: Date.now() })); } catch (_) { /* ignore */ }
    }
    return region;
  } catch (_) {
    return null;
  }
}
