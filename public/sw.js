/* DevPilotX cache-control service worker.
 * Strategy: never serve cached HTML. Always fetch the document fresh.
 * Static assets under /_next/static can still benefit from the browser's
 * default HTTP cache, but the HTML shell that points to them is always fresh,
 * which kills the stale-HTML-with-dead-chunks problem at the root. */
const SW_VERSION = 'dpx-sw-2026-05-27-1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (_) {}
    await self.clients.claim();
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.postMessage({ type: 'DPX_SW_ACTIVATED', version: SW_VERSION });
      }
    } catch (_) {}
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;

  const isDocument = req.mode === 'navigate' || req.destination === 'document';
  if (isDocument) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        return fresh;
      } catch (_) {
        const fallback = await caches.match(req);
        if (fallback) return fallback;
        return new Response('<h1>Offline</h1>', { status: 503, headers: { 'content-type': 'text/html' } });
      }
    })());
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'DPX_SKIP_WAITING') {
    self.skipWaiting();
  }
});
