import Link from 'next/link';

export const metadata = {
  title: 'The Cognitive Science of Reaction Times in Gaming',
  description: 'How the brain processes visual stimuli, and the difference between true reaction speed and anticipation.',
  alternates: {
    canonical: '/blog/cognitive-science-reaction-times',
  },
  openGraph: {
    url: '/blog/cognitive-science-reaction-times',
    title: 'The Cognitive Science of Reaction Times in Gaming | VIBEMENOW',
    description: 'Explore the biological limits of human reflexes and how gamers bypass them through anticipation.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function CognitiveScienceReactionTimes() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', lineHeight: '1.8', color: '#e0e0e0', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '30px' }}>
        <h1 style={{ color: '#00d4ff', fontSize: '2.5rem', marginBottom: '16px', lineHeight: '1.2' }}>
          The Cognitive Science of Reaction Times in Gaming
        </h1>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.95rem', color: '#888' }}>
          <span>⏱️ 6 min read</span>
          <span>•</span>
          <span>May 2026</span>
          <span>•</span>
          <span style={{ color: '#b14aed' }}>Science</span>
        </div>
      </header>

      <article style={{ fontSize: '1.1rem' }}>
        <p style={{ marginBottom: '24px' }}>
          When you click the mouse exactly as the screen turns green, it feels instantaneous. But between the monitor changing color and your finger completing the click, a complex sequence of biological and mechanical events occurs. Understanding this sequence—the cognitive science of reaction time—reveals why human reflexes have hard biological limits, and how top-tier gamers manage to seemingly break them.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>
          The Biological Pipeline
        </h2>
        <p style={{ marginBottom: '24px' }}>
          Average human visual reaction time hovers around 250 milliseconds (a quarter of a second). To understand why we can't get much faster than 150ms purely on reaction, we have to look at the neural pathway:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '30px' }}>
          <li style={{ marginBottom: '12px' }}><strong>1. Photoreception (10-20ms):</strong> Light from the screen hits the retina, where photoreceptor cells translate photons into electrical signals.</li>
          <li style={{ marginBottom: '12px' }}><strong>2. Neural Transmission (20-40ms):</strong> The signal travels down the optic nerve to the visual cortex at the back of the brain.</li>
          <li style={{ marginBottom: '12px' }}><strong>3. Processing & Decision (40-60ms):</strong> The brain identifies the stimulus and decides on a motor response. This is the stage most affected by cognitive load and fatigue.</li>
          <li style={{ marginBottom: '12px' }}><strong>4. Motor Command (10-20ms):</strong> The motor cortex sends a signal down the spinal cord to the muscles in the arm and hand.</li>
          <li style={{ marginBottom: '12px' }}><strong>5. Muscle Activation (10-20ms):</strong> The muscles contract to execute the click.</li>
        </ul>

        <h2 style={{ color: '#fff', fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>
          Raw Reaction vs. Anticipation
        </h2>
        <p style={{ marginBottom: '24px' }}>
          If a professional gamer reacts in 120ms, are they defying biology? Usually, the answer is no. They are utilizing <em>anticipation</em>. 
        </p>
        <p style={{ marginBottom: '24px' }}>
          In a controlled reflex test where the stimulus happens at a truly random interval, elite times sit around 150-160ms. However, in an actual game environment, players constantly read contextual clues—footsteps, animation wind-ups, or map positioning. By processing these clues, the brain pre-loads the motor command. When the actual stimulus occurs, the brain skips the "Processing & Decision" phase entirely, resulting in sub-150ms times that look superhuman but are actually the result of extreme pattern recognition.
        </p>
        <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', borderLeft: '4px solid #00d4ff', marginBottom: '30px' }}>
          <strong>Test it yourself:</strong> Try the <Link href="/vibeordie" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Vibe or Die Reaction Test</Link>. Notice how your first few attempts might be around 250ms, but as you settle into a rhythm, you might drop closer to 200ms. If you score under 100ms, you didn't react—you guessed.
        </div>

        <h2 style={{ color: '#fff', fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>
          Hick's Law and Choice Reaction Time
        </h2>
        <p style={{ marginBottom: '24px' }}>
          Simple reaction time (one stimulus, one response) is only part of the story. <strong>Hick's Law</strong> dictates that the time it takes to make a decision increases logarithmically as the number of choices increases.
        </p>
        <p style={{ marginBottom: '24px' }}>
          If you are waiting for a red target to appear to click it (simple reaction), you will be fast. If you must click red targets, ignore blue targets, and swipe on green targets (choice reaction), your response time will plummet, often doubling to 400ms or more. Game designers use Hick's Law to balance difficulty; forcing a player to make a choice under pressure is often harder than just forcing them to be fast.
        </p>
        <p style={{ marginBottom: '30px' }}>
          You can experience choice reaction time in action by playing <Link href="/reaction-arena" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Reaction Arena</Link>, where the rules dictate ignoring specific visual stimuli while reacting to others.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>
          The Hardware Tax
        </h2>
        <p style={{ marginBottom: '24px' }}>
          Finally, we must acknowledge system latency. A 60Hz monitor displays a new frame every 16.6 milliseconds. A wireless mouse might add 5-10ms of polling delay. The browser processing the Javascript adds a few more. A player scoring 200ms on a standard office setup might instantly score 180ms on a 240Hz monitor with a wired mouse—not because their brain got faster, but because the hardware tax was removed.
        </p>

        <p style={{ marginTop: '40px', color: '#888', fontStyle: 'italic' }}>
          Understanding these mechanisms allows us to measure ourselves more accurately and appreciate the incredible biological machinery required to perform a simple mouse click.
        </p>
      </article>
    </div>
  );
}
