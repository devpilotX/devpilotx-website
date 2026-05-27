'use client';

import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Please enter your name').max(120),
  email: z.string().email('Please enter a valid email'),
  role: z.enum(['recruiter', 'customer', 'other']),
  company: z.string().max(160).optional().or(z.literal('')),
  message: z.string().min(10, 'A short message helps me reply faster').max(4000)
});

type Status = 'idle' | 'sending' | 'sent' | 'error';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export function ContactForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      role: String(form.get('role') ?? 'other') as 'recruiter' | 'customer' | 'other',
      company: String(form.get('company') ?? ''),
      message: String(form.get('message') ?? ''),
      sourcePage: source
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Please review the form');
      return;
    }
    if (!API_BASE) {
      setError('Contact API is not configured');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(API_BASE + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string })?.error ?? 'Submission failed');
      }
      setStatus('sent');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'sent') {
    return (
      <div className="card text-center">
        <p className="text-lg font-medium">Thanks. I will reply within one business day.</p>
        <p className="mt-2 text-sm prose-body">A confirmation has been sent to your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-4" noValidate>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <input id="name" name="name" required maxLength={120} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="role" className="text-sm font-medium">You are</label>
          <select id="role" name="role" defaultValue="other" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
            <option value="recruiter">A recruiter</option>
            <option value="customer">A customer</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="company" className="text-sm font-medium">Company (optional)</label>
        <input id="company" name="company" maxLength={160} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={5} required minLength={10} maxLength={4000} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </div>
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs prose-body">By submitting you agree to the privacy policy.</p>
        <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
          {status === 'sending' ? 'Sending' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
