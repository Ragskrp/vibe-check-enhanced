import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Microsoft, Google, and xAI Agree to Early U.S. Government AI Safety Reviews | Tech Pulse',
  description: 'Major AI developers agree to provide the U.S. government with early access to advanced AI models for safety testing.',
  openGraph: {
    title: 'Microsoft, Google, and xAI Agree to Early U.S. Government AI Safety Reviews',
    description: 'Artificial intelligence regulation takes a major step forward.',
    type: 'article',
    url: '/tech-news/microsoft-google-xai-safety-reviews',
  },
  alternates: {
    canonical: '/tech-news/microsoft-google-xai-safety-reviews',
  },
};

export default function SafetyReviewsPage() {
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
            <Shield size={16} /> AI & ML
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Microsoft, Google, and xAI Agree to Early U.S. Government <span>AI Safety Reviews</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            Artificial intelligence regulation took another major step forward this week after Microsoft, Google, and Elon Musk’s xAI agreed to provide the U.S. government with early access to advanced AI models before public release.
          </p>
        </header>

        <img 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995" 
          alt="AI regulation and safety concept" 
          style={{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)' }}
        />

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            The agreement allows the U.S. Department of Commerce’s Center for AI Standards and Innovation to test upcoming AI systems for cybersecurity threats, misuse risks, and national security concerns. The move comes as governments worldwide increase pressure on tech companies to improve AI transparency and safety.
          </p>
          <p>
            According to reports, the initiative is specifically focused on evaluating whether new frontier AI models could be exploited for hacking, cyber warfare, or large-scale misinformation campaigns. The agreement also fulfills a broader commitment made by the U.S. government in 2025 to create stronger public-private AI oversight partnerships.
          </p>
          <p>
            Industry analysts say this marks one of the strongest collaborations yet between governments and major AI developers. The decision could shape how future AI systems are launched globally, especially as competition intensifies between OpenAI, Google DeepMind, Anthropic, xAI, and Microsoft-backed platforms.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Why This Matters</h2>
          <ul style={{ paddingLeft: 20, margin: 0, listStyleType: 'disc' }}>
            <li style={{ marginBottom: 12 }}>Governments are becoming directly involved in AI testing.</li>
            <li style={{ marginBottom: 12 }}>AI companies may face stricter deployment requirements.</li>
            <li style={{ marginBottom: 12 }}>Security and cybersecurity concerns are now central to AI development.</li>
            <li style={{ marginBottom: 12 }}>Global AI regulation standards could emerge faster than expected.</li>
          </ul>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <span>Reuters</span>
              <span>Department of Commerce reporting</span>
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
