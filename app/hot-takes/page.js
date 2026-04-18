import Link from 'next/link';
import HotTakesGame from './HotTakesGame';

export const metadata = {
  title: 'Hot Takes | Vote on Opinions',
  description: 'Vote agree or disagree on short opinion prompts and compare your answer with other players.',
  openGraph: {
    url: '/hot-takes',
    title: 'Hot Takes | Vote on Opinions | VIBEMENOW',
    description: 'Choose a side and compare how other players voted.',
  },
  alternates: {
    canonical: '/hot-takes',
  },
};

export const dynamic = 'force-dynamic';

export default function HotTakesPage() {
  return (
    <>
      <HotTakesGame />
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
          About Hot Takes
        </h2>

        <p style={{ marginBottom: '24px' }}>
          Hot Takes is a simple voting game. You read a short opinion, choose a side, and then
          compare your answer with the split from other players. The point is not to prove a fact.
          It is to see where your instinct lands on a question people can reasonably disagree on.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          What makes a prompt work
        </h3>
        <p style={{ marginBottom: '24px' }}>
          The best prompts sit in the middle ground. If the answer feels completely obvious, there
          is no tension. If the statement is too vague or too extreme, the result is less fun. The
          interesting rounds are the ones that sound simple but reveal different habits, tastes, or
          priorities once people start voting.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Good ways to use the page
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '24px' }}>
          <li style={{ marginBottom: '10px' }}>Play solo if you want quick feedback on where you stand.</li>
          <li style={{ marginBottom: '10px' }}>Read prompts aloud with friends before anyone votes.</li>
          <li style={{ marginBottom: '10px' }}>Treat the result as a snapshot of participation, not a serious poll.</li>
        </ul>

        <p style={{ marginBottom: '32px' }}>
          Hot Takes works best when the conversation stays light. It is meant for low-stakes debate,
          not for claims that require expertise or sensitive personal advice.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '16px' }}>Explore Similar Games</h3>
        <p style={{ marginBottom: '24px' }}>
          Love debating and voting on hot topics? You&apos;ll enjoy these community favorites:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link href="/would-you-rather" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🤔</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Would You Rather</div>
          </Link>
          <Link href="/poll-party" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🗳️</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Poll Party</div>
          </Link>
          <Link href="/vibeordie" className="card" style={{ textDecoration: 'none', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💀</div>
            <div style={{ fontWeight: '700', color: '#fff' }}>Vibe Or Die</div>
          </Link>
        </div>
      </article>
    </>
  );
}
