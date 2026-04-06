import VibeClickerGame from './VibeClickerGame';
import AdBanner from '../components/AdBanner';

export const metadata = {title: 'Vibe Clicker | VIBEMENOW',
  description: 'The ultimate idle clicking experience. Generate energy, buy upgrades, and automate your vibes. Play Vibe Clicker free online.',
  alternates: {
    canonical: '/vibe-clicker',
  },
  openGraph: {
    url: '/vibe-clicker',
  },
};

export default function VibeClickerPage() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#00d4ff', marginBottom: 8, marginTop: 32 }}>
          VIBE CLICKER 👆
        </h1>
        <p style={{ color: '#888', fontSize: 16 }}>Click the main vibe to generate energy. Buy upgrades and automate!</p>
      </div>
      
      <VibeClickerGame />

      <article className="seo-guide" style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ color: '#00d4ff', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>Vibe Clicker: The Ultimate Idle Gaming Experience</h2>
        
        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(0, 212, 255, 0.03)', borderColor: 'rgba(0, 212, 255, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>📖 How to Play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Tap to Generate:</strong> Click the large central icon to earn your first Vibe points.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Shop for Upgrades:</strong> Use your points to buy "Self-Clickers" and "Vibe Factories" that generate income automatically.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Multiply Your Power:</strong> Purchase click multipliers to significantly increase the points you get from every manual tap.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Ascend:</strong> Keep scaling your production until you reach billions of vibes per second!</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '48px', marginBottom: '20px' }}>The Psychology Behind Clicker Games</h3>
        <p>Idle games like <strong>Vibe Clicker</strong> tap into a fundamental human psychological loop called the "Compulsion Loop." By providing immediate, visual feedback for every action (a click), the brain receives a tiny burst of dopamine. As you begin to automate this process with upgrades, the satisfaction of seeing your numbers grow exponentially provides a sense of mastery and progression that is incredibly rewarding.</p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>✨ Importance: Skill & Health Benefits</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', margin: '32px 0' }}>
          <div>
            <h4 style={{ color: '#00d4ff', marginBottom: '8px' }}>🧠 Cognitive Focus</h4>
            <p style={{ fontSize: '14px', color: '#999' }}>Clicker games require players to manage resources and decide on the most efficient upgrade path, sharpening basic economic and mathematical intuition.</p>
          </div>
          <div>
            <h4 style={{ color: '#00d4ff', marginBottom: '8px' }}>💆 Stress Relief</h4>
            <p style={{ fontSize: '14px', color: '#999' }}>The low-stakes, high-reward nature of Vibe Clicker makes it an excellent "palate cleanser" for the brain after intense work or study sessions.</p>
          </div>
        </div>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
