import Link from 'next/link';
import mathsIndex from './data/index.json';

export const metadata = {
  title: 'Arithmia — Maths Realm | Fleurir GCSE',
  description: 'Explore the four regions of Arithmia and restore mathematical order.',
};

const regionColors = {
  library_of_numerals: { bg: '#f4ede3', border: '#7a545a', badge: '#854e60' },
  algebra_citadel:     { bg: '#f0f4ed', border: '#5a7a54', badge: '#4e6050' },
  geometry_sanctum:    { bg: '#ede3f4', border: '#7a54a0', badge: '#60508a' },
  statistics_observatory: { bg: '#e3edf4', border: '#547a8a', badge: '#4e7080' },
};

export default function MathsHubPage() {
  const { regions, displayName, worldDescription } = mathsIndex;

  return (
    <main style={styles.page}>
      {/* Back link */}
      <Link href="/gcse" style={styles.backLink}>← Back to Study Hub</Link>

      {/* Hero */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>✦ Maths Realm</p>
        <h1 style={styles.heading}>{displayName}</h1>
        <p style={styles.sub}>{worldDescription}</p>
      </section>

      {/* Regions */}
      <section style={styles.regionList}>
        {regions.map((region, ri) => {
          const theme = regionColors[region.id] || regionColors.library_of_numerals;
          const isLocked = !region.unlocked;

          return (
            <div key={region.id} style={{ ...styles.regionCard, background: theme.bg, border: `1px solid ${theme.border}`, opacity: isLocked ? 0.6 : 1 }}>
              {/* Region header */}
              <div style={styles.regionHeader}>
                <span style={{ ...styles.regionBadge, background: theme.badge }}>
                  {region.gcseArea}
                </span>
                {isLocked && <span style={styles.lockedPill}>🔒 Locked</span>}
              </div>
              <h2 style={styles.regionTitle}>{region.name}</h2>

              {/* Sub-topics */}
              <div style={styles.topicGrid}>
                {region.subTopics.map((topic, ti) => {
                  const available = topic.status === 'available';
                  return (
                    <Link
                      key={topic.id}
                      href={available ? `/gcse/maths/${topic.dataFile.replace('.json', '')}` : '#'}
                      style={{
                        ...styles.topicCard,
                        borderColor: available ? theme.badge : '#d4c2c4',
                        pointerEvents: available ? 'auto' : 'none',
                        opacity: available ? 1 : 0.5,
                      }}
                    >
                      <span style={styles.topicIndex}>{String(ti + 1).padStart(2, '0')}</span>
                      <div>
                        <div style={styles.topicTitle}>{topic.title}</div>
                        <div style={styles.topicLocation}>📍 {topic.locationName}</div>
                      </div>
                      {available && <span style={{ marginLeft: 'auto', color: theme.badge, fontSize: 18 }}>→</span>}
                      {!available && <span style={{ marginLeft: 'auto', fontSize: 14 }}>🔒</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#fff8f0',
    padding: '32px 20px 64px',
    fontFamily: 'DM Sans, sans-serif',
    color: '#1e1b16',
    maxWidth: 900,
    margin: '0 auto',
  },
  backLink: {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 13,
    color: '#7a545a',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: 24,
  },
  hero: {
    marginBottom: 40,
  },
  eyebrow: {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#854e60',
    marginBottom: 8,
    margin: '0 0 8px',
  },
  heading: {
    fontFamily: 'Playfair Display, serif',
    fontSize: 40,
    fontWeight: 700,
    color: '#2A2035',
    margin: '0 0 12px',
  },
  sub: {
    fontSize: 15,
    lineHeight: 1.7,
    color: '#504445',
    maxWidth: 640,
    margin: 0,
  },
  regionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  regionCard: {
    borderRadius: 16,
    padding: 28,
  },
  regionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  regionBadge: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    fontFamily: 'Nunito Sans, sans-serif',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 10px',
    borderRadius: 9999,
  },
  lockedPill: {
    fontSize: 12,
    color: '#827475',
    fontFamily: 'Nunito Sans, sans-serif',
  },
  regionTitle: {
    fontFamily: 'Playfair Display, serif',
    fontSize: 22,
    fontWeight: 700,
    color: '#2A2035',
    margin: '0 0 16px',
  },
  topicGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  topicCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: '#ffffff',
    borderRadius: 10,
    border: '1px solid',
    padding: '14px 16px',
    textDecoration: 'none',
    color: '#1e1b16',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  topicIndex: {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 11,
    fontWeight: 800,
    color: '#827475',
    minWidth: 24,
  },
  topicTitle: {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 15,
    fontWeight: 600,
    color: '#1e1b16',
    marginBottom: 2,
  },
  topicLocation: {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 12,
    color: '#827475',
  },
};
