# Changelog

All notable changes to devpilotx.com.

## 2026-05-27

### Added

- **Private operator dashboard** at `https://profile.devpilotx.com`. Argon2 login, Postgres-backed sessions, contact + service inquiry + bot conversation views, CSV export.
- **Country-aware pricing API** at `https://api.devpilotx.com/pricing-tier`. IP-geolocates the visitor (with `?cc=XX` override) and returns the region tier, multiplier, currency, and FX from USD.
- `src/lib/regionApi.ts` client-side hook that calls `/pricing-tier`, maps country code to internal `RegionCode`, and caches the result in `localStorage` for 24 hours.
- `apple-touch-icon.png` -> `apple-touch-icon.svg` rewrite in `public/.htaccess` so iOS/Safari auto-requests resolve cleanly.

### Infrastructure

- Nginx vhost + Lets Encrypt cert for `profile.devpilotx.com` (expires 2026-08-25, auto-renews via certbot timer).
- DNS A record `profile.devpilotx.com -> 80.225.240.46` added via Hostinger API.
- New PM2 process `devpilotx-dashboard` (port 8300).
- New DB tables: `dashboard_users`, `dashboard_sessions`.
- SMTP credential corrected (trailing dot) on `contact@devpilotx.com`. Contact-form mailer now passes `transporter.verify()`.

### Documentation

- README rewritten to reflect three live VPS services (API, Dashboard, MCP) and the country-aware pricing flow.

## Earlier

See Git history for milestone-by-milestone changes prior to 2026-05-27.
