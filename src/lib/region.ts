export type RegionCode = 'IN' | 'APAC' | 'EU' | 'GB' | 'US';

export const REGION_LABELS: Record<RegionCode, string> = {
  IN: 'India',
  APAC: 'Asia Pacific and Emerging',
  EU: 'European Union',
  GB: 'United Kingdom',
  US: 'US, Canada, Australia, Middle East'
};

export const REGION_CURRENCIES: Record<RegionCode, string> = {
  IN: 'INR',
  APAC: 'USD',
  EU: 'EUR',
  GB: 'GBP',
  US: 'USD'
};

const EU_TIMEZONES = [
  'Europe/Vienna', 'Europe/Brussels', 'Europe/Sofia', 'Europe/Zagreb', 'Europe/Nicosia',
  'Europe/Prague', 'Europe/Copenhagen', 'Europe/Tallinn', 'Europe/Helsinki', 'Europe/Paris',
  'Europe/Berlin', 'Europe/Athens', 'Europe/Budapest', 'Europe/Dublin', 'Europe/Rome',
  'Europe/Riga', 'Europe/Vilnius', 'Europe/Luxembourg', 'Europe/Malta', 'Europe/Amsterdam',
  'Europe/Warsaw', 'Europe/Lisbon', 'Europe/Bucharest', 'Europe/Bratislava', 'Europe/Ljubljana',
  'Europe/Madrid', 'Europe/Stockholm', 'Atlantic/Azores', 'Atlantic/Canary', 'Atlantic/Madeira'
];

export function detectRegionFromTimezone(tz: string | null | undefined): RegionCode {
  if (!tz) return 'US';
  if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'IN';
  if (tz === 'Europe/London' || tz === 'Europe/Belfast' || tz === 'Europe/Jersey' || tz === 'Europe/Guernsey' || tz === 'Europe/Isle_of_Man') return 'GB';
  if (EU_TIMEZONES.indexOf(tz) !== -1) return 'EU';
  if (tz.indexOf('America/') === 0) return 'US';
  if (tz.indexOf('Australia/') === 0) return 'US';
  if (tz.indexOf('Pacific/') === 0) return 'US';
  if (tz.indexOf('Asia/') === 0) return 'APAC';
  if (tz.indexOf('Africa/') === 0) return 'APAC';
  return 'US';
}

export function detectRegion(): RegionCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return detectRegionFromTimezone(tz);
  } catch (_) {
    return 'US';
  }
}
