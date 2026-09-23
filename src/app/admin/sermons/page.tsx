'use client';

import React, { useState, useEffect } from 'react';
import { SermonItem, PastorItem } from '@/lib/store';
import FileUploadInput from '@/components/FileUploadInput';
import { Video, Plus, Trash2, Edit, X, Save, User } from 'lucide-react';

export default function AdminSermonsPage() {
  const [sermons, setSermons] = useState<SermonItem[]>([]);
  const [pastors, setPastors] = useState<string[]>([
    'Pastor Duncan Kirya',
    'Pastor Valence',
    'Miss Flavia',
    'Mrs. Christine Kirya',
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingSermon, setEditingSermon] = useState<SermonItem | null>(null);

  const [title, setTitle] = useState('');
  const [speakerSelect, setSpeakerSelect] = useState('Pastor Duncan Kirya');
  const [customSpeaker, setCustomSpeaker] = useState('');
  const [series, setSeries] = useState('Christ Formed Worship');
  const [scripture, setScripture] = useState('');
  const [sermonDate, setSermonDate] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchSermons = () => {
    fetch('/api/sermons')
      .then((res) => res.json())
      .then((data) => setSermons(data));
  };

  const fetchPastors = () => {
    fetch('/api/pastors')
      .then((res) => res.json())
      .then((data: PastorItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const names = data.map((p) => p.name);
          // Merge unique names with default list
          setPastors(Array.from(new Set([...names, 'Pastor Duncan Kirya', 'Pastor Valence', 'Miss Flavia', 'Mrs. Christine Kirya'])));
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSermons();
    fetchPastors();
  }, []);

  const openCreateModal = () => {
    setEditingSermon(null);
    setTitle('');
    setSpeakerSelect('Pastor Duncan Kirya');
    setCustomSpeaker('');
    setSeries('Christ Formed Worship');
    setScripture('Galatians 4:19');
    setSermonDate(new Date().toISOString().split('T')[0]);
    setVideoUrl('');
    setDescription('');
    setImageUrl('');
    setShowModal(true);
  };

  const openEditModal = (sermon: SermonItem) => {
    setEditingSermon(sermon);
    setTitle(sermon.title);

    if (pastors.includes(sermon.speaker)) {
      setSpeakerSelect(sermon.speaker);
      setCustomSpeaker('');
    } else {
      setSpeakerSelect('OTHER');
      setCustomSpeaker(sermon.speaker);
    }

    setSeries(sermon.series || '');
    setScripture(sermon.scripture || '');
    setSermonDate(sermon.sermonDate);
    setVideoUrl(sermon.videoUrl || '');
    setDescription(sermon.description);
    setImageUrl(sermon.imageUrl || '');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalSpeaker = speakerSelect === 'OTHER' ? customSpeaker.trim() : speakerSelect;
    if (!finalSpeaker) {
      alert('Please select or enter a speaker name.');
      return;
    }

    const payload = {
      id: editingSermon ? editingSermon.id : undefined,
      title,
      speaker: finalSpeaker,
      series,
      scripture,
      sermonDate,
      videoUrl,
      description,
      imageUrl,
    };

    const method = editingSermon ? 'PUT' : 'POST';
    const res = await fetch('/api/sermons', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setShowModal(false);
      fetchSermons();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return;
    const res = await fetch(`/api/sermons?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchSermons();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Video className="w-7 h-7 text-amber-400" /> Upload & Manage Sermons
          </h1>
          <p className="text-slate-400 text-sm">Add or edit video sermon records and series metadata.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-5 h-5" /> Add New Sermon
        </button>
      </div>

      {/* Sermons Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Sermon</th>
                <th className="p-4">Speaker</th>
                <th className="p-4">Series</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sermons.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={s.imageUrl || 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80'}
                      alt={s.title}
                      className="w-12 h-12 object-cover rounded-xl border border-slate-700 shrink-0"
                    />
                    <div>
                      <span className="font-bold text-white block">{s.title}</span>
                      <span className="text-xs text-slate-400 font-mono">{s.scripture || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-200">{s.speaker}</td>
                  <td className="p-4 text-slate-400">{s.series || 'Single Message'}</td>
                  <td className="p-4 text-slate-400 font-mono">{s.sermonDate}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(s)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete"
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

      {/* Modal - Fully Scrollable */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <div className="my-auto bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-slate-900 z-10 pt-1">
              <h3 className="text-xl font-bold text-white">
                {editingSermon ? 'Edit Sermon' : 'Upload New Sermon'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Sermon Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Formed in Christ: Walking in Vision & Faith"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              {/* Speaker Select Dropdown & Custom Speaker Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Select Speaker / Pastor *
                  </label>
                  <div className="relative">
                    <select
                      value={speakerSelect}
                      onChange={(e) => setSpeakerSelect(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    >
                      {pastors.map((pName) => (
                        <option key={pName} value={pName}>
                          {pName}
                        </option>
                      ))}
                      <option value="OTHER">✍️ Other / Enter New Speaker Name...</option>
                    </select>
                  </div>
                </div>

                {speakerSelect === 'OTHER' ? (
                  <div>
                    <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                      Enter Custom Speaker Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customSpeaker}
                      onChange={(e) => setCustomSpeaker(e.target.value)}
                      placeholder="e.g. Guest Evangelist John"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/50 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Series Name
                    </label>
                    <input
                      type="text"
                      value={series}
                      onChange={(e) => setSeries(e.target.value)}
                      placeholder="e.g. Transformed into His Image"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                    />
                  </div>
                )}
              </div>

              {speakerSelect === 'OTHER' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Series Name
                  </label>
                  <input
                    type="text"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    placeholder="e.g. Faith & Foundations"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Scripture Passage
                  </label>
                  <input
                    type="text"
                    value={scripture}
                    onChange={(e) => setScripture(e.target.value)}
                    placeholder="e.g. Galatians 4:19"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Date Preached
                  </label>
                  <input
                    type="date"
                    value={sermonDate}
                    onChange={(e) => setSermonDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono"
                  />
                </div>
              </div>

              <FileUploadInput
                label="Sermon Video (Paste Link OR Upload MP4 from Device)"
                value={videoUrl}
                onChange={(val) => setVideoUrl(val)}
                placeholder="YouTube embed URL (https://www.youtube.com/embed/...) OR upload video from PC"
                accept="video/*"
              />

              <FileUploadInput
                label="Thumbnail Cover Image (Paste Link OR Upload Image from Device)"
                value={imageUrl}
                onChange={(val) => setImageUrl(val)}
                placeholder="Paste image link OR choose photo from PC"
                accept="image/*"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Description / Sermon Notes
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary or key takeaway of this sermon message..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 sticky bottom-0 bg-slate-900 py-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" /> Save Sermon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
