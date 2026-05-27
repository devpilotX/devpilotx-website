import Script from 'next/script';
import { site } from '@/content/site';

export function AdSenseScript() {
  const client = site.adsense.client;
  if (!client) return null;
  const src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + client;
  return (
    <Script
      id="adsense-loader"
      strategy="afterInteractive"
      src={src}
      crossOrigin="anonymous"
      async
    />
  );
}
