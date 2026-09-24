import type { Metadata } from 'next';
import React from 'react';
import EventCard from '@/components/EventCard';
import { readStore } from '@/lib/store';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Church Events & Gathering Schedule | Kibiri, Munyonyo',
  description: 'Join Sunday worship services, midweek prayer altars, and community outreach events at Christ Formed Church International in Kibiri, Kampala.',
};

export const revalidate = 0;

export default function EventsPage() {
  const store = readStore();

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <Calendar className="w-4 h-4" /> Church Calendar
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Upcoming Events & Gathering Schedule
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Stay informed and get involved with our worship services, prayer meetings, youth nights, and community outreach.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {store.events.map((evt) => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
}
