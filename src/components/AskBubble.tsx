'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Send, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { search, summarize } from '@/lib/rag';

type Msg = {
  role: 'user' | 'assistant';
  text: string;
  sources?: { title: string; url: string }[];
};

const SUGGESTIONS = [
  'What does Dipanshu build?',
  'Tell me about OU-MRS',
  'Skills in AI and RAG?',
  'What is Paisa Reality?'
];

const panelInitial = { opacity: 0, y: 16, scale: 0.98 };
const panelAnimate = { opacity: 1, y: 0, scale: 1 };
const panelExit = { opacity: 0, y: 16, scale: 0.98 };
const panelTransition = { duration: 0.18, ease: 'easeOut' as const };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export default function AskBubble() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text:
        "Hi, I am an AI assistant trained on Dipanshu's resume and projects. Ask anything about his work, stack, or shipped products."
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  // In static export we run the RAG client-side over the same content bundle.
  // If a remote API is configured we prefer it (richer logging, future LLM),
  // otherwise we fall back to in-browser retrieval so the assistant always works.
  async function ask(q: string) {
    const query = q.trim();
    if (!query || busy) return;
    setMessages((m) => [...m, { role: 'user', text: query }]);
    setInput('');
    setBusy(true);
    try {
      if (API_BASE) {
        try {
          const r = await fetch(API_BASE + '/ask', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ q: query })
          });
          if (r.ok) {
            const data = await r.json();
            setMessages((m) => [
              ...m,
              {
                role: 'assistant',
                text: data.answer ?? 'No answer.',
                sources: data.sources ?? []
              }
            ]);
            return;
          }
        } catch {
          // fall through to local RAG
        }
      }
      const matches = search(query, 4);
      const answer = summarize(query, matches);
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          text: answer,
          sources: matches.map((x) => ({ title: x.title, url: x.url }))
        }
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="no-print fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 h-12 pl-3 pr-4 rounded-full bg-brand-gradient shadow-glow text-white text-sm font-medium hover:scale-[1.02] transition-transform"
        aria-label="Ask the AI assistant"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
          <Sparkles size={14} />
        </span>
        Ask Dipanshu
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={panelInitial}
            animate={panelAnimate}
            exit={panelExit}
            transition={panelTransition}
            className="no-print fixed bottom-24 right-5 z-50 w-[min(380px,calc(100vw-2rem))] h-[520px] glass-strong rounded-2xl shadow-card flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient">
                  <Sparkles size={13} className="text-white" />
                </span>
                <div>
                  <div className="text-sm font-medium leading-none">Ask Dipanshu</div>
                  <div className="text-[11px] text-ink-muted mt-0.5">Local RAG over resume and projects</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-white/5 text-ink-dim" aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div className={m.role === 'user' ? 'max-w-[85%]' : 'max-w-[90%]'}>
                    {m.role === 'assistant' ? (
                      <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-white/5 border border-border text-sm leading-relaxed text-ink">{m.text}</div>
                    ) : (
                      <div className="px-3 py-2 rounded-2xl rounded-br-md bg-brand-gradient text-white text-sm">{m.text}</div>
                    )}
                    {m.sources && m.sources.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.sources.map((s) => (
                          <Link key={s.url} href={s.url} className="inline-flex items-center gap-1 text-[11px] text-sky-300 hover:text-white">
                            {s.title}
                            <ArrowUpRight size={11} />
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              {messages.length === 1 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => ask(s)} className="chip hover:border-strong text-[11px] text-ink">{s}</button>
                  ))}
                </div>
              ) : null}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); ask(input); }}
              className="p-2.5 border-t border-border flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a project, skill, or experience"
                className="flex-1 h-10 px-3 rounded-xl bg-white/5 border border-border text-sm placeholder:text-ink-muted focus:outline-none focus:border-brand-400/60"
              />
              <button disabled={busy} className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-brand-gradient text-white disabled:opacity-50" aria-label="Send">
                <Send size={15} />
              </button>
            </form>
            <div className="px-3 py-2 border-t border-border flex items-center gap-1.5 text-[10px] text-ink-muted">
              <MessageCircle size={11} />
              Responses are deterministic retrieval, not generated.
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
