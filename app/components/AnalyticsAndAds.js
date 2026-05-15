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
          // invalid json — treat as no consent
        }
      }
    };

    handleConsentUpdate();
    window.addEventListener('vibe_consent_updated', handleConsentUpdate);
    return () => window.removeEventListener('vibe_consent_updated', handleConsentUpdate);
  }, []);

  // Determine ad personalization mode:
  // - Advertising consent given → personalized ads (NPA=0)
  // - No consent yet or declined → non-personalized ads (NPA=1, GDPR-compliant)
  const npaMode = consent?.advertising ? 0 : 1;

  return (
    <>
      {/* AdSense — always loads. Non-personalized when consent is not given (GDPR-compliant). */}
      <Script
        id="adsbygoogle-npa"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.requestNonPersonalizedAds = ${npaMode};
          `,
        }}
      />
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7832965089021505"
        crossOrigin="anonymous"
      />

      {/* Google Analytics — only with analytics consent */}
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

