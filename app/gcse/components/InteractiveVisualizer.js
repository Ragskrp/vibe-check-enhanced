'use client';

import { useState } from 'react';

/**
 * InteractiveVisualizer — fixed version
 * ALL hooks at the top level (React rules of hooks compliance).
 * Types: 'angle', 'logic', 'circuit', 'graph'
 */
export default function InteractiveVisualizer({ type, data, accentColor = '#ffe600' }) {
  // ── ALL STATE AT TOP LEVEL (no conditional hooks) ──────────────────────────
  const [sliderValue, setSliderValue] = useState(data?.initialValue || 0);
  const [in1, setIn1] = useState(false);
  const [in2, setIn2] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [mSlider, setMSlider] = useState(1);   // graph gradient
  const [cSlider, setCSlider] = useState(0);   // graph intercept

  // ── ANGLE MASTER ───────────────────────────────────────────────────────────
  if (type === 'angle') {
    const radius = 100;
    const cx = 150;
    const cy = 150;
    const angleRad = (sliderValue * Math.PI) / 180;
    const endX = cx + radius * Math.cos(-angleRad);
    const endY = cy + radius * Math.sin(-angleRad);
    const isMatch = Math.abs(sliderValue - data.targetAngle) < 2;

    return (
      <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: 32, borderRadius: 24, border: `1px solid ${isMatch ? '#00ff94' : 'rgba(255,255,255,0.1)'}`, transition: 'border-color 0.3s' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{data.title}</h3>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>
          Drag the slider to match: <span style={{ color: accentColor, fontWeight: 800 }}>{data.targetAngle}°</span>
        </p>
        <svg width="300" height="200" viewBox="0 0 300 200" style={{ filter: `drop-shadow(0 0 10px ${accentColor}30)` }}>
          <line x1={cx} y1={cy} x2={cx + radius} y2={cy} stroke="#333" strokeWidth="4" strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={endX} y2={endY} stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
          <path
            d={`M ${cx + 30} ${cy} A 30 30 0 ${sliderValue > 180 ? 1 : 0} 0 ${cx + 30 * Math.cos(-angleRad)} ${cy + 30 * Math.sin(-angleRad)}`}
            fill="none" stroke={accentColor} strokeWidth="2" opacity="0.5"
          />
          <circle cx={cx} cy={cy} r="6" fill="#fff" />
        </svg>
        <div style={{ marginTop: 24 }}>
          <input
            type="range" min="0" max="360" value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            style={{ width: '100%', accentColor, cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: '#666', fontWeight: 700 }}>
            <span>0°</span>
            <span style={{ color: '#fff', fontSize: 18 }}>{sliderValue}°</span>
            <span>360°</span>
          </div>
        </div>
        {isMatch && (
          <div style={{ marginTop: 20, padding: 12, borderRadius: 12, background: 'rgba(0,255,148,0.1)', color: '#00ff94', fontWeight: 700, fontSize: 14 }}>
            🎯 Perfect Match! {data.fact}
          </div>
        )}
      </div>
    );
  }

  // ── LOGIC GATE SIMULATOR ───────────────────────────────────────────────────
  if (type === 'logic') {
    const gate = data.gate || 'AND';
    const out = gate === 'AND' ? (in1 && in2)
      : gate === 'OR' ? (in1 || in2)
      : gate === 'NAND' ? !(in1 && in2)
      : gate === 'NOR' ? !(in1 || in2)
      : (in1 !== in2); // XOR default

    return (
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: 32, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{gate} Gate Simulator</h3>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>Click the inputs (0/1) to toggle them.</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {[{ val: in1, set: setIn1, label: 'A' }, { val: in2, set: setIn2, label: 'B' }].map(({ val, set, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#666', fontSize: 12, fontWeight: 700 }}>{label}</span>
                <button onClick={() => set(!val)} style={{
                  width: 50, height: 50, borderRadius: 12, border: 'none',
                  background: val ? accentColor : '#1a1a2e', color: val ? '#000' : '#fff',
                  fontWeight: 900, cursor: 'pointer', fontSize: 18, transition: 'all 0.2s',
                  boxShadow: val ? `0 0 20px ${accentColor}60` : 'none'
                }}>
                  {val ? '1' : '0'}
                </button>
              </div>
            ))}
          </div>
          <div style={{ width: 100, height: 80, background: 'rgba(255,255,255,0.05)', borderRadius: '0 40px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.1)', fontSize: 16, fontWeight: 900, color: '#fff' }}>
            {gate}
          </div>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: out ? '#00ff94' : '#1a1a2e', boxShadow: out ? '0 0 30px rgba(0,255,148,0.4)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: out ? '#000' : '#555', transition: 'all 0.3s' }}>
            {out ? '1' : '0'}
          </div>
        </div>
        <div style={{ marginTop: 24, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>{['A', 'B', 'Out'].map(h => <th key={h} style={{ color: accentColor, fontWeight: 800, padding: '4px 8px', textAlign: 'center' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {[[0,0],[0,1],[1,0],[1,1]].map(([a, b]) => {
                const o = gate === 'AND' ? (a && b) : gate === 'OR' ? (a || b) : gate === 'NAND' ? !(a && b) : gate === 'NOR' ? !(a || b) : (a !== b);
                const isActive = (a === (in1 ? 1 : 0)) && (b === (in2 ? 1 : 0));
                return (
                  <tr key={`${a}${b}`} style={{ background: isActive ? `${accentColor}15` : 'transparent' }}>
                    {[a, b, o ? 1 : 0].map((v, i) => <td key={i} style={{ textAlign: 'center', padding: '4px 8px', color: v ? '#00ff94' : '#555', fontWeight: 700 }}>{v ? 1 : 0}</td>)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: '#888', lineHeight: 1.6 }}>{data.explanation}</p>
      </div>
    );
  }

  // ── CIRCUIT SIMULATOR ──────────────────────────────────────────────────────
  if (type === 'circuit') {
    return (
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: 32, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{data.title}</h3>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>Click the switch to open or close the circuit.</p>
        <svg width="280" height="160" viewBox="0 0 280 160" style={{ marginBottom: 24 }}>
          {/* Top and bottom rails */}
          <path d="M 40 80 L 40 30 L 240 30 L 240 80" fill="none" stroke={isOn ? '#ffe600' : '#333'} strokeWidth="3" style={{ transition: 'stroke 0.3s' }} />
          <path d="M 40 100 L 40 140 L 240 140 L 240 100" fill="none" stroke={isOn ? '#ffe600' : '#333'} strokeWidth="3" style={{ transition: 'stroke 0.3s' }} />
          {/* Battery (right side) */}
          <rect x="220" y="80" width="40" height="20" rx="4" fill="#222" stroke="#444" strokeWidth="1" />
          <text x="240" y="93" textAnchor="middle" fill="#888" fontSize="9" fontWeight="800">BAT</text>
          <rect x="225" y="75" width="10" height="5" fill="#555" rx="1" />
          {/* Bulb (top centre) */}
          <circle cx="140" cy="30" r="16" fill={isOn ? '#ffe600' : '#1a1a2e'} stroke={isOn ? '#fff' : '#333'} strokeWidth="2" style={{ transition: 'all 0.4s' }} />
          {isOn && <circle cx="140" cy="30" r="28" fill="rgba(255,230,0,0.15)" style={{ transition: 'all 0.4s' }} />}
          <text x="140" y="34" textAnchor="middle" fill={isOn ? '#000' : '#333'} fontSize="14">💡</text>
          {/* Switch (left side) */}
          <circle cx="40" cy="80" r="5" fill="#555" />
          <circle cx="40" cy="100" r="5" fill="#555" />
          <line
            x1="40" y1="100"
            x2={isOn ? 40 : 60}
            y2={isOn ? 80 : 75}
            stroke="#fff" strokeWidth="3" strokeLinecap="round"
            style={{ transition: 'all 0.25s ease' }}
          />
          <text x="10" y="93" fill="#666" fontSize="9" fontWeight="700">SW</text>
        </svg>
        <button
          onClick={() => setIsOn(!isOn)}
          style={{ padding: '12px 32px', borderRadius: 12, border: `2px solid ${isOn ? '#00ff94' : '#555'}`, background: isOn ? 'rgba(0,255,148,0.1)' : 'rgba(255,255,255,0.03)', color: isOn ? '#00ff94' : '#888', fontWeight: 800, cursor: 'pointer', fontSize: 14, transition: 'all 0.3s', marginBottom: 16 }}
        >
          {isOn ? '🔴 Open Switch' : '🟢 Close Switch'}
        </button>
        <div style={{ padding: '12px 16px', borderRadius: 12, background: isOn ? 'rgba(0,255,148,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isOn ? '#00ff9440' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.3s' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: isOn ? '#00ff94' : '#555' }}>
            {isOn ? '⚡ CIRCUIT CLOSED — Current flows, bulb lights' : '⭕ CIRCUIT OPEN — No current, bulb off'}
          </div>
          {data.fact && <p style={{ fontSize: 12, color: '#888', marginTop: 8, marginBottom: 0 }}>{data.fact}</p>}
        </div>
      </div>
    );
  }

  // ── GRAPH EXPLORER (y = mx + c) ────────────────────────────────────────────
  if (type === 'graph') {
    const W = 240, H = 200, scale = 18, ox = W / 2, oy = H / 2;
    const x1 = -ox / scale, y1 = mSlider * x1 + cSlider;
    const x2 = ox / scale, y2 = mSlider * x2 + cSlider;
    const toSvg = (x, y) => ({ sx: ox + x * scale, sy: oy - y * scale });
    const p1 = toSvg(x1, y1), p2 = toSvg(x2, y2);

    return (
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: 32, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>y = mx + c Explorer</h3>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>Drag the sliders to see how gradient and intercept change the line.</p>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', margin: '0 auto', background: 'rgba(255,255,255,0.01)', borderRadius: 12 }}>
          {/* Grid */}
          {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(i => (
            <g key={i}>
              <line x1={ox + i * scale} y1={0} x2={ox + i * scale} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1={0} y1={oy + i * scale} x2={W} y2={oy + i * scale} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </g>
          ))}
          {/* Axes */}
          <line x1={ox} y1={0} x2={ox} y2={H} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1={0} y1={oy} x2={W} y2={oy} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          {/* Line */}
          <line x1={p1.sx} y1={p1.sy} x2={p2.sx} y2={p2.sy} stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          {/* y-intercept dot */}
          <circle cx={ox} cy={oy - cSlider * scale} r="5" fill="#fff" />
        </svg>
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[{ label: 'm (gradient)', val: mSlider, set: setMSlider, color: accentColor },
            { label: 'c (y-intercept)', val: cSlider, set: setCSlider, color: '#00ff94' }
          ].map(({ label, val, set, color }) => (
            <div key={label}>
              <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 6 }}>{label} = {val}</div>
              <input type="range" min="-5" max="5" step="0.5" value={val}
                onChange={(e) => set(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: color }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
          y = <span style={{ color: accentColor }}>{mSlider}</span>x + <span style={{ color: '#00ff94' }}>{cSlider}</span>
        </div>
      </div>
    );
  }

  return null;
}
