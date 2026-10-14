'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function PageShell({ children, title, subtitle }: PageShellProps) {
  return (
    <main id="main" className="relative min-h-screen bg-brand-navy text-white">
      <Navbar />

      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-brand-navy to-brand-gold/5" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 animate-grid"
            style={{
              backgroundImage: `linear-gradient(rgba(200,169,81,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="section-container relative">
          <nav className="text-sm text-white/50 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              หน้าแรก
            </Link>
            <span>/</span>
            <span className="text-brand-gold">{title}</span>
          </nav>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && <p className="text-xl text-white/60 max-w-2xl">{subtitle}</p>}

          <div className="mt-8 flex items-center gap-4">
            <span className="w-16 h-1 bg-brand-gold" />
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            <span className="w-8 h-1 bg-brand-gold/40" />
          </div>
        </div>
      </div>

      {children}

      <Footer />
    </main>
  );
}