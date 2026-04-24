import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, Trophy, Gamepad2 } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function GamificationPage() {
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
            <Gamepad2 size={16} /> Game Design Theory
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(28px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            Leveling Up: The Science of <span>Gamification</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', maxWidth: '100%', lineHeight: 1.6 }}>
            Why is it so hard to go to the gym, but so easy to play a video game for five hours? Explore the psychological mechanics that turn 'work' into 'play' and how to hack your own motivation.
          </p>
        </header>

        <figure style={{ marginBottom: 56, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="gamification-of-life" />
          </div>
          <figcaption style={{ padding: '20px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>
            The dopamine loop: Gamification uses points, badges, and leaderboards to trigger the brain's reward systems, transforming mundane tasks into engaging challenges.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}>
          <p>
            The year is 2012. A new app called *Zombies, Run!* is released. It doesn't just track your distance and pace; it puts you in the middle of a zombie apocalypse. As you run through your local park, the audio tells you that a pack of "shamblers" is 100 meters behind you. Your heart rate spikes. You run faster. You aren't "exercising"—you are surviving.
          </p>
          <p>
            This is <strong>Gamification</strong>. It is the application of game-design elements and game principles in non-game contexts. It is the art of making the difficult things in life as engaging as the fun things. By understanding the 8 core drives of human motivation, we can turn any "level" of life into a win.
          </p>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Yu-kai Chou: The Octalysis Framework</h2>
          <p>
            Gamification is often misunderstood as just "giving people points." But true gamification, as defined by pioneer <strong>Yu-kai Chou</strong>, is about human-focused design. His <strong>Octalysis Framework</strong> identifies 8 Core Drives that motivate us:
          </p>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Meaning:</strong> Feeling like you are part of something bigger than yourself.</li>
            <li style={{ marginBottom: 16 }}><strong>Accomplishment:</strong> The drive to make progress and overcome challenges (points, badges).</li>
            <li style={{ marginBottom: 16 }}><strong>Empowerment:</strong> The joy of creative expression and constant feedback.</li>
            <li style={{ marginBottom: 16 }}><strong>Ownership:</strong> The desire to protect and improve what you own (avatars, collections).</li>
            <li style={{ marginBottom: 16 }}><strong>Social Influence:</strong> Mentorship, competition, and envy.</li>
            <li style={{ marginBottom: 16 }}><strong>Scarcity:</strong> Wanting something simply because it's rare or time-limited.</li>
            <li style={{ marginBottom: 16 }}><strong>Unpredictability:</strong> The curiosity about what happens next (slot machines, mystery boxes).</li>
            <li style={{ marginBottom: 16 }}><strong>Avoidance:</strong> The fear of losing progress (the Duolingo streak).</li>
          </ol>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> The Progress Bar Effect
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee', fontStyle: 'italic' }}>
              Why do we feel a desperate need to finish a profile on LinkedIn when it tells us we are '85% complete'? This is the **Zeigarnik Effect** combined with the drive for Accomplishment. A visual representation of progress turns an abstract goal into a tangible task. We aren't working for the goal; we are working to close the bar.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Accomplishment vs. Unpredictability</h2>
          <p>
            Chou divides these drives into "White Hat" and "Black Hat." <strong>White Hat</strong> drives (Meaning, Accomplishment, Empowerment) make us feel good, powerful, and in control. They are great for long-term engagement. 
          </p>
          <p>
            <strong>Black Hat</strong> drives (Scarcity, Unpredictability, Avoidance) make us feel obsessed, anxious, and addicted. While they are incredibly powerful at getting people to start a task, they often lead to burnout if used alone. The "perfect" game (or life) uses a balance of both to create a sustainable "Motivational Engine."
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, margin: '56px 0' }}>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Trophy style={{ color: '#ffd700', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>The Leaderboard Paradox</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Leaderboards only work if you are near the top. If you are #1,000,000, you lose motivation. The best gamification uses 'Relative Leaderboards' (comparing you to people just above you).</p>
            </div>
            <div className="card" style={{ padding: 32, background: 'rgba(255,255,255,0.02)' }}>
              <Target style={{ color: '#ff2d78', marginBottom: 16 }} />
              <h4 style={{ marginBottom: 12, fontSize: 20 }}>Loss Aversion</h4>
              <p style={{ fontSize: 15, color: '#888', margin: 0 }}>We are twice as motivated to avoid losing $10 as we are to gain $10. Streaks (like in Snapchat or Duolingo) leverage this to ensure daily engagement.</p>
            </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>How to Gamify Your Own Life</h2>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Define Your 'Win States':</strong> What does success look like for today? Make it small and measurable. 'Writing 500 words' is better than 'Working on my book.'</li>
            <li style={{ marginBottom: 16 }}><strong>Implement a Feedback Loop:</strong> Use a physical habit tracker or an app. The simple act of 'checking a box' releases a tiny micro-dose of dopamine that reinforces the habit.</li>
            <li style={{ marginBottom: 16 }}><strong>Create 'Epic Meaning':</strong> Why are you doing this? Link your boring tasks to a larger narrative. You aren't 'coding a website'; you are 'building a digital cathedral.'</li>
            <li style={{ marginBottom: 16 }}><strong>Give Yourself 'Easter Eggs':</strong> Set small rewards for milestones. If you finish your project, you get to buy that new book or game you've wanted.</li>
          </ol>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <History size={24} /> Reality is Broken
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Game designer Jane McGonigal argues that the real world is 'broken' because it doesn't provide the clear goals, immediate feedback, and sense of community that games do. By gamifying our systems, we aren't 'tricking' ourselves; we are simply making the world more compatible with the way the human brain actually works.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>The Future of Engagement</h2>
          <p>
            As we move into an era of VR, AR, and pervasive digital systems, gamification will become the "operating system" of our lives. Education, healthcare, and finance are all being gamified to increase patient compliance, student engagement, and saving rates. The danger, of course, is "Exploitative Gamification"—using Black Hat drives to manipulate people into behavior that isn't in their best interest.
          </p>
          <p>
            The goal of VIBEMENOW is the opposite: <strong>Empowerment Gamification</strong>. We want to use the mechanics of play to help you master the mechanics of logic. 
          </p>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Target size={24} /> VIBEMENOW: Play for Mastery
            </h3>
            <p style={{ margin: 0, fontSize: 17, color: '#eee' }}>
              Our platform is built on the 'Empowerment' drive. We don't just give you badges for clicking; we give you badges for 'Deep Thinking.' We use adaptive difficulty to ensure you are always in the 'Flow Zone,' providing the perfect level of challenge to keep you leveling up your real-world cognitive skills. We want your VIBEMENOW rank to be a reflection of your mental architecture.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 32, marginTop: 56, marginBottom: 24 }}>Conclusion: Playing for Keeps</h2>
          <p>
            Life is a game. You are already playing it. The question is: are you a player, or are you a piece? By understanding the science of gamification, you can take control of your motivation, engineer your habits, and start winning at the things that actually matter. The next level is waiting—are you ready to play?
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 56, borderRadius: 32, background: 'linear-gradient(135deg, rgba(0, 255, 148, 0.05), rgba(0, 212, 255, 0.05))', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Start Your Level-Up</h3>
          <p style={{ color: '#888', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Ready to turn your cognitive training into an epic quest? Enter our high-engagement logic modules and start your journey to mental mastery.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Start Playing
            </Link>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '14px 40px' }}>
              More Game Science
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
