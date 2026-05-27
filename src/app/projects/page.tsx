import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/content/projects';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Projects',
  description: 'A full list of live, in-progress, and planned projects from DevPilotX.',
  path: '/projects'
});

export default function ProjectsPage() {
  const live = projects.filter((p) => p.status === 'live');
  const inProgress = projects.filter((p) => p.status === 'in-progress');
  const planned = projects.filter((p) => p.status === 'private');
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Projects" title="Live, in progress, and planned" description="Real, deployed work from the studio. Linked where I can, omitted where the client prefers." />
      <Section title="Live" items={live} />
      <Section title="In progress" items={inProgress} />
      <Section title="Planned" items={planned} />
    </Container>
  );
}

function Section({ title, items }: { title: string; items: typeof projects }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (<ProjectCard key={p.slug} project={p} />))}
      </div>
    </section>
  );
}
