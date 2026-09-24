import type { Metadata } from 'next';
import React from 'react';
import PastorCard from '@/components/PastorCard';
import { readStore } from '@/lib/store';
import { ShieldCheck, Heart, Compass, HeartHandshake, MapPin, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our History & Leadership | Pastor Duncan Kirya',
  description: 'Learn about the history of Christ Formed Church International, founded on 23rd March 2019 by Pastor Duncan Kirya in Kibiri, Munyonyo, Kampala. Discover our vision, leadership team, and Christ Formed Foundation.',
};

export const revalidate = 0;

export default function AboutPage() {
  const store = readStore();

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> About Christ Formed Church International
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Formed in Christ, Serving His People
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Based in Kibiri, near Munyonyo, Kampala, Uganda — a community of believers dedicated to faith, prayer, worship, teaching, and practical outreach.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-slate-300 leading-relaxed">
            To create a welcoming environment where individuals and families can grow in faith, find hope, and experience the transforming love of Christ.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed">
            To serve God and His people by spreading the message of Christ, strengthening believers through fellowship and teaching, and providing spiritual and practical support to people in need.
          </p>
        </div>
      </div>

      {/* Our Story / History Timeline */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Our Journey
          </span>
          <h2 className="text-3xl font-extrabold text-white">Our Story & Testimony</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider block">
              23rd March 2019 • The Altar Birthed
            </span>
            <h3 className="text-lg font-bold text-white">A Divine Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The ministry began as an altar after founder Pastor Duncan Kirya received instructions through a vision to begin reaching and serving God&apos;s people. What started from a single room gradually grew into a community of believers.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider block">
              3-Year School Hall Era
            </span>
            <h3 className="text-lg font-bold text-white">Faithful Growth</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              For approximately three years, the church held services in a school hall, trusting God and continuing to minister to people through prayer, worship, teaching, and warm fellowship.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider block">
              Present Day • Kibiri, Munyonyo
            </span>
            <h3 className="text-lg font-bold text-white">A Permanent Sanctuary</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              God opened the way to establish a dedicated sanctuary in Kibiri, near Munyonyo, Kampala. Here, regular services are held and people come to seek God, receive encouragement, and experience healing.
            </p>
          </div>
        </div>
      </div>

      {/* Christ Formed Foundation Section */}
      <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4" /> Community Care Initiative
            </span>
            <h2 className="text-3xl font-extrabold text-white">Christ Formed Foundation</h2>
            <p className="text-slate-300 leading-relaxed text-base">
              Beyond our church ministry, we also have a community-support initiative known as the <strong className="text-white">Christ Formed Foundation</strong>.
            </p>
            <p className="text-slate-300 leading-relaxed text-sm">
              The foundation seeks to support <strong className="text-amber-400">older people and single mothers</strong> who may be facing financial, social, or practical challenges. Through the foundation, we provide practical assistance, encouragement, and care to vulnerable members of our community.
            </p>
            <div className="pt-2">
              <a
                href="/sponsors"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Partner With The Foundation
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">We Welcome Partners</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We welcome individuals, organizations, and partners who would like to support this work and help us reach more older people and single mothers in need.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="space-y-10 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
            Shepherds & Administrators
          </span>
          <h2 className="text-3xl font-extrabold text-white">Our Leadership Team</h2>
          <p className="text-slate-400 text-sm">
            Meet the leaders guiding Christ Formed Church International with prayer, dedication, and service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {store.pastors.map((pastor) => (
            <PastorCard key={pastor.id} pastor={pastor} />
          ))}
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Location
          </span>
          <h3 className="text-2xl font-bold text-white">Christ Formed Church International</h3>
          <p className="text-slate-300 text-sm">
            Kibiri, near Munyonyo, Kampala, Uganda
          </p>
        </div>
        <a
          href="/contact"
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors shrink-0"
        >
          View Map & Details
        </a>
      </div>
    </div>
  );
}
