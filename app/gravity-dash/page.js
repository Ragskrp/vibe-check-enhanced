import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import GravityClient from './GravityClient';
import AdGateway from '../components/AdGateway';

export const metadata = {
  title: 'Neon Strike | Space Combat Arcade | VIBEMENOW',
  description: 'Engage in high-octane deep space combat in Neon Strike. Pilot your ship, upgrade weapons, and survive the neon drone swarm.',
  alternates: {
    canonical: '/gravity-dash',
  },
  openGraph: {
    url: '/gravity-dash',
    title: 'Neon Strike | Deep Space Combat | VIBEMENOW',
    description: 'Engage in high-octane deep space combat in Neon Strike. Pilot your ship, upgrade weapons, and survive the neon drone swarm.',
    images: [
      {
        url: '/og/neon-strike.png',
        width: 1200,
        height: 630,
        alt: 'Neon Strike space combat game on VIBEMENOW',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GravityDashPage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#00d4ff', marginBottom: 8, marginTop: 32, textShadow: '0 0 20px #00d4ff' }}>
          NEON STRIKE
        </h1>
        <p style={{ color: '#888', fontSize: 18 }}>Pilot your ship through the neon void. Survive the swarm.</p>
      </div>

      <AdGateway gameName="Neon Strike">
        <GravityClient />
      </AdGateway>

      <article
        className="seo-guide"
        style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}
      >
        <h2 style={{ color: '#00d4ff', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>
          Mastering Neon Strike
        </h2>

        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(0, 212, 255, 0.03)', borderColor: 'rgba(0, 212, 255, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>Flight Manual</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>🚀 Movement:</strong> Use <strong>WASD</strong> or <strong>Arrow Keys</strong> to pilot your ship in any direction.</li>
            <li style={{ marginBottom: '12px' }}><strong>🔥 Weapons:</strong> Press <strong>Space</strong> or <strong>Z</strong> to fire your primary laser.</li>
            <li style={{ marginBottom: '12px' }}><strong>💎 Upgrades:</strong> Collect neon orbs to activate <strong>Triple Shot</strong>, <strong>Rapid Fire</strong>, or <strong>Energy Shields</strong>.</li>
            <li style={{ marginBottom: '12px' }}><strong>👾 Survival:</strong> Drones get faster and tougher as your score increases. Stay mobile!</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>The Space Combat Engine</h3>
        <p style={{ marginBottom: '24px' }}>
          Neon Strike is built on a high-performance physics engine designed for fluid, responsive space flight. Unlike static arcade shooters, your ship has momentum and tight handling, allowing for precision dodges through dense enemy clusters.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Strategic Upgrades</h3>
        <p style={{ marginBottom: '24px' }}>
          Success in the deep void requires more than just fast reflexes. You must prioritize the right power-ups. The <strong>Energy Shield</strong> provides temporary invulnerability, while the <strong>Triple Shot</strong> allows you to clear wide paths through the swarm. Timing your pickups is the key to breaking the world record.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Explore Similar Vibes</h3>
        <p style={{ marginBottom: '24px' }}>
          If you enjoy high-intensity arcade combat, check out these other challenges:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link href="/reaction-arena" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Reaction Arena</div>
          </Link>
          <Link href="/whack-a-vibe" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔨</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Whack-a-Vibe</div>
          </Link>
          <Link href="/vibe-clicker" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🖱️</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Vibe Clicker</div>
          </Link>
        </div>
      </article>

    </div>
  );
}
