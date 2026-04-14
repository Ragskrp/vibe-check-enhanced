import Link from 'next/link';
import { ArrowLeft, Dices, TrendingUp, AlertCircle, BarChart } from 'lucide-react';

export default function ProbabilisticDecisionsPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00bfff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Dices size={16} /> Statistics
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            Probabilistic Thinking: Navigating <span>Uncertainty</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            If I flip a coin 5 times and it comes up Heads every time, what is the chance the 6th flip is Tails? If you said "More than 50%," welcome to the Gambler’s Fallacy. Your brain is a pattern-detecting machine that sometimes sees patterns where none exist.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #0b151d, #00bfff0a)', position: 'relative' }}>
             <div style={{ textAlign: 'center', color: '#00bfff' }}>
                <TrendingUp size={64} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p style={{ fontSize: 14, fontWeight: 600 }}>[Visual: A child standing at a crossroads of many glowing paths made of dice and cards]</p>
             </div>
          </div>
        </figure>

        <section className="blog-content">
          <p>
            Our world is rarely black and white. Most decisions happen in a "gray zone" of probability. However, human brains are naturally bad at statistics. We tend to focus on recent events and ignore the "base rates."
          </p>

          <h2>The Pattern Trap</h2>
          <p>
            Children (and most adults) tend to think in direct cause-and-effect. But probability teaches us that sometimes things happen just because they <em>can</em>. Success in games of chance and strategy requires an intuitive grasp of risk and likelihood.
          </p>

          <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(0, 191, 255, 0.03)', border: '1px solid rgba(0, 191, 255, 0.1)', margin: '40px 0' }}>
            <h3 style={{ color: '#00bfff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={20} /> Cognitive Biases
            </h3>
            <p style={{ color: '#eee', marginBottom: 0 }}>
              <strong>Base Rate Neglect:</strong> Ignoring the overall likelihood in favor of specific, recent information.<br/><br/>
              <strong>Illusory Correlation:</strong> Believing two events are connected when they are actually random (like "lucky socks").
            </p>
          </div>

          <h2>Learning Through Play</h2>
          <p>
            Introducing probability through dice, spinners, and cards helps build an intuitive grasp of risk. By discussing "fairness" and prediction, children learn to distinguish between theoretical probability and actual outcomes—a core skill for life in a complex, uncertain world.
          </p>
        </section>
      </article>
    </div>
  );
}
