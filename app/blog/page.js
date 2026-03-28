'use client';

import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Zap, TrendingUp } from 'lucide-react';

const ARTICLES = [
  {
    slug: 'science-of-brain-games',
    emoji: '🧠',
    title: 'The Science Behind Brain Games: How Daily Puzzles Sharpen Your Mind',
    excerpt: 'Explore the neuroscience research behind cognitive gaming and discover how just 5 minutes of daily puzzle-solving can measurably improve memory, focus, and mental agility.',
    readTime: '10 min read',
    date: 'March 2026',
    color: '#00d4ff',
    category: 'Science'
  },
  {
    slug: 'history-of-word-games',
    emoji: '📖',
    title: 'From Scrabble to WordVibe: The Fascinating History of Word Games',
    excerpt: 'A deep dive into the 100-year evolution of word games, from wooden letter tiles to real-time browser competitions, and why they remain humanity\'s favourite mental workout.',
    readTime: '12 min read',
    date: 'March 2026',
    color: '#ff2d78',
    category: 'Culture'
  },
  {
    slug: 'multiplayer-gaming-social-benefits',
    emoji: '🤝',
    title: 'Why Multiplayer Browser Games Are the New Social Currency',
    excerpt: 'How casual multiplayer games like Quiz Arena and Reaction Arena are replacing traditional social media as the way Gen Z and Millennials connect, bond, and compete.',
    readTime: '9 min read',
    date: 'March 2026',
    color: '#00ff94',
    category: 'Social'
  },
  {
    slug: 'screen-time-vs-game-time',
    emoji: '⏱️',
    title: 'Screen Time vs. Game Time: Why Not All Digital Minutes Are Equal',
    excerpt: 'A research-backed analysis of how structured, short-form gaming sessions differ fundamentally from passive scrolling, and why health experts are rethinking the \"screen time\" debate.',
    readTime: '11 min read',
    date: 'March 2026',
    color: '#b14aed',
    category: 'Wellness'
  },
  {
    slug: 'emoji-communication-guide',
    emoji: '😂',
    title: 'The Complete Guide to Emoji Communication in 2026',
    excerpt: 'Emojis have evolved from simple smiley faces to a complex visual language used by billions. Learn how emoji literacy powers games like Emoji IQ and shapes modern digital conversation.',
    readTime: '8 min read',
    date: 'March 2026',
    color: '#ffe600',
    category: 'Culture'
  }
];

export default function BlogPage() {
  return (
    <div className="page-container animate-fade-in">
      {/* Header / Hero */}
      <section style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 999,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 16
        }}>
          <BookOpen size={16} /> VIBEMENOW Editorial
        </div>
        <h1 className="hero-title" style={{ fontSize: 48 }}>
          The <span>Vibe</span> Blog
        </h1>
        <p className="hero-desc" style={{ maxWidth: 640, margin: '0 auto' }}>
          Original research, expert analysis, and deep dives into the science of gaming, 
          digital culture, and cognitive wellness. Written by the VIBEMENOW editorial team.
        </p>
      </section>

      {/* Featured Article */}
      <section style={{ maxWidth: 900, margin: '0 auto 48px auto' }}>
        <Link href={`/blog/${ARTICLES[0].slug}`} style={{ textDecoration: 'none' }}>
          <div className="card" style={{
            padding: '48px 40px',
            borderLeft: `4px solid ${ARTICLES[0].color}`,
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.03), rgba(255, 45, 120, 0.03))',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '4px 12px', borderRadius: 999,
              background: `${ARTICLES[0].color}15`, color: ARTICLES[0].color,
              fontSize: 12, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              <TrendingUp size={12} /> Featured Article
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
              <div style={{ fontSize: 56, lineHeight: 1, flexShrink: 0 }}>{ARTICLES[0].emoji}</div>
              <div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f0f0f0', marginBottom: 12, lineHeight: 1.3 }}>
                  {ARTICLES[0].title}
                </h2>
                <p style={{ color: '#999', fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                  {ARTICLES[0].excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#555' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={14} /> {ARTICLES[0].readTime}
                  </span>
                  <span>{ARTICLES[0].date}</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    color: ARTICLES[0].color, fontWeight: 700
                  }}>
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* All Articles */}
      <section style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f0f0', marginBottom: 24 }}>
          All Articles
        </h2>
        <div style={{ display: 'grid', gap: 20 }}>
          {ARTICLES.map((article, i) => (
            <Link href={`/blog/${article.slug}`} key={i} style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                display: 'flex', alignItems: 'flex-start', gap: 20,
                padding: '28px 32px', cursor: 'pointer',
                borderLeft: `4px solid ${article.color}`,
                transition: 'transform 0.2s, border-color 0.2s'
              }}>
                <div style={{
                  fontSize: 36, lineHeight: 1,
                  background: `${article.color}10`,
                  borderRadius: 16, padding: '12px 14px',
                  flexShrink: 0
                }}>
                  {article.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                      background: `${article.color}15`, color: article.color, textTransform: 'uppercase'
                    }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: 12, color: '#555' }}>{article.date}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#f0f0f0', marginBottom: 6 }}>
                    {article.title}
                  </h3>
                  <p style={{ color: '#888', fontSize: 14, lineHeight: 1.5, marginBottom: 10 }}>
                    {article.excerpt}
                  </p>
                  <span style={{
                    fontSize: 12, fontWeight: 700, color: article.color,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>
                    Read Article <Zap size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section style={{ maxWidth: 900, margin: '64px auto 0 auto', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,45,120,0.08), rgba(177,74,237,0.08), rgba(0,212,255,0.08))',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '48px 32px'
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📚</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: '#fff' }}>
            Want More <span style={{ color: '#ff2d78' }}>Vibe</span> Content?
          </h2>
          <p style={{ color: '#888', fontSize: 15, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px auto' }}>
            Check out our expert game guides for pro tips, winning strategies, and 
            the psychology behind your favourite VIBEMENOW games.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/guides">
              <button className="btn-primary" style={{ padding: '12px 28px' }}>📖 Game Guides</button>
            </Link>
            <Link href="/#games-listing">
              <button className="btn-outline" style={{ padding: '12px 28px' }}>🎮 Play Games</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
