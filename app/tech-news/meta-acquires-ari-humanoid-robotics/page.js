import Link from 'next/link';
import { ArrowLeft, Bot, Zap, Globe, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Meta Humanoid Robotics Acquisition | Tech Pulse',
  description: 'Meta has acquired Assured Robot Intelligence (ARI), a startup building AI foundation models for humanoid robots. Zuckerberg is officially in the robot race.',
  openGraph: {
    title: 'Meta Just Bought Its Way Deeper Into the Robot Race',
    description: 'Inside Mark Zuckerberg\'s quiet acquisition of ARI and the future of physical AI.',
    type: 'article',
    url: '/tech-news/meta-acquires-ari-humanoid-robotics',
  },
  alternates: {
    canonical: '/tech-news/meta-acquires-ari-humanoid-robotics',
  },
};

export default function MetaRoboticsAcquisitionPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/tech-news" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Tech Pulse
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00ff94', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Bot size={16} /> Robotics & Physical AI
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Meta Just Bought Its Way <span>Deeper Into the Robot Race</span> — and It's Not Playing Around
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            While the rest of tech was watching the Musk v. Altman courtroom drama, Meta quietly closed one of the most strategically significant acquisitions of its year.
          </p>
        </header>

        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png" 
          alt="Meta Platforms Inc. logo — expanding into physical AI" 
          style={{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', padding: '40px 0' }}
        />

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            On Friday May 1, Meta confirmed it had acquired <strong>Assured Robot Intelligence (ARI)</strong>, a startup building AI foundation models for humanoid robots. The entire team, including both co-founders, is now inside Meta. This isn't just another talent grab; it's a statement of intent.
          </p>
          
          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Who Is ARI — and Why Does Meta Want Them?</h2>
          <p>
            ARI was founded by two giants in the field: <strong>Xiaolong Wang</strong> (formerly Nvidia) and <strong>Lerrel Pinto</strong>. Here's a detail worth sitting with: Amazon bought Pinto's last company (Fauna Robotics) in March; Meta just bought his new one. 
          </p>
          <p>
            The race to acquire humanoid robotics talent is moving so fast that two of the biggest companies in the world have now each acquired a startup founded by the same person in the span of two months. 
          </p>

          <div style={{ margin: '40px 0', padding: '32px', borderRadius: 24, background: 'rgba(0, 255, 148, 0.05)', border: '1px solid rgba(0, 255, 148, 0.1)' }}>
            <h3 style={{ color: '#00ff94', fontSize: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Zap size={20} /> Meta's Robotics Strategy
            </h3>
            <p style={{ marginBottom: 16, fontSize: 16 }}>Meta's goal is to be an <strong>enabling platform</strong> rather than just selling hardware:</p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 12 }}><strong>Foundation Models:</strong> Applying the conceptual leap of LLMs to "Physical AI" for robots in the real world.</li>
              <li style={{ marginBottom: 12 }}><strong>Open Ecosystem:</strong> Building the Android/Qualcomm of robotics—providing the underlying layer for other manufacturers.</li>
              <li style={{ marginBottom: 12 }}><strong>Smart Glasses Synergy:</strong> Real-time spatial understanding research feeds directly into Meta's wearable tech.</li>
              <li><strong>Capital Commitment:</strong> Meta raised its 2026 CAPEX to $145B to fund these long-term bets.</li>
            </ul>
          </div>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Broader Arms Race</h2>
          <p>
            The ARI deal lands in the context of an intensifying competition to own physical AI. Amazon acquired Fauna Robotics in March; Google is partnering with Agile Robots SE; and Tesla is gearing up for the full reveal of Optimus Gen 3 later this year.
          </p>
          
          <p>
            ARI's team joins <strong>Meta Superintelligence Labs (MSL)</strong>, working directly with the Meta Robotics Studio. A Meta spokesperson confirmed the ARI team will "bring deep expertise in how we can design our models and frontier capabilities for whole-body humanoid control."
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Why It Matters</h2>
          <p>
            Humanoid robots remain years from broad commercial deployment. But the talent, capital, and strategic intent are converging faster than most people expected. By securing ARI, Meta is ensuring it owns the software "brain" that will power the next generation of physical machines.
          </p>

          <blockquote>
            "We acquired Assured Robot Intelligence, a company at the frontier of robotic intelligence designed to enable robots to understand, predict, and adapt to human behaviours."
            <cite>— Meta spokesperson, May 1, 2026</cite>
          </blockquote>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <a href="https://techcrunch.com/2026/05/01/meta-buys-robotics-startup-to-bolster-its-humanoid-ai-ambitions/" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>TechCrunch</a>
              <a href="https://www.bloomberg.com/news/articles/2026-05-01/meta-acquires-assured-robot-intelligence-to-help-build-humanoid-technology" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>Bloomberg</a>
              <a href="https://www.pymnts.com/meta/2026/meta-acquires-ari-fuel-humanoid-robotics-push/" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>PYMNTS</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00ff94, #00d4ff)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>Robotics & AI Desk • May 3, 2026</div>
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
          border-left: 4px solid #00ff94;
          background: rgba(0, 255, 148, 0.03);
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
