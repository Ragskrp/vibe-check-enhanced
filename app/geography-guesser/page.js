import GeographyGuesserGame from './GeographyGuesserGame';
import AdGateway from '../components/AdGateway';
import PageValueSection from '../components/PageValueSection';

export const metadata = {
  title: 'Geography Guesser | Flag Recognition Game',
  description: 'Test your world flag knowledge in a fast browser game. Identify flags, build streaks, and improve recognition over time.',
  alternates: {
    canonical: '/geography-guesser',
  },
  openGraph: {
    url: '/geography-guesser',
  },
};

export const dynamic = 'force-dynamic';

export default function GeographyGuesserPage() {
  return (
    <>
      <AdGateway gameName="Geography Guesser">
        <GeographyGuesserGame />
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
          About Geography Guesser
        </h2>

        <p>
          Geography Guesser is a recognition game built around world flags. The rounds are quick,
          but the challenge grows as you start running into designs that share similar layouts,
          colors, or symbols.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          How to improve faster
        </h3>
        <p>
          Instead of trying to memorize every flag as a separate item, it helps to group them.
          Some are easier to remember by region, some by color family, and some by one distinctive
          element such as a star, crest, cross, or stripe order.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Good patterns to watch for
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Nordic-style crosses are a strong first clue for a small group of countries.</li>
          <li style={{ marginBottom: '10px' }}>Vertical tricolours can look similar, so stripe order matters.</li>
          <li style={{ marginBottom: '10px' }}>Flags with crests or seals often become easier once you remember the overall layout first.</li>
        </ul>

        <p>
          This page works well as repeated practice. You do not need to master everything at once;
          better recognition usually comes from seeing the same patterns several times in short sessions.
        </p>
      </article>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 40px' }}>
        <PageValueSection
          title="How To Get Real Learning Value From This Game"
          summary="Treat each round as retrieval practice. The goal is not only score, but faster flag recognition and fewer repeated confusion pairs."
          points={[
            { label: 'Pattern-first strategy', text: 'Classify by shape blocks, cross styles, stripe direction, and emblem position before guessing.' },
            { label: 'Error correction loop', text: 'Record the 3 flags you miss most and revisit them after every session.' },
            { label: 'Short repeat sessions', text: 'Two 5-minute rounds with review usually outperform one long unstructured round.' },
          ]}
          checklist={[
            'Group misses by region or flag structure.',
            'Review confusion pairs before the next session.',
            'Track progress weekly, not per single run.',
          ]}
        />
      </div>
    </>
  );
}
