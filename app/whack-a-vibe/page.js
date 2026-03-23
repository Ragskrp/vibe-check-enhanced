'use client';

import WhackGame from './WhackGame';
import AdBanner from '../components/AdBanner';

export default function WhackVibePage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#f59e0b', marginBottom: 8, marginTop: 32 }}>
          WHACK-A-VIBE 🔨
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Smash the bad vibes. Don't hit the good ones. 30 seconds on the clock!</p>
      </div>
      
      <WhackGame />

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
