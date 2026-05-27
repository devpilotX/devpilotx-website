import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { AdSenseScript } from '@/components/AdSenseScript';
import { AnalyticsScript } from '@/components/AnalyticsScript';
import { site } from '@/content/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name + ' | ' + site.tagline,
    template: '%s | ' + site.name
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: 'Dipanshu', url: site.url }],
  creator: 'Dipanshu',
  publisher: site.name,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    type: 'website',
    url: site.url,
    title: site.name,
    description: site.description,
    siteName: site.name
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    creator: site.twitter
  },
  robots: { index: true, follow: true },
  other: { 'google-adsense-account': site.adsense.client }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' }
  ],
  width: 'device-width',
  initialScale: 1
};

const themeInit = "try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t?t==='dark':m;if(d){document.documentElement.classList.add('dark');}}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{themeInit}</Script>
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <AdSenseScript />
        <AnalyticsScript />
      </body>
    </html>
  );
}
