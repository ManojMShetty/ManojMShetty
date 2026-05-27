'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import {useEffect, useRef, useState, type ReactNode} from 'react';

// =========================================================================
// Reveal — fade + slide up when scrolled into view (the workhorse)
// =========================================================================
// Premium Apple-style easing — used everywhere
const APPLE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const APPLE_IO: [number, number, number, number] = [0.32, 0.72, 0, 1];

export function Reveal({
  children,
  delay = 0,
  className,
  as: As = motion.div,
  y = 40,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: typeof motion.div;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, margin: '-100px'});
  const reduce = useReducedMotion();

  return (
    <As
      ref={ref}
      className={className}
      initial={reduce ? false : {opacity: 0, y, filter: 'blur(8px)'}}
      animate={inView ? {opacity: 1, y: 0, filter: 'blur(0px)'} : undefined}
      transition={{duration: 1.0, delay, ease: APPLE_OUT}}
    >
      {children}
    </As>
  );
}

// =========================================================================
// Stagger — reveal children one after another
// =========================================================================
export function Stagger({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, margin: '-80px'});

  const container: Variants = {
    hidden: {},
    show: {
      transition: {staggerChildren: staggerDelay, delayChildren: 0.1},
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

export const StaggerChild: Variants = {
  hidden: {opacity: 0, y: 32, filter: 'blur(6px)'},
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {duration: 0.9, ease: [0.22, 1, 0.36, 1]},
  },
};

// =========================================================================
// CursorGlow — large blurred gradient orb that follows the mouse
// =========================================================================
export function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, {stiffness: 200, damping: 30, mass: 0.5});
  const sy = useSpring(y, {stiffness: 200, damping: 30, mass: 0.5});

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const leave = () => {
      x.set(-1000);
      y.set(-1000);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="fixed pointer-events-none z-[2] mix-blend-screen"
      style={{
        top: 0,
        left: 0,
        x: useTransform(sx, (v) => v - 300),
        y: useTransform(sy, (v) => v - 300),
        width: 600,
        height: 600,
        background:
          'radial-gradient(circle, rgba(125,211,252,0.14) 0%, rgba(125,211,252,0.04) 35%, transparent 65%)',
        filter: 'blur(60px)',
      }}
    />
  );
}

// =========================================================================
// ScrollProgress — slim bar at top showing scroll position
// =========================================================================
export function ScrollProgress() {
  const {scrollYProgress} = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 h-[1.5px] z-[60] origin-left"
      style={{
        width,
        background:
          'linear-gradient(90deg, rgba(125,211,252,0.8), rgba(245,245,247,0.5), rgba(251,191,36,0.6))',
      }}
    />
  );
}

// =========================================================================
// NumberCounter — counts up from 0 to target when in view
// =========================================================================
export function NumberCounter({
  to,
  duration = 1.6,
  suffix = '',
  prefix = '',
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, margin: '-50px'});
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      // quartic ease-out — slower start, smooth landing
      const eased = 1 - Math.pow(1 - t, 4);
      setN(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

// =========================================================================
// MagneticButton — subtly tilts toward cursor
// =========================================================================
export function MagneticButton({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, {stiffness: 200, damping: 18});
  const sy = useSpring(y, {stiffness: 200, damping: 18});
  const reduce = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{x: sx, y: sy}}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {Inner}
      </a>
    );
  }
  return Inner;
}

// =========================================================================
// Marquee — infinite horizontal scroll of children
// =========================================================================
export function Marquee({children, className}: {children: ReactNode; className?: string}) {
  return (
    <div className={`overflow-hidden mask-fade-x ${className ?? ''}`}>
      <div className="flex w-max animate-marquee gap-6 will-change-transform">
        <div className="flex gap-6 shrink-0">{children}</div>
        <div className="flex gap-6 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TextReveal — split into words/chars and reveal with stagger
// =========================================================================
export function WordReveal({
  text,
  className,
  delay = 0,
  per = 'word',
}: {
  text: string;
  className?: string;
  delay?: number;
  per?: 'word' | 'char';
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, margin: '-50px'});
  const units = per === 'char' ? Array.from(text) : text.split(' ');

  return (
    <span ref={ref} className={className} aria-label={text}>
      {units.map((u, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{opacity: 0, y: '0.4em'}}
          animate={inView ? {opacity: 1, y: 0} : undefined}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * (per === 'char' ? 0.025 : 0.06),
          }}
          aria-hidden
        >
          {u}
          {per === 'word' && i < units.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}

// =========================================================================
// ArcGlow — animated arc-reactor backdrop SVG for hero
// =========================================================================
export function ArcGlow({className, size = 800}: {className?: string; size?: number}) {
  return (
    <div className={`pointer-events-none absolute ${className ?? ''}`} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 200 200">
        <defs>
          <radialGradient id="arc-core">
            <stop offset="0%" stopColor="rgba(0,212,255,0.4)" />
            <stop offset="50%" stopColor="rgba(0,212,255,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill="url(#arc-core)" />
        <motion.g
          style={{originX: '100px', originY: '100px'}}
          animate={{rotate: 360}}
          transition={{duration: 60, repeat: Infinity, ease: 'linear'}}
        >
          {Array.from({length: 12}).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x1 = 100 + Math.cos(angle) * 70;
            const y1 = 100 + Math.sin(angle) * 70;
            const x2 = 100 + Math.cos(angle) * 90;
            const y2 = 100 + Math.sin(angle) * 90;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0,212,255,0.4)"
                strokeWidth="1"
              />
            );
          })}
          <circle cx="100" cy="100" r="80" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="rgba(0,212,255,0.15)" strokeWidth="0.5" fill="none" />
        </motion.g>
      </svg>
    </div>
  );
}

// =========================================================================
// FloatIn — gentle floating motion (used on photo)
// =========================================================================
export function FloatIn({children, className}: {children: ReactNode; className?: string}) {
  return (
    <motion.div
      className={className}
      animate={{y: [0, -12, 0]}}
      transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
    >
      {children}
    </motion.div>
  );
}

export {AnimatePresence};
