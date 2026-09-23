import React from 'react';
import { readStore } from '@/lib/store';
import { Bell, Calendar, Tag } from 'lucide-react';

export const revalidate = 0;

export default function AnnouncementsPage() {
  const store = readStore();

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <Bell className="w-4 h-4" /> News & Updates
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Church Announcements & Bulletins
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Stay connected with key announcements, upcoming ministry opportunities, and community news.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {store.announcements.map((ann) => (
          <div
            key={ann.id}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/30 rounded-3xl p-8 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {ann.category}
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {ann.publishedAt}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{ann.title}</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">{ann.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
