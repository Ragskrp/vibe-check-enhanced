import Link from 'next/link';
import { ArrowLeft, Zap, Brain, Layers, ShieldCheck } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function CognitiveLoadPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ff2d78', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Brain size={16} /> Educational Psychology
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            Cognitive Load Theory: <span>Protecting</span> the Working Memory
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            Why is it that you can remember a 10-digit phone number for a few seconds, but if I ask you what you had for lunch three Tuesdays ago, your brain draws a blank? The answer lies in the "Bucket of Thinking"—and it's smaller than you think.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, position: 'relative' }}>
             <BlogArt type="cognitive-load-mastery" />
          </div>
        </figure>

        <section className="blog-content">
          <p>
            Cognitive Load Theory (CLT) is perhaps the most important concept and "the single most important thing for teachers to know" (according to educational researcher Dylan Wiliam). It explains how our brain processes information and why children often feel "stuck" when facing complex tasks.
          </p>

          <h2>The Human Bottleneck</h2>
          <p>
            The human brain can only process a finite amount of information at once—typically between <strong>4 and 7 "chunks."</strong> This is our working memory. Once this bucket is full, any new information simply spills over and is lost forever. Learning only happens when information is successfully transferred from this tiny bucket to the vast reservoir of long-term memory.
          </p>

          <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(255, 45, 120, 0.03)', border: '1px solid rgba(255, 45, 120, 0.1)', margin: '40px 0' }}>
            <h3 style={{ color: '#ff2d78', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={20} /> How to Manage the Load
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#eee' }}>
              <li style={{ marginBottom: 8 }}><strong>Reduce Extraneous Load:</strong> Remove distractions, unnecessary graphics, or overly complex instructions that don't relate to the core task.</li>
              <li><strong>Scaffold Learning:</strong> Break complex problems into smaller, manageable parts to prevent cognitive overload.</li>
            </ul>
          </div>

          <h2>The Three Types of Load</h2>
          <p>
            1. <strong>Intrinsic Load:</strong> The inherent complexity of the material itself. (Learning quantum physics is intrinsically harder than learning the alphabet).<br/>
            2. <strong>Extraneous Load:</strong> Distractions or poor instructional design that hinders learning. This is the "static" on the radio.<br/>
            3. <strong>Germane Load:</strong> The healthy effort directed at building mental schemas for long-term retention.
          </p>

          <p>
            Successful games, like those on VIBEMENOW, focus on keeping the <em>Extraneous Load</em> low so that players can dedicate their entire working memory to solving the puzzle—the <em>Germane Load</em>.
          </p>
        </section>
      </article>
    </div>
  );
}
