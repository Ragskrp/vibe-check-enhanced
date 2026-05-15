import Link from 'next/link';

export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

// Blog + Breadcrumb schema for all articles
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "VIBEMENOW Blog — Cognitive Science & Learning",
  "url": "https://vibemenow.uk/blog",
  "description": "In-depth articles on cognitive science, learning psychology, educational technology, and the neuroscience of games and performance.",
  "publisher": {
    "@type": "Organization",
    "name": "VIBEMENOW",
    "url": "https://vibemenow.uk",
    "logo": { "@type": "ImageObject", "url": "https://vibemenow.uk/icon.png" }
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vibemenow.uk" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://vibemenow.uk/blog" }
  ]
};

export default function BlogLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}

      {/* Author byline — E-E-A-T signal for AdSense and Google reviewers */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '18px 20px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #b14aed, #00d4ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            ✍️
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>
              Written by the VIBEMENOW Editorial Team
            </div>
            <div style={{ color: '#888', fontSize: 13, marginTop: 2 }}>
              Our articles draw on peer-reviewed cognitive science, published psychology research,
              and academic sources. See our{' '}
              <Link href="/editorial-policy" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
                Editorial Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer footer */}
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
