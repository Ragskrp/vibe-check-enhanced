'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

/**
 * Reusable lesson card carousel for GCSE tools.
 * Props:
 *   cards: [{ title, content, example?, tip?, formula? }]
 *   accentColor: string (hex)
 *   onComplete: () => void (optional)
 */
export default function LessonCards({ cards, accentColor = '#00e5a0', onComplete }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!cards || cards.length === 0) return null;

  const card = cards[currentCard];
  const isLast = currentCard === cards.length - 1;
  const isFirst = currentCard === 0;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 20px',
          borderRadius: 12,
          background: `${accentColor}10`,
          border: `1px solid ${accentColor}30`,
          color: accentColor,
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          margin: '0 auto 20px',
          transition: 'all 0.2s',
        }}
      >
        <BookOpen size={16} /> Learn the basics first ({cards.length} cards)
      </button>
    );
  }

  return (
    <div style={{
      marginBottom: 24,
      borderRadius: 20,
      background: 'var(--bg-card)',
      border: `2px solid ${accentColor}30`,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        background: `${accentColor}08`,
        borderBottom: `1px solid ${accentColor}15`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          fontWeight: 700,
          color: accentColor,
        }}>
          <BookOpen size={14} /> LESSON — {currentCard + 1}/{cards.length}
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Collapse ✕
        </button>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px 24px 20px' }}>
        <h3 style={{
          fontSize: 18,
          fontWeight: 800,
          marginBottom: 12,
          color: '#f0f0f0',
        }}>
          {card.title}
        </h3>

        <p style={{
          color: '#aaa',
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: card.formula || card.example ? 16 : 0,
        }}>
          {card.content}
        </p>

        {/* Formula box */}
        {card.formula && (
          <div style={{
            padding: '14px 18px',
            borderRadius: 12,
            background: `${accentColor}08`,
            border: `1px solid ${accentColor}20`,
            fontFamily: 'monospace',
            fontSize: 18,
            fontWeight: 800,
            color: '#fff',
            textAlign: 'center',
            marginBottom: card.example ? 16 : 0,
            letterSpacing: '0.02em',
          }}>
            {card.formula}
          </div>
        )}

        {/* Worked example */}
        {card.example && (
          <div style={{
            padding: '14px 18px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-light)',
          }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#666',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 8,
            }}>
              Worked Example
            </div>
            <div style={{
              fontSize: 14,
              color: '#ccc',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
            }}>
              {card.example}
            </div>
          </div>
        )}

        {/* Tip */}
        {card.tip && (
          <div style={{
            marginTop: 12,
            padding: '10px 14px',
            borderRadius: 10,
            background: 'rgba(255,230,0,0.06)',
            border: '1px solid rgba(255,230,0,0.15)',
            fontSize: 13,
            color: '#ffe600',
            fontWeight: 600,
          }}>
            💡 {card.tip}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        borderTop: '1px solid var(--border)',
      }}>
        <button
          onClick={() => setCurrentCard((c) => c - 1)}
          disabled={isFirst}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            color: isFirst ? '#333' : '#888',
            fontSize: 13,
            fontWeight: 700,
            cursor: isFirst ? 'default' : 'pointer',
          }}
        >
          <ChevronLeft size={16} /> Previous
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6 }}>
          {cards.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentCard(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === currentCard ? accentColor : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (isLast) {
              setIsOpen(false);
              onComplete?.();
            } else {
              setCurrentCard((c) => c + 1);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: isLast ? accentColor : 'none',
            color: isLast ? '#000' : accentColor,
            border: 'none',
            fontSize: 13,
            fontWeight: 800,
            cursor: 'pointer',
            padding: isLast ? '6px 14px' : 0,
            borderRadius: 8,
          }}
        >
          {isLast ? 'Got it ✓' : 'Next'} {!isLast && <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}
