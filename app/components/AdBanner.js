'use client';

import { useEffect, useRef } from 'react';

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
export default function AdBanner({ slot = 'default', format = 'auto', className = '' }) {
  const adRef = useRef(null);
  const isLoaded = useRef(false);

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

  // In development, show a placeholder
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    return (
      <div className={`ad-slot ${className}`} style={{
        minHeight: format === 'rectangle' ? '250px' : format === 'vertical' ? '600px' : '90px'
      }}>
        📢 AD SPACE — {slot.toUpperCase()} ({format})
      </div>
    );
  }

  return (
    <div className={`ad-slot ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
    </div>
  );
}
