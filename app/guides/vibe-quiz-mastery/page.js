'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function VibeQuizGuide() {
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
            <span style={{ fontSize: 36 }}>✨</span>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#ff2d78', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expert Guide</span>
            </div>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 32, marginBottom: 12 }}>
            The Ultimate Guide to <span style={{ color: '#ff2d78' }}>Personality Vibes</span>
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555' }}>
            <span>By the VIBEMENOW Editorial Team</span>
            <span>•</span>
            <span>March 2026</span>
            <span>•</span>
            <span>8 Min Read</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ color: '#ccc', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 20 }}>
            In the rapidly evolving digital landscape of 2026, understanding your &quot;digital persona" has become more than just a pastime—it is a form of social currency. The <strong>Vibe Quiz</strong> on VIBEMENOW is not a series of random questions; it is a carefully calibrated instrument designed to map your core aesthetic and behavioural patterns into recognisable archetypes.
          </p>
          <p style={{ marginBottom: 20 }}>
            Whether you are a &quot;Golden Vibe" or a "Minimalist Soul," these archetypes help us communicate our internal states to a world that moves faster than ever. In this guide, we will explore the science of vibes, how the quiz evaluates your choices, and how you can use your results to optimise your digital life.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🎯 1. The Science of Aesthetic Choice</h2>
          <p style={{ marginBottom: 20 }}>
            Every click you make during the Vibe Quiz serves as a data point. When you choose a &quot;Cosy Bedroom" over a "Space Station," you are not just picking a picture; you are signalling a preference for comfort, stability, and organic textures over novelty, exploration, and clinical environments.
          </p>
          <div style={{
            padding: 24, borderRadius: 16,
            background: 'rgba(255, 45, 120, 0.05)',
            border: '1px solid rgba(255, 45, 120, 0.15)',
            marginBottom: 20
          }}>
            <p style={{ fontWeight: 700, color: '#ff2d78', marginBottom: 8, fontSize: 14 }}>💡 Expert Tip</p>
            <p style={{ fontSize: 14 }}>
              To get the most accurate result, don&apos;t overthink it. Your first instinct is usually the most honest representation of your &quot;unfiltered vibe." Analysis bypasses your core aesthetic and taps into social conditioning.
            </p>
          </div>
          <p style={{ marginBottom: 20 }}>
            Our 2026 engine uses a weighted scoring system across eight dimensions: Nostalgia, Futurism, Organicism, Minimalism, Complexity, Warmth, Professionalism, and Chill. Each answer carries a hidden weight that shifts your profile toward one of our core archetypes.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🛡️ 2. Breaking Down the Archetypes</h2>
          <p style={{ marginBottom: 16 }}>
            With our latest update, we have expanded the result set to include eight distinct vibe profiles. Understanding these is key to interpreting your results:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#ffe600' }}>Golden Vibe:</strong> The classic optimist. You prefer warmth, sunlight, and retro-modern fusions.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#00d4ff' }}>Cyber Vibe:</strong> High-tech meets night-life. You thrive in the digital glow and value efficiency and neon aesthetics.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#00ff94' }}>Nature Vibe:</strong> The grounded soul. You find peace in waterfalls, forests, and organic textures.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#f0f0f0' }}>Minimal Vibe:</strong> Clarity is your superpower. You believe in &quot;less is more" and value clean lines and open spaces.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#ff6b35' }}>Vintage Vibe:</strong> A romantic at heart. You feel most at home in the 70s, 80s, or 90s, valuing history and soul over modern polish.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>📈 3. Why Vibes Matter in 2026</h2>
          <p style={{ marginBottom: 20 }}>
            As AI continues to personalise every corner of our internet, knowing your own &quot;vibe profile" allows you to curate your experience more effectively. Users who know they have a "Minimal Vibe" often find more success on productivity platforms that offer "Zen modes," while those with a "Cyber Vibe" excel in high-energy creative spaces.
          </p>
          <p style={{ marginBottom: 20 }}>
            Furthermore, the Vibe Quiz serves as a team-building tool. Sharing results among coworkers or friends can bridge the communication gap, helping everyone understand the preferred &quot;frequency" of their social circles.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🔗 Share Your Vibe</h2>
          <p style={{ marginBottom: 24 }}>
            Once you have completed the quiz and read through your profile, do not keep it a secret. Use our instant-share tools to post your profile to your preferred social platform. After all, a vibe is not real until it is shared.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/vibe-quiz">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                ✨ Take the Vibe Quiz Now
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
