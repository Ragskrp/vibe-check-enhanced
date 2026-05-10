import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import GravityClient from './GravityClient';
import AdGateway from '../components/AdGateway';

export const metadata = {
  title: 'Gravity Dash | VIBEMENOW',
  description: 'Tap, click, or press space to switch gravity and dodge neon obstacles in this fast-paced browser arcade game.',
  alternates: {
    canonical: '/gravity-dash',
  },
  openGraph: {
    url: '/gravity-dash',
    title: 'Gravity Dash | Browser Arcade Game | VIBEMENOW',
    description: 'Tap, click, or press space to switch gravity and dodge neon obstacles in this fast-paced browser arcade game.',
    images: [
      {
        url: '/og/gravity-dash.png',
        width: 1200,
        height: 630,
        alt: 'Gravity Dash browser game on VIBEMENOW',
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
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#00ff94', marginBottom: 8, marginTop: 32 }}>
          GRAVITY DASH
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Tap, click, or press Space to switch gravity. Dodge the obstacles and stay alive.</p>
      </div>

      <AdGateway gameName="Gravity Dash">
        <GravityClient />
      </AdGateway>

      <article
        className="seo-guide"
        style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}
      >
        <h2 style={{ color: '#00ff94', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>
          About Gravity Dash
        </h2>

        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(0, 255, 148, 0.03)', borderColor: 'rgba(0, 255, 148, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>How to play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Tap to flip:</strong> each press switches your gravity from the floor to the ceiling.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. React fast:</strong> the speed increases as you progress, requiring lightning-fast reflexes.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Dodge obstacles:</strong> avoid neon barriers by flipping at the perfect moment.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Master the flow:</strong> find your rhythm in this synthwave runner.</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>The Core Mechanics</h3>
        <p style={{ marginBottom: '24px' }}>
          Gravity Dash is a high-speed reaction game that strips away complex controls. Your only action is to switch gravity. By tapping, you instantly invert your vertical momentum, attaching to either the floor or the ceiling. The challenge lies in reading the upcoming obstacles and timing your flips perfectly.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Why Gravity Dash is Addictive</h3>
        <p style={{ marginBottom: '24px' }}>
          Unlike traditional jumpers, gravity-switching games feel incredibly fair because your actions are absolute. You aren't managing analog jump heights; you're making binary choices at high speeds. This creates a state of flow where muscle memory and reaction times take over.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Explore Similar Games</h3>
        <p style={{ marginBottom: '24px' }}>
          If you enjoy fast-paced arcade games, you might also like these:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link href="/gravity-dash" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🚀</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Gravity Dash</div>
          </Link>
          <Link href="/reaction-arena" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Reaction Arena</div>
          </Link>
          <Link href="/2048-vibe" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧩</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Merge Vibe</div>
          </Link>
        </div>
      </article>

    </div>
  );
}
