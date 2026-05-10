'use client';

import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const RECENT_ACTIVITIES = [
  "Someone just mastered 'Cell Biology' 🧬",
  "New High Score in WordVibe! 🏆",
  "5-day streak achieved by a Viber 🔥",
  "300 players in Quiz Arena 🎮",
  "Fresh 'Hot Take' trending: Pizza? 🍍",
  "Found the flag of Bhutan 🇧🇹"
];

export default function LiveVibePulse() {
  const [count, setCount] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(Math.floor(Math.random() * 200) + 800);
    }, 0);

    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return prev + change;
      });
      setActivityIndex(prev => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        borderRadius: '20px',
        background: 'rgba(255, 45, 120, 0.1)',
        border: '1px solid rgba(255, 45, 120, 0.2)',
        fontSize: '12px',
        fontWeight: '700',
        color: '#ff2d78',
      }}>
        <span style={{
          position: 'relative',
          display: 'flex',
          height: '8px',
          width: '8px'
        }}>
          <span style={{
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            position: 'absolute',
            display: 'inline-flex',
            height: '100%',
            width: '100%',
            borderRadius: '9999px',
            background: '#ff2d78',
            opacity: 0.75
          }}></span>
          <span style={{
            position: 'relative',
            display: 'inline-flex',
            borderRadius: '9999px',
            height: '8px',
            width: '8px',
            background: '#ff2d78'
          }}></span>
        </span>
        <Activity size={12} />
        <span>{count.toLocaleString()} VIBES HAPPENING NOW</span>
      </div>

      <div style={{
        fontSize: '11px',
        color: 'rgba(255,255,255,0.4)',
        fontWeight: '700',
        height: '16px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'slideUp 0.5s ease-out'
      }} key={activityIndex}>
        {RECENT_ACTIVITIES[activityIndex]}
      </div>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
