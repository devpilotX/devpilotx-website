import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  role: z.string().max(40).optional(),
  company: z.string().max(160).optional(),
  message: z.string().min(5).max(5000)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 });
    }
    // Storage and outbound mail land on the VPS once SMTP credentials are configured.
    // For now we log the submission so it is visible in Hostinger function logs.
    console.log('[contact]', JSON.stringify(parsed.data));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
}
