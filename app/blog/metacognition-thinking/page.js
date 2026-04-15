import Link from 'next/link';
import { ArrowLeft, Search, Eye, Compass, MessageSquare } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function MetacognitionPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#b14aed', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Search size={16} /> Cognition
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(24px + 2vw)', lineHeight: 1.2, marginBottom: 24 }}>
            Metacognition: Teaching Kids to <span>Think</span> About Their Thinking
          </h1>
          <p className="hero-desc" style={{ fontSize: 18, color: '#aaa', maxWidth: '100%' }}>
            Have you ever been reading a book and suddenly realized you've been "reading" for five minutes but have no idea what just happened? Your eyes were moving, but your brain was elsewhere. Let's talk about the pilot of your mind.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100%', height: 400, position: 'relative' }}>
             <BlogArt type="metacognition-thinking" />
          </div>
        </figure>

        <section className="blog-content">
          <p>
            Metacognition is literally defined as "knowing about knowing." It is the ability to monitor and regulate your own cognitive processes. For a child, this is the difference between blindly trying to solve a puzzle and stopping to ask: <em>"Is this strategy working? What should I do differently?"</em>
          </p>

          <h2>The Internal Auditor</h2>
          <p>
            Metacognition and self-regulation are often discussed together because both are about
            noticing what you are doing, checking whether it is working, and adjusting when it is
            not. Children who build that habit tend to pay more attention to the <em>process</em>,
            not just the <em>outcome</em>.
          </p>

          <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(177, 74, 237, 0.03)', border: '1px solid rgba(177, 74, 237, 0.1)', margin: '40px 0' }}>
            <h3 style={{ color: '#b14aed', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Compass size={20} /> Metacognitive Strategies
            </h3>
            <p style={{ color: '#eee', marginBottom: 0 }}>
              <strong>1. Think-Alouds:</strong> Model your own internal monologue when solving a problem: "I'm looking at this grid and I see three yellows... that tells me my current pattern might be reversed."<br/><br/>
              <strong>2. Reflective Check-ins:</strong> Encourage kids to pause mid-task. Ask them: "Why did you choose that path? What's the plan for next move?"
            </p>
          </div>

          <h2>From Game to Life</h2>
          <p>
            Games with immediate feedback, like WordVibe, are useful little labs for this kind of
            reflection. When a player sees a gray tile, they have to reconsider the last guess and
            decide what to try next. That pause-and-adjust rhythm is the part worth noticing.
          </p>
        </section>
      </article>
    </div>
  );
}
