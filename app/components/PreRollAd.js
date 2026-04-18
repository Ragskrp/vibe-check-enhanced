'use client';

import { useState, useEffect } from 'react';
import { Zap, Play, Loader2 } from 'lucide-react';

/**
 * PreRollAd Component
 * Shows a stunning full-screen ad gateway with a countdown before the game starts.
 * 
 * @param {string} adClient - AdSense Publisher ID
 * @param {string} adSlot - AdSense Ad Slot ID
 * @param {number} countdownSeconds - How many seconds to wait
 * @param {string} gameName - Name of the game being loaded
 * @param {function} onComplete - Callback when countdown finishes
 */
export default function PreRollAd({ 
  adClient = "ca-pub-7832965089021505", 
  adSlot = "7171012882", 
  countdownSeconds = 5, 
  gameName = "the game",
  onComplete 
}) {
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Load AdSense
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch (e) {
      console.warn("AdSense push failed in PreRoll", e);
    }

    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    if (timeLeft === 0) {
      onComplete();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#07070a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fade-in 0.5s ease-out'
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        background: 'rgba(255, 45, 120, 0.15)',
        filter: 'blur(100px)',
        borderRadius: '50%',
        zIndex: -1
      }} />

      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <Zap size={24} color="#ff2d78" />
          <span style={{ color: '#aaa', fontSize: '14px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Preparing Session
          </span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#fff', margin: 0 }}>
          Starting <span style={{ color: '#ff2d78' }}>{gameName}</span>
        </h1>
      </div>

      {/* Ad Container */}
      <div 
        style={{
          width: '100%',
          maxWidth: '336px', // Standard Large Rectangle
          minHeight: '280px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}
      >
        {!adLoaded && (
          <div style={{ position: 'absolute', color: '#333', fontSize: '12px', textAlign: 'center' }}>
            <Loader2 className="animate-spin" size={24} style={{ marginBottom: '8px', margin: '0 auto' }} />
            Loading Ad...
          </div>
        )}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '300px', height: '250px' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
        />
      </div>

      {/* Action Area */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleStart}
          disabled={timeLeft > 0}
          style={{
            padding: '16px 48px',
            borderRadius: '999px',
            background: timeLeft === 0 ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
            color: timeLeft === 0 ? '#fff' : '#555',
            fontSize: '18px',
            fontWeight: 800,
            border: 'none',
            cursor: timeLeft === 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transform: timeLeft === 0 ? 'scale(1.1)' : 'scale(1)',
            boxShadow: timeLeft === 0 ? '0 10px 30px rgba(255, 45, 120, 0.4)' : 'none'
          }}
        >
          {timeLeft > 0 ? (
            <>
              Next in {timeLeft}s...
            </>
          ) : (
            <>
              Click to Play <Play size={20} fill="currentColor" />
            </>
          )}
        </button>
        
        <p style={{ marginTop: '24px', color: '#444', fontSize: '13px' }}>
          Ads support our independent game collection. Thanks for playing!
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
