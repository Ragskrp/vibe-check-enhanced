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

        <p>
          Hot Takes is a simple voting game. You read a short opinion, choose a side, and then
          compare your answer with the split from other players. The point is not to prove a fact.
          It is to see where your instinct lands on a question people can reasonably disagree on.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          What makes a prompt work
        </h3>
        <p>
          The best prompts sit in the middle ground. If the answer feels completely obvious, there
          is no tension. If the statement is too vague or too extreme, the result is less fun. The
          interesting rounds are the ones that sound simple but reveal different habits, tastes, or
          priorities once people start voting.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Good ways to use the page
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Play solo if you want quick feedback on where you stand.</li>
          <li style={{ marginBottom: '10px' }}>Read prompts aloud with friends before anyone votes.</li>
          <li style={{ marginBottom: '10px' }}>Treat the result as a snapshot of participation, not a serious poll.</li>
        </ul>

        <p>
          Hot Takes works best when the conversation stays light. It is meant for low-stakes debate,
          not for claims that require expertise or sensitive personal advice.
        </p>
      </article>
    </>
  );
}
