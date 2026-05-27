import { Container } from '@/components/Container';
import { resume } from '@/content/resume';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Resume',
  description: 'Resume and CV for Dipanshu, founder of DevPilotX.',
  path: '/resume'
});

export default function ResumePage() {
  return (
    <Container className="py-20">
      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-brand-600 dark:text-brand-400">Resume</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{resume.name}</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{resume.headline}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{resume.location} | <a className="hover:text-brand-600 dark:hover:text-brand-400" href={'mailto:' + resume.email}>{resume.email}</a></p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {resume.links.map((l) => (
            <a key={l.href} href={l.href} rel="noreferrer" className="rounded-full border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              {l.label}
            </a>
          ))}
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Summary</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">{resume.summary}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Skills</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resume.skills.map((s) => (
            <div key={s.group} className="card">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">{s.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((i) => (<li key={i} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">{i}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Experience</h2>
        <div className="mt-4 space-y-6">
          {resume.experience.map((r) => (
            <article key={r.company + r.title} className="card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{r.title} | {r.company}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{r.start}{r.end ? ' to ' + r.end : ' to present'}</p>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{r.summary}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
                {r.highlights.map((h) => (<li key={h}>{h}</li>))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Selected projects</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {resume.projects.map((p) => (
            <li key={p.name} className="card">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{p.description}</p>
              {p.link ? <a href={p.link} rel="noreferrer" className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">{p.link.replace(/^https?:\/\//, '')}</a> : null}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
