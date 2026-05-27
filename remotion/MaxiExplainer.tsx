import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// =========================================================================
// Composition constants — 45 seconds @ 30fps, 1920x1080
// =========================================================================
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_FRAMES = 1350; // 45s

// JARVIS / Iron Man palette
const BG = '#04081f';
const ARC_BLUE = '#00d4ff';
const ARC_BLUE_DIM = '#0a4f6b';
const GOLD = '#ffb700';
const WHITE = '#e8f4ff';
const MUTED = '#7a8aa3';

const FONT_STACK = '"SF Pro Display", "Segoe UI", system-ui, -apple-system, sans-serif';
const MONO_STACK = '"JetBrains Mono", "SF Mono", Consolas, monospace';

// =========================================================================
// MaxiExplainer — composition root, sequences each scene
// =========================================================================
export const MaxiExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: BG, fontFamily: FONT_STACK}}>
      <Backdrop />

      <Sequence from={0} durationInFrames={90}>
        <SceneTitle />
      </Sequence>

      <Sequence from={90} durationInFrames={180}>
        <SceneStats />
      </Sequence>

      <Sequence from={270} durationInFrames={360}>
        <SceneArchitecture />
      </Sequence>

      <Sequence from={630} durationInFrames={330}>
        <SceneDialogue />
      </Sequence>

      <Sequence from={960} durationInFrames={240}>
        <SceneTechStack />
      </Sequence>

      <Sequence from={1200} durationInFrames={150}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

// =========================================================================
// Backdrop — subtle animated grid (always visible)
// =========================================================================
const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (frame % 600) / 600;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(255,183,0,0.06) 0%, transparent 50%),
          linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px',
        backgroundPosition: `0 0, 0 0, 0 ${drift * 60}px, ${drift * 60}px 0`,
      }}
    />
  );
};

// =========================================================================
// Scene 1 — Title card (0–3s)
// =========================================================================
const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleSpring = spring({frame, fps, config: {damping: 12}});
  const subOpacity = interpolate(frame, [30, 60], [0, 1], {extrapolateRight: 'clamp'});
  const outOpacity = interpolate(frame, [75, 90], [1, 0], {extrapolateLeft: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: outOpacity,
      }}
    >
      <ArcReactor frame={frame} size={220} />
      <div
        style={{
          marginTop: 60,
          fontSize: 220,
          fontWeight: 800,
          letterSpacing: 24,
          color: WHITE,
          transform: `scale(${0.6 + titleSpring * 0.4})`,
          textShadow: `0 0 60px ${ARC_BLUE}`,
        }}
      >
        MAXI
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 38,
          color: ARC_BLUE,
          letterSpacing: 4,
          opacity: subOpacity,
          fontWeight: 300,
        }}
      >
        JARVIS-style voice AI for Windows
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// Arc reactor SVG (used in title)
// =========================================================================
const ArcReactor: React.FC<{frame: number; size: number}> = ({frame, size}) => {
  const pulse = 1 + Math.sin(frame / 8) * 0.05;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{transform: `scale(${pulse})`}}>
      <defs>
        <radialGradient id="core">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor={ARC_BLUE} />
          <stop offset="100%" stopColor={ARC_BLUE_DIM} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" stroke={ARC_BLUE_DIM} strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="70" stroke={ARC_BLUE} strokeWidth="3" fill="none" opacity="0.6" />
      <circle cx="100" cy="100" r="50" fill="url(#core)" />
      {Array.from({length: 8}).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + frame / 60;
        const x1 = 100 + Math.cos(angle) * 55;
        const y1 = 100 + Math.sin(angle) * 55;
        const x2 = 100 + Math.cos(angle) * 75;
        const y2 = 100 + Math.sin(angle) * 75;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ARC_BLUE} strokeWidth="3" />
        );
      })}
    </svg>
  );
};

// =========================================================================
// Scene 2 — Stats (3–9s)
// =========================================================================
const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();
  const stats = [
    {label: 'BUILT', value: 'SOLO'},
    {label: 'VERSIONS', value: '30+'},
    {label: 'MCP TOOLS', value: '27'},
    {label: 'TEST FILES', value: '17'},
  ];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontSize: 32, color: MUTED, letterSpacing: 6, marginBottom: 80}}>
        ── A SOLO RESEARCH PROJECT ──
      </div>
      <div style={{display: 'flex', gap: 80}}>
        {stats.map((s, i) => {
          const start = i * 18;
          const sc = interpolate(frame, [start, start + 24], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={s.label}
              style={{
                textAlign: 'center',
                opacity: sc,
                transform: `translateY(${(1 - sc) * 30}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 140,
                  fontWeight: 700,
                  color: ARC_BLUE,
                  textShadow: `0 0 40px ${ARC_BLUE}`,
                  fontFamily: MONO_STACK,
                }}
              >
                {s.value}
              </div>
              <div style={{fontSize: 22, color: MUTED, letterSpacing: 4, marginTop: 12}}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// Scene 3 — Architecture (9–21s)
// =========================================================================
const SceneArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = [
    {label: 'WAKE WORD', detail: 'openWakeWord', at: 0},
    {label: 'STT', detail: 'faster-whisper', at: 30},
    {label: 'BRAIN', detail: 'claude.exe -p', at: 60, highlight: true},
    {label: '27 MCP TOOLS', detail: 'desktop · web · vision', at: 90},
    {label: 'TTS', detail: 'Piper', at: 120},
    {label: 'BARGE-IN', detail: 'silero-vad · <150ms', at: 150, highlight: true},
  ];

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{padding: '120px 100px', flexDirection: 'column'}}>
      <div style={{opacity: headerOpacity, marginBottom: 60}}>
        <div style={{fontSize: 28, color: MUTED, letterSpacing: 4}}>PATH D ARCHITECTURE</div>
        <div style={{fontSize: 56, color: WHITE, fontWeight: 600, marginTop: 8}}>
          Claude Code <span style={{color: ARC_BLUE}}>is the brain.</span>
          <br />
          Audio is <span style={{color: GOLD}}>100% local.</span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 30,
          alignContent: 'center',
        }}
      >
        {nodes.map((n) => {
          const appear = interpolate(frame, [n.at, n.at + 24], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const glow = n.highlight ? 1 : 0.4;
          return (
            <div
              key={n.label}
              style={{
                padding: '36px 40px',
                border: `2px solid ${n.highlight ? ARC_BLUE : ARC_BLUE_DIM}`,
                borderRadius: 12,
                background: `rgba(0,212,255,${0.04 + glow * 0.06})`,
                boxShadow: n.highlight ? `0 0 40px rgba(0,212,255,0.4)` : 'none',
                opacity: appear,
                transform: `translateX(${(1 - appear) * -40}px)`,
              }}
            >
              <div style={{fontSize: 22, color: MUTED, letterSpacing: 3, marginBottom: 10}}>
                {n.label}
              </div>
              <div
                style={{
                  fontSize: 32,
                  color: n.highlight ? ARC_BLUE : WHITE,
                  fontFamily: MONO_STACK,
                  fontWeight: 500,
                }}
              >
                {n.detail}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// Scene 4 — Dialogue beat with kill-in-flight visualization (21–32s)
// =========================================================================
const SceneDialogue: React.FC = () => {
  const frame = useCurrentFrame();

  const lines: Array<{who: 'user' | 'maxi'; text: string; at: number; cut?: boolean}> = [
    {who: 'user', text: '"Hey Maxi, play Arijit Singh."', at: 0},
    {who: 'maxi', text: '"On it, boss."', at: 45},
    {who: 'user', text: '"Wait — what\'s the cricket score?"', at: 110, cut: true},
    {who: 'maxi', text: '"RCB chasing 178, 12 down in 14 overs, boss."', at: 200},
  ];

  return (
    <AbsoluteFill style={{padding: 120, flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{fontSize: 26, color: MUTED, letterSpacing: 4, marginBottom: 50}}>
        ── BARGE-IN UNDER 150 MS ──
      </div>
      {lines.map((l, i) => {
        const appear = interpolate(frame, [l.at, l.at + 24], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const isUser = l.who === 'user';
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: isUser ? 'flex-start' : 'flex-end',
              marginBottom: 30,
              opacity: appear,
              transform: `translateY(${(1 - appear) * 20}px)`,
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '28px 40px',
                borderRadius: 16,
                background: isUser ? 'rgba(255,255,255,0.06)' : 'rgba(0,212,255,0.10)',
                border: `1px solid ${isUser ? '#3a4a6a' : ARC_BLUE_DIM}`,
                fontSize: 42,
                color: isUser ? WHITE : ARC_BLUE,
                position: 'relative',
              }}
            >
              <div style={{fontSize: 18, color: MUTED, letterSpacing: 3, marginBottom: 8}}>
                {isUser ? 'YOU' : 'MAXI'}
              </div>
              {l.text}
              {l.cut && frame > l.at + 30 && (
                <div
                  style={{
                    position: 'absolute',
                    top: -16,
                    right: -16,
                    background: GOLD,
                    color: BG,
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: 2,
                    fontFamily: MONO_STACK,
                  }}
                >
                  KILL-IN-FLIGHT
                </div>
              )}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// =========================================================================
// Scene 5 — Tech stack reveal (32–40s)
// =========================================================================
const SceneTechStack: React.FC = () => {
  const frame = useCurrentFrame();
  const stack = [
    ['BRAIN', 'Claude Code'],
    ['STT', 'faster-whisper'],
    ['TTS', 'Piper'],
    ['VAD', 'silero-vad'],
    ['WAKE', 'openWakeWord'],
    ['TOOLS', 'MCP × 27'],
    ['MEMORY', 'SQLite + embeddings'],
    ['BROWSER', 'Playwright CDP'],
  ];

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{padding: 120, flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{opacity: headerOpacity, marginBottom: 60}}>
        <div style={{fontSize: 28, color: MUTED, letterSpacing: 4}}>STACK</div>
        <div style={{fontSize: 56, color: WHITE, fontWeight: 600, marginTop: 8}}>
          All local. <span style={{color: ARC_BLUE}}>No vendor lock-in.</span>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}
      >
        {stack.map(([label, value], i) => {
          const start = i * 12;
          const a = interpolate(frame, [start, start + 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={label}
              style={{
                padding: '24px 28px',
                background: 'rgba(0,212,255,0.05)',
                borderLeft: `4px solid ${ARC_BLUE}`,
                opacity: a,
                transform: `translateY(${(1 - a) * 20}px)`,
              }}
            >
              <div style={{fontSize: 18, color: MUTED, letterSpacing: 3}}>{label}</div>
              <div
                style={{
                  fontSize: 32,
                  color: WHITE,
                  fontFamily: MONO_STACK,
                  marginTop: 6,
                  fontWeight: 500,
                }}
              >
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// Scene 6 — GitHub CTA (40–45s)
// =========================================================================
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({frame, fps, config: {damping: 12}});

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          fontSize: 36,
          color: MUTED,
          letterSpacing: 4,
          marginBottom: 40,
          opacity: sp,
        }}
      >
        OPEN SOURCE · MIT
      </div>
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: WHITE,
          fontFamily: MONO_STACK,
          letterSpacing: 2,
          transform: `scale(${0.7 + sp * 0.3})`,
          textShadow: `0 0 50px ${ARC_BLUE}`,
        }}
      >
        github.com/
        <span style={{color: ARC_BLUE}}>ManojMShetty/Maxi</span>
      </div>
      <div
        style={{
          marginTop: 60,
          fontSize: 28,
          color: MUTED,
          letterSpacing: 3,
          opacity: sp,
        }}
      >
        Built by Manoj M C · Bengaluru
      </div>
    </AbsoluteFill>
  );
};
