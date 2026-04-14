import WordVibeGame from './WordVibeGame';

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
      <WordVibeGame />
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

        <p>
          WordVibe is a browser-based word puzzle built around one simple loop: guess a
          five-letter answer in six attempts. Each guess gives you immediate feedback, so the
          game works best when you treat it as a deduction puzzle rather than a spelling test.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          How the feedback works
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
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
        <p>
          A strong opening guess covers common vowels and frequent consonants. After that, resist
          the urge to chase a lucky pattern too early. If you discover several likely answers that
          share the same ending, it is often smarter to spend one guess testing new letters than
          to burn multiple turns on near-identical words.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Why the fast-match format works
        </h3>
        <p>
          WordVibe is designed for short repeatable rounds. You can play one game, reset, and run
          another without setup, which makes it useful as a quick deduction puzzle rather than a
          long commitment.
        </p>
      </article>
    </>
  );
}
