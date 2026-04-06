import WhackGame from './WhackGame';
import AdBanner from '../components/AdBanner';

export const metadata = {title: 'Whack-a-Vibe | VIBEMENOW',
  description: 'Test your reflexes and destroy the bad vibes. Fast-paced whack-a-mole style game with addictive gameplay. Play Whack-a-Vibe for free.',
  alternates: {
    canonical: '/whack-a-vibe',
  },
  openGraph: {
    url: '/whack-a-vibe',
  },
};

export default function WhackVibePage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#f59e0b', marginBottom: 8, marginTop: 32 }}>
          WHACK-A-VIBE 🔨
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Smash the bad vibes. Don't hit the good ones. 30 seconds on the clock!</p>
      </div>
      
      <WhackGame />

      <article className="seo-guide" style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ color: '#f59e0b', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>Whack-a-Vibe: Instant Reflex Training</h2>
        
        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(245, 158, 11, 0.03)', borderColor: 'rgba(245, 158, 11, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>📖 How to Play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Watch the Grid:</strong> Small icons (vibes) will pop up from the holes at random intervals.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Strike the Bad Vibes:</strong> Click or tap red/dark vibes (the bad ones!) to destroy them and earn points.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Avoid Good Vibes:</strong> Do not hit the colorful icons—these are good vibes and hitting them will penalize your score.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Race the Timer:</strong> You have exactly 30 seconds to score as high as possible. Multipliers apply for quick consecutive hits!</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>Improving Focus and Peripheral Awareness</h3>
        <p><strong>Whack-a-Vibe</strong> is a classic test of reaction time and impulse control. It trains the brain to differentiate between "targets" and "distractors" under high pressure. This skill—the ability to selectively process visual information—is essential for everything from driving to competitive athletics.</p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>✨ Importance: Skill & Health Benefits</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', margin: '32px 0' }}>
          <div>
            <h4 style={{ color: '#f59e0b', marginBottom: '8px' }}>👁️ Visual Scanning</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>The game forces your eyes to scan a large area rapidly, improving your peripheral vision and tracking speed.</p>
          </div>
          <div>
            <h4 style={{ color: '#f59e0b', marginBottom: '8px' }}>🚀 Cognitive Processing</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>By requiring instant decisions (to hit or not to hit), Whack-a-Vibe helps sharpen your neuro-pathway speeds for better mental agility.</p>
          </div>
        </div>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
