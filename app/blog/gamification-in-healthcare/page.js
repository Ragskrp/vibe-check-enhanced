import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, HeartPulse, Activity } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function HealthGamificationPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00ff94', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <HeartPulse size={16} /> Digital Medicine
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Playing for Your Life: <span>Gamification in Healthcare</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            What if managing your health felt as rewarding as leveling up in a video game? Explore how game mechanics are solving the multi-billion dollar problem of patient compliance.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="gamification-in-healthcare" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            The bio-feedback loop: By providing immediate rewards and visual progress for healthy behaviors, healthcare systems can leverage the brain's dopamine pathways to improve patient outcomes.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            The greatest challenge in modern medicine isn't a lack of cures; it's a lack of <strong>Compliance</strong>. We have the medications to manage diabetes, the exercises to heal broken bones, and the data to prevent heart disease. But humans are notoriously bad at following orders. We forget to take our pills, we skip our physical therapy, and we ignore our doctors' advice.
          </p>
          <p>
            Enter <strong>Healthcare Gamification</strong>. By applying the principles of game design—feedback loops, social competition, and narrative progress—to health behaviors, we are turning patients into players. And the results are saving lives.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Compliance Problem: The Cost of Boredom</h2>
          <p>
            Non-compliance costs the healthcare industry hundreds of billions of dollars every year and leads to millions of preventable deaths. Why? Because the "reward" for health behaviors is often invisible and delayed. Taking a pill today might prevent a stroke in ten years, but the human brain is wired for <em>immediate</em> gratification.
          </p>
          <p>
            Gamification closes this gap. It provides a digital reward (a badge, a level-up, a social "like") for a physical behavior. It hacks the brain's <strong>Nucleus Accumbens</strong> to associate "boring" health tasks with the same dopamine spike we get from playing a video game.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> SuperBetter: Resilience as a Game
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              When game designer Jane McGonigal suffered a severe concussion, she found herself trapped in a cycle of depression and suicidal ideation. To save herself, she turned her recovery into a game called 'SuperBetter.' She identified 'Power-Ups' (things that made her feel better), 'Bad Guys' (triggers that made her feel worse), and 'Quests.' Clinical trials later showed that the app was as effective as traditional therapy for treating depression.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Chronic Success: Managing the Long Term</h2>
          <p>
            Chronic diseases like diabetes require 24/7 management. Apps like <em>mySugr</em> have gamified blood glucose tracking by giving users a "Tamagotchi-like" digital monster that stays healthy only if the user keeps their levels in range. 
          </p>
          <p>
            This shifts the focus from "illness management" to "gameplay." The user isn't just a patient; they are a caretaker for a digital being. This use of <strong>Ownership</strong> and <strong>Accomplishment</strong> drives significantly higher engagement than traditional paper logs ever could.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Activity style={{ color: '#00d4ff', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Surgical Mastery</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Studies have shown that surgeons who play video games for more than 3 hours a week make 37% fewer errors and are 27% faster in laparoscopic procedures. Gaming is essentially 'high-speed manual dexterity training.'</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Target style={{ color: '#ff2d78', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Rehab Through Play</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Physical therapy is often painful and repetitive. Using motion-tracking games (like 'Wii Fit' or specialized VR rehab) distracts the brain's 'Pain Centers' while ensuring the patient performs the necessary range of motion.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Social Health Network</h2>
          <p>
            Humans are social creatures. Apps like <em>Strava</em> have turned the solitary act of running into a global competition. By creating "segments" and "leaderboards," Strava leverages <strong>Social Influence</strong> and <strong>Competition</strong> to push people to run harder and more often than they would on their own. 
          </p>
          <p>
            When your peer group is active, you are more likely to be active. Gamification Scale this "social contagion" effect, creating massive communities where healthy behavior is the primary currency of status.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> The Feedback Loop
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              The concept of 'Biofeedback'—seeing your heart rate or brainwaves in real-time—is the ultimate gamification of the body. When you can 'see' the impact of a deep breath on your heart rate, you are much more likely to repeat that behavior. Digital health tools have brought this high-level science to our wristwatches.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Ethical Health: The Risks of Data</h2>
          <p>
            As with any powerful tool, healthcare gamification has its risks. "Quantified Self" obsession can lead to anxiety, and the gamification of insurance premiums could lead to discrimination against those with pre-existing conditions. We must ensure that these tools are used to <strong>empower</strong> patients, not just to <strong>monitor</strong> them.
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(255, 45, 120, 0.04)', border: '1px solid rgba(255, 45, 120, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#ff2d78', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Target size={24} /> Health at VIBEMENOW
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              We view cognitive health as the foundation of all health. Our platform uses 'Neuro-Adaptive Feedback' to ensure you are never over-stressed or under-challenged. By gamifying the 'Workout of the Mind,' we are helping to delay cognitive decline and improve mental resilience. We aren't just a site for puzzles; we are a gym for your gray matter.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: The Human OS</h2>
          <p>
            The future of medicine isn't just about better chemicals; it's about better psychology. By turning the work of health into the play of the mind, we can overcome our biological resistance to change and build a world where "taking care of yourself" is the most rewarding game you play. The doctor is in—and they have a controller.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(0, 255, 148, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Level Up Your Health</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready to give your brain a physical workout? Enter our neuro-health modules and start tracking your cognitive progress today.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Start Brain Gym
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Health Science
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
