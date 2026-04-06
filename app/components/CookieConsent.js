'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('vibe_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('vibe_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const declineAll = () => {
    localStorage.setItem('vibe_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="cookie-banner-wrap">
      <div className="cookie-banner-inner">
        <div className="cookie-banner-content">
          <div className="cookie-icon-box">
             <Cookie size={24} color="#ff2d78" />
          </div>
          <div className="cookie-text-box">
            <h4>We care about your vibe 🍪</h4>
            <p>
              VIBEMENOW uses cookies to analyze traffic, remember your game streaks, and serve personalized ads via Google. 
              By clicking &quot;Accept", you agree to our use of cookies and our <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
        <div className="cookie-actions">
           <button className="btn-cookie-decline" onClick={declineAll}>Decline</button>
           <button className="btn-cookie-accept" onClick={acceptAll}>Accept All</button>
        </div>
      </div>

      <style jsx>{`
        .cookie-banner-wrap {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 600px;
          z-index: 9999;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cookie-banner-inner {
          background: rgba(15, 15, 25, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        @media (min-width: 768px) {
          .cookie-banner-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .cookie-banner-content {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .cookie-icon-box {
          background: rgba(255, 45, 120, 0.1);
          padding: 12px;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .cookie-text-box h4 {
          margin: 0 0 4px 0;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
        }

        .cookie-text-box p {
          margin: 0;
          color: #888;
          font-size: 13px;
          line-height: 1.5;
        }

        .cookie-text-box :global(a) {
          color: #00d4ff;
          text-decoration: underline;
        }

        .cookie-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        .btn-cookie-accept {
          background: #ff2d78;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }

        .btn-cookie-accept:hover {
          background: #ff4d91;
          transform: translateY(-2px);
        }

        .btn-cookie-decline {
          background: transparent;
          color: #555;
          border: 1px solid #333;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cookie-decline:hover {
          color: #888;
          border-color: #555;
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
