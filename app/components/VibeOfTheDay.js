'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function VibeOfTheDay({ games }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    // Use the current date to select a consistent "game of the day"
    const timer = setTimeout(() => {
      const today = new Date();
      const seed = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();
      const gameIndex = seed % games.length;
      setGame(games[gameIndex]);
    }, 0);
    return () => clearTimeout(timer);
  }, [games]);

  if (!game) return null;

  return (
    <Link href={game.path} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '20px',
        borderRadius: '24px',
        background: 'rgba(255, 45, 120, 0.05)',
        border: '1px solid rgba(255, 45, 120, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        maxWidth: '500px',
        margin: '0 auto 32px auto'
      }}
      className="vibe-of-the-day"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            fontSize: '32px',
            background: 'rgba(255, 45, 120, 0.1)',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px'
          }}>
            {game.emoji}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: '900',
              letterSpacing: '0.15em',
              color: '#ff2d78',
              textTransform: 'uppercase',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={10} /> Vibe of the Day
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>
              {game.title}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
              {game.tag} • Play Now
            </div>
          </div>
        </div>
        <div style={{ color: '#ff2d78' }}>
          <ArrowRight size={20} />
        </div>

        <style jsx>{`
          .vibe-of-the-day:hover {
            background: rgba(255, 45, 120, 0.1);
            border-color: #ff2d78;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255, 45, 120, 0.2);
          }
        `}</style>
      </div>
    </Link>
  );
}
