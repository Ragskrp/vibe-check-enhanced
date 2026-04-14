import Link from 'next/link';
import { ArrowLeft, Landmark, MessageCircle, HelpCircle, Users } from 'lucide-react';

export default function PhilosophyForChildrenPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ff8c00', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Landmark size={16} /> Philosophy
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            P4C: <span>Big Questions</span> for Small Humans
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            Is a hotdog a sandwich? If you replace every part of a boat, is it still the same boat? Children are natural philosophers because they haven't yet learned to stop asking "Wait, what exactly do you mean by that?"
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #1d120b, #ff8c000a)', position: 'relative' }}>
             <div style={{ textAlign: 'center', color: '#ff8c00' }}>
                <Users size={64} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p style={{ fontSize: 14, fontWeight: 600 }}>[Visual: A group of diverse children sitting around a floating, glowing geometric shape]</p>
             </div>
          </div>
        </figure>

        <section className="blog-content">
          <p>
            Philosophy for Children (P4C) is an educational movement that integrates philosophical inquiry into the standard curriculum through structured dialogue. It focuses on the "4Cs": <strong>Critical, Creative, Caring, and Collaborative</strong> thinking. 
          </p>

          <h2>The Community of Inquiry</h2>
          <p>
            P4C research suggests that when students engage in regular philosophical discussion, they see marked improvements in reading and mathematics. But more importantly, they develop higher <strong>emotional intelligence</strong>. By debating "Big Questions" (like "Is it ever okay to lie?"), children learn to respect diverse perspectives and build arguments based on reason rather than volume.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, margin: '40px 0' }}>
            <div className="card" style={{ padding: 24 }}>
              <HelpCircle style={{ color: '#ff8c00', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Conceptual Clarity</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Learning to define terms precisely before starting a debate.</p>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <MessageCircle style={{ color: '#00d4ff', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Active Listening</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Engaging with an opponent's point before responding with your own.</p>
            </div>
          </div>

          <h2>Why It Matters Today</h2>
          <p>
            In an era of polarized information, the ability to think critically about claims and listen to others is a survival skill. P4C provides children with the "logical toolkit" they need to navigate complex social realities with confidence and empathy.
          </p>
        </section>
      </article>
    </div>
  );
}
