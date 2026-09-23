'use client';

import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Heart, Globe, DollarSign } from 'lucide-react';

export default function GivePage() {
  const [currency, setCurrency] = useState<'UGX' | 'USD'>('UGX');
  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [fund, setFund] = useState<string>('General Tithes & Offering');
  const [frequency, setFrequency] = useState<string>('ONE_TIME');
  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Conversion rate: 1 USD ≈ 3,700 UGX
  const UGX_PER_USD = 3700;

  // Presets based on selected currency
  const ugxPresets = [10000, 25000, 50000, 100000, 250000];
  const usdPresets = [10, 25, 50, 100, 250];

  const activePresets = currency === 'UGX' ? ugxPresets : usdPresets;

  const handleCurrencyChange = (newCurrency: 'UGX' | 'USD') => {
    setCurrency(newCurrency);
    setCustomAmount('');
    if (newCurrency === 'UGX') {
      setAmount(50000);
    } else {
      setAmount(50);
    }
  };

  const handleGive = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (!donorName || !email || !finalAmount) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName,
          email,
          amount: finalAmount,
          fund,
          frequency,
          currency,
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

  const displayAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  // Calculate equivalent in second currency
  const equivalentText =
    currency === 'UGX'
      ? `≈ $${(displayAmount / UGX_PER_USD).toFixed(2)} USD`
      : `≈ UGX ${(displayAmount * UGX_PER_USD).toLocaleString()} UGX`;

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
          <HeartHandshake className="w-4 h-4" /> Generosity & Stewardship
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Online Giving & Tithes
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo; — 2 Corinthians 9:7
        </p>
      </div>

      {submitted ? (
        <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-10 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Thank You for Your Generosity!</h2>
          <p className="text-slate-300 text-base max-w-lg mx-auto">
            Your gift of{' '}
            <strong className="text-amber-400 font-mono">
              {currency === 'UGX' ? `UGX ${displayAmount.toLocaleString()}` : `$${displayAmount} USD`}
            </strong>{' '}
            <span className="text-xs text-slate-400">({equivalentText})</span> towards{' '}
            <strong className="text-white">{fund}</strong> helps fund gospel preaching, community outreach, and church family support.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
          >
            Give Another Gift
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleGive}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl"
        >
          {/* Currency Selection Switcher */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-sm font-bold text-white block">Giving Currency</span>
                <span className="text-xs text-slate-400">
                  Select UGX for local giving or USD for international members
                </span>
              </div>
            </div>

            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => handleCurrencyChange('UGX')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  currency === 'UGX'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                UGX (Uganda)
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyChange('USD')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($ International)
              </button>
            </div>
          </div>

          {/* Fund Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider">
              1. Select Giving Fund
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'General Tithes & Offering',
                'Building & Expansion Fund',
                'Missions & Food Pantry Outreach',
                'Youth & Children Ministry',
              ].map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => setFund(f)}
                  className={`p-4 rounded-2xl text-sm font-semibold text-left border transition-all ${
                    fund === f
                      ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Amounts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider">
                2. Select Gift Amount ({currency})
              </label>
              <span className="text-xs font-semibold text-amber-300/80 font-mono">
                {equivalentText}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {activePresets.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3.5 px-2 rounded-xl font-bold font-mono text-sm border transition-all text-center ${
                    amount === amt && !customAmount
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 border-slate-800 text-white hover:border-slate-700'
                  }`}
                >
                  {currency === 'UGX' ? `UGX ${amt.toLocaleString()}` : `$${amt} USD`}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="number"
                placeholder={
                  currency === 'UGX'
                    ? 'Or enter custom amount in UGX (e.g. 150000)'
                    : 'Or enter custom amount in USD ($)'
                }
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm font-mono"
              />
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider">
              3. Donor Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
              />
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-extrabold text-base hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25"
          >
            <Heart className="w-5 h-5 fill-current" />
            {isSubmitting
              ? 'Processing Gift...'
              : `Complete Gift of ${
                  currency === 'UGX'
                    ? `UGX ${displayAmount.toLocaleString()}`
                    : `$${displayAmount} USD`
                }`}
          </button>
        </form>
      )}
    </div>
  );
}
