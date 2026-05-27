# manoj-portfolio

Personal portfolio website for Manoj M C. Next.js 15 (App Router) + Tailwind CSS, with the
Maxi explainer composition embedded live via `@remotion/player`.

## Stack

- **Next.js 15** — App Router, RSC where possible, client-only for the Remotion Player
- **Tailwind CSS** — arc-reactor palette (`bg`, `arc`, `gold`, `ink`, `muted`)
- **@remotion/player** — embeds the Maxi explainer composition as a live, in-browser
  React-rendered video (no MP4 dependency)
- **TypeScript** strict mode

## Run locally

```powershell
cd $env:USERPROFILE\portfolio
npm install
npm run dev
```

Opens at http://localhost:3000.

## Production build

```powershell
npm run build
npm start
```

## Deploy to Vercel (recommended)

```powershell
npm i -g vercel
vercel
```

Pick the defaults. Vercel auto-detects Next.js, builds, and gives you a `*.vercel.app`
URL within a minute. To add a custom domain, follow the prompt or add it later in the
Vercel dashboard.

## Structure

```
portfolio/
├── app/
│   ├── layout.tsx       — root layout + metadata
│   ├── page.tsx         — single-page portfolio (all sections)
│   └── globals.css      — Tailwind + custom utilities
├── components/
│   └── MaxiPlayer.tsx   — client component wrapping <Player>
├── remotion/
│   └── MaxiExplainer.tsx — the same composition rendered in the Maxi repo's explainer/
└── tailwind.config.ts   — palette + animations
```

## Updating the Maxi composition

The composition is currently a *copy* of
[../Maxi/explainer/src/MaxiExplainer.tsx](../Maxi/explainer/src/MaxiExplainer.tsx). When
you update the Maxi explainer, sync this file:

```powershell
Copy-Item $env:USERPROFILE\Maxi\explainer\src\MaxiExplainer.tsx $env:USERPROFILE\portfolio\remotion\MaxiExplainer.tsx -Force
```

(Or set up a git submodule / symlink if you'd rather keep them in lockstep automatically.)
