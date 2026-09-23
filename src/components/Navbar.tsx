'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cross, Menu, X, HeartHandshake, ShieldCheck, ChevronRight, Handshake } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Events', href: '/events' },
    { name: 'Sermons', href: '/sermons' },
    { name: 'Announcements', href: '/announcements' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Prayer', href: '/prayer' },
    { name: 'Contact', href: '/contact' },
  ];

  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-amber-500/20 py-3'
          : 'bg-gradient-to-b from-slate-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <Cross className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white block group-hover:text-amber-400 transition-colors">
              Christ Formed Church
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400/90 block">
              International • Kampala, Uganda
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10 font-semibold'
                    : 'text-slate-200 hover:text-amber-300 hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action CTA & Admin Links */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/give"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/2 hover:from-amber-400 hover:to-amber-500 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            Give / Tithe
          </Link>

          <Link
            href="/admin/login"
            className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
            title="Admin Portal Login"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-amber-500/20 px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'text-amber-400 bg-amber-400/10 font-bold'
                      : 'text-slate-200 hover:text-amber-300 hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/give"
              className="w-full py-3 rounded-xl font-bold bg-amber-500 text-slate-950 text-center flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <HeartHandshake className="w-5 h-5" />
              Online Giving
            </Link>

            <Link
              href="/admin/login"
              className="w-full py-2.5 rounded-xl font-medium text-slate-400 hover:text-white text-center flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
