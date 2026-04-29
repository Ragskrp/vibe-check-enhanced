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
        VIBEMENOW is a comprehensive browser-game and learning ecosystem built around quick, original activities:
        word puzzles, reflex challenges, social voting games, memory rounds, geography practice, and
        rigorous GCSE revision tools. Our foundational philosophy is that digital entertainment should not be empty calories. The aim is to make each page significantly useful before it is monetized. A visitor
        should be able to understand the underlying cognitive mechanics of the activity, play it without creating an account, and
        read enough pedagogical context to decide whether it suits a quick break, a classroom warm-up, or a group
        session with friends. We believe in "micro-learning" — the idea that engaging with short, highly focused bursts of cognitively demanding tasks can improve neuroplasticity and daily focus.
      </p>
      <p>
        The internet is currently flooded with low-effort, auto-generated content. This site is unequivocally different. It is not a file-download directory, a scraped-games portal, or a collection of thin pages
        made only to display advertising. Every single game, quiz, and learning module has been meticulously designed in-house to serve a specific educational or cognitive purpose. Each game page includes its own comprehensive explanation of its history, the behavioral psychology behind its core loop, strategy notes for mastery,
        and links to related formats. 
      </p>
      <p>
        The blog and guide sections add extensive, long-form editorial material about
        learning science, memory retention, puzzles, decision-making theory, and healthy ways to use lightweight digital games to combat cognitive fatigue. That
        publisher layer matters deeply because the playable tool is only one part of the value equation; the surrounding
        text, detailed guides, and structured data help visitors, educators, and search crawlers understand the profound purpose behind every route on this platform. We are committed to transparency, educational rigor, and providing a premium user experience.
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
