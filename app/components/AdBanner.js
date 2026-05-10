'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

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
  const scriptInjected = useRef(false);
  const pathname = usePathname();

  // Keep banners on content-rich routes while avoiding gameplay-heavy screens.
  const adEnabledRoutes = new Set([
    '/',
    '/about',
    '/faq',
    '/contact',
    '/blog',
    '/guides',
    '/gcse',
    '/gcse/maths',
    '/gcse/science',
    '/gcse/computer-science',
    '/gcse/business',
    '/publisher-information',
    '/editorial-policy',
    '/community-guidelines',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/tech-news',
  ]);

  const adEnabledPrefixes = [
    '/blog/',
    '/guides/',
    '/tech-news/',
  ];

  const isEnabledByExactRoute = adEnabledRoutes.has(pathname);
  const isEnabledByPrefix = adEnabledPrefixes.some((prefix) => pathname.startsWith(prefix));
  const adsBlocked = !(isEnabledByExactRoute || isEnabledByPrefix);

  useEffect(() => {
    if (adsBlocked || scriptInjected.current || typeof window === 'undefined') return;
    
    // Fallback for AdSense
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {}

    // Adsterra Logic
    const container = adRef.current;
    if (!container) return;

    if (format === 'rectangle' || format === 'horizontal') {
      const config = document.createElement('script');
      config.type = 'text/javascript';
      const key = format === 'rectangle' ? 'f055390fdfc79f4ab56cb401696a3f5d' : '64a5fdeb6bf4cf0934af6231f80fb455';
      const height = format === 'rectangle' ? 250 : 90;
      const width = format === 'rectangle' ? 300 : 728;
      
      config.innerHTML = `
        atOptions = {
          'key' : '${key}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
      
      container.appendChild(config);
      container.appendChild(script);
      scriptInjected.current = true;
    } else {
      // Native Banner
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = "https://pl29408324.profitablecpmratenetwork.com/b87ec4964e8b91d4001fd5f3b6db90a7/invoke.js";
      
      const div = document.createElement('div');
      div.id = "container-b87ec4964e8b91d4001fd5f3b6db90a7";
      
      container.appendChild(script);
      container.appendChild(div);
      scriptInjected.current = true;
    }

    return () => {
      // Cleanup if necessary, though scripts are usually fine to stay
    };
  }, [adsBlocked, format]);

  if (adsBlocked) {
    return null;
  }

  // In development, show a placeholder
  const isDev = process.env.NODE_ENV === 'development';

  const adHeight = format === 'rectangle' ? '250px' : format === 'vertical' ? '600px' : '90px';
  const adWidth = format === 'rectangle' ? '300px' : format === 'horizontal' ? '728px' : '100%';

  if (isDev) {
    return (
      <div className={`ad-slot ${className}`} style={{ height: adHeight, width: adWidth, maxWidth: '100%' }}>
        <div style={{ padding: '10px' }}>
          📢 {format.toUpperCase()} AD SLOT <br/>
          <span style={{fontSize: '10px', opacity: 0.5}}>
            Provider: Adsterra ({format === 'rectangle' ? '300x250' : format === 'horizontal' ? '728x90' : 'Native'})
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`ad-slot ${className}`} 
      ref={adRef} 
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
        style={{ display: 'none' }}
        data-ad-client="ca-pub-7832965089021505"
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
    </div>
  );
}


