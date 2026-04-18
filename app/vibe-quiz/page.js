import VibeQuizGame from './VibeQuizGame';
import AdGateway from '../components/AdGateway';

export const metadata = {
  title: 'Vibe Quiz | Personality-Style Browser Quiz',
  description: 'Take a light personality-style quiz and get a playful vibe result. For entertainment only.',
  openGraph: {
    url: '/vibe-quiz',
    title: 'Vibe Quiz | Personality-Style Browser Quiz | VIBEMENOW',
    description: 'Answer a short set of questions and get a playful vibe result.',
  },
  alternates: {
    canonical: '/vibe-quiz',
  },
};

export default function VibeQuizPage() {
  return (
    <>
      <AdGateway gameName="Vibe Quiz">
        <VibeQuizGame />
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
          About Vibe Quiz
        </h2>

        <p>
          Vibe Quiz is a short personality-style game that groups answers into playful result
          labels. It is designed for fun and sharing, not for diagnosis, prediction, or any kind
          of professional assessment.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          How the results work
        </h3>
        <p>
          Your choices add weight to different result categories behind the scenes. At the end, the
          quiz shows the label that best matches the pattern of answers you gave during that run.
          If you answer differently on another day, you may land on a different result.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          A good way to read the outcome
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Treat the result as a theme or prompt, not a fixed identity.</li>
          <li style={{ marginBottom: '10px' }}>Retaking the quiz can show how different answer paths change the outcome.</li>
          <li style={{ marginBottom: '10px' }}>Share it if it is fun, but do not treat it as a scientific personality measure.</li>
        </ul>

        <p>
          The page is intentionally lightweight. It is meant to be a quick interactive break with a
          readable result card at the end.
        </p>
      </article>
    </>
  );
}
