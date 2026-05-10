import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';

export const metadata = {
  title: 'Disney\'s New CEO Walks Into His First Earnings Call — and Delivers a 7% Rally | Tech Pulse',
  description: 'Josh D\'Amaro delivers one of Disney\'s cleanest quarters in recent memory, sending the stock up 7%.',
  openGraph: {
    title: 'Disney\'s New CEO Walks Into His First Earnings Call — and Delivers a 7% Rally',
    description: 'Disney\'s streaming turns a corner with double-digit operating margin.',
    type: 'article',
    url: '/tech-news/disney-q2-2026-earnings-josh-damaro',
  },
  alternates: {
    canonical: '/tech-news/disney-q2-2026-earnings-josh-damaro',
  },
};

export default function DisneyEarningsPage() {
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
            <Globe size={16} /> Digital Culture
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Disney's New CEO Walks Into His First Earnings Call — <span>and Delivers a 7% Rally</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            Josh D'Amaro has been Disney's CEO for exactly seven weeks. He took over from Bob Iger on March 18. All he had to do for his first earnings call was not mess it up. He didn't just avoid messing it up. He delivered one of Disney's cleanest quarters in recent memory.
          </p>
        </header>

        <figure style={{ margin: '0 0 40px 0' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Cinderella_Castle_at_Magic_Kingdom.jpg/1280px-Cinderella_Castle_at_Magic_Kingdom.jpg" 
            alt="Disney Magic Kingdom" 
            style={{ width: '100%', borderRadius: 24, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <figcaption style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>
            Disney's Experiences division delivered record Q2 revenue of $9.5 billion, even as US domestic attendance dipped slightly. Image: Wikimedia Commons (CC-BY-SA)
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Numbers</h2>
          <p>
            Disney reported $25.17 billion in quarterly revenue, beating Wall Street expectations of $24.78 billion. Overall revenue for the company's fiscal second quarter increased 7% from the same period last year. Net income for the quarter was $2.47 billion. That's a beat on every major metric.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Streaming Turns a Corner</h2>
          <p>
            The story Wall Street has been waiting years to hear is finally being told cleanly. It was the first quarter the entertainment streaming business had an operating margin that broke the double-digit barrier — hitting 10.6%. Streaming operating income surged 88% to $582 million — from a business that was routinely losing hundreds of millions per quarter not two years ago.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Parks: Record Revenue, Softer Attendance</h2>
          <p>
            Disney's Experiences segment delivered a mixed but ultimately reassuring set of numbers. That division brought in $9.5 billion in revenue, marking a new record for the second quarter. Per-person spending at domestic parks rose 5%, driven by higher prices on tickets, food, and merchandise.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>D'Amaro's Three-Pillar Vision</h2>
          <p>
            In D'Amaro's first earnings report as CEO, he laid out a strategy focusing on investing in IP, reaching consumers seamlessly, and using advanced technologies — including AI — to power storytelling. The AI dimension of Disney's strategy is worth watching closely. Disney said its $1.5 billion stake in Fortnite creator Epic Games would be "central" to its strategy to grow reach and engagement.
          </p>

          <blockquote>
            "At an important moment of change for Disney, we remain focused on executing our long-term growth strategy. Our creative and operational momentum drove strong quarterly results, and we continue to expect growth to accelerate in the second half of the fiscal year."
            <cite>— Josh D'Amaro, CEO, Disney Q2 2026 shareholder letter</cite>
          </blockquote>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <span>CNBC</span>
              <span>Yahoo Finance</span>
              <span>Variety</span>
              <span>The Wrap</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #ff8c00, #ff2d78)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>Entertainment & Business Desk • May 6, 2026</div>
             </div>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p { margin-bottom: 24px; }
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
