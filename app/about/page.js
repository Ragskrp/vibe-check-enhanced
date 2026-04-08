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
              Use the contact page for bug reports, moderation issues, site feedback, or general
              questions about the project.
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

          <div style={{ marginTop: '48px', textAlign: 'center', fontSize: '14px', color: '#555' }}>
            <p>VIBEMENOW is maintained as an independent web project focused on quick-play browser experiences.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
