import React from 'react';
import { EventItem } from '@/lib/store';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';

export default function EventCard({ event }: { event: EventItem }) {
  // Format Date for Date Badge (Month & Day)
  const dateObj = new Date(event.eventDate);
  const monthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayStr = dateObj.getDate();

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col h-full group">
      {/* Event Header Image */}
      <div className="relative h-48 bg-slate-950 overflow-hidden">
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Date Floating Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md border border-amber-500/40 rounded-2xl px-3 py-2 text-center shadow-lg min-w-16">
          <span className="block text-[10px] font-extrabold text-amber-400 tracking-wider">
            {monthStr}
          </span>
          <span className="block text-2xl font-black text-white leading-none font-mono">
            {dayStr}
          </span>
        </div>

        {/* Category Badge */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {event.category}
        </span>
      </div>

      {/* Details Container */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-3 line-clamp-2">
            {event.title}
          </h3>

          <p className="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
