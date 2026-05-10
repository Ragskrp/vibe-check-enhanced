'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Sparkles, Users, TrendingUp, Search, X } from 'lucide-react';
import LiveVibePulse from './LiveVibePulse';
import VibeOfTheDay from './VibeOfTheDay';
import DailyGoalTracker from './DailyGoalTracker';

const GAMES = [
  {
    emoji: '🔤',
    title: 'WordVibe',
    desc: 'The ultimate daily mental reset. Sharpen your focus and beat the 5-letter puzzle.',
    path: '/wordvibe',
    tag: 'Daily Puzzle',
    color: '#00d4ff',
    category: 'solo'
  },
  {
    emoji: '🎯',
    title: 'Vibe or Die',
    desc: 'Test your reflexes against the world. One click determines your ranking. Can you stay calm?',
    path: '/vibeordie',
    tag: 'Reflex Test',
    color: '#ff2d78',
    category: 'solo'
  },
  {
    emoji: '😂',
    title: 'Emoji IQ',
    desc: 'Unlock your lateral thinking. Decipher cryptic emoji chains and prove your cultural wit.',
    path: '/emoji-iq',
    tag: 'Brain Game',
    color: '#ffe600',
    category: 'daily'
  },
  {
    emoji: '🔠',
    title: 'Vocab Vibe',
    desc: 'Expand your vocabulary without the effort. Fast-paced word matching for curious minds.',
    path: '/vocab-match',
    tag: 'Word Training',
    color: '#fbbf24',
    category: 'daily'
  },
  {
    emoji: '🔥',
    title: 'Hot Takes',
    desc: 'Join the national conversation. Vote on the internet\'s most divisive opinions.',
    path: '/hot-takes',
    tag: 'Live Poll',
    color: '#ff6b35',
    category: 'daily'
  },
  {
    emoji: '✨',
    title: 'Vibe Quiz',
    desc: 'Discover your digital aura. A personality deep-dive designed for sharing.',
    path: '/vibe-quiz',
    tag: 'Personality',
    color: '#b14aed',
    category: 'daily'
  },
  {
    emoji: '😈',
    title: 'Would U Rather',
    desc: 'Face the impossible. Pick your path through awkward and hilarious dilemmas.',
    path: '/would-you-rather',
    tag: 'Social Choice',
    color: '#00ff94',
    category: 'daily'
  },
  {
    emoji: '🏆',
    title: 'Quiz Arena',
    desc: 'Dominate the leaderboard. Real-time multiplayer trivia for you and your friends.',
    path: '/quiz-arena',
    tag: 'Multiplayer',
    color: '#00d4ff',
    category: 'multiplayer',
    isNew: true
  },
  {
    emoji: '⚡',
    title: 'Reaction Arena',
    desc: 'The ultimate showdown. A high-speed reflex battle where every millisecond counts.',
    path: '/reaction-arena',
    tag: 'Multiplayer',
    color: '#ff2d78',
    category: 'multiplayer',
    isNew: true
  },
  {
    emoji: '👁️',
    title: 'Odd One Out',
    desc: 'Train your eagle eye. Spot the pattern break before the timer—or your friends—do.',
    path: '/odd-one-out',
    tag: 'Multiplayer',
    color: '#00ff94',
    category: 'multiplayer'
  },
  {
    emoji: '🧠',
    title: 'Memory Arena',
    desc: 'Master your mind. Outlast the room in this high-stakes memory elimination.',
    path: '/memory-arena',
    tag: 'Multiplayer',
    color: '#b14aed',
    category: 'multiplayer'
  },
  {
    emoji: '🗳️',
    title: 'Poll Party',
    desc: 'Group therapy for the internet. Answer prompts, vote, and see where you land.',
    path: '/poll-party',
    tag: 'Multiplayer',
    color: '#ff6b35',
    category: 'multiplayer'
  },
  {
    emoji: '🎨',
    title: 'Drawing Dash',
    desc: 'Express yourself at speed. A frantic race to draw and guess under pressure.',
    path: '/drawing-dash',
    tag: 'Multiplayer',
    color: '#00d4ff',
    category: 'multiplayer',
    isNew: true
  },
  {
    emoji: '🌍',
    title: 'Geo Guesser',
    desc: 'Travel the world from your browser. Master flags and landmarks in seconds.',
    path: '/geography-guesser',
    tag: 'Learning',
    color: '#00d4ff',
    category: 'solo'
  },
  {
    emoji: '👆',
    title: 'Vibe Clicker',
    desc: 'Satisfyingly addictive. Build your empire, unlock upgrades, and watch the numbers soar.',
    path: '/vibe-clicker',
    tag: 'Idle Clicker',
    color: '#00d4ff',
    category: 'solo'
  },
  {
    emoji: '🎮',
    title: 'Merge Vibe',
    desc: 'Clean, rhythmic puzzles. Slide, merge, and find your flow in this neon-lit grid.',
    path: '/2048-vibe',
    tag: 'Puzzle',
    color: '#ff2d78',
    category: 'solo'
  },
  {
    emoji: '📐',
    title: 'Ricochet Strike',
    desc: 'Tactical physics combat. Outsmart shielded drones with perfectly calculated bounces.',
    path: '/ricochet-strike',
    tag: 'Action',
    color: '#ff2d78',
    category: 'solo',
    isNew: true
  },
  {
    emoji: '🚀',
    title: 'Neon Strike',
    desc: 'High-octane deep space combat. Upgrade your weapons and survive the swarm.',
    path: '/gravity-dash',
    tag: 'Action',
    color: '#00d4ff',
    category: 'solo'
  },
  {
    emoji: '🔨',
    title: 'Whack-a-Vibe',
    desc: 'De-stress in seconds. A classic arcade test of speed and precision.',
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
        <LiveVibePulse />
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
          No Accounts. No Downloads. Just Play.
        </div>
        <h1 className="hero-title">
          VIBE<span>MENOW</span>
        </h1>
        <p className="hero-desc">
          Kill the boredom, not the budget. Instant-access browser games for a mental reset, 
          social rooms for your squad, and GCSE revision tools that actually work.
        </p>

        <VibeOfTheDay games={GAMES} />
        <DailyGoalTracker />

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">{totalGames}</div>
            <div className="stat-label">Free Games</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{multiplayerGames}</div>
            <div className="stat-label">Party Modes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Logins Needed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">Instant</div>
            <div className="stat-label">Playtime</div>
          </div>
        </div>
      </section>

      {/* GCSE Revision CTA */}
      <section style={{ marginTop: 32, marginBottom: 8 }}>
        <Link href="/gcse" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '24px 28px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(0,229,160,0.1), rgba(0,212,255,0.08))',
            border: '2px solid rgba(0,229,160,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 36 }}>🎓</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#00e5a0', textTransform: 'uppercase', marginBottom: 4 }}>
                  NEW MODULE
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#f0f0f0' }}>
                  GCSE Revision Tools
                </div>
                <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
                  Free interactive Maths revision — Equation Rush, Fraction Frenzy, Angle Snapper & more
                </div>
              </div>
            </div>
            <div style={{ color: '#00e5a0', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
              Explore →
            </div>
          </div>
        </Link>
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
                  {game.isNew && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: '#00ff94',
                        color: '#000',
                        fontSize: '10px',
                        fontWeight: 900,
                        padding: '4px 8px',
                        borderRadius: '999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: '0 4px 12px rgba(0, 255, 148, 0.3)'
                      }}
                    >
                      New
                    </span>
                  )}
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
          <Link
            href="/tech-news"
            className="card"
            style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: '#fff' }}>Tech Pulse</h3>
            <p style={{ color: '#888', fontSize: 13 }}>
              Read original analysis and news about AI, hardware, and digital policy.
            </p>
          </Link>
          <Link
            href="/publisher-information"
            className="card"
            style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>Info</div>
            <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: '#fff' }}>Publisher Info</h3>
            <p style={{ color: '#888', fontSize: 13 }}>
              See who runs the site, how ads are handled, and where core policy pages live.
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

      <section
        style={{
          marginTop: 48,
          maxWidth: 900,
          margin: '48px auto 0 auto',
          padding: '0 16px',
        }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 24, color: '#fff' }}>
          Games, Learning, and <span style={{ color: '#ff2d78' }}>Tech Analysis</span>
        </h2>
        <div style={{ color: '#888', lineHeight: '1.8', fontSize: 15 }}>
          <p style={{ marginBottom: 20 }}>
            VIBEMENOW is primarily an entertainment site, but some of the ideas behind the
            games overlap with familiar topics in cognitive science and educational research:
            retrieval practice, pattern recognition, attention, reaction time, and short-burst
            repetition. We use those themes as context, not as a promise that casual gameplay
            replaces medical, educational, or professional support.
          </p>
          <p style={{ marginBottom: 20 }}>
            That is why the site separates play pages, long-form articles, tech news, and policy pages.
            The games are built to be useful on their own, the blog gives room for broader
            commentary, and our tech news desk covers the latest shifts in AI and digital policy.
          </p>
          <p style={{ marginBottom: 20 }}>
            At VIBEMENOW, we design games with these principles in mind. Word puzzles like
            <strong> WordVibe</strong> exercise vocabulary retrieval and pattern matching.
            Reaction games like <strong> Vibe or Die</strong> and <strong> Reaction Arena</strong> target
            processing speed and inhibitory control. Strategy games like <strong> Merge Vibe (2048)</strong> demand
            spatial reasoning and forward planning. And multiplayer rooms add a social
            dimension that changes how the experience is moderated and where ads are appropriate.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
            marginTop: 32,
            marginBottom: 32,
          }}
        >
          <div className="card" style={{ padding: 24, cursor: 'default' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🧠</div>
            <h4 style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, color: '#eee' }}>Working Memory</h4>
            <p style={{ color: '#777', fontSize: 13, margin: 0 }}>
              Games that ask you to hold and manipulate information can help you practice
              working memory skills such as short-term recall, sequencing, and attention.
            </p>
          </div>
          <div className="card" style={{ padding: 24, cursor: 'default' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>⚡</div>
            <h4 style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, color: '#eee' }}>Processing Speed</h4>
            <p style={{ color: '#777', fontSize: 13, margin: 0 }}>
              Reaction-based challenges are built around quick perception and response timing.
              They are best understood as practice in fast visual decisions rather than as a
              guarantee of real-world performance changes.
            </p>
          </div>
          <div className="card" style={{ padding: 24, cursor: 'default' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔄</div>
            <h4 style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, color: '#eee' }}>Cognitive Flexibility</h4>
            <p style={{ color: '#777', fontSize: 13, margin: 0 }}>
              Switching between different game types can encourage mental flexibility and
              rule-switching, both of which are common parts of learning and problem-solving.
            </p>
          </div>
        </div>

        <div style={{ color: '#888', lineHeight: '1.8', fontSize: 15, marginBottom: 20 }}>
          <p>
            Our <Link href="/blog" style={{ color: '#00d4ff', textDecoration: 'underline' }}>blog</Link> and 
            <Link href="/tech-news" style={{ color: '#00d4ff', textDecoration: 'underline' }}> tech news</Link> sections
            explore these topics in more depth. From the
            <Link href="/blog/spacing-effect-memory" style={{ color: '#00d4ff', textDecoration: 'underline' }}> spacing effect in memory consolidation</Link> to
            the latest <Link href="/tech-news/openai-gpt5-reasoning-leap" style={{ color: '#00d4ff', textDecoration: 'underline' }}>shifts in AI reasoning</Link>,
            we aim to add context without presenting entertainment pages as clinical advice or
            formal research papers.
          </p>
        </div>
      </section>

      <section
        style={{
          marginTop: 48,
          maxWidth: 900,
          margin: '48px auto 0 auto',
          padding: '24px',
          borderRadius: 24,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: '#fff' }}>
          Learn How The Site Is Run
        </h2>
        <p style={{ color: '#888', lineHeight: '1.8', marginBottom: 20 }}>
          These pages explain who runs VIBEMENOW, how ads are handled, how content is maintained,
          and how to contact the publisher directly.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/publisher-information" className="btn-outline">
            Publisher Information
          </Link>
          <Link href="/about" className="btn-outline">
            About
          </Link>
          <Link href="/editorial-policy" className="btn-outline">
            Editorial Policy
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact
          </Link>
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
