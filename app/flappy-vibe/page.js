import FlappyGame from './FlappyGame';
import AdBanner from '../components/AdBanner';

export const metadata = {
  title: 'Flappy Vibe | VIBEMENOW',
  description: 'Tap, click, or space to flap your way through high-stakes obstacles. Free browser-based skill game to test your reflexes.',
  alternates: {
    canonical: '/flappy-vibe',
  },
  openGraph: {
    url: '/flappy-vibe',
  },

};

export default function FlappyVibePage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#00ff94', marginBottom: 8, marginTop: 32 }}>
          FLAPPY VIBE 🕊️
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Tap, Click, or press Space to fly. Don&apos;t hit the pipes!</p>
      </div>
      
      <FlappyGame />

      <article className="seo-guide" style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ color: '#00ff94', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>Flappy Vibe: A Test of Persistence and Rhythm</h2>
        
        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(0, 255, 148, 0.03)', borderColor: 'rgba(0, 255, 148, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>📖 How to Play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Tap to Flap:</strong> Every click or tap on the screen gives the bird a small upward boost.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Find the Rhythm:</strong> Avoid tapping too much or too little—the bird&apos;s gravity will drag it down instantly. Find your pace.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Direct Through Pipes:</strong> Fly through the gaps between the green pipes to keep scoring points.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Avoid One-Hit KOs:</strong> Touching any pipe or hitting the ground will result in an immediate game over.</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>Improving Focus and Reflexes</h3>
        <p>While frustratingly difficult at first, <strong>Flappy Vibe</strong> is an incredible tool for training short-term focus. Because the margins for error are so small, your brain enters a hyper-focused state known as &quot;Deep Work." This state helps in recalibrating your attention span in an age of constant digital distractions.</p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>✨ Importance: Skill & Health Benefits</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', margin: '32px 0' }}>
          <div>
            <h4 style={{ color: '#00ff94', marginBottom: '8px' }}>⚡ Hand-Eye Coordination</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>Executing precise movements at the exact right microsecond strengthens the pathways between your visual processing and motor output.</p>
          </div>
          <div>
            <h4 style={{ color: '#00ff94', marginBottom: '8px' }}>🛡️ Emotional Resilience</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>The high failure rate in Flappy-style games teaches &quot;graceful losing" and the importance of persistence in mastering a skill.</p>
          </div>
        </div>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
