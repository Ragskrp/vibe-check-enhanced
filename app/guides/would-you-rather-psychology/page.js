'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function WouldYouRatherPsychologyGuide() {
  return (
    <div className="page-container animate-fade-in">
      {/* Back Link */}
      <div style={{ marginBottom: 24 }}>
        <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
          <ChevronLeft size={14} /> BACK TO GUIDES
        </Link>
      </div>

      {/* Article Card */}
      <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>😈</span>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#b14aed', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expert Guide</span>
            </div>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 32, marginBottom: 12 }}>
            The Psychology of <span style={{ color: '#b14aed' }}>Impossible Choices</span>
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555' }}>
            <span>By the VIBEMENOW Editorial Team</span>
            <span>•</span>
            <span>March 2026</span>
            <span>•</span>
            <span>10 Min Read</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ color: '#ccc', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 20 }}>
            Why do we find it so exhilarating to choose between living without a sense of taste or living without a sense of smell? On the surface, "Would You Rather" seems like a simple playground game. But in reality, it is a sophisticated cognitive exercise that forces the brain to perform complex value-weighting, loss-aversion analysis, and counterfactual thinking — all within seconds.
          </p>
          <p style={{ marginBottom: 20 }}>
            In the context of 2026's digital social spaces, these "impossible choices" serve as a mirror to our subconscious priorities. When you play <strong>Would U Rather</strong> on VIBEMENOW, you are engaging in a form of ethical and aesthetic triage that reveals more about your personality than most formal assessments.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🧠 1. The Burden of Counterfactual Thinking</h2>
          <p style={{ marginBottom: 20 }}>
            When presented with two equally daunting or equally exciting options, the brain enters a state of "counterfactual simulation." You are not just reading text; you are mentally inhabiting the world where each choice has become reality. Cognitive scientists call this "mental time travel" — your brain constructs two parallel future timelines and rapidly evaluates which one feels more tolerable.
          </p>
          <div style={{
            padding: 24, borderRadius: 16,
            background: 'rgba(177, 74, 237, 0.05)',
            border: '1px solid rgba(177, 74, 237, 0.15)',
            marginBottom: 20
          }}>
            <p style={{ fontWeight: 700, color: '#b14aed', marginBottom: 8, fontSize: 14 }}>💡 Psychological Insight</p>
            <p style={{ fontSize: 14 }}>
              Studies show that during "Would You Rather" games, people often choose the option that preserves their "core identity" — even if it is logically worse. This is why value-based choices (e.g., "Always speak the truth" vs "Never feel sad") generate the most intense debate.
            </p>
          </div>
          <p style={{ marginBottom: 20 }}>
            This simulation is what makes the game so engaging. The brain is wired to resolve ambiguity. By forcing a decision, you close a loop of uncertainty, providing a small dopamine reward upon "solving" the impossible dilemma. The game essentially hijacks your brain's natural desire for closure.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>📊 2. The Social Comparison Effect</h2>
          <p style={{ marginBottom: 20 }}>
            One of the most powerful features of modern "Would You Rather" platforms is the ability to see how others voted. This triggers what psychologists call the <strong>Social Comparison Effect</strong>. When you see that 80% of players chose the opposite of you, it creates a moment of forced self-reflection: "Am I an outlier? Or do I see something others don't?"
          </p>
          <p style={{ marginBottom: 20 }}>
            This social validation — or contradiction — is what drives the viral nature of VIBEMENOW's social games. Research by Dr. Leon Festinger's original Social Comparison Theory (1954) showed that humans have an innate drive to evaluate their own opinions by comparing them to others. The "Would You Rather" format packages this drive into an addictive, gamified experience.
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#b14aed' }}>The Majority Voter:</strong> Choosing with the crowd signals a desire for social harmony and shared reality. These players often value community consensus.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#b14aed' }}>The Contrarian:</strong> Choosing against the grain often signals a high degree of independent thought, or a willingness to embrace uncomfortable truths. These players often value uniqueness.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🛡️ 3. Gamifying Decision Fatigue</h2>
          <p style={{ marginBottom: 20 }}>
            In a world of information overload, we often suffer from "decision fatigue" — the deteriorating quality of decisions made after a long session of decision making. Engaging in low-stakes, high-imagination choices like those in our game acts as "cross-training" for your decision-making abilities.
          </p>
          <p style={{ marginBottom: 20 }}>
            By decoupling the <em>consequence</em> from the <em>choice</em>, you allow your brain to explore paths it would normally be too afraid to consider. It is a safe space for the "What if?" question. Regular play can actually improve your comfort with ambiguity — a skill that is increasingly valuable in professional and personal life.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🎯 Challenge Your Brain</h2>
          <p style={{ marginBottom: 24 }}>
            Ready to see where your subconscious values truly lie? Head over to our Would You Rather arena and face today's curated list of impossible choices. See if you are a member of the majority or a true vibe pioneer.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/would-you-rather">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                😈 Pick Your Path
              </button>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 40, color: '#555', fontSize: 12 }}>
        <p>© 2026 VIBEMENOW (vibemenow.uk). Exploring the intersection of game design and social psychology.</p>
      </div>
    </div>
  );
}
