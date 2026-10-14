'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'services', 'properties', 'branches', 'careers', 'articles', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const navItems = [
    { key: 'home', href: '/', label: t.nav.home },
    { key: 'about', href: '/about', label: t.nav.about },
    { key: 'services', href: '/services', label: t.nav.services },
    { key: 'properties', href: '/properties', label: t.nav.properties },
    { key: 'branches', href: '/branches', label: t.nav.branches },
    { key: 'careers', href: '/careers', label: t.nav.careers },
    { key: 'articles', href: '/articles', label: t.nav.articles },
    { key: 'contact', href: '/contact', label: t.nav.contact },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-brand-navy/85 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-b border-brand-gold/20'
            : 'bg-transparent'
        )}
      >
        <nav className="section-container flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-gold/20 rotate-45 rounded-lg transition-transform duration-500 group-hover:rotate-[135deg]" />
              <span className="relative text-brand-gold font-display text-xl font-bold">
                V
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm tracking-wide leading-tight">
                THE VALUATION
              </span>
              <span className="text-brand-gold text-[10px] tracking-[0.3em] uppercase">
                & Consultants
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-300 group',
                  activeSection === item.key && 'text-brand-gold'
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === 'th' ? 'en' : 'th')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 text-brand-gold text-sm font-medium hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
            >
              <span className="text-xs">{locale === 'th' ? 'TH' : 'EN'}</span>
              <span className="text-[10px] opacity-60">|</span>
              <span className="text-xs opacity-60">{locale === 'th' ? 'EN' : 'TH'}</span>
            </button>

            <a
              href="tel:027170801"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-navy text-sm font-semibold rounded-full hover:bg-brand-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,169,81,0.4)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0-2717-0801-8
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white"
              aria-label="Toggle menu"
            >
              <span className={cn('w-6 h-0.5 bg-current transition-all duration-300', mobileOpen && 'rotate-45 translate-y-2')} />
              <span className={cn('w-6 h-0.5 bg-current transition-all duration-300', mobileOpen && 'opacity-0')} />
              <span className={cn('w-6 h-0.5 bg-current transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-2')} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-brand-navy/95 backdrop-blur-xl lg:hidden transition-all duration-500',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'text-2xl text-white/80 hover:text-brand-gold transition-all duration-500',
                mobileOpen && 'animate-slide-up'
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setLocale(locale === 'th' ? 'en' : 'th')}
            className="mt-4 px-6 py-3 rounded-full border border-brand-gold text-brand-gold"
          >
            {locale === 'th' ? 'English' : 'ภาษาไทย'}
          </button>
        </div>
      </div>
    </>
  );
}
