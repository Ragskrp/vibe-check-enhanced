'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Google AdSense banner.
 * Ads are limited to content-rich pages and initialize only after advertising consent.
 */
export default function AdBanner({ slot = '7171012882', format = 'auto', className = '' }) {
  const pushedRef = useRef(false);
  const pathname = usePathname();
  const [advertisingConsent, setAdvertisingConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      try {
        const stored = localStorage.getItem('vibe_cookie_consent');
        const parsed = stored ? JSON.parse(stored) : null;
        setAdvertisingConsent(Boolean(parsed?.advertising));
      } catch {
        setAdvertisingConsent(false);
      }
    };

    syncConsent();
    window.addEventListener('vibe_consent_updated', syncConsent);
    return () => window.removeEventListener('vibe_consent_updated', syncConsent);
  }, []);

  // Keep ads on content-rich pages only. Avoid gameplay, contact, and policy pages for review.
  const adEnabledRoutes = new Set([
    '/',
    '/blog',
    '/guides',
    '/gcse',
    '/gcse/maths',
    '/gcse/science',
    '/gcse/computer-science',
    '/gcse/business',
  ]);

  const adEnabledPrefixes = [
    '/blog/',
    '/guides/',
  ];

  const isEnabledByExactRoute = adEnabledRoutes.has(pathname);
  const isEnabledByPrefix = adEnabledPrefixes.some((prefix) => pathname.startsWith(prefix));
  const adsBlocked = !(isEnabledByExactRoute || isEnabledByPrefix);

  useEffect(() => {
    pushedRef.current = false;
  }, [pathname, slot, format]);

  useEffect(() => {
    if (adsBlocked || !advertisingConsent || pushedRef.current || typeof window === 'undefined') return;

    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch {
      pushedRef.current = true;
    }
  }, [advertisingConsent, adsBlocked, pathname, slot, format]);

  if (adsBlocked || !advertisingConsent) {
    return null;
  }

  const isDev = process.env.NODE_ENV === 'development';
  const adHeight = format === 'rectangle' ? '250px' : format === 'vertical' ? '600px' : '90px';
  const adWidth = format === 'rectangle' ? '300px' : format === 'horizontal' ? '728px' : '100%';

  if (isDev) {
    return (
      <div className={`ad-slot ${className}`} style={{ height: adHeight, width: adWidth, maxWidth: '100%' }}>
        <div style={{ padding: '10px' }}>
          AD SLOT: {format.toUpperCase()}
          <br />
          <span style={{ fontSize: '10px', opacity: 0.5 }}>Provider: Google AdSense</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`ad-slot ${className}`}
      style={{
        height: adHeight,
        width: adWidth,
        maxWidth: '100%',
        background: '#0a0a0f',
        border: 'none',
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-7832965089021505"
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
    </div>
  );
}
