import Link from 'next/link';

export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

// Article + Breadcrumb schema injected globally for all blog posts
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
    "logo": {
      "@type": "ImageObject",
      "url": "https://vibemenow.uk/icon.png"
    }
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://vibemenow.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://vibemenow.uk/blog"
    }
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
