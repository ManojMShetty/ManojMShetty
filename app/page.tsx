import MaxiPlayer from '@/components/MaxiPlayer';

export default function Home() {
  return (
    <main className="min-h-screen">
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
// Nav — fixed top, minimal
// =========================================================================
function Nav() {
  const links = [
    {href: '#maxi', label: 'Maxi'},
    {href: '#experience', label: 'Experience'},
    {href: '#projects', label: 'Projects'},
    {href: '#contact', label: 'Contact'},
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/70 border-b border-arc-dim/30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-mono text-arc font-bold tracking-wider">
          MMC
        </a>
        <div className="flex gap-8 text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-arc transition">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// =========================================================================
// Hero — name, tagline, live Maxi explainer
// =========================================================================
function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs font-mono text-muted tracking-[0.3em] mb-6">
          AI ENGINEER · BENGALURU
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-8">
          Manoj
          <br />
          <span className="text-gradient-arc">M C</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted max-w-3xl leading-relaxed mb-12">
          Building production multi-agent systems and voice-first AI. Architect of{' '}
          <span className="text-ink font-medium">xTrac AI</span> at iEllipse. Creator of{' '}
          <span className="text-ink font-medium">Maxi</span> — a JARVIS-style voice assistant
          running on Claude Code with 27 self-built MCP tools and sub-150 ms barge-in.
        </p>

        <div className="mt-16">
          <div className="text-xs font-mono text-muted tracking-[0.3em] mb-4">
            ── LIVE PREVIEW · MAXI EXPLAINER ──
          </div>
          <MaxiPlayer />
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// About
// =========================================================================
function About() {
  return (
    <Section title="About">
      <div className="max-w-3xl text-lg text-ink/90 leading-relaxed space-y-4">
        <p>
          I build agentic systems that act, not just chat. Currently architecting{' '}
          <a
            href="https://xtrac.app"
            className="text-arc hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            xTrac AI
          </a>{' '}
          — a self-configuring multi-agentic platform live with five enterprise pilots — at
          iEllipse Technologies, and finishing my B.E. in Computer Science at Dayananda Sagar
          University.
        </p>
        <p>
          Outside the day job I built{' '}
          <a
            href="https://github.com/ManojMShetty/Maxi"
            className="text-arc hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Maxi
          </a>
          , a voice-first personal AI where Claude Code is the reasoning brain and the entire
          audio pipeline runs locally. 30+ versions, 27 MCP tools, sub-150 ms barge-in. The
          video above is rendered programmatically in Remotion — same composition, embedded
          here via @remotion/player.
        </p>
        <p className="text-muted">
          I care about: agentic orchestration, LLM-agnostic routing, audio-layer
          human-AI interaction, and Claude Code internals.
        </p>
      </div>
    </Section>
  );
}

// =========================================================================
// Maxi — featured project
// =========================================================================
function Maxi() {
  const stats = [
    {value: '27', label: 'MCP TOOLS'},
    {value: '17', label: 'TEST FILES'},
    {value: '30+', label: 'VERSIONS'},
    {value: '<150ms', label: 'BARGE-IN'},
  ];
  return (
    <Section id="maxi" title="Featured · Maxi" subtitle="JARVIS-style voice AI for Windows">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-ink/90 leading-relaxed">
          <p>
            Maxi is a voice-first personal AI assistant. <span className="text-arc">Claude Code is the brain</span> —
            invoked as a subprocess per turn. Wake-word, STT (faster-whisper), TTS (Piper),
            and voice-activity detection (silero-vad) all run locally. No cloud audio
            dependency.
          </p>
          <p>
            I built <span className="text-arc">27 MCP tools from scratch</span> covering
            desktop control, browser automation (Playwright CDP), vision (multimodal
            screenshot), and 15+ web integrations spanning IRCTC trains, JioSaavn music with
            direct AAC streams, Amazon/Flipkart/Swiggy/Zomato shopping, Google Calendar,
            Gmail, GitHub.
          </p>
          <p>
            <span className="text-gold">Engineering highlights:</span> sub-150 ms barge-in
            via silero-vad streaming (mid-word TTS abort), kill-in-flight subprocess
            protocol via psutil with session-commit semantics proven by S1/S2 spike tests
            and a soak suite, proactive turns where Maxi initiates conversations, and an
            episodic memory layer with semantic recall over past turns.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://github.com/ManojMShetty/Maxi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-arc text-bg font-semibold rounded-lg hover:bg-ink transition"
            >
              View on GitHub →
            </a>
            <a
              href="https://github.com/ManojMShetty/Maxi/blob/main/workspace/spike-report-2026-05-20.md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-arc-dim text-arc rounded-lg hover:bg-arc/10 transition"
            >
              Read the spike report
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-6 bg-bg-card/60 border border-arc-dim rounded-xl"
              >
                <div className="text-4xl font-mono font-bold text-arc">{s.value}</div>
                <div className="text-xs text-muted tracking-[0.2em] mt-2">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-bg-card/60 border border-arc-dim rounded-xl">
            <div className="text-xs font-mono text-muted tracking-[0.2em] mb-3">STACK</div>
            <div className="flex flex-wrap gap-2 text-sm">
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
                  className="px-3 py-1 bg-arc/10 border border-arc-dim/50 rounded text-arc font-mono text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// =========================================================================
// Experience
// =========================================================================
function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-8">
        <article className="p-8 bg-bg-card/40 border border-arc-dim/50 rounded-xl">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <h3 className="text-2xl font-semibold">
              iEllipse Technologies — <span className="text-arc">AI Architect Intern</span>
            </h3>
            <span className="font-mono text-sm text-muted">Jan 2026 – Present</span>
          </div>
          <div className="text-muted mb-6">Mysore, Karnataka</div>
          <ul className="space-y-4 text-ink/90 leading-relaxed list-none">
            <li className="flex gap-3">
              <span className="text-arc mt-1">▸</span>
              <span>
                Architected{' '}
                <a
                  href="https://xtrac.app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-arc hover:underline"
                >
                  xTrac AI
                </a>
                , a self-configuring multi-agentic platform that ingests an organization&apos;s
                persona and auto-generates domain-specific agents, workflows, database
                schemas, and integrations — live with{' '}
                <span className="text-ink font-semibold">5 enterprise pilots</span> across
                healthcare, travel, manufacturing, D2C, and consulting.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-arc mt-1">▸</span>
              <span>
                Built the LLM-agnostic orchestration engine routing across GPT-4o, Claude,
                and Gemini using LangGraph + Microsoft Agent Framework, with persistent
                organizational memory on PostgreSQL + pgvector + Redis.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-arc mt-1">▸</span>
              <span>
                Designed and shipped an Agent-to-Agent (A2A) protocol — a JSON-RPC-style
                negotiation layer enabling autonomous agentic commerce between Business AI
                and customers&apos; Personal AI assistants.
              </span>
            </li>
          </ul>
        </article>
      </div>
    </Section>
  );
}

// =========================================================================
// Other Projects
// =========================================================================
function OtherProjects() {
  const projects = [
    {
      title: 'ZSPA',
      tagline: 'Zero-Shot Process Automator',
      desc:
        'Desktop automation agent translating voice/text into multi-step UI actions via OCR-driven screen understanding and intent parsing. Zero-shot extensibility through an intent-config DSL.',
      stack: ['Python', 'PyTesseract', 'SpeechRecognition', 'Tkinter'],
      href: 'https://github.com/ManojMShetty/ZSPA',
    },
  ];
  return (
    <Section id="projects" title="Other Projects">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group p-6 bg-bg-card/40 border border-arc-dim/50 rounded-xl hover:border-arc transition"
          >
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <span className="text-muted group-hover:text-arc transition">↗</span>
            </div>
            <div className="text-muted text-sm mb-4">{p.tagline}</div>
            <p className="text-ink/80 text-sm leading-relaxed mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 bg-arc/10 border border-arc-dim/50 rounded text-arc font-mono text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

// =========================================================================
// Skills
// =========================================================================
function Skills() {
  const groups = [
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
    <Section title="Skills">
      <div className="grid md:grid-cols-2 gap-6">
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="font-mono text-arc text-xs tracking-[0.2em] mb-3">{g.title}</h4>
            <div className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-bg-card/60 border border-arc-dim/50 rounded text-sm"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// =========================================================================
// Contact
// =========================================================================
function Contact() {
  const links = [
    {label: 'GitHub', href: 'https://github.com/ManojMShetty', hint: 'github.com/ManojMShetty'},
    {label: 'LinkedIn', href: 'https://linkedin.com/in/manoj-m-c', hint: 'linkedin.com/in/manoj-m-c'},
    {label: 'Email', href: 'mailto:manojmshetty12@gmail.com', hint: 'manojmshetty12@gmail.com'},
  ];
  return (
    <Section id="contact" title="Contact">
      <div className="max-w-2xl">
        <p className="text-xl text-ink/90 mb-8">
          I&apos;m looking for AI engineering roles where the work is real — agentic
          systems, voice AI, LLM orchestration. If that&apos;s you, get in touch.
        </p>
        <div className="space-y-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-baseline justify-between p-4 bg-bg-card/40 border border-arc-dim/50 rounded-lg hover:border-arc transition group"
            >
              <span className="font-mono text-arc text-xs tracking-[0.2em]">{l.label}</span>
              <span className="text-ink group-hover:text-arc transition">{l.hint} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

// =========================================================================
// Section wrapper
// =========================================================================
function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-24 px-6 border-t border-arc-dim/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-muted text-lg">{subtitle}</p>}
        </div>
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
    <footer className="py-12 px-6 border-t border-arc-dim/20 text-center">
      <div className="font-mono text-xs text-muted tracking-[0.2em]">
        © 2026 MANOJ M C · BENGALURU · BUILT WITH NEXT.JS + REMOTION
      </div>
    </footer>
  );
}
