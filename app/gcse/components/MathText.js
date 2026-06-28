'use client';

/**
 * MathText.js — Smart mixed text + KaTeX renderer
 *
 * Splits a string into plain-text segments and LaTeX segments,
 * renders LaTeX through KaTeX and leaves plain text untouched.
 *
 * Usage:
 *   <MathText text="Evaluate: 8 + 12 \div 4 \times 2" />
 *   <MathText text="Convert \frac{7}{8} to a decimal." />
 *   <MathText text="Plain question with no maths?" />
 *   <MathText text="\frac{3}{4}" block />   — pure math, display mode
 *
 * Segments are split on LaTeX tokens — any sequence starting with \
 * followed by a command name and optional brace args.
 */

import { useMemo } from 'react';

let _katex = null;
function getKatex() {
  if (!_katex) { try { _katex = require('katex'); } catch {} }
  return _katex;
}

// ── Parser: split string into [{type:'text'|'math', value}] ──
function parseMathText(str) {
  if (!str) return [];

  // Matches LaTeX tokens:
  //   \command         — e.g. \div \times \sqrt
  //   \command{a}      — e.g. \frac{1}{2} (handles nested braces up to 2 deep)
  //   \command{a}{b}   — two-arg commands like \frac
  //   ^{expr}, _{expr} — superscripts/subscripts
  //   \mathbb{Z}, \text{...}
  const MATH_TOKEN = /\\[a-zA-Z]+(?:\{(?:[^{}]|\{[^{}]*\})*\})*(?:\{(?:[^{}]|\{[^{}]*\})*\})?(?:[_^](?:\{[^}]*\}|[^\s{]))?/g;

  const parts = [];
  let last = 0;
  let m;

  while ((m = MATH_TOKEN.exec(str)) !== null) {
    // text before this match
    if (m.index > last) {
      parts.push({ type: 'text', value: str.slice(last, m.index) });
    }
    parts.push({ type: 'math', value: m[0] });
    last = m.index + m[0].length;
  }

  // remaining text
  if (last < str.length) {
    parts.push({ type: 'text', value: str.slice(last) });
  }

  return parts.length ? parts : [{ type: 'text', value: str }];
}

// ── Render a single LaTeX token to HTML ──
function renderLatex(expr, block = false) {
  const k = getKatex();
  if (!k) return expr;
  try {
    return k.renderToString(expr, { displayMode: block, throwOnError: false, strict: false });
  } catch {
    return expr;
  }
}

// ── Main component ──
export default function MathText({ text, block = false }) {
  const segments = useMemo(() => parseMathText(String(text ?? '')), [text]);

  // Pure math (single math segment, no surrounding text) → display mode
  const isPureMath = segments.length === 1 && segments[0].type === 'math';

  return (
    <>
      <style>{`@import url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css');`}</style>
      {isPureMath && block ? (
        <span
          dangerouslySetInnerHTML={{ __html: renderLatex(segments[0].value, true) }}
          style={{ display: 'block', textAlign: 'center', overflowX: 'auto', padding: '4px 0' }}
        />
      ) : (
        <span>
          {segments.map((seg, i) =>
            seg.type === 'text' ? (
              <span key={i}>{seg.value}</span>
            ) : (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: renderLatex(seg.value, false) }}
                style={{ display: 'inline' }}
              />
            )
          )}
        </span>
      )}
    </>
  );
}
