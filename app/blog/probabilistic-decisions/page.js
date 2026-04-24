'use client';

import Link from 'next/link';
import { ArrowLeft, Dice3, Sparkles, Brain, Zap, Target, History, Search, Scale, BarChart, TrendingUp, AlertTriangle, GitBranch, Shield, Coins } from 'lucide-react';
import BlogArt from '@/app/blog/components/BlogArt';

export default function ProbabilityPage() {
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
            <Dice3 size={16} /> Decision Science
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2.5vw)', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
            Thinking in Bets: The Science of <span>Probabilistic</span> Decisions
          </h1>
          <p className="hero-desc" style={{ fontSize: 22, color: '#aaa', maxWidth: '100%', lineHeight: 1.6, fontWeight: 300 }}>
            Most of us treat decisions as 'Right' or 'Wrong.' But the world is governed by probability, not certainty. Learn how to think like a Bayesian and master the logic of uncertainty.
          </p>
        </header>

        <figure style={{ marginBottom: 64, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: 500, position: 'relative' }}>
             <BlogArt type="probabilistic-decisions" />
          </div>
          <figcaption style={{ padding: '24px 32px', fontSize: 15, color: '#888', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)' }}>
            <strong>The Weighted Outcome:</strong> Decision-making is a process of balancing potential risks against expected rewards in a fluctuating landscape of data.
          </figcaption>
        </figure>

        <section className="blog-content" style={{ fontSize: 19, lineHeight: 1.9, color: '#ececec', fontWeight: 400 }}>
          <p>
            When you decide to cross a busy street, you aren't 100% certain that you won't be hit by a car. You are making a probabilistic bet that the risk is low enough to justify the reward of reaching the other side. This is <strong>Probabilistic Thinking</strong>. While it feels natural in physical tasks, we often abandon it when faced with complex life choices (like careers, investments, or relationships), opting instead for a binary "Yes/No" or "Good/Bad" mindset that leads to brittle, sub-optimal outcomes.
          </p>
          <p>
            In an increasingly complex world, the ability to "think in bets" is the ultimate competitive advantage. It is the logic used by professional poker players, hedge fund managers, and machine learning algorithms to navigate the fog of uncertainty. 
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>I. Risk vs. Uncertainty: The Knightian Distinction</h2>
          <p>
            Before we can make better decisions, we must define the landscape. In 1921, economist Frank Knight made a crucial distinction that still governs decision science today:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Risk:</strong> Situations where the outcome is unknown, but the <em>odds</em> are known. (e.g., A roulette wheel. You don't know the next number, but you know there's a 1-in-37 chance of it hitting a specific slot).</li>
            <li style={{ marginBottom: 16 }}><strong>Uncertainty:</strong> Situations where both the outcome <em>and</em> the odds are unknown. (e.g., Starting a new business, predicting a global pandemic).</li>
          </ul>
          <p>
            Most of our educational systems train us to solve problems of "Risk" using rigid formulas. However, real life is dominated by "Uncertainty." Navigating uncertainty requires a flexible, updating mindset—the hallmark of Bayesian reasoning.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>II. Bayes’ Theorem: The Logic of Updating Your Mind</h2>
          <p>
            At the heart of probabilistic thinking is <strong>Bayes’ Theorem</strong>. Named after the 18th-century statistician Thomas Bayes, it is a mathematical formula for updating the probability of a hypothesis as more evidence becomes available. 
          </p>
          <p>
            A "Bayesian" thinker doesn't start with a fixed belief. They start with a <strong>Prior</strong> (an initial estimate based on existing knowledge) and then use <strong>New Data</strong> to update that estimate to a <strong>Posterior</strong>. If you believe your friend is usually punctual (Prior), but they show up 30 minutes late three times in a row (New Data), a Bayesian mind doesn't just get annoyed; it recalculates the probability that the friend will be on time for the next meeting. 
          </p>
          <p>
            The failure to update our priors in the face of new evidence is the root of many human errors, from persistent superstitions to failed corporate strategies and sunk-cost fallacies.
          </p>

          <div style={{ margin: '56px 0', padding: '40px', borderRadius: 32, background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
            <h3 style={{ color: '#00d4ff', fontSize: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Scale size={24} /> "Resulting" (Annie Duke)
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              Professional poker champion Annie Duke coined the term <strong>"Resulting"</strong>. This is the human tendency to judge the quality of a decision purely by its outcome. If you drive home drunk and arrive safely, the outcome is "good," but the decision was probabilistically terrible. If you invest in a company with a 90% chance of success and it fails (the 10% happens), the outcome is "bad," but the decision was excellent. To master probability, you must divorce the quality of the process from the variance of the outcome.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>III. System 1 vs. System 2: Kahneman's Framework</h2>
          <p>
            Nobel laureate Daniel Kahneman's work, <em>Thinking, Fast and Slow</em>, explains why humans are naturally bad at statistics. We operate using two systems:
          </p>
          <p>
            - **System 1 (Fast):** Intuitive, automatic, emotional. Excellent for avoiding predators in the savannah; terrible at calculating compound interest or assessing global risks.
            <br />- **System 2 (Slow):** Deliberate, logical, effortful. This is where mathematical reasoning lives, but it is metabolically expensive and slow to engage.
          </p>
          <p>
            Because System 1 is always "on," it uses heuristics (mental shortcuts) that lead to profound errors in probability:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Availability Heuristic:</strong> We judge the probability of an event based on how easily we can remember an example. We fear shark attacks (widely reported and vivid) more than heart disease (less dramatic but statistically lethal).</li>
            <li style={{ marginBottom: 16 }}><strong>Base Rate Fallacy:</strong> We focus on specific information and ignore the underlying statistical reality. If you meet a quiet, book-loving person, System 1 assumes they are a librarian rather than a salesperson, ignoring the "Base Rate" that there are vastly more salespeople in the workforce than librarians.</li>
            <li style={{ marginBottom: 16 }}><strong>The Gambler's Fallacy:</strong> The belief that independent events are affected by previous events. If a coin flips heads 5 times in a row, System 1 screams that "tails is due." System 2 knows the odds are still exactly 50/50.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>IV. Prospect Theory: The Pain of Loss</h2>
          <p>
            Kahneman and Tversky revolutionized economics by proving humans are not "rational actors." We suffer from <strong>Loss Aversion</strong>. The emotional pain of losing $100 is roughly twice as intense as the joy of winning $100.
          </p>
          <p>
            If offered a coin flip: "Heads you win $120, Tails you lose $100," a computer would take that bet infinite times (it has a positive <strong>Expected Value</strong> of +$10). But most humans refuse. Our biological programming makes us overly cautious in areas requiring calculated risk (like career changes or investments) and dangerously reckless when trying to "chase losses" to avoid the psychological pain of accepting defeat.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, margin: '56px 0' }}>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <TrendingUp size={24} color="#00ff94" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Expected Value (EV)</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The average outcome if you were to repeat a decision thousands of times. EV = (Probability of Win * Payout) - (Probability of Loss * Cost).</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <GitBranch size={24} color="#00d4ff" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Law of Large Numbers</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The principle that the more times a probabilistic event occurs, the closer the average results will approach the Expected Value.</p>
             </div>
             <div style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <BarChart size={24} color="#ff2d78" style={{ marginBottom: 16 }} />
                <h4 style={{ color: '#fff', marginBottom: 12 }}>Variance</h4>
                <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>The 'swing' between actual outcomes. High variance means you can make perfect decisions but still lose frequently in the short term.</p>
             </div>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>V. Neuroscience: The vmPFC and the Amygdala</h2>
          <p>
            fMRI research has identified a tug-of-war in the brain during probabilistic decisions. The <strong>Ventromedial Prefrontal Cortex (vmPFC)</strong> calculates the logical "Expected Value," while the <strong>Amygdala</strong> processes the emotional "Fear of Loss." 
          </p>
          <p>
            Under acute stress or fatigue, the Amygdala overrides the vmPFC. This is why "tilt" occurs in gaming and investing—when faced with a string of bad variance, the emotional brain hijacks the system, leading to irrational, non-probabilistic decisions. By playing games that require consistent statistical reasoning under light pressure, we can strengthen the neural pathways between these regions, improving our <strong>Risk EQ</strong>.
          </p>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>VI. How to Implement "Thinking in Bets"</h2>
          <p>
            You don't need a PhD in statistics to improve your decision-making. Here are three actionable strategies:
          </p>
          <ol style={{ paddingLeft: 24, marginBottom: 32 }}>
            <li style={{ marginBottom: 16 }}><strong>Express Confidence as a Percentage:</strong> Ban the words "Always," "Never," and "Definitely" from your vocabulary. Instead of saying "That project will fail," say "I believe there is an 80% chance that project will fail." This immediately shifts your brain from binary (System 1) to probabilistic (System 2).</li>
            <li style={{ marginBottom: 16 }}><strong>The Pre-Mortem:</strong> Before committing to a major decision, imagine you are one year in the future and the decision was a disaster. Ask: <em>"What went wrong?"</em> This forces you to identify hidden risks and assign probabilities to them, counteracting optimism bias.</li>
            <li style={{ marginBottom: 16 }}><strong>Focus on the Process, Not the Result:</strong> In VIBEMENOW's strategy games, a player might make the statistically perfect move and still lose to a lucky draw by the opponent. We design our feedback loops to reward the <em>process</em> (the high EV decision) rather than the <em>variance</em> (the outcome), training the brain to withstand short-term bad luck.</li>
          </ol>

          <div style={{ padding: '56px', borderRadius: 40, background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(0, 255, 148, 0.08))', border: '1px solid rgba(255,255,255,0.1)', margin: '80px 0' }}>
            <h3 style={{ fontSize: 28, color: '#fff', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
               <Brain size={32} color="#00d4ff" /> Probability in the Algorithmic Age
            </h3>
            <p style={{ fontSize: 18, color: '#eee', lineHeight: 1.7, marginBottom: 0 }}>
              We now live in a world governed by machine learning algorithms that "think" entirely in Bayesian probabilities. From the movies Netflix suggests, to the routing of your Uber, to the interest rate on your mortgage—your life is being navigated by mathematical models. By learning to think probabilistically yourself, you aren't just getting better at games or investing; you are learning to read the source code of the modern world.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 36, marginTop: 64, marginBottom: 32, letterSpacing: '-0.01em' }}>VII. Conclusion: Embracing the Fog</h2>
          <p>
            Certainty is a biological comfort, but it is a logical illusion. The most successful people in history aren't those who were "right" every time, but those who understood the odds, managed their bankroll (resources), and placed their bets when the Expected Value was positive. 
          </p>
          <p>
            By moving from a binary mindset to a probabilistic one, you stop being a victim of chance and start becoming an architect of your own variance. Life isn't a chess match with perfect information; it's a poker game. Play your hand wisely.
          </p>
        </section>

        <footer style={{ marginTop: 80, padding: 64, borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #00d4ff, #00ff94, #ffe600)' }} />
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Master the Odds</h3>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Our strategy games are built to challenge your probabilistic thinking and help you overcome loss aversion through engaging, repetitive practice.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '16px 48px', borderRadius: 12, background: '#00d4ff', color: '#000', fontWeight: 700, fontSize: 16, transition: 'all 0.2s' }}>
                Play Strategy Games
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
