import Link from 'next/link';
import { ArrowLeft, Lightbulb, Zap, Activity, Info } from 'lucide-react';

export default function AhaMomentPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ffd700', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Lightbulb size={16} /> Neurobiology
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            The Science of <span>"Aha!"</span> Moments
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            Archimedes jumped out of his bathtub. Isaac Newton got hit by an apple. Both had a sudden burst of "Aha!" where the world suddenly made sense. But what is actually happening inside the gray matter when the lightbulb turns on?
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #1d1b0b, #ffd7000a)', position: 'relative' }}>
             <div style={{ textAlign: 'center', color: '#ffd700' }}>
                <Zap size={64} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p style={{ fontSize: 14, fontWeight: 600 }}>[Visual: A sudden explosion of light and geometric patterns from a child's head]</p>
             </div>
          </div>
        </figure>

        <section className="blog-content">
          <p>
            An "Aha!" moment (or insight) represents a sudden restructuring of perception. It’s when a problem you've been stuck on for minutes suddenly becomes clear—not through step-by-step logic, but through a global reorganization of information.
          </p>

          <h2>The Gamma Burst</h2>
          <p>
            Neuroimaging (fMRI and EEG) shows that about 300 milliseconds before a person has an insight, there is a surge in high-frequency <strong>gamma waves</strong> in the right temporal lobe. This area is responsible for "distant associations"—connecting ideas that don't seem related at first glance.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, margin: '40px 0' }}>
            <div className="card" style={{ padding: 24 }}>
              <Activity style={{ color: '#ffd700', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Memory Advantage</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Solutions found via insight are more likely to be remembered later due to higher neural salience.</p>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <Info style={{ color: '#00d4ff', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Incubation</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Stepping away from a problem (the "bathtub" strategy) allows the subconscious to process distant links.</p>
            </div>
          </div>

          <h2>Triggering Insight</h2>
          <p>
            You can't force an "Aha!" moment, but you can create the conditions for it. Games that encourage spatial reasoning and pattern recognition (like <em>WordVibe</em> or <em>Merge Vibe</em>) are essentially insight-generators. They constantly present the brain with "bottlenecks" that require a perspective shift to overcome.
          </p>
        </section>
      </article>
    </div>
  );
}
