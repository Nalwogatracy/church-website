'use client';

import React, { useState, useEffect } from 'react';
import { PrayerItem } from '@/lib/store';
import { Heart, CheckCircle2, Trash2, Globe, Lock } from 'lucide-react';

export default function AdminPrayersPage() {
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);

  const fetchPrayers = () => {
    fetch('/api/prayers')
      .then((res) => res.json())
      .then((data) => setPrayers(data));
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const updateStatus = async (id: string, status: 'PENDING' | 'PRAYED' | 'ANSWERED') => {
    const res = await fetch('/api/prayers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchPrayers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete prayer request?')) return;
    const res = await fetch(`/api/prayers?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchPrayers();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Heart className="w-7 h-7 text-rose-400 fill-current" /> Prayer Requests Manager
        </h1>
        <p className="text-slate-400 text-sm">Review submitted prayer requests and track intercessory prayer status.</p>
      </div>

      <div className="space-y-4">
        {prayers.map((p) => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-white">{p.name}</span>
                {p.email && <span className="text-xs text-slate-400">({p.email})</span>}
                {p.isPublic ? (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Public Wall
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Confidential
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {(['PENDING', 'PRAYED', 'ANSWERED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateStatus(p.id, st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      p.status === st
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800/80 leading-relaxed italic">
              &ldquo;{p.request}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
