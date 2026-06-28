import Link from 'next/link';

export const metadata = {
  title: 'GCSE Study Hub | Fleurir',
  description: 'Enter the Fleurir GCSE realm — a narrative world where you learn Maths and Science through story and strategy.',
};

const subjects = [
  {
    id: 'maths',
    name: 'Arithmia',
    label: 'Mathematics',
    description: 'A once-ordered mathematical kingdom whose laws are fracturing. Restore each region to reclaim Arithmia.',
    href: '/gcse/maths',
    color: '#854e60',
    accent: '#f4ede3',
    icon: '∑',
    available: true,
  },
  {
    id: 'science',
    name: 'Scientia',
    label: 'Science',
    description: 'The laboratory world of Scientia lies dormant. Coming soon.',
    href: '#',
    color: '#7b5900',
    accent: '#fffbf0',
    icon: '⚗',
    available: false,
  },
];

export default function GCSEHubPage() {
  return (
    <main style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>✦ Fleurir — GCSE Study Hub</p>
        <h1 style={styles.heading}>Choose Your Realm</h1>
        <p style={styles.sub}>
          Each realm is a living world. Learn through narrative, prove your mastery through challenge.
        </p>
      </section>

      {/* Cards */}
      <section style={styles.grid}>
        {subjects.map((s) => (
          <div key={s.id} style={{ ...styles.card, opacity: s.available ? 1 : 0.55 }}>
            <div style={{ ...styles.iconBadge, background: s.color }}>{s.icon}</div>
            <p style={styles.cardEyebrow}>{s.label}</p>
            <h2 style={styles.cardTitle}>{s.name}</h2>
            <p style={styles.cardDesc}>{s.description}</p>
            {s.available ? (
              <Link href={s.href} style={{ ...styles.btn, background: s.color }}>
                Enter Realm →
              </Link>
            ) : (
              <span style={styles.locked}>🔒 Coming Soon</span>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#fff8f0',
    padding: '48px 20px',
    fontFamily: 'DM Sans, sans-serif',
    color: '#1e1b16',
  },
  hero: {
    textAlign: 'center',
    maxWidth: 600,
    margin: '0 auto 48px',
  },
  eyebrow: {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#854e60',
    marginBottom: 12,
  },
  heading: {
    fontFamily: 'Playfair Display, serif',
    fontSize: 48,
    fontWeight: 700,
    color: '#2A2035',
    margin: '0 0 16px',
    lineHeight: 1.15,
  },
  sub: {
    fontSize: 16,
    lineHeight: 1.7,
    color: '#504445',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 24,
    maxWidth: 800,
    margin: '0 auto',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e8e2d8',
    borderRadius: 16,
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    boxShadow: '0 4px 20px rgba(42,32,53,0.06)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 4,
  },
  cardEyebrow: {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#827475',
    margin: 0,
  },
  cardTitle: {
    fontFamily: 'Playfair Display, serif',
    fontSize: 28,
    fontWeight: 700,
    color: '#2A2035',
    margin: 0,
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#504445',
    margin: 0,
    flex: 1,
  },
  btn: {
    display: 'inline-block',
    padding: '12px 24px',
    borderRadius: 9999,
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'Nunito Sans, sans-serif',
    textDecoration: 'none',
    textAlign: 'center',
    marginTop: 8,
  },
  locked: {
    fontSize: 13,
    color: '#827475',
    fontFamily: 'Nunito Sans, sans-serif',
    marginTop: 8,
  },
};
