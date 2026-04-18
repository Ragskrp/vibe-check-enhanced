import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import FlappyClient from './FlappyClient';
import AdGateway from '../components/AdGateway';

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
    index: true,
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

      <AdGateway gameName="Flappy Vibe">
        <FlappyClient />
      </AdGateway>

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

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>The Core Mechanics</h3>
        <p style={{ marginBottom: '24px' }}>
          Flappy Vibe is designed as a minimalist arcade experience. Unlike heavy games that require long tutorials, it relies on a single input: the "flap." The difficulty comes from managing the bird's momentum and gravity, which pulls you down as soon as you stop tapping. 
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Why Arcade Games are Addictive</h3>
        <p style={{ marginBottom: '24px' }}>
          Short-session games like Flappy Vibe are addictive because they provide immediate feedback. When you hit a pipe, you know exactly what went wrong, and the &quot;Try Again&quot; button is only a click away. This cycle of play-failure-retry creates a &quot;just one more go&quot; loop that makes the hours fly by.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Explore Similar Games</h3>
        <p style={{ marginBottom: '24px' }}>
          If you enjoy social games and quizzes, you might also like these:
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
          <Link href="/2048-vibe" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧩</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Merge Vibe</div>
          </Link>
        </div>
      </article>

    </div>
  );
}
