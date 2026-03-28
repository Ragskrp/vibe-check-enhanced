import VocabGame from './VocabGame';
import AdBanner from '../components/AdBanner';

export const metadata = {
  title: "Vocab Vibe — Daily Vocabulary Match Game",
  description: "Challenge your brain with Vocab Vibe. Match geometry, science, and digital culture terms to their correct definitions in this fast-paced daily matching game.",
  keywords: ["vocabulary game", "word match", "geometry quiz", "science terms", "daily brain game", "educational puzzle", "multiplayer vocab"],
  openGraph: {
    title: "Vocab Vibe — Boost Your Brain Daily",
    description: "The ultimate vocabulary matching challenge. No login. Just vibes. ⚡",
    images: ["/og-image.png"]
  }
};

export default function VocabMatchPage() {
  return (
    <div className="page-container">
      <VocabGame />

      <article className="seo-guide" style={{ maxWidth: '800px', margin: '64px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ color: '#fbbf24', fontSize: '2.5em', marginBottom: '24px', fontWeight: 900 }}>Vocab Vibe: Mastering Definitions Thru Play</h2>
        
        <div className="card" style={{ padding: '32px', marginBottom: '40px', background: 'rgba(251, 191, 36, 0.03)', borderColor: 'rgba(251, 191, 36, 0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>📖 How to Play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Select Your Mode:</strong> Choose between <b>Solo Practice</b> to learn at your own pace or <b>Arena Mode</b> to race friends.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Pick a Topic:</strong> From Geometry to Tech & AI, select a topic that challenges your current knowledge.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Connect the Vibes:</strong> Tap a Term on the left, then tap its matching Definition on the right.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Build Your Streak:</strong> Correct matches increase your streak. Use a <b>Hint</b> if you're stuck, but remember—you only get 3!</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '48px', marginBottom: '20px' }}>The Science of Associative Memory</h3>
        <p>
          <b>Vocab Vibe</b> is designed around the psychological principle of <b>Associative Learning</b>. By visually and mentally connecting two distinct pieces of information (a term and its meaning), your brain creates stronger synaptic links than it would through passive reading. This is known as the <i>Testing Effect</i>, where the act of retrieving information from memory significantly improves long-term retention.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>✨ Brain & Health Benefits</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', margin: '32px 0' }}>
          <div>
            <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>🧠 Cognitive Agility</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>Scanning multiple definitions under time pressure (especially in Arena mode) trains your brain to filter irrelevant data and focus on key semantic markers.</p>
          </div>
          <div>
            <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>📚 Knowledge Synthesis</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>Exposure to diverse topics across Science, Art, and Digital Culture builds 'Crystallized Intelligence'—the ability to use skills, knowledge, and experience.</p>
          </div>
          <div>
            <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>⚡ Processing Speed</h4>
            <p style={{ fontSize: '15px', color: '#999', lineHeight: '1.6' }}>The competitive nature of the game encourages faster information retrieval, which has been shown to improve mental reaction times in real-world scenarios.</p>
          </div>
        </div>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
