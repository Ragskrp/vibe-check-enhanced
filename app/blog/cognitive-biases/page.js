'use client';

import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Zap, Target, History, BookOpen, Search, Repeat, ShieldAlert, Scale, Anchor, AlertCircle, Compass, Cpu } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function CognitiveBiasesPage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/blog" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <article style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ffd700', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <ShieldAlert size={16} /> Behavioral Psychology
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2.5vw)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
            The Glitch in the Machine: Understanding <span>Cognitive Biases</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, color: '#aaa', maxWidth: '100%', lineHeight: 1.6, fontWeight: 300 }}>
            Our brains aren't perfectly logical supercomputers; they are biological survival machines built for speed, not mathematical accuracy. Explore the systematic errors that constantly cloud your judgment and learn the frameworks to see through the psychological fog.
          </p>
        </header>

        <figure style={{ marginBottom: 64, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="cognitive-biases" />
          </div>
          <figcaption style={{ padding: '24px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)' }}>
            <strong>The Warped Lens:</strong> Cognitive biases are mental shortcuts (heuristics) that the brain uses to process infinite information quickly. While useful on the prehistoric savanna, they often lead to catastrophic departures from logic in the modern world.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 19, lineHeight: 1.9, color: '#ececec', fontWeight: 400 }}>
          <p>
            Imagine you are a commercial airline pilot flying through a dense, zero-visibility storm. You look down at your highly calibrated instruments, and the artificial horizon clearly indicates that you are flying perfectly level. However, your inner ear—your "gut feeling"—screams at you that you are banking sharply to the left. 
          </p>
          <p>
            In aviation, this is known as spatial disorientation. If the pilot ignores the instruments and follows their biological "gut instinct," they will inevitably crash the plane into the ground. They must learn to ruthlessly override their own sensory perception. 
          </p>
          <p>
            This terrifying scenario is the exact reality of human thought. We walk through life believing we are entirely rational, logical, and objective beings. The sobering truth is that our brains are riddled with <strong>Cognitive Biases</strong>—invisible, systemic "glitches" that fundamentally skew our perception of reality, risk, and reason.
          </p>
          <p>
            These biases are not signs of a "broken" or "stupid" brain. Rather, they are evolutionary adaptations. They are mental shortcuts (known as <em>heuristics</em>) designed to help us make lightning-fast decisions in high-pressure, life-or-death situations. In the prehistoric world, jumping to a fast conclusion about a rustling bush kept you alive. But in the modern, statistically complex world of finance, engineering, and relationships, these ancient shortcuts often lead us into devastating errors of judgment.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>I. System 1 vs. System 2: Kahneman's Architecture</h2>
          <p>
            The pioneers of this field were Israeli psychologists <strong>Daniel Kahneman</strong> and <strong>Amos Tversky</strong>. Their groundbreaking research fundamentally destroyed the classic economic assumption that humans act as rational agents. In Kahneman's Nobel Prize-winning masterpiece, <em>Thinking, Fast and Slow</em>, he outlines the dual-process theory of the human mind:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 24 }}>
              <strong>System 1 (The Fast Brain):</strong> This is our instinctive, emotional, and automatic operating system. It operates completely below our conscious awareness. It is incredibly fast, requires almost zero energy, and handles roughly 95% of our daily choices. System 1 is what allows you to instantly read the emotion on a friend's face or instinctively brake when a car pulls out in front of you. It is also the birthplace of almost all cognitive biases.
            </li>
            <li style={{ marginBottom: 24 }}>
              <strong>System 2 (The Slow Brain):</strong> This is our deliberative, logical, and analytical operating system. It handles complex mathematics, deep philosophical reasoning, and self-control. System 2 is highly accurate but incredibly slow and metabolically expensive. Crucially, System 2 is profoundly lazy. It hates doing work. Most of the time, rather than analyzing a situation from scratch, System 2 simply "rubber-stamps" the flawed, impulsive conclusions handed to it by System 1.
            </li>
          </ul>

          <div style={{ margin: '56px 0', padding: '40px', borderRadius: 32, background: 'rgba(255, 215, 0, 0.04)', border: '1px solid rgba(255, 215, 0, 0.1)' }}>
            <h3 style={{ color: '#ffd700', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Zap size={24} /> Confirmation Bias: The Echo Chamber
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              This is the undeniable king of all cognitive errors. Confirmation bias is our hard-wired tendency to actively search for, positively interpret, and easily remember information that confirms our pre-existing beliefs, while simultaneously ignoring, aggressively scrutinizing, or forgetting information that contradicts them. It turns our minds into impenetrable echo chambers. It is the reason why presenting a political fanatic with objective, contradictory facts rarely changes their mind; instead, it triggers the 'Backfire Effect,' causing them to double down on their original, flawed belief.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>II. The Availability Heuristic: The Fear Factory</h2>
          <p>
            Consider this question: Are there more English words that start with the letter 'K' (like "kite"), or words where 'K' is the third letter (like "ask")?
          </p>
          <p>
            Almost everyone immediately guesses that there are more words starting with 'K'. Why? Because it is incredibly easy for the brain to retrieve words starting with a specific letter, but it is cognitively exhausting to retrieve words based on their third letter. The reality? There are three times as many words with 'K' as the third letter. 
          </p>
          <p>
            This is the <strong>Availability Heuristic</strong>. The brain judges the probability or frequency of an event based entirely on how <em>easily</em> it can bring a vivid example to mind. 
          </p>
          <p>
            This heuristic causes massive distortions in how we evaluate risk. Why are millions of people terrified of flying in airplanes or swimming in the ocean, yet completely comfortable texting while driving? Because plane crashes and shark attacks are vivid, dramatic, and heavily reported by the news media. They are easily "available" to our memory. Car crashes and heart disease are statistically thousands of times more lethal, but they are quiet, common, and boring. Our primitive brains fundamentally mistake "vividness" for "probability."
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '56px 0' }}>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Anchor size={24} color="#00d4ff" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Anchoring Bias</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The first piece of information you receive (the 'anchor') heavily skews all subsequent judgments. This is why a $2,000 TV looks like a 'great deal' if it's placed right next to a $10,000 TV.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Target size={24} color="#ff2d78" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Sunk Cost Fallacy</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The irrational tendency to continue an endeavor (a bad business, a toxic relationship) simply because we have already invested money, effort, or time into it. The 'Concorde Effect.'</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <AlertCircle size={24} color="#00ff94" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Survivorship Bias</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>Focusing exclusively on the people or things that 'survived' a process, while inadvertently overlooking those that failed. This leads us to draw false conclusions about the causes of success.</p>
             </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>III. The Case of the Missing Bullet Holes</h2>
          <p>
            To truly understand the danger of cognitive bias, we must look at one of the most famous examples of Survivorship Bias in military history. 
          </p>
          <p>
            During World War II, the U.g. military wanted to add armor to their bomber planes to reduce casualties. They analyzed the planes returning from bombing runs over Europe and mapped out where the bullet holes were concentrated. Most of the damage was found on the wings and the tail. The military's initial, intuitive conclusion (System 1) was obvious: "Put heavier armor on the wings and tail, because that's where the planes are getting hit."
          </p>
          <p>
            Enter Abraham Wald, a brilliant statistician. He immediately stopped them. Wald realized they were making a catastrophic cognitive error. They were only looking at the planes that had <em>survived</em> the mission. The bullet holes on the wings didn't show where the planes were vulnerable; they showed where a plane could be shot and still manage to fly home. 
          </p>
          <p>
            Wald pointed out that there were no bullet holes on the engines or the cockpit of the returning planes. Why? Because the planes that got hit in the engines didn't survive; they crashed in Germany. The military needed to put the armor exactly where the bullet holes <em>weren't</em>. Wald used System 2 to override the intuitive, biased trap of System 1, saving thousands of lives.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>IV. Fundamental Attribution Error: Us vs. Them</h2>
          <p>
            When you see a stranger cut someone off recklessly in traffic, your immediate thought is, "What an arrogant jerk!" You attribute their bad behavior directly to their core character. 
          </p>
          <p>
            But when <em>you</em> cut someone off in traffic, your thought process is entirely different. You tell yourself, "I'm not a bad person, I just have an absolute emergency and I need to get to the hospital." You attribute your own bad behavior entirely to external, situational factors.
          </p>
          <p>
            This double standard is known as the <strong>Fundamental Attribution Error</strong>. We consistently overemphasize personality flaws and underemphasize situational pressures when judging the failures of others, but we grant ourselves the exact opposite grace. This single bias is arguably the primary driver of political tribalism, workplace toxicity, and the breakdown of empathy in modern society.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>V. Strategies for 'De-Biasing' Your Thinking</h2>
          <p>
            You cannot permanently "delete" cognitive biases from your brain. They are hard-wired into our neurological hardware. However, you can build software routines (System 2 frameworks) to catch them before they do damage. 
          </p>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>The 'Pre-Mortem' Analysis:</strong> Before finalizing any major decision, imagine that you are looking back from a year in the future, and the decision was an absolute, unmitigated disaster. Now, work backward to write down all the reasons why it failed. This forces the brain to actively look for flaws, temporarily overriding the dangerous optimism bias.</li>
            <li style={{ marginBottom: 16 }}><strong>Steel-Manning:</strong> The opposite of "Straw-Manning." Don't just look for the weakest parts of your opponent's argument. Force yourself to build the most articulate, powerful, and convincing version of the argument you disagree with. If you cannot perfectly articulate the opposing view, you don't actually understand the issue well enough to have an opinion.</li>
            <li style={{ marginBottom: 16 }}><strong>The Rule of 24:</strong> If you feel a sudden surge of righteous anger or overwhelming enthusiasm, recognize that your System 1 is fully in control. Implement a hard rule: Never send an email, sign a contract, or make a public statement while in a high-emotion state. Wait 24 hours to allow the slow, rational System 2 to wake up and review the decision.</li>
            <li style={{ marginBottom: 16 }}><strong>Rely on the Instruments:</strong> Just like the pilot in the fog, you must learn to trust objective data over your "gut instinct." When your intuition clashes with a spreadsheet, a checklist, or a peer-reviewed statistic, you must assume your intuition is flawed until proven otherwise.</li>
          </ol>

          <div style={{ padding: '40px', borderRadius: 32, background: 'rgba(0, 255, 148, 0.04)', border: '1px solid rgba(0, 255, 148, 0.1)', margin: '56px 0' }}>
            <h3 style={{ color: '#00ff94', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Compass size={24} /> VIBEMENOW: The Bias Simulator
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              Our educational philosophy at VIBEMENOW is built around confronting these mental glitches. We intentionally design our logic puzzles and advanced modules to lead you into common, 'intuitive' traps. When you inevitably get the answer wrong because you relied on an Anchoring Bias or the Availability Heuristic, we provide immediate, objective feedback. By making your own mental errors painfully visible, we help you build the 'Cognitive Humility' required to think clearly. We aren't just teaching you raw facts; we are training you to spot the glitch in your own machine.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>VI. Conclusion: The Power of Doubt</h2>
          <p>
            You will never be a perfectly rational being. You are a biological organism navigating a deeply complex universe with a brain built for the Stone Age. 
          </p>
          <p>
            However, by acknowledging your own systemic flaws, you take the first vital step toward true intelligence. The goal is not to eradicate your emotions or instincts; the goal is to become a human who knows precisely when not to trust them. Start aggressively questioning your own 'certainties,' seek out the data that proves you wrong, and slowly, the fog of the mind will begin to lift.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 64, borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #ffd700, #ff2d78, #00d4ff)' }} />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Clean Your Cognitive Lens</h3>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Ready to test your immunity to cognitive bias? Challenge your intuition in our System 2 logic modules and learn to see through the glitches.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: '#ffd700', color: '#000', fontWeight: 700, fontSize: 16, transition: 'all 0.2s' }}>
                Check Your Biases
              </div>
            </Link>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                More Decision Science
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
