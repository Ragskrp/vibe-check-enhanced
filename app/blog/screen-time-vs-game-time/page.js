import Link from 'next/link';
import { ArrowLeft, Smartphone, Gamepad2, Brain, Zap, Target, History, Search, Eye, Clock, ShieldCheck, Heart } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function ScreenTimePage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00d4ff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Eye size={16} /> Digital Hygiene
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Active vs. Passive: <span>Screen Time</span> vs. Game Time
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            Parents and researchers often group all 'screen time' into one category. But from a neuroscientific perspective, scrolling through a feed and playing a strategic game are two completely different worlds.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="screen-time-vs-game-time" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            The choice of engagement: Passive consumption (scrolling) drains the brain's resources, while active participation (gaming) builds them through agency and problem-solving.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            "Put down that screen!" is the modern battle cry of parents everywhere. For years, public health guidelines have focused on a simple number: the amount of hours spent in front of a glowing rectangle. However, in 2024, cognitive scientists are arguing for a much more nuanced approach. The question isn't <em>how long</em> you are looking at a screen, but <em>what you are doing</em> with it.
          </p>
          <p>
            There is a fundamental psychological and neurological difference between <strong>Passive Consumption</strong> (scrolling, watching) and <strong>Active Participation</strong> (gaming, creating, learning). One drains your mental battery, while the other can actually charge it.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Agency Gap: Why Playing is Better Than Watching</h2>
          <p>
            The biggest difference between "screen time" and "game time" is <strong>agency</strong>. When you watch a video or scroll through a social media feed, you are a passive observer. Your brain is in "receiving mode." You have no control over the outcome, and your prefrontal cortex—the part of the brain responsible for decision-making—is largely idle.
          </p>
          <p>
            When you play a game, however, you are the protagonist. Every action you take has a consequence. You are constantly making predictions, evaluating risks, and adjusting your strategy based on feedback. This is a high-agency state. Neuroimaging shows that gaming activates the <strong>ventral striatum</strong> (reward) and the <strong>dorsolateral prefrontal cortex</strong> (planning), whereas passive scrolling often leaves these regions dormant while over-stimulating the <strong>limbic system</strong> (emotion).
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> The 'Doom-Scrolling' Dopamine Trap
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              Social media feeds are designed around 'Variable Reward Schedules'—the same mechanism that makes slot machines addictive. You scroll because the *next* post might be interesting. This is low-quality dopamine. Gaming, by contrast, provides 'Competence-Based Dopamine'—the reward of overcoming a difficult challenge through skill. One leaves you feeling empty; the other leaves you feeling capable.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Displacement Hypothesis: What is Being Replaced?</h2>
          <p>
            The real danger of screen time isn't necessarily the screen itself, but the <strong>Displacement Effect</strong>. If two hours of gaming replaces two hours of mindless TV, the net effect is likely positive for your cognitive health. If it replaces two hours of sleep, exercise, or face-to-face social interaction, the effect is negative.
          </p>
          <p>
            2024 research suggests that we should stop looking at a "total limit" and start looking at a "priority list." If you've had 8 hours of sleep, 1 hour of physical activity, and 30 minutes of deep social connection, then your remaining digital time—especially if it's active and strategic—is significantly less harmful.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Clock style={{ color: '#ffd700', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Temporal Awareness</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Active gaming often requires better time management and 'resource allocation' than passive scrolling, which can lead to 'time blindness'.</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Heart style={{ color: '#ff2d78', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Social Connection</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Social media often breeds 'Upward Social Comparison' (envy), whereas multiplayer gaming fosters 'Synchronous Cooperation' (bonding).</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Blue Light and the Brain: Protecting Your Sleep</h2>
          <p>
            Regardless of whether you are scrolling or playing, the <strong>Blue Light</strong> emitted by screens is a real biological concern. It suppresses the production of <strong>melatonin</strong>, the hormone that tells your brain it's time to sleep. 
          </p>
          <p>
            A brain that is stimulated by a high-stakes strategic game at 11 PM will struggle to enter deep REM sleep. This is why "Digital Hygiene" is vital: stop all high-intensity screen use at least 60 minutes before bed. If you must use a screen, use "Night Mode" filters to shift the light spectrum toward warmer, redder tones that are less disruptive to your circadian rhythm.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The "Goldilocks Zone": How Much is Just Right?</h2>
          <p>
            In 2017, the Oxford Internet Institute conducted a study on 120,000 teenagers to find the "optimal" amount of screen time. They found a U-shaped curve:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Too Little (0 hours):</strong> Lower well-being (likely due to social exclusion).</li>
            <li style={{ marginBottom: 16 }}><strong>The Sweet Spot (1-3 hours):</strong> The highest levels of mental well-being and cognitive performance.</li>
            <li style={{ marginBottom: 16 }}><strong>Too Much (5+ hours):</strong> Declining well-being (due to the displacement of sleep and exercise).</li>
          </ul>
          <p>
            The lesson is that total abstinence is rarely the answer in a digital society. Instead, we should aim for "Strategic Moderation"—focusing on high-quality, active digital experiences within a balanced lifestyle.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <ShieldCheck size={24} /> The VIBEMENOW Commitment
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              We design our games to be 'Bite-Sized Breakthroughs'. Our goal isn't to keep you scrolling for hours. We want you to log on, solve a difficult logic puzzle, experience a burst of competence-based dopamine, and then log off to apply that sharpened mind to the rest of your day.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Practical Tips for a Better Digital Diet</h2>
          <p>
            1. <strong>Audit Your Pixels:</strong> For one day, track which screen activities make you feel energized (Active) and which make you feel drained (Passive). Focus on the former.
            <br />2. <strong>The "Rule of One":</strong> Try to limit yourself to one screen at a time. No scrolling on your phone while watching a movie. This protects your attention span from fragmentation.
            <br />3. <strong>Analog Mornings:</strong> Try to wait 30 minutes after waking up before checking any screen. This allows your brain to transition from sleep to wakefulness without a dopamine spike.
            <br />4. <strong>Gamify Your Learning:</strong> If you have to learn something boring, find a way to make it interactive or competitive. Turning passive study into active "play" increases retention and reduces fatigue.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: Toward a High-Agency Future</h2>
          <p>
            We are never going back to a world without screens. The digital landscape is our new habitat. The challenge for the 21st century is learning how to be a high-agency inhabitant of that landscape. By choosing active, strategic games over passive, addictive scrolling, you aren't just "killing time"—you are training your brain to be the master of its digital environment, rather than its victim.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(0, 255, 148, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Make Your Screen Time Count</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready for a high-agency break? Try our strategic logic games and experience the cognitive difference of active play.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Play Active Games
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Digital Science
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
