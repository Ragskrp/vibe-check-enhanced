import VibeQuizGame from './VibeQuizGame';
import AdGateway from '../components/AdGateway';
import PageValueSection from '../components/PageValueSection';

export const metadata = {
  title: 'Vibe Quiz | Personality-Style Browser Quiz',
  description: 'Take a light personality-style quiz and get a playful vibe result. For entertainment only.',
  openGraph: {
    url: '/vibe-quiz',
    title: 'Vibe Quiz | Personality-Style Browser Quiz | VIBEMENOW',
    description: 'Answer a short set of questions and get a playful vibe result.',
    images: [
      {
        url: '/og/vibe-quiz.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Quiz personality browser quiz on VIBEMENOW',
      },
    ],
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
        <h1 style={{ color: '#00ff94', fontSize: '2.5em', marginBottom: '20px' }}>
          The Psychology Behind the Vibe Quiz
        </h1>

        <p style={{ marginBottom: '20px' }}>
          Vibe Quiz is a short personality-style interactive game designed to map your current mood, preferences, and aesthetic choices to a playful "vibe" result. While the outcomes are meant entirely for entertainment and are not clinical or diagnostic assessments, the framework behind the quiz draws loosely on how we construct and signal identity in digital spaces.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          How the Scoring System Works
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Unlike a simple pass/fail trivia game, the Vibe Quiz uses a multi-dimensional weighting system. Every choice you make in the quiz doesn't just push you toward one single answer; instead, it adds fractional weight to several different underlying archetype categories behind the scenes. 
        </p>
        <p style={{ marginBottom: '20px' }}>
          For example, choosing a "late night city drive" aesthetic might simultaneously increase your score in the "Cyberpunk" category while slightly reducing your alignment with the "Cottagecore" or "Nature" categories. At the end of the quiz, the system calculates which overarching archetype accumulated the highest relative weight based on your unique combination of answers.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          The "Barnum Effect" and Self-Reflection
        </h3>
        <p style={{ marginBottom: '20px' }}>
          When reading your results, you might experience what psychologists call the <strong>Barnum Effect</strong> (or Forer Effect). This is the psychological phenomenon where individuals believe that generic personality descriptions apply specifically and highly accurately to them. It is the same psychological mechanism that makes horoscopes feel so personally relevant.
        </p>
        <p style={{ marginBottom: '24px' }}>
          We encourage you to use your result not as a fixed label, but as a fun mirror. If you get a "Chaotic Good" or "Neon Dreamer" vibe, ask yourself: does this reflect how I feel today, or how I wish to be seen? Retaking the quiz on a different day or when you're in a different mood will often yield entirely different paths through the scoring matrix.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px', marginTop: '40px' }}>Related Editorial Content</h3>
        <p style={{ marginBottom: '24px' }}>
          Interested in the intersection of psychology, digital identity, and gaming? Read our related features:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <a href="/blog/psychology-of-flow" style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
            <strong style={{ display: 'block', color: '#00d4ff', marginBottom: '4px' }}>In the Stream: Understanding Flow States</strong>
            <span style={{ fontSize: '0.9em', color: '#aaa' }}>How interactive experiences and games capture our attention and alter our state of mind.</span>
          </a>
          <a href="/tech-news/sam-altman-ai-infrastructure" style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
            <strong style={{ display: 'block', color: '#00d4ff', marginBottom: '4px' }}>Sam Altman Unveils Massive AI Infrastructure Plan</strong>
            <span style={{ fontSize: '0.9em', color: '#aaa' }}>How emerging technologies are shaping the future of digital interaction and personal data.</span>
          </a>
        </div>
      </article>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 40px' }}>
        <PageValueSection
          title="Use Quiz Results As Reflection Prompts"
          summary="This quiz is for entertainment, but it still works best when you reflect on answer patterns instead of only reading the final label."
          points={[
            { label: 'Pattern over one-off result', text: 'Retakes with changed choices show which question clusters influence outcome categories.' },
            { label: 'Conversation starter value', text: 'Result cards are useful prompts for discussion, not personality diagnosis.' },
            { label: 'Fast low-friction format', text: 'Short completion time makes it suitable for repeat play without user fatigue.' },
          ]}
          checklist={[
            'Compare two runs with different choices.',
            'Check which question type shifts your result most.',
            'Treat outcomes as prompts, not fixed identity labels.',
          ]}
        />
      </div>
    </>
  );
}
