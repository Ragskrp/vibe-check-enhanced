import Link from 'next/link';
import MergeClient from './MergeClient';
import AdBanner from '../components/AdBanner';

export const metadata = {title: 'Merge Vibe (2048) | VIBEMENOW',
  description: 'The classic 2048 puzzle game with a vibe. Swipe to merge tiles and reach the legendary 2048 vibe. Free browser-based puzzle game.',
  alternates: {
    canonical: '/2048-vibe',
  },
  openGraph: {
    url: '/2048-vibe',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VibeMergePage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#ff2d78', marginBottom: 8, marginTop: 32 }}>
          MERGE VIBE 🎮
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Use Arrow Keys (or Swipe on mobile) to merge tiles. Reach 2048 to win!</p>
      </div>
      
      <MergeClient />

      <article className="seo-guide" style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ color: '#ff2d78', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>Merge Vibe: Mastering the Art of 2048</h2>
        
        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(255, 45, 120, 0.03)', borderColor: 'rgba(255, 45, 120, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>📖 How to Play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Slide the Board:</strong> Swipe (Up, Down, Left, Right) or use your arrow keys to move all tiles on the grid at once.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Merge Identical Tiles:</strong> When two tiles with the same number collide, they merge into a single tile with the sum of their values (e.g., 2+2=4).</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Aim for 2048:</strong> Continue merging tiles to reach the 2048 tile to win.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Don&apos;t Get Stuck:</strong> If the grid fills up and no more merges are possible, the game is over. Strategy is key!</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '48px', marginBottom: '20px' }}>Strategy and Skill: Why 2048 is Good for You</h3>
        <p><strong>Merge Vibe</strong> is more than just a passing distraction; it&apos;s a deep exercise in spatial logic. Successful players learn to keep their highest-value tiles in a specific corner, allowing for predictable and controlled merging chains. This type of mental simulation helps strengthen the parts of the brain responsible for pattern recognition and long-term planning.</p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>✨ Importance: Skill & Health Benefits</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', margin: '32px 0' }}>
          <div>
            <h4 style={{ color: '#ff2d78', marginBottom: '8px' }}>🧠 Spatial Reasoning</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>Constantly calculating how the whole board shifts improves your brain&apos;s ability to visualize and manipulate spatial structures.</p>
          </div>
          <div>
            <h4 style={{ color: '#ff2d78', marginBottom: '8px' }}>🎯 Forward Planning</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>Great players don&apos;t just think about their next move—they think three moves ahead, building discipline and patience.</p>
          </div>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>Explore Similar Games</h3>
        <p style={{ marginBottom: '24px' }}>
          Ready for another challenge? Try these puzzle and reaction games:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link href="/flappy-vibe" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🐦</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Flappy Vibe</div>
          </Link>
          <Link href="/reaction-arena" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Reaction Arena</div>
          </Link>
          <Link href="/vibe-clicker" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🖱️</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Vibe Clicker</div>
          </Link>
        </div>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
