'use client';

import FlappyGame from './FlappyGame';
import AdBanner from '../components/AdBanner';

export default function FlappyVibePage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#00ff94', marginBottom: 8, marginTop: 32 }}>
          FLAPPY VIBE 🕊️
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Tap, Click, or press Space to fly. Don't hit the pipes!</p>
      </div>
      
      <FlappyGame />

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
