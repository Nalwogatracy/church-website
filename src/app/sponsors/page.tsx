'use client';

import React, { useState } from 'react';
import {
  Handshake,
  CheckCircle2,
  Building,
  Utensils,
  GraduationCap,
  Radio,
  Stethoscope,
  Heart,
  Send,
  Globe,
} from 'lucide-react';

export default function SponsorsPage() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectChoice, setProjectChoice] = useState('Community Food Pantry & Hunger Relief');
  const [contributionType, setContributionType] = useState('FINANCIAL');
  const [amountEstimate, setAmountEstimate] = useState('');
  const [currency, setCurrency] = useState<'UGX' | 'USD'>('UGX');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projects = [
    {
      title: 'Christ Formed Foundation: Single Mothers & Elder Support',
      icon: Heart,
      description: 'Providing financial, social, and practical support to older people and single mothers in Kibiri, Kampala facing challenges.',
    },
    {
      title: 'Kibiri Sanctuary & Campus Building',
      icon: Building,
      description: 'Funding bricks, roofing, chairs, and sound equipment for our permanent sanctuary in Kibiri, near Munyonyo.',
    },
    {
      title: 'Community Food Packages & Hunger Relief',
      icon: Utensils,
      description: 'Distributing food items, clean water, and practical care packages to struggling families in our community.',
    },
    {
      title: 'Children Education & School Fee Sponsorship',
      icon: GraduationCap,
      description: 'Sponsoring school fees, uniforms, and textbooks for underprivileged children in our community.',
    },
    {
      title: 'Media & Gospel Outreach Equipment',
      icon: Radio,
      description: 'Purchasing audio visual equipment to broadcast the gospel message across Uganda and online.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectChoice) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          organization,
          email,
          phone,
          projectChoice,
          contributionType,
          amountEstimate: amountEstimate ? parseFloat(amountEstimate) : undefined,
          currency,
          message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <Handshake className="w-4 h-4" /> Christ Formed Foundation & Partnerships
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Partner With Christ Formed Church International
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          We welcome individuals, organizations, and partners who would like to support the Christ Formed Foundation and help us reach older people, single mothers, and community members in need.
        </p>
      </div>

      {/* Sponsorship Pillars Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Priority Sponsorship Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.title}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{proj.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setProjectChoice(proj.title)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-bold text-amber-400 transition-colors"
                >
                  Select This Project
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sponsorship Form */}
      <div id="sponsor-form" className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
        <div className="text-center space-y-2 border-b border-slate-800 pb-6">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Handshake className="w-6 h-6 text-amber-400" />
            Become a Sponsor / Partner
          </h2>
          <p className="text-xs text-slate-400">
            Fill out the form below and our sponsorship & outreach team will reach out directly.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Thank You for Becoming a Partner!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              We have received your sponsorship application for <strong className="text-amber-400">{projectChoice}</strong>. Our pastoral team will be in touch with details.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Sponsor / Partner Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Okello or Apex Foundation"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Global Hope Ltd (Optional)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256 700 000000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Selected Sponsorship Project *
              </label>
              <select
                value={projectChoice}
                onChange={(e) => setProjectChoice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p.title} value={p.title}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Type of Contribution
                </label>
                <select
                  value={contributionType}
                  onChange={(e) => setContributionType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
                >
                  <option value="FINANCIAL">Financial Sponsorship</option>
                  <option value="IN_KIND">In-Kind / Material Supply (Food, Cement, Equipment)</option>
                  <option value="CORPORATE">Corporate Social Responsibility (CSR) Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Pledge Amount & Currency
                </label>
                <div className="flex gap-2">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as 'UGX' | 'USD')}
                    className="w-28 px-3 py-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-bold text-xs"
                  >
                    <option value="UGX">UGX</option>
                    <option value="USD">USD ($)</option>
                  </select>
                  <input
                    type="number"
                    placeholder="e.g. 1000000"
                    value={amountEstimate}
                    onChange={(e) => setAmountEstimate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Additional Comments / Message
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any specific details or preferences about your partnership..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-extrabold text-base hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Submitting Application...' : 'Submit Sponsorship Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
