'use client';

import Image from 'next/image';
import MaxiPlayer from '@/components/MaxiPlayer';
import {
  Reveal,
  Stagger,
  StaggerChild,
  CursorGlow,
  ScrollProgress,
  NumberCounter,
  MagneticButton,
  Marquee,
  WordReveal,
  ArcGlow,
  FloatIn,
} from '@/components/animations';
import {MiniRobot, RobotWithSpeech, RobotTrio} from '@/components/MiniRobot';
import {ScanlineSweep} from '@/components/JarvisCore';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useRef} from 'react';

export default function Page() {
  return (
    <main className="relative above-fx">
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <Hero />
      <About />
      <Maxi />
      <Experience />
      <OtherProjects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}

// =========================================================================
// Nav — sticky glass top bar with scroll-shrink
// =========================================================================
function Nav() {
  const {scrollY} = useScroll();
  const padding = useTransform(scrollY, [0, 200], ['1.25rem', '0.75rem']);
  const opacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);

  const links = [
    {href: '#maxi', label: 'Maxi'},
    {href: '#experience', label: 'Experience'},
    {href: '#projects', label: 'Projects'},
    {href: '#contact', label: 'Contact'},
  ];

  return (
    <motion.nav
      style={{paddingTop: padding, paddingBottom: padding}}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/[0.06]"
    >
      <motion.div
        style={{opacity}}
        className="absolute inset-0 bg-bg/80 -z-10"
      />
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-arc/50 group-hover:border-arc transition" />
            <div className="absolute inset-1.5 rounded-full bg-arc/20 animate-pulse-slow" />
            <div className="absolute inset-3 rounded-full bg-arc shadow-arc-soft" />
          </div>
          <span className="font-mono text-xs text-arc tracking-[0.3em] font-semibold">
            MMC
          </span>
        </a>
        <div className="flex items-center gap-2 md:gap-6 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-ink-soft hover:text-arc transition rounded-full"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

// =========================================================================
// Hero — large reveal, photo + name
// =========================================================================
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({target: heroRef, offset: ['start start', 'end start']});
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[100vh] pt-40 md:pt-48 pb-32 px-6 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <ArcGlow className="-top-40 -right-40 opacity-40" size={900} />
      <div className="absolute inset-0 spotlight opacity-50" aria-hidden />
      {/* Mini robot peeking from top-right on desktop */}
      <div className="absolute top-32 right-8 z-10 hidden md:block">
        <MiniRobot tone="arc" size={96} pose="wave" label="Maxi, the AI mascot" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div style={{y: titleY, opacity}}>
          <Reveal>
            <div className="inline-flex items-center gap-4 mb-10 font-mono text-[10px] text-arc tracking-[0.4em] uppercase">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-arc opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-arc" />
              </span>
              <span>AI Engineer · Bengaluru · Open to roles</span>
            </div>
          </Reveal>

          <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.88]">
            <div className="text-7xl md:text-9xl">
              <WordReveal text="Manoj" />
            </div>
            <div className="text-7xl md:text-9xl mt-2 text-gradient-arc">
              <WordReveal text="M C" delay={0.4} />
            </div>
          </h1>

          <Reveal delay={0.8} className="mt-12 max-w-3xl">
            <p className="text-xl md:text-2xl text-ink-soft leading-[1.55] font-light">
              Building production multi-agent systems and voice-first AI.
              Architect of{' '}
              <span className="text-ink font-medium">xTrac AI</span> at iEllipse.
              Creator of{' '}
              <span className="text-ink font-medium">Maxi</span> — a JARVIS-style
              voice assistant running on Claude Code with{' '}
              <span className="text-arc">27 self-built MCP tools</span> and
              sub-150 ms barge-in.
            </p>
          </Reveal>

          <Reveal delay={1.0} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton
              href="https://github.com/ManojMShetty/Maxi"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-arc text-bg font-semibold rounded-full hover:shadow-arc transition"
            >
              View Maxi →
            </MagneticButton>
            <MagneticButton
              href="mailto:manojmshetty12@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 glass rounded-full text-ink hover:border-arc/50 transition"
            >
              Get in touch
            </MagneticButton>
          </Reveal>
        </motion.div>

        {/* Scroll cue */}
        <Reveal delay={1.6} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{y: [0, 8, 0], opacity: [0.4, 1, 0.4]}}
            transition={{duration: 2, repeat: Infinity}}
            className="font-mono text-xs text-ink-muted tracking-[0.3em] flex flex-col items-center gap-2"
          >
            <span>SCROLL</span>
            <span className="w-px h-8 bg-gradient-to-b from-arc to-transparent" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

// =========================================================================
// PortraitFrame — photo slot with arc-reactor backdrop
// =========================================================================
function PortraitFrame() {
  return (
    <div className="relative photo-frame aspect-[3/4] w-full">
      {/* The actual photo. If it doesn't exist yet the frame still looks intentional. */}
      <Image
        src="/manoj-portrait.png"
        alt="Manoj M C"
        fill
        sizes="(max-width: 1024px) 100vw, 420px"
        className="object-cover object-center z-10"
        priority
        onError={(e) => {
          // hide broken image silently — frame styling provides fallback look
          (e.currentTarget as HTMLImageElement).style.opacity = '0';
        }}
      />
      {/* subtle scanline overlay for cinematic feel */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,212,255,0.4) 0px, rgba(0,212,255,0.4) 1px, transparent 1px, transparent 3px)',
        }}
      />
      {/* corner brackets */}
      {[
        'top-3 left-3 border-t border-l',
        'top-3 right-3 border-t border-r',
        'bottom-3 left-3 border-b border-l',
        'bottom-3 right-3 border-b border-r',
      ].map((cls, i) => (
        <div
          key={i}
          aria-hidden
          className={`absolute z-30 w-5 h-5 border-arc ${cls}`}
        />
      ))}
    </div>
  );
}

// =========================================================================
// About — photo + bio side-by-side, photo sticky on scroll
// =========================================================================
function About() {
  return (
    <Section title="About" eyebrow="01">
      <div className="grid lg:grid-cols-[minmax(0,420px),1fr] gap-12 lg:gap-16 items-start">
        {/* Photo column — sticky so it stays visible while the bio scrolls */}
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <FloatIn>
              <PortraitFrame />
            </FloatIn>
            {/* Identity tag below photo */}
            <div className="mt-6 flex flex-col gap-1.5 font-mono text-xs text-ink-muted tracking-[0.25em]">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-arc animate-pulse-slow" />
                <span>SUBJECT · MANOJ M C</span>
              </div>
              <div className="pl-[18px] text-[10px] tracking-[0.3em] text-ink-muted/60">
                BENGALURU · IN-KA · 2026
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bio column */}
        <div className="space-y-7 text-lg md:text-xl text-ink-soft leading-relaxed">
          <Reveal>
            <p>
              I build agentic systems that{' '}
              <span className="text-ink">act</span>, not just chat. Currently
              architecting{' '}
              <a
                href="https://xtrac.app"
                className="text-arc hover:underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                xTrac AI
              </a>{' '}
              — a self-configuring multi-agentic platform live with five
              enterprise pilots — at iEllipse Technologies. Finishing my B.E.
              in CSE at Dayananda Sagar University.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              On the side I built{' '}
              <a
                href="https://github.com/ManojMShetty/Maxi"
                className="text-arc hover:underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Maxi
              </a>
              , a voice-first personal AI where Claude Code is the reasoning
              brain and the entire audio pipeline runs locally. 30+ versions,
              27 MCP tools, sub-150 ms barge-in. The explainer in the next
              section is rendered programmatically in Remotion, embedded live
              via{' '}
              <code className="text-arc font-mono text-base">
                @remotion/player
              </code>
              .
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink-muted">
              Working interests: agentic orchestration, LLM-agnostic routing,
              audio-layer human-AI interaction, Claude Code internals.
            </p>
          </Reveal>

          {/* Quick-facts grid */}
          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 gap-3 pt-4">
              {[
                {k: 'Now', v: 'AI Architect Intern @ iEllipse'},
                {k: 'Building', v: 'xTrac AI · Maxi'},
                {k: 'Studying', v: 'B.E. CSE · DSU 2026'},
                {k: 'Based in', v: 'Bengaluru, IN'},
              ].map((f) => (
                <div
                  key={f.k}
                  className="glass rounded-xl px-4 py-3"
                >
                  <div className="font-mono text-[10px] text-arc tracking-[0.25em] mb-1">
                    {f.k.toUpperCase()}
                  </div>
                  <div className="text-sm text-ink-soft">{f.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

// =========================================================================
// Maxi — featured project
// =========================================================================
function Maxi() {
  const stats: Array<{value: number; label: string; suffix?: string; prefix?: string}> = [
    {value: 27, label: 'MCP TOOLS'},
    {value: 17, label: 'TEST FILES'},
    {value: 30, label: 'VERSIONS', suffix: '+'},
    {value: 150, label: 'BARGE-IN', prefix: '<', suffix: 'ms'},
  ];

  return (
    <Section id="maxi" title="Maxi" eyebrow="02" subtitle="Featured · JARVIS-style voice AI">
      {/* Mini robot crew floating above the explainer */}
      <Reveal className="flex justify-end mb-6">
        <RobotTrio />
      </Reveal>

      {/* Featured explainer video — full width hero element of the section */}
      <Reveal className="mb-16">
        <div className="font-mono text-xs text-ink-muted tracking-[0.3em] flex items-center gap-3 mb-4">
          <span className="w-4 h-px bg-arc" />
          LIVE EXPLAINER · 45s · RENDERED IN REMOTION
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <MaxiPlayer />
          <ScanlineSweep />
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-start">
        <div className="space-y-6">
          <Reveal>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed">
              Maxi is a voice-first personal AI assistant.{' '}
              <span className="text-arc font-medium">Claude Code is the brain</span>{' '}
              — invoked as a subprocess per turn. Wake-word, STT (faster-whisper),
              TTS (Piper), and voice-activity detection (silero-vad) all run
              locally. No cloud audio dependency.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-soft leading-relaxed">
              I built{' '}
              <span className="text-arc font-medium">27 MCP tools from scratch</span>{' '}
              covering desktop control, browser automation (Playwright CDP),
              vision (multimodal screenshot), and 15+ web integrations spanning
              IRCTC trains, JioSaavn music, Amazon/Flipkart/Swiggy/Zomato shopping,
              Google Calendar, Gmail, GitHub.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink-soft leading-relaxed">
              <span className="text-gold font-medium">Engineering highlights:</span>{' '}
              sub-150 ms barge-in via silero-vad streaming (mid-word TTS abort),
              kill-in-flight subprocess protocol via psutil with session-commit
              semantics proven by S1/S2 spike tests and a soak suite, proactive
              turns where Maxi initiates conversations, and an episodic memory
              layer with semantic recall over past turns.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-wrap gap-3 pt-2">
            <MagneticButton
              href="https://github.com/ManojMShetty/Maxi"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-arc text-bg font-semibold rounded-full hover:shadow-arc transition"
            >
              GitHub →
            </MagneticButton>
            <MagneticButton
              href="https://github.com/ManojMShetty/Maxi/blob/main/workspace/spike-report-2026-05-20.md"
              className="inline-flex items-center gap-2 px-6 py-3.5 glass rounded-full text-ink hover:border-arc/50 transition"
            >
              Read the spike report
            </MagneticButton>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={StaggerChild}
              whileHover={{y: -4}}
              className="glass-strong rounded-2xl p-6 group hover:border-arc/40 transition"
            >
              <div className="text-5xl font-mono font-bold text-arc tracking-tight">
                <NumberCounter
                  to={s.value}
                  suffix={s.suffix}
                  prefix={s.prefix}
                />
              </div>
              <div className="text-[11px] text-ink-muted tracking-[0.25em] mt-2 font-mono">
                {s.label}
              </div>
            </motion.div>
          ))}
          <motion.div
            variants={StaggerChild}
            className="col-span-2 glass-strong rounded-2xl p-6"
          >
            <div className="text-[11px] text-ink-muted tracking-[0.25em] mb-3 font-mono">
              STACK
            </div>
            <Marquee>
              {[
                'Python',
                'Claude Code',
                'MCP',
                'faster-whisper',
                'Piper',
                'silero-vad',
                'openWakeWord',
                'SQLite',
                'pgvector',
                'Playwright',
                'psutil',
              ].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-arc/[0.08] border border-arc/30 rounded-full text-arc font-mono text-xs whitespace-nowrap"
                >
                  {t}
                </span>
              ))}
            </Marquee>
          </motion.div>
        </Stagger>
      </div>
    </Section>
  );
}

// =========================================================================
// Experience
// =========================================================================
function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="03">
      <Reveal>
        <article className="relative glass-strong rounded-2xl p-8 md:p-10 group hover:border-arc/30 transition">
          <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-arc/60 to-transparent" />
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <h3 className="text-2xl md:text-3xl font-display font-semibold">
              iEllipse Technologies
              <span className="text-arc"> · AI Architect Intern</span>
            </h3>
            <span className="font-mono text-sm text-ink-muted">
              Jan 2026 — Present
            </span>
          </div>
          <div className="text-ink-muted mb-8">Mysore, Karnataka</div>
          <ul className="space-y-5 text-ink-soft leading-relaxed">
            <li className="flex gap-4">
              <span className="text-arc mt-1.5 shrink-0">◆</span>
              <span>
                Architected{' '}
                <a
                  href="https://xtrac.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-arc hover:underline underline-offset-4"
                >
                  xTrac AI
                </a>
                , a self-configuring multi-agentic platform that ingests an
                organization&apos;s persona and auto-generates domain-specific
                agents, workflows, database schemas, and integrations — live with{' '}
                <span className="text-ink font-semibold">5 enterprise pilots</span>{' '}
                across healthcare, travel, manufacturing, D2C, and consulting.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-arc mt-1.5 shrink-0">◆</span>
              <span>
                Built the LLM-agnostic orchestration engine routing across GPT-4o,
                Claude, and Gemini using LangGraph + Microsoft Agent Framework,
                with persistent organizational memory on PostgreSQL + pgvector +
                Redis.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-arc mt-1.5 shrink-0">◆</span>
              <span>
                Designed and shipped an Agent-to-Agent (A2A) protocol — a
                JSON-RPC-style negotiation layer enabling autonomous agentic
                commerce between Business AI and customers&apos; Personal AI
                assistants.
              </span>
            </li>
          </ul>
        </article>
      </Reveal>
    </Section>
  );
}

// =========================================================================
// Other Projects
// =========================================================================
function OtherProjects() {
  const projects: Array<{
    title: string;
    tagline: string;
    desc: string;
    stack: string[];
    href: string;
    live?: string;
    tag: 'AI' | 'FULL-STACK' | 'FRONTEND';
  }> = [
    {
      title: 'ZSPA',
      tagline: 'Zero-Shot Process Automator',
      desc:
        'Desktop automation agent translating voice/text into multi-step UI actions via OCR-driven screen understanding and intent parsing. Zero-shot extensibility through an intent-config DSL.',
      stack: ['Python', 'PyTesseract', 'SpeechRecognition', 'Tkinter'],
      href: 'https://github.com/ManojMShetty/ZSPA',
      tag: 'AI',
    },
    {
      title: 'Reddit Persona Generator',
      tagline: 'LLM-powered behavioral persona synthesis',
      desc:
        'Scrapes a Reddit user\'s posts and comments via PRAW, runs an LLM analysis to extract interests, communication tone, and archetype, then renders a styled persona card as a PNG.',
      stack: ['Python', 'PRAW', 'Pillow', 'LLM'],
      href: 'https://github.com/ManojMShetty/reddit-persona-generator',
      tag: 'AI',
    },
    {
      title: 'Mysore Tourism',
      tagline: 'Tourism website with chat-backend',
      desc:
        'Full-stack tourism platform for Mysore featuring an integrated chat backend for user inquiries. Built from a Figma design with a Vite + TypeScript frontend and a separate Node chat service.',
      stack: ['TypeScript', 'Vite', 'Node.js', 'Tailwind'],
      href: 'https://github.com/ManojMShetty/mysore-tourism',
      live: 'https://mysore-tourism-eight.vercel.app',
      tag: 'FULL-STACK',
    },
    {
      title: 'Royal Events Co',
      tagline: 'Event management platform',
      desc:
        'Production-deployed event-management web app — landing, booking flow, responsive layouts. React + shadcn/ui frontend, Vite build, Vercel deployment.',
      stack: ['React', 'TypeScript', 'Vite', 'shadcn/ui', 'Tailwind'],
      href: 'https://github.com/ManojMShetty/royaleventsco',
      live: 'https://royaleventsco-bice.vercel.app',
      tag: 'FRONTEND',
    },
  ];

  const tagColor = {
    'AI': 'text-arc border-arc/30 bg-arc/5',
    'FULL-STACK': 'text-gold border-gold/30 bg-gold/5',
    'FRONTEND': 'text-ember border-ember/30 bg-ember/5',
  } as const;

  return (
    <Section id="projects" title="Other Projects" eyebrow="04">
      <Stagger className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <motion.a
            key={p.title}
            variants={StaggerChild}
            whileHover={{y: -6}}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group relative glass-strong rounded-2xl p-7 hover:border-arc/40 transition block"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-display font-semibold">{p.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full border font-mono text-[9px] tracking-[0.2em] ${tagColor[p.tag]}`}
                  >
                    {p.tag}
                  </span>
                </div>
                <div className="text-ink-muted text-sm">{p.tagline}</div>
              </div>
              <span className="text-ink-muted group-hover:text-arc transition text-xl shrink-0">
                ↗
              </span>
            </div>
            <p className="text-ink-soft text-sm leading-relaxed mb-5">{p.desc}</p>
            <div className="flex flex-wrap items-center gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-0.5 bg-white/[0.04] border border-white/10 rounded-full text-ink-soft font-mono text-[11px]"
                >
                  {s}
                </span>
              ))}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="ml-auto text-[11px] font-mono text-arc hover:underline underline-offset-2"
                >
                  live →
                </a>
              )}
            </div>
          </motion.a>
        ))}
      </Stagger>
    </Section>
  );
}

// =========================================================================
// Skills
// =========================================================================
function Skills() {
  const groups: Array<{title: string; items: string[]}> = [
    {
      title: 'AI / ML',
      items: [
        'LangGraph',
        'LangChain',
        'Microsoft Agent Framework',
        'OpenClaw',
        'MCP',
        'RAG',
        'vector search',
        'embeddings',
        'prompt engineering',
        'LLM evals',
        'agentic orchestration',
        'A2A protocols',
        'Claude Code SDK',
      ],
    },
    {
      title: 'Voice / Audio',
      items: ['faster-whisper', 'Piper TTS', 'silero-vad', 'openWakeWord'],
    },
    {
      title: 'Languages',
      items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C#', 'SQL'],
    },
    {
      title: 'Backend',
      items: ['FastAPI', 'REST', 'microservices', 'async I/O', 'subprocess + IPC'],
    },
    {
      title: 'Data / Storage',
      items: ['PostgreSQL', 'pgvector', 'Redis', 'SQLite', 'vector databases'],
    },
    {
      title: 'Infra & Tooling',
      items: ['Git', 'GitHub Actions', 'Linux', 'Playwright', 'psutil', 'Vercel'],
    },
  ];

  return (
    <Section title="Skills" eyebrow="05">
      <Stagger className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {groups.map((g) => (
          <motion.div key={g.title} variants={StaggerChild}>
            <h4 className="font-mono text-arc text-[11px] tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-arc/60" />
              {g.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 glass rounded-full text-sm text-ink-soft hover:border-arc/40 hover:text-ink transition"
                >
                  {i}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}

// =========================================================================
// Contact
// =========================================================================
function Contact() {
  const links = [
    {
      label: 'GitHub',
      hint: 'github.com/ManojMShetty',
      href: 'https://github.com/ManojMShetty',
    },
    {
      label: 'LinkedIn',
      hint: 'linkedin.com/in/manoj-m-c',
      href: 'https://linkedin.com/in/manoj-m-c',
    },
    {
      label: 'Email',
      hint: 'manojmshetty12@gmail.com',
      href: 'mailto:manojmshetty12@gmail.com',
    },
  ];

  return (
    <Section id="contact" title="Let's talk" eyebrow="06">
      <div className="grid md:grid-cols-[1.2fr,1fr] gap-12 items-start">
        <div className="max-w-xl">
          <Reveal className="mb-8">
            <RobotWithSpeech
              tone="gold"
              size={84}
              pose="wave"
              message="Hey there. Want to build something?"
            />
          </Reveal>
          <Reveal>
            <p className="text-2xl md:text-3xl font-display leading-snug">
              I&apos;m looking for AI engineering roles where the work is{' '}
              <span className="text-gradient-arc">real</span> — agentic systems,
              voice AI, LLM orchestration.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-ink-muted">
              Best reached on email or LinkedIn. Open to remote and Bengaluru.
            </p>
          </Reveal>
        </div>
        <Stagger className="space-y-3">
          {links.map((l) => (
            <motion.a
              key={l.label}
              variants={StaggerChild}
              whileHover={{x: 4}}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-baseline justify-between glass-strong rounded-xl p-5 hover:border-arc/50 group transition"
            >
              <span className="font-mono text-arc text-[11px] tracking-[0.3em]">
                {l.label}
              </span>
              <span className="text-ink-soft group-hover:text-arc transition flex items-center gap-2">
                {l.hint}
                <span className="opacity-50 group-hover:translate-x-1 transition">→</span>
              </span>
            </motion.a>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

// =========================================================================
// Section wrapper — eyebrow + title with animated divider
// =========================================================================
function Section({
  id,
  title,
  subtitle,
  eyebrow,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative py-32 md:py-52 px-6 md:px-8"
    >
      {/* Top divider — animated draw on scroll */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)',
        }}
        initial={{scaleX: 0, opacity: 0}}
        whileInView={{scaleX: 1, opacity: 1}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 1.5, ease: [0.22, 1, 0.36, 1]}}
      />
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-20 md:mb-28">
          <div className="flex items-center gap-5 mb-7">
            {eyebrow && (
              <span className="font-mono text-arc text-[10px] tracking-[0.4em] uppercase">
                Section / {eyebrow}
              </span>
            )}
            <motion.span
              className="h-px bg-gradient-to-r from-arc/60 to-transparent origin-left"
              initial={{scaleX: 0}}
              whileInView={{scaleX: 1}}
              viewport={{once: true}}
              transition={{duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1}}
              style={{width: 120}}
            />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-[-0.03em] leading-[0.95]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 text-ink-soft text-lg md:text-xl font-light">
              {subtitle}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

// =========================================================================
// Footer
// =========================================================================
function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-[11px] text-ink-muted tracking-[0.3em]">
          © 2026 MANOJ M C · BENGALURU
        </div>
        <div className="font-mono text-[11px] text-ink-muted tracking-[0.3em]">
          BUILT WITH NEXT.JS · FRAMER MOTION · REMOTION
        </div>
      </div>
    </footer>
  );
}
