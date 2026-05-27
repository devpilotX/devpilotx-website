'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Sparkles, FolderGit2, Briefcase, FileText, User, Mail, Github, Linkedin } from 'lucide-react';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { site } from '@/content/site';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const handleOpen = () => setOpen(true);
    window.addEventListener('keydown', down);
    window.addEventListener('dpx:cmdk:open', handleOpen as EventListener);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('dpx:cmdk:open', handleOpen as EventListener);
    };
  }, []);

  function go(href: string) {
    setOpen(false);
    if (href.startsWith('http')) window.open(href, '_blank', 'noreferrer');
    else router.push(href);
  }

  if (!open) return null;

  return (
    <div className="no-print fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl glass-strong rounded-2xl shadow-card overflow-hidden">
        <Command label="Command palette" className="">
          <div className="flex items-center border-b border-border px-3">
            <Sparkles size={15} className="text-ink-dim" />
            <Command.Input placeholder="Search pages, projects, services…" className="flex-1 h-12 px-3 bg-transparent outline-none text-sm placeholder:text-ink-muted" />
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-ink-muted">esc</kbd>
          </div>
          <Command.List className="max-h-[55vh] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-ink-muted">No results.</Command.Empty>
            <Command.Group heading="Pages" className="text-[11px] uppercase tracking-[0.18em] text-ink-muted px-2 mt-1">
              <Item icon={<User size={14} />} label="About" onSelect={() => go('/about')} />
              <Item icon={<FolderGit2 size={14} />} label="Projects" onSelect={() => go('/projects')} />
              <Item icon={<Briefcase size={14} />} label="Services" onSelect={() => go('/services')} />
              <Item icon={<FileText size={14} />} label="Resume" onSelect={() => go('/resume')} />
              <Item icon={<Mail size={14} />} label="Contact" onSelect={() => go('/contact')} />
            </Command.Group>
            <Command.Group heading="Projects" className="text-[11px] uppercase tracking-[0.18em] text-ink-muted px-2 mt-3">
              {projects.map((p) => (
                <Item key={p.slug} icon={<FolderGit2 size={14} />} label={p.name} hint={p.oneLiner} onSelect={() => go(`/projects/${p.slug}`)} />
              ))}
            </Command.Group>
            <Command.Group heading="Services" className="text-[11px] uppercase tracking-[0.18em] text-ink-muted px-2 mt-3">
              {services.map((s) => (
                <Item key={s.slug} icon={<Briefcase size={14} />} label={s.name} hint={s.oneLiner} onSelect={() => go('/services')} />
              ))}
            </Command.Group>
            <Command.Group heading="External" className="text-[11px] uppercase tracking-[0.18em] text-ink-muted px-2 mt-3">
              <Item icon={<Github size={14} />} label="GitHub" hint={site.links.github} onSelect={() => go(site.links.github)} />
              <Item icon={<Linkedin size={14} />} label="LinkedIn" hint={site.links.linkedin} onSelect={() => go(site.links.linkedin)} />
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({ icon, label, hint, onSelect }: { icon: React.ReactNode; label: string; hint?: string; onSelect: () => void }) {
  return (
    <Command.Item onSelect={onSelect} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer aria-selected:bg-white/5 text-sm">
      <span className="text-ink-dim">{icon}</span>
      <span className="flex-1 text-ink">{label}</span>
      {hint ? <span className="text-[11px] text-ink-muted truncate max-w-[200px]">{hint}</span> : null}
    </Command.Item>
  );
}
