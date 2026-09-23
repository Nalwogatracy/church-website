'use client';

import React, { useState } from 'react';
import { SermonItem } from '@/lib/store';
import { Play, Calendar, User, BookOpen, X } from 'lucide-react';

export default function SermonCard({ sermon }: { sermon: SermonItem }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col h-full group">
        {/* Video Thumbnail Container */}
        <div className="relative aspect-video bg-slate-950 overflow-hidden">
          <img
            src={sermon.imageUrl || 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'}
            alt={sermon.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Series Badge */}
          {sermon.series && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-semibold">
              {sermon.series}
            </span>
          )}

          {/* Play Button */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 transition-transform"
            aria-label="Play Sermon Video"
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </button>
        </div>

        {/* Details Container */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-4 text-xs text-amber-400/90 mb-3 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {sermon.sermonDate}
              </span>
              {sermon.scripture && (
                <span className="flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  {sermon.scripture}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 line-clamp-2">
              {sermon.title}
            </h3>

            <p className="text-sm text-slate-400 line-clamp-3 mb-4 leading-relaxed">
              {sermon.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              {sermon.speaker}
            </span>

            <button
              onClick={() => setIsPlaying(true)}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              Watch Video →
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h4 className="text-base font-bold text-white truncate pr-4">{sermon.title}</h4>
              <button
                onClick={() => setIsPlaying(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {sermon.videoUrl && (sermon.videoUrl.endsWith('.mp4') || sermon.videoUrl.startsWith('/videos/')) ? (
                <video
                  src={sermon.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={sermon.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                  title={sermon.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
