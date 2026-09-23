'use client';

import React, { useState, useEffect } from 'react';
import { AnnouncementItem } from '@/lib/store';
import { Bell, Plus, Trash2, Edit, X, Save } from 'lucide-react';

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAnn, setEditingAnn] = useState<AnnouncementItem | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Church News');
  const [publishedAt, setPublishedAt] = useState('');
  const [important, setImportant] = useState(false);

  const fetchAnnouncements = () => {
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const openCreateModal = () => {
    setEditingAnn(null);
    setTitle('');
    setContent('');
    setCategory('Church News');
    setPublishedAt(new Date().toISOString().split('T')[0]);
    setImportant(false);
    setShowModal(true);
  };

  const openEditModal = (ann: AnnouncementItem) => {
    setEditingAnn(ann);
    setTitle(ann.title);
    setContent(ann.content);
    setCategory(ann.category);
    setPublishedAt(ann.publishedAt);
    setImportant(Boolean(ann.important));
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingAnn ? editingAnn.id : undefined,
      title,
      content,
      category,
      publishedAt,
      important,
    };

    const method = editingAnn ? 'PUT' : 'POST';
    const res = await fetch('/api/announcements', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setShowModal(false);
      fetchAnnouncements();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    const res = await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchAnnouncements();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-7 h-7 text-amber-400" /> Manage Announcements
          </h1>
          <p className="text-slate-400 text-sm">Post, update, or remove church news and bulletins.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-5 h-5" /> Post Announcement
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Published Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {announcements.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">{a.title}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
                      {a.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-amber-300">{a.publishedAt}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(a)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingAnn ? 'Edit Announcement' : 'Post New Announcement'}
              </h3>
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

              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Announcement Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
