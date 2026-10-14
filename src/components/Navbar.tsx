'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';

/**
 * Two-tier header (modelled on the company's current site):
 *  - slim royal-blue bar: company name, phone, e-mail, language switch
 *  - white bar: real logo, single-line navigation with an active-section marker, "Contact us" button
 * The inline nav only appears from xl (1280px) so labels never wrap; below that a hamburger opens a panel.
 */

const LOGO = '/images/real/logo-web-372x90.png';
const PHONE = '0-2717-0801-8';
const PHONE_HREF = 'tel:027170801';
const EMAIL = 'info@thevaluation.com';

const SECTIONS = [
  { id: 'about', th: 'เกี่ยวกับเรา', en: 'About us' },
  { id: 'services', th: 'บริการ', en: 'Services' },
  { id: 'properties', th: 'ซื้อ ขาย เช่า', en: 'Buy / Sell / Rent' },
  { id: 'branches', th: 'สาขา', en: 'Branches' },
  { id: 'careers', th: 'ร่วมงานกับเรา', en: 'Careers' },
  { id: 'articles', th: 'บทความวิจัย', en: 'Research' },
] as const;

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LangSwitch({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  return (
    <div className={cn('flex items-center text-xs font-semibold', className)} role="group" aria-label="Language">
      {(['th', 'en'] as const).map((l, i) => (
        <React.Fragment key={l}>
          {i > 0 && <span aria-hidden="true" className="mx-1 opacity-40">|</span>}
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={cn(
              'rounded px-1.5 py-1 uppercase tracking-wide transition-colors',
              locale === l ? 'text-white' : 'text-white/55 hover:text-white'
            )}
          >
            {l}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

export function Navbar() {
  const { locale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const th = locale === 'th';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = [...SECTIONS.map((s) => s.id), 'contact'];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const contactLabel = t.nav.contact;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Tier 1: contact strip */}
      <div className="bg-brand-royal-dark text-[13px] text-white">
        <div className="section-container flex h-9 items-center justify-between gap-4">
          <p className="hidden truncate text-white/85 md:block">{th ? 'บริษัท เดอะแวลูเอชั่น แอนด์ คอนซัลแทนท์ส จำกัด' : 'The Valuation & Consultants Co., Ltd.'}</p>
          <div className="flex items-center gap-5">
            <a href={PHONE_HREF} className="flex items-center gap-1.5 font-semibold hover:text-brand-accent-light">
              <PhoneIcon className="h-3.5 w-3.5" />
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="hidden items-center gap-1.5 hover:text-brand-accent-light sm:flex">
              <MailIcon className="h-3.5 w-3.5" />
              {EMAIL}
            </a>
          </div>
          <LangSwitch />
        </div>
      </div>

      {/* Tier 2: logo + navigation */}
      <div className={cn('bg-white transition-shadow duration-300', scrolled ? 'shadow-[0_6px_24px_rgba(10,20,66,0.18)]' : 'shadow-[0_1px_0_rgba(10,20,66,0.08)]')}>
        <nav className="section-container flex h-[68px] items-center justify-between gap-6" aria-label="Main">
          <Link href="/" className="flex-shrink-0" aria-label="The Valuation & Consultants — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="The Valuation & Consultants" width={186} height={45} className="h-[44px] w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {SECTIONS.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`/#${s.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={cn(
                      'relative block whitespace-nowrap px-3.5 py-6 text-[15px] font-medium transition-colors duration-200',
                      on ? 'text-brand-royal-dark' : 'text-slate-700 hover:text-brand-royal'
                    )}
                  >
                    {th ? s.th : s.en}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3.5 bottom-0 h-[3px] origin-left bg-brand-royal transition-transform duration-300',
                        on ? 'scale-x-100' : 'scale-x-0'
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="hidden whitespace-nowrap rounded bg-brand-royal px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-royal-dark sm:inline-block"
            >
              {contactLabel}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? (th ? 'ปิดเมนู' : 'Close menu') : th ? 'เปิดเมนู' : 'Open menu'}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded text-brand-royal-dark xl:hidden"
            >
              <span className={cn('h-0.5 w-6 bg-current transition-transform duration-200', open && 'translate-y-[7px] rotate-45')} />
              <span className={cn('h-0.5 w-6 bg-current transition-opacity duration-200', open && 'opacity-0')} />
              <span className={cn('h-0.5 w-6 bg-current transition-transform duration-200', open && '-translate-y-[7px] -rotate-45')} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile / tablet panel */}
      <div
        id="mobile-menu"
        className={cn(
          'xl:hidden overflow-hidden bg-white shadow-[0_20px_40px_rgba(10,20,66,0.25)] transition-[max-height,opacity] duration-300 ease-out',
          open ? 'max-h-[calc(100svh-104px)] overflow-y-auto opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        )}
      >
        <ul className="section-container py-2">
          {SECTIONS.map((s) => (
            <li key={s.id} className="border-b border-slate-100">
              <a
                href={`/#${s.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === s.id ? 'true' : undefined}
                className={cn(
                  'flex min-h-[52px] items-center justify-between text-[17px] font-medium',
                  active === s.id ? 'text-brand-royal-dark' : 'text-slate-800'
                )}
              >
                {th ? s.th : s.en}
                <span aria-hidden="true" className="text-brand-royal">›</span>
              </a>
            </li>
          ))}
          <li className="py-4">
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] items-center justify-center rounded bg-brand-royal text-base font-semibold text-white"
            >
              {contactLabel}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
