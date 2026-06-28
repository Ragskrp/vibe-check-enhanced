'use client';

/**
 * Math.js — KaTeX renderer component
 *
 * Usage:
 *   <Math expr="\frac{3}{4} + 1" />          — inline
 *   <Math expr="\frac{3}{4} + 1" block />    — display (centered, larger)
 *
 * Falls back to the raw string if KaTeX fails to parse.
 * Imports KaTeX CSS via the <style> tag so no global CSS changes needed.
 */

import { useMemo } from 'react';

let katex = null;

// Lazy-load katex only on client
function getKatex() {
  if (!katex) {
    try { katex = require('katex'); } catch { katex = null; }
  }
  return katex;
}

export default function Math({ expr, block = false }) {
  const html = useMemo(() => {
    if (!expr) return '';
    const k = getKatex();
    if (!k) return expr;
    try {
      return k.renderToString(expr, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return expr;
    }
  }, [expr, block]);

  return (
    <>
      {/* KaTeX CSS — loaded once, scoped via the component */}
      <style>{`@import url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css');`}</style>
      <span
        dangerouslySetInnerHTML={{ __html: html }}
        style={block ? {
          display: 'block',
          textAlign: 'center',
          overflow: 'auto',
          padding: '4px 0',
        } : {
          display: 'inline',
        }}
      />
    </>
  );
}
