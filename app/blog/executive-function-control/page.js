import Link from 'next/link';
import { ArrowLeft, Gamepad2, Activity, Zap, ClipboardList } from 'lucide-react';

export default function ExecutiveFunctionPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ffe600', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Gamepad2 size={16} /> Child Development
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            Executive Function: The Brain’s <span>Air Traffic</span> Control
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            If your brain was a busy airport, your Executive Function would be the Air Traffic Controller. It decides which planes land, which ones take off, and which ones stay circling in the clouds. What happens when the control tower gets overwhelmed?
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #1d1a0b, #ffe6000a)', position: 'relative' }}>
             <div style={{ textAlign: 'center', color: '#ffe600' }}>
                <Activity size={64} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p style={{ fontSize: 14, fontWeight: 600 }}>[Visual: Abstract representation of a brain as a futuristic air traffic control center]</p>
             </div>
          </div>
        </figure>

        <section className="blog-content">
          <p>
            Executive function refers to a set of cognitive processes that are necessary for the cognitive control of behavior. These aren't skills we are born with; they are skills we have the <em>potential</em> to develop over time, specifically through the prefrontal cortex.
          </p>

          <h2>The Three Pillars</h2>
          <p>
            1. <strong>Working Memory:</strong> The ability to hold and manipulate information over short periods.<br/>
            2. <strong>Inhibitory Control:</strong> The ability to resist impulses and stay focused on a goal (the "Stop and Think" muscle).<br/>
            3. <strong>Cognitive Flexibility:</strong> The ability to switch between different rules or perspectives (the "Mental Pivot").
          </p>

          <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(255, 230, 0, 0.03)', border: '1px solid rgba(255, 230, 0, 0.1)', margin: '40px 0' }}>
            <h3 style={{ color: '#ffe600', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={20} /> Targeted Training
            </h3>
            <p style={{ color: '#eee', marginBottom: 0 }}>
              Research shows that targeted, game-based training can lead to measurable improvements in EF skills. Games that require rule-switching (like "Simon Says" variants) or inhibitory control (reacting only to specific cues) are effectively "weightlifting" for the prefrontal cortex.
            </p>
          </div>

          <h2>Why It Matters</h2>
          <p>
            Strong executive function is a better predictor of academic success than IQ. It helps children manage their time, plan their work, and—most importantly—regulate their emotions when things get difficult. At VIBEMENOW, games like <em>Vibe ordie</em> and <em>Reaction Arena</em> specifically target these skills in a high-engagement environment.
          </p>
        </section>
      </article>
    </div>
  );
}
