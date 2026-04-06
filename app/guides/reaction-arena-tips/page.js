'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ReactionArenaGuide() {
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
            <span style={{ fontSize: 36 }}>⚡</span>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expert Guide</span>
            </div>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 32, marginBottom: 12 }}>
            The Science of <span style={{ color: '#00d4ff' }}>Reaction Speed</span>
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
            In the arena of millisecond competition, the difference between a &quot;Casual" and "God Tier" reaction time is less than the blink of an eye. <strong>Reaction Arena</strong> is more than just a tap game; it is a test of your central nervous system&apos;s ability to process visual information and trigger a motor response at maximum speed.
          </p>
          <p style={{ marginBottom: 20 }}>
            While the average human reaction time is around 250 milliseconds, the top 1% of players on VIBEMENOW consistently achieve sub-150ms scores. How do they do it? Is it pure genetics, or can you train your way to the top? In this guide, we break down the neuroscience of speed, the hardware factors, and the daily training rituals of expert players.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>⏱️ 1. Understanding the Neural Pathway</h2>
          <p style={{ marginBottom: 20 }}>
            When the screen changes colour in Reaction Arena, a remarkable chain of events occurs inside your body. Light enters your eye and hits the retina. Photoreceptor cells convert this light into electrical signals that travel through the optic nerve to the visual cortex at the back of your brain. Your brain identifies the &quot;Go" signal, then sends a command down the motor cortex, through your spinal cord, along peripheral nerves, and finally to the muscles in your finger.
          </p>
          <p style={{ marginBottom: 20 }}>
            This entire pathway—from photon hitting retina to finger pressing screen—takes approximately 150–300ms in most humans. Each stage introduces a tiny delay. Your goal as a player is to minimise every controllable delay in this chain.
          </p>
          <div style={{
            padding: 24, borderRadius: 16,
            background: 'rgba(0, 212, 255, 0.05)',
            border: '1px solid rgba(0, 212, 255, 0.15)',
            marginBottom: 20
          }}>
            <p style={{ fontWeight: 700, color: '#00d4ff', marginBottom: 8, fontSize: 14 }}>💡 Pro Secret: Active Anticipation</p>
            <p style={{ fontSize: 14 }}>
              Don&apos;t wait for your brain to consciously recognise &quot;the colour changed." Instead, focus on detecting <em>any change at all</em>. The human brain processes general &quot;change detection" approximately 30ms faster than specific colour identification. This single technique can shave critical milliseconds off your score.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🖥️ 2. Hardware and Environment Optimisation</h2>
          <p style={{ marginBottom: 16 }}>
            In 2026, display technology is incredible, but input lag still exists. To achieve the best possible scores, consider these hardware factors:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
            <li style={{ marginBottom: 10 }}><strong>Screen Refresh Rate:</strong> Ensure your device runs at 120Hz or higher. At 60Hz, each frame lasts ~16.6ms, meaning the colour change could be invisible for up to 16ms. At 120Hz, that drops to ~8.3ms. At 240Hz, just ~4.2ms.</li>
            <li style={{ marginBottom: 10 }}><strong>Touch vs. Click:</strong> High-end gaming mice often have lower latency than capacitive touchscreens. If you are on a phone, use a firm, direct tap with a pre-positioned finger rather than a swipe.</li>
            <li style={{ marginBottom: 10 }}><strong>Brightness & Contrast:</strong> A brighter screen makes colour transitions more visually &quot;loud," allowing faster detection. Play in a dimmer room so the screen transition stands out.</li>
            <li style={{ marginBottom: 10 }}><strong>Focus Mode:</strong> Disable background notifications and close other tabs. Even a tiny frame drop or popup can add latency and ruin a perfect round.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🧠 3. Training Your Reflexes</h2>
          <p style={{ marginBottom: 20 }}>
            Reflexes are trainable, much like muscles. Regular play in our &quot;Series of 5" mode builds and reinforces the neural pathways that make reactions more automatic. We recommend three 5-round sessions per day—morning, afternoon, and evening—to account for natural circadian rhythm shifts in cognitive speed.
          </p>
          <p style={{ marginBottom: 20 }}>
            Physiological factors also play a significant role. Research from sports science shows that even mild dehydration (as little as 2% body weight loss) can slow reaction times by up to 10%. That is the difference between a 200ms and a 220ms score. Caffeine, taken in moderation (100–200mg), has been shown to improve reaction times by 5–10% in clinical studies.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>📊 4. Benchmarks and What They Mean</h2>
          <p style={{ marginBottom: 16 }}>
            Here is how VIBEMENOW classifies your reaction speed:
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            marginBottom: 20
          }}>
            {[
              { label: '> 300ms', rank: 'Casual Mode', color: '#888' },
              { label: '200–300ms', rank: 'Average Human', color: '#00ff94' },
              { label: '150–200ms', rank: 'Sharp Reflexes', color: '#00d4ff' },
              { label: '< 150ms', rank: 'God Tier', color: '#ff2d78' },
            ].map((tier, i) => (
              <div key={i} style={{
                padding: '16px 20px', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${tier.color}33`
              }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: tier.color }}>{tier.rank}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 4 }}>{tier.label}</div>
              </div>
            ))}
          </div>
          <p style={{ marginBottom: 20 }}>
            According to human physiology research, the absolute floor of human reaction time is approximately 100ms. Anything reported below this is typically the result of prediction (anticipating the change rather than reacting to it) rather than pure reflex.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🏆 Ready to Compete?</h2>
          <p style={{ marginBottom: 24 }}>
            Theory only goes so far. The only way to truly master the arena is through practice. Challenge your friends to a 5-round match and see who has the fastest reflexes in your circle. Your personal best is waiting to be broken.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/reaction-arena">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                ⚡ Enter the Reaction Arena
              </button>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 40, color: '#555', fontSize: 12 }}>
        <p>© 2026 VIBEMENOW (vibemenow.uk). Authored by the VIBEMENOW Editorial Team.</p>
      </div>
    </div>
  );
}
