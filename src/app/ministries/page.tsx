import React from 'react';
import MinistryCard from '@/components/MinistryCard';
import { readStore } from '@/lib/store';
import { Users, HeartHandshake } from 'lucide-react';

export const revalidate = 0;

export default function MinistriesPage() {
  const store = readStore();

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <Users className="w-4 h-4" /> Ministry & Fellowship
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Find Your Place to Belong & Serve
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          From toddlers and teens to adult small groups and community outreach, there is a vibrant ministry home waiting for you here.
        </p>
      </div>

      {/* Ministries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {store.ministries.map((ministry) => (
          <MinistryCard key={ministry.id} ministry={ministry} />
        ))}
      </div>
    </div>
  );
}
