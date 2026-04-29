'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [prefs, setPrefs] = useState({
    essential: true, // always true
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('vibe_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(consent);
        setPrefs({ ...parsed, essential: true });
        
        // Check if 365 days have passed
        if (parsed.timestamp) {
          const daysPassed = (new Date() - new Date(parsed.timestamp)) / (1000 * 60 * 60 * 24);
          if (daysPassed > 365) {
            setShowBanner(true);
          }
        }
      } catch (e) {
        setShowBanner(true);
      }
    }

    const openPrefs = () => setShowPreferences(true);
    window.addEventListener('open_cookie_preferences', openPrefs);
    return () => window.removeEventListener('open_cookie_preferences', openPrefs);
  }, []);

  const saveConsent = (analytics, advertising) => {
    const consentData = {
      analytics,
      advertising,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('vibe_cookie_consent', JSON.stringify(consentData));
    setPrefs({ essential: true, analytics, advertising });
    setShowBanner(false);
    setShowPreferences(false);
    
    // Dispatch event to update AnalyticsAndAds
    window.dispatchEvent(new Event('vibe_consent_updated'));
  };

  const handleAcceptAll = () => saveConsent(true, true);
  const handleRejectAll = () => saveConsent(false, false);
  const handleSavePreferences = () => saveConsent(prefs.analytics, prefs.advertising);

  if (!mounted) return null;

  return (
    <>
      {showBanner && !showPreferences && (
        <div className="cookie-banner-wrap">
          <div className="cookie-banner-inner">
            <div className="cookie-banner-content">
              <div className="cookie-icon-box">
                 <ShieldCheck size={24} color="#00ff94" />
              </div>
              <div className="cookie-text-box">
                <h4>Your Privacy Choices</h4>
                <p>
                  We use cookies to ensure our games work properly (essential), to understand how you use our site (analytics), and to show relevant ads that keep VIBEMENOW free (advertising).
                  Please choose your preferences below. See our <Link href="/privacy">Privacy Policy</Link> for details.
                </p>
              </div>
            </div>
            <div className="cookie-actions">
               <button className="btn-manage" onClick={() => setShowPreferences(true)}>Manage Preferences</button>
               <button className="btn-reject" onClick={handleRejectAll}>Reject Non-Essential</button>
               <button className="btn-accept" onClick={handleAcceptAll}>Accept All</button>
            </div>
          </div>
        </div>
      )}

      {showPreferences && (
        <div className="cookie-prefs-overlay">
          <div className="cookie-prefs-modal">
            <h3>Cookie Preferences</h3>
            <p className="prefs-desc">Manage how we use cookies on VIBEMENOW.</p>
            
            <div className="pref-item">
              <div className="pref-info">
                <h4>Essential Cookies</h4>
                <p>Required for game state, multiplayer rooms, and session security. Cannot be disabled.</p>
              </div>
              <div className="pref-toggle disabled">
                <input type="checkbox" checked readOnly />
                <span className="slider"></span>
              </div>
            </div>

            <div className="pref-item">
              <div className="pref-info">
                <h4>Analytics Cookies</h4>
                <p>Help us understand how visitors interact with our games via Google Analytics.</p>
              </div>
              <label className="pref-toggle">
                <input type="checkbox" checked={prefs.analytics} onChange={e => setPrefs({...prefs, analytics: e.target.checked})} />
                <span className="slider"></span>
              </label>
            </div>

            <div className="pref-item">
              <div className="pref-info">
                <h4>Advertising Cookies</h4>
                <p>Allow Google AdSense to serve personalized ads to keep this platform free.</p>
              </div>
              <label className="pref-toggle">
                <input type="checkbox" checked={prefs.advertising} onChange={e => setPrefs({...prefs, advertising: e.target.checked})} />
                <span className="slider"></span>
              </label>
            </div>

            <div className="prefs-actions">
              <button className="btn-save" onClick={handleSavePreferences}>Save My Choices</button>
              <button className="btn-accept" onClick={handleAcceptAll}>Accept All</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .cookie-banner-wrap {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 900px;
          z-index: 9999;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cookie-banner-inner {
          background: rgba(15, 15, 25, 0.98);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }

        @media (min-width: 768px) {
          .cookie-banner-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .cookie-actions {
            flex-direction: column;
            width: 200px;
          }
        }

        .cookie-banner-content {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          flex: 1;
        }

        .cookie-icon-box {
          background: rgba(0, 255, 148, 0.1);
          padding: 12px;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .cookie-text-box h4 {
          margin: 0 0 8px 0;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
        }

        .cookie-text-box p {
          margin: 0;
          color: #bbb;
          font-size: 13px;
          line-height: 1.6;
        }

        .cookie-text-box :global(a) {
          color: #00ff94;
          text-decoration: underline;
        }

        .cookie-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }

        .cookie-actions button {
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          width: 100%;
        }

        .btn-accept {
          background: #00ff94;
          color: #000;
        }
        .btn-accept:hover {
          background: #00d4ff;
        }

        .btn-reject {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        .btn-reject:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .btn-manage {
          background: transparent;
          color: #888;
          text-decoration: underline;
        }
        .btn-manage:hover {
          color: #fff;
        }

        .cookie-prefs-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }

        .cookie-prefs-modal {
          background: #15151e;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 32px;
          width: 100%;
          max-width: 500px;
        }

        .cookie-prefs-modal h3 { margin: 0 0 8px 0; color: #fff; }
        .prefs-desc { color: #888; font-size: 14px; margin-bottom: 24px; }

        .pref-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .pref-info h4 { margin: 0 0 4px 0; color: #eee; font-size: 15px; }
        .pref-info p { margin: 0; color: #777; font-size: 12px; max-width: 300px; }

        .pref-toggle {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .pref-toggle input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #333;
          transition: .4s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider { background-color: #00ff94; }
        input:checked + .slider:before { transform: translateX(20px); }
        .pref-toggle.disabled .slider { cursor: not-allowed; opacity: 0.5; }

        .prefs-actions {
          margin-top: 32px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        .btn-save {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-save:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </>
  );
}
