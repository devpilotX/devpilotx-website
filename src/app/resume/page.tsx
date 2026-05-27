import Container from '@/components/Container';
import VerifiedBadge from '@/components/VerifiedBadge';
import { resume } from '@/content/resume';
import { projects } from '@/content/projects';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: resume.name + ' | Resume',
  description: resume.headline,
  path: '/resume'
});

const resumeLinks = [
  { href: resume.linkedinUrl, label: 'LinkedIn' },
  { href: resume.githubUrl, label: 'GitHub' }
];

const selectedProjects = projects
  .filter((p) => p.status === 'live' || p.status === 'private')
  .slice(0, 6);

export default function ResumePage() {
  return (
    <Container className="py-20">
      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-2">
          <p className="text-sm uppercase tracking-widest text-brand-400">Resume</p>
          {resume.openToWork ? (
            <span className="chip text-[11px] text-emerald-300 border-emerald-500/30">Open to work</span>
          ) : null}
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{resume.name}</h1>
        <p className="mt-3 text-lg text-ink-dim">{resume.headline}</p>
        <p className="mt-1 text-sm text-ink-muted">
          {resume.location} <span className="mx-1">|</span>{' '}
          <a className="hover:text-ink" href={'mailto:' + resume.email}>{resume.email}</a>
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {resume.verifications.map((v) => (
            <VerifiedBadge key={v.kind} label={v.label} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {resumeLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              rel="noreferrer"
              className="chip hover:border-strong text-ink-dim hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">About</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-dim">{resume.about}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">Skills</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(resume.skills).map(([group, items]) => (
            <div key={group} className="card">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-400">{group}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {items.map((i) => (
                  <li key={i} className="rounded-full bg-white/5 border border-border px-2.5 py-0.5 text-xs font-medium text-ink-dim">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">Experience</h2>
        <div className="mt-4 space-y-6">
          {resume.experience.map((r) => (
            <article key={r.company + r.role} className="card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-ink">
                  {r.role} <span className="text-ink-dim">|</span> {r.company}
                </h3>
                <p className="text-sm text-ink-muted">
                  {r.start}{r.end ? ' to ' + r.end : ' to present'}
                </p>
              </div>
              <p className="mt-1 text-sm text-ink-muted">{r.type} <span className="mx-1">|</span> {r.location}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-dim">
                {r.description.map((d) => (<li key={d}>{d}</li>))}
              </ul>
              {r.skills.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.skills.map((s) => (
                    <span key={s} className="chip text-[11px] text-ink-muted">{s}</span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">Education</h2>
        <div className="mt-4 space-y-4">
          {resume.education.map((e) => (
            <article key={e.school + e.degree} className="card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-ink">{e.degree}</h3>
                <p className="text-sm text-ink-muted">{e.start} to {e.end}</p>
              </div>
              <p className="mt-1 text-sm text-ink-dim">{e.school} <span className="mx-1">|</span> {e.location}</p>
              {e.note ? <p className="mt-1 text-xs text-ink-muted">{e.note}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">Selected projects</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {selectedProjects.map((p) => (
            <li key={p.slug} className="card">
              <h3 className="text-base font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-dim">{p.oneLiner}</p>
              {p.liveUrl ? (
                <a
                  href={p.liveUrl}
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-brand-400 hover:text-brand-300"
                >
                  {p.liveUrl.replace(/^https?:\/\//, '')}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
