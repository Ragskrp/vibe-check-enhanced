'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, LayoutGrid, ChevronRight } from 'lucide-react';
import AdBanner from './AdBanner';

const NAV_ITEMS = [
  { name: 'WordVibe', label: '🔤 WordVibe', path: '/wordvibe', category: 'daily' },
  { name: 'VibeOrDie', label: '🎯 Vibe or Die', path: '/vibeordie', category: 'solo' },
  { name: 'EmojiIQ', label: '😂 Emoji IQ', path: '/emoji-iq', category: 'daily' },
  { name: 'VocabVibe', label: '🔠 Vocab Vibe', path: '/vocab-match', category: 'daily' },
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
  { name: 'VibeClicker', label: '👆 Vibe Clicker', path: '/vibe-clicker', category: 'solo' },
  { name: 'MergeVibe', label: '🎮 Merge Vibe', path: '/2048-vibe', category: 'solo' },
  { name: 'FlappyVibe', label: '🕊️ Flappy Vibe', path: '/flappy-vibe', category: 'solo' },
  { name: 'WhackVibe', label: '🔨 Whack-a-Vibe', path: '/whack-a-vibe', category: 'solo' },
];

export default function SiteLayout({ children }) {
  const pathname = usePathname();

  const handleBrowseClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById('games-listing');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const breadcrumbs = [
    { name: 'Home', path: '/' },
  ];

  if (pathname !== '/') {
    const parts = pathname.split('/').filter(Boolean);
    let currentPath = '';
    parts.forEach(part => {
      currentPath += `/${part}`;
      // Clean up name (e.g. word-vibe -> Word Vibe)
      const name = part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      breadcrumbs.push({ name, path: currentPath });
    });
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://vibemenow.uk${crumb.path}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Animated Ticker */}
      <div className="ticker-wrap">
        <span className="ticker-text">
          🎓 NEW: GCSE REVISION • ⚡ EQUATION RUSH • 🥧 FRACTION FRENZY • 📐 ANGLE SNAPPER • ✨ VIBE CLICKER • 🎮 MERGE VIBE • 🕊️ FLAPPY VIBE • 🔨 WHACK-A-VIBE • 🔥 NEW DAILY WORD DROP • ✨ TAKE THE VIBE QUIZ • 😈 WOULD U RATHER • 🎯 VIBE OR DIE • 😂 EMOJI IQ • 🔥 HOT TAKES • ⚡ REACTION ARENA • 👁️ ODD ONE OUT • 🧠 MEMORY ARENA • 🗳️ POLL PARTY • 🎨 DRAWING DASH • 🌍 GEO GUESSER • SHARE YOUR SCORE •
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

            <Link href="/gcse" className={`nav-link${pathname.startsWith('/gcse') ? ' active' : ''}`} style={{ color: pathname.startsWith('/gcse') ? '#00e5a0' : undefined }}>
              🎓 GCSE
            </Link>
            <Link href="/blog" className={`nav-link${pathname.startsWith('/blog') ? ' active' : ''}`}>
              Blog
            </Link>
            <Link href="/about" className={`nav-link${pathname === '/about' ? ' active' : ''}`}>
              About
            </Link>
            <Link href="/faq" className={`nav-link${pathname === '/faq' ? ' active' : ''}`}>
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      {/* Visible Breadcrumbs */}
      {pathname !== '/' && (
        <nav
          aria-label="Breadcrumb"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '12px 24px 0',
            fontSize: 13,
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexWrap: 'wrap',
          }}
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.path} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {i > 0 && <ChevronRight size={12} style={{ color: '#333' }} />}
              {i === breadcrumbs.length - 1 ? (
                <span style={{ color: '#aaa', fontWeight: 600 }}>{crumb.name}</span>
              ) : (
                <Link href={crumb.path} style={{ color: '#555', textDecoration: 'none' }}>
                  {crumb.name}
                </Link>
              )}
            </span>
          ))}
        </nav>
      )}

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
            <Link href="/gcse" style={{ color: '#00e5a0' }}>🎓 GCSE Revision</Link>
            <Link href="/about">About Us</Link>
            <Link href="/publisher-information">Publisher Information</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/editorial-policy">Editorial Policy</Link>
            <Link href="/community-guidelines">Community Guidelines</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/guides">Expert Guides</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
          <div className="footer-tagline">
            Play daily • Share with friends • Come back tomorrow for new vibes ⚡
          </div>
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
            Publisher: VIBEMENOW • Contact:{' '}
            <a href="mailto:ragskrpreddy@gmail.com" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
              ragskrpreddy@gmail.com
            </a>
          </div>
          <div style={{ marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 VIBEMENOW (vibemenow.uk). All rights reserved. All games and content are original creations of the VIBEMENOW team.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="mobile-nav">
        <div className="mobile-nav-inner">
          <Link href="/" className={`mobile-nav-link${pathname === '/' ? ' active' : ''}`}>
            🏠 Home
          </Link>
          <Link href="/gcse" className={`mobile-nav-link${pathname.startsWith('/gcse') ? ' active' : ''}`} style={{ color: pathname.startsWith('/gcse') ? '#00e5a0' : undefined }}>
            🎓 GCSE
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
