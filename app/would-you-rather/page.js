import Link from 'next/link';
import WouldYouRatherGame from './WouldYouRatherGame';
import AdGateway from '../components/AdGateway';

export const metadata = {
  title: 'Would You Rather | Impossible Choices Game',
  description: 'Pick between two difficult choices and compare your decision with other players in this browser-based party game.',
  openGraph: {
    url: '/would-you-rather',
    title: 'Would You Rather | Impossible Choices | VIBEMENOW',
    description: 'Choose between two awkward, funny, or impossible options.',
  },
  alternates: {
    canonical: '/would-you-rather',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';

export default function WouldYouRatherPage() {
  return (
    <>
      <AdGateway gameName="Would You Rather">
        <WouldYouRatherGame />
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
          About Would You Rather
        </h2>

        <p style={{ marginBottom: '24px' }}>
          Would You Rather is a choice game built around forced trade-offs. Each round presents two
          options, and the fun comes from deciding which downside, benefit, or absurd consequence
          you are more willing to accept.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Why some questions are better than others
        </h3>
        <p style={{ marginBottom: '24px' }}>
          The strongest dilemmas feel balanced. If one answer is clearly better, there is no debate.
          A good prompt makes you pause, compare trade-offs, and defend your reasoning even if the
          question itself is silly.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Best way to play
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '24px' }}>
          <li style={{ marginBottom: '10px' }}>Read both options fully before deciding.</li>
          <li style={{ marginBottom: '10px' }}>If you are with friends, argue your case before anyone clicks.</li>
          <li style={{ marginBottom: '10px' }}>Use the result split as conversation fuel, not as proof that one answer is correct.</li>
        </ul>

        <p style={{ marginBottom: '32px' }}>
          Because the game is based on hypothetical scenarios, it works best as entertainment and
          social icebreaking rather than serious decision-making. 
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Explore Similar Games</h3>
        <p style={{ marginBottom: '24px' }}>
          If you enjoy social games and quizzes, you might also like these:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link href="/flappy-vibe" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🐦</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Flappy Vibe</div>
          </Link>
          <Link href="/reaction-arena" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Reaction Arena</div>
          </Link>
          <Link href="/2048-vibe" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧩</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Merge Vibe</div>
          </Link>
        </div>
      </article>
    </>
  );
}
