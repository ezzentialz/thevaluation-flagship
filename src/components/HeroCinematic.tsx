'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '@/context/I18nContext';

const AccentDust = dynamic(() => import('@/components/three/AccentDust').then((m) => m.AccentDust), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-2">
      <motion.span
        className="block"
        initial={{ y: '110%', rotateX: -35 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay }}
        style={{ transformOrigin: '50% 100%' }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroCinematic() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Once the hero is scrolled away, stop decoding video and rendering WebGL.
  // Starts as "in view" so the clip plays immediately; only flips once the observer reports otherwise.
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '100px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  // The hero is 220vh tall; the stage inside is sticky, so scroll "plays" the shot.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.45]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-22%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0.35, 1], [0, 0.75]);
  const fadeToNext = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const nameLines =
    locale === 'th'
      ? ['เดอะแวลูเอชั่น', 'แอนด์ คอนซัลแทนท์ส']
      : ['The Valuation', '& Consultants'];

  return (
    <section ref={ref} id="hero" className="relative h-[220svh] bg-brand-dark">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Shot */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale, y: videoY }}>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/videos/hero-bangkok.mp4"
            poster="/images/hero-slide.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </motion.div>

        {/* Colour grade: warm highlights, navy shadows, letterbox vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-navy/25 to-brand-dark/70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 70% 40%, transparent 35%, rgba(6,11,43,0.7) 100%)' }}
        />
        <motion.div className="pointer-events-none absolute inset-0 bg-brand-dark" style={{ opacity: dim }} />

        {/* 3D accent dust over the footage */}
        <div className="pointer-events-none absolute inset-0">
          <AccentDust active={inView} />
        </div>

        {/* Cinematic letterbox bars */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-black"
          initial={{ height: '14vh' }}
          animate={{ height: '0vh' }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-black"
          initial={{ height: '14vh' }}
          animate={{ height: '0vh' }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        />

        {/* Copy */}
        <motion.div
          className="section-container relative z-10 flex h-full items-center"
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
        >
          <div className="max-w-5xl [perspective:1000px]">
            <motion.div
              className="mb-8 flex items-center gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.9 }}
            >
              <span className="h-px w-14 bg-brand-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
                {locale === 'th' ? 'ก่อตั้ง พ.ศ. 2535' : 'Since 1992'}
              </span>
            </motion.div>

            <h1
              className={
                locale === 'th'
                  ? 'font-display text-[1.85rem] font-semibold leading-[1.2] text-white min-[400px]:text-4xl sm:text-6xl lg:text-7xl'
                  : 'font-display text-5xl font-semibold leading-[1.05] text-white sm:text-7xl lg:text-8xl'
              }
            >
              <RevealLine delay={0.7}>{nameLines[0]}</RevealLine>
              <RevealLine delay={0.85}>
                <span className="text-gradient-accent">{nameLines[1]}</span>
              </RevealLine>
            </h1>

            <motion.p
              className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.5 }}
            >
              <a href="#services" className="btn-primary">
                {t.hero.cta}
              </a>
              <a href="#contact" className="btn-secondary">
                {t.nav.contact}
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">{t.hero.scrollDown}</span>
          <span className="relative h-12 w-px overflow-hidden bg-white/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-5 bg-brand-accent"
              animate={{ y: ['-100%', '260%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>

        {/* Hand-off into the next section */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-brand-navy to-transparent"
          style={{ opacity: fadeToNext }}
        />
      </div>
    </section>
  );
}
