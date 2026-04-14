'use client';

import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Zap, TrendingUp } from 'lucide-react';

const ARTICLES = [
  {
    slug: 'science-of-brain-games',
    emoji: '🧠',
    title: 'Notes on Brain Games and Daily Puzzle Habits',
    excerpt: 'A studio note on why short puzzle sessions can feel different from passive scrolling, and where those limits still matter.',
    readTime: '10 min read',
    date: 'March 2026',
    color: '#00d4ff',
    category: 'Notes'
  },
  {
    slug: 'history-of-word-games',
    emoji: '📖',
    title: 'From Letter Tiles to Daily Browser Puzzles',
    excerpt: 'A lightweight look at how familiar word-game ideas keep getting remixed for the web.',
    readTime: '12 min read',
    date: 'March 2026',
    color: '#ff2d78',
    category: 'History'
  },
  {
    slug: 'multiplayer-gaming-social-benefits',
    emoji: '🤝',
    title: 'Why Small Multiplayer Rooms Still Work Online',
    excerpt: 'A closer look at why room codes, short rounds, and shared reactions remain useful social features.',
    readTime: '9 min read',
    date: 'March 2026',
    color: '#00ff94',
    category: 'Social'
  },
  {
    slug: 'screen-time-vs-game-time',
    emoji: '⏱️',
    title: 'Thinking Carefully About Screen Time and Game Time',
    excerpt: 'A more measured take on how structured play differs from passive use, without pretending every game session is automatically healthy.',
    readTime: '11 min read',
    date: 'March 2026',
    color: '#b14aed',
    category: 'Wellness'
  },
  {
    slug: 'emoji-communication-guide',
    emoji: '😂',
    title: 'Emoji Puzzles, Wordplay, and Shared Context',
    excerpt: 'A short piece on why emoji clues work best when players bring their own cultural context to the puzzle.',
    readTime: '8 min read',
    date: 'March 2026',
    color: '#ffe600',
    category: 'Culture'
  },
  {
    slug: 'socratic-method-discovery',
    emoji: '❓',
    title: 'The Socratic Method: Why Questions are Better than Answers',
    excerpt: 'A practical note on why open-ended questioning can lead to better discussion than rushing straight to answers.',
    readTime: '12 min read',
    date: 'April 2026',
    color: '#00d4ff',
    category: 'Science'
  },
  {
    slug: 'cognitive-load-mastery',
    emoji: '🧠',
    title: 'Cognitive Load Theory: Protecting the Working Memory',
    excerpt: 'Understanding the biological limits of the brain to design better learning experiences for kids.',
    readTime: '15 min read',
    date: 'April 2026',
    color: '#ff2d78',
    category: 'Education'
  },
  {
    slug: 'spacing-effect-memory',
    emoji: '⏳',
    title: 'The Spacing Effect: Why Cramming is Biologically Inefficient',
    excerpt: 'How spaced repetition facilitates long-term memory consolidation through synaptic plasticity.',
    readTime: '10 min read',
    date: 'April 2026',
    color: '#00ff94',
    category: 'Neuroscience'
  },
  {
    slug: 'metacognition-thinking',
    emoji: '🔍',
    title: 'Metacognition: Teaching Kids to Think About Their Thinking',
    excerpt: 'A short note on reflection, self-checking, and why feedback-heavy tasks can help people notice their own thinking.',
    readTime: '9 min read',
    date: 'April 2026',
    color: '#b14aed',
    category: 'Cognition'
  },
  {
    slug: 'executive-function-control',
    emoji: '🎮',
    title: 'Executive Function: The Brain’s Air Traffic Control',
    excerpt: 'A grounded look at games that ask players to wait, switch rules, and manage attention under light pressure.',
    readTime: '11 min read',
    date: 'April 2026',
    color: '#ffe600',
    category: 'Development'
  },
  {
    slug: 'philosophy-for-children',
    emoji: '🏛️',
    title: 'Philosophy for Children: Big Questions for Small Humans',
    excerpt: 'Why structured philosophical discussion can be a useful way to practice listening, definition, and disagreement.',
    readTime: '13 min read',
    date: 'April 2026',
    color: '#ff8c00',
    category: 'Philosophy'
  },
  {
    slug: 'probabilistic-decisions',
    emoji: '🎲',
    title: 'Probabilistic Thinking: Navigating a World of Uncertainty',
    excerpt: 'Teaching children to distinguish between theoretical probability and actual outcomes through play.',
    readTime: '11 min read',
    date: 'April 2026',
    color: '#00bfff',
    category: 'Logic'
  },
  {
    slug: 'aha-moment-science',
    emoji: '💡',
    title: 'The Neuroscience of "Aha!" Moments',
    excerpt: 'A note on why sudden insight feels dramatic, and why problem-solving often looks messy right before it clicks.',
    readTime: '10 min read',
    date: 'April 2026',
    color: '#ffd700',
    category: 'Research'
  },
  {
    slug: 'logical-reasoning-logic',
    emoji: '🔗',
    title: 'The Bedrock of Thinking: Logical Reasoning for Kids',
    excerpt: 'A practical look at pattern recognition, clear claims, and why reasoning habits matter outside school too.',
    readTime: '14 min read',
    date: 'April 2026',
    color: '#adff2f',
    category: 'Skills'
  },
  {
    slug: 'chess-visual-logic',
    emoji: '♟️',
    title: 'Visual Logic: How Chess Trains the Multi-Process Mind',
    excerpt: 'Why chess is often used as a clean example of visual planning, pattern recognition, and board-state awareness.',
    readTime: '12 min read',
    date: 'April 2026',
    color: '#ffffff',
    category: 'Strategy'
  }
];

export default function BlogPage() {
  return (
    <div className="page-container animate-fade-in">
      <section style={{ textAlign: 'center', marginBottom: 56 }}>
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
          <BookOpen size={16} /> Studio Notes
        </div>
        <h1 className="hero-title" style={{ fontSize: 48 }}>
          The <span>Vibe</span> Blog
        </h1>
        <p className="hero-desc" style={{ maxWidth: 640, margin: '0 auto' }}>
          A small archive of notes, experiments, and commentary related to the games on VIBEMENOW.
          These pieces are meant as supporting reading, not the main value of the site.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto 48px auto' }}>
        <Link href={`/blog/${ARTICLES[0].slug}`} style={{ textDecoration: 'none' }}>
          <div
            className="card"
            style={{
              padding: '48px 40px',
              borderLeft: `4px solid ${ARTICLES[0].color}`,
              cursor: 'pointer',
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.03), rgba(255, 45, 120, 0.03))',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                borderRadius: 999,
                background: `${ARTICLES[0].color}15`,
                color: ARTICLES[0].color,
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 16,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <TrendingUp size={12} /> Featured Note
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
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      color: ARTICLES[0].color,
                      fontWeight: 700,
                    }}
                  >
                    Read Note <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f0f0', marginBottom: 24 }}>
          All Notes
        </h2>
        <div style={{ display: 'grid', gap: 20 }}>
          {ARTICLES.map((article, i) => (
            <Link href={`/blog/${article.slug}`} key={i} style={{ textDecoration: 'none' }}>
              <div
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                  padding: '28px 32px',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${article.color}`,
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    lineHeight: 1,
                    background: `${article.color}10`,
                    borderRadius: 16,
                    padding: '12px 14px',
                    flexShrink: 0,
                  }}
                >
                  {article.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        background: `${article.color}15`,
                        color: article.color,
                        textTransform: 'uppercase',
                      }}
                    >
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
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: article.color,
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
        </div>
      </section>
    </div>
  );
}
