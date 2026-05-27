import Script from 'next/script';
import { site } from '@/content/site';

export function AnalyticsScript() {
  const id = site.analytics.measurementId;
  if (!id) return null;
  return (
    <>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={'https://www.googletagmanager.com/gtag/js?id=' + id}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {"window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '" + id + "', { anonymize_ip: true });"}
      </Script>
    </>
  );
}
