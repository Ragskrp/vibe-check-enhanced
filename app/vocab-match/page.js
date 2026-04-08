import AdBanner from '../components/AdBanner';
import VocabGame from './VocabGame';

export const metadata = {
  title: 'Vocab Vibe | Vocabulary Match Game',
  description: 'Match words to definitions in a browser-based vocabulary game with solo practice and room play.',
  keywords: ['vocabulary game', 'word match', 'definition game', 'browser learning game', 'multiplayer vocab'],
  openGraph: {
    url: '/vocab-match',
    title: 'Vocab Vibe | Vocabulary Match Game | VIBEMENOW',
    description: 'Match words to meanings in solo play or a live room with friends.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/vocab-match',
  },
};

export const dynamic = 'force-dynamic';

export default function VocabMatchPage() {
  return (
    <div className="page-container">
      <VocabGame />

      <article
        className="seo-guide"
        style={{
          maxWidth: '800px',
          margin: '64px auto',
          padding: '0 20px',
          color: '#ccc',
          lineHeight: '1.7',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h2 style={{ color: '#fbbf24', fontSize: '2.2em', marginBottom: '24px', fontWeight: 900 }}>
          About Vocab Vibe
        </h2>

        <p>
          Vocab Vibe is a matching game built around terms and definitions. You can use it as a
          quick solo practice tool or open a room and race other players through the same set of
          prompts.
        </p>

        <div
          className="card"
          style={{
            padding: '32px',
            marginBottom: '40px',
            background: 'rgba(251, 191, 36, 0.03)',
            borderColor: 'rgba(251, 191, 36, 0.1)',
          }}
        >
          <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>How to play</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>1. Pick a mode:</strong> play alone or start a room.</li>
            <li style={{ marginBottom: '12px' }}><strong>2. Choose a topic:</strong> each set focuses on a themed group of terms.</li>
            <li style={{ marginBottom: '12px' }}><strong>3. Match carefully:</strong> pair each term with the definition that fits best.</li>
            <li style={{ marginBottom: '12px' }}><strong>4. Build pace:</strong> accurate early matches make the later rounds easier.</li>
          </ul>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginTop: '32px', marginBottom: '20px' }}>
          A practical way to improve
        </h3>
        <p>
          Read for anchor words first. Definitions often include one or two clear signals that make
          them easier to place. In timed rounds, it is usually better to lock obvious matches early
          and return to the ambiguous pairs afterward.
        </p>

        <p>
          Vocab Vibe is still a game, so the goal is not formal instruction. It is a quick matching
          exercise that works best when you want a small dose of recall and pattern recognition.
        </p>
      </article>

      <div style={{ marginTop: 40 }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );
}
