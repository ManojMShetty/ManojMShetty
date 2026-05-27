'use client';

import {motion, useReducedMotion} from 'framer-motion';
import type {ReactNode} from 'react';

type Tone = 'arc' | 'gold' | 'ember';
type Pose = 'idle' | 'wave' | 'scan';

const TONE_COLORS: Record<Tone, {body: string; eye: string; accent: string; glow: string}> = {
  arc: {
    body: '#0f1419',
    eye: '#7dd3fc',
    accent: '#bae6fd',
    glow: 'rgba(125,211,252,0.5)',
  },
  gold: {
    body: '#1a140a',
    eye: '#fbbf24',
    accent: '#fde68a',
    glow: 'rgba(251,191,36,0.45)',
  },
  ember: {
    body: '#1a0e10',
    eye: '#fb7185',
    accent: '#fecdd3',
    glow: 'rgba(251,113,133,0.4)',
  },
};

/**
 * MiniRobot — small animated SVG robot character.
 *
 * Animations:
 *   - Idle: gentle up-down bob (3.5s loop)
 *   - Eyes: occasional blink (every 4–6s)
 *   - Antenna tip: continuous pulse
 *   - Hover: slight tilt for tactile reaction
 *   - Speech dots: sequential lighting (gives the impression it's "thinking")
 *
 * Use as:
 *   <MiniRobot tone="arc" size={80} pose="idle" />
 */
export function MiniRobot({
  tone = 'arc',
  size = 88,
  pose = 'idle',
  className,
  label,
}: {
  tone?: Tone;
  size?: number;
  pose?: Pose;
  className?: string;
  label?: string;
}) {
  const c = TONE_COLORS[tone];
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative inline-block ${className ?? ''}`}
      style={{width: size, height: size * 1.25}}
      animate={
        reduce
          ? undefined
          : {y: [0, -6, 0], rotate: pose === 'wave' ? [0, -2, 2, 0] : 0}
      }
      transition={{duration: 3.5, repeat: Infinity, ease: 'easeInOut'}}
      whileHover={{rotate: -3, scale: 1.06}}
      aria-label={label ?? 'mini robot'}
      role="img"
    >
      {/* Soft glow behind the robot */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${c.glow} 0%, transparent 60%)`,
        }}
      />
      <svg
        viewBox="0 0 100 125"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`body-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.body} stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="1" />
          </linearGradient>
          <radialGradient id={`eye-glow-${tone}`}>
            <stop offset="0%" stopColor={c.accent} />
            <stop offset="100%" stopColor={c.eye} />
          </radialGradient>
        </defs>

        {/* Antenna stalk */}
        <line x1="50" y1="14" x2="50" y2="22" stroke={c.eye} strokeWidth="1.5" strokeLinecap="round" />
        {/* Antenna tip — pulsing */}
        <motion.circle
          cx="50"
          cy="11"
          r="3"
          fill={c.eye}
          animate={reduce ? undefined : {opacity: [0.4, 1, 0.4], r: [3, 3.6, 3]}}
          transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut'}}
          style={{filter: `drop-shadow(0 0 6px ${c.glow})`}}
        />

        {/* Head — rounded rectangle */}
        <rect
          x="20"
          y="22"
          width="60"
          height="50"
          rx="14"
          fill={`url(#body-${tone})`}
          stroke={c.eye}
          strokeWidth="1.2"
          strokeOpacity="0.6"
        />

        {/* Head highlight on top */}
        <rect
          x="22"
          y="24"
          width="56"
          height="14"
          rx="12"
          fill="white"
          opacity="0.04"
        />

        {/* Side ear-bumps */}
        <rect x="14" y="36" width="8" height="14" rx="3" fill={c.body} stroke={c.eye} strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="78" y="36" width="8" height="14" rx="3" fill={c.body} stroke={c.eye} strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Eyes — blinking */}
        <motion.g
          animate={
            reduce
              ? undefined
              : {scaleY: [1, 1, 1, 0.1, 1, 1, 0.1, 1]}
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.4, 0.45, 0.47, 0.5, 0.78, 0.8, 0.83],
          }}
          style={{transformOrigin: '50px 47px', transformBox: 'fill-box'}}
        >
          <circle cx="38" cy="47" r="5" fill={`url(#eye-glow-${tone})`} />
          <circle cx="62" cy="47" r="5" fill={`url(#eye-glow-${tone})`} />
          {/* Eye reflections */}
          <circle cx="36.5" cy="45.5" r="1.2" fill="white" opacity="0.9" />
          <circle cx="60.5" cy="45.5" r="1.2" fill="white" opacity="0.9" />
        </motion.g>

        {/* Mouth-grille — three dots that light sequentially (thinking) */}
        {[40, 50, 60].map((cx, i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy="62"
            r="1.5"
            fill={c.eye}
            animate={reduce ? undefined : {opacity: [0.2, 1, 0.2]}}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Neck */}
        <rect x="44" y="72" width="12" height="6" rx="2" fill={c.body} stroke={c.eye} strokeWidth="0.6" strokeOpacity="0.4" />

        {/* Body */}
        <rect
          x="26"
          y="78"
          width="48"
          height="32"
          rx="8"
          fill={`url(#body-${tone})`}
          stroke={c.eye}
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Chest panel */}
        <rect x="34" y="84" width="32" height="20" rx="4" fill="#000" opacity="0.4" />
        <rect x="36" y="86" width="28" height="16" rx="2" fill="none" stroke={c.eye} strokeWidth="0.6" strokeOpacity="0.5" />

        {/* Chest core — pulsing */}
        <motion.circle
          cx="50"
          cy="94"
          r="3"
          fill={c.eye}
          animate={reduce ? undefined : {opacity: [0.5, 1, 0.5]}}
          transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
          style={{filter: `drop-shadow(0 0 4px ${c.glow})`}}
        />

        {/* Arms */}
        <motion.rect
          x="14"
          y="80"
          width="8"
          height="22"
          rx="3"
          fill={c.body}
          stroke={c.eye}
          strokeWidth="0.8"
          strokeOpacity="0.4"
          animate={
            reduce || pose !== 'wave'
              ? undefined
              : {rotate: [0, -25, 25, -25, 0]}
          }
          transition={{duration: 1.5, repeat: Infinity, repeatDelay: 3}}
          style={{transformOrigin: '18px 82px', transformBox: 'fill-box'}}
        />
        <rect
          x="78"
          y="80"
          width="8"
          height="22"
          rx="3"
          fill={c.body}
          stroke={c.eye}
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />

        {/* Base/feet */}
        <rect x="32" y="110" width="14" height="6" rx="2" fill={c.body} stroke={c.eye} strokeWidth="0.6" strokeOpacity="0.4" />
        <rect x="54" y="110" width="14" height="6" rx="2" fill={c.body} stroke={c.eye} strokeWidth="0.6" strokeOpacity="0.4" />
      </svg>
    </motion.div>
  );
}

/**
 * RobotWithSpeech — mini robot with a small speech bubble for personality.
 */
export function RobotWithSpeech({
  tone = 'arc',
  size = 80,
  pose = 'idle',
  message,
  side = 'right',
  className,
}: {
  tone?: Tone;
  size?: number;
  pose?: Pose;
  message: string;
  side?: 'left' | 'right';
  className?: string;
}) {
  return (
    <div className={`flex items-end gap-3 ${side === 'left' ? 'flex-row-reverse' : ''} ${className ?? ''}`}>
      <MiniRobot tone={tone} size={size} pose={pose} />
      <motion.div
        initial={{opacity: 0, y: 10, scale: 0.9}}
        animate={{opacity: 1, y: 0, scale: 1}}
        transition={{duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1]}}
        className="relative mb-4 px-4 py-2 glass-strong rounded-2xl rounded-bl-sm font-mono text-xs text-ink-soft max-w-[200px]"
      >
        {message}
      </motion.div>
    </div>
  );
}

/**
 * RobotTrio — three mini robots in a row with staggered animation.
 * Compact decorative element.
 */
export function RobotTrio({className}: {className?: string}) {
  return (
    <div className={`flex items-end gap-4 ${className ?? ''}`}>
      <MiniRobot tone="arc" size={64} pose="idle" />
      <MiniRobot tone="gold" size={80} pose="wave" />
      <MiniRobot tone="ember" size={64} pose="idle" />
    </div>
  );
}

export function MaybeWrap({when, wrap, children}: {when: boolean; wrap: (c: ReactNode) => ReactNode; children: ReactNode}) {
  return <>{when ? wrap(children) : children}</>;
}
