'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@/lib/store';
import { Camera, Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory);

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <Camera className="w-4 h-4" /> Photo Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Church Life & Ministry Photo Gallery
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Moments of worship, community fellowship, outreach drives, and celebrations captured in pictures.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
              <span className="text-xs font-semibold text-amber-400">{item.category}</span>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
