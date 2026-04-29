import Link from 'next/link';

export default function HomeEditorial() {
  return (
    <section
      className="seo-guide"
      aria-labelledby="home-editorial-heading"
      style={{
        maxWidth: 1000,
        margin: '24px auto 64px',
        padding: '0 24px',
        color: '#d3d3d3',
        lineHeight: 1.75,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2 id="home-editorial-heading" style={{ color: '#fff', fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 16 }}>
        What VIBEMENOW publishes
      </h2>
      <p>
        VIBEMENOW is a small browser-game and learning site built around quick, original activities:
        word puzzles, reflex challenges, social voting games, memory rounds, geography practice, and
        GCSE revision tools. The aim is to make each page useful before it is monetized. A visitor
        should be able to understand what the activity is, play it without creating an account, and
        read enough context to decide whether it suits a quick break, a classroom warm-up, or a group
        session with friends.
      </p>
      <p>
        The site is not a file-download directory, a scraped-games portal, or a collection of pages
        made only to display advertising. Each game page includes its own explanation, strategy notes,
        and links to related formats. The blog and guide sections add longer editorial material about
        learning, memory, puzzles, decision-making, and healthy ways to use lightweight games. That
        publisher layer matters because the playable tool is only part of the value; the surrounding
        text helps visitors and crawlers understand the purpose of every route.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, margin: '28px 0' }}>
        <div style={panelStyle}>
          <h3 style={headingStyle}>Original game loops</h3>
          <p style={paragraphStyle}>
            Pages focus on playable browser activities with clear rules, visible feedback, and short
            repeatable sessions rather than empty landing pages.
          </p>
        </div>
        <div style={panelStyle}>
          <h3 style={headingStyle}>Educational context</h3>
          <p style={paragraphStyle}>
            Word, memory, geography, trivia, and GCSE pages include practical notes that explain what
            skill the activity practises and how to improve.
          </p>
        </div>
        <div style={panelStyle}>
          <h3 style={headingStyle}>Transparent publishing</h3>
          <p style={paragraphStyle}>
            The footer links to publisher information, editorial standards, privacy terms, contact
            details, and community guidelines so reviewers and users can verify ownership.
          </p>
        </div>
      </div>

      <p>
        If you are new here, start with the full game list on the homepage, try a word or reaction
        game, then browse the guides for more deliberate practice. For ownership and standards, see{' '}
        <Link href="/publisher-information" style={linkStyle}>Publisher Information</Link>,{' '}
        <Link href="/editorial-policy" style={linkStyle}>Editorial Policy</Link>, and{' '}
        <Link href="/contact" style={linkStyle}>Contact</Link>.
      </p>
    </section>
  );
}

const panelStyle = {
  padding: 18,
  borderRadius: 10,
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.08)',
};

const headingStyle = {
  color: '#fff',
  fontSize: 18,
  marginBottom: 8,
};

const paragraphStyle = {
  margin: 0,
  color: '#bdbdbd',
  fontSize: 14,
};

const linkStyle = {
  color: '#00d4ff',
  textDecoration: 'underline',
};
