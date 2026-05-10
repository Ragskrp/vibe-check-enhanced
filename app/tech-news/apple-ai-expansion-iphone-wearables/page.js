import Link from 'next/link';
import { ArrowLeft, Smartphone } from 'lucide-react';

export const metadata = {
  title: 'Apple Reportedly Preparing Major AI Expansion for iPhone and Wearables | Tech Pulse',
  description: 'Apple is planning one of its biggest artificial intelligence expansions yet for future iPhones and wearables.',
  openGraph: {
    title: 'Apple Reportedly Preparing Major AI Expansion for iPhone and Wearables',
    description: 'Third-party AI integration and smart glasses could be on the horizon.',
    type: 'article',
    url: '/tech-news/apple-ai-expansion-iphone-wearables',
  },
  alternates: {
    canonical: '/tech-news/apple-ai-expansion-iphone-wearables',
  },
};

export default function AppleAiExpansionPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/tech-news" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Tech Pulse
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00d4ff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Smartphone size={16} /> AI & ML
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Apple Reportedly Preparing <span>Major AI Expansion</span> for iPhone and Wearables
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            Apple is reportedly planning one of its biggest artificial intelligence expansions yet, with new reports suggesting the company may allow third-party AI systems inside future iPhones while also accelerating development of AI-powered wearables.
          </p>
        </header>

        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
          alt="Futuristic smart glasses and AI wearable concept" 
          style={{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)' }}
        />

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            Several reports published this week claim Apple is testing a more open AI architecture for iOS 27. This could allow users to choose between different AI assistants and models — including systems from companies such as Google and Anthropic — rather than relying solely on Apple’s in-house tools.
          </p>
          <p>
            At the same time, Apple is reportedly increasing investment in AI-powered smart glasses, upgraded AirPods with camera capabilities, and other wearable devices designed to compete with Meta’s growing smart glasses ecosystem.
          </p>
          <p>
            The shift signals a major strategic change for Apple. Historically, the company has tightly controlled software experiences within its ecosystem. However, increasing competition from OpenAI, Google, and Meta appears to be pushing Apple toward a more flexible AI strategy.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>What Could Be Coming</h2>
          <ul style={{ paddingLeft: 20, margin: 0, listStyleType: 'disc' }}>
            <li style={{ marginBottom: 12 }}>AI-powered smart glasses by 2026.</li>
            <li style={{ marginBottom: 12 }}>Third-party AI integration in iOS 27.</li>
            <li style={{ marginBottom: 12 }}>Smarter Siri experiences powered by external models.</li>
            <li style={{ marginBottom: 12 }}>AI-enhanced AirPods and wearable devices.</li>
          </ul>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <span>Business Standard</span>
              <span>Gulf News</span>
              <span>Yahoo Tech</span>
              <span>Guardian reporting</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #ff8c00)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>Tech News Desk • May 6, 2026</div>
             </div>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p { margin-bottom: 24px; }
      `}</style>
    </div>
  );
}
