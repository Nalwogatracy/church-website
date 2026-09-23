import React from 'react';
import Hero from '@/components/Hero';
import SermonCard from '@/components/SermonCard';
import EventCard from '@/components/EventCard';
import MinistryCard from '@/components/MinistryCard';
import Link from 'next/link';
import { readStore } from '@/lib/store';
import {
  Calendar,
  Video,
  Users,
  Bell,
  Heart,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Handshake,
  CheckCircle,
} from 'lucide-react';

export const revalidate = 0; // Dynamic server rendering

export default async function HomePage() {
  const store = readStore();
  const latestSermons = store.sermons.slice(0, 3);
  const upcomingEvents = store.events.slice(0, 3);
  const featuredMinistries = store.ministries.slice(0, 3);
  const announcements = store.announcements.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Welcome & Mission Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4" /> Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                Christ Formed Church International
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Birthed on 23rd March 2019 under the visionary leadership of Pastor Duncan Kirya, Christ Formed Church International is a welcoming Christian ministry based in Kibiri, near Munyonyo, Kampala, Uganda.
              </p>
              <div className="space-y-3 mb-8 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Spreading the gospel message of Christ through teaching and prayer</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Strengthening individuals and families in faith and fellowship</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Community care through the Christ Formed Foundation</span>
                </div>
                </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Learn Our History & Vision
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Visual Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
                alt="Worship"
                className="rounded-2xl border border-slate-800 object-cover h-56 w-full shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
                alt="Youth Group"
                className="rounded-2xl border border-slate-800 object-cover h-56 w-full shadow-lg mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sponsorship & Kingdom Partnership Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Handshake className="w-4 h-4" /> Christ Formed Foundation
            </span>
            <h2 className="text-3xl font-extrabold text-white">Supporting Older People & Single Mothers</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our community support initiative, the Christ Formed Foundation, provides practical assistance, encouragement, and care to vulnerable older people and single mothers in Uganda.
            </p>
          </div>
          <Link
            href="/sponsors"
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-base hover:from-amber-300 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/25 shrink-0 flex items-center gap-2"
          >
            Support The Foundation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5 mb-2">
              <Calendar className="w-4 h-4" /> Calendar
            </span>
            <h2 className="text-3xl font-extrabold text-white">Upcoming Events & Gatherings</h2>
          </div>
          <Link
            href="/events"
            className="text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
          >
            View Full Calendar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* 5. Latest Sermons Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5 mb-2">
              <Video className="w-4 h-4" /> Media Archive
            </span>
            <h2 className="text-3xl font-extrabold text-white">Latest Sermons & Messages</h2>
          </div>
          <Link
            href="/sermons"
            className="text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
          >
            Explore Sermon Library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestSermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      </section>

      {/* 6. Ministries Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5 mb-2">
              <Users className="w-4 h-4" /> Get Involved
            </span>
            <h2 className="text-3xl font-extrabold text-white">Our Active Ministries</h2>
          </div>
          <Link
            href="/ministries"
            className="text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
          >
            See All Ministries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredMinistries.map((min) => (
            <MinistryCard key={min.id} ministry={min} />
          ))}
        </div>
      </section>

      {/* 7. Recent Announcements Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Latest Church Announcements</h2>
              <p className="text-xs text-slate-400">Important news and community updates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-amber-400 font-semibold">{ann.category}</span>
                  <span className="text-slate-500">{ann.publishedAt}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ann.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Prayer Request Callout & Location Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prayer Callout */}
          <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5 mb-3">
                <Heart className="w-4 h-4 fill-current" /> Prayer Support
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-3">How Can We Pray For You Today?</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Our pastoral team and intercessory prayer partners lift every request to God. Submit your request publicly or confidentially.
              </p>
            </div>
            <Link
              href="/prayer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 w-fit"
            >
              Submit Prayer Request
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Location & Hours Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5 mb-3">
                <MapPin className="w-4 h-4" /> Visit Us
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-3">Service Location & Contact</h3>
              <div className="space-y-3 text-sm text-slate-300 mb-6">
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                  Kibiri, near Munyonyo, Kampala, Uganda
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  Sunday Worship: 09:00 AM - 12:00 PM
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  Contact Church Office
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors w-fit border border-slate-700"
            >
              Get Directions & Map
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
