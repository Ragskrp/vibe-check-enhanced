import Link from 'next/link';
import EmojiIQGame from './EmojiIQGame';

export const metadata = {
  title: 'Emoji IQ | Guess the Emoji Puzzle',
  description: 'Decode emoji puzzles that hint at phrases, names, and common references. Play Emoji IQ free in your browser.',
  openGraph: {
    url: '/emoji-iq',
    title: 'Emoji IQ | Guess the Emoji Puzzle | VIBEMENOW',
    description: 'Solve emoji clues using context, wordplay, and pattern recognition.',
  },
  alternates: {
    canonical: '/emoji-iq',
  },
};

export default function EmojiIQPage() {
  return (
    <>
      <EmojiIQGame />
      <article
        className="seo-guide"
        style={{
          maxWidth: '800px',
          margin: '40px auto',
          padding: '0 20px',
          color: '#ccc',
          lineHeight: '1.7',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h2 style={{ color: '#00ff94', fontSize: '2em', marginBottom: '20px' }}>
          About Emoji IQ
        </h2>

        <p style={{ marginBottom: '24px' }}>
          Emoji IQ turns familiar symbols into short puzzle clues. Some answers are literal, some
          rely on wordplay, and some only make sense once you think about a phrase or pop-culture
          reference the emojis suggest together.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          How to read the clues
        </h3>
        <p style={{ marginBottom: '24px' }}>
          Start by deciding whether the emojis should be read as objects, sounds, or ideas. A bee
          may mean the insect, the letter B, or a syllable inside a larger word. The most useful
          shift is often moving between those possibilities instead of staring at the icons as
          fixed meanings.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          A simple solving routine
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '24px' }}>
          <li style={{ marginBottom: '10px' }}>Name each emoji out loud in the simplest possible way.</li>
          <li style={{ marginBottom: '10px' }}>Check whether the clue sounds like a phrase when read quickly.</li>
          <li style={{ marginBottom: '10px' }}>Use the answer length or letter bank to rule out overcomplicated guesses.</li>
        </ul>

        <p style={{ marginBottom: '32px' }}>
          The fun of Emoji IQ comes from shared context. Two people may read the same set of icons
          differently, which is why these puzzles work especially well as quick social challenges.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Explore Similar Games</h3>
        <p style={{ marginBottom: '24px' }}>
          Ready for more brain teasers and lateral thinking challenges?
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link href="/wordvibe" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📝</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>WordVibe</div>
          </Link>
          <Link href="/odd-one-out" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎨</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Odd One Out</div>
          </Link>
          <Link href="/quiz-arena" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚔️</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Quiz Arena</div>
          </Link>
        </div>
      </article>
    </>
  );
}
