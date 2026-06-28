'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StateProvider, useFleurir } from './components/StateContext';

function GCSEHeader() {
  const pathname = usePathname();
  const state = useFleurir();

  if (!state) return null; // Wait for provider

  const { coins, activeTheme } = state;

  return (
    <>
      <style>{`
        .fleurir-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 40px;
          border-bottom: 1px solid ${activeTheme.borderColor};
          background: ${activeTheme.cardBg};
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 50;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.3s, border-color 0.3s;
        }
        .fleurir-brand {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 26px;
          fontWeight: 700;
          color: ${activeTheme.primary};
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .fleurir-nav {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .fleurir-nav-link {
          font-family: 'Playfair Display', serif;
          font-size: 19px;
          color: #504445;
          text-decoration: none;
          transition: color 0.2s, font-weight 0.2s;
        }
        .fleurir-nav-link.active {
          color: ${activeTheme.primary};
          font-weight: 700;
          border-bottom: 2px solid ${activeTheme.primary};
          padding-bottom: 2px;
        }
        .fleurir-nav-link:hover {
          color: ${activeTheme.primary};
        }
        .petal-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #faf3e9;
          border: 1px solid #e8e2d8;
          border-radius: 9999px;
          padding: 6px 16px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #504445;
        }
      `}</style>
      <header className="fleurir-header">
        <Link href="/gcse" className="fleurir-brand">FLEURIR</Link>
        
        <nav className="fleurir-nav">
          <Link href="/gcse/maths" className={`fleurir-nav-link ${pathname === '/gcse/maths' ? 'active' : ''}`}>Map</Link>
          <Link href="/gcse" className={`fleurir-nav-link ${pathname === '/gcse' ? 'active' : ''}`}>Study</Link>
          <Link href="/gcse/shop" className={`fleurir-nav-link ${pathname === '/gcse/shop' ? 'active' : ''}`}>Shop</Link>
          <Link href="/gcse/profile" className={`fleurir-nav-link ${pathname === '/gcse/profile' ? 'active' : ''}`}>Profile</Link>
          <Link href="/gcse/mock-test" className={`fleurir-nav-link ${pathname === '/gcse/mock-test' ? 'active' : ''}`}>Mock Test</Link>
        </nav>

        <div className="petal-badge">
          <span>🌸</span>
          <span>{coins.toLocaleString()}</span>
        </div>
      </header>
    </>
  );
}

function GlobalStyleWrapper({ children }) {
  const state = useFleurir();
  if (!state) return children;

  const { activeTheme } = state;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: activeTheme.bg,
      backgroundImage: `radial-gradient(circle, ${activeTheme.gridColor} 1px, transparent 1px)`,
      backgroundSize: '28px 28px',
      color: activeTheme.bg === '#fff8f0' ? '#1e1b16' : '#fff8f0',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      {children}
    </div>
  );
}

export default function GCSELayout({ children }) {
  return (
    <StateProvider>
      <GCSEHeader />
      <GlobalStyleWrapper>
        {children}
      </GlobalStyleWrapper>
    </StateProvider>
  );
}
