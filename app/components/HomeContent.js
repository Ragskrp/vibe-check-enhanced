'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Sparkles, Users, TrendingUp, Search, X } from 'lucide-react';
import AdBanner from './AdBanner';

const GAMES = [
  {
    emoji: '🔤',
    title: 'WordVibe',
    desc: 'Daily 5-letter word challenge. Guess it in 6 tries!',
    path: '/wordvibe',
    tag: 'Daily',
    color: '#00d4ff',
    category: 'daily'
  },
  {
    emoji: '🎯',
    title: 'Vibe or Die',
    desc: 'Quick-fire reaction game. How fast are your reflexes?',
    path: '/vibeordie',
    tag: 'Reaction',
    color: '#ff2d78',
    category: 'solo'
  },
  {
    emoji: '😂',
    title: 'Emoji IQ',
    desc: 'Decode emoji puzzles. Can you guess what they mean?',
    path: '/emoji-iq',
    tag: 'Brain',
    color: '#ffe600',
    category: 'daily'
  },
  {
    emoji: '🔥',
    title: 'Hot Takes',
    desc: 'Vote on spicy opinions. Do you agree or disagree?',
    path: '/hot-takes',
    tag: 'Viral',
    color: '#ff6b35',
    category: 'daily'
  },
  {
    emoji: '✨',
    title: 'Vibe Quiz',
    desc: 'What vibe are you? Take the personality quiz to find out!',
    path: '/vibe-quiz',
    tag: 'Personality',
    color: '#b14aed',
    category: 'daily'
  },
  {
    emoji: '😈',
    title: 'Would U Rather',
    desc: 'Impossible choices. Pick one or the other. No skipping!',
    path: '/would-you-rather',
    tag: 'Social',
    color: '#00ff94',
    category: 'daily'
  },
  {
    emoji: '🏆',
    title: 'Quiz Arena',
    desc: 'Multiplayer trivia showdown. Create a room & compete!',
    path: '/quiz-arena',
    tag: 'Multiplayer',
    color: '#00d4ff',
    category: 'multiplayer'
  },
  {
    emoji: '⚡',
    title: 'Reaction Arena',
    desc: 'Multiplayer reflex battle. Who is the fastest in the room?',
    path: '/reaction-arena',
    tag: 'Multiplayer',
    color: '#ff2d78',
    category: 'multiplayer'
  },
  {
    emoji: '👁️',
    title: 'Odd One Out',
    desc: 'Find the hidden symbol. A fast-paced perception race!',
    path: '/odd-one-out',
    tag: 'Multiplayer',
    color: '#00ff94',
    category: 'multiplayer'
  },
  {
    emoji: '🧠',
    title: 'Memory Arena',
    desc: 'Group memory challenge. Last player standing wins!',
    path: '/memory-arena',
    tag: 'Multiplayer',
    color: '#b14aed',
    category: 'multiplayer'
  },
  {
    emoji: '🗳️',
    title: 'Poll Party',
    desc: 'Funny prompts and voting. Best vibe takes the crown!',
    path: '/poll-party',
    tag: 'Multiplayer',
    color: '#ff6b35',
    category: 'multiplayer'
  },
  {
    emoji: '🎨',
    title: 'Drawing Dash',
    desc: 'One draws, many guess. A real-time creative showdown!',
    path: '/drawing-dash',
    tag: 'Multiplayer',
    color: '#00d4ff',
    category: 'multiplayer'
  },
  {
    emoji: '🌍',
    title: 'Geo Guesser',
    desc: 'Test your world knowledge. How many flags can you identify?',
    path: '/geography-guesser',
    tag: 'Solo',
    color: '#00d4ff',
    category: 'solo'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Games', icon: '🎮' },
  { id: 'daily', name: 'Daily Vibes', icon: '✨' },
  { id: 'multiplayer', name: 'Party Games', icon: '🔥' },
  { id: 'solo', name: 'Fast & Fun', icon: '⚡' },
];

export default function HomeContent() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredGames = GAMES.filter(game => {
    const matchesFilter = filter === 'all' || game.category === filter;
    const s = search.toLowerCase();
    const matchesSearch = game.title.toLowerCase().includes(s) || 
                          game.desc.toLowerCase().includes(s) || 
                          game.tag.toLowerCase().includes(s);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section animate-fade-in">
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: '#00d4ff', textTransform: 'uppercase', marginBottom: 8 }}>
          🎮 FREE DAILY GAMES — NO LOGIN REQUIRED
        </div>
        <h1 className="hero-title">
          VIBE<span>MENOW</span>
        </h1>
        <p className="hero-desc">
          Fast, addictive, bite-sized daily games designed to brighten your mood and challenge your brain. Play now ⚡
        </p>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">13</div>
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

      {/* Control Bar */}
      <section id="games-listing" style={{ marginTop: 40, marginBottom: 32 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', flex: 1 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`btn-outline ${filter === cat.id ? 'active' : ''}`}
                style={{ 
                  whiteSpace: 'nowrap',
                  borderColor: filter === cat.id ? 'var(--primary)' : 'var(--border-light)',
                  color: filter === cat.id ? 'var(--primary)' : 'var(--text-muted)',
                  background: filter === cat.id ? 'rgba(255, 45, 120, 0.1)' : 'transparent'
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
            <input 
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '44px', marginBottom: 0 }}
            />
            {search && (
              <X 
                size={16} 
                onClick={() => setSearch('')}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#555', cursor: 'pointer' }} 
              />
            )}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner format="horizontal" />

      {/* Games Grid */}
      <section style={{ marginTop: 20 }}>
        <div className="game-grid">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
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
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#555' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '20px', color: '#f0f0f0' }}>No games found matching your search.</h3>
              <p>Try a different keyword or category!</p>
            </div>
          )}
        </div>
      </section>

      {/* Mid-page Ad */}
      <AdBanner format="rectangle" />

      {/* Feature Highlights */}
      <section style={{ marginTop: 48, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, color: '#f0f0f0' }}>
          Why VIBEMENOW? 🤔
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
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>13 Game Modes</h3>
            <p style={{ color: '#888', fontSize: 13 }}>Word games, trivia, geography, drawing & fast reflexes!</p>
          </div>
          <Link href="/guides" className="card" style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: '#fff' }}>Expert Guides</h3>
            <p style={{ color: '#888', fontSize: 13 }}>Learn pro tips and the psychology behind our viral games.</p>
          </Link>
        </div>
      </section>

      {/* Mission & FAQ Section for AdSense Value */}
      <section style={{ 
        marginTop: 64, 
        padding: '60px 0', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'left',
        maxWidth: '900px',
        margin: '64px auto 0 auto'
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 24, color: '#fff' }}>
          About the <span style={{ color: '#00d4ff' }}>VIBEMENOW</span> Experience
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
          <div style={{ color: '#888', lineHeight: '1.7' }}>
            <h3 style={{ color: '#eee', fontSize: 18, marginBottom: 16 }}>🎮 The Future of Micro-Gaming</h3>
            <p>
              VIBEMENOW is designed for the modern web—a fast, secure, and instant gaming platform built for 2026. We believe that the best gaming experiences shouldn't be hidden behind complex login forms or subscription paywalls. Whether you're here for your daily <strong>WordVibe</strong> challenge or a <strong>Quiz Arena</strong> showdown with friends, we provide high-performance games that respect your time and privacy.
            </p>
          </div>
          <div style={{ color: '#888', lineHeight: '1.7' }}>
            <h3 style={{ color: '#eee', fontSize: 18, marginBottom: 16 }}>✨ Why Play Daily?</h3>
            <p>
              Every game on our platform is carefully curated to be bite-sized. We focus on "daily resets," meaning new puzzles, new trivia questions, and new reaction challenges are pushed live every 24 hours. Research in cognitive psychology shows that short, varied mental exercises can significantly improve focus and well-being. Our "vibe-algorithm" ensures that no two days are ever the same.
            </p>
          </div>
          <div style={{ color: '#888', lineHeight: '1.7' }}>
            <h3 style={{ color: '#eee', fontSize: 18, marginBottom: 16 }}>🌐 A Global Multiplayer Hub</h3>
            <p>
              More than just solo play, VIBEMENOW is built on real-time multiplayer technology. Create a "Vibe Room" in seconds and invite friends to compete in <strong>Reaction Arena</strong> or <strong>Odd One Out</strong>. We use low-latency edge computing to ensure a smooth experience for players around the world, making us the perfect companion for remote parties or office breaks.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 48, padding: '32px', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 16, textAlign: 'center' }}>Vibe Check: Frequently Asked Questions</h3>
          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <p style={{ color: '#eee', fontWeight: 600, marginBottom: 4 }}>Is VIBEMENOW really free?</p>
              <p style={{ color: '#777', fontSize: 14 }}>Yes! We are funded purely through non-intrusive advertisements. Every game mode, from single-player to multiplayer, is available without an account or payment.</p>
            </div>
            <div>
              <p style={{ color: '#eee', fontWeight: 600, marginBottom: 4 }}>How do I share my results?</p>
              <p style={{ color: '#777', fontSize: 14 }}>Every game concludes with a "Vibe Summary." Use the share button to copy your scores in a viral-friendly format for Discord, WhatsApp, or Twitter.</p>
            </div>
            <div>
              <p style={{ color: '#eee', fontWeight: 600, marginBottom: 4 }}>Are you adding more games?</p>
              <p style={{ color: '#777', fontSize: 14 }}>Absolutely. Our development team releases a new major game mode or enhancement every month. Check our <Link href="/guides" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Expert Guides</Link> for the latest tips.</p>
            </div>
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
