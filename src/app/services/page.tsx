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

const flow = [
  ['1 · Discovery call', 'Free 30 minutes to understand the problem, the timeline, and the budget.'],
  ['2 · Written proposal', 'Short proposal with scope, milestones, and a fixed price or weekly rate.'],
  ['3 · Build in the open', 'Weekly progress with previews. You see everything as it ships.'],
  ['4 · Handover and support', 'Docs, runbook, and a short window of post-launch support.']
] as const;

export default function ServicesPage() {
  return (
    <Container className="py-20 sm:py-24">
      <SectionHeading eyebrow="Services" title="Four ways to work with the studio" description="Clear scopes, honest pricing, senior craft. Every engagement starts with a free 30-minute call to make sure we are a good fit." />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (<ServiceCard key={s.slug} service={s} index={i} />))}
      </div>
      <section className="mt-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-fg">How an engagement actually runs</h2>
          <div className="flex-1 h-px divider-grad" />
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map(([title, body]) => (
            <li key={title} className="card">
              <h3 className="text-sm font-semibold text-fg">{title}</h3>
              <p className="mt-2 text-sm text-fg-dim leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
