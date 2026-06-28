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
    title: 'Geography Guesser | Flag Recognition Game | VIBEMENOW',
    description: 'Test your world flag knowledge in a fast browser game. Identify flags, build streaks, and improve recognition over time.',
    images: [
      {
        url: '/og/geography-guesser.png',
        width: 1200,
        height: 630,
        alt: 'Geography Guesser flag game on VIBEMENOW',
      },
    ],
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

        <p style={{ marginBottom: '20px' }}>
          Geography Guesser is a rapid-fire recognition game built around world flags. While the initial rounds might seem straightforward if you are familiar with major nations, the challenge quickly scales as you encounter flags from smaller territories, island nations, and countries that share remarkably similar layouts, colors, or historical symbols.
        </p>

        <p style={{ marginBottom: '24px' }}>
          This game is designed to test your active recall—a cognitive process where retrieving information from memory strengthens your ability to remember it in the future. By placing you under a slight time pressure, Geography Guesser forces your brain to rely on pattern recognition rather than slow deliberation.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          How to Improve Your Flag Recognition
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Instead of trying to memorize every single flag as a completely isolated image, the most effective strategy is to categorize and group them by shared characteristics. Vexillology (the study of flags) shows us that flags are deeply tied to regional history and shared cultural heritage.
        </p>
        <p style={{ marginBottom: '20px' }}>
          When learning, try to focus on these grouping methods:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '24px' }}>
          <li style={{ marginBottom: '10px' }}><strong>Regional Crosses:</strong> The Nordic cross is used by Scandinavian countries (Sweden, Norway, Denmark, Finland, Iceland). Recognizing this underlying shape immediately narrows down your options.</li>
          <li style={{ marginBottom: '10px' }}><strong>Pan-African Colors:</strong> Many African nations use green, yellow, and red (or black, red, and green). These colors signify a shared history of independence and solidarity.</li>
          <li style={{ marginBottom: '10px' }}><strong>Pan-Arab Colors:</strong> Black, white, green, and red frequently appear on the flags of Middle Eastern nations, often arranged in horizontal stripes with a triangle at the hoist.</li>
          <li style={{ marginBottom: '10px' }}><strong>Tricolors and Order:</strong> The order of stripes matters immensely. For instance, Ireland (green, white, orange) and Ivory Coast (orange, white, green) are mirror images of each other. Paying attention to which color touches the flagpole is crucial.</li>
        </ul>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          The Power of Spaced Repetition
        </h3>
        <p style={{ marginBottom: '24px' }}>
          Geography Guesser works best when played in short, repeated bursts over several days rather than one massive marathon session. This takes advantage of "spaced repetition," a psychological learning technique. Your brain needs time to consolidate visual memories. Make a mental note of the flags you confuse (like Australia and New Zealand, or Romania and Chad) and review them briefly before your next game session.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px', marginTop: '40px' }}>Related Educational Content</h3>
        <p style={{ marginBottom: '24px' }}>
          Looking to apply similar learning strategies to your studies? Check out our guides:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>

          <a href="/blog/psychology-of-flow" style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
            <strong style={{ display: 'block', color: '#00d4ff', marginBottom: '4px' }}>In the Stream: Understanding Flow States</strong>
            <span style={{ fontSize: '0.9em', color: '#aaa' }}>Learn how gamified retrieval practice pushes your brain into optimal learning zones.</span>
          </a>
        </div>
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
