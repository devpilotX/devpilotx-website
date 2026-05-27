import Container from '@/components/Container';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Terms of service for the devpilotx.com website.',
  path: '/legal/terms'
});

export default function TermsPage() {
  return (
    <Container className="py-20">
      <article className="mx-auto max-w-3xl prose-body space-y-5 text-base leading-7">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: 2026</p>
        <p>These terms govern your use of devpilotx.com. By using this site you agree to them. If you do not agree, please do not use the site.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Use of the site</h2>
        <p>The site is provided as is for informational and business communication purposes. You agree not to misuse the site, attempt to disrupt its operation, or use it for any unlawful purpose.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Intellectual property</h2>
        <p>All content on this site, including text, design, and code samples, is the property of DevPilotX or its licensors unless otherwise stated.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Services</h2>
        <p>Paid services are governed by a separate written proposal and agreement. Nothing on this site constitutes a binding offer.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Disclaimer</h2>
        <p>The site is provided without warranties of any kind. DevPilotX is not liable for any indirect or consequential damages arising from your use of the site.</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Changes</h2>
        <p>We may update these terms. The latest version will always be on this page.</p>
      </article>
    </Container>
  );
}
