import Link from 'next/link';
import { ArrowLeft, Target, Brain, ShieldAlert, Zap, Clock, History, BookOpen, Search, UserCheck, ShieldCheck, Activity, Maximize2, Minimize2, Cpu, TrendingUp, Info, ZapOff, Lightbulb } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export const metadata = {
  title: 'Mastering Executive Function: The Brain’s Command Center | VIBEMENOW',
  description: 'Deep dive into the neurobiology of the prefrontal cortex, cognitive control, and the "CEO" of the brain. Learn to master your attention in the digital age.',
  openGraph: {
    title: 'Mastering Executive Function: The Brain’s Command Center',
    description: 'Explore the sophisticated cognitive systems that allow humans to plan, focus, and thrive.',
    type: 'article',
  }
};

export default function ExecutiveFunctionPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ff2d78', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Target size={16} /> Neurobiology of Control
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2.5vw)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
            The CEO of the Brain: Mastering <span>Executive</span> Function
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, color: '#aaa', maxWidth: '100%', lineHeight: 1.6, fontWeight: 300 }}>
            Inside your prefrontal cortex sits a "CEO" responsible for every decision you make. Learn why this system is so fragile, how it breaks in the digital age, and the science of taking back control.
          </p>
        </header>

        <figure style={{ marginBottom: 64, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="executive-function-control" />
          </div>
          <figcaption style={{ padding: '24px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)' }}>
            <strong>The Command Center:</strong> The Prefrontal Cortex acts as the Brain's CEO, coordinating working memory, impulse control, and strategic planning into coherent, goal-directed behavior.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 19, lineHeight: 1.9, color: '#ececec', fontWeight: 400 }}>
          <p>
            Have you ever sat down to work on a vital project, only to find yourself 45 minutes later reading a Wikipedia entry about the history of the stapler? This isn't just a lack of "willpower." It is a temporary failure of your <strong>Executive Function (EF)</strong>—the most sophisticated suite of cognitive tools in the human repertoire.
          </p>
          <p>
            Located primarily in the <strong>Prefrontal Cortex (PFC)</strong>, executive function acts as the "CEO" of your brain. While the rest of your brain is busy processing sensations, emotions, and basic movements, the PFC is responsible for the "high-level" work: planning for the future, inhibiting impulses, and shifting your attention between tasks. In the hierarchy of the mind, the PFC is the boss, and its efficiency determines the quality of your life.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>I. The Three Pillars of the CEO</h2>
          <p>
            Neuropsychologists generally agree that executive function is built on three core pillars. When one pillar is weak, the entire "boardroom" of the mind can collapse into chaos.
          </p>
          
          <h3 style={{ color: '#ff2d78', fontSize: 26, marginTop: 40, marginBottom: 20 }}>1. Working Memory: The Mental Whiteboard</h3>
          <p>
            This is your ability to hold information in your mind while simultaneously working with it. If you are calculating a 20% tip in your head, you are using working memory. In the PFC, this is like a small whiteboard where the CEO jots down the immediate goals. 
          </p>
          <p>
            For decades, George Miller's "The Magical Number Seven" was the standard for working memory capacity. However, modern research by Nelson Cowan suggests it's actually closer to **four chunks**. Our mental whiteboard is much smaller than we previously believed. This is why multitasking is a biological lie; you aren't doing two things at once, you are constantly erasing and re-writing your mental whiteboard, which leads to massive "residual noise" and errors.
          </p>

          <h3 style={{ color: '#ff2d78', fontSize: 26, marginTop: 40, marginBottom: 20 }}>2. Cognitive Flexibility: The Mental Pivot</h3>
          <p>
            Also known as "Set-Shifting," this is your ability to switch between different rules or tasks. When you move from answering emails to writing code, your brain has to "un-load" the social rules of communication and "load" the logical rules of syntax. 
          </p>
          <p>
            This has a <strong>Metabolic Switching Cost</strong>. Every time you switch tasks, the brain's anterior cingulate cortex (ACC) has to fire to monitor for conflict, and the PFC has to expend glucose to re-configure the neural network. Doing this too often leads to "Decision Fatigue," where the CEO becomes exhausted and starts making impulsive, low-quality choices just to clear the cognitive load.
          </p>

          <h3 style={{ color: '#ff2d78', fontSize: 26, marginTop: 40, marginBottom: 20 }}>3. Inhibitory Control: The Mental Bouncer</h3>
          <p>
            This is the "No" muscle. It's the ability to resist the urge to check your phone, to stay in your chair when you want to get up, and to suppress a habitual response in favor of a more deliberate one. The PFC's main job isn't to <em>start</em> things, but to <em>stop</em> everything else that isn't the current goal.
          </p>
          <p>
            Inhibitory control is often the first thing to fail under stress. When the body enters "Fight or Flight" mode, the PFC is effectively taken offline by cortisol, allowing the reactive amygdala to take control. This is why we often say things we regret when we are angry—our "Internal CEO" has been temporarily escorted out of the building.
          </p>

          <div style={{ margin: '56px 0', padding: '40px', borderRadius: 32, background: 'rgba(255, 45, 120, 0.04)', border: '1px solid rgba(255, 45, 120, 0.1)' }}>
            <h3 style={{ color: '#ff2d78', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <ShieldAlert size={24} /> The Dopamine Gating System
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              Why is it so hard to start a task? Neuroimaging research has highlighted the role of **Dopamine Gating** in the PFC. For the "CEO" to approve a task, the **Ventral Tegmental Area (VTA)** must signal that the reward is worth the metabolic effort. In ADHD, this gating system is "noisy," making it hard for the CEO to hear the signal of long-term goals over the loud, immediate rewards of social media or video games.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>II. "Cold" vs. "Hot" Executive Function</h2>
          <p>
            Recent cognitive science has differentiated between two types of control: <strong>Cold EF</strong> and <strong>Hot EF</strong>.
          </p>
          <p>
            <strong>Cold Executive Function</strong> involves purely logical, non-emotional tasks—like solving a physics problem or organizing a calendar. It is slow, deliberate, and occurs when the brain is in a state of low emotional arousal. 
          </p>
          <p>
            <strong>Hot Executive Function</strong> involves social or emotional situations—like resisting a piece of cake while on a diet, or staying calm during a heated argument. Hot EF is significantly harder to master because it requires the PFC to directly override the powerful, ancient signals of the limbic system. True mastery of the mind requires training both: the ability to think logically *and* the ability to remain in control of one's impulses under emotional pressure.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>III. The Developmental Trajectory: Why Teens Struggle</h2>
          <p>
            The Prefrontal Cortex is the last part of the human brain to fully mature, often not reaching its final, myelinated state until the **mid-twenties**. This creates a "Developmental Gap." 
          </p>
          <p>
            During adolescence, the emotional and reward centers (the limbic system) are fully developed and highly sensitive to social status and dopamine. However, the "CEO" (the PFC) is still under construction. This is like a car with a high-performance Ferrari engine but the brakes of a bicycle. Understanding this biological reality is vital for students and parents; poor decision-making in the teenage years isn't a character flaw—it's a temporary structural limitation of the brain's control center.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '56px 0' }}>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Cpu size={24} color="#ffd700" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Metabolic Cost</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The PFC consumes more glucose and oxygen per gram than any other part of the brain. Focus is literally expensive and requires physical rest.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <TrendingUp size={24} color="#00ff94" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>The Zeigarnik Effect</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>Unfinished tasks stay in working memory, creating 'background noise' that slows down the CEO's performance and causes anxiety.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Activity size={24} color="#ff2d78" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Stress Response</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>Cortisol temporarily 'disconnects' the PFC, leaving the emotional brain in charge. Relaxation is a prerequisite for high-level thinking.</p>
             </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>IV. ADHD and Time Blindness</h2>
          <p>
            For individuals with ADHD, the executive function system faces a unique challenge known as **Time Blindness**. The PFC is responsible for the "Internal Clock"—the ability to sense the passage of time and plan for future events. 
          </p>
          <p>
            In a neurotypical brain, a deadline two weeks away creates a small, motivating pressure. In an ADHD brain, there are only two times: **NOW** and **NOT NOW**. The deadline doesn't exist until it is "Now," which triggers a last-minute panic response. This is why externalizing time (using visual timers and clocks) is a vital "prosthetic" for a struggling executive function system.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>V. Mindfulness: The Direct Exercise for the PFC</h2>
          <p>
            If executive function is a muscle, how do we train it? The most direct evidence comes from **Mindfulness Meditation**. During meditation, your only goal is to maintain focus on your breath. Every time your mind wanders (which is a failure of inhibition and working memory), you have to notice it (ACC activation) and gently bring it back (PFC re-engagement).
          </p>
          <p>
            This process is effectively a "bicep curl" for the brain. Studies show that long-term meditators have a physically thicker prefrontal cortex and a more efficient ACC. They aren't "calmer" by nature; they have simply built a stronger "Mental CEO" that can manage their internal state with less effort.
          </p>

          <div style={{ padding: '56px', borderRadius: 40, background: 'linear-gradient(135deg, rgba(255, 45, 120, 0.08), rgba(0, 212, 255, 0.08))', border: '1px solid rgba(255,255,255,0.1)', margin: '80px 0' }}>
            <h3 style={{ fontSize: 28, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
               <ShieldCheck size={32} color="#ff2d78" /> VIBEMENOW Cognitive Sprints
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              At VIBEMENOW, we don't just give you puzzles; we give you "Inhibitory Challenges." Our games intentionally use "Distractor Cues"—visual elements that try to trick your brain into a habitual, incorrect response. By forcing you to pause and use your "Inhibitory Bouncer," we are training the PFC to remain in control even when the environment is trying to steal your focus. We are building your agency, one game at a time.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>VI. Conclusion: The Future of Human Agency</h2>
          <p>
            In a world that is fighting for your attention, your executive function is your most precious asset. It is the core of your agency—your ability to choose who you want to be and what you want to achieve. Most of the "digital economy" is designed to bypass your CEO and speak to your instincts. 
          </p>
          <p>
            By understanding the neurobiology of your control center, you can begin to protect it. You can build environments that support its limits, use tools that offload its burden, and engage in practices that strengthen its structure. You aren't just getting more productive; you are taking back the steering wheel of your life. 
          </p>
          <p>
            Take care of your CEO. Give it sleep, give it novelty, and most importantly, give it the undivided attention it needs to lead you toward your highest goals.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 64, borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #ff2d78, #00d4ff, #b14aed)' }} />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Empower Your Inner CEO</h3>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Our games are designed to push your executive functions to their limits, helping you build a stronger, more resilient prefrontal cortex through structured challenge and novelty.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: '#ff2d78', color: '#fff', fontWeight: 700, fontSize: 16, transition: 'all 0.2s' }}>
                Train Your CEO
              </div>
            </Link>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                More Brain Science
              </div>
            </Link>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p {
          margin-bottom: 28px;
        }
        .blog-content strong {
          color: #fff;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
