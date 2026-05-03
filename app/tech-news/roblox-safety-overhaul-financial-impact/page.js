import Link from 'next/link';
import { ArrowLeft, ShieldCheck, TrendingDown, Users, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Roblox Safety Overhaul & Market Impact | Tech Pulse',
  description: 'Roblox shares fell 18% after the company implemented mandatory age verification to protect children. A deep dive into the cost of doing the right thing.',
  openGraph: {
    title: 'Roblox Did the Right Thing for Children — and the Market Punished It Hard',
    description: 'Inside the $1 billion trade-off between user growth and child safety.',
    type: 'article',
    url: '/tech-news/roblox-safety-overhaul-financial-impact',
  },
  alternates: {
    canonical: '/tech-news/roblox-safety-overhaul-financial-impact',
  },
};

export default function RobloxSafetyImpactPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/tech-news" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Tech Pulse
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ff8c00', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <ShieldCheck size={16} /> Trust & Safety
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Roblox Did the <span>Right Thing for Children</span> — and the Market Punished It Hard
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            Doing the responsible thing can cost a consumer tech company a billion dollars in guidance and 18% of its stock price. This is the reality Roblox is navigating right now.
          </p>
        </header>

        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Roblox_logo.svg/1280px-Roblox_logo.svg.png" 
          alt="Roblox logo — prioritizing child safety over growth" 
          style={{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '40px 0' }}
        />

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            Roblox shares fell <strong>18% on Friday May 1</strong>, triggered by Q1 earnings that missed Wall Street forecasts and a dramatic cut to full-year 2026 guidance. Bookings are now expected to land nearly <strong>$900 million below analyst consensus</strong>.
          </p>
          
          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Friction of Age Verification</h2>
          <p>
            In January 2026, Roblox implemented a mandatory <strong>age-check verification system</strong> that restricts chat features for users who haven't completed identity verification. The company knew it would create friction; they just underestimated how much.
          </p>
          <p>
            CFO Naveen Chopra told Reuters that stricter age-gating has curbed "communication engagement on the platform," which makes it harder for content to go viral. The data is striking: <strong>73% of age-checked users are under 18</strong>. Roblox is, at its core, a children's platform—and it's now being governed like one.
          </p>

          <div style={{ margin: '40px 0', padding: '32px', borderRadius: 24, background: 'rgba(255, 140, 0, 0.05)', border: '1px solid rgba(255, 140, 0, 0.1)' }}>
            <h3 style={{ color: '#ff8c00', fontSize: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <TrendingDown size={20} /> Financial Reality Check
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>Metric</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>New Guidance</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 8px' }}>Bookings</td>
                    <td style={{ padding: '12px 8px' }}>$7.33B – $7.60B</td>
                    <td style={{ padding: '12px 8px', color: '#ff2d78' }}>↓ ~$950M</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 8px' }}>Revenue</td>
                    <td style={{ padding: '12px 8px' }}>$5.87B – $6.14B</td>
                    <td style={{ padding: '12px 8px', color: '#ff2d78' }}>↓ ~$150M</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}>Growth</td>
                    <td style={{ padding: '12px 8px' }}>8% – 12%</td>
                    <td style={{ padding: '12px 8px', color: '#ff2d78' }}>Sharply Lower</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Why Roblox Had No Real Choice</h2>
          <p>
            The safety overhaul isn't happening in a vacuum. Roblox is facing <strong>more than 140 lawsuits</strong> alleging failures to protect children. The legal, reputational, and regulatory pressure left Roblox in a position where the age verification rollout was essentially compulsory.
          </p>
          
          <p>
            Investors are now repricing the stock to account for a slower-growth future where safety compliance takes precedence over raw user expansion. The 18% drop signals that the market doesn't believe Roblox can maintain its historic growth while becoming the "responsible" choice for parents.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Why It Matters</h2>
          <p>
            Roblox is effectively running the largest live test of whether a major social platform can retrofit genuine safety measures at scale. While the market's initial reaction is brutal, the alternative—continued legal and ethical failure—was considerably worse.
          </p>

          <blockquote>
            "While our aggressive push to enhance safety lowers our expectations for topline growth in 2026, it makes our platform fundamentally better and amplifies the long-term growth potential."
            <cite>— Roblox shareholder letter, Q1 2026</cite>
          </blockquote>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <a href="https://www.cnbc.com/2026/05/01/roblox-rblx-stock-child-safety-earnings.html" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>CNBC</a>
              <a href="https://www.fool.com/investing/2026/05/03/roblox-shares-tumble-slash-guidance-buy-dip/" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>The Motley Fool</a>
              <a href="https://finance.biggo.com/news/r_q-5J0BoicNoOgC3dRE" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>BigGo Finance</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #ff8c00, #ff2d78)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>Digital Culture & Safety Desk • May 3, 2026</div>
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
          border-left: 4px solid #ff8c00;
          background: rgba(255, 140, 0, 0.03);
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
