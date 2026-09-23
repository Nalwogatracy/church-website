import React from 'react';
import { PastorItem } from '@/lib/store';
import { Mail } from 'lucide-react';

export default function PastorCard({ pastor }: { pastor: PastorItem }) {
  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col h-full group text-center p-6">
      <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden mb-5 border-2 border-amber-500/30 group-hover:border-amber-400 transition-colors shadow-xl">
        <img
          src={pastor.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
          alt={pastor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
        {pastor.name}
      </h3>
      <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 block mb-4">
        {pastor.title}
      </span>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
        {pastor.bio}
      </p>

      {pastor.email && (
        <a
          href={`mailto:${pastor.email}`}
          className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          {pastor.email}
        </a>
      )}
    </div>
  );
}
