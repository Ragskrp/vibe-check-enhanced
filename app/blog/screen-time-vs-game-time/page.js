'use client';

import Link from 'next/link';
import { ChevronLeft, Clock } from 'lucide-react';

export default function ScreenTimeVsGameTime() {
  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: '#888',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <ChevronLeft size={14} /> BACK TO BLOG
        </Link>
      </div>

      <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>Time</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#b14aed',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Digital Habit Notes
            </span>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 30, marginBottom: 12, lineHeight: 1.3 }}>
            Screen Time vs. Game Time: Why <span style={{ color: '#b14aed' }}>Context Matters</span>
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555', flexWrap: 'wrap' }}>
            <span>By the VIBEMENOW Editorial Team</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> 6 Min Read
            </span>
            <span>•</span>
            <span>April 2026</span>
          </div>
        </div>

        <div style={{ color: '#ccc', lineHeight: 1.85, fontSize: 16 }}>
          <p style={{ marginBottom: 20, fontSize: 18, color: '#aaa', fontStyle: 'italic' }}>
            &quot;Less screen time&quot; sounds like clean advice, but it leaves out an important question:
            what exactly is happening on the screen?
          </p>

          <p style={{ marginBottom: 20 }}>
            We do not think all digital time feels the same. Watching an endless feed, joining a
            short multiplayer room, solving a five-letter puzzle, and reading a long article are
            four very different experiences. Lumping them together hides more than it explains.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            The More Useful Question
          </h2>
          <p style={{ marginBottom: 20 }}>
            Instead of asking only how long someone was online, it is usually more useful to ask:
            Was the activity active or passive? Did it have a purpose? Did it end naturally? Did
            the person feel better, worse, or simply numb afterward?
          </p>
          <p style={{ marginBottom: 20 }}>
            That framing is not perfect, but it gets closer to real experience than a single number.
            Twenty minutes spent clicking through a structured game can feel very different from
            twenty minutes lost to autoplay and infinite scroll.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 16,
              marginTop: 24,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                padding: 20,
                borderRadius: 16,
                background: 'rgba(0, 255, 148, 0.05)',
                border: '1px solid rgba(0, 255, 148, 0.15)',
              }}
            >
              <p style={{ fontWeight: 700, color: '#00ff94', marginBottom: 8, fontSize: 14 }}>More intentional</p>
              <ul style={{ fontSize: 13, color: '#888', paddingLeft: 16, margin: 0 }}>
                <li style={{ marginBottom: 4 }}>Short puzzle sessions</li>
                <li style={{ marginBottom: 4 }}>Room-based games with friends</li>
                <li style={{ marginBottom: 4 }}>Creative tools or writing</li>
                <li>Reading with a clear goal</li>
              </ul>
            </div>
            <div
              style={{
                padding: 20,
                borderRadius: 16,
                background: 'rgba(255, 45, 120, 0.05)',
                border: '1px solid rgba(255, 45, 120, 0.15)',
              }}
            >
              <p style={{ fontWeight: 700, color: '#ff2d78', marginBottom: 8, fontSize: 14 }}>More passive</p>
              <ul style={{ fontSize: 13, color: '#888', paddingLeft: 16, margin: 0 }}>
                <li style={{ marginBottom: 4 }}>Infinite feed browsing</li>
                <li style={{ marginBottom: 4 }}>Autoplay loops</li>
                <li style={{ marginBottom: 4 }}>Clicking with no stopping point</li>
                <li>Habitual scrolling out of boredom</li>
              </ul>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            Why Short Games Feel Different
          </h2>
          <p style={{ marginBottom: 20 }}>
            One reason short browser games can feel healthier than feed products is that they tend
            to have visible boundaries. A round starts. A guess is entered. A score appears. The
            player gets a natural moment to stop.
          </p>
          <p style={{ marginBottom: 20 }}>
            That does not make every game good by default, but it does create a different
            relationship with time. On VIBEMENOW, we generally want the player to understand the
            shape of the session. The design should not depend on trapping them in a bottomless
            loop.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            A Better Standard for Digital Habits
          </h2>
          <p style={{ marginBottom: 20 }}>
            The most practical standard is not &quot;avoid screens&quot; but &quot;be more selective about what
            you let screens do to your attention.&quot; If an activity is active, bounded, and clear
            enough that you can leave it on purpose, that is already an improvement over many of
            the products competing for the same moments of the day.
          </p>
          <p style={{ marginBottom: 20 }}>
            That is also why small browser games remain useful. They can fill a short break without
            pretending to be the center of your life. When they are designed well, they respect your
            time instead of dissolving it.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            How We Apply That on VIBEMENOW
          </h2>
          <p style={{ marginBottom: 24 }}>
            The site is built around quick starts, short rules, and experiences that stand on their
            own. Some pages are solo, some are social, and some are more experimental, but the
            underlying goal is the same: give people something intentional to do, then give them a
            clean chance to move on.
          </p>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/#games-listing">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                Browse Quick-Play Games
              </button>
            </Link>
          </div>
        </div>
      </article>

      <div style={{ textAlign: 'center', marginTop: 40, color: '#555', fontSize: 12 }}>
        <p>© 2026 VIBEMENOW (vibemenow.uk). Editorial commentary from the site team.</p>
      </div>
    </div>
  );
}
