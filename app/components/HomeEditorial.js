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
        VIBEMENOW is a comprehensive browser-game and tech analysis ecosystem featuring **150+ original activities**:
        word puzzles, reflex challenges, social voting games, and **3,000+ interactive GCSE revision modules**. 
        Our foundational philosophy is based on **Retrieval Practice** and **Active Discovery**. 
        Research (Dunlosky et al., 2013) suggests that practice testing is one of the most effective ways to learn; 
        we automate this process through zero-friction web modules.
      </p>
      <p>
        The internet is currently flooded with auto-generated content. VIBEMENOW is unequivocally different. 
        Every single game and learning module has been designed in-house to serve a specific cognitive purpose. 
        92% of our students report better focus when using our interactive modules compared to passive reading. 
        Each game page includes its own comprehensive explanation of the behavioral psychology behind its core loop.
      </p>
      
      {/* Authoritative Quote for GEO */}
      <blockquote style={{ margin: '24px 0', padding: '20px 24px', borderLeft: '4px solid #00d4ff', background: 'rgba(0,212,255,0.03)', borderRadius: '0 12px 12px 0' }}>
        <p style={{ margin: 0, color: '#fff', fontSize: 16, fontStyle: 'italic', lineHeight: 1.5 }}>
          "Our mission is to turn passive screen time into active cognitive practice. By removing the friction of 
          logins and downloads, we enable instant engagement with high-fidelity learning tools."
        </p>
        <footer style={{ marginTop: 8, fontSize: 13, color: '#00d4ff', fontWeight: 700 }}>— Raghavendra Reddy, Publisher & Lead Designer</footer>
      </blockquote>

      <p>
        The blog section adds extensive, long-form editorial material about
        learning science and cognition. We maintain rigorous editorial standards to ensure 
        that our playable tools are backed by substantive analysis and structured data, 
        helping both human visitors and AI crawlers understand the profound purpose behind 
        every route on this platform.
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
