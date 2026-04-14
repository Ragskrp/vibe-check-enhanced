import Link from 'next/link';
import { ArrowLeft, Target, Eye, Maximize, LayoutGrid } from 'lucide-react';

export default function VisualLogicPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ffffff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Maximize size={16} /> Pattern Recognition
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            Visual Logic: How <span>Chess</span> Trains the Mind
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            Garry Kasparov once said that chess is a "gymnasium for the mind." But what muscles are we actually growing? Hint: It’s not about memorizing thousands of moves; it’s about learning to see what isn’t there yet.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #111111, #ffffff0a)', position: 'relative' }}>
             <div style={{ textAlign: 'center', color: '#ffffff' }}>
                <LayoutGrid size={64} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p style={{ fontSize: 14, fontWeight: 600 }}>[Visual: A chess board where the pieces are made of light and logical paths are drawn between them]</p>
             </div>
          </div>
        </figure>

        <section className="blog-content">
          <p>
            Visual logic is the ability to interpret and manipulate visual information to solve problems. While we often think of "logic" as a linguistic skill, the most complex problem-solving often happens in the visual-spatial domain.
          </p>

          <h2>The Gymnasium of the Mind</h2>
          <p>
            Chess is the ultimate trainer for visual logic. Success relies on <strong>pattern recognition</strong>—the ability to store and recognize complex clusters of information (tactics, strategies, piece placements). Experienced players don't see 32 individual pieces; they see a "landscape" of force and opportunity.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, margin: '40px 0' }}>
            <div className="card" style={{ padding: 24 }}>
              <Eye style={{ color: '#00d4ff', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Spatial Reasoning</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Visualizing board changes and anticipating multiple outcomes before making a move.</p>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <Target style={{ color: '#ff2d78', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Concentration</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Maintaining a mental model of many moving parts simultaneously over long periods.</p>
            </div>
          </div>

          <h2>Beyond the Board</h2>
          <p>
            Consistent practice in visual logic has been linked to improvements in concentration, visual memory, and structured thinking. These skills transfer directly to subjects like geometry, architecture, and computer programming, where visualizing a structure before building it is essential.
          </p>
        </section>
      </article>
    </div>
  );
}
