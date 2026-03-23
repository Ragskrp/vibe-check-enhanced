'use client';

import VibeClickerGame from './VibeClickerGame';
import AdBanner from '../components/AdBanner';

export default function VibeClickerPage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#00d4ff', marginBottom: 8, marginTop: 32 }}>
          VIBE CLICKER 👆
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Click the main vibe to generate energy. Buy upgrades and automate!</p>
      </div>
      
      <VibeClickerGame />

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
