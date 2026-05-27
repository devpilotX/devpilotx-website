import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STARTED_AT = Date.now();

function fmtUptime(ms: number): string {
  const sec = Math.floor(ms / 1000);
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export async function GET() {
  return NextResponse.json({
    uptime: fmtUptime(Date.now() - STARTED_AT),
    region: process.env.HOSTING_REGION ?? 'Mumbai, IN',
    stack: ['PostgreSQL 16', 'Nginx', 'pm2', 'Next.js 14', 'Hostinger', 'GitHub'],
    lastDeploy: process.env.BUILD_TIME ?? new Date().toISOString().slice(0, 10),
    commitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT ?? 'main',
    systemsOk: true
  });
}
