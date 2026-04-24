export const metadata = {
  title: {
    default: 'GCSE Revision | VIBEMENOW',
    template: '%s | GCSE Revision | VIBEMENOW',
  },
  description:
    'Free interactive GCSE revision tools and games. Master Maths, Science, English Literature, Computer Science, and Business with addictive practice sessions. No login required.',
  keywords: [
    'GCSE revision',
    'GCSE maths',
    'GCSE science',
    'GCSE english literature',
    'GCSE computer science',
    'GCSE business',
    'GCSE revision games',
    'free GCSE revision',
    'GCSE practice',
    'UK GCSE',
  ],
  openGraph: {
    title: 'GCSE Revision Games | VIBEMENOW',
    description:
      'Interactive, curriculum-aligned GCSE revision tools for 6 core subjects. Start learning in seconds with no login required.',
    url: '/gcse',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VIBEMENOW GCSE Revision',
      },
    ],
  },
  alternates: {
    canonical: '/gcse',
  },
};

export default function GCSELayout({ children }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'VIBEMENOW GCSE Revision',
      url: 'https://vibemenow.uk/gcse',
      description:
        'Free interactive GCSE revision tools covering Maths and more.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'GCSE Maths Revision',
      description:
        'Interactive games and tools for GCSE Maths revision covering algebra, geometry, fractions, and more.',
      provider: {
        '@type': 'Organization',
        name: 'VIBEMENOW',
        url: 'https://vibemenow.uk',
      },
      isAccessibleForFree: true,
      educationalLevel: 'GCSE',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
      <footer style={{ 
        maxWidth: '800px', 
        margin: '64px auto 32px auto', 
        padding: '32px', 
        borderTop: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '12px', fontWeight: 700 }}>Student Safety & Privacy</h4>
        <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.7' }}>
          Our GCSE tools are designed for effective learning without personal data collection. We do not knowingly collect information from children under 13 (COPPA) or under 18 in the UK. Parents or teachers with questions can reach us at <a href="mailto:support@vibemenow.uk" style={{ color: '#00ff94', textDecoration: 'underline' }}>support@vibemenow.uk</a>.
        </p>
      </footer>
    </>
  );
}
