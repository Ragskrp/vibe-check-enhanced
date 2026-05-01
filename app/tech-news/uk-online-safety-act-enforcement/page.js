import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Zap, Target, BookOpen, AlertCircle, Gavel } from 'lucide-react';

export const metadata = {
  title: 'UK Online Safety Act: What It Means for You | Tech Pulse',
  description: 'As the UK begins enforcing the Online Safety Act, we break down the new requirements for platforms and the impact on user privacy and safety.',
  openGraph: {
    title: 'UK Online Safety Act: Enforcement Begins',
    description: 'An analysis of the UK\'s landmark legislation and its global implications for the tech industry.',
    type: 'article',
    url: '/tech-news/uk-online-safety-act-enforcement',
  },
  alternates: {
    canonical: '/tech-news/uk-online-safety-act-enforcement',
  },
};

export default function OnlineSafetyActPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/tech-news" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Tech News
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ff2d78', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <ShieldCheck size={16} /> Cybersecurity & Law
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            The UK <span>Online Safety Act</span>: Theory Meets Practice
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            After years of debate, Ofcom has officially begun the enforcement phase of the UK's landmark Online Safety Act. This isnt just a UK story—it's a blueprint for the future of global tech regulation.
          </p>
        </header>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            The Online Safety Act (OSA) is one of the most ambitious attempts to regulate the digital frontier that we've seen in a long time. While earlier rules focused on data privacy, the OSA is all about <strong>platform responsibility</strong>. It shifts the burden from the user to the platform to prevent illegal content and protect children. 
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Three Pillars of Compliance</h2>
          <p>
            Ofcom—the UK's communications regulator, in case you didn't know—has laid out three primary areas where platforms must demonstrate immediate action:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
            <li style={{ marginBottom: 12 }}><strong>Illegal Content:</strong> Proactive removal of content related to terrorism and child exploitation.</li>
            <li style={{ marginBottom: 12 }}><strong>Child Protection:</strong> Robust age-verification systems and default privacy settings for minors.</li>
            <li><strong>User Empowerment:</strong> Giving adults more control over the types of content they see (legal but harmful stuff).</li>
          </ul>

          <div style={{ margin: '40px 0', padding: '32px', borderRadius: 24, background: 'rgba(255, 45, 120, 0.05)', border: '1px solid rgba(255, 45, 120, 0.1)' }}>
            <h3 style={{ color: '#ff2d78', fontSize: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertCircle size={20} /> The "Age Verification" Controversy
            </h3>
            <p style={{ margin: 0, fontSize: 16 }}>
              The most contentious part of the act (and there are alot of them!) remains the requirement for platforms to verify age. Critics argue this creates a privacy nightmare, requiring users to upload ID to multiple sites. Ofcom is currently evaluating tech that can estimate age without collecting personal data.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Impact on Big Tech</h2>
          <p>
            For giants like Meta, Google, and TikTok, the OSA means a massive investment in human moderation and AI filtering. Fines for non-compliance can reach up to £18 million or 10% of global annual turnover—whichever is higher. Thats a huge amount of money! In extreme cases, senior managers can even face criminal prosecution.
          </p>
          <p>
            Many smaller platforms are worried about the "compliance tax." The cost of implementing these complex systems could potentially stifle innovation and favor the big players who already have the resources to meet these demands.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>A Global Precedent</h2>
          <p>
            The world is watching. If the UK can successfully enforce these rules without breaking the fundamental utility of the internet, other nations will likely follow. We are moving toward a "splinternet," where your experience on a platform is fundamentally shaped by the local laws of the country you are in.
          </p>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #ff2d78, #ff8c00)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial Team</div>
               <div style={{ color: '#888', fontSize: 13 }}>Legal & Policy Desk • April 30, 2026</div>
             </div>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p { margin-bottom: 24px; }
        .blog-content strong { color: #fff; }
      `}</style>
    </div>
  );
}
