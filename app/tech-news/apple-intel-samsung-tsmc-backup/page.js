import Link from 'next/link';
import { ArrowLeft, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Apple Is Quietly Shopping for a TSMC Backup — and Intel\'s Stock Just Exploded | Tech Pulse',
  description: 'Apple explores using Intel and Samsung to build main device chips in the US to diversify its supply chain.',
  openGraph: {
    title: 'Apple Is Quietly Shopping for a TSMC Backup',
    description: 'The future of Apple\'s chip supply chain may increasingly be made in the USA.',
    type: 'article',
    url: '/tech-news/apple-intel-samsung-tsmc-backup',
  },
  alternates: {
    canonical: '/tech-news/apple-intel-samsung-tsmc-backup',
  },
};

export default function AppleIntelSamsungPage() {
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
            Apple Is Quietly Shopping for a TSMC Backup — and <span>Intel's Stock Just Exploded</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            A Bloomberg report published recently set off one of the most dramatic single-day surges in Intel's history: Apple has held exploratory discussions about using Intel and Samsung to produce the main processors for its devices in the US.
          </p>
        </header>

        <figure style={{ margin: '0 0 40px 0' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Intel_D1D_Fab.jpg/1280px-Intel_D1D_Fab.jpg" 
            alt="Intel Fab Facility" 
            style={{ width: '100%', borderRadius: 24, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <figcaption style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>
            The future of Apple's chip supply chain may increasingly be made in the USA — at Intel and Samsung plants rather than solely in Taiwan. Image: Wikimedia Commons (CC-BY-SA)
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            The market's reaction was immediate and staggering. Intel shares climbed 13% on the day, hitting a new all-time high. The surge follows Intel's best month in its 55 years on the Nasdaq — the stock jumped 114% in April, pushing the company's market cap past $470 billion.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>What Is Apple Actually Considering?</h2>
          <p>
            The talks are preliminary and no orders have been placed. Apple is said to have had early-stage talks with Intel about using its chipmaking services, while Apple executives have reportedly visited a Samsung plant under construction in Texas that will also make advanced chips. Apple is also said to have concerns about using technology that is not made by its longtime chip partner TSMC.
          </p>
          <p>
            That last point — Apple's own internal caution about moving away from TSMC — is the critical caveat. TSMC has manufactured Apple's iPhone processors since the A8 chip shipped in 2014, and the manufacturing relationship is deeply integrated into how Apple designs its silicon. Switching, even partially, would be a monumental engineering and logistical challenge.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Intel's Remarkable Turnaround</h2>
          <p>
            The report is particularly significant given where Intel was just twelve months ago — a company widely described as falling apart, losing manufacturing ground to TSMC and market relevance to Nvidia. The turnaround since then has been historic. The company is now up over 330% since the U.S. government took a 10% stake in the company last August.
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Samsung's Texas Gamble</h2>
          <p>
            The Texas angle — Samsung's fab in Taylor — is equally notable. It would represent a resumption of a manufacturing partnership that dates back to the original iPhone: the first five generations of iPhone ran on Samsung-manufactured processors, before Apple shifted fully to TSMC.
          </p>

          <blockquote>
            "Apple is seeking potential additional suppliers beyond TSMC as a way to avoid recent shortages almost entirely driven by the current build-out of AI data centres."
            <cite>— MacRumors, summarising Bloomberg's reporting</cite>
          </blockquote>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <span>Bloomberg</span>
              <span>CNBC</span>
              <span>MacRumors</span>
              <span>Tom's Hardware</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #ffe600, #ff8c00)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>Hardware & Supply Chain Desk • May 6, 2026</div>
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
