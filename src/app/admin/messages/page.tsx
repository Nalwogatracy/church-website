'use client';

import React, { useState, useEffect } from 'react';
import { ContactMessage } from '@/lib/store';
import { Mail, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const fetchMessages = () => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id: string, status: 'UNREAD' | 'READ' | 'ARCHIVED') => {
    const res = await fetch('/api/messages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete message?')) return;
    const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchMessages();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Mail className="w-7 h-7 text-emerald-400" /> Contact Messages Inbox
        </h1>
        <p className="text-slate-400 text-sm">Read and manage inquiries submitted through the contact page.</p>
      </div>

      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-base font-bold text-white block">{m.name}</span>
                <span className="text-xs text-amber-400 font-mono">
                  {m.email} {m.phone && `• ${m.phone}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold">
                  {m.subject}
                </span>
                <button
                  onClick={() => updateStatus(m.id, m.status === 'READ' ? 'UNREAD' : 'READ')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    m.status === 'READ' ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500 text-slate-950'
                  }`}
                >
                  {m.status}
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              {m.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
