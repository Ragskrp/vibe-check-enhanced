import AdBanner from '../components/AdBanner';
import FlappyGame from './FlappyGame';

export const metadata = {
  title: 'Flappy Vibe | VIBEMENOW',
  description: 'Tap, click, or press space to stay airborne and dodge obstacles in this browser arcade game.',
  alternates: {
    canonical: '/flappy-vibe',
  },
  openGraph: {
    url: '/flappy-vibe',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function FlappyVibePage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#00ff94', marginBottom: 8, marginTop: 32 }}>
          FLAPPY VIBE
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Tap, click, or press Space to fly. Avoid the pipes and stay alive.</p>
      </div>

      <FlappyGame />

      <article
        className="seo-guide"
        style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}
      >
        <h2 style={{ color: '#00ff94', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>
          About Flappy Vibe
        </h2>

        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(0, 255, 148, 0.03)', borderColor: 'rgba(0, 255, 148, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>How to play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Tap to rise:</strong> each press gives you a short lift.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Find a rhythm:</strong> too many taps or too few will end the run.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Clear the gaps:</strong> every pipe you pass adds to your score.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Restart fast:</strong> the game is built around quick retries.</li>
          </ul>
        </div>

        <p>
          Flappy Vibe is one of the simplest pages on the site. The challenge comes from timing,
          not from complicated rules. It is best used as a short arcade-style score chase rather
          than a long session.
        </p>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
