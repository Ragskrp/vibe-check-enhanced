'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function GeoGuesserGuide() {
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
            <span style={{ fontSize: 36 }}>🌍</span>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#00ff94', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expert Guide</span>
            </div>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 32, marginBottom: 12 }}>
            Geography Guesser: <span style={{ color: '#00ff94' }}>World Knowledge Guide</span>
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555' }}>
            <span>By the VIBEMENOW Editorial Team</span>
            <span>•</span>
            <span>March 2026</span>
            <span>•</span>
            <span>11 Min Read</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ color: '#ccc', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 20 }}>
            In an era of globalisation, how well do you truly know the world? VIBEMENOW's <strong>Geography Guesser</strong> challenges players to identify countries from their flags, capital cities, and geographical clues. This guide will transform you from a casual player into a geography expert by breaking down the visual patterns, historical origins, and mnemonic techniques behind world flags and territories.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🏳️ 1. The Visual Language of Flags</h2>
          <p style={{ marginBottom: 16 }}>
            World flags are not random art. They follow visual conventions rooted in history, religion, and geopolitics. Understanding these conventions gives you instant recognition advantages:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#00ff94' }}>Pan-African Colours (Red, Yellow, Green):</strong> Flags featuring combinations of red, yellow/gold, and green are overwhelmingly African nations, inspired by the Ethiopian flag — one of Africa's oldest independent states. Examples: Ghana, Mali, Senegal, Cameroon.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#00ff94' }}>Crescent & Star:</strong> A crescent moon and star is a strong indicator of a predominantly Muslim nation. Think Turkey, Pakistan, Tunisia, Algeria, and Malaysia.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#00ff94' }}>Union Jack in the Canton:</strong> Flags incorporating the British Union Jack in the corner are almost always current or former British territories: Australia, New Zealand, Fiji, and Tuvalu.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#00ff94' }}>Red, White, and Blue Tricolours:</strong> Many European and Latin American nations use these colours, but the arrangement tells the story. Vertical stripes tend to be French-influenced; horizontal stripes trend Dutch or Russian-influenced.</li>
            <li style={{ marginBottom: 10 }}><strong style={{ color: '#00ff94' }}>Nordic Cross:</strong> An asymmetric cross shifted to the left is unique to Nordic countries: Denmark, Sweden, Norway, Finland, and Iceland.</li>
          </ul>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🧠 2. Memory Techniques for 195 Countries</h2>
          <p style={{ marginBottom: 20 }}>
            Nobody expects you to memorise every flag overnight. But with the right techniques, you can quickly learn the "tricky" flags that separate beginners from experts.
          </p>
          <div style={{
            padding: 24, borderRadius: 16,
            background: 'rgba(0, 255, 148, 0.05)',
            border: '1px solid rgba(0, 255, 148, 0.15)',
            marginBottom: 20
          }}>
            <p style={{ fontWeight: 700, color: '#00ff94', marginBottom: 8, fontSize: 14 }}>💡 The "Similar Pair" Method</p>
            <p style={{ fontSize: 14 }}>
              Many flags look nearly identical. Romania and Chad share the same blue-yellow-red tricolour. Monaco and Indonesia are both red-over-white bicolours (Indonesia's is slightly different in proportions). Ireland and Côte d'Ivoire are mirror images. By studying these "twin" flags deliberately, you prevent mix-ups during speed rounds.
            </p>
          </div>
          <p style={{ marginBottom: 20 }}>
            <strong>The "Unique Feature" Method:</strong> Focus on what makes a flag <em>unlike</em> any other. Nepal is the only non-rectangular flag in the world. Switzerland and Vatican City are the only square flags. Mozambique's flag features an AK-47. Cambodia's flag has Angkor Wat. These unique features become instant identifiers that you will never forget.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🌐 3. Why Geography Games Matter in 2026</h2>
          <p style={{ marginBottom: 20 }}>
            Studies from educational researchers at the University of Colorado and the National Geographic Society confirm that gamified geography significantly improves retention compared to rote study. Players who engage with map quizzes and flag games retain 40% more country locations after 30 days compared to traditional flashcard methods.
          </p>
          <p style={{ marginBottom: 20 }}>
            Beyond academic performance, geography literacy fosters cultural empathy. Understanding where nations are, what their flags look like, and what symbols they value is the first step toward understanding their people, their histories, and their perspectives. In a connected world, this is not just an academic skill — it is a deeply human one.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🏆 Explore the World</h2>
          <p style={{ marginBottom: 24 }}>
            Put your knowledge to the test. How many flags can you identify in a single session? Head over to Geography Guesser and prove you are a true citizen of the world.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/geography-guesser">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                🌍 Play Geo Guesser
              </button>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 40, color: '#555', fontSize: 12 }}>
        <p>© 2026 VIBEMENOW (vibemenow.uk). Geography, culture, and flag expertise for the modern web citizen.</p>
      </div>
    </div>
  );
}
