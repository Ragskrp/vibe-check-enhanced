'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Zap, LayoutGrid } from 'lucide-react';
import AdBanner from './AdBanner';

const NAV_ITEMS = [
  { name: 'WordVibe', label: '🔤 WordVibe', path: '/wordvibe', category: 'daily' },
  { name: 'VibeOrDie', label: '🎯 Vibe or Die', path: '/vibeordie', category: 'solo' },
  { name: 'EmojiIQ', label: '😂 Emoji IQ', path: '/emoji-iq', category: 'daily' },
  { name: 'HotTakes', label: '🔥 Hot Takes', path: '/hot-takes', category: 'daily' },
  { name: 'VibeQuiz', label: '✨ Vibe Quiz', path: '/vibe-quiz', category: 'daily' },
  { name: 'WouldYouRather', label: '😈 Would U Rather', path: '/would-you-rather', category: 'daily' },
  { name: 'QuizArena', label: '🏆 Quiz Arena', path: '/quiz-arena', category: 'multiplayer' },
  { name: 'ReactionArena', label: '⚡ Reaction Arena', path: '/reaction-arena', category: 'multiplayer' },
  { name: 'OddOneOut', label: '👁️ Odd One Out', path: '/odd-one-out', category: 'multiplayer' },
  { name: 'MemoryArena', label: '🧠 Memory Arena', path: '/memory-arena', category: 'multiplayer' },
  { name: 'PollParty', label: '🗳️ Poll Party', path: '/poll-party', category: 'multiplayer' },
  { name: 'DrawingDash', label: '🎨 Drawing Dash', path: '/drawing-dash', category: 'multiplayer' },
  { name: 'GeoGuesser', label: '🌍 Geo Guesser', path: '/geography-guesser', category: 'solo' },
];

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleBrowseClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById('games-listing');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Animated Ticker */}
      <div className="ticker-wrap">
        <span className="ticker-text">
          🔥 NEW DAILY WORD DROP • ✨ TAKE THE VIBE QUIZ • 😈 WOULD U RATHER • 🎯 VIBE OR DIE • 😂 EMOJI IQ • 🔥 HOT TAKES • ⚡ REACTION ARENA • 👁️ ODD ONE OUT • 🧠 MEMORY ARENA • 🗳️ POLL PARTY • 🎨 DRAWING DASH • 🌍 GEO GUESSER • SHARE YOUR SCORE •
        </span>
      </div>

      {/* Sticky Header */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo-link">
            <Zap size={22} color="#ff2d78" style={{ filter: 'drop-shadow(0 0 8px #ff2d78)' }} />
            <span className="logo-text">
              VIBE<span>MENOW</span>
            </span>
          </Link>
          
          <nav className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/" className={`nav-link${pathname === '/' ? ' active' : ''}`}>
              Home
            </Link>
            
            <Link 
              href="/#games-listing" 
              onClick={handleBrowseClick}
              className="nav-link"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <LayoutGrid size={16} /> Browse Games
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Bottom Ad Banner */}
      <AdBanner format="horizontal" />

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-brand">VIBEMENOW</span> — Free daily games. No login. Just vibes.
          <div className="footer-links">
            {NAV_ITEMS.map(item => (
              <Link key={item.name} href={item.path}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-links">
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <div className="footer-tagline">
            Play daily • Share with friends • Come back tomorrow for new vibes ⚡
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="mobile-nav">
        <div className="mobile-nav-inner">
          <Link href="/" className={`mobile-nav-link${pathname === '/' ? ' active' : ''}`}>
            🏠 Home
          </Link>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.name}
              href={item.path}
              className={`mobile-nav-link${pathname === item.path ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
