import Link from 'next/link';
import Image from 'next/image';
import mathsIndex from './data/index.json';

export const metadata = {
  title: 'Arithmia — Maths Realm | Fleurir GCSE',
  description: 'Explore the four regions of Arithmia and restore mathematical order.',
};

const REGION_THEME = {
  library_of_numerals:    { color: '#854e60', bg: '#fff0f3', chipBg: '#fff0f3', icon: '📚' },
  algebra_citadel:        { color: '#4e6b50', bg: '#f0f7ee', chipBg: '#f0f7ee', icon: '🏰' },
  geometry_sanctum:       { color: '#5a4e8a', bg: '#f2f0fb', chipBg: '#f2f0fb', icon: '📐' },
  statistics_observatory: { color: '#2d6e7e', bg: '#eef6f8', chipBg: '#eef6f8', icon: '🔭' },
};

export default function MathsHubPage() {
  const { regions, displayName } = mathsIndex;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Nunito+Sans:wght@600;700;800&display=swap');

        .maths-page {
          min-height: 100vh;
          background-color: #fff8f0;
          background-image: radial-gradient(circle, #d4c2c480 1px, transparent 1px);
          background-size: 28px 28px;
          font-family: 'DM Sans', sans-serif;
          color: #1e1b16;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
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

        .fade-up { animation: fadeUp 0.55s ease both; }
        .float-char { animation: floatChar 4.5s ease-in-out infinite; }
        .shimmer-border { animation: shimmerBorder 2.8s ease-in-out infinite; }

        .region-card {
          background: #ffffff;
          border: 1px solid #e8e2d8;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(42,32,53,0.05);
          transition: box-shadow 0.2s ease;
        }
        .region-card:hover { box-shadow: 0 8px 32px rgba(42,32,53,0.1); }

        .topic-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 20px;
          border-bottom: 1px solid #f4ede3;
          text-decoration: none;
          color: #1e1b16;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .topic-row:last-child { border-bottom: none; }
        .topic-row.available:hover {
          background: #faf3e9;
          transform: translateX(3px);
        }
        .topic-row.locked {
          opacity: 0.45;
          cursor: default;
          pointer-events: none;
        }

        .nav-link:hover { color: #854e60; }

        .divider-line {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #854e60, #d4c2c4);
          border-radius: 99px;
          margin: 8px 0 12px;
        }
      `}</style>

      <div className="maths-page">

        {/* ── Sticky Nav ── */}
        <nav style={S.nav}>
          <span style={S.navBrand}>FLEURIR</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link href="/gcse" className="nav-link" style={S.navLink}>← Study Hub</Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={S.hero}>
          <div className="fade-up" style={{ flex: 1, minWidth: 240 }}>
            <p style={S.eyebrow}>✦ Maths Realm</p>
            <h1 style={S.heading}>{displayName}</h1>
            <div className="divider-line" />
            <p style={S.sub}>
              Four regions. Eighteen sub-topics. One crumbling kingdom to restore.
              Each topic you master unlocks the next.
            </p>
            {/* Progress indicator */}
            <div style={S.progressBox}>
              <span style={S.progressLabel}>REGIONS</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {regions.map((r, i) => (
                  <div key={r.id} style={{
                    height: 6, flex: 1, borderRadius: 99,
                    background: r.unlocked ? '#9DB58A' : '#e8e2d8',
                    transition: 'background 0.3s',
                  }} title={r.name} />
                ))}
              </div>
            </div>
          </div>

          {/* Arith portrait */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div className="float-char shimmer-border" style={S.portraitCircle}>
              <Image
                src="/gcse/arith-portrait.png"
                alt="Arith"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                priority
              />
            </div>
            <span style={S.portraitCaption}>GUIDE: ARITH</span>
            <p style={S.arithQuote}>"Every region holds a truth. Seek them all."</p>
          </div>
        </section>

        {/* ── Region cards ── */}
        <section style={S.regionsWrap}>
          {regions.map((region, ri) => {
            const theme = REGION_THEME[region.id] || REGION_THEME.library_of_numerals;
            const isLocked = !region.unlocked;
            const completedCount = region.subTopics.filter(t => t.status === 'available').length;

            return (
              <div key={region.id} className="region-card fade-up" style={{ animationDelay: `${ri * 0.08}s` }}>

                {/* Region header */}
                <div style={{ ...S.regionHeader, background: theme.bg }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 28 }}>{theme.icon}</span>
                    <div>
                      <p style={{ ...S.regionArea, color: theme.color }}>{region.gcseArea}</p>
                      <h2 style={S.regionTitle}>{region.name}</h2>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    {isLocked ? (
                      <span style={{ ...S.statusPill, background: '#f4ede3', color: '#827475', border: '1px solid #e8e2d8' }}>
                        🔒 Locked
                      </span>
                    ) : (
                      <span style={{ ...S.statusPill, background: '#f0f7ee', color: '#4e6b50', border: '1px solid #9DB58A' }}>
                        ✓ Unlocked
                      </span>
                    )}
                    <span style={S.topicCount}>{region.subTopics.length} topics</span>
                  </div>
                </div>

                {/* Sub-topics list */}
                <div>
                  {region.subTopics.map((topic, ti) => {
                    const available = topic.status === 'available';
                    const href = available ? `/gcse/maths/${topic.dataFile.replace('.json', '')}` : '#';
                    return (
                      <Link
                        key={topic.id}
                        href={href}
                        className={`topic-row ${available ? 'available' : 'locked'}`}
                      >
                        {/* Index */}
                        <span style={{
                          ...S.topicIdx,
                          background: available ? theme.bg : '#f4ede3',
                          color: available ? theme.color : '#827475',
                        }}>
                          {String(ti + 1).padStart(2, '0')}
                        </span>

                        {/* Text */}
                        <div style={{ flex: 1 }}>
                          <p style={S.topicTitle}>{topic.title}</p>
                          <p style={S.topicLocation}>📍 {topic.locationName}</p>
                        </div>

                        {/* Arrow / lock */}
                        {available
                          ? <span style={{ color: theme.color, fontSize: 18, fontWeight: 700 }}>→</span>
                          : <span style={{ fontSize: 14 }}>🔒</span>
                        }
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        <p style={S.footnote}>
          Mapped to AQA · Edexcel · OCR — Complete all topics to master Arithmia
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
    background: 'rgba(255,248,240,0.92)',
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
  },
  navLink: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: '#7a545a',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    transition: 'color 0.2s',
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: 960,
    margin: '0 auto',
    padding: '40px 28px 28px',
    gap: 32,
    flexWrap: 'wrap',
  },
  eyebrow: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#854e60',
    margin: '0 0 8px',
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 40,
    fontWeight: 700,
    color: '#2A2035',
    margin: '0 0 4px',
    lineHeight: 1.15,
  },
  sub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.75,
    color: '#504445',
    margin: '0 0 20px',
    maxWidth: 420,
  },
  progressBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    maxWidth: 320,
  },
  progressLabel: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.12em',
    color: '#827475',
    textTransform: 'uppercase',
  },
  portraitCircle: {
    position: 'relative',
    width: 120,
    height: 120,
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
  arithQuote: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontSize: 12,
    color: '#827475',
    textAlign: 'center',
    margin: '4px 0 0',
    maxWidth: 140,
    lineHeight: 1.5,
  },
  regionsWrap: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '0 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  regionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 20px',
    borderBottom: '1px solid #e8e2d8',
  },
  regionArea: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    margin: '0 0 2px',
  },
  regionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 700,
    color: '#2A2035',
    margin: 0,
  },
  statusPill: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.08em',
    padding: '3px 10px',
    borderRadius: 9999,
    textTransform: 'uppercase',
  },
  topicCount: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 10,
    color: '#827475',
    letterSpacing: '0.04em',
  },
  topicIdx: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 800,
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  topicTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: '#1e1b16',
    margin: '0 0 2px',
  },
  topicLocation: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: '#827475',
    margin: 0,
  },
  footnote: {
    textAlign: 'center',
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    color: '#827475',
    letterSpacing: '0.04em',
    padding: '28px 20px 40px',
  },
};
