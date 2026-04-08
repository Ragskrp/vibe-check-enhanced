'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Sparkles, Users, TrendingUp, Search, X } from 'lucide-react';

const GAMES = [
  {
    emoji: '🔤',
    title: 'WordVibe',
    desc: 'Daily 5-letter word challenge. Guess it in 6 tries.',
    path: '/wordvibe',
    tag: 'Daily',
    color: '#00d4ff',
    category: 'daily'
  },
  {
    emoji: '🎯',
    title: 'Vibe or Die',
    desc: 'Reaction test with one job: click when the signal appears.',
    path: '/vibeordie',
    tag: 'Reaction',
    color: '#ff2d78',
    category: 'solo'
  },
  {
    emoji: '😂',
    title: 'Emoji IQ',
    desc: 'Decode emoji puzzles using context, wordplay, and common phrases.',
    path: '/emoji-iq',
    tag: 'Brain',
    color: '#ffe600',
    category: 'daily'
  },
  {
    emoji: '🔠',
    title: 'Vocab Vibe',
    desc: 'Match words to meanings in solo play or a live room with friends.',
    path: '/vocab-match',
    tag: 'Multiplayer',
    color: '#fbbf24',
    category: 'daily'
  },
  {
    emoji: '🔥',
    title: 'Hot Takes',
    desc: 'Vote agree or disagree and see how other players split.',
    path: '/hot-takes',
    tag: 'Opinion',
    color: '#ff6b35',
    category: 'daily'
  },
  {
    emoji: '✨',
    title: 'Vibe Quiz',
    desc: 'A playful personality-style quiz with shareable results.',
    path: '/vibe-quiz',
    tag: 'Quiz',
    color: '#b14aed',
    category: 'daily'
  },
  {
    emoji: '😈',
    title: 'Would U Rather',
    desc: 'Pick between two awkward, funny, or impossible choices.',
    path: '/would-you-rather',
    tag: 'Social',
    color: '#00ff94',
    category: 'daily'
  },
  {
    emoji: '🏆',
    title: 'Quiz Arena',
    desc: 'Create a room and race through multiplayer trivia rounds.',
    path: '/quiz-arena',
    tag: 'Multiplayer',
    color: '#00d4ff',
    category: 'multiplayer'
  },
  {
    emoji: '⚡',
    title: 'Reaction Arena',
    desc: 'A room-based reflex battle built for fast rematches.',
    path: '/reaction-arena',
    tag: 'Multiplayer',
    color: '#ff2d78',
    category: 'multiplayer'
  },
  {
    emoji: '👁️',
    title: 'Odd One Out',
    desc: 'Spot the hidden symbol before everyone else does.',
    path: '/odd-one-out',
    tag: 'Multiplayer',
    color: '#00ff94',
    category: 'multiplayer'
  },
  {
    emoji: '🧠',
    title: 'Memory Arena',
    desc: 'Room-based memory rounds where the last player standing wins.',
    path: '/memory-arena',
    tag: 'Multiplayer',
    color: '#b14aed',
    category: 'multiplayer'
  },
  {
    emoji: '🗳️',
    title: 'Poll Party',
    desc: 'Answer prompts, vote as a group, and see what lands.',
    path: '/poll-party',
    tag: 'Multiplayer',
    color: '#ff6b35',
    category: 'multiplayer'
  },
  {
    emoji: '🎨',
    title: 'Drawing Dash',
    desc: 'One player draws while the room tries to guess the answer.',
    path: '/drawing-dash',
    tag: 'Multiplayer',
    color: '#00d4ff',
    category: 'multiplayer'
  },
  {
    emoji: '🌍',
    title: 'Geo Guesser',
    desc: 'Identify world flags and build a faster recognition streak.',
    path: '/geography-guesser',
    tag: 'Solo',
    color: '#00d4ff',
    category: 'solo'
  },
  {
    emoji: '👆',
    title: 'Vibe Clicker',
    desc: 'Idle clicking game with upgrades, multipliers, and automation.',
    path: '/vibe-clicker',
    tag: 'Idle',
    color: '#00d4ff',
    category: 'solo'
  },
  {
    emoji: '🎮',
    title: 'Merge Vibe (2048)',
    desc: 'Slide and merge tiles until the board starts to fight back.',
    path: '/2048-vibe',
    tag: 'Puzzle',
    color: '#ff2d78',
    category: 'solo'
  },
  {
    emoji: '🕊️',
    title: 'Flappy Vibe',
    desc: 'Tap to stay in the air and squeeze through the gaps.',
    path: '/flappy-vibe',
    tag: 'Arcade',
    color: '#00ff94',
    category: 'solo'
  },
  {
    emoji: '🔨',
    title: 'Whack-a-Vibe',
    desc: 'Hit the bad targets, avoid the good ones, beat the clock.',
    path: '/whack-a-vibe',
    tag: 'Reaction',
    color: '#f59e0b',
    category: 'solo'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Games', icon: '🎮' },
  { id: 'daily', name: 'Daily Picks', icon: '🔥' },
  { id: 'multiplayer', name: 'Party Rooms', icon: '🎉' },
  { id: 'solo', name: 'Solo Play', icon: '⚡' },
];

export default function HomeContent() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const totalGames = GAMES.length;
  const multiplayerGames = GAMES.filter((game) => game.category === 'multiplayer').length;

  const filteredGames = GAMES.filter((game) => {
    const matchesFilter = filter === 'all' || game.category === filter;
    const normalizedSearch = search.toLowerCase();
    const matchesSearch =
      game.title.toLowerCase().includes(normalizedSearch) ||
      game.desc.toLowerCase().includes(normalizedSearch) ||
      game.tag.toLowerCase().includes(normalizedSearch);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-container">
      <section className="hero-section animate-fade-in">
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#00d4ff',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Free browser games with no sign-up
        </div>
        <h1 className="hero-title">
          VIBE<span>MENOW</span>
        </h1>
        <p className="hero-desc">
          A collection of original browser games you can open in seconds. Play a daily puzzle,
          test your reflexes, or start a quick room with friends.
        </p>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">{totalGames}</div>
            <div className="stat-label">Games</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{multiplayerGames}</div>
            <div className="stat-label">Party Modes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">No</div>
            <div className="stat-label">Accounts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">Quick</div>
            <div className="stat-label">Sessions</div>
          </div>
        </div>
      </section>

      <section id="games-listing" style={{ marginTop: 40, marginBottom: 32 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', flex: 1 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`btn-outline ${filter === cat.id ? 'active' : ''}`}
                style={{
                  whiteSpace: 'nowrap',
                  borderColor: filter === cat.id ? 'var(--primary)' : 'var(--border-light)',
                  color: filter === cat.id ? 'var(--primary)' : 'var(--text-muted)',
                  background: filter === cat.id ? 'rgba(255, 45, 120, 0.1)' : 'transparent',
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#555',
              }}
            />
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
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#555',
                  cursor: 'pointer',
                }}
              />
            )}
          </div>
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <div className="game-grid">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <Link href={game.path} key={game.title} style={{ textDecoration: 'none' }}>
                <div className="game-card">
                  <div className="game-card-emoji">{game.emoji}</div>
                  <h3 className="game-card-title">{game.title}</h3>
                  <p className="game-card-desc">{game.desc}</p>
                  <span
                    className="game-card-tag"
                    style={{
                      background: `${game.color}15`,
                      color: game.color,
                    }}
                  >
                    {game.tag}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px 20px',
                color: '#555',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '20px', color: '#f0f0f0' }}>No games matched that search.</h3>
              <p>Try a different keyword or category.</p>
            </div>
          )}
        </div>
      </section>

      <section style={{ marginTop: 48, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, color: '#f0f0f0' }}>
          Why People Use VIBEMENOW
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <div className="card" style={{ textAlign: 'center', cursor: 'default' }}>
            <Trophy size={32} color="#ffe600" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Short, replayable games</h3>
            <p style={{ color: '#888', fontSize: 13 }}>
              Most pages are built for quick rounds that work well during a short break.
            </p>
          </div>
          <div className="card card-glow-cyan" style={{ textAlign: 'center', cursor: 'default' }}>
            <Sparkles size={32} color="#00d4ff" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>No Login Required</h3>
            <p style={{ color: '#888', fontSize: 13 }}>
              You can open a page, play, and leave without account creation getting in the way.
            </p>
          </div>
          <div className="card" style={{ textAlign: 'center', cursor: 'default' }}>
            <Users size={32} color="#00ff94" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Solo and room-based play</h3>
            <p style={{ color: '#888', fontSize: 13 }}>
              Some games are built for one player, while others let you create a room and invite friends.
            </p>
          </div>
          <div className="card card-glow-yellow" style={{ textAlign: 'center', cursor: 'default' }}>
            <TrendingUp size={32} color="#ff2d78" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Different types of play</h3>
            <p style={{ color: '#888', fontSize: 13 }}>
              The catalogue mixes word games, reaction tests, quizzes, polls, and small arcade experiments.
            </p>
          </div>
          <Link
            href="/guides"
            className="card"
            style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: '#fff' }}>Player Notes</h3>
            <p style={{ color: '#888', fontSize: 13 }}>
              Read short notes about how some games work and how we think about them.
            </p>
          </Link>
          <Link
            href="/blog"
            className="card"
            style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>📝</div>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: '#fff' }}>Studio Journal</h3>
            <p style={{ color: '#888', fontSize: 13 }}>
              Browse site updates, game ideas, and behind-the-scenes notes from the project.
            </p>
          </Link>
        </div>
      </section>

      <section
        style={{
          marginTop: 64,
          padding: '60px 0',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'left',
          maxWidth: '900px',
          margin: '64px auto 0 auto',
        }}
      >
        <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 24, color: '#fff' }}>
          What To Expect From <span style={{ color: '#00d4ff' }}>VIBEMENOW</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
          <div style={{ color: '#888', lineHeight: '1.7' }}>
            <h3 style={{ color: '#eee', fontSize: 18, marginBottom: 16 }}>What the site is</h3>
            <p>
              VIBEMENOW is an independent collection of browser games and interactive quizzes.
              Some pages are daily puzzles, some are arcade-style score chasers, and some are
              built for quick multiplayer sessions.
            </p>
          </div>
          <div style={{ color: '#888', lineHeight: '1.7' }}>
            <h3 style={{ color: '#eee', fontSize: 18, marginBottom: 16 }}>How we design it</h3>
            <p>
              The focus is on lightweight pages that start quickly and are easy to understand.
              We keep the rules short, avoid mandatory registration, and try to make each page
              useful on its own instead of wrapping it in filler.
            </p>
          </div>
          <div style={{ color: '#888', lineHeight: '1.7' }}>
            <h3 style={{ color: '#eee', fontSize: 18, marginBottom: 16 }}>Multiplayer rooms</h3>
            <p>
              Room-based games let players create a code and join friends directly. Because
              those modes involve shared names and messages, we keep extra policy controls
              around them and do not use them as the main ad-supported landing pages.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 48,
            padding: '32px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 16, textAlign: 'center' }}>
            Frequently Asked Questions
          </h3>
          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <p style={{ color: '#eee', fontWeight: 600, marginBottom: 4 }}>Do I need an account to play?</p>
              <p style={{ color: '#777', fontSize: 14 }}>
                No. The main experience is designed to work without account creation or app installation.
              </p>
            </div>
            <div>
              <p style={{ color: '#eee', fontWeight: 600, marginBottom: 4 }}>How are ads used on the site?</p>
              <p style={{ color: '#777', fontSize: 14 }}>
                Ads support the free parts of the project, but they are not placed on every route.
                Policy pages and several room-based modes are intentionally excluded.
              </p>
            </div>
            <div>
              <p style={{ color: '#eee', fontWeight: 600, marginBottom: 4 }}>
                Are quiz results or personality labels scientific?
              </p>
              <p style={{ color: '#777', fontSize: 14 }}>
                No. Any quiz-style outcomes are for entertainment only and should not be treated
                as professional or clinical advice.
              </p>
            </div>
            <div>
              <p style={{ color: '#eee', fontWeight: 600, marginBottom: 4 }}>Can I contact the team?</p>
              <p style={{ color: '#777', fontSize: 14 }}>
                Yes. Use the <Link href="/contact" style={{ color: '#00d4ff', textDecoration: 'underline' }}>contact page</Link> for questions, bugs, or moderation issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', marginTop: 48, padding: '40px 0' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255,45,120,0.1), rgba(177,74,237,0.1), rgba(0,212,255,0.1))',
            border: '2px solid rgba(255,45,120,0.2)',
            borderRadius: 24,
            padding: '40px 24px',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Ready to <span style={{ color: '#ff2d78' }}>play</span>?
          </h2>
          <p style={{ color: '#888', fontSize: 15, marginBottom: 24 }}>
            Pick any game above and start. No setup needed.
          </p>
          <Link href="/wordvibe">
            <button className="btn-primary" style={{ fontSize: 18 }}>
              Start with WordVibe
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
