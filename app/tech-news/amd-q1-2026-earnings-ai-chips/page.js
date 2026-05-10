import Link from 'next/link';
import { ArrowLeft, Cpu } from 'lucide-react';

export const metadata = {
  title: 'AMD Just Proved the AI Chip War Has a Second Contender — and Its Name Isn\'t Nvidia | Tech Pulse',
  description: 'Advanced Micro Devices reported Q1 2026 earnings that top expectations as AI data center demand surges.',
  openGraph: {
    title: 'AMD Just Proved the AI Chip War Has a Second Contender',
    description: 'AMD\'s Data Center division hit $5.8 billion in Q1 2026 — an all-time record.',
    type: 'article',
    url: '/tech-news/amd-q1-2026-earnings-ai-chips',
  },
  alternates: {
    canonical: '/tech-news/amd-q1-2026-earnings-ai-chips',
  },
};

export default function AmdEarningsPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/tech-news" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Tech Pulse
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ffe600', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Cpu size={16} /> Hardware
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            AMD Just Proved the AI Chip War Has a Second Contender — <span>and Its Name Isn't Nvidia</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            Advanced Micro Devices reported first-quarter 2026 earnings, and the numbers weren't just good — they were the kind of results that reframe the AI chip narrative.
          </p>
        </header>

        <figure style={{ margin: '0 0 40px 0' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/1280px-AMD_Logo.svg.png" 
            alt="AMD Logo" 
            style={{ width: '100%', borderRadius: 24, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)', background: '#fff', padding: '40px' }}
          />
          <figcaption style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>
            AMD's Data Center division hit $5.8 billion in Q1 2026 — an all-time record — as demand for its EPYC CPUs and Instinct GPUs surges across every major hyperscaler. Image: Wikimedia Commons (CC-BY-SA)
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Numbers That Matter</h2>
          <p>
            For the quarter, AMD saw earnings per share of $1.37 on revenue of $10.25 billion. Analysts were calling for EPS of $1.28 and revenue of $9.89 billion. That's a 38% revenue jump year-over-year, and a 43% surge in adjusted earnings per share.
          </p>
          <p>
            AMD's Data Center division accounted for $5.8 billion in Q1 revenue, which is up 7% sequentially and 57% compared to the same quarter a year ago — ranking as an all-time high for AMD. AMD credited the spike to strong demand for its EPYC processor and the continued ramp of its Instinct GPU shipments.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Meta Deal: A Statement Customer</h2>
          <p>
            Perhaps the most strategically significant disclosure came not in the headline numbers, but in the strategic highlights: Meta plans to deploy up to <strong>6 GW of AMD Instinct GPUs</strong>. Six gigawatts of AMD silicon. That's not a trial deployment — that's a hyperscaler committing AMD as a primary infrastructure partner.
          </p>
          <p>
            The announcement also revealed that AWS, Google Cloud, Microsoft Azure, and Tencent all announced new and expanded 5th Gen EPYC-powered cloud instances — a clean sweep of the four biggest cloud providers.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The CPU Comeback Story</h2>
          <p>
            What makes AMD's quarter genuinely unusual is the scale of its CPU gains. Unlike Nvidia, AMD is making big gains on the CPU side, delivering the fourth consecutive quarter of record server CPU revenue. Running AI inference workloads at scale requires not just accelerators, but also the high-performance CPUs that orchestrate them.
          </p>

          <blockquote>
            "We delivered an outstanding first quarter, driven by accelerating demand for AI infrastructure, with Data Center now the primary driver of our revenue and earnings growth."
            <cite>— Dr. Lisa Su, AMD Chair and CEO</cite>
          </blockquote>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <span>CNBC</span>
              <span>Yahoo Finance</span>
              <span>HotHardware</span>
              <span>SEC 8-K filing</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #ffe600, #ff8c00)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>Hardware & Data Center Desk • May 6, 2026</div>
             </div>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p { margin-bottom: 24px; }
        blockquote {
          margin: 40px 0;
          padding: 24px 32px;
          border-left: 4px solid #ffe600;
          background: rgba(255, 230, 0, 0.03);
          font-style: italic;
          color: #eee;
        }
        blockquote cite {
          display: block;
          margin-top: 12px;
          font-style: normal;
          color: #888;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
