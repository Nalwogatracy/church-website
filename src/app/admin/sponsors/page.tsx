'use client';

import React, { useState, useEffect } from 'react';
import { SponsorItem } from '@/lib/store';
import { Handshake, Trash2, CheckCircle2, Globe } from 'lucide-react';

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);

  const fetchSponsors = () => {
    fetch('/api/sponsors')
      .then((res) => res.json())
      .then((data) => setSponsors(data));
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const updateStatus = async (id: string, status: 'PENDING' | 'APPROVED' | 'PARTNERED') => {
    const res = await fetch('/api/sponsors', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchSponsors();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete sponsor record?')) return;
    const res = await fetch(`/api/sponsors?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchSponsors();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Handshake className="w-7 h-7 text-amber-400" /> Sponsors & Partners Inbox
        </h1>
        <p className="text-slate-400 text-sm">Review sponsorship applications and manage corporate & individual partners.</p>
      </div>

      <div className="space-y-4">
        {sponsors.map((s) => (
          <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-base font-bold text-white block">
                  {s.name} {s.organization && <span className="text-slate-400 font-normal">({s.organization})</span>}
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {s.email} {s.phone && `• ${s.phone}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {(['PENDING', 'APPROVED', 'PARTNERED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateStatus(s.id, st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      s.status === st
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div>
                <strong className="text-white block mb-0.5">Project Selected:</strong>
                <span className="text-amber-400 font-semibold">{s.projectChoice}</span>
              </div>
              <div>
                <strong className="text-white block mb-0.5">Type:</strong>
                <span>{s.contributionType}</span>
              </div>
              <div>
                <strong className="text-white block mb-0.5">Pledged Amount:</strong>
                <span className="font-mono text-white">
                  {s.amountEstimate
                    ? `${s.currency || 'UGX'} ${s.amountEstimate.toLocaleString()}`
                    : 'In-Kind / Undefined'}
                </span>
              </div>
            </div>

            {s.message && (
              <p className="text-xs text-slate-400 italic">
                &ldquo;{s.message}&rdquo;
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
