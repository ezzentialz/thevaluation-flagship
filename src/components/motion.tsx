'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import {
  animate,
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Honours the OS "reduce motion" setting for every framer-motion animation. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Inertial page scroll: this is what removes the "stiff" feel of native wheel scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: { offset: -112 } });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: 'div' | 'li' | 'span' | 'p' | 'h2' | 'h3';
};

/** Fade + rise + de-blur as the element enters the viewport. */
export function Reveal({ children, delay = 0, y = 40, x = 0, className, as = 'div' }: RevealProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Headline whose lines slide up out of a mask, like a film title. */
export function MaskedTitle({
  lines,
  className,
  center,
}: {
  lines: React.ReactNode[];
  className?: string;
  center?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <h2 ref={ref} className={cn('section-title text-white [perspective:900px]', center && 'text-center', className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-2">
          <motion.span
            className="block"
            initial={{ y: '110%', rotateX: -30 }}
            animate={inView ? { y: 0, rotateX: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: i * 0.12 }}
            style={{ transformOrigin: '50% 100%' }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/** Small accent chapter marker: "01 — About". */
export function Chapter({ no, label, center }: { no: string; label: string; center?: boolean }) {
  return (
    <Reveal y={16} className={cn('mb-6 flex items-center gap-4', center && 'justify-center')}>
      <span className="font-display text-brand-accent text-sm tracking-[0.3em]">{no}</span>
      <span className="h-px w-12 bg-brand-accent/60" />
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent">{label}</span>
    </Reveal>
  );
}

/** Card that tilts toward the cursor with a moving highlight. */
export function TiltCard({
  children,
  className,
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.6 });
  const sy = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.6 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useTransform([gx, gy], ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(157,170,248,0.18), transparent 60%)`);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="[perspective:1100px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d' }}
        className={cn('relative h-full', className)}
      >
        <motion.div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]" style={{ background: glow }} />
        {children}
      </motion.div>
    </div>
  );
}

/** Counts up to a number when it scrolls into view. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

/** Image that drifts slower than the page and scales gently: depth without WebGL cost. */
export function ParallaxImage({
  src,
  alt,
  className,
  strength = 14,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.12, 1.25]);
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" style={{ y, scale, willChange: 'transform' }} />
    </div>
  );
}

/** Thin accent progress line fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-accent-dark via-brand-accent to-brand-accent-light"
      style={{ scaleX }}
    />
  );
}
