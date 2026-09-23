import React from 'react';
import SermonCard from '@/components/SermonCard';
import { readStore } from '@/lib/store';
import { Video } from 'lucide-react';

export const revalidate = 0;

export default function SermonsPage() {
  const store = readStore();

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <Video className="w-4 h-4" /> Media & Teaching Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Sermon Library & Biblical Teaching
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Watch, listen, and grow with our weekly sermons, series archives, and verse-by-verse scripture studies.
        </p>
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {store.sermons.map((sermon) => (
          <SermonCard key={sermon.id} sermon={sermon} />
        ))}
      </div>
    </div>
  );
}
