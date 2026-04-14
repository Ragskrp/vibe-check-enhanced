'use client';

import Link from 'next/link';
import { ChevronLeft, Clock } from 'lucide-react';

export default function HistoryOfWordGames() {
  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/blog"
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
          <ChevronLeft size={14} /> BACK TO BLOG
        </Link>
      </div>

      <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>Words</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#ff2d78',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Culture and Design
            </span>
          </div>
          <h1 className="game-title" style={{ textAlign: 'left', fontSize: 30, marginBottom: 12, lineHeight: 1.3 }}>
            How Old Word-Game Ideas Still Shape <span style={{ color: '#ff2d78' }}>WordVibe</span>
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555', flexWrap: 'wrap' }}>
            <span>By the VIBEMENOW Editorial Team</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> 6 Min Read
            </span>
            <span>•</span>
            <span>April 2026</span>
          </div>
        </div>

        <div style={{ color: '#ccc', lineHeight: 1.85, fontSize: 16 }}>
          <p style={{ marginBottom: 20, fontSize: 18, color: '#aaa', fontStyle: 'italic' }}>
            Good word games rarely feel completely new. Most of them are smart recombinations of
            older ideas: limited guesses, visible feedback, vocabulary recall, and the quiet
            satisfaction of narrowing a problem down one letter at a time.
          </p>

          <p style={{ marginBottom: 20 }}>
            That is also true of <strong>WordVibe</strong>. The game lives in a browser and uses a
            modern interface, but its core appeal comes from traditions that are much older than
            the web itself.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            Word Games Have Always Been About Constraint
          </h2>
          <p style={{ marginBottom: 20 }}>
            The common thread across crosswords, tile games, newspaper puzzles, and modern web
            formats is constraint. You do not have every letter. You do not have unlimited moves.
            You have to work inside a small ruleset and make better decisions with partial
            information.
          </p>
          <p style={{ marginBottom: 20 }}>
            That is why word games remain durable. Language itself is huge, but a puzzle turns it
            into a manageable problem. Five letters. Six tries. One clue. One grid. One board.
            That compression is what makes the challenge inviting rather than overwhelming.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            The Print Era Taught People to Love Slow Solving
          </h2>
          <p style={{ marginBottom: 20 }}>
            Newspaper crosswords and magazine puzzles helped establish the rhythm that many digital
            games still follow: stop for a few minutes, test an idea, erase, try again. Those
            formats were not exciting because they were fast. They were satisfying because they
            rewarded patience, pattern recognition, and memory.
          </p>
          <p style={{ marginBottom: 20 }}>
            Even now, a browser word game works best when it preserves some of that feeling. The
            player should sense progress, not chaos. Every guess should reduce uncertainty.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            The Tile-Game Era Added Strategy
          </h2>
          <p style={{ marginBottom: 20 }}>
            Board-based word games added another layer: efficiency. It was no longer enough to know
            a word. You also had to decide when to spend good letters, when to play safely, and how
            to leave yourself options for the next turn.
          </p>
          <p style={{ marginBottom: 20 }}>
            That strategic habit still shows up in modern guessing games. In WordVibe, players
            quickly learn that a guess is not just a guess. It is also an information-gathering
            move. A strong opening word earns value even when it is wrong, because it helps shape
            the next decision.
          </p>

          <div
            style={{
              padding: 20,
              borderRadius: 16,
              background: 'rgba(255, 45, 120, 0.05)',
              border: '1px solid rgba(255, 45, 120, 0.15)',
              margin: '24px 0',
            }}
          >
            <p style={{ margin: 0, fontSize: 14, color: '#ffc0d6' }}>
              One reason modern browser word games work so well is that they borrow the best part of
              older formats: they let the player feel clever often.
            </p>
          </div>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            The Web Changed the Pace, Not the Core Appeal
          </h2>
          <p style={{ marginBottom: 20 }}>
            Browser play removed friction. No pencil, no board, no setup, no waiting for an app
            install. That made word games easier to revisit in short bursts. It also made feedback
            more immediate. The grid can respond instantly, the keyboard can update live, and the
            player can restart without ceremony.
          </p>
          <p style={{ marginBottom: 20 }}>
            What did not change is the underlying pleasure of moving from uncertainty to clarity.
            That is the part worth preserving, and it is the part we try to keep visible in
            WordVibe.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            What We Tried to Keep in WordVibe
          </h2>
          <p style={{ marginBottom: 20 }}>
            From a site-design point of view, WordVibe is our attempt to keep the format lean. The
            rules are short. The board is readable. The player can understand what happened after
            each guess without reading a long manual. That is more important than novelty for its
            own sake.
          </p>
          <p style={{ marginBottom: 20 }}>
            We also like that word games sit comfortably beside the rest of the site. They provide a
            different tempo from reaction games or multiplayer rooms. A good games collection does
            not need every page to feel the same; it needs each page to justify its place.
          </p>

          <h2 style={{ color: '#fff', fontSize: 22, marginTop: 40, marginBottom: 16 }}>
            Why the Format Still Lasts
          </h2>
          <p style={{ marginBottom: 24 }}>
            Word games endure because language endures. People still enjoy testing recall, spotting
            patterns, and finding the exact word that fits. The interface may evolve, but the
            pleasure is recognisable across generations. That is less a trend than a design truth.
          </p>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/wordvibe">
              <button className="btn-primary" style={{ fontSize: 16 }}>
                Play WordVibe
              </button>
            </Link>
          </div>
        </div>
      </article>

      <div style={{ textAlign: 'center', marginTop: 40, color: '#555', fontSize: 12 }}>
        <p>© 2026 VIBEMENOW (vibemenow.uk). Editorial commentary from the site team.</p>
      </div>
    </div>
  );
}
