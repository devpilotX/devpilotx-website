'use client';

import { useEffect } from 'react';

// Self-healing cache buster.
//
// Symptom this fixes: a visitor's browser or a CDN serves a stale index.html
// from a previous deploy. That HTML hard-codes chunk filenames that no longer
// exist on the server (Next.js produces fresh content-hashed names each build),
// so the page loads but every script and stylesheet 404s and the page renders
// unstyled.
//
// What this does: on every page we attach a one-time error listener that
// notices when a /_next/static/ asset fails to load. When it fires, we wipe
// the Cache API, unregister any service worker, and force a reload with a
// cache-busting query string. A sessionStorage flag stops it from looping.
export default function CacheBuster() {
  useEffect(() => {
    const reloaded = sessionStorage.getItem('dpx_cache_recovered');

    // Best-effort cleanup on every load (no-op if there is nothing to clean).
    try {
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((k) => {
            // Only wipe our own caches; never touch third-party ones.
            if (k.includes('next') || k.includes('workbox') || k.includes('dpx')) {
              caches.delete(k).catch(() => {});
            }
          });
        }).catch(() => {});
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) => {
          regs.forEach((r) => r.unregister().catch(() => {}));
        }).catch(() => {});
      }
    } catch {
      // ignore
    }

    const onError = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const src = (target as HTMLScriptElement).src || (target as HTMLLinkElement).href || '';
      if (!src) return;
      const isNextChunk = src.includes('/_next/static/');
      if (!isNextChunk) return;

      if (reloaded) {
        // Already tried once this session. Avoid infinite reload loop.
        return;
      }
      sessionStorage.setItem('dpx_cache_recovered', '1');

      try {
        if ('caches' in window) {
          caches.keys().then((ks) => Promise.all(ks.map((k) => caches.delete(k)))).catch(() => {});
        }
      } catch {
        // ignore
      }

      const url = new URL(window.location.href);
      url.searchParams.set('_cb', String(Date.now()));
      window.location.replace(url.toString());
    };

    window.addEventListener('error', onError, true);
    return () => window.removeEventListener('error', onError, true);
  }, []);

  return null;
}
