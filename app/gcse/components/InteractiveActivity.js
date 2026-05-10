'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Check, Brain, GripVertical } from 'lucide-react';

/**
 * InteractiveActivity — fully mobile-safe version
 * Uses Pointer Events API (works on touch + mouse).
 * Types: 'sort', 'match', 'true-false', 'category-sort'
 */
export default function InteractiveActivity({ type, data, onComplete, accentColor = '#00d4ff' }) {
  const [phase, setPhase] = useState('active');
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);
  const [error, setError] = useState(null);
  const [tfAnswers, setTfAnswers] = useState({});
  const [catItems, setCatItems] = useState([]);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const draggingIdx = useRef(null);

  useEffect(() => {
    if (type === 'sort' && data.items) {
      setItems([...data.items].sort(() => Math.random() - 0.5));
    }
    if (type === 'category-sort' && data.items) {
      setCatItems(data.items.map(it => ({ ...it, assigned: null })));
    }
  }, [type, data]);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 1500);
  };

  const triggerComplete = useCallback(() => {
    setPhase('complete');
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then(m => m.default({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: [accentColor, '#ffffff'] })).catch(() => {});
    }
  }, [accentColor]);

  // ── SORT (pointer-event drag-and-drop — mobile safe) ──────────────────────
  const handleSortPointerDown = (e, idx) => {
    draggingIdx.current = idx;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleSortPointerEnter = (idx) => {
    setDragOverIdx(idx);
  };

  const handleSortPointerUp = (toIdx) => {
    const fromIdx = draggingIdx.current;
    if (fromIdx === null || fromIdx === toIdx) { draggingIdx.current = null; setDragOverIdx(null); return; }
    const newItems = [...items];
    const [moved] = newItems.splice(fromIdx, 1);
    newItems.splice(toIdx, 0, moved);
    setItems(newItems);
    draggingIdx.current = null;
    setDragOverIdx(null);
  };

  const checkSort = () => {
    const isCorrect = items.every((item, idx) => item.id === data.correctOrder[idx]);
    if (isCorrect) triggerComplete();
    else showError('Not quite! Think about the order and try again.');
  };

  // ── MATCH ─────────────────────────────────────────────────────────────────
  const handleMatchSelect = (id, side) => {
    if (phase !== 'active') return;
    if (!selected) { setSelected({ id, side }); return; }
    if (selected.side === side) { setSelected({ id, side }); return; }

    const leftId = side === 'left' ? id : selected.id;
    const rightId = side === 'right' ? id : selected.id;

    if (data.pairs[leftId] === rightId) {
      const newMatches = [...matches, { left: leftId, right: rightId }];
      setMatches(newMatches);
      setSelected(null);
      if (newMatches.length === Object.keys(data.pairs).length) triggerComplete();
    } else {
      setWrongPair({ left: leftId, right: rightId });
      setTimeout(() => setWrongPair(null), 700);
      setSelected(null);
      showError('Incorrect pair — try again!');
    }
  };

  // ── TRUE / FALSE ──────────────────────────────────────────────────────────
  const handleTF = (stmtId, answer) => {
    if (tfAnswers[stmtId] !== undefined) return;
    const correct = data.statements.find(s => s.id === stmtId)?.correct;
    const isRight = answer === correct;
    setTfAnswers(prev => ({ ...prev, [stmtId]: { answer, isRight } }));
    const newAnswers = { ...tfAnswers, [stmtId]: { answer, isRight } };
    if (Object.keys(newAnswers).length === data.statements.length) {
      const allCorrect = Object.values(newAnswers).every(a => a.isRight);
      if (allCorrect) setTimeout(triggerComplete, 600);
    }
  };

  // ── CATEGORY SORT ─────────────────────────────────────────────────────────
  const handleCatAssign = (itemId, catId) => {
    setCatItems(prev => prev.map(it => it.id === itemId ? { ...it, assigned: catId } : it));
    const newItems = catItems.map(it => it.id === itemId ? { ...it, assigned: catId } : it);
    if (newItems.every(it => it.assigned !== null)) {
      const allCorrect = newItems.every(it => it.assigned === it.category);
      if (allCorrect) triggerComplete();
      else showError('Some items are in the wrong category — check and try again!');
    }
  };

  // ── SHARED CARD WRAPPER ───────────────────────────────────────────────────
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${error ? '#ff2d78' : 'rgba(255,255,255,0.1)'}`, borderRadius: 24, padding: 32, transition: 'border-color 0.3s', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accentColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
          <Brain size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>{data.title}</h3>
          <p style={{ fontSize: 13, color: '#888', margin: 0 }}>{data.instruction}</p>
        </div>
      </div>

      {error && (
        <div style={{ position: 'absolute', top: 16, right: 16, padding: '8px 14px', borderRadius: 10, background: '#ff2d78', color: '#fff', fontSize: 12, fontWeight: 700, zIndex: 10 }}>
          {error}
        </div>
      )}

      {/* ── SORT RENDER ── */}
      {type === 'sort' && phase === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item, idx) => (
            <div
              key={item.id}
              onPointerDown={(e) => handleSortPointerDown(e, idx)}
              onPointerEnter={() => handleSortPointerEnter(idx)}
              onPointerUp={() => handleSortPointerUp(idx)}
              style={{
                padding: '14px 18px', borderRadius: 14,
                background: dragOverIdx === idx ? `${accentColor}15` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${dragOverIdx === idx ? accentColor : 'rgba(255,255,255,0.08)'}`,
                cursor: 'grab', display: 'flex', alignItems: 'center', gap: 14,
                touchAction: 'none', userSelect: 'none', transition: 'background 0.15s, border-color 0.15s'
              }}
            >
              <GripVertical size={18} color="#444" />
              <span style={{ fontWeight: 600, color: '#fff', flex: 1 }}>{item.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#555', minWidth: 20, textAlign: 'right' }}>{idx + 1}</span>
            </div>
          ))}
          <button onClick={checkSort} style={{ marginTop: 16, padding: '14px', borderRadius: 14, background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: '#000', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            ✓ CHECK ORDER
          </button>
        </div>
      )}

      {/* ── MATCH RENDER ── */}
      {type === 'match' && phase === 'active' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {data.left.map(item => {
              const isMatched = matches.some(m => m.left === item.id);
              const isSelected = selected?.id === item.id && selected?.side === 'left';
              const isWrong = wrongPair?.left === item.id;
              return (
                <button key={item.id} disabled={isMatched} onClick={() => handleMatchSelect(item.id, 'left')} style={{
                  padding: '12px 16px', borderRadius: 12, textAlign: 'left',
                  background: isMatched ? 'rgba(0,255,148,0.08)' : isSelected ? `${accentColor}18` : isWrong ? 'rgba(255,45,120,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isMatched ? '#00ff9440' : isSelected ? accentColor : isWrong ? '#ff2d78' : 'rgba(255,255,255,0.1)'}`,
                  color: isMatched ? '#00ff94' : '#fff', cursor: isMatched ? 'default' : 'pointer',
                  fontSize: 14, fontWeight: 600, transition: 'all 0.2s'
                }}>
                  {isMatched && '✓ '}{item.label}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {data.right.map(item => {
              const isMatched = matches.some(m => m.right === item.id);
              const isSelected = selected?.id === item.id && selected?.side === 'right';
              const isWrong = wrongPair?.right === item.id;
              return (
                <button key={item.id} disabled={isMatched} onClick={() => handleMatchSelect(item.id, 'right')} style={{
                  padding: '12px 16px', borderRadius: 12, textAlign: 'right',
                  background: isMatched ? 'rgba(0,255,148,0.08)' : isSelected ? `${accentColor}18` : isWrong ? 'rgba(255,45,120,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isMatched ? '#00ff9440' : isSelected ? accentColor : isWrong ? '#ff2d78' : 'rgba(255,255,255,0.1)'}`,
                  color: isMatched ? '#00ff94' : '#fff', cursor: isMatched ? 'default' : 'pointer',
                  fontSize: 14, fontWeight: 600, transition: 'all 0.2s'
                }}>
                  {item.label}{isMatched && ' ✓'}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TRUE / FALSE RENDER ── */}
      {type === 'true-false' && phase === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {data.statements.map(stmt => {
            const ans = tfAnswers[stmt.id];
            return (
              <div key={stmt.id} style={{ padding: '16px 20px', borderRadius: 16, background: ans ? (ans.isRight ? 'rgba(0,255,148,0.08)' : 'rgba(255,45,120,0.08)') : 'rgba(255,255,255,0.03)', border: `1px solid ${ans ? (ans.isRight ? '#00ff9430' : '#ff2d7830') : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.3s' }}>
                <p style={{ color: '#fff', fontWeight: 600, marginBottom: 12, fontSize: 14, lineHeight: 1.5 }}>{stmt.statement}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['true', 'false'].map(val => (
                    <button key={val} onClick={() => handleTF(stmt.id, val === 'true')} disabled={!!ans} style={{
                      flex: 1, padding: '8px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 13,
                      background: ans?.answer === (val === 'true') ? (ans.isRight ? '#00ff94' : '#ff2d78') : 'rgba(255,255,255,0.06)',
                      color: ans?.answer === (val === 'true') ? '#000' : '#888',
                      cursor: ans ? 'default' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase'
                    }}>
                      {val === 'true' ? '✓ True' : '✗ False'}
                    </button>
                  ))}
                </div>
                {ans && !ans.isRight && <p style={{ fontSize: 12, color: '#ffe600', marginTop: 8, marginBottom: 0 }}>💡 {stmt.explanation}</p>}
              </div>
            );
          })}
        </div>
      )}

      {/* ── CATEGORY SORT RENDER ── */}
      {type === 'category-sort' && phase === 'active' && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {catItems.filter(it => !it.assigned).map(item => (
              <div key={item.id} style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, fontSize: 13 }}>
                {item.label}
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {data.categories.map(cat => (
              <div key={cat.id} style={{ padding: 16, borderRadius: 16, border: `2px dashed ${cat.color}40`, minHeight: 100 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: cat.color, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cat.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {catItems.filter(it => it.assigned === cat.id).map(item => (
                    <div key={item.id} style={{ padding: '6px 12px', borderRadius: 8, background: `${cat.color}15`, border: `1px solid ${cat.color}40`, color: '#fff', fontSize: 12, fontWeight: 600 }}>
                      {item.label}
                    </div>
                  ))}
                </div>
                {catItems.filter(it => !it.assigned).map(item => (
                  <button key={item.id} onClick={() => handleCatAssign(item.id, cat.id)} style={{ display: 'block', width: '100%', marginTop: 6, padding: '4px 8px', background: 'none', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, color: '#666', fontSize: 11, cursor: 'pointer', textAlign: 'left' }}>
                    + {item.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TIMELINE SORT RENDER ── */}
      {type === 'timeline-sort' && phase === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 24, top: 20, bottom: 60, width: 2, background: 'rgba(255,255,255,0.1)' }} />
          {items.map((item, idx) => (
            <div
              key={item.id}
              onPointerDown={(e) => handleSortPointerDown(e, idx)}
              onPointerEnter={() => handleSortPointerEnter(idx)}
              onPointerUp={() => handleSortPointerUp(idx)}
              style={{
                padding: '12px 16px', borderRadius: 14, marginLeft: 16,
                background: dragOverIdx === idx ? `${accentColor}15` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${dragOverIdx === idx ? accentColor : 'rgba(255,255,255,0.08)'}`,
                cursor: 'grab', display: 'flex', alignItems: 'center', gap: 16, position: 'relative',
                touchAction: 'none', userSelect: 'none', transition: 'background 0.15s, border-color 0.15s'
              }}
            >
              <div style={{ position: 'absolute', left: -14, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', background: accentColor, border: '3px solid #111' }} />
              <GripVertical size={16} color="rgba(255,255,255,0.2)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{item.desc || 'Drag to place in correct era'}</div>
              </div>
            </div>
          ))}
          <button onClick={checkSort} style={{ marginTop: 24, padding: '14px', borderRadius: 14, background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: '#000', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            ✓ VERIFY CHRONOLOGY
          </button>
        </div>
      )}

      {/* ── COMPLETION OVERLAY ── */}
      {phase === 'complete' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#00ff94', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 0 40px rgba(0,255,148,0.4)' }}>
            <Check size={36} color="#000" strokeWidth={3} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 8 }}>ACTIVITY COMPLETE!</h2>
          <p style={{ color: '#888', marginBottom: 24, textAlign: 'center' }}>Great work — you nailed it.</p>
          <button
            onClick={() => { setPhase('active'); setMatches([]); setSelected(null); setTfAnswers({}); setCatItems(data.items?.map(it => ({ ...it, assigned: null })) || []); if (onComplete) onComplete(); }}
            style={{ padding: '12px 32px', borderRadius: 12, background: '#fff', color: '#000', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: 14 }}
          >
            TRY AGAIN / NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
