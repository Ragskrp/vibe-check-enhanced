import VibeOrDieGame from './VibeOrDieGame';
import AdGateway from '../components/AdGateway';

export const metadata = {
  title: 'Vibe or Die | Reaction Speed Game',
  description: 'Test your reaction speed in a simple browser-based reflex game. Wait for the signal, then click as fast as you can.',
  openGraph: {
    url: '/vibeordie',
    title: 'Vibe or Die | Reaction Speed Game | VIBEMENOW',
    description: 'Wait for the signal and test your reaction speed.',
  },
  alternates: {
    canonical: '/vibeordie',
  },
};

export default function VibeOrDiePage() {
  return (
    <>
      <AdGateway gameName="Vibe or Die">
        <VibeOrDieGame />
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
          About Vibe or Die
        </h2>

        <p>
          Vibe or Die is a straightforward reaction test. The page waits, the visual signal
          appears, and your job is to respond as quickly as possible. Because the rules are so
          small, most of the challenge comes from timing and focus rather than memorization.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          What affects your score
        </h3>
        <p>
          Your result is shaped by both your own response and the device you are using. Screen
          refresh rate, input lag, and mobile tap delay can all affect the number you see, so the
          game works best as a personal benchmark rather than a scientific measurement.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Tips for cleaner attempts
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Use the same device when comparing scores over time.</li>
          <li style={{ marginBottom: '10px' }}>Keep your hand ready, but avoid clicking too early.</li>
          <li style={{ marginBottom: '10px' }}>Take a short pause between runs so anticipation does not turn into guesswork.</li>
        </ul>

        <p>
          The best use for this page is quick repetition. Run a few rounds, take the best score,
          and come back later if you want to compare how consistent you are.
        </p>
      </article>
    </>
  );
}
