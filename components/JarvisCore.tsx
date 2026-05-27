'use client';

import {motion} from 'framer-motion';

/**
 * JarvisCore — multi-layer animated AI/HUD visualization.
 *
 * Layers (innermost first):
 *   1. Solid arc-blue core with radial gradient
 *   2. Pulsing hexagonal containment frame
 *   3. Counter-rotating dashed inner ring with 8 data nodes
 *   4. Slow-rotating outer ring with 60 tick marks + 4 degree readouts
 *   5. Crosshair markers at cardinal points
 *   6. Sweeping radar beam
 */
export function JarvisCore({
  className,
  size = 720,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={`pointer-events-none absolute ${className ?? ''}`} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 400 400">
        <defs>
          <radialGradient id="jarvis-core-grad">
            <stop offset="0%" stopColor="rgba(245,245,247,0.9)" />
            <stop offset="20%" stopColor="rgba(125,211,252,0.7)" />
            <stop offset="60%" stopColor="rgba(125,211,252,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="jarvis-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(125,211,252,0)" />
            <stop offset="100%" stopColor="rgba(125,211,252,0.5)" />
          </linearGradient>
        </defs>

        {/* Diffuse glow halo */}
        <circle cx="200" cy="200" r="200" fill="url(#jarvis-core-grad)" opacity="0.4" />

        {/* OUTER RING — slow rotate, 60 tick marks */}
        <motion.g
          style={{originX: '200px', originY: '200px'}}
          animate={{rotate: 360}}
          transition={{duration: 90, repeat: Infinity, ease: 'linear'}}
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="rgba(125,211,252,0.2)"
            strokeWidth="0.5"
            fill="none"
          />
          {Array.from({length: 60}).map((_, i) => {
            const angle = (i / 60) * Math.PI * 2;
            const isMajor = i % 5 === 0;
            const inner = 180 - (isMajor ? 12 : 5);
            const outer = 180;
            return (
              <line
                key={i}
                x1={200 + Math.cos(angle) * inner}
                y1={200 + Math.sin(angle) * inner}
                x2={200 + Math.cos(angle) * outer}
                y2={200 + Math.sin(angle) * outer}
                stroke={isMajor ? 'rgba(125,211,252,0.6)' : 'rgba(125,211,252,0.3)'}
                strokeWidth={isMajor ? 1.2 : 0.5}
              />
            );
          })}
          {/* Degree readouts at cardinals */}
          {[
            {deg: 0, label: '000'},
            {deg: 90, label: '090'},
            {deg: 180, label: '180'},
            {deg: 270, label: '270'},
          ].map(({deg, label}) => {
            const angle = (deg * Math.PI) / 180;
            return (
              <text
                key={deg}
                x={200 + Math.cos(angle) * 162}
                y={200 + Math.sin(angle) * 162}
                fill="rgba(125,211,252,0.5)"
                fontSize="7"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {label}
              </text>
            );
          })}
        </motion.g>

        {/* INNER RING — counter-rotate, dashed, 8 data nodes */}
        <motion.g
          style={{originX: '200px', originY: '200px'}}
          animate={{rotate: -360}}
          transition={{duration: 50, repeat: Infinity, ease: 'linear'}}
        >
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="rgba(125,211,252,0.35)"
            strokeWidth="0.8"
            fill="none"
            strokeDasharray="3,5"
          />
          {Array.from({length: 8}).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <g key={i}>
                <circle
                  cx={200 + Math.cos(angle) * 140}
                  cy={200 + Math.sin(angle) * 140}
                  r="3"
                  fill="#7dd3fc"
                />
                <circle
                  cx={200 + Math.cos(angle) * 140}
                  cy={200 + Math.sin(angle) * 140}
                  r="6"
                  fill="none"
                  stroke="rgba(125,211,252,0.4)"
                  strokeWidth="0.5"
                />
              </g>
            );
          })}
        </motion.g>

        {/* MID RING — slow rotate the other way, with arc segments */}
        <motion.g
          style={{originX: '200px', originY: '200px'}}
          animate={{rotate: 360}}
          transition={{duration: 35, repeat: Infinity, ease: 'linear'}}
        >
          {/* 4 quarter-arc segments with gaps */}
          {Array.from({length: 4}).map((_, i) => {
            const start = (i / 4) * 360 + 10;
            const end = ((i + 1) / 4) * 360 - 10;
            const startRad = (start * Math.PI) / 180;
            const endRad = (end * Math.PI) / 180;
            const largeArc = end - start > 180 ? 1 : 0;
            const x1 = 200 + Math.cos(startRad) * 110;
            const y1 = 200 + Math.sin(startRad) * 110;
            const x2 = 200 + Math.cos(endRad) * 110;
            const y2 = 200 + Math.sin(endRad) * 110;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A 110 110 0 ${largeArc} 1 ${x2} ${y2}`}
                stroke="rgba(125,211,252,0.5)"
                strokeWidth="1.2"
                fill="none"
              />
            );
          })}
        </motion.g>

        {/* PULSING HEXAGONAL CONTAINMENT */}
        <motion.g
          style={{originX: '200px', originY: '200px'}}
          animate={{scale: [1, 1.06, 1]}}
          transition={{duration: 4, repeat: Infinity, ease: 'easeInOut'}}
        >
          <polygon
            points={Array.from({length: 6})
              .map((_, i) => {
                const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                return `${200 + Math.cos(angle) * 70},${200 + Math.sin(angle) * 70}`;
              })
              .join(' ')}
            stroke="rgba(125,211,252,0.6)"
            strokeWidth="1.5"
            fill="rgba(125,211,252,0.04)"
          />
          {/* Inner hexagon — wireframe */}
          <polygon
            points={Array.from({length: 6})
              .map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                return `${200 + Math.cos(angle) * 45},${200 + Math.sin(angle) * 45}`;
              })
              .join(' ')}
            stroke="rgba(125,211,252,0.4)"
            strokeWidth="0.8"
            fill="none"
          />
        </motion.g>

        {/* CORE — solid glowing center */}
        <motion.circle
          cx="200"
          cy="200"
          r="22"
          fill="url(#jarvis-core-grad)"
          animate={{opacity: [0.8, 1, 0.8]}}
          transition={{duration: 2.5, repeat: Infinity, ease: 'easeInOut'}}
        />
        <circle cx="200" cy="200" r="6" fill="#bae6fd" />

        {/* RADAR SWEEP — rotating beam */}
        <motion.g
          style={{originX: '200px', originY: '200px'}}
          animate={{rotate: 360}}
          transition={{duration: 6, repeat: Infinity, ease: 'linear'}}
        >
          <path
            d="M 200 200 L 380 200 A 180 180 0 0 0 339 78 Z"
            fill="url(#jarvis-sweep)"
            opacity="0.15"
          />
        </motion.g>

        {/* CROSSHAIR markers at cardinal extremes */}
        {[
          [200, 8, 200, 20],
          [200, 380, 200, 392],
          [8, 200, 20, 200],
          [380, 200, 392, 200],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(125,211,252,0.5)"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * SystemStatus — small floating HUD pill that cycles through status messages.
 * Place anywhere as a positioned/floating element.
 */
export function SystemStatus({className}: {className?: string}) {
  const messages = [
    'SYSTEM · ONLINE',
    'PARSING · USER',
    'AGENT · READY',
    'MEMORY · 27 MCP',
    'BARGE-IN · <150MS',
  ];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-full glass border border-arc/20 font-mono text-[10px] tracking-[0.3em] ${className ?? ''}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-arc opacity-60 animate-ping" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-arc" />
      </span>
      <CyclingText messages={messages} />
    </div>
  );
}

function CyclingText({messages}: {messages: string[]}) {
  return (
    <div className="relative h-3 overflow-hidden">
      <motion.div
        animate={{y: messages.map((_, i) => -i * 12).concat([0])}}
        transition={{
          duration: messages.length * 2.5,
          times: [...messages.map((_, i) => i / messages.length), 1],
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col"
      >
        {messages.map((m) => (
          <span key={m} className="h-3 text-arc whitespace-nowrap leading-3">
            {m}
          </span>
        ))}
        <span className="h-3 text-arc whitespace-nowrap leading-3">{messages[0]}</span>
      </motion.div>
    </div>
  );
}

/**
 * ScanlineSweep — vertical scan line that periodically sweeps a container.
 * Wrap any element. The wrapper must be position:relative.
 */
export function ScanlineSweep() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 h-px"
      style={{
        background:
          'linear-gradient(90deg, transparent, rgba(125,211,252,0.6), transparent)',
        boxShadow: '0 0 12px rgba(125,211,252,0.4)',
      }}
      animate={{top: ['0%', '100%', '0%']}}
      transition={{duration: 8, repeat: Infinity, ease: 'easeInOut'}}
    />
  );
}
