'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useFleurir } from './components/StateContext';
import { CompanionDisplay } from './components/CompanionDisplay';

export default function GCSEHubClient({ subjects }) {
  const { equippedCompanionData } = useFleurir();
  
  if (!equippedCompanionData) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Nunito+Sans:wght@600;700;800&display=swap');

        .gcse-hub-page {
          min-height: 100vh;
          background-color: #fff8f0;
          background-image: radial-gradient(circle, #d4c2c480 1px, transparent 1px);
          background-size: 28px 28px;
          font-family: 'DM Sans', sans-serif;
          color: #1e1b16;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatChar {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes shimmerBorder {
          0%, 100% { border-color: rgba(133,78,96,0.35); }
          50%       { border-color: rgba(133,78,96,0.8);  }
        }

        .hero-anim    { animation: fadeUp 0.6s ease both; }
        .card-anim-1  { animation: fadeUp 0.6s 0.1s ease both; }
        .card-anim-2  { animation: fadeUp 0.6s 0.2s ease both; }
        .float-char   { animation: floatChar 4.5s ease-in-out infinite; }
        .shimmer-border { animation: shimmerBorder 2.8s ease-in-out infinite; }

        .subject-card {
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(42,32,53,0.06);
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .subject-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 36px rgba(42,32,53,0.1);
        }

        .topic-chip {
          display: inline-block;
          background: #faf3e9;
          border: 1px solid #e8e2d8;
          border-radius: 9999px;
          padding: 3px 12px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #504445;
          letter-spacing: 0.06em;
        }

        .enter-btn {
          display: block;
          background: #854e60;
          color: #fff8f0;
          border: none;
          padding: 14px 28px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Nunito Sans', sans-serif;
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(133,78,96,0.25);
          transition: background 0.2s, transform 0.15s;
          margin-top: 8px;
        }
        .enter-btn:hover { background: #6e3f50; transform: translateY(-1px); }

        .divider-line {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #854e60, #d4c2c4);
          border-radius: 99px;
          margin: 4px 0 8px;
        }
      `}</style>

      <div className="gcse-hub-page">

        {/* ── Nav bar ── */}
        <nav style={S.nav}>
          <span style={S.navBrand}>FLEURIR</span>
          <div style={S.navLinks}>
            <Link href="/" style={S.navLink}>Home</Link>
            <Link href="/gcse" style={{ ...S.navLink, color: '#854e60', fontWeight: 700 }}>Study</Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={S.hero}>
          <div className="hero-anim" style={S.heroText}>
            <p style={S.eyebrow}>✦ Fleurir GCSE</p>
            <h1 style={S.heading}>Choose Your Realm</h1>
            <div className="divider-line" />
            <p style={S.sub}>
              Each realm is a living world shaped by narrative and strategy.
              Learn through story. Prove your mastery through challenge.
            </p>
          </div>

          {/* Arith + Companion duo */}
          <div style={S.heroPortrait}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* Arith portrait */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div className="float-char shimmer-border" style={S.portraitCircle}>
                  <Image
                    src="/gcse/arith-portrait.png"
                    alt="Arith, your guide"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    priority
                  />
                </div>
                <p style={S.portraitCaption}>GUIDE: ARITH</p>
              </div>

              {/* Companion */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <CompanionDisplay 
                  companionId={equippedCompanionData.id}
                  variant="large"
                  animation="idle"
                  showLabel
                  labelPosition="bottom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Subject cards ── */}
        <section style={S.grid}>
          {subjects.map((s, i) => (
            <div key={s.id} className={`subject-card card-anim-${i + 1}`} style={{ opacity: s.available ? 1 : 0.6 }}>

              {/* Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 12px',
                  borderRadius: 9999,
                  background: s.available ? '#fff0f3' : '#f4ede3',
                  color: s.available ? '#854e60' : '#827475',
                  border: `1px solid ${s.available ? '#d4c2c4' : '#e8e2d8'}`,
                }}>
                  {s.badge}
                </span>
                <span style={{ fontSize: 24 }}>{s.id === 'maths' ? '∑' : '⚗'}</span>
              </div>

              {/* Name */}
              <div>
                <p style={S.cardLabel}>{s.label}</p>
                <h2 style={S.cardTitle}>{s.name}</h2>
                <div className="divider-line" />
                <p style={S.cardTagline}>{s.tagline}</p>
              </div>

              <p style={S.cardDesc}>{s.description}</p>

              {/* Topic chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.topics.map(t => (
                  <span key={t} className="topic-chip">{t}</span>
                ))}
              </div>

              {/* CTA */}
              {s.available
                ? <Link href={s.href} className="enter-btn">Enter Realm →</Link>
                : <div style={S.lockedMsg}>🔒 Unlocks soon</div>
              }
            </div>
          ))}
        </section>

        {/* ── Footer note ── */}
        <p style={S.footnote}>
          Mapped to AQA, Edexcel & OCR GCSE specifications · Arithmia covers all 18 core Maths topics
        </p>
      </div>
    </>
  );
}

const S = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 40px',
    borderBottom: '1px solid #e8e2d8',
    background: 'rgba(255,248,240,0.9)',
    backdropFilter: 'blur(8px)',
    position: 'sticky',
    top: 0,
    zIndex: 20,
  },
  navBrand: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontSize: 22,
    fontWeight: 700,
    color: '#854e60',
    letterSpacing: '-0.01em',
  },
  navLinks: {
    display: 'flex',
    gap: 28,
  },
  navLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: '#504445',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 900,
    margin: '0 auto',
    padding: '48px 24px 32px',
    gap: 32,
    flexWrap: 'wrap',
  },
  heroText: {
    flex: 1,
    minWidth: 280,
  },
  eyebrow: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#854e60',
    margin: '0 0 10px',
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 48,
    fontWeight: 700,
    color: '#2A2035',
    margin: '0 0 12px',
    lineHeight: 1.1,
  },
  sub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    lineHeight: 1.75,
    color: '#504445',
    margin: 0,
    maxWidth: 480,
  },
  heroPortrait: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  portraitCircle: {
    position: 'relative',
    width: 130,
    height: 130,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #854e60',
    boxShadow: '0 8px 28px rgba(133,78,96,0.25)',
  },
  portraitCaption: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.12em',
    color: '#827475',
    textTransform: 'uppercase',
    background: '#faf3e9',
    border: '1px solid #e8e2d8',
    borderRadius: 9999,
    padding: '3px 12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 24,
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 24px',
  },
  cardLabel: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#827475',
    margin: '0 0 4px',
  },
  cardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 30,
    fontWeight: 700,
    color: '#2A2035',
    margin: '0 0 8px',
  },
  cardTagline: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: '#827475',
    margin: 0,
  },
  cardDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    lineHeight: 1.7,
    color: '#504445',
    margin: 0,
  },
  lockedMsg: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 13,
    color: '#827475',
    marginTop: 8,
    letterSpacing: '0.02em',
  },
  footnote: {
    textAlign: 'center',
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    color: '#827475',
    letterSpacing: '0.04em',
    padding: '32px 20px 40px',
    maxWidth: 900,
    margin: '0 auto',
  },
};