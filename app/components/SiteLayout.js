'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap } from 'lucide-react';
import AdBanner from './AdBanner';

const NAV_ITEMS = [
  { name: 'WordVibe', label: '🔤 WordVibe', path: '/wordvibe' },
  { name: 'VibeOrDie', label: '🎯 Vibe or Die', path: '/vibeordie' },
  { name: 'EmojiIQ', label: '😂 Emoji IQ', path: '/emoji-iq' },
  { name: 'HotTakes', label: '🔥 Hot Takes', path: '/hot-takes' },
  { name: 'VibeQuiz', label: '✨ Vibe Quiz', path: '/vibe-quiz' },
  { name: 'WouldYouRather', label: '😈 Would U Rather', path: '/would-you-rather' },
  { name: 'QuizArena', label: '🏆 Quiz Arena', path: '/quiz-arena' },
];

export default function SiteLayout({ children }) {
  const pathname = usePathname();

  return (
    <>
      {/* Animated Ticker */}
      <div className="ticker-wrap">
        <span className="ticker-text">
          🔥 NEW DAILY WORD DROP • ✨ TAKE THE VIBE QUIZ • 😈 WOULD U RATHER • 🎯 VIBE OR DIE • 😂 EMOJI IQ TEST • 🔥 HOT TAKES • SHARE YOUR SCORE • 🔥 NEW DAILY WORD DROP • ✨ TAKE THE VIBE QUIZ • 😈 WOULD U RATHER • 🎯 VIBE OR DIE • 😂 EMOJI IQ TEST • 🔥 HOT TAKES • SHARE YOUR SCORE •
        </span>
      </div>

      {/* Sticky Header */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo-link">
            <Zap size={22} color="#ff2d78" style={{ filter: 'drop-shadow(0 0 8px #ff2d78)' }} />
            <span className="logo-text">
              VIBE<span>CHECK</span>
            </span>
          </Link>
          <nav className="nav-links">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.name}
                href={item.path}
                className={`nav-link${pathname === item.path ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
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
          <span className="footer-brand">VIBECHECK</span> — Free daily games. No login. Just vibes.
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
