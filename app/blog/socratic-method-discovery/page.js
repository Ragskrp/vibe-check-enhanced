import Link from 'next/link';
import { ArrowLeft, Quote, HelpCircle, Lightbulb, Users } from 'lucide-react';

export default function SocraticMethodPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00d4ff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <HelpCircle size={16} /> Science of Inquiry
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            The Socratic Method: Why <span>Questions</span> are Better than Answers
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            If a teacher tells you the answer, they solve your problem for a minute. If they ask you a question, they give you a puzzle for a lifetime. Why is it that the smartest people in the room are usually the ones asking the most questions?
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #001f3f, #00d4ff0a)', position: 'relative' }}>
             {/* Placeholder for the generated image */}
             <div style={{ textAlign: 'center', color: '#00d4ff' }}>
                <HelpCircle size={64} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p style={{ fontSize: 14, fontWeight: 600 }}>[Visual: A child holding a glowing question mark connecting with an adult]</p>
             </div>
          </div>
          <figcaption style={{ padding: '16px 24px', fontSize: 14, color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
            The Socratic Method shifts the burden of thought from the teacher to the learner, fostering neural autonomy.
          </figcaption>
        </figure>

        <section className="blog-content">
          <p>
            Traditionally, education has been viewed as a bucket-filling exercise: the teacher has the knowledge (the water) and pours it into the student (the bucket). But modern cognitive science, echoing 2,500-year-old wisdom, suggests that <strong>inquiry-based learning</strong> is far more effective for long-term retention and critical thinking.
          </p>

          <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(0, 212, 255, 0.03)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '40px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Quote size={20} /> The Research Says...
            </h3>
            <p style={{ margin: 0, fontSize: 16, color: '#eee' }}>
              Studies on the Socratic method in early childhood education show that children who are prompted with "How" and "Why" questions instead of direct instructions develop <strong>refined verbal communication</strong> and a higher degree of <strong>intellectual curiosity</strong>. By acting as facilitators, educators guide children to challenge their own presuppositions and arrive at independent conclusions.
            </p>
          </div>

          <h2>1. Fostering Intellectual Resilience</h2>
          <p>
            When a child is given an answer, the cognitive process ends. When they are asked a question, it begins. Socratic questioning teaches children to be comfortable with <em>not knowing</em>. Research suggests this builds resilience; children learn to adjust their views when presented with new evidence, rather than seeing "being wrong" as a failure.
          </p>

          <h2>2. Neural Autonomy</h2>
          <p>
            From a neurobiological perspective, the effort required to articulate a reasoning process strengthens synaptic plasticity. The brain isn't just recording data; it is building a <strong>schema</strong>—a mental framework that helps the child categorize and connect future information.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, margin: '40px 0' }}>
            <div className="card" style={{ padding: 24 }}>
              <Lightbulb style={{ color: '#ffd700', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Modeling Openness</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Turning moments of uncertainty into collaborative "discovery" missions instead of lectures.</p>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <Users style={{ color: '#00ff94', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 8 }}>Collaborative Discovery</h4>
              <p style={{ fontSize: 14, color: '#888', margin: 0 }}>Encouraging children to explain their 'logical path' to others, refining their own understanding.</p>
            </div>
          </div>

          <h2>How to Implement at Home</h2>
          <p>
            You don't need to be a philosopher to use the Socratic method. Next time your child asks "Why is the sky blue?" or "How does this game work?", try responding with: <em>"That's a great mystery. What do you think happens first?"</em> or <em>"If we changed this one thing, what do you imagine would happen to the rest?"</em>
          </p>
        </section>

        <footer style={{ marginTop: 64, padding: 40, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ marginBottom: 16 }}>Play a logic game</h3>
          <p style={{ color: '#888', marginBottom: 24 }}>Put these inquiry skills to the test with our daily logic puzzles.</p>
          <Link href="/" className="btn btn-primary" style={{ padding: '12px 32px' }}>
            Back to Games
          </Link>
        </footer>
      </article>
    </div>
  );
}
