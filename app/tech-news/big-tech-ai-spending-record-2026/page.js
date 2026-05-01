import Link from 'next/link';
import { ArrowLeft, Sparkles, TrendingUp, DollarSign, Server } from 'lucide-react';

export const metadata = {
  title: 'Big Techs $725 Billion AI Spending Spree | Tech Pulse',
  description: 'Meta, Microsoft, Alphabet, and Amazon are collectively spending $725 billion on AI infrastructure in 2026. Is it a bubble or a revolution?',
  openGraph: {
    title: 'Big Techs $725 Billion AI Spending Spree',
    description: 'The numbers are staggering—$725 billion on AI in one year.',
    type: 'article',
    url: '/tech-news/big-tech-ai-spending-record-2026',
  },
  alternates: {
    canonical: '/tech-news/big-tech-ai-spending-record-2026',
  },
};

export default function BigTechAISpendingPage() {
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
            <Sparkles size={16} /> Artificial Intelligence & Business
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Big Tech Is Spending <span>$725 Billion</span> on AI in 2026 — and It's Not a Bubble
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            On Wednesday, April 30, the worlds most valuable companies—Meta, Microsoft, Alphabet, and Amazon—reported their earnings. The numbers were staggering.
          </p>
        </header>

        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Wikimedia_Foundation_Servers-8055_35.jpg/1280px-Wikimedia_Foundation_Servers-8055_35.jpg" 
          alt="AI data centre server racks — the physical backbone of the AI arms race" 
          style={{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)' }}
        />

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            On Wednesday, the big four—Meta, Microsoft, Alphabet, and Amazon—reported their Q1 2026 earnings. They all beat expectations. They all posted record revenues. And then, they all announced they were spending even more money on AI than anyone thought possible. 
          </p>
          
          <p>
            Their combined capital expenditure (ca-pex) plans for 2026 have now reached a wild $725 billion. Thats a 77% increase from last years record. To put that in perspective, that figure is larger than the GDP of most European countries! And honestly, its almost certainly not the ceiling. 
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Numbers Are Staggering</h2>
          <p>
            Micosoft's number—$190 billion—was the real eye-opener. Analysts had forecast around $152 billion. CFO Amy Hood attributed $25 billion of that overshoot directly to rising memory chip and component costs. (See our other article about the memory crunch!)
          </p>
          
          <div style={{ overflowX: 'auto', marginBottom: 32 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#fff' }}>Company</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#fff' }}>2026 Capex (Est)</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#fff' }}>Key Metric</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px' }}><strong>Amazon</strong></td>
                  <td style={{ padding: '12px' }}>~$200 Billion</td>
                  <td style={{ padding: '12px' }}>AWS grew 28% YoY</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px' }}><strong>Microsoft</strong></td>
                  <td style={{ padding: '12px' }}>~$190 Billion</td>
                  <td style={{ padding: '12px' }}>AI business at $37B run rate</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px' }}><strong>Alphabet</strong></td>
                  <td style={{ padding: '12px' }}>$180–$190 Billion</td>
                  <td style={{ padding: '12px' }}>Google Cloud up 63%</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px' }}><strong>Meta</strong></td>
                  <td style={{ padding: '12px' }}>$125–$145 Billion</td>
                  <td style={{ padding: '12px' }}>Revenue hit $56.3B in Q1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Alphabet was the standout performer. Google Cloud revenue hit $20 billion in a single quarter! That business now accounts for 18% of their total revenue. Its wild how fast they are growing. 
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Is This a Bubble?</h2>
          <p>
            People have been asking if this is a bubble for two years now. But the Q1 2026 results are the most convincing counter-argument yet. This isnt just speculative spending—its being funded by actual, real revenue. 
          </p>
          <p>
            Micosoft's total AI business hit a $37 billion annualised run rate, up 123% year over year. Google's products built on generative AI grew nearly 800% in a year! The infrastructure build-out is working, in the bluntest terms.
          </p>
          
          <p>
            Of course, there are costs. Meta and Microsoft both announced layoffs recently to "reallocate" spending into AI. Computing power costs at these companies now exceed total employee salaries. Think about that for a second—the machines cost more than the people. 
          </p>

          <blockquote>
            "Big Tech has successfully transitioned from the 'build' phase to intense monetisation. The infrastructure build-out is not a speculative bubble—its a calculated expansion."
            <cite>— Benzinga Analysis, April 30, 2026</cite>
          </blockquote>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <a href="https://www.tomshardware.com/tech-industry/big-tech/big-techs-ai-spending-plans-reach-725-billion" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>Tom's Hardware</a>
              <a href="https://www.irishtimes.com/business/2026/04/30/google-outpaces-rivals-as-big-techs-ai-spending-plans-rise-to-725bn/" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>Irish Times</a>
              <span>Financial Times</span>
              <span>Benzinga</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #ff2d78)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>AI & Finance Desk • May 1, 2026</div>
             </div>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p { margin-bottom: 24px; }
        .blog-content strong { color: #fff; }
        blockquote {
          margin: 40px 0;
          padding: 24px 32px;
          border-left: 4px solid #00d4ff;
          background: rgba(0, 212, 255, 0.03);
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
