'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      if (res.ok) {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setStatusMsg('Thank you for contacting us! Our church office will get back to you shortly.');
      } else {
        setStatusMsg('Failed to send message. Please try again.');
      }
    } catch (err) {
      setStatusMsg('An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <Mail className="w-4 h-4" /> Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact Us & Visit Christ Formed Church
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          We invite you to worship with us, fellowship with us, and become part of what God is doing through Christ Formed Church International in Kibiri, Kampala.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

          {statusMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Robert Davis"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="robert@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 text-sm"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="First Time Visitor">First Time Visitor</option>
                  <option value="Pastoral Care / Counseling">Pastoral Care / Counseling</option>
                  <option value="Youth & Kids Ministry">Youth & Kids Ministry</option>
                  <option value="Volunteering">Volunteering</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Your Message *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can our church office assist you?"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-base hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Location Info & Map Mock */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white">Church Office & Location</h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Location</strong>
                  <span>Kibiri, near Munyonyo, Kampala, Uganda</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Service Hours</strong>
                  <span>Sunday Worship: 09:00 AM - 12:00 PM</span>
                  <span className="block text-xs text-slate-400">Midweek Prayer: Wednesday 05:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email</strong>
                  <span>info@christformedchurch.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative h-64 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 filter saturate-50"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80')`,
              }}
            />
            <div className="relative z-10 text-center space-y-2 p-6 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-amber-500/30">
              <MapPin className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
              <h4 className="text-base font-bold text-white">Christ Formed Church International</h4>
              <p className="text-xs text-slate-300">Kibiri, near Munyonyo, Kampala, Uganda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
