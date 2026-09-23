'use client';

import React, { useState, useEffect } from 'react';
import { PrayerItem } from '@/lib/store';
import { Heart, Send, CheckCircle2, Lock, Globe } from 'lucide-react';

export default function PrayerPage() {
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/prayers')
      .then((res) => res.json())
      .then((data) => setPrayers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !request) return;

    setIsSubmitting(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, request, isPublic }),
      });

      if (res.ok) {
        const created = await res.json();
        if (isPublic) {
          setPrayers([created, ...prayers]);
        }
        setName('');
        setEmail('');
        setRequest('');
        setIsPublic(false);
        setStatusMsg('Your prayer request has been submitted to our pastoral intercession team.');
      } else {
        setStatusMsg('Failed to submit prayer request. Please try again.');
      }
    } catch (err) {
      setStatusMsg('An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <Heart className="w-4 h-4 fill-current" /> Prayer Ministry
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Submit a Prayer Request
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.&rdquo; — Philippians 4:6
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Container */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-400 fill-current" />
            Share Your Heart & Request
          </h2>

          {statusMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Hannah Miller"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hannah@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Prayer Request Details *
              </label>
              <textarea
                required
                rows={5}
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="Please describe how we can stand in prayer with you..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm leading-relaxed"
              />
            </div>

            {/* Public Toggle */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isPublic ? (
                  <Globe className="w-5 h-5 text-amber-400" />
                ) : (
                  <Lock className="w-5 h-5 text-slate-400" />
                )}
                <div>
                  <span className="text-sm font-semibold text-white block">
                    {isPublic ? 'Public Prayer Wall' : 'Confidential / Pastoral Only'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isPublic
                      ? 'Will be displayed on our church prayer wall'
                      : 'Only visible to senior pastors & intercessors'}
                  </span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-base hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Submitting Request...' : 'Send Prayer Request'}
            </button>
          </form>
        </div>

        {/* Public Prayer Wall */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              Public Prayer Wall
            </h3>
            <span className="text-xs text-amber-400 font-semibold font-mono">
              {prayers.length} Request(s)
            </span>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {prayers.map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{p.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">&ldquo;{p.request}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
