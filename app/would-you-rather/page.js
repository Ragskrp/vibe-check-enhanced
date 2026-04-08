import WouldYouRatherGame from './WouldYouRatherGame';

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
};

export const dynamic = 'force-dynamic';

export default function WouldYouRatherPage() {
  return (
    <>
      <WouldYouRatherGame />
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

        <p>
          Would You Rather is a choice game built around forced trade-offs. Each round presents two
          options, and the fun comes from deciding which downside, benefit, or absurd consequence
          you are more willing to accept.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Why some questions are better than others
        </h3>
        <p>
          The strongest dilemmas feel balanced. If one answer is clearly better, there is no debate.
          A good prompt makes you pause, compare trade-offs, and defend your reasoning even if the
          question itself is silly.
        </p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>
          Best way to play
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Read both options fully before deciding.</li>
          <li style={{ marginBottom: '10px' }}>If you are with friends, argue your case before anyone clicks.</li>
          <li style={{ marginBottom: '10px' }}>Use the result split as conversation fuel, not as proof that one answer is correct.</li>
        </ul>

        <p>
          Because the game is based on hypothetical scenarios, it works best as entertainment and
          social icebreaking rather than serious decision-making.
        </p>
      </article>
    </>
  );
}
