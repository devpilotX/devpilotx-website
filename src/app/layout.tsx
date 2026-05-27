import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AskBubble from '@/components/AskBubble';
import CommandPalette from '@/components/CommandPalette';
import AnalyticsScript from '@/components/AnalyticsScript';
import AdSenseScript from '@/components/AdSenseScript';

export const metadata: Metadata = buildMetadata({});
export const viewport: Viewport = { themeColor: '#0a0a0f', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href={site.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: site.ownerName,
              jobTitle: site.role,
              url: site.url,
              email: `mailto:${site.email.hello}`,
              sameAs: [site.links.github, site.links.linkedin, site.links.twitter]
            })
          }}
        />
      </head>
      <body className="font-sans">
        <div className="relative min-h-screen flex flex-col">
          <div aria-hidden className="pointer-events-none fixed inset-0 dotted-grid opacity-60" />
          <SiteHeader />
          <main className="flex-1 relative">{children}</main>
          <SiteFooter />
        </div>
        <AskBubble />
        <CommandPalette />
        <AnalyticsScript />
        <AdSenseScript />
      </body>
    </html>
  );
}
