import Link from 'next/link';

export const metadata = {
  title: 'Tech News & Analysis',
  description:
    'Breaking tech news, AI updates, cybersecurity insights, and digital culture commentary from the VIBEMENOW team. Updated weekly.',
  keywords: [
    'tech news',
    'AI news',
    'cybersecurity news',
    'gadget reviews',
    'startup news',
    'digital culture',
    'UK tech news',
  ],
  alternates: {
    canonical: '/tech-news',
  },
  openGraph: {
    title: 'Tech News & Analysis | VIBEMENOW',
    description:
      'Breaking tech news, AI updates, and digital culture commentary. Updated weekly.',
    url: '/tech-news',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VIBEMENOW Tech News',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TechNewsLayout({ children }) {
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
          Tech news articles on VIBEMENOW are editorial commentary from the site team.
          They are not investment, legal, or professional advice. For ownership, editorial standards,
          and contact information, see{' '}
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
