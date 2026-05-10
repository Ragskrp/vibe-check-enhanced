'use client';

import { useState, useEffect, useCallback } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { applyRating, getMemoryStrength, strengthToColor } from '../utils/spacedRepetitionEngine';

/**
 * FlashcardMode — full-screen flip-card experience.
 *
 * Props:
 *   cards: [{ id, front, back, hint? }]
 *   subjectId: string (for SRS persistence)
 *   topicSlug: string (for SRS persistence)
 *   accentColor: string
 *   onExit: () => void
 */
export default function FlashcardMode({ cards = [], subjectId, topicSlug, accentColor = '#00d4ff', onExit }) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rated, setRated] = useState({});   // { cardId: quality }
  const [sessionDone, setSessionDone] = useState(false);

  const card = cards[index];
  const total = cards.length;
  const completedCount = Object.keys(rated).length;

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setIsFlipped(f => !f); }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, total]);

  const handleRate = useCallback((quality) => {
    if (!card) return;
    applyRating(subjectId, topicSlug, quality);
    setRated(prev => ({ ...prev, [card.id]: quality }));
    setIsFlipped(false);
    if (index < total - 1) {
      setTimeout(() => setIndex(i => i + 1), 300);
    } else {
      setSessionDone(true);
    }
  }, [card, index, total, subjectId, topicSlug]);

  const handleNext = () => {
    if (index < total - 1) { setIndex(i => i + 1); setIsFlipped(false); }
  };
  const handlePrev = () => {
    if (index > 0) { setIndex(i => i - 1); setIsFlipped(false); }
  };

  const restart = () => {
    setIndex(0); setIsFlipped(false); setRated({}); setSessionDone(false);
  };

  if (!cards.length) {
    return (
      <div style={{ textAlign: 'center', padding: 48, color: '#666' }}>
        <Layers size={48} style={{ marginBottom: 16 }} />
        <p>No flashcards available for this topic yet.</p>
        {onExit && <button onClick={onExit} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 10, background: accentColor, color: '#000', fontWeight: 800, border: 'none', cursor: 'pointer' }}>← Back</button>}
      </div>
    );
  }

  if (sessionDone) {
    const ratingCounts = { forgot: 0, hard: 0, good: 0, easy: 0 };
    Object.values(rated).forEach(q => {
      if (q <= 1) ratingCounts.forgot++;
      else if (q === 2 || q === 3) ratingCounts.hard++;
      else if (q === 4) ratingCounts.good++;
      else ratingCounts.easy++;
    });

    return (
      <div style={{ textAlign: 'center', padding: '40px 24px', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎴</div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Session Complete!</h2>
        <p style={{ color: '#888', marginBottom: 32 }}>{total} cards reviewed</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { label: 'Forgot', count: ratingCounts.forgot, color: '#ff2d78' },
            { label: 'Hard', count: ratingCounts.hard, color: '#ff6b35' },
            { label: 'Good', count: ratingCounts.good, color: '#00d4ff' },
            { label: 'Easy', count: ratingCounts.easy, color: '#00ff94' },
          ].map(({ label, count, color }) => (
            <div key={label} style={{ padding: 16, borderRadius: 16, background: `${color}10`, border: `1px solid ${color}30` }}>
              <div style={{ fontSize: 32, fontWeight: 900, color }}>{count}</div>
              <div style={{ fontSize: 12, color: '#888', fontWeight: 700 }}>{label}</div>
            </div>
          ))}
        </div>

        {ratingCounts.forgot > 0 && (
          <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(255,45,120,0.06)', border: '1px solid rgba(255,45,120,0.15)', marginBottom: 20, fontSize: 13, color: '#ff2d78', fontWeight: 600 }}>
            📌 {ratingCounts.forgot} card{ratingCounts.forgot !== 1 ? 's' : ''} scheduled for tomorrow — the SRS will bring them back.
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={restart} style={{ padding: '12px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <RotateCcw size={16} /> Restart
          </button>
          {onExit && <button onClick={onExit} style={{ padding: '12px 24px', borderRadius: 12, background: accentColor, color: '#000', border: 'none', fontWeight: 800, cursor: 'pointer' }}>← Back to Topic</button>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 8px' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#888' }}>Card {index + 1} / {total}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: accentColor }}>{completedCount} rated</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 32, overflow: 'hidden' }}>
        <div style={{ width: `${((index) / total) * 100}%`, height: '100%', background: accentColor, transition: 'width 0.4s ease', borderRadius: 4 }} />
      </div>

      {/* Flip Card */}
      <div
        onClick={() => setIsFlipped(f => !f)}
        style={{ perspective: '1000px', cursor: 'pointer', marginBottom: 24 }}
      >
        <div style={{
          position: 'relative', minHeight: 240, transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Front */}
          <div style={{
            position: isFlipped ? 'absolute' : 'relative', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            padding: '40px 32px', borderRadius: 24, textAlign: 'center',
            background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
            border: `2px solid ${accentColor}30`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 240
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: accentColor, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>QUESTION — tap to reveal</div>
            <div style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 800, color: '#fff', lineHeight: 1.4 }}>{card.front}</div>
            {card.hint && <div style={{ marginTop: 16, fontSize: 13, color: '#666', fontStyle: 'italic' }}>💡 {card.hint}</div>}
          </div>

          {/* Back */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: '32px 32px', borderRadius: 24, textAlign: 'center',
            background: `linear-gradient(135deg, ${accentColor}12, rgba(255,255,255,0.02))`,
            border: `2px solid ${accentColor}60`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 240
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: accentColor, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>ANSWER</div>
            <div style={{ fontSize: 'clamp(16px, 3.5vw, 22px)', fontWeight: 700, color: '#fff', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{card.back}</div>
          </div>
        </div>
      </div>

      {/* Rating buttons — only show when flipped */}
      {isFlipped ? (
        <div>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginBottom: 12 }}>How well did you know this?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { label: 'Forgot', emoji: '😰', quality: 0, color: '#ff2d78' },
              { label: 'Hard', emoji: '😓', quality: 2, color: '#ff6b35' },
              { label: 'Good', emoji: '🙂', quality: 4, color: '#00d4ff' },
              { label: 'Easy', emoji: '😄', quality: 5, color: '#00ff94' },
            ].map(({ label, emoji, quality, color }) => (
              <button
                key={label}
                onClick={(e) => { e.stopPropagation(); handleRate(quality); }}
                style={{
                  padding: '12px 8px', borderRadius: 14, border: `2px solid ${color}40`,
                  background: `${color}10`, color, fontWeight: 800, fontSize: 12,
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: 20 }}>{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={handlePrev} disabled={index === 0} style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: index === 0 ? '#333' : '#888', cursor: index === 0 ? 'default' : 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChevronLeft size={16} /> Prev
          </button>
          <p style={{ fontSize: 12, color: '#555', fontWeight: 600 }}>Space to flip · ← → to navigate</p>
          <button onClick={handleNext} disabled={index === total - 1} style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: index === total - 1 ? '#333' : accentColor, cursor: index === total - 1 ? 'default' : 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
