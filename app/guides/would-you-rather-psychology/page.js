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
            Why do we find it so compelling to choose between living without a sense of taste or
            living without a sense of smell? On the surface, &quot;Would You Rather&quot; seems like a simple
            playground game. In practice, it works because it asks players to compare values,
            imagine outcomes, and commit to one side quickly.
          </p>
          <p style={{ marginBottom: 20 }}>
            In digital social spaces, these impossible choices work well because they create instant
            conversation. When you play <strong>Would U Rather</strong> on VIBEMENOW, the interesting
            part is usually not the &quot;correct&quot; answer. It is the reasoning people give for picking
            one tradeoff over another.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🧠 1. The Burden of Counterfactual Thinking</h2>
          <p style={{ marginBottom: 20 }}>
            When presented with two equally daunting or equally exciting options, people usually
            start running small thought experiments. You are not just reading text; you are
            imagining what each option would feel like and which downside seems easier to live with.
          </p>
          <div style={{
            padding: 24, borderRadius: 16,
            background: 'rgba(177, 74, 237, 0.05)',
            border: '1px solid rgba(177, 74, 237, 0.15)',
            marginBottom: 20
          }}>
            <p style={{ fontWeight: 700, color: '#b14aed', marginBottom: 8, fontSize: 14 }}>💡 Psychological Insight</p>
            <p style={{ fontSize: 14 }}>
              The most memorable prompts are usually the ones that make players defend a value,
              not just a preference. That is why identity-based or value-based choices often
              produce stronger debate than purely silly ones.
            </p>
          </div>
          <p style={{ marginBottom: 20 }}>
            That small act of choosing is what makes the format so engaging. The player wants
            closure, but the prompt is designed so neither answer feels completely comfortable.
            That tension is the game.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>📊 2. The Social Comparison Effect</h2>
          <p style={{ marginBottom: 20 }}>
            One of the strongest parts of modern &quot;Would You Rather&quot; formats is seeing how other
            people voted. When you discover that most players picked the opposite answer, the
            question becomes social instead of private.
          </p>
          <p style={{ marginBottom: 20 }}>
            That contrast is what keeps the format lively. People want to know whether they matched
            the room, surprised the room, or completely misunderstood the room.
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#b14aed' }}>The Majority Voter:</strong> Choosing with the crowd signals a desire for social harmony and shared reality. These players often value community consensus.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#b14aed' }}>The Contrarian:</strong> Choosing against the grain often signals a high degree of independent thought, or a willingness to embrace uncomfortable truths. These players often value uniqueness.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🛡️ 3. Gamifying Decision Fatigue</h2>
          <p style={{ marginBottom: 20 }}>
            In a world full of practical decisions, it is oddly refreshing to make playful ones.
            The stakes are low, but the prompts still ask the player to weigh tradeoffs.
          </p>
          <p style={{ marginBottom: 20 }}>
            By decoupling the <em>consequence</em> from the <em>choice</em>, the game gives players a
            low-pressure way to explore &quot;What if?&quot; questions. That is part of why it works so well
            in groups: people can disagree without much risk.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🎯 Challenge Your Brain</h2>
          <p style={{ marginBottom: 24 }}>
            Ready to see where your subconscious values truly lie? Head over to our Would You Rather arena and face today&apos;s curated list of impossible choices. See if you are a member of the majority or a true vibe pioneer.
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
        <p>© 2026 VIBEMENOW (vibemenow.uk). Guide notes from the site team.</p>
      </div>
    </div>
  );
}
