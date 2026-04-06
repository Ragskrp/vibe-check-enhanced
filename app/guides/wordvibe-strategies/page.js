'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function WordVibeGuide() {
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
            <span style={{ fontSize: 36 }}>🔤</span>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expert Guide</span>
            </div>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 32, marginBottom: 12 }}>
            WordVibe Mastery: <span style={{ color: '#00d4ff' }}>Winning Strategies</span>
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555' }}>
            <span>By the VIBEMENOW Editorial Team</span>
            <span>•</span>
            <span>March 2026</span>
            <span>•</span>
            <span>12 Min Read</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ color: '#ccc', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 20 }}>
            In the 2026 iteration of the daily 5-letter word game, <strong>WordVibe</strong> has become a daily ritual for millions. But for the serious player, it is more than just a lucky guess. Winning consistently — and under the coveted 3-guess mark — requires a combination of statistical analysis, linguistic intuition, and a focused strategy that separates amateurs from experts.
          </p>
          <p style={{ marginBottom: 20 }}>
            This guide will deconstruct the mathematics of the game, providing you with a roadmap to dominate the VIBEMENOW leaderboards every single day.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🎯 1. The Power of Starter Words</h2>
          <p style={{ marginBottom: 20 }}>
            The most common mistake beginners make is choosing a word like &quot;QUEUE" or "FUZZY" to start. While these are fun, they are statistically inefficient. A perfect starter word should contain the <strong>highest-frequency vowels and consonants</strong> in the English language.
          </p>
          <div style={{
            padding: 24, borderRadius: 16,
            background: 'rgba(0, 212, 255, 0.05)',
            border: '1px solid rgba(0, 212, 255, 0.15)',
            marginBottom: 20
          }}>
            <p style={{ fontWeight: 700, color: '#00d4ff', marginBottom: 8, fontSize: 14 }}>💡 Statistical Elite Starters</p>
            <p style={{ fontSize: 14 }}>
              Try &quot;ADIEU," "ARISE," "STARE," or "CRANE." These words cover the most common English letters (A, E, I, S, R, T, N, C). Starting with one of these gives you a statistically optimal chance of landing green or yellow tiles on the first turn, because these letters appear in over 60% of all valid 5-letter English words.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>📈 2. The Narrowing Down Technique</h2>
          <p style={{ marginBottom: 20 }}>
            Once you have had your first turn, the &quot;Narrowing Down" method begins. If you started with "ARISE" and only the &apos;R' and 'E' turned yellow, your second guess should not necessarily re-use those letters in random new positions. Instead, consider a more strategic approach.
          </p>
          <p style={{ marginBottom: 20 }}>
            <strong>The Sacrifice Turn:</strong> Sometimes, on turn two, it is better to enter a word that uses entirely <em>new</em> letters to eliminate as many possibilities as possible. For example, if &quot;ARISE" failed, try "CLOUD" or "NYMPH" as your second word. This sweeps through additional common consonants and the remaining vowels (O, U), dramatically narrowing the solution space.
          </p>
          <p style={{ marginBottom: 20 }}>
            Think of it this way: with two well-chosen &quot;probe" words, you can test 10 unique letters. The English alphabet has 26 letters, so after two turns you have verified nearly 40% of the alphabet. At this point, the remaining possibilities are often obvious.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🛡️ 3. Recognising Patterns and Avoiding Traps</h2>
          <p style={{ marginBottom: 20 }}>
            English words often follow clusters — common letter combinations that share the same ending. If your word ends in &quot;IGHT," you are in a cluster: NIGHT, FIGHT, RIGHT, MIGHT, LIGHT, SIGHT, TIGHT. Blindly guessing through this cluster is a recipe for a 6-attempt failure.
          </p>
          <p style={{ marginBottom: 20 }}>
            <strong>The Cluster Escape:</strong> When trapped in a pattern cluster, use a sacrificial word that tests multiple starting letters simultaneously. If you are stuck on _IGHT, enter &quot;FILMS" to simultaneously test whether the answer starts with F, M, L, or S. This single move can resolve a 6-option cluster in one turn.
          </p>
          <p style={{ marginBottom: 20 }}>
            Similarly, beware of &quot;double letter" traps. Words like "HAPPY," "SPEED," or "FLOOD" are uncommon but devastating when they appear. If after three turns nothing is fitting, consider that a letter might appear twice.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>⭐ 4. Daily Vibe Rituals</h2>
          <p style={{ marginBottom: 20 }}>
            WordVibe updates every 24 hours with a new secret word. Because the word of the day is often themed around current global events, seasons, or cultural moments, keeping a pulse on the cultural zeitgeist can give you an edge. Is it a holiday? Is there a major sporting event? Our puzzle curators often nod to the world around us.
          </p>
          <p style={{ marginBottom: 20 }}>
            We recommend playing at the same time each day to build a consistent cognitive warm-up routine. Many top players report that their best scores come in the morning, when the mind is fresh and unencumbered by the day&apos;s decisions.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>🏆 Prove Your Mastery</h2>
          <p style={{ marginBottom: 24 }}>
            You have got the theory. Now it is time for the application. Head over to WordVibe and take today&apos;s challenge. Can you get it in under 3 tries?
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/wordvibe">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                🔤 Guess Today&apos;s Word
              </button>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 40, color: '#555', fontSize: 12 }}>
        <p>© 2026 VIBEMENOW (vibemenow.uk). Compiled by competitive word-game experts.</p>
      </div>
    </div>
  );
}
