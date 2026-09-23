import React from 'react';
import Link from 'next/link';
import { Cross, MapPin, Phone, Mail, Clock, Heart, Shield, Handshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
              <Cross className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block">
                Christ Formed Church
              </span>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                International
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Serving God and His people by spreading the message of Christ, strengthening believers through fellowship and teaching, and supporting our community through the Christ Formed Foundation.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/give"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all w-fit"
            >
              <Heart className="w-4 h-4 fill-current" />
              Support Our Ministry
            </Link>
            <Link
              href="/sponsors"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all w-fit"
            >
              <Handshake className="w-4 h-4" />
              Christ Formed Foundation
            </Link>
          </div>
        </div>

        {/* Col 2: Worship Service Schedule */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            Gatherings
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <span className="font-semibold text-white block">Sunday Worship Service</span>
              <span className="text-amber-400 text-xs font-mono">09:00 AM - 12:00 PM</span>
              <span className="text-slate-500 text-xs block mt-0.5">Kibiri Sanctuary</span>
            </li>
            <li className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <span className="font-semibold text-white block">Midweek Prayer & Altar</span>
              <span className="text-amber-400 text-xs font-mono">Wednesdays at 05:00 PM</span>
            </li>
            <li className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <span className="font-semibold text-white block">Foundation Outreach</span>
              <span className="text-amber-400 text-xs font-mono">Older People & Single Mothers</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: 'Our Story & History', href: '/about' },
              { name: 'Christ Formed Foundation', href: '/sponsors' },
              { name: 'Sermon Library', href: '/sermons' },
              { name: 'Upcoming Events', href: '/events' },
              { name: 'Ministries', href: '/ministries' },
              { name: 'Announcements', href: '/announcements' },
              { name: 'Photo Gallery', href: '/gallery' },
              { name: 'Prayer Requests', href: '/prayer' },
              { name: 'Contact & Location', href: '/contact' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-500/60">›</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Location */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
            Location & Contact
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>Kibiri, near Munyonyo, Kampala, Uganda</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Contact Church Office</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <span>info@christformedchurch.org</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-900 text-xs">
            <Link
              href="/admin/login"
              className="text-slate-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Christ Formed Church International. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Kibiri, near Munyonyo, Kampala, Uganda
        </p>
      </div>
    </footer>
  );
}
