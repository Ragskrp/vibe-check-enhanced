export const metadata = {
  title: {
    default: 'GCSE Revision | VIBEMENOW',
    template: '%s | GCSE Revision | VIBEMENOW',
  },
  description:
    'Free interactive GCSE revision tools and games. Master Maths, Science, and more with addictive practice sessions. No login required.',
  keywords: [
    'GCSE revision',
    'GCSE maths',
    'GCSE revision games',
    'free GCSE revision',
    'GCSE practice',
    'maths revision games',
    'GCSE online revision',
    'UK GCSE',
  ],
  openGraph: {
    title: 'GCSE Revision Games | VIBEMENOW',
    description:
      'Interactive, addictive GCSE revision tools. Start with Maths — more subjects coming soon.',
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
    </>
  );
}
