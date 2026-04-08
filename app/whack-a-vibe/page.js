import AdBanner from '../components/AdBanner';
import WhackGame from './WhackGame';

export const metadata = {
  title: 'Whack-a-Vibe | VIBEMENOW',
  description: 'Hit the bad targets, avoid the good ones, and chase a higher score before time runs out.',
  alternates: {
    canonical: '/whack-a-vibe',
  },
  openGraph: {
    url: '/whack-a-vibe',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function WhackVibePage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#f59e0b', marginBottom: 8, marginTop: 32 }}>
          WHACK-A-VIBE
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Hit the bad targets, avoid the good ones, and beat the 30 second timer.</p>
      </div>

      <WhackGame />

      <article
        className="seo-guide"
        style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}
      >
        <h2 style={{ color: '#f59e0b', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>
          About Whack-a-Vibe
        </h2>

        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(245, 158, 11, 0.03)', borderColor: 'rgba(245, 158, 11, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>How to play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Watch the grid:</strong> targets appear quickly and disappear just as fast.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Hit the bad ones:</strong> correct hits push your score upward.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Avoid mistakes:</strong> good targets are penalties, not bonuses.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Stay moving:</strong> hesitation matters when the timer is short.</li>
          </ul>
        </div>

        <p>
          This page is built as a compact reaction game. The core skill is visual filtering under
          time pressure, so better scores usually come from cleaner decision-making rather than raw speed alone.
        </p>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
