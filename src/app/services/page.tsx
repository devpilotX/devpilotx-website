import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services',
  description: 'Custom websites, automation, AI agents, and engineering retainers from DevPilotX.',
  path: '/services'
});

export default function ServicesPage() {
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Services" title="Four ways to work with the studio" description="Clear scopes, honest pricing, senior craft. Every engagement starts with a free 30 minute call to make sure we are a good fit." />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s) => (<ServiceCard key={s.slug} service={s} />))}
      </div>
      <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">How an engagement actually runs</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['1. Discovery call', 'A free 30 minute call to understand the problem, the timeline, and the budget.'],
            ['2. Written proposal', 'A short proposal with scope, milestones, and a fixed price or weekly rate.'],
            ['3. Build in the open', 'Weekly progress with previews. You see everything as it ships.'],
            ['4. Handover and support', 'Docs, runbook, and a short window of post launch support.']
          ].map(([title, body]) => (
            <li key={title} className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{body}</p>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
