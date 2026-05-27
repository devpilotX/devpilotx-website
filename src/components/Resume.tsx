import { BadgeCheck, MapPin, Mail, ExternalLink, Briefcase, GraduationCap, Sparkles, Printer } from 'lucide-react';
import Link from 'next/link';
import { resume } from '@/content/resume';
import { initials } from '@/lib/utils';

export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-strong rounded-3xl overflow-hidden">
        <div className="relative h-32 bg-gradient-to-br from-brand-700 via-brand-500 to-cyan-500">
          <div aria-hidden className="absolute inset-0 bg-grid bg-[length:40px_40px] opacity-10" />
          <div className="absolute top-3 right-3 no-print">
            <button onClick={typeof window !== 'undefined' ? () => window.print() : undefined} className="btn btn-ghost h-9 text-xs">
              <Printer size={13} className="mr-1.5" /> Save as PDF
            </button>
          </div>
        </div>
        <div className="px-6 sm:px-10 pb-8 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 ring-4 ring-bg flex items-center justify-center text-white text-3xl font-semibold tracking-tight">
                  {initials(resume.name)}
                </div>
                {resume.openToWork ? (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500 text-white shadow ring-2 ring-bg">
                    Open to work
                  </div>
                ) : null}
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{resume.name}</h1>
                  <BadgeCheck size={20} className="text-sky-400" aria-label="Verified" />
                </div>
                <div className="text-sm text-ink-dim mt-1">{resume.headline}</div>
                <div className="text-xs text-ink-muted mt-1 flex items-center gap-1.5"><MapPin size={11} /> {resume.location}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-xs sm:text-right">
              <a href={`mailto:${resume.email}`} className="inline-flex items-center gap-1.5 text-ink hover:text-white">
                <Mail size={12} /> {resume.email} <BadgeCheck size={12} className="text-sky-400" />
              </a>
              <a href={resume.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:text-white">
                <span className="font-mono">in/</span>{resume.linkedinHandle.replace('linkedin.com/in/', '')}
                <BadgeCheck size={12} className="text-sky-400" />
              </a>
              <a href={resume.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:text-white">
                <span className="font-mono">@</span>{resume.githubHandle.replace('github.com/', '')}
                <BadgeCheck size={12} className="text-sky-400" />
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {resume.verifications.map((v) => (
              <span key={v.kind} className="chip text-[11px]">
                <BadgeCheck size={11} className="text-sky-400" /> {v.label} verified
              </span>
            ))}
          </div>

          <Section title="About" icon={<Sparkles size={15} />}>
            <p className="text-ink-dim leading-relaxed">{resume.about}</p>
          </Section>

          <Section title="Experience" icon={<Briefcase size={15} />}>
            <div className="space-y-7">
              {resume.experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${exp.logoColor} flex items-center justify-center text-white font-semibold tracking-tight`}>
                    {initials(exp.company)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        <div className="font-semibold text-ink">{exp.role}</div>
                        <div className="text-sm text-ink-dim flex items-center gap-1.5 flex-wrap">
                          {exp.url ? (
                            <a href={exp.url} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-1">
                              {exp.company} <ExternalLink size={11} />
                            </a>
                          ) : (
                            <span>{exp.company}</span>
                          )}
                          <span className="text-ink-muted">·</span>
                          <span>{exp.type}</span>
                        </div>
                      </div>
                      <div className="text-xs text-ink-muted whitespace-nowrap">{exp.start} — {exp.end} · {exp.location}</div>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-sm text-ink/90">
                      {exp.description.map((d, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-brand-400 to-cyan-400" />
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (<span key={s} className="chip text-[11px]">{s}</span>))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Skills" icon={<Sparkles size={15} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Object.entries(resume.skills).map(([group, items]) => (
                <div key={group}>
                  <div className="text-xs uppercase tracking-[0.18em] text-ink-muted mb-2">{group}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((s) => (<span key={s} className="chip text-[11px]">{s}</span>))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education" icon={<GraduationCap size={15} />}>
            <div className="space-y-5">
              {resume.education.map((edu, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${edu.logoColor} flex items-center justify-center text-white font-semibold tracking-tight`}>
                    {initials(edu.school)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-ink">{edu.degree}</div>
                    <div className="text-sm text-ink-dim">{edu.school} · {edu.location}</div>
                    <div className="text-xs text-ink-muted mt-1">{edu.start} — {edu.end}{edu.note ? ` · ${edu.note}` : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-border text-ink-dim">{icon}</span>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-2" />
      </div>
      {children}
    </section>
  );
}
