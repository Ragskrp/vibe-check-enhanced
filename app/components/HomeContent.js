'use client';

import Link from 'next/link';
import { Trophy, Sparkles, Users, TrendingUp } from 'lucide-react';
import AdBanner from './AdBanner';

const GAMES = [
  {
    emoji: '🔤',
    title: 'WordVibe',
    desc: 'Daily 5-letter word challenge. Guess it in 6 tries!',
    path: '/wordvibe',
    tag: 'Daily Challenge',
    color: '#00d4ff'
  },
  {
    emoji: '🎯',
    title: 'Vibe or Die',
    desc: 'Quick-fire reaction game. How fast are your reflexes?',
    path: '/vibeordie',
    tag: 'Reaction Game',
    color: '#ff2d78'
  },
  {
    emoji: '😂',
    title: 'Emoji IQ',
    desc: 'Decode emoji puzzles. Can you guess what they mean?',
    path: '/emoji-iq',
    tag: 'Brain Teaser',
    color: '#ffe600'
  },
  {
    emoji: '🔥',
    title: 'Hot Takes',
    desc: 'Vote on spicy opinions. Do you agree or disagree?',
    path: '/hot-takes',
    tag: 'Viral Content',
    color: '#ff6b35'
  },
  {
    emoji: '✨',
    title: 'Vibe Quiz',
    desc: 'What vibe are you? Take the personality quiz to find out!',
    path: '/vibe-quiz',
    tag: 'Personality Quiz',
    color: '#b14aed'
  },
  {
    emoji: '😈',
    title: 'Would U Rather',
    desc: 'Impossible choices. Pick one or the other. No skipping!',
    path: '/would-you-rather',
    tag: 'Social Game',
    color: '#00ff94'
  },
  {
    emoji: '🏆',
    title: 'Quiz Arena',
    desc: 'Multiplayer trivia showdown. Create a room & compete!',
    path: '/quiz-arena',
    tag: 'Multiplayer',
    color: '#00d4ff'
  }
];

export default function HomeContent() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section animate-fade-in">
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: '#00d4ff', textTransform: 'uppercase', marginBottom: 8 }}>
          🎮 FREE DAILY GAMES — NO LOGIN REQUIRED
        </div>
        <h1 className="hero-title">
          VIBE<span>CHECK</span>
        </h1>
        <p className="hero-desc">
          Fast, addictive, bite-sized daily games designed to brighten your mood and challenge your brain. Play now ⚡
        </p>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">7</div>
            <div className="stat-label">Games</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">∞</div>
            <div className="stat-label">Fun</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Login Needed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24h</div>
            <div className="stat-label">New Content</div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="home-top" format="horizontal" />

      {/* Games Grid */}
      <section style={{ marginTop: 32 }}>
        <h2 style={{ 
          fontSize: 24, 
          fontWeight: 800, 
          color: '#f0f0f0',
          marginBottom: 24,
          textAlign: 'center'
        }}>
          🎮 Pick Your Vibe
        </h2>
        <div className="game-grid">
          {GAMES.map((game) => (
            <Link href={game.path} key={game.title} style={{ textDecoration: 'none' }}>
              <div className="game-card">
                <div className="game-card-emoji">{game.emoji}</div>
                <h3 className="game-card-title">{game.title}</h3>
                <p className="game-card-desc">{game.desc}</p>
                <span className="game-card-tag" style={{ 
                  background: `${game.color}15`,
                  color: game.color 
                }}>
                  {game.tag}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mid-page Ad */}
      <AdBanner slot="home-mid" format="rectangle" />

      {/* Feature Highlights */}
      <section style={{ marginTop: 48, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, color: '#f0f0f0' }}>
          Why VIBECHECK? 🤔
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <div className="card" style={{ textAlign: 'center', cursor: 'default' }}>
            <Trophy size={32} color="#ffe600" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Daily Challenges</h3>
            <p style={{ color: '#888', fontSize: 13 }}>New content every single day. Come back for fresh vibes!</p>
          </div>
          <div className="card card-glow-cyan" style={{ textAlign: 'center', cursor: 'default' }}>
            <Sparkles size={32} color="#00d4ff" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>No Login Required</h3>
            <p style={{ color: '#888', fontSize: 13 }}>Jump right in. No accounts, no signups. Just play!</p>
          </div>
          <div className="card" style={{ textAlign: 'center', cursor: 'default' }}>
            <Users size={32} color="#00ff94" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Share Results</h3>
            <p style={{ color: '#888', fontSize: 13 }}>Flex your scores on social media. Challenge your friends!</p>
          </div>
          <div className="card card-glow-yellow" style={{ textAlign: 'center', cursor: 'default' }}>
            <TrendingUp size={32} color="#ff2d78" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>7 Game Modes</h3>
            <p style={{ color: '#888', fontSize: 13 }}>Word games, quizzes, reactions, trivia & more!</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', marginTop: 48, padding: '40px 0' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255,45,120,0.1), rgba(177,74,237,0.1), rgba(0,212,255,0.1))',
          border: '2px solid rgba(255,45,120,0.2)',
          borderRadius: 24,
          padding: '40px 24px'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Ready to <span style={{ color: '#ff2d78' }}>Vibe</span>?
          </h2>
          <p style={{ color: '#888', fontSize: 15, marginBottom: 24 }}>
            Pick any game above and start playing. Zero setup required.
          </p>
          <Link href="/wordvibe">
            <button className="btn-primary" style={{ fontSize: 18 }}>
              🔤 Start with WordVibe
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
