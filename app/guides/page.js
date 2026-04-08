'use client';

import Link from 'next/link';
import { BookOpen, Zap } from 'lucide-react';

const GUIDES = [
  {
    emoji: '✨',
    title: 'Vibe Quiz Notes',
    desc: 'A short write-up on how the quiz is structured and why the results should be treated as entertainment.',
    href: '/guides/vibe-quiz-mastery',
    color: '#ff2d78'
  },
  {
    emoji: '⚡',
    title: 'Reaction Arena Tips',
    desc: 'Simple ideas for reading the signal quickly and staying ready during room-based reflex rounds.',
    href: '/guides/reaction-arena-tips',
    color: '#00d4ff'
  },
  {
    emoji: '😈',
    title: 'Would You Rather Notes',
    desc: 'What makes a good dilemma and why some questions split people more evenly than others.',
    href: '/guides/would-you-rather-psychology',
    color: '#b14aed'
  },
  {
    emoji: '🔤',
    title: 'WordVibe Strategies',
    desc: 'Practical starter-word ideas and a few ways to avoid wasting guesses.',
    href: '/guides/wordvibe-strategies',
    color: '#00d4ff'
  },
  {
    emoji: '😂',
    title: 'Emoji IQ Notes',
    desc: 'Patterns that show up often in emoji puzzles, including literal clues and wordplay.',
    href: '/guides/emoji-iq-mastery',
    color: '#ffe600'
  },
  {
    emoji: '🌍',
    title: 'Geography Guesser Notes',
    desc: 'A few reliable ways to group similar flags and improve recognition over time.',
    href: '/guides/geography-guesser-tips',
    color: '#00ff94'
  }
];

export default function GuidesPage() {
  return (
    <div className="page-container animate-fade-in">
      <section style={{ textAlign: 'center', marginBottom: 48 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 13,
            fontWeight: 600,
            color: '#888',
            marginBottom: 16,
          }}
        >
          <BookOpen size={16} /> Player Notes
        </div>
        <h1 className="hero-title" style={{ fontSize: 48 }}>
          Game Guides & <span>Notes</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: 600, margin: '0 auto' }}>
          Short write-ups about selected games on the site. These pages support the games rather than
          replace them, and they are kept separate from the main indexed catalogue.
        </p>
      </section>

      <section style={{ display: 'grid', gap: 20, maxWidth: 900, margin: '0 auto' }}>
        {GUIDES.map((guide, i) => (
          <Link href={guide.href} key={i} style={{ textDecoration: 'none' }}>
            <div
              className="card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                padding: '28px 32px',
                cursor: 'pointer',
                borderLeft: `4px solid ${guide.color}`,
                transition: 'transform 0.2s, border-color 0.2s',
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  lineHeight: 1,
                  background: `${guide.color}10`,
                  borderRadius: 16,
                  padding: '12px 14px',
                  flexShrink: 0,
                }}
              >
                {guide.emoji}
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#f0f0f0', marginBottom: 6 }}>
                  {guide.title}
                </h2>
                <p style={{ color: '#888', fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>
                  {guide.desc}
                </p>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: guide.color,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Read Note <Zap size={12} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
