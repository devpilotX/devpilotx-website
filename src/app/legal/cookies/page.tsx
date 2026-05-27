import { Container } from '@/components/Container';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Cookie Policy',
  description: 'How devpilotx.com uses cookies.',
  path: '/legal/cookies'
});

export default function CookiesPage() {
  return (
    <Container className="py-20">
      <article className="mx-auto max-w-3xl prose-body space-y-5 text-base leading-7">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Cookie Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: 2026</p>
        <p>Cookies are small text files set on your device by websites you visit. We use cookies for the purposes below.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Essential</h2>
        <p>A theme preference cookie (or local storage entry) to remember your light or dark mode choice.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Analytics</h2>
        <p>Google Analytics 4 cookies to measure site usage in aggregate, with IP anonymisation enabled.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Advertising</h2>
        <p>Google AdSense cookies to deliver and measure ads. You can manage ad personalisation in your Google account settings.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your controls</h2>
        <p>You can clear or block cookies in your browser settings. Doing so may affect parts of the site.</p>
      </article>
    </Container>
  );
}
