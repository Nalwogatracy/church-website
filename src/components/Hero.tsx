'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Video, Heart, ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
      nextSunday.setHours(9, 0, 0, 0);

      if (nextSunday.getTime() <= now.getTime()) {
        nextSunday.setDate(nextSunday.getDate() + 7);
      }

      const diff = nextSunday.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950">
      {/* Background Hero Image Overlay with Gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          Welcome to Christ Formed Church International
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Forming <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Lives in Christ</span>, Serving <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-200">His People</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
          Founded on 23rd March 2019 by Pastor Duncan Kirya. A welcoming home to seek God, receive spiritual encouragement, and experience healing and restoration.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/events"
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:from-amber-300 hover:to-amber-500 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Worship With Us
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/about"
            className="px-7 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 shadow-lg transition-all flex items-center gap-2"
          >
            Our Story & Leadership
          </Link>

          <Link
            href="/sponsors"
            className="px-6 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-base border border-amber-500/30 transition-all flex items-center gap-2"
          >
            <Heart className="w-5 h-5 text-amber-400" />
            Christ Formed Foundation
          </Link>
        </div>

        {/* Live Countdown & Next Service Highlight */}
        <div className="max-w-3xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Next Worship Service
              </span>
              <h3 className="text-xl font-bold text-white">Sunday Celebration Service</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Kibiri, near Munyonyo, Kampala, Uganda
              </p>
            </div>

            {/* Countdown Grid */}
            <div className="flex items-center gap-3">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HRS', val: timeLeft.hours },
                { label: 'MINS', val: timeLeft.minutes },
                { label: 'SECS', val: timeLeft.seconds },
              ].map((unit, i) => (
                <div
                  key={i}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center"
                >
                  <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                    {String(unit.val).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] tracking-wider text-slate-400 font-semibold">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
