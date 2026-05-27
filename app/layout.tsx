import type {Metadata} from 'next';
import {Inter, Space_Grotesk} from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Manoj M C — AI Engineer',
  description:
    'AI engineer building production multi-agent systems and voice-first AI. Architect of xTrac AI. Creator of Maxi — JARVIS-style voice assistant on Claude Code.',
  metadataBase: new URL('https://manojmshetty.vercel.app'),
  openGraph: {
    title: 'Manoj M C — AI Engineer',
    description:
      'Building agentic AI: xTrac AI at iEllipse, Maxi voice assistant on Claude Code.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manoj M C — AI Engineer',
    description: 'Building agentic AI · xTrac AI · Maxi voice assistant',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
