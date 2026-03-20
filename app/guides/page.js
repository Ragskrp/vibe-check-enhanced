'use client';

import Link from 'next/link';
import { BookOpen, Zap } from 'lucide-react';

const GUIDES = [
  {
    emoji: '✨',
    title: 'The Ultimate Vibe Quiz Guide',
    desc: 'How to accurately discover your personality archetype and share it with the world.',
    href: '/guides/vibe-quiz-mastery',
    color: '#ff2d78'
  },
  {
    emoji: '⚡',
    title: 'Mastering Reaction Arena',
    desc: 'Pro tips to improve your millisecond response time and dominate the local leaderboards.',
    href: '/guides/reaction-arena-tips',
    color: '#00d4ff'
  },
  {
    emoji: '😈',
    title: 'The Psychology of Would You Rather',
    desc: 'Why we choose impossible scenarios and what it says about your decision making.',
    href: '/guides/would-you-rather-psychology',
    color: '#b14aed'
  },
  {
    emoji: '🔤',
    title: 'WordVibe Mastery Strategies',
    desc: "Linguistics, frequency analysis, and the 'starter word' secret to guessing in 3.",
    href: '/guides/wordvibe-strategies',
    color: '#00d4ff'
  },
  {
    emoji: '😂',
    title: 'Decoding the Emoji Language',
    desc: 'The linguistics, pattern recognition, and cultural fluency behind emoji puzzles.',
    href: '/guides/emoji-iq-mastery',
    color: '#ffe600'
  },
  {
    emoji: '🌍',
    title: 'Geography Guesser World Knowledge',
    desc: 'Flag patterns, memory techniques, and why geography games matter in 2026.',
    href: '/guides/geography-guesser-tips',
    color: '#00ff94'
  }
];

export default function GuidesPage() {
  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <section style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 999,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 16
        }}>
          <BookOpen size={16} /> Expert Resources
        </div>
        <h1 className="hero-title" style={{ fontSize: 48 }}>
          Game Guides & <span>Expert Insights</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: 600, margin: '0 auto' }}>
          Deep dives into the mechanics, psychology, and mastery of your favourite games. 
          Original research and strategies by the VIBEMENOW editorial team.
        </p>
      </section>

      {/* Guides Grid */}
      <section style={{ display: 'grid', gap: 20, maxWidth: 900, margin: '0 auto' }}>
        {GUIDES.map((guide, i) => (
          <Link href={guide.href} key={i} style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              display: 'flex', alignItems: 'flex-start', gap: 20,
              padding: '28px 32px', cursor: 'pointer',
              borderLeft: `4px solid ${guide.color}`,
              transition: 'transform 0.2s, border-color 0.2s'
            }}>
              <div style={{
                fontSize: 36, lineHeight: 1,
                background: `${guide.color}10`,
                borderRadius: 16, padding: '12px 14px',
                flexShrink: 0
              }}>
                {guide.emoji}
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#f0f0f0', marginBottom: 6 }}>
                  {guide.title}
                </h2>
                <p style={{ color: '#888', fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>
                  {guide.desc}
                </p>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: guide.color,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  Read the guide <Zap size={12} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
