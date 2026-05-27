import { NextResponse } from 'next/server';
import { search, summarize } from '@/lib/rag';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { q?: string };
    const q = (body.q ?? '').trim().slice(0, 500);
    if (!q) {
      return NextResponse.json({ answer: 'Ask a real question about projects, skills, or experience.', sources: [] });
    }
    const matches = search(q, 4);
    const answer = summarize(q, matches);
    return NextResponse.json({
      answer,
      sources: matches.map((m) => ({ title: m.title, url: m.url, score: Number(m.score.toFixed(3)) }))
    });
  } catch {
    return NextResponse.json({ answer: 'Bad request.', sources: [] }, { status: 400 });
  }
}
