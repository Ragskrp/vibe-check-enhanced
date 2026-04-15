import Link from 'next/link';
import { ArrowLeft, Link as LinkIcon, Puzzle, Lightbulb, BookOpen } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function LogicalReasoningPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#adff2f', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Puzzle size={16} /> Critical Thinking
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            The Bedrock of Thinking: <span>Logical Reasoning</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            If all A are B, and all B are C, is every A also a C? If your brain immediately shouted "Yes!", you have the foundations of syllogistic logic. But why is it that we can solve this puzzle in words, yet struggle when it’s hidden in a real-world argument?
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, position: 'relative' }}>
             <BlogArt type="logical-reasoning-logic" />
          </div>
        </figure>

        <section className="blog-content">
          <p>
            Logical reasoning is the ability to analyze facts, recognize patterns, and draw conclusions systematically. It is the foundation of STEM, law, and informed citizenship. For children, it’s the toolkit that helps them decide if a commercial is telling the truth or if a friend's argument makes sense.
          </p>

          <h2>Inductive vs. Deductive</h2>
          <p>
            1. <strong>Deductive Reasoning:</strong> Starting with a general rule and arriving at a specific instance. (If the rule is "all games on this site are free," and I am playing a game on this site, then this game must be free).<br/><br/>
            2. <strong>Inductive Reasoning:</strong> Taking specific observations and forming a general rule. (I've played 5 games here and they were all fun; therefore, the next game will likely be fun).
          </p>

          <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(173, 255, 47, 0.03)', border: '1px solid rgba(173, 255, 47, 0.1)', margin: '40px 0' }}>
            <h3 style={{ color: '#adff2f', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={20} /> Why It Matters
            </h3>
            <p style={{ color: '#eee', marginBottom: 0 }}>
              Logical thinkers are better equipped for digital literacy. They can recognize "circular reasoning" or "straw man" fallacies in online content, making them less susceptible to misinformation and better at problem-solving in everyday life.
            </p>
          </div>

          <h2>The Playground of Logic</h2>
          <p>
            Puzzles aren't just entertainment; they are isolated labs for logical thinking. When a child plays <em>Odd One Out</em> or <em>Geography Guesser</em>, they are constantly testing hypotheses against facts. This iterative process—making a claim, finding evidence, and adjusting the claim—is the scientific method in its purest form.
          </p>
        </section>
      </article>
    </div>
  );
}
