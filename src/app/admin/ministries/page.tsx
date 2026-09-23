'use client';

import React, { useState, useEffect } from 'react';
import { MinistryItem } from '@/lib/store';
import { Users, Plus, Trash2, Edit, X, Save } from 'lucide-react';

export default function AdminMinistriesPage() {
  const [ministries, setMinistries] = useState<MinistryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMin, setEditingMin] = useState<MinistryItem | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchMinistries = () => {
    fetch('/api/ministries')
      .then((res) => res.json())
      .then((data) => setMinistries(data));
  };

  useEffect(() => {
    fetchMinistries();
  }, []);

  const openCreateModal = () => {
    setEditingMin(null);
    setName('');
    setDescription('');
    setLeaderName('');
    setMeetingTime('');
    setImageUrl('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80');
    setShowModal(true);
  };

  const openEditModal = (min: MinistryItem) => {
    setEditingMin(min);
    setName(min.name);
    setDescription(min.description);
    setLeaderName(min.leaderName);
    setMeetingTime(min.meetingTime);
    setImageUrl(min.imageUrl || '');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingMin ? editingMin.id : undefined,
      name,
      description,
      leaderName,
      meetingTime,
      imageUrl,
    };

    const method = editingMin ? 'PUT' : 'POST';
    const res = await fetch('/api/ministries', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setShowModal(false);
      fetchMinistries();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ministry?')) return;
    const res = await fetch(`/api/ministries?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchMinistries();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-amber-400" /> Manage Church Ministries
          </h1>
          <p className="text-slate-400 text-sm">Add, update, or edit church departments and leadership groups.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-5 h-5" /> Add New Ministry
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Ministry Name</th>
                <th className="p-4">Leader Name</th>
                <th className="p-4">Meeting Time</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {ministries.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">{m.name}</td>
                  <td className="p-4 text-slate-300">{m.leaderName}</td>
                  <td className="p-4 text-amber-300 text-xs">{m.meetingTime}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(m)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
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
                {editingMin ? 'Edit Ministry' : 'Create New Ministry'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Ministry Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Leader Name
                  </label>
                  <input
                    type="text"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Meeting Schedule
                  </label>
                  <input
                    type="text"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  <Save className="w-4 h-4" /> Save Ministry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
