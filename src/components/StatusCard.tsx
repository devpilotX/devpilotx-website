'use client';

import { useEffect, useState } from 'react';
import { Activity, Server, ShieldCheck, Cpu } from 'lucide-react';

type Status = {
  uptime: string;
  region: string;
  stack: string[];
  lastDeploy: string;
  commitSha: string;
  systemsOk: boolean;
};

export default function StatusCard() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/status', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-medium">Live stack status</span>
        </div>
        <span className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">Realtime</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Uptime" value={status?.uptime ?? '…'} icon={<Activity size={14} />} />
        <Stat label="Region" value={status?.region ?? '…'} icon={<Server size={14} />} />
        <Stat label="Last deploy" value={status?.lastDeploy ?? '…'} icon={<Cpu size={14} />} />
        <Stat label="Systems" value={status?.systemsOk ? 'Operational' : '…'} icon={<ShieldCheck size={14} />} />
      </div>
      <div className="mt-5 pt-4 border-t border-border">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted mb-2">Services</div>
        <div className="flex flex-wrap gap-1.5">
          {(status?.stack ?? ['PostgreSQL', 'Nginx', 'pm2', 'Next.js', 'Hostinger', 'GitHub Actions']).map((s) => (
            <span key={s} className="chip text-[11px]">{s}</span>
          ))}
        </div>
      </div>
      {status?.commitSha ? (
        <div className="mt-4 text-[11px] text-ink-muted font-mono">build {status.commitSha.slice(0, 7)}</div>
      ) : null}
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-ink-muted mb-1">
        {icon}
        {label}
      </div>
      <div className="text-sm font-medium text-ink">{value}</div>
    </div>
  );
}
