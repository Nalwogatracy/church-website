'use client';

import React, { useState, useEffect } from 'react';
import { PastorItem } from '@/lib/store';
import FileUploadInput from '@/components/FileUploadInput';
import { UserCheck, Plus, Trash2, Edit, X, Save } from 'lucide-react';

export default function AdminPastorsPage() {
  const [pastors, setPastors] = useState<PastorItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPastor, setEditingPastor] = useState<PastorItem | null>(null);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');

  const fetchPastors = () => {
    fetch('/api/pastors')
      .then((res) => res.json())
      .then((data) => setPastors(data));
  };

  useEffect(() => {
    fetchPastors();
  }, []);

  const openCreateModal = () => {
    setEditingPastor(null);
    setName('');
    setTitle('Associate Pastor');
    setBio('');
    setImageUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80');
    setEmail('');
    setShowModal(true);
  };

  const openEditModal = (p: PastorItem) => {
    setEditingPastor(p);
    setName(p.name);
    setTitle(p.title);
    setBio(p.bio);
    setImageUrl(p.imageUrl || '');
    setEmail(p.email || '');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingPastor ? editingPastor.id : undefined,
      name,
      title,
      bio,
      imageUrl,
      email,
    };

    const method = editingPastor ? 'PUT' : 'POST';
    const res = await fetch('/api/pastors', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setShowModal(false);
      fetchPastors();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pastor profile?')) return;
    const res = await fetch(`/api/pastors?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchPastors();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-amber-400" /> Manage Pastoral Leadership
          </h1>
          <p className="text-slate-400 text-sm">Add or edit pastor biographies and leadership profiles.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-5 h-5" /> Add New Leader
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Title / Role</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {pastors.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">{p.name}</td>
                  <td className="p-4 text-amber-400 text-xs font-semibold">{p.title}</td>
                  <td className="p-4 text-slate-400">{p.email || 'N/A'}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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
                {editingPastor ? 'Edit Pastor Profile' : 'Add New Leader'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Title / Position
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>

                <FileUploadInput
                  label="Profile Photo (Paste Link OR Upload File from Device)"
                  value={imageUrl}
                  onChange={(val) => setImageUrl(val)}
                  placeholder="Paste image link OR choose photo from PC"
                  accept="image/*"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Biography / Ministry Heart
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
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
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
