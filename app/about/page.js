'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
        <h1 className="game-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '24px' }}>
          About <span style={{ color: '#ff2d78' }}>VIBEMENOW</span>
        </h1>
        
        <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '16px' }}>
          <p style={{ marginBottom: '20px' }}>
            Welcome to <strong>VIBEMENOW</strong>, your ultimate destination for fast, addictive, and bite-sized daily games. 
            Our mission is simple: to brighten your mood and challenge your brain with zero friction.
          </p>

          <h2 style={{ color: '#00d4ff', fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Our Story</h2>
          <p style={{ marginBottom: '20px' }}>
            VIBEMENOW was born out of a love for "micro-gaming" — the idea that you don't need hours to have a great gaming experience. 
            Whether you're on a coffee break, commuting, or just need a mental reset, we provide a collection of games that 
            refresh every 24 hours to keep things exciting.
          </p>

          <h2 style={{ color: '#ffe600', fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Why "No Login"?</h2>
          <p style={{ marginBottom: '20px' }}>
            We believe the web should be open and instant. That's why every game on VIBEMENOW is 100% free and requires no account. 
            Your scores are yours, your vibes are yours, and we just provide the arena.
          </p>

          <div style={{ 
            background: 'rgba(255, 45, 120, 0.05)', 
            border: '1px solid rgba(255, 45, 120, 0.2)', 
            padding: '24px', 
            borderRadius: '16px',
            marginTop: '40px'
          }}>
            <h3 style={{ color: '#ff2d78', marginTop: 0 }}>Join the Vibe</h3>
            <p>
              We are constantly evolving and adding new game modes based on player feedback. 
              If you have an idea for a "vibe" or a game challenge, we'd love to hear from you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
