import React from 'react';
import { readStore } from '@/lib/store';
import Link from 'next/link';
import {
  Calendar,
  Video,
  Bell,
  Heart,
  Mail,
  Users,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const revalidate = 0;

export default function AdminDashboardPage() {
  const store = readStore();

  const totalEvents = store.events.length;
  const totalSermons = store.sermons.length;
  const totalAnnouncements = store.announcements.length;
  const pendingPrayers = store.prayers.filter((p) => p.status === 'PENDING').length;
  const unreadMessages = store.messages.filter((m) => m.status === 'UNREAD').length;

  const stats = [
    { name: 'Upcoming Events', count: totalEvents, href: '/admin/events', icon: Calendar, color: 'text-amber-400' },
    { name: 'Sermon Archive', count: totalSermons, href: '/admin/sermons', icon: Video, color: 'text-amber-400' },
    { name: 'Announcements', count: totalAnnouncements, href: '/admin/announcements', icon: Bell, color: 'text-amber-400' },
    { name: 'Pending Prayers', count: pendingPrayers, href: '/admin/prayers', icon: Heart, color: 'text-rose-400' },
    { name: 'Unread Messages', count: unreadMessages, href: '/admin/messages', icon: Mail, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" /> Admin Command Center
          </span>
          <h1 className="text-3xl font-extrabold text-white">Welcome back, Pastor / Admin!</h1>
          <p className="text-slate-300 text-sm mt-1">
            Manage church announcements, upload sermons, configure calendar events, and view prayer requests.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 shrink-0"
        >
          Preview Live Website
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-2xl font-black text-white font-mono">{stat.count}</span>
              </div>
              <span className="text-xs font-semibold text-slate-400">{stat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Quick Content Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/events"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-white">Create New Event</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/sermons"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-white">Upload New Sermon</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/announcements"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-white">Post Announcement</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Recent Prayer Requests & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Prayers Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" /> Recent Prayer Requests
            </h3>
            <Link href="/admin/prayers" className="text-xs font-semibold text-amber-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {store.prayers.slice(0, 3).map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{p.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{p.request}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> Recent Contact Messages
            </h3>
            <Link href="/admin/messages" className="text-xs font-semibold text-amber-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {store.messages.slice(0, 3).map((m) => (
              <div key={m.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{m.name}</span>
                  <span className="text-xs text-slate-500">{m.subject}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
