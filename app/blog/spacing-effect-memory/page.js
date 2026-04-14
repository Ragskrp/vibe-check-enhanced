import Link from 'next/link';
import { ArrowLeft, Clock, Zap, Repeat, Layers } from 'lucide-react';

export default function SpacingEffectPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00ff94', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Repeat size={16} /> Neuroscience
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            The Spacing Effect: Why <span>Cramming</span> is a Biological Waste
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            Imagine you have to fill a massive tank of water. Would you rather pour 100 buckets all at once and watch half of it splash over the sides, or pour one bucket every morning for 100 days? Your neurons prefer the slow drip.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #0b1a13, #00ff940a)', position: 'relative' }}>
             <div style={{ textAlign: 'center', color: '#00ff94' }}>
                <Clock size={64} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p style={{ fontSize: 14, fontWeight: 600 }}>[Visual: Macro view of neural pathways glowing with golden pulses of light]</p>
             </div>
          </div>
        </figure>

        <section className="blog-content">
          <p>
            The spacing effect is one of the most robust findings in experimental psychology. It describes the phenomenon where learning is far more effective when study sessions are spread out over time rather than "crammed" into a single block.
          </p>

          <h2>The Biology of Consolidation</h2>
          <p>
            When we learn something, the brain initiates a process called <strong>Long-Term Potentiation (LTP)</strong>—the physical strengthening of synapses. This isn't instant. It requires protein synthesis and time for the memory to "consolidate." Research shows that spaced intervals provide repetitive opportunities for retrieval, which acts like a "re-saving" of the file, each time adding more stability.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, margin: '40px 0' }}>
            <div className="card" style={{ padding: 28, borderBottom: '2px solid #00ff94' }}>
              <Zap style={{ color: '#00ff94', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>The Forgetting Curve</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Information is lost fastest immediately after learning. Reviewing right at the point of forgetting resets the curve.</p>
            </div>
            <div className="card" style={{ padding: 28, borderBottom: '2px solid #00ff94' }}>
              <Layers style={{ color: '#00ff94', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Contextual Variation</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Spaced learning introduces small variations in your environment, helping the brain generalize the knowledge.</p>
            </div>
          </div>

          <h2>Why "Daily" Games Work</h2>
          <p>
            This is exactly why daily streak-based games (like WordVibe) are so effective. Instead of playing for 5 hours once a month, playing for 5 minutes every day triggers the spacing effect. You are training your brain to retrieve word patterns regularly, leading to permanent vocabulary growth rather than temporary memorization.
          </p>
        </section>
      </article>
    </div>
  );
}
