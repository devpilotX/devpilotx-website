import Container from '@/components/Container';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/content/site';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How DevPilotX collects, uses, and protects your data.',
  path: '/legal/privacy'
});

export default function PrivacyPage() {
  return (
    <Container className="py-20">
      <article className="mx-auto max-w-3xl prose-body space-y-5 text-base leading-7">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: 2026</p>
        <p>This policy explains what data DevPilotX (devpilotx.com) collects, how it is used, and your choices.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">What we collect</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Contact form data:</strong> name, email, role, optional company, and your message. We also store IP address, user agent, and referring page for abuse prevention.</li>
          <li><strong>Analytics:</strong> aggregated, anonymised page view data via Google Analytics 4 with IP anonymisation.</li>
          <li><strong>Advertising:</strong> Google AdSense may set cookies to serve and measure ads. See Google\u2019s policies for details.</li>
        </ul>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How we use it</h2>
        <p>We use contact form data only to respond to your message. Analytics data is used to understand which content is useful so we can improve the site.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Retention</h2>
        <p>Contact submissions are retained for as long as needed to handle your enquiry. You can request deletion at any time.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your rights</h2>
        <p>You can request access, correction, or deletion of your data by emailing <a className="text-brand-600 hover:text-brand-700 dark:text-brand-400" href={'mailto:' + site.email.admin}>{site.email.admin}</a>.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Contact</h2>
        <p>Questions about this policy: <a className="text-brand-600 hover:text-brand-700 dark:text-brand-400" href={'mailto:' + site.email.admin}>{site.email.admin}</a>.</p>
      </article>
    </Container>
  );
}
