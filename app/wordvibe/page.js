import Link from 'next/link';
import WordVibeClient from './WordVibeClient';
import AdGateway from '../components/AdGateway';
import PageValueSection from '../components/PageValueSection';

export const metadata = {
  title: 'WordVibe | 5-Letter Word Game',
  description: 'Guess the 5-letter word in 6 tries. WordVibe is a free browser word puzzle you can play in seconds.',
  alternates: {
    canonical: '/wordvibe',
  },
  openGraph: {
    url: '/wordvibe',
    title: 'WordVibe | 5-Letter Word Game | VIBEMENOW',
    description: 'Play a fast 5-letter WordVibe round in your browser.',
  },
};

export default function WordVibePage() {
  return (
    <>
      <AdGateway gameName="WordVibe">
        <WordVibeClient />
      </AdGateway>
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
          About WordVibe
        </h2>

        <p style={{ marginBottom: '24px' }}>
          WordVibe is a browser-based word puzzle built around one simple loop: guess a
          five-letter answer in six attempts. Each guess gives you immediate feedback, so the
          game works best when you treat it as a deduction puzzle rather than a spelling test.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          How the feedback works
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '24px' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong>Green:</strong> the letter is correct and already in the right spot.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Yellow:</strong> the letter is in the answer, but it belongs somewhere else.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Dark:</strong> the letter is not part of the answer.
          </li>
        </ul>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Practical ways to improve
        </h3>
        <p style={{ marginBottom: '24px' }}>
          A strong opening guess covers common vowels and frequent consonants. After that, resist
          the urge to chase a lucky pattern too early. If you discover several likely answers that
          share the same ending, it is often smarter to spend one guess testing new letters than
          to burn multiple turns on near-identical words.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Why the fast-match format works
        </h3>
        <p style={{ marginBottom: '32px' }}>
          WordVibe is designed for short repeatable rounds. You can play one game, reset, and run
          another without setup, which makes it useful as a quick deduction puzzle rather than a
          long commitment.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Explore Similar Games</h3>
        <p style={{ marginBottom: '24px' }}>
          Love word puzzles and logic games? Try these other VIBEMENOW titles:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link href="/2048-vibe" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧩</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Merge Vibe</div>
          </Link>
          <Link href="/emoji-iq" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💡</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Emoji IQ</div>
          </Link>
          <Link href="/vocab-match" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📖</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Vocab Match</div>
          </Link>
        </div>
      </article>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 40px' }}>
        <PageValueSection
          title="Play WordVibe As A Skill Builder"
          summary="This puzzle format improves deduction quality when guesses are used to maximize information rather than chase one immediate answer."
          points={[
            { label: 'Information-first openings', text: 'Early guesses should cover common vowels and high-frequency consonants to narrow the search space.' },
            { label: 'Constraint tracking', text: 'Color feedback helps remove invalid positions and letters quickly when interpreted systematically.' },
            { label: 'Repeatable improvement', text: 'Short rounds make it easy to practice strategy and compare better decision paths over time.' },
          ]}
          checklist={[
            'Use an opener with broad letter coverage.',
            'Avoid repeating rejected letters in early turns.',
            'Use one probe guess when many similar answers remain.',
          ]}
        />
      </div>
    </>
  );
}
