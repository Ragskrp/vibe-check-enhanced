import RicochetGame from './RicochetGame';
import GameEditorialLayer from '../components/GameEditorialLayer';
import Link from 'next/link';

export const metadata = {
  title: 'Ricochet Strike | Tactical Space Shooter | VIBEMENOW',
  description: 'Master the art of the bounce in Ricochet Strike. A tactical space shooter where projectiles reflect off walls to hit shielded enemies.',
  alternates: {
    canonical: '/ricochet-strike',
  },
  openGraph: {
    title: 'Ricochet Strike | VIBEMENOW',
    description: 'Use physics to outsmart the drone swarm. Tactical ricochet combat in deep space.',
    url: '/ricochet-strike',
    type: 'website',
  },
};

export default function RicochetPage() {
  return (
    <main className="page-container animate-fade-in">
      <section className="hero-section" style={{ paddingBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: '#ff2d78', textTransform: 'uppercase', marginBottom: 8 }}>
          Physics-Based Combat
        </div>
        <h1 className="hero-title">RICOCHET <span>STRIKE</span></h1>
        <p className="hero-desc">
          Pilot your ship through high-density drone fields. When the enemy hides behind front-facing shields, use the arena walls to bounce your shots and strike from the shadows.
        </p>
      </section>

      <section style={{ marginBottom: 60 }}>
        <RicochetGame />
      </section>

      <GameEditorialLayer />

      <section style={{ marginTop: 60, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 24 }}>How to Play</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          <div>
            <h3 style={{ color: '#ff2d78', fontSize: 18, marginBottom: 12 }}>Tactical Bouncing</h3>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.6 }}>
              Your projectiles reflect off all four walls. Use this to hit enemies from unexpected angles or to clear out clusters of drones without putting yourself in direct danger.
            </p>
          </div>
          <div>
            <h3 style={{ color: '#00d4ff', fontSize: 18, marginBottom: 12 }}>Shield Breakers</h3>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.6 }}>
              Elite drones carry rotating shields that block all frontal attacks. You must calculate the ricochet path to hit them from the side or back to bypass their defenses.
            </p>
          </div>
          <div>
            <h3 style={{ color: '#ffe600', fontSize: 18, marginBottom: 12 }}>Controls</h3>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.6 }}>
              Use <strong style={{ color: '#fff' }}>WASD</strong> or <strong style={{ color: '#fff' }}>Arrow Keys</strong> to move and rotate your ship. Press <strong style={{ color: '#fff' }}>Space</strong> to fire your bouncing pulse cannon.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 80, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 32 }}>Try More Arcade Actions</h2>
        <div className="game-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <Link href="/gravity-dash" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Neon Strike</div>
          </Link>
          <Link href="/vibeordie" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🎯</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Vibe or Die</div>
          </Link>
          <Link href="/reaction-arena" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Reaction Arena</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
