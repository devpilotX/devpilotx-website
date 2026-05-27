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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.devpilotx.com';

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  try {
    let id = window.sessionStorage.getItem('dpx_ask_session');
    if (!id) {
      id = 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      window.sessionStorage.setItem('dpx_ask_session', id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

export default function AskBubble() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text:
        "Hi, I am the AI assistant for DevPilotX. Ask me anything about Dipanshu, his projects, services, or pricing."
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  async function streamFromApi(query: string, history: Msg[]): Promise<boolean> {
    if (!API_BASE) return false;
    try {
      const res = await fetch(API_BASE + '/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question: query,
          sessionId: getSessionId(),
          history: history.slice(-6).map((m) => ({ role: m.role, content: m.text }))
        })
      });
      if (!res.ok || !res.body) return false;

      // Push an empty assistant message we will fill in as tokens arrive.
      setMessages((m) => [...m, { role: 'assistant', text: '' }]);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      let citations: { title: string; url: string }[] = [];

      const append = (delta: string) => {
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          if (last && last.role === 'assistant') {
            next[next.length - 1] = { ...last, text: last.text + delta };
          }
          return next;
        });
      };

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() ?? '';
        for (const line of lines) {
          const s = line.trim();
          if (!s.startsWith('data:')) continue;
          try {
            const j = JSON.parse(s.slice(5).trim());
            if (typeof j.t === 'string') append(j.t);
            if (Array.isArray(j.citations)) citations = j.citations;
            if (j.error) append('\n\n' + j.error);
          } catch {
            /* ignore parse errors */
          }
        }
      }

      if (citations.length) {
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          if (last && last.role === 'assistant') {
            next[next.length - 1] = {
              ...last,
              sources: citations
                .filter((c) => c && c.url)
                .map((c) => ({ title: c.title || c.url, url: c.url }))
            };
          }
          return next;
        });
      }
      return true;
    } catch {
      return false;
    }
  }

  async function ask(q: string) {
    const query = q.trim();
    if (!query || busy) return;
    const historySnapshot = messages;
    setMessages((m) => [...m, { role: 'user', text: query }]);
    setInput('');
    setBusy(true);
    try {
      const streamed = await streamFromApi(query, historySnapshot);
      if (streamed) return;

      // Offline / API down fallback: deterministic local retrieval.
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
                  <div className="text-[11px] text-ink-muted mt-0.5">Live AI, grounded in this site</div>
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
                      <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-white/5 border border-border text-sm leading-relaxed text-ink whitespace-pre-wrap">{m.text || (busy && i === messages.length - 1 ? 'Thinking...' : '')}</div>
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
                placeholder="Ask about a project, skill, or service"
                className="flex-1 h-10 px-3 rounded-xl bg-white/5 border border-border text-sm placeholder:text-ink-muted focus:outline-none focus:border-brand-400/60"
              />
              <button disabled={busy} className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-brand-gradient text-white disabled:opacity-50" aria-label="Send">
                <Send size={15} />
              </button>
            </form>
            <div className="px-3 py-2 border-t border-border flex items-center gap-1.5 text-[10px] text-ink-muted">
              <MessageCircle size={11} />
              Answers stream in real time and may occasionally be imprecise.
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
