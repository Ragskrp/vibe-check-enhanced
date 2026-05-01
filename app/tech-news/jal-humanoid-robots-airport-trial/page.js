import Link from 'next/link';
import { ArrowLeft, Cpu, Activity, Zap, Users } from 'lucide-react';

export const metadata = {
  title: 'Japan Airlines Trialing Humanoid Robots | Tech Pulse',
  description: 'Japan Airlines has begun a two-year trial of humanoid robots for ground operations at Haneda Airport. Is this the future of aviation?',
  openGraph: {
    title: 'Japan Airlines Trialing Humanoid Robots',
    description: 'Robots are hitting the tarmac in Tokyo to help with luggage and cargo.',
    type: 'article',
    url: '/tech-news/jal-humanoid-robots-airport-trial',
  },
  alternates: {
    canonical: '/tech-news/jal-humanoid-robots-airport-trial',
  },
};

export default function JALRoboticsPage() {
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
            <Activity size={16} /> Robotics & Automation
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Japan Airlines Sends <span>Humanoid Robots</span> Onto the Tarmac
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            On the tarmac at Tokyos Haneda Airport, something extraordinary is about to become ordinary. JAL has officially started trialing robots for baggage.
          </p>
        </header>

        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Unitree_H1_robot_%28cropped%29.jpg/800px-Unitree_H1_robot_%28cropped%29.jpg" 
          alt="A Unitree humanoid robot — the same model being trialled at Haneda Airport" 
          style={{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)' }}
        />

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            On the tarmac at Tokyo's Haneda Airport—one of the busiest in the world—something pretty wild is happening. Japan Airlines (JAL) has officially started a two-year trial of humanoid robots for ground operations. We are talking about the hard work of loading and unloading baggage and cargo from planes. 
          </p>
          
          <p>
            This trial is a partnership between JAL's ground handling subsidiary and GMO AI & Robotics Corporation. It launched this May and is actually the first time anyone has seen humanoid robots in airport operations in Japan. Pretty cool, right?
          </p>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>Wait, Why Robots?</h2>
          <p>
            The aviation industry has a major labour problem in Japan. The working-age population is expected to shrink by 31% by 2060. At the same time, tourism is booming like crazy. More than 7 million visitors arrived in just the first two months of this year!
          </p>
          <p>
            The mathes just dont work with human workers alone. Ground handling is tough—heavy loads, extreme weather, and constant time pressure. Its the kind of work thats getting harder to find people for. 
          </p>
          
          <div style={{ margin: '40px 0', padding: '32px', borderRadius: 24, background: 'rgba(0, 255, 148, 0.05)', border: '1px solid rgba(0, 255, 148, 0.1)' }}>
            <h3 style={{ color: '#00ff94', fontSize: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Zap size={20} /> Why "Humanoid"?
            </h3>
            <p style={{ margin: 0, fontSize: 16 }}>
              Unlike fixed machines, humanoid robots can use the tools and infrastructure we already have. No airport redesign needed. They can push a trolley, move a conveyor belt, and eventually even clean an aircraft cabin—just like a human would.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 28, marginTop: 48, marginBottom: 20 }}>The Tech Behind It</h2>
          <p>
            The robots are made by China's Unitree Robotics. In a demo recently, a compact Unitre humanoid pushed cargo onto a belt, then waved to onlookers and even shook a coworker's hand. (I wonder if it felt weird shaking hands with a robot on a runway?)
          </p>
          <p>
            They are packed with 3D LiDAR sensors and depth cameras to navigate safely. For now, they can only run for two to three hours before needing a charge, which is a bit of a limitation. But humans are still in control of the safety-critical stuff, like marshalling the planes.
          </p>
          
          <p>
            The trial might run all the way through 2028. Phase one is all about analysis, then simulations, and finally full deployment. Barclays analysts are calling this the "next frontier" in AI development. 
          </p>

          <blockquote>
            "Aging populations and labour shortages are opening the door for humanoids to take on essential—yet often undesirable—roles."
            <cite>— Barclays Research, January 2026</cite>
          </blockquote>
        </section>

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              <a href="https://www.cnbc.com/2026/05/01/japan-airlines-humanoid-robots-haneda-labor-shortage.html" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>CNBC</a>
              <a href="https://press.jal.co.jp/en/release/202604/009502.html" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>JAL Press Release</a>
              <span>Interesting Engineering</span>
              <span>The Register</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00ff94, #00d4ff)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>Robotics & Automation Desk • May 1, 2026</div>
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
