'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    const RELOAD_KEY = 'dpx-sw-reloaded-once';

    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; version?: string } | undefined;
      if (!data || data.type !== 'DPX_SW_ACTIVATED') return;
      if (sessionStorage.getItem(RELOAD_KEY)) return;
      sessionStorage.setItem(RELOAD_KEY, '1');
      try { window.location.reload(); } catch (_) {}
    };
    navigator.serviceWorker.addEventListener('message', onMessage);

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        reg.update().catch(() => {});
        reg.addEventListener('updatefound', () => {
          const next = reg.installing;
          if (!next) return;
          next.addEventListener('statechange', () => {
            if (next.state === 'activated') {
              if (navigator.serviceWorker.controller && !sessionStorage.getItem(RELOAD_KEY)) {
                sessionStorage.setItem(RELOAD_KEY, '1');
                try { window.location.reload(); } catch (_) {}
              }
            }
          });
        });
      })
      .catch(() => {});

    return () => {
      navigator.serviceWorker.removeEventListener('message', onMessage);
    };
  }, []);
  return null;
}
