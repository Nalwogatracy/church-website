'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@/lib/store';
import FileUploadInput from '@/components/FileUploadInput';
import { Camera, Plus, Trash2, X, Save } from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Worship');
  const [imageUrl, setImageUrl] = useState('');

  const fetchGallery = () => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, imageUrl }),
    });

    if (res.ok) {
      setShowModal(false);
      setTitle('');
      setImageUrl('');
      fetchGallery();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchGallery();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Camera className="w-7 h-7 text-amber-400" /> Manage Photo Gallery
          </h1>
          <p className="text-slate-400 text-sm">Add or delete photos displayed in the church photo archive.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-5 h-5" /> Add Image Link
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative group">
            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <span className="text-xs text-amber-400">{item.category}</span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">Add Photo to Gallery</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <FileUploadInput
                label="Photo / Media"
                required
                value={imageUrl}
                onChange={(val) => setImageUrl(val)}
                placeholder="Paste URL link OR choose file from device"
              />

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
