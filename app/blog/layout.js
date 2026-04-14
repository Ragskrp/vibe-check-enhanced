import Link from 'next/link';

export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({ children }) {
  return (
    <>
      {children}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px 48px' }}>
        <div
          style={{
            padding: '18px 20px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#999',
            lineHeight: '1.8',
            fontSize: 14,
          }}
        >
          Blog articles on VIBEMENOW are general-interest commentary from the site team. They may
          discuss published research or gameplay ideas, but they are not medical, legal, or
          professional advice. For ownership, editorial standards, and contact information, see{' '}
          <Link href="/publisher-information" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
            Publisher Information
          </Link>{' '}
          and{' '}
          <Link href="/editorial-policy" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
            Editorial Policy
          </Link>.
        </div>
      </div>
    </>
  );
}
