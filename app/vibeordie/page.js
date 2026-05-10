import VibeOrDieGame from './VibeOrDieGame';
import AdGateway from '../components/AdGateway';
import PageValueSection from '../components/PageValueSection';

export const metadata = {
  title: 'Vibe or Die | Reaction Time Test & Reflex Trainer | VIBEMENOW',
  description: 'How fast are your reflexes? Test your reaction time in Vibe or Die. A high-stakes focus game with instant global rankings. No login required.',
  openGraph: {
    url: '/vibeordie',
    title: 'Vibe or Die | Reflex Training | VIBEMENOW',
    description: 'Wait for the signal, react instantly, and claim your place on the leaderboard.',
    images: [
      {
        url: '/og/vibeordie.png',
        width: 1200,
        height: 630,
        alt: 'Vibe or Die reaction speed game on VIBEMENOW',
      },
    ],
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
        <h1 style={{ color: '#00ff94', fontSize: '2.5em', marginBottom: '20px' }}>
          Vibe or Die: Test Your Edge
        </h1>

        <p style={{ marginBottom: '24px', fontSize: '1.1em' }}>
          In a world of distractions, how fast can you focus? Vibe or Die is the ultimate 
          benchmark for your reflexes. Whether you\'re a competitive gamer looking to 
          shave milliseconds off your response time or just want to prove your sharpness 
          to your friends, Vibe or Die provides an instant, high-stakes arena for your 
          reaction training.
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

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 40px' }}>
        <PageValueSection
          title="Measure Progress The Right Way"
          summary="Reaction tests are useful as self-benchmark tools when conditions are kept consistent."
          points={[
            { label: 'Consistency over peak score', text: 'Median results across multiple runs are more meaningful than one outlier fast click.' },
            { label: 'Hardware-aware interpretation', text: 'Device input delay and refresh rate affect final numbers, so compare like-for-like setups.' },
            { label: 'Focus training effect', text: 'Short repeated rounds can improve readiness and sustained attention.' },
          ]}
          checklist={[
            'Use the same device for comparison.',
            'Track average of 5 runs, not one run.',
            'Take short pauses to avoid anticipation clicks.',
          ]}
        />
      </div>
    </>
  );
}
