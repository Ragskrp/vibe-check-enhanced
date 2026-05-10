'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function AnalyticsAndAds() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const handleConsentUpdate = () => {
      const stored = localStorage.getItem('vibe_cookie_consent');
      if (stored) {
        try {
          setConsent(JSON.parse(stored));
        } catch (e) {
          // invalid json
        }
      }
    };

    handleConsentUpdate();
    window.addEventListener('vibe_consent_updated', handleConsentUpdate);
    return () => window.removeEventListener('vibe_consent_updated', handleConsentUpdate);
  }, []);

  return (
    <>
      {consent?.advertising && (
        <>
          {/* AdSense (Keep for now) */}
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7832965089021505"
            crossOrigin="anonymous"
          />
          {/* Adsterra Social Bar - Instant Approval Alternative */}
          <Script
            id="adsterra-social-bar"
            strategy="lazyOnload"
            src="https://pl29408323.profitablecpmratenetwork.com/45/5d/51/455d5174d55b0eaec902ce55f4ff5e0d.js"
          />
        </>
      )}
      {consent?.analytics && (
        <>
          <Script
            id="ga4"
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-CJ1V3EJL7M"
          />
          <Script
            id="ga4-inline"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-CJ1V3EJL7M', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
