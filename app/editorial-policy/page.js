import Link from 'next/link';

export const metadata = {
  title: 'Editorial Policy | VIBEMENOW',
  description: 'How VIBEMENOW plans, tests, updates, and maintains its games, guides, and editorial content.',
  alternates: {
    canonical: '/editorial-policy',
  },
  openGraph: {
    url: '/editorial-policy',
  },
};

const sectionTitleStyle = {
  color: '#fff',
  fontSize: '20px',
  marginTop: '32px',
  marginBottom: '12px'
};

export default function EditorialPolicyPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '860px', margin: '0 auto', padding: '40px' }}>
        <h1 className="game-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '20px' }}>
          Editorial <span style={{ color: '#00d4ff' }}>Policy</span>
        </h1>

        <div style={{ color: '#ccc', lineHeight: '1.75', fontSize: '15px' }}>
          <p style={{ marginBottom: '20px' }}>
            Last Updated: April 8, 2026
          </p>

          <p style={{ marginBottom: '20px' }}>
            This page explains how VIBEMENOW creates and maintains its games, guides, and articles. It exists so visitors, reviewers,
            and advertising partners can clearly understand who the site is for, how content is produced, and what standards we aim to
            follow before publishing or updating a page.
          </p>

          <h2 style={sectionTitleStyle}>1. What We Publish</h2>
          <p>
            VIBEMENOW publishes original browser games, game instructions, strategy guides, and blog articles related to casual play,
            digital culture, and short-form gaming. Our goal is to publish content that helps someone play a game, understand how it
            works, or learn something useful about the topic without needing to leave and search again.
          </p>

          <h2 style={sectionTitleStyle}>2. How Pages Are Created</h2>
          <p>
            We aim to write from direct use of the site itself. For game pages, that means playing the game, checking the controls,
            verifying the rules shown on the page, and updating the surrounding copy when mechanics change. For guides and articles,
            we aim to publish material that adds explanation, context, or interpretation rather than repeating generic summaries.
          </p>

          <h2 style={sectionTitleStyle}>3. Originality Standard</h2>
          <p>
            We do not want pages whose only purpose is to fill space for search or ads. A page should add clear value through original
            explanation, practical tips, firsthand product knowledge, or a useful summary of how a feature works on this site. If a page
            is too thin, repetitive, outdated, or fails to help the reader complete a task, it should be rewritten, expanded, or removed.
          </p>

          <h2 style={sectionTitleStyle}>4. Accuracy and Updates</h2>
          <p>
            We review pages when gameplay, navigation, site policies, or contact details change. Time-sensitive claims should be updated
            with the page itself instead of simply changing the date. When a page can no longer be kept accurate, the preferred approach
            is to revise it substantially or stop indexing it until it is ready again.
          </p>

          <h2 style={sectionTitleStyle}>5. Trust Signals We Expect on the Site</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Clear policy pages that explain privacy, terms, disclaimers, and community standards.</li>
            <li style={{ marginBottom: '8px' }}>A visible way to contact the site team through the <Link href="/contact" style={{ color: '#00d4ff', textDecoration: 'underline' }}>contact page</Link>.</li>
            <li style={{ marginBottom: '8px' }}>Page titles and descriptions that reflect the actual page content.</li>
            <li>Content that is maintained because it serves players, not because it targets a word count.</li>
          </ul>

          <h2 style={sectionTitleStyle}>6. Ads and User Experience</h2>
          <p>
            Advertising should not come before usability. We aim to avoid serving ads on pages where user-submitted text, room codes,
            or unmoderated multiplayer interactions are central to the experience. Pages with a higher moderation burden may remain
            ad-free until better safeguards are in place.
          </p>

          <h2 style={sectionTitleStyle}>7. Corrections and Feedback</h2>
          <p>
            If you notice a factual error, a broken page, or content that feels incomplete, please use the <Link href="/contact" style={{ color: '#00d4ff', textDecoration: 'underline' }}>contact form</Link>.
            We treat substantive correction requests as maintenance work, not as optional feedback.
          </p>
        </div>
      </div>
    </div>
  );
}
