import Link from 'next/link';

export const metadata = {
  title: 'Community Guidelines | VIBEMENOW',
  description: 'Rules and moderation expectations for nicknames, answers, prompts, and other player-submitted content on VIBEMENOW.',
  alternates: {
    canonical: '/community-guidelines',
  },
  openGraph: {
    url: '/community-guidelines',
  },
};

const sectionTitleStyle = {
  color: '#fff',
  fontSize: '20px',
  marginTop: '32px',
  marginBottom: '12px'
};

export default function CommunityGuidelinesPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '860px', margin: '0 auto', padding: '40px' }}>
        <h1 className="game-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '20px' }}>
          Community <span style={{ color: '#ffe600' }}>Guidelines</span>
        </h1>

        <div style={{ color: '#ccc', lineHeight: '1.75', fontSize: '15px' }}>
          <p style={{ marginBottom: '20px' }}>
            Last Updated: April 8, 2026
          </p>

          <p style={{ marginBottom: '20px' }}>
            Some VIBEMENOW experiences allow player-submitted nicknames, guesses, or written answers. These guidelines explain what is
            acceptable and what is not. They are intended to protect players, keep the site suitable for a broad audience, and support
            responsible monetization.
          </p>

          <h2 style={sectionTitleStyle}>1. Keep It Safe and Respectful</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>No hate speech, harassment, threats, or content that targets protected groups.</li>
            <li style={{ marginBottom: '8px' }}>No sexually explicit, violent, or shock content.</li>
            <li style={{ marginBottom: '8px' }}>No promotion of illegal activity, self-harm, scams, or dangerous behavior.</li>
            <li>No impersonation, doxxing, or attempts to expose private information.</li>
          </ul>

          <h2 style={sectionTitleStyle}>2. Nicknames and Player Answers</h2>
          <p>
            Nicknames, guesses, and free-text answers should remain suitable for a general audience. If a feature allows text input,
            players should assume that submissions may be seen by others in the room and may be removed or blocked if they break these rules.
          </p>

          <h2 style={sectionTitleStyle}>3. Moderation Approach</h2>
          <p>
            Until stronger moderation tooling is in place, pages centered on unmoderated player-submitted content may be kept free of ads
            or excluded from indexing. That helps reduce risk to players, advertisers, and the site overall while moderation standards are
            still evolving.
          </p>

          <h2 style={sectionTitleStyle}>4. Reporting Problems</h2>
          <p>
            If you encounter abusive content, impersonation, or a prompt that should be removed, please report it through the <Link href="/contact" style={{ color: '#ffe600', textDecoration: 'underline' }}>contact page</Link>.
            Include the game name, the room code if relevant, and a short description of what happened.
          </p>

          <h2 style={sectionTitleStyle}>5. Enforcement</h2>
          <p>
            Content or users that violate these rules may be removed, blocked, or restricted from future participation. Repeated abuse may
            lead to feature-level changes, stricter filters, or removal of the affected experience from monetized sections of the site.
          </p>
        </div>
      </div>
    </div>
  );
}
