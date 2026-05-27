import Container from '@/components/Container';
import { resume } from '@/content/resume';
import { projects } from '@/content/projects';
import { buildMetadata } from '@/lib/seo';
import { BadgeCheck, MapPin, Mail, Github, Linkedin, ExternalLink, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

export const metadata = buildMetadata({
  title: resume.name + ' · Resume',
  description: resume.headline,
  path: '/resume'
});

const selectedProjects = projects
  .filter((p) => p.status === 'live' || p.status === 'private')
  .slice(0, 6);

export default function ResumePage() {
  return (
    <Container className="py-16 sm:py-20">
      {/* Header card */}
      <header className="surface rounded-3xl p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.20em] text-fg-muted">Resume</span>
              {resume.openToWork ? (
                <span className="chip text-[11px] text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" /> Open to work
                </span>
              ) : null}
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fg">{resume.name}</h1>
            <p className="mt-2 text-base sm:text-lg text-fg-dim">{resume.headline}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-dim">
              <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {resume.location}</span>
              <a className="inline-flex items-center gap-1.5 hover:text-fg" href={'mailto:' + resume.email}><Mail size={13} /> {resume.email}</a>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={resume.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-secondary h-9 px-3 text-[13px]"><Linkedin size={13} className="mr-1.5" /> LinkedIn</a>
            <a href={resume.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary h-9 px-3 text-[13px]"><Github size={13} className="mr-1.5" /> GitHub</a>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {resume.verifications.map((v) => (
            <span key={v.kind} className="chip text-[11px]">
              <BadgeCheck size={11} className="text-sky-500 dark:text-sky-400" /> {v.label} verified
            </span>
          ))}
        </div>
      </header>

      {/* About */}
      <section className="mt-12">
        <SectionTitle>About</SectionTitle>
        <p className="mt-4 max-w-3xl text-base leading-7 text-fg-dim">{resume.about}</p>
      </section>

      {/* Skills */}
      <section className="mt-16">
        <SectionTitle icon={<Sparkles size={15} />}>Skills</SectionTitle>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(resume.skills).map(([group, items]) => (
            <div key={group} className="card">
              <div className="text-[11px] uppercase tracking-[0.20em] text-fg-muted mb-3">{group}</div>
              <ul className="flex flex-wrap gap-1.5">
                {items.map((i) => (
                  <li key={i} className="chip text-[11px]">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-16">
        <SectionTitle icon={<Briefcase size={15} />}>Experience</SectionTitle>
        <div className="mt-6 space-y-5">
          {resume.experience.map((r) => (
            <article key={r.company + r.role} className="card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-fg">
                  {r.role} <span className="text-fg-muted font-normal">at</span>{' '}
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noreferrer" className="hover:text-fg-dim inline-flex items-center gap-1">{r.company} <ExternalLink size={12} /></a>
                  ) : r.company}
                </h3>
                <p className="text-sm text-fg-muted">{r.start} — {r.end}</p>
              </div>
              <p className="mt-1 text-sm text-fg-muted">{r.type} · {r.location}</p>
              <ul className="mt-4 space-y-2 text-sm text-fg-dim">
                {r.description.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-cyan-400" />
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
              {r.skills.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.skills.map((s) => (<span key={s} className="chip text-[11px]">{s}</span>))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-16">
        <SectionTitle icon={<GraduationCap size={15} />}>Education</SectionTitle>
        <div className="mt-6 space-y-4">
          {resume.education.map((e) => (
            <article key={e.school + e.degree} className="card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-fg">{e.degree}</h3>
                <p className="text-sm text-fg-muted">{e.start} — {e.end}</p>
              </div>
              <p className="mt-1 text-sm text-fg-dim">{e.school} · {e.location}</p>
              {e.note ? <p className="mt-1 text-xs text-fg-muted">{e.note}</p> : null}
            </article>
          ))}
        </div>
      </section>

      {/* Selected projects */}
      <section className="mt-16">
        <SectionTitle>Selected projects</SectionTitle>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {selectedProjects.map((p) => (
            <li key={p.slug} className="card">
              <h3 className="text-base font-semibold text-fg">{p.name}</h3>
              <p className="mt-1 text-sm text-fg-dim">{p.oneLiner}</p>
              {p.liveUrl ? (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-fg-dim hover:text-fg">
                  {p.liveUrl.replace(/^https?:\/\//, '')} <ExternalLink size={12} />
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

function SectionTitle({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon ? <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg surface text-fg-dim">{icon}</span> : null}
      <h2 className="text-xl font-semibold tracking-tight text-fg">{children}</h2>
      <div className="flex-1 h-px divider-grad ml-2" />
    </div>
  );
}
