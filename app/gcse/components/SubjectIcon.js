'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Modern animated SVG icons for GCSE subjects.
 * Replace emoji with precise, animated vector art.
 *
 * Usage: <SubjectIcon subject="maths" color="#00e5a0" size={80} />
 */

// ── Maths: Animated rotating hexagon with inner formula glow ─────────────
function MathsIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <style>{`
        @keyframes rotHex { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseIn { 0%,100%{opacity:1;r:3} 50%{opacity:0.5;r:4} }
        .hexRot { 
          animation: rotHex 12s linear infinite; 
          transform-origin: 40px 40px; 
          will-change: transform;
        }
      `}</style>
      {/* Outer rotating hexagon */}
      <polygon
        className="hexRot"
        points="40,6 68,22 68,58 40,74 12,58 12,22"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      {/* Inner static hexagon */}
      <polygon
        points="40,18 56,27 56,53 40,62 24,53 24,27"
        stroke={color}
        strokeWidth="1"
        fill={`${color}10`}
        opacity="0.7"
      />
      {/* Plus cross */}
      <line x1="40" y1="28" x2="40" y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="40" x2="52" y2="40" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Corner dots */}
      {[[40, 6], [68, 22], [68, 58], [40, 74], [12, 58], [12, 22]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill={color} opacity="0.6" />
      ))}
    </svg>
  );
}

// ── Science: Animated orbiting atom ─────────────────────────────────────
function ScienceIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <style>{`
        @keyframes orb1 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orb2 { from{transform:rotate(60deg)} to{transform:rotate(420deg)} }
        @keyframes orb3 { from{transform:rotate(120deg)} to{transform:rotate(480deg)} }
        @keyframes nucPulse { 0%,100%{r:5;opacity:1} 50%{r:7;opacity:0.7} }
        .orbit1 { animation: orb1 4s linear infinite; transform-origin: 40px 40px; will-change: transform; }
        .orbit2 { animation: orb2 6s linear infinite; transform-origin: 40px 40px; will-change: transform; }
        .orbit3 { animation: orb3 8s linear infinite; transform-origin: 40px 40px; will-change: transform; }
      `}</style>
      {/* Ellipse orbits */}
      <ellipse cx="40" cy="40" rx="30" ry="11" stroke={color} strokeWidth="1" opacity="0.25" />
      <ellipse cx="40" cy="40" rx="30" ry="11" stroke={color} strokeWidth="1" opacity="0.25"
        style={{ transform: 'rotate(60deg)', transformOrigin: '40px 40px' }} />
      <ellipse cx="40" cy="40" rx="30" ry="11" stroke={color} strokeWidth="1" opacity="0.25"
        style={{ transform: 'rotate(120deg)', transformOrigin: '40px 40px' }} />
      {/* Electrons */}
      <g className="orbit1">
        <circle cx="70" cy="40" r="3" fill={color} />
      </g>
      <g className="orbit2">
        <circle cx="70" cy="40" r="3" fill={color} opacity="0.7" />
      </g>
      <g className="orbit3">
        <circle cx="70" cy="40" r="3" fill={color} opacity="0.5" />
      </g>
      {/* Nucleus */}
      <circle cx="40" cy="40" r="6" fill={`${color}30`} stroke={color} strokeWidth="1.5" />
      <circle cx="40" cy="40" r="3" fill={color} />
    </svg>
  );
}

// ── Computer Science: Animated circuit board with pulse ──────────────────
function CompSciIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <style>{`
        @keyframes pulse1 { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes pulse2 { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes pulse3 { 0%,100%{opacity:0.2} 50%{opacity:1} }
        .p1{animation:pulse1 1.5s infinite} 
        .p2{animation:pulse2 1.5s 0.5s infinite}
        .p3{animation:pulse3 1.5s 1s infinite}
      `}</style>
      {/* Circuit trace lines */}
      <path d="M10 40 H28 V20 H52 V40 H70" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M10 55 H22 V40" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M70 25 H58 V40" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M28 55 H52 V65 H40" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {/* Chip rectangle */}
      <rect x="28" y="30" width="24" height="20" rx="3" stroke={color} strokeWidth="1.5" fill={`${color}12`} />
      {/* Chip pins */}
      {[34, 40, 46].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="30" x2={x} y2="25" stroke={color} strokeWidth="1.5" opacity="0.5" />
          <line x1={x} y1="50" x2={x} y2="55" stroke={color} strokeWidth="1.5" opacity="0.5" />
        </g>
      ))}
      {/* Pulsing dots */}
      <circle className="p1" cx="10" cy="40" r="3" fill={color} />
      <circle className="p2" cx="40" cy="20" r="3" fill={color} />
      <circle className="p3" cx="70" cy="40" r="3" fill={color} />
      {/* Chip core dot */}
      <circle cx="40" cy="40" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

// ── Business: Animated rising bar chart ──────────────────────────────────
function BusinessIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <style>{`
        @keyframes barRise1 { from{height:0;y:62} to{height:18;y:44} }
        @keyframes barRise2 { from{height:0;y:62} to{height:30;y:32} }
        @keyframes barRise3 { from{height:0;y:62} to{height:42;y:20} }
        @keyframes arrowUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .bar1{animation:barRise1 1s ease-out both}
        .bar2{animation:barRise2 1s 0.15s ease-out both}
        .bar3{animation:barRise3 1s 0.3s ease-out both}
        .arrowAnim{animation:arrowUp 2s ease-in-out infinite}
      `}</style>
      {/* Grid line */}
      <line x1="14" y1="64" x2="66" y2="64" stroke={color} strokeWidth="1" opacity="0.2" />
      <line x1="14" y1="44" x2="66" y2="44" stroke={color} strokeWidth="1" opacity="0.1" />
      <line x1="14" y1="24" x2="66" y2="24" stroke={color} strokeWidth="1" opacity="0.1" />
      {/* Y axis */}
      <line x1="14" y1="14" x2="14" y2="64" stroke={color} strokeWidth="1" opacity="0.2" />
      {/* Bars */}
      <rect className="bar1" x="22" y="44" width="10" height="18" rx="2" fill={`${color}40`} stroke={color} strokeWidth="1" />
      <rect className="bar2" x="36" y="32" width="10" height="30" rx="2" fill={`${color}60`} stroke={color} strokeWidth="1" />
      <rect className="bar3" x="50" y="20" width="10" height="42" rx="2" fill={color} opacity="0.8" stroke={color} strokeWidth="1" />
      {/* Arrow trend line */}
      <g className="arrowAnim">
        <polyline points="22,52 36,40 52,24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="52" cy="24" r="3" fill={color} />
      </g>
    </svg>
  );
}

// ── English Language: Animated flowing wave / typewriter ─────────────────
function EnglishLangIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <style>{`
        @keyframes wave1 { 0%,100%{d:path("M10,40 Q20,28 30,40 Q40,52 50,40 Q60,28 70,40")} 50%{d:path("M10,40 Q20,52 30,40 Q40,28 50,40 Q60,52 70,40")} }
        @keyframes pen { 0%,100%{transform:translate(0,0)} 50%{transform:translate(4px,-4px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .penAnim { animation: pen 2s ease-in-out infinite; }
        .cursor { animation: blink 1s step-end infinite; }
      `}</style>
      {/* Lines of text — static */}
      {[24, 34, 44, 54].map((y, i) => (
        <line key={y} x1="14" y1={y} x2={i === 3 ? 50 : 66} y2={y}
          stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.15 + i * 0.1} />
      ))}
      {/* Wave */}
      <path d="M10,40 Q20,28 30,40 Q40,52 50,40 Q60,28 70,40"
        stroke={color} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <animate attributeName="d"
          values="M10,40 Q20,28 30,40 Q40,52 50,40 Q60,28 70,40;M10,40 Q20,52 30,40 Q40,28 50,40 Q60,52 70,40;M10,40 Q20,28 30,40 Q40,52 50,40 Q60,28 70,40"
          dur="4s" repeatCount="indefinite" />
      </path>
      {/* Pen nib */}
      <g className="penAnim">
        <polygon points="58,14 66,22 52,28" fill={color} opacity="0.9" />
        <line x1="56" y1="20" x2="48" y2="32" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Blinking cursor */}
      <rect className="cursor" x="50" y="51" width="2.5" height="12" rx="1" fill={color} />
    </svg>
  );
}

// ── English Literature: Animated open book with page turn ────────────────
function EnglishLitIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <style>{`
        @keyframes pageTurn { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(0)} }
        @keyframes floatStar { 0%,100%{transform:translateY(0);opacity:0.7} 50%{transform:translateY(-6px);opacity:1} }
        .page { animation: pageTurn 4s ease-in-out infinite; transform-origin: 40px 50px; }
        .star1 { animation: floatStar 2s ease-in-out infinite; }
        .star2 { animation: floatStar 2s 0.7s ease-in-out infinite; }
      `}</style>
      {/* Book spine */}
      <rect x="37" y="18" width="6" height="48" rx="1" fill={color} opacity="0.5" />
      {/* Left page */}
      <path d="M37,20 C30,20 16,24 14,60 L40,60 L40,20 Z" fill={`${color}15`} stroke={color} strokeWidth="1" />
      {/* Right page (animated) */}
      <g className="page">
        <path d="M40,20 L40,60 L66,60 C64,24 50,20 43,20 Z" fill={`${color}30`} stroke={color} strokeWidth="1" />
      </g>
      {/* Text lines on left page */}
      {[28, 35, 42, 49].map(y => (
        <line key={y} x1="20" y1={y} x2="34" y2={y} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      ))}
      {/* Floating stars */}
      <text className="star1" x="8" y="22" fontSize="10" fill={color} opacity="0.7">✦</text>
      <text className="star2" x="62" y="18" fontSize="8" fill={color} opacity="0.6">✦</text>
    </svg>
  );
}

// ── Map + export ─────────────────────────────────────────────────────────
const ICON_MAP = {
  maths: MathsIcon,
  science: ScienceIcon,
  'computer-science': CompSciIcon,
  business: BusinessIcon,
  'english-language': EnglishLangIcon,
  'english-literature': EnglishLitIcon,
};

export default function SubjectIcon({ subject, color = '#00e5a0', size = 72 }) {
  const Icon = ICON_MAP[subject];
  if (!Icon) return null;
  return (
    <div style={{
      width: size, height: size,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      filter: `drop-shadow(0 0 16px ${color}40)`,
      transition: 'filter 0.3s ease, transform 0.3s ease',
      contain: 'layout paint',
      pointerEvents: 'none'
    }}>
      <Icon color={color} size={size} />
    </div>
  );
}
