import Link from 'next/link';
import { BadgeInfo, FileText, Mail, ShieldCheck, Wallet } from 'lucide-react';

export const metadata = {
  title: 'Publisher Information',
  description:
    'Ownership, contact details, monetization approach, moderation scope, and policy links for VIBEMENOW.',
  alternates: {
    canonical: '/publisher-information',
  },
  openGraph: {
    url: '/publisher-information',
  },
};

const cardStyle = {
  padding: '28px',
  borderRadius: '24px',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)',
};

export default function PublisherInformationPage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="card" style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              borderRadius: '999px',
              background: 'rgba(0, 212, 255, 0.08)',
              border: '1px solid rgba(0, 212, 255, 0.18)',
              color: '#00d4ff',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            <BadgeInfo size={16} /> Site Ownership and Policy Summary
          </div>
          <h1 className="game-title" style={{ fontSize: '42px', marginBottom: '12px' }}>
            Publisher <span style={{ color: '#00d4ff' }}>Information</span>
          </h1>
          <p style={{ color: '#aaa', maxWidth: '720px', margin: '0 auto', lineHeight: '1.8' }}>
            This page brings together the core information visitors, partners, and reviewers
            usually look for first: who runs VIBEMENOW, what the site publishes, how ads are
            used, and where to find the main policy and contact pages.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <div style={cardStyle}>
            <h2
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '20px',
                color: '#fff',
                marginTop: 0,
                marginBottom: '14px',
              }}
            >
              <Mail size={18} color="#00d4ff" /> Publisher details
            </h2>
            <p style={{ color: '#aaa', marginBottom: '8px' }}>
              <strong style={{ color: '#fff' }}>Site name:</strong> VIBEMENOW
            </p>
            <p style={{ color: '#aaa', marginBottom: '8px' }}>
              <strong style={{ color: '#fff' }}>Domain:</strong> vibemenow.uk
            </p>
            <p style={{ color: '#aaa', marginBottom: '8px' }}>
              <strong style={{ color: '#fff' }}>Publisher:</strong> Raghavendra Reddy
            </p>
            <p style={{ color: '#aaa', marginBottom: 0 }}>
              <strong style={{ color: '#fff' }}>Contact:</strong>{' '}
              <a href="mailto:ragskrpreddy@gmail.com" style={{ color: '#00d4ff', textDecoration: 'underline' }}>
                ragskrpreddy@gmail.com
              </a>
            </p>
          </div>

          <div style={cardStyle}>
            <h2
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '20px',
                color: '#fff',
                marginTop: 0,
                marginBottom: '14px',
              }}
            >
              <FileText size={18} color="#ff2d78" /> What the site publishes
            </h2>
            <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: 0 }}>
              VIBEMENOW publishes original browser games, supporting help pages, short guides,
              and blog articles about play, puzzles, learning, and digital culture. The main
              focus of the site is playable interactive content rather than article-only traffic.
            </p>
          </div>

          <div style={cardStyle}>
            <h2
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '20px',
                color: '#fff',
                marginTop: 0,
                marginBottom: '14px',
              }}
            >
              <Wallet size={18} color="#ffe600" /> Advertising approach
            </h2>
            <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: 0 }}>
              The site uses Google AdSense to support free access. Ads are limited to selected
              low-risk pages and are intentionally withheld from policy pages, contact pages,
              guides, and multiplayer or community-sensitive routes.
            </p>
          </div>
        </div>

        <div style={{ ...cardStyle, marginBottom: '32px' }}>
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '22px',
              color: '#fff',
              marginTop: 0,
              marginBottom: '16px',
            }}
          >
            <ShieldCheck size={20} color="#00ff94" /> Safety, moderation, and content standards
          </h2>
          <ul style={{ paddingLeft: '20px', color: '#aaa', lineHeight: '1.8', margin: 0 }}>
            <li>Room-based multiplayer routes are handled more cautiously because they can involve player input and shared sessions.</li>
            <li>Entertainment-style quiz results are labeled as entertainment rather than medical, legal, or professional advice.</li>
            <li>Policy, ownership, and contact pages are maintained as permanent crawlable resources.</li>
            <li>Content that becomes thin, outdated, or misleading is meant to be revised, de-indexed, or removed instead of padded.</li>
          </ul>
        </div>

        <div style={{ ...cardStyle, marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', color: '#fff', marginTop: 0, marginBottom: '16px' }}>
            Quick links
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
            }}
          >
            <Link href="/about" className="btn-outline" style={{ textAlign: 'center' }}>
              About
            </Link>
            <Link href="/contact" className="btn-outline" style={{ textAlign: 'center' }}>
              Contact
            </Link>
            <Link href="/editorial-policy" className="btn-outline" style={{ textAlign: 'center' }}>
              Editorial Policy
            </Link>
            <Link href="/privacy" className="btn-outline" style={{ textAlign: 'center' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="btn-outline" style={{ textAlign: 'center' }}>
              Terms of Service
            </Link>
            <Link href="/community-guidelines" className="btn-outline" style={{ textAlign: 'center' }}>
              Community Guidelines
            </Link>
            <Link href="/faq" className="btn-outline" style={{ textAlign: 'center' }}>
              FAQ
            </Link>
            <Link href="/blog" className="btn-outline" style={{ textAlign: 'center' }}>
              Blog
            </Link>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            padding: '28px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(255,45,120,0.08), rgba(0,212,255,0.08))',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p style={{ color: '#ddd', lineHeight: '1.8', marginBottom: '14px' }}>
            For policy questions, correction requests, or advertising-related contact, use the
            email above or the <Link href="/contact" style={{ color: '#00d4ff', textDecoration: 'underline' }}>contact page</Link>.
          </p>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: 0 }}>
            `ads.txt` is available at <a href="/ads.txt" style={{ color: '#00d4ff', textDecoration: 'underline' }}>/ads.txt</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
