import Link from 'next/link';
import { Sparkles, Zap, Heart, Shield } from 'lucide-react';

export const metadata = {
  title: 'About VIBEMENOW',
  description: 'Learn what VIBEMENOW is, how the site is run, and how the team approaches privacy, moderation, and ads.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '56px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '12px',
              borderRadius: '20px',
              background: 'rgba(255, 45, 120, 0.1)',
              marginBottom: '16px',
            }}
          >
            <Zap size={32} color="#ff2d78" />
          </div>
          <h1 className="game-title" style={{ fontSize: '48px', marginBottom: '8px' }}>
            About <span style={{ color: '#ff2d78' }}>VIBEMENOW</span>
          </h1>
          <p style={{ color: '#555', fontSize: '18px', fontWeight: 600 }}>
            An independent collection of browser games, quizzes, and quick room-based experiments.
          </p>
        </div>

        <div style={{ color: '#bbb', lineHeight: '1.9', fontSize: '17px' }}>
          <p style={{ marginBottom: '28px' }}>
            VIBEMENOW is built for people who want lightweight games that open quickly and do
            not demand an account before the fun starts. The project mixes daily-style puzzles,
            reaction games, opinion games, and multiplayer rooms so visitors can either play
            alone for a minute or share a room code with friends.
          </p>

          <h2
            style={{
              color: '#00d4ff',
              fontSize: '28px',
              marginTop: '48px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Sparkles size={24} /> What We Prioritize
          </h2>
          <p style={{ marginBottom: '24px' }}>
            The core goal is simple: keep pages understandable, fast to load, and useful on
            their own. We prefer short rules, readable layouts, and game loops that do not hide
            the main interaction behind heavy setup or unnecessary filler.
          </p>
          <p style={{ marginBottom: '28px' }}>
            Some games update often, some are static score chasers, and some are room-based
            social experiences. Not every page is meant for search traffic or ad placement, so
            we separate lower-trust or community-driven routes from the main monetized pages.
          </p>

          <div
            style={{
              margin: '28px 0 40px 0',
              padding: '24px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h3 style={{ color: '#fff', fontSize: '20px', marginTop: 0, marginBottom: '12px' }}>
              Publisher Information
            </h3>
            <p style={{ marginBottom: '8px', color: '#aaa' }}>
              <strong style={{ color: '#fff' }}>Publisher:</strong> VIBEMENOW
            </p>
            <p style={{ marginBottom: '8px', color: '#aaa' }}>
              <strong style={{ color: '#fff' }}>Website:</strong> VIBEMENOW at vibemenow.uk
            </p>
            <p style={{ marginBottom: 0, color: '#aaa' }}>
              <strong style={{ color: '#fff' }}>Contact:</strong>{' '}
              <a href="mailto:support@vibemenow.uk" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
                support@vibemenow.uk
              </a>
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              margin: '48px 0',
              padding: '32px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div>
              <h3
                style={{
                  color: '#ffe600',
                  fontSize: '20px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Shield size={18} /> Privacy and data use
              </h3>
              <p style={{ fontSize: '15px', color: '#888' }}>
                The site is designed to work without traditional user accounts. Multiplayer rooms
                still require temporary session data to function, and advertising may use standard
                third-party technologies, but the goal is to keep personal data collection limited.
              </p>
            </div>
            <div>
              <h3
                style={{
                  color: '#00ff94',
                  fontSize: '20px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Heart size={18} /> Community standards
              </h3>
              <p style={{ fontSize: '15px', color: '#888' }}>
                Several room-based games allow player names, guesses, or prompt answers. Those
                routes carry additional moderation rules and are treated more carefully than the
                main single-player pages.
              </p>
            </div>
          </div>

          <h2 style={{ color: '#ff2d78', fontSize: '28px', marginTop: '48px', marginBottom: '20px' }}>
            How Ads Fit In
          </h2>
          <p style={{ marginBottom: '24px' }}>
            VIBEMENOW uses ads to support the free experience, but the site does not treat every
            route the same. Ads are intentionally withheld from policy pages and from several
            community-driven or lower-trust game modes where user-generated content or cloned
            mechanics make monetization less appropriate.
          </p>
          <p style={{ marginBottom: '28px' }}>
            Quiz-style pages are also presented as entertainment, not professional advice. When a
            page makes a claim that should be treated lightly, we try to say that clearly.
          </p>

          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 45, 120, 0.1), rgba(0, 212, 255, 0.1))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '32px',
              borderRadius: '24px',
              marginTop: '60px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#fff', fontSize: '22px', marginTop: 0, marginBottom: '16px' }}>
              Need to get in touch?
            </h3>
            <p style={{ marginBottom: '24px', color: '#aaa' }}>
              Use the contact page or email{' '}
              <a href="mailto:support@vibemenow.uk" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
                support@vibemenow.uk
              </a>{' '}
              for bug reports, moderation issues, site feedback, or general questions about the project.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact">
                <button className="btn-primary" style={{ padding: '12px 32px' }}>Contact</button>
              </Link>
              <Link href="/#games-listing">
                <button className="btn-outline" style={{ padding: '12px 32px' }}>Browse Games</button>
              </Link>
            </div>
          </div>

          <h2
            style={{
              color: '#b14aed',
              fontSize: '28px',
              marginTop: '48px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Heart size={24} /> Who Runs VIBEMENOW
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              padding: '32px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '32px',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '32px',
              textAlign: 'left'
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <img 
                src="/publisher.jpg" 
                alt="Raghavendra Reddy" 
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '24px', 
                  objectFit: 'cover', 
                  border: '3px solid #b14aed',
                  boxShadow: '0 8px 24px rgba(177, 74, 237, 0.2)'
                }} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: '#eee', lineHeight: '1.7' }}>
                VIBEMENOW is built and maintained by <strong>Raghavendra Reddy</strong>, a web developer
                and game design enthusiast based in the UK. With a background in building interactive digital 
                experiences, Raghavendra started this project as an experiment in creating lightweight, 
                high-performance games that load instantly on any device.
              </p>
              <p style={{ marginTop: '16px', marginBottom: 0, color: '#888', fontSize: '15px' }}>
                Every game on the platform is an original creation focusing on pedagogical clarity and 
                user engagement, often drawing inspiration from cognitive science and effective learning patterns.
              </p>
            </div>
          </div>
          <p style={{ marginBottom: '24px' }}>
            Every game on the platform is an original creation of the VIBEMENOW team. The blog
            and guides section draws on published research in cognitive science, educational
            psychology, and neuroscience to provide readers with well-sourced, substantive
            content alongside the games.
          </p>

          <div
            style={{
              margin: '28px 0 40px 0',
              padding: '24px',
              borderRadius: '20px',
              background: 'rgba(177, 74, 237, 0.05)',
              border: '1px solid rgba(177, 74, 237, 0.15)',
            }}
          >
            <h3 style={{ color: '#b14aed', fontSize: '20px', marginTop: 0, marginBottom: '12px' }}>
              Our Editorial Standards
            </h3>
            <ul style={{ color: '#aaa', paddingLeft: '20px', margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>Long-form articles are written with reference to published research and reputable institutions, but they are general-interest explainers rather than formal academic papers.</li>
              <li style={{ marginBottom: '8px' }}>Quiz and personality results are clearly labeled as entertainment, not clinical advice.</li>
              <li style={{ marginBottom: '8px' }}>User-generated content in multiplayer rooms is moderated and separated from ad-supported pages.</li>
              <li>We do not use misleading headlines, clickbait, or auto-generated filler content.</li>
            </ul>
          </div>

          <div style={{ marginTop: '48px', textAlign: 'center', fontSize: '14px', color: '#555' }}>
            <p>VIBEMENOW is maintained as an independent web project focused on quick-play browser experiences.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
