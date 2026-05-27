import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Fraunces } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import UtilityBar from '@/components/UtilityBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AskBubble from '@/components/AskBubble';
import CommandPalette from '@/components/CommandPalette';
import AnalyticsScript from '@/components/AnalyticsScript';
import AdSenseScript from '@/components/AdSenseScript';
import ThemeProvider from '@/components/ThemeProvider';
import CacheBuster from '@/components/CacheBuster';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces'
});

export const metadata: Metadata = {
  ...buildMetadata({}),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#080c16' }
  ]
};

// Inline cache-recovery script. Runs as early as possible (before any chunks
// load), so when stale HTML references missing _next/static chunks we catch
// the load failures and force a hard reload with a cache-busting query.
const INLINE_CACHE_RECOVERY =
  "(function(){try{var k='dpx_cache_recovered';window.addEventListener('error',function(e){var t=e.target;if(!t)return;var s=(t.src||t.href||'');if(s.indexOf('/_next/static/')===-1)return;if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,'1');try{if('caches' in window){caches.keys().then(function(ks){return Promise.all(ks.map(function(x){return caches.delete(x);}));}).catch(function(){});}}catch(_){}var u=new URL(location.href);u.searchParams.set('_cb',String(Date.now()));location.replace(u.toString());},true);}catch(_){}})();";

const cacheRecoveryScriptProps = {
  dangerouslySetInnerHTML: { __html: INLINE_CACHE_RECOVERY }
};

const jsonLdProps = {
  type: 'application/ld+json',
  dangerouslySetInnerHTML: {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.ownerName,
      jobTitle: site.role,
      url: site.url,
      email: 'mailto:' + site.email.hello,
      sameAs: [site.links.github, site.links.linkedin, site.links.twitter]
    })
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <script {...cacheRecoveryScriptProps} />
        <link rel="canonical" href={site.url} />
        <script {...jsonLdProps} />
      </head>
      <body className="font-sans antialiased">
        <CacheBuster />
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            <UtilityBar />
            <SiteHeader />
            <main className="flex-1 relative">{children}</main>
            <SiteFooter />
          </div>
          <AskBubble />
          <CommandPalette />
        </ThemeProvider>
        <AnalyticsScript />
        <AdSenseScript />
      </body>
    </html>
  );
}
