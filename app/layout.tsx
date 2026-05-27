import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manoj M C — AI Engineer',
  description:
    'AI engineer building production multi-agent systems and voice-first AI. Architect of xTrac AI. Creator of Maxi — JARVIS-style voice assistant on Claude Code.',
  openGraph: {
    title: 'Manoj M C — AI Engineer',
    description:
      'Building agentic AI: xTrac AI at iEllipse, Maxi voice assistant on Claude Code.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
