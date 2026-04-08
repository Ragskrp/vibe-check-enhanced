'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Google AdSense Banner Component
 * Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual AdSense publisher ID
 * Replace data-ad-slot with your actual ad slot IDs
 * 
 * Formats:
 * - "horizontal" - Leaderboard (728x90)
 * - "rectangle" - Medium Rectangle (300x250)
 * - "vertical" - Skyscraper (160x600)
 * - "auto" - Responsive
 */
export default function AdBanner({ slot = '7171012882', format = 'auto', className = '' }) {
  const adRef = useRef(null);
  const isLoaded = useRef(false);
  const pathname = usePathname();

  const adBlockedRoutes = new Set([
    '/2048-vibe',
    '/about',
    '/community-guidelines',
    '/contact',
    '/disclaimer',
    '/drawing-dash',
    '/editorial-policy',
    '/flappy-vibe',
    '/memory-arena',
    '/odd-one-out',
    '/poll-party',
    '/privacy',
    '/quiz-arena',
    '/reaction-arena',
    '/terms',
    '/vibe-clicker',
    '/whack-a-vibe'
  ]);
  const adsBlocked = adBlockedRoutes.has(pathname);

  useEffect(() => {
    if (isLoaded.current) return;
    
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isLoaded.current = true;
      }
    } catch (e) {
      // AdSense not loaded yet or ad blocker active
    }
  }, []);

  if (adsBlocked) {
    return null;
  }

  // In development, show a placeholder
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    return (
      <div className={`ad-slot ${className}`} style={{
        minHeight: format === 'rectangle' ? '250px' : format === 'vertical' ? '600px' : '90px'
      }}>
        📢 AD SPACE — {slot.toUpperCase()} ({format}) <br/>
        <span style={{fontSize: '10px', opacity: 0.5}}>(ca-pub-7832965089021505)</span>
      </div>
    );
  }

  return (
    <div className={`ad-slot ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7832965089021505"
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
    </div>
  );
}
