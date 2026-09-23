import React from 'react';
import { MinistryItem } from '@/lib/store';
import { Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MinistryCard({ ministry }: { ministry: MinistryItem }) {
  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col h-full group">
      <div className="relative h-52 bg-slate-950 overflow-hidden">
        <img
          src={ministry.imageUrl || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'}
          alt={ministry.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
            {ministry.name}
          </h3>

          <p className="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
            {ministry.description}
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Leader: <strong className="text-white">{ministry.leaderName}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{ministry.meetingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
