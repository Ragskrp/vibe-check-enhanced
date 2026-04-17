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

        {card.visualId && (
          <div style={{ padding: '24px 0' }}>
            <CardVisualizer id={card.visualId} accentColor={accentColor} />
          </div>
        )}

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
}

function CardVisualizer({ id, accentColor }) {
  if (id === 'cs-flowchart') {
    return (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ padding: '8px 16px', borderRadius: 50, border: `2px solid ${accentColor}`, textAlign: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>Start / End (Oval)</div>
        <div style={{ padding: '8px 16px', transform: 'skew(-15deg)', border: `2px solid ${accentColor}`, textAlign: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>
           <span style={{ transform: 'skew(15deg)', display: 'inline-block' }}>Input/Output (Parallelogram)</span>
        </div>
        <div style={{ padding: '8px 16px', border: `2px solid ${accentColor}`, textAlign: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>Process (Rectangle)</div>
        <div style={{ width: 100, height: 100, transform: 'rotate(45deg)', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px' }}>
           <span style={{ transform: 'rotate(-45deg)', color: '#fff', fontSize: 12, fontWeight: 700 }}>Decision?</span>
        </div>
      </div>
    );
  }
  
  if (id === 'cs-logic-gates') {
    return (
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', margin: '20px 0' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
               <div style={{ padding: '4px 8px', background: '#333', fontSize: 12, borderRadius: 4, color: '#00ff94' }}>A = 1</div>
               <div style={{ padding: '4px 8px', background: '#333', fontSize: 12, borderRadius: 4, color: '#00ff94' }}>B = 1</div>
            </div>
            <svg width="40" height="40" viewBox="0 0 40 40">
               <path d="M 0 0 L 20 0 Q 40 0 40 20 Q 40 40 20 40 L 0 40 Z" fill="none" stroke={accentColor} strokeWidth="3" />
            </svg>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#00ff94' }}>→ 1</div>
         </div>
       </div>
    );
  }

  if (id === 'sci-atomic-model') {
    return (
      <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 40, height: 40, borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#000' }}>Nucleus</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 100, height: 100, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.3)' }} />
        <div style={{ position: 'absolute', top: '5%', left: '50%', width: 10, height: 10, borderRadius: '50%', background: '#fff', transform: 'translateX(-50%)' }} />
      </div>
    );
  }

  if (id === 'sci-circuit-symbols') {
    return (
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', padding: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 40, height: 20, border: '2px solid #fff', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '50%', left: -10, width: 10, height: 2, background: '#fff' }} />
             <div style={{ position: 'absolute', top: '50%', right: -10, width: 10, height: 2, background: '#fff' }} />
          </div>
          <span style={{ fontSize: 11, color: '#888' }}>Resistor</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #fff', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <span style={{ fontSize: 14, fontWeight: 900 }}>A</span>
          </div>
          <span style={{ fontSize: 11, color: '#888' }}>Ammeter</span>
        </div>
      </div>
    );
  }

  if (id === 'sci-radiation-penetration') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 60, fontSize: 12, color: accentColor }}>Alpha (α)</span>
          <div style={{ flex: 1, height: 4, background: '#444', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', right: '80%', top: -10, bottom: -10, width: 4, background: '#fff' }} />
          </div>
          <span style={{ fontSize: 10, color: '#666' }}>Stopped by Paper</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 60, fontSize: 12, color: accentColor }}>Beta (β)</span>
          <div style={{ flex: 1, height: 4, background: '#444', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', right: '40%', top: -10, bottom: -10, width: 6, background: '#aaa' }} />
          </div>
          <span style={{ fontSize: 10, color: '#666' }}>Stopped by Al</span>
        </div>
      </div>
    );
  }

  if (id === 'math-indices') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, fontSize: 32, fontWeight: 900, height: 100 }}>
         <span style={{ color: accentColor }}>a</span>
         <span style={{ transform: 'translateY(-15px)', color: '#fff', fontSize: 20 }}>m</span>
         <span style={{ fontSize: 24, margin: '0 8px' }}>×</span>
         <span style={{ color: accentColor }}>a</span>
         <span style={{ transform: 'translateY(-15px)', color: '#fff', fontSize: 20 }}>n</span>
         <span style={{ fontSize: 24, margin: '0 8px' }}>=</span>
         <span style={{ color: accentColor }}>a</span>
         <span style={{ transform: 'translateY(-15px)', color: '#00ff94', fontSize: 20 }}>m+n</span>
      </div>
    );
  }

  if (id === 'math-gradients') {
    return (
      <div style={{ position: 'relative', width: 120, height: 100, margin: '0 auto' }}>
         <div style={{ position: 'absolute', bottom: 10, left: 10, width: 100, height: 2, background: 'rgba(255,255,255,0.2)' }} />
         <div style={{ position: 'absolute', bottom: 10, left: 10, height: 90, width: 2, background: 'rgba(255,255,255,0.2)' }} />
         <div style={{ position: 'absolute', bottom: 10, left: 10, width: 110, height: 110, borderBottom: `3px solid ${accentColor}`, borderLeft: `3px solid ${accentColor}`, transform: 'rotate(-45deg)', transformOrigin: 'bottom left' }} />
         <div style={{ position: 'absolute', bottom: 35, left: 65, color: accentColor, fontSize: 10, fontWeight: 700 }}>m = rise/run</div>
      </div>
    );
  }

  if (id === 'math-triangles') {
    return (
      <div style={{ width: 100, height: 80, margin: '15px auto', borderBottom: '3px solid #fff', borderLeft: '3px solid #fff', position: 'relative' }}>
         <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', borderTop: `3px solid ${accentColor}`, transform: 'skewX(-40deg)', transformOrigin: 'bottom left' }} />
         <div style={{ position: 'absolute', bottom: 5, left: 5, width: 10, height: 10, borderTop: '2px solid #fff', borderRight: '2px solid #fff' }} />
         <div style={{ position: 'absolute', bottom: -20, left: '40%', fontSize: 10 }}>b</div>
         <div style={{ position: 'absolute', top: '40%', left: -15, fontSize: 10 }}>a</div>
         <div style={{ position: 'absolute', top: '20%', right: '10%', fontSize: 12, color: accentColor, fontWeight: 800 }}>c² = a² + b²</div>
      </div>
    );
  }

  if (id === 'math-fractions') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, margin: '20px 0' }}>
         <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'conic-gradient(#00d4ff 0% 75%, #333 75% 100%)', border: '2px solid #fff' }} />
         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: 24 }}>
            <div style={{ borderBottom: '2px solid #fff', textAlign: 'center' }}>3</div>
            <div style={{ textAlign: 'center' }}>4</div>
         </div>
      </div>
    );
  }

  if (id === 'math-standard-form') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, height: 80 }}>
         <span style={{ fontSize: 28, fontWeight: 900 }}>4.5</span>
         <span style={{ fontSize: 20, color: '#666' }}>×</span>
         <span style={{ fontSize: 28, fontWeight: 900, color: accentColor }}>10</span>
         <span style={{ transform: 'translateY(-12px)', fontSize: 18, color: '#fff' }}>³</span>
      </div>
    );
  }

  if (id === 'math-venn') {
    return (
      <div style={{ position: 'relative', width: 140, height: 100, margin: '0 auto' }}>
         <div style={{ position: 'absolute', left: 0, width: 80, height: 80, borderRadius: '50%', border: `2px solid ${accentColor}`, background: 'rgba(0,255,148,0.1)' }} />
         <div style={{ position: 'absolute', right: 0, width: 80, height: 80, borderRadius: '50%', border: `2px solid #00d4ff`, background: 'rgba(0,212,255,0.1)' }} />
         <div style={{ position: 'absolute', left: '46%', top: '30%', fontSize: 12, fontWeight: 800 }}>HCF</div>
      </div>
    );
  }

  if (id === 'math-polygons') {
    return (
      <div style={{ width: 100, height: 100, margin: '0 auto', border: `3px solid ${accentColor}`, clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', position: 'relative' }}>
         <div style={{ position: 'absolute', top: '40%', left: '30%', fontSize: 10, color: '#fff', fontWeight: 800 }}>(n-2) × 180°</div>
      </div>
    );
  }

  if (id === 'bus-stakeholders') {
    return (
      <div style={{ position: 'relative', width: 200, height: 100, margin: '0 auto' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 60, borderRadius: '50%', background: accentColor, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900 }}>Business</div>
        {[0, 60, 120, 180, 240, 300].map(deg => (
          <div key={deg} style={{ position: 'absolute', top: '50%', left: '50%', width: 20, height: 2, background: 'rgba(255,255,255,0.3)', transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(50px)` }} />
        ))}
        <div style={{ position: 'absolute', top: 5, left: '30%', fontSize: 9, color: '#888' }}>Government</div>
        <div style={{ position: 'absolute', bottom: 5, right: '30%', fontSize: 9, color: '#888' }}>Employees</div>
      </div>
    );
  }

  if (id === 'bus-supply-chain') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', margin: '20px 0' }}>
        {['Farmer', 'Factory', 'Shop'].map((item, i) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${accentColor}`, fontSize: 12, fontWeight: 700 }}>{item}</div>
            {i < 2 && <span style={{ color: accentColor }}>→</span>}
          </div>
        ))}
      </div>
    );
  }

  if (id === 'bus-org-chart') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15, margin: '15px 0' }}>
        <div style={{ padding: '6px 12px', border: `2px solid ${accentColor}`, borderRadius: 4, fontSize: 11, fontWeight: 800 }}>CEO</div>
        <div style={{ width: 2, height: 15, background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ padding: '6px 10px', border: `1px solid #fff`, borderRadius: 4, fontSize: 10 }}>Manager A</div>
          <div style={{ padding: '6px 10px', border: `1px solid #fff`, borderRadius: 4, fontSize: 10 }}>Manager B</div>
        </div>
      </div>
    );
  }

  return null;
}

