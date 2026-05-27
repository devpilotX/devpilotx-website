import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch with DevPilotX about a project, role, or collaboration.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Contact" title="Tell me about your project" description="Most replies go out the same day. For paid projects we will set up a quick call before anything else." />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr,1fr]">
        <ContactForm />
        <aside className="space-y-5">
          <div className="card">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">Direct</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>General: <a className="hover:text-brand-600 dark:hover:text-brand-400" href={'mailto:' + site.email.hello}>{site.email.hello}</a></li>
              <li>Services: <a className="hover:text-brand-600 dark:hover:text-brand-400" href={'mailto:' + site.email.services}>{site.email.services}</a></li>
              <li>Recruiters: <a className="hover:text-brand-600 dark:hover:text-brand-400" href={'mailto:' + site.email.contact}>{site.email.contact}</a></li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">What to include</h3>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>What you are building or hiring for</li>
              <li>Rough timeline and budget</li>
              <li>Any links that give context</li>
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
