'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function WordVibeGuide() {
  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/guides"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: '#888',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <ChevronLeft size={14} /> BACK TO GUIDES
        </Link>
      </div>

      <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>Word</span>
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#00d4ff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Player Guide
              </span>
            </div>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 32, marginBottom: 12 }}>
            How to Play <span style={{ color: '#00d4ff' }}>WordVibe</span> More Cleanly
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555', flexWrap: 'wrap' }}>
            <span>By the VIBEMENOW Editorial Team</span>
            <span>•</span>
            <span>April 2026</span>
            <span>•</span>
            <span>6 Min Read</span>
          </div>
        </div>

        <div style={{ color: '#ccc', lineHeight: 1.8, fontSize: 16 }}>
          <p style={{ marginBottom: 20 }}>
            WordVibe is simple on purpose: guess a five-letter word in six tries and use the tile
            feedback to narrow the answer down. Because the rules are compact, most improvement
            comes from better guess quality rather than from memorizing tricks.
          </p>

          <p style={{ marginBottom: 20 }}>
            This guide is not about pretending there is a secret formula. It is about playing the
            first few turns in a way that gives you cleaner information.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            1. Treat the first guess as information, not ego
          </h2>
          <p style={{ marginBottom: 20 }}>
            The best opening word is not the fanciest word you know. It is a word that tests useful
            letters and gives you options for turn two. Openers with a mix of common vowels and
            common consonants tend to be more helpful than quirky words with repeated letters.
          </p>
          <p style={{ marginBottom: 20 }}>
            In practice, that means starting with a balanced word and asking: what did I just learn?
            If you got one green and one yellow, that is progress. If you got almost nothing, that
            is still useful because you have ruled letters out.
          </p>

          <div
            style={{
              padding: 24,
              borderRadius: 16,
              background: 'rgba(0, 212, 255, 0.05)',
              border: '1px solid rgba(0, 212, 255, 0.15)',
              marginBottom: 20,
            }}
          >
            <p style={{ fontWeight: 700, color: '#00d4ff', marginBottom: 8, fontSize: 14 }}>
              Useful opener mindset
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              You do not need the perfect first guess. You need a first guess that makes the second
              guess easier.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            2. Avoid repeating weak letters too early
          </h2>
          <p style={{ marginBottom: 20 }}>
            If your first guess shows that certain letters are absent, do not casually reuse them on
            turn two. A lot of lost games happen because players keep typing words they like instead
            of words that answer the board.
          </p>
          <p style={{ marginBottom: 20 }}>
            The second guess is often strongest when it introduces fresh letters while respecting
            the clues you already have. That keeps the puzzle moving instead of circling.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            3. Use yellow tiles to test positions, not just presence
          </h2>
          <p style={{ marginBottom: 20 }}>
            A yellow tile tells you the letter belongs in the word, but not there. That makes turn
            two and turn three especially important. Try to move that letter into a plausible new
            slot while also testing something else at the same time.
          </p>
          <p style={{ marginBottom: 20 }}>
            Players sometimes waste guesses by shuffling letters around without learning anything
            new. A stronger move usually answers two questions at once: where could this letter go,
            and which untested letters are still worth checking?
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            4. Watch for repeats late, not first
          </h2>
          <p style={{ marginBottom: 20 }}>
            Repeated letters do happen, but they are usually a better late-game suspicion than an
            early-game assumption. If the board starts to feel cramped and ordinary words are no
            longer fitting, that is the moment to consider duplicates.
          </p>
          <p style={{ marginBottom: 20 }}>
            In other words, do not force a double letter on guess one. Let the board earn that
            idea.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            5. Play the board, not your habit
          </h2>
          <p style={{ marginBottom: 20 }}>
            The biggest jump in performance usually comes from staying responsive. If your usual
            opener is no longer helping, abandon it. If the clue pattern suggests a less common
            shape, follow the evidence. WordVibe rewards attention more than routine.
          </p>
          <p style={{ marginBottom: 24 }}>
            That is also what keeps the game fun. Every round should feel like a small deduction
            problem, not a script you recite from memory.
          </p>

          <div style={{ textAlign: 'center' }}>
            <Link href="/wordvibe">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                Play WordVibe
              </button>
            </Link>
          </div>
        </div>
      </article>

      <div style={{ textAlign: 'center', marginTop: 40, color: '#555', fontSize: 12 }}>
        <p>© 2026 VIBEMENOW (vibemenow.uk). Guide notes from the site team.</p>
      </div>
    </div>
  );
}
