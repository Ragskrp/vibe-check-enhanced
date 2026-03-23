'use client';

import MergeGame from './MergeGame';
import AdBanner from '../components/AdBanner';

export default function VibeMergePage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#ff2d78', marginBottom: 8, marginTop: 32 }}>
          MERGE VIBE 🎮
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Use Arrow Keys (or Swipe on mobile) to merge tiles. Reach 2048 to win!</p>
      </div>
      
      <MergeGame />

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
