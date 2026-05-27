import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const PORT = Number(process.env.PORT || 4000);
const ORIGINS = (process.env.CORS_ORIGINS || 'https://devpilotx.com,https://www.devpilotx.com')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_CONTACT = process.env.MAIL_FROM_CONTACT || 'DevPilotX <contact@devpilotx.com>';
const FROM_NOREPLY = process.env.MAIL_FROM_NOREPLY || 'DevPilotX <noreply@devpilotx.com>';
const NOTIFY_TO = process.env.CONTACT_NOTIFY_TO || 'admin@devpilotx.com';

const prisma = new PrismaClient();

const transporter = SMTP_HOST
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
    })
  : null;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    const m: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return m[c] as string;
  });
}

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  role: z.enum(['recruiter', 'customer', 'other']),
  company: z.string().max(160).optional().or(z.literal('')),
  message: z.string().min(10).max(4000),
  sourcePage: z.string().max(200).optional()
});

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json({ limit: '32kb' }));
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      cb(null, ORIGINS.includes(origin));
    },
    methods: ['GET', 'POST'],
    credentials: false
  })
);
app.use(pinoHttp());

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'devpilotx-api', time: new Date().toISOString() });
});

app.post('/contact', contactLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid submission', details: parsed.error.flatten() });
    }
    const { name, email, role, company, message, sourcePage } = parsed.data;
    const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() || req.ip || null;
    const userAgent = (req.headers['user-agent'] || '').slice(0, 500) || null;

    const record = await prisma.contact.create({
      data: {
        name,
        email,
        role,
        company: company || null,
        message,
        sourcePage: sourcePage || null,
        ip: ip || null,
        userAgent
      }
    });

    if (transporter) {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeCompany = company ? escapeHtml(company) : '';
      const safeSource = sourcePage ? escapeHtml(sourcePage) : '';
      const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
      const visitorHtml =
        '<div style="font-family:Inter,system-ui,sans-serif;color:#0f172a;line-height:1.6;max-width:560px">' +
        '<h2 style="margin:0 0 12px;font-size:20px">Thanks, ' + safeName + '.</h2>' +
        '<p>I received your message and will respond within one business day.</p>' +
        '<p><strong>What you sent:</strong></p>' +
        '<blockquote style="border-left:3px solid #2563eb;padding:8px 12px;margin:8px 0;background:#f1f5f9">' + safeMessage + '</blockquote>' +
        '<p>If this is urgent you can reply directly to this email.</p>' +
        '<p style="color:#64748b;font-size:13px">DevPilotX | devpilotx.com</p>' +
        '</div>';
      const adminHtml =
        '<div style="font-family:Inter,system-ui,sans-serif;color:#0f172a;line-height:1.6;max-width:560px">' +
        '<h2 style="margin:0 0 12px;font-size:20px">New contact submission</h2>' +
        '<p><strong>Name:</strong> ' + safeName + '</p>' +
        '<p><strong>Email:</strong> ' + safeEmail + '</p>' +
        '<p><strong>Role:</strong> ' + role + '</p>' +
        (safeCompany ? '<p><strong>Company:</strong> ' + safeCompany + '</p>' : '') +
        (safeSource ? '<p><strong>Source page:</strong> ' + safeSource + '</p>' : '') +
        '<p><strong>Message:</strong></p>' +
        '<blockquote style="border-left:3px solid #2563eb;padding:8px 12px;margin:8px 0;background:#f1f5f9">' + safeMessage + '</blockquote>' +
        '<p><a href="https://profile.devpilotx.com/inbox">Open inbox</a></p>' +
        '</div>';
      try {
        await Promise.all([
          transporter.sendMail({
            from: FROM_NOREPLY,
            to: email,
            subject: 'Thanks for reaching out to DevPilotX',
            html: visitorHtml,
            replyTo: NOTIFY_TO
          }),
          transporter.sendMail({
            from: FROM_CONTACT,
            to: NOTIFY_TO,
            subject: 'New ' + role + ' lead: ' + name,
            html: adminHtml,
            replyTo: email
          })
        ]);
      } catch (mailErr) {
        req.log.error({ err: mailErr }, 'Mail send failed; submission saved');
      }
    }

    return res.status(201).json({ id: record.id, ok: true });
  } catch (err) {
    return next(err);
  }
});

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  req.log.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log('[devpilotx-api] listening on ' + PORT);
});

async function shutdown(signal: string) {
  console.log('[devpilotx-api] ' + signal + ' received, shutting down');
  await prisma.$disconnect().catch(() => {});
  process.exit(0);
}
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
