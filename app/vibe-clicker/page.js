import AdBanner from '../components/AdBanner';
import VibeClickerGame from './VibeClickerGame';

export const metadata = {
  title: 'Vibe Clicker | VIBEMENOW',
  description: 'Generate points, buy upgrades, and let production grow in this simple idle browser game.',
  alternates: {
    canonical: '/vibe-clicker',
  },
  openGraph: {
    url: '/vibe-clicker',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function VibeClickerPage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#00d4ff', marginBottom: 8, marginTop: 32 }}>
          VIBE CLICKER
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Click to generate points, then invest in upgrades and automation.</p>
      </div>

      <VibeClickerGame />

      <article
        className="seo-guide"
        style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}
      >
        <h2 style={{ color: '#00d4ff', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>
          About Vibe Clicker
        </h2>

        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(0, 212, 255, 0.03)', borderColor: 'rgba(0, 212, 255, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>How to play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Click for income:</strong> manual taps get the run started.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Buy upgrades:</strong> each upgrade improves how quickly points are generated.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Add automation:</strong> the later game is about production building on itself.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Compare routes:</strong> different upgrade orders change how fast the total grows.</li>
          </ul>
        </div>

        <p>
          Vibe Clicker is an idle experiment rather than a deep sim. It is useful if you want a
          page that rewards short check-ins, visible number growth, and simple upgrade choices.
        </p>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
