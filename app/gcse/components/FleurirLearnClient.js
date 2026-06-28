'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ── Scene backgrounds per region ──────────────────────────────
const SCENE_BG = {
  library_of_numerals: '/gcse/bg-library.png',
  fraction_gallery:    '/gcse/bg-fractions.png',
};
const DEFAULT_BG = '/gcse/bg-library.png';

// ── Typewriter hook ───────────────────────────────────────────
function useTypewriter(text, speed = 25) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone]           = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer.current); setDone(true); }
    }, speed);
    return () => clearInterval(timer.current);
  }, [text, speed]);

  function skip() { clearInterval(timer.current); setDisplayed(text); setDone(true); }
  return { displayed, done, skip };
}

// ── Phase config ──────────────────────────────────────────────
const PHASES = [
  { label: 'Story Begins', icon: '📖' },
  { label: 'The Lesson',   icon: '✏️' },
  { label: 'Worked Example', icon: '🔍' },
  { label: 'Story Ends',   icon: '✨' },
];

export default function FleurirLearnClient({ levelData, onComplete }) {
  const [step,      setStep]      = useState(0);   // 0 opening | 1 lesson | 2 example | 3 closing
  const [subIdx,    setSubIdx]    = useState(0);
  const [fadeKey,   setFadeKey]   = useState(0);   // triggers card re-animation

  const { title, region, locationName, learnLevel } = levelData;
  const { openingScene, lesson, workedExample, closingScene } = learnLevel;
  const bg = SCENE_BG[region] || DEFAULT_BG;

  const isNarrative = step === 0 || step === 3;
  const isLesson    = step === 1;
  const isExample   = step === 2;

  // Resolve text for typewriter
  const currentText = (() => {
    if (step === 0) return openingScene.dialogue[subIdx] || '';
    if (step === 1) return lesson.conceptText[subIdx] || '';
    if (step === 2) return workedExample.steps[subIdx]?.explanation || '';
    if (step === 3) return closingScene.dialogue[subIdx] || '';
    return '';
  })();

  const { displayed, done, skip } = useTypewriter(currentText, 20);

  function advance() {
    if (!done) { skip(); return; }
    const limits = [
      openingScene.dialogue.length,
      lesson.conceptText.length,
      workedExample.steps.length,
      closingScene.dialogue.length,
    ];
    if (subIdx < limits[step] - 1) {
      setSubIdx(s => s + 1);
      setFadeKey(k => k + 1);
    } else if (step < 3) {
      setStep(s => s + 1);
      setSubIdx(0);
      setFadeKey(k => k + 1);
    } else {
      onComplete?.();
    }
  }

  function back() {
    if (subIdx > 0) {
      setSubIdx(s => s - 1);
      setFadeKey(k => k + 1);
    } else if (step > 0) {
      const limits = [
        openingScene.dialogue.length,
        lesson.conceptText.length,
        workedExample.steps.length,
        closingScene.dialogue.length,
      ];
      setStep(s => s - 1);
      setSubIdx(limits[step - 1] - 1);
      setFadeKey(k => k + 1);
    }
  }

  const canGoBack  = step > 0 || subIdx > 0;
  const isLastCard = step === 3 && subIdx === closingScene.dialogue.length - 1;

  const visualCue  = isLesson  ? lesson.visualCues?.[subIdx]          : null;
  const exStep     = isExample ? workedExample.steps[subIdx]          : null;
  const charName   = step === 0 ? openingScene.character : step === 3 ? closingScene.character : 'Arith';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Nunito+Sans:wght@600;700;800&display=swap');

        .fleurir-page {
          min-height: 100vh;
          background-color: #fff8f0;
          background-image: radial-gradient(circle, #d4c2c480 1px, transparent 1px);
          background-size: 28px 28px;
          font-family: 'DM Sans', sans-serif;
          color: #1e1b16;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pageReveal {
          from { opacity: 0; transform: translateX(-12px) rotateY(-4deg); }
          to   { opacity: 1; transform: translateX(0)    rotateY(0);      }
        }
        @keyframes floatChar {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes shimmerBorder {
          0%   { border-color: rgba(133,78,96,0.3); }
          50%  { border-color: rgba(133,78,96,0.8); }
          100% { border-color: rgba(133,78,96,0.3); }
        }
        @keyframes sceneWarp {
          from { opacity: 0; filter: blur(4px); }
          to   { opacity: 1; filter: blur(0);   }
        }

        .fade-slide-up  { animation: fadeSlideUp 0.5s ease both; }
        .page-reveal    { animation: pageReveal  0.55s ease both; }
        .float-char     { animation: floatChar 4.5s ease-in-out infinite; }
        .blink-cursor   { animation: blinkCursor 1.1s step-end infinite; }
        .shimmer-border { animation: shimmerBorder 2.5s ease-in-out infinite; }
        .scene-in       { animation: sceneWarp 0.7s ease both; }

        .advance-btn {
          background: #854e60;
          color: #fff8f0;
          border: none;
          padding: 13px 32px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Nunito Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(133,78,96,0.25);
        }
        .advance-btn:hover { background: #6e3f50; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(133,78,96,0.35); }
        .advance-btn:active { transform: translateY(0); }

        .back-btn {
          background: transparent;
          color: #7a545a;
          border: 1.5px solid #d4c2c4;
          padding: 12px 24px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Nunito Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }
        .back-btn:hover { border-color: #7a545a; color: #2A2035; }

        .phase-pip {
          width: 8px; height: 8px; border-radius: 50%;
          transition: all 0.35s ease;
          cursor: default;
        }

        .scene-img-wrap {
          position: relative;
          width: 100%;
          height: 240px;
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .scene-img-wrap-small {
          position: relative;
          height: 140px;
          border-radius: 14px;
          overflow: hidden;
        }
      `}</style>

      <div className="fleurir-page">

        {/* ══ TOP NAV ════════════════════════════════════════ */}
        <nav style={S.nav}>
          <Link href="/gcse/maths" style={S.navBack}>← Back to Arithmia</Link>
          <div style={S.navCenter}>
            <span style={S.navEyebrow}>📍 {locationName}</span>
          </div>
          <div style={S.navRight}>
            {/* Phase pips */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {PHASES.map((ph, i) => (
                <div
                  key={ph.label}
                  className="phase-pip"
                  title={ph.label}
                  style={{
                    background: i < step  ? '#9DB58A'
                               : i === step ? '#854e60'
                               : '#d4c2c4',
                    width:  i === step ? 10 : 8,
                    height: i === step ? 10 : 8,
                    boxShadow: i === step ? '0 0 8px rgba(133,78,96,0.6)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* ══ CONTENT AREA ═══════════════════════════════════ */}
        <main style={S.main}>

          {/* ── Heading ── */}
          <div style={S.headingRow}>
            <div>
              <p style={S.eyebrow}>{region.replace(/_/g, ' ')}</p>
              <h1 style={S.heading}>{title}</h1>
            </div>
            <div style={S.phaseLabel}>
              {PHASES[step].icon} {PHASES[step].label}
            </div>
          </div>

          {/* ── NARRATIVE STEPS (opening / closing) ── */}
          {isNarrative && (
            <div key={`narrative-${step}-${subIdx}-${fadeKey}`} style={S.narrativeLayout}>

              {/* Scene illustration */}
              <div className="scene-img-wrap scene-in">
                <Image src={bg} alt={locationName} fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }} priority />
                {/* Subtle bottom fade */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,248,240,0.6) 0%, transparent 60%)', pointerEvents: 'none' }} />
              </div>

              {/* Character portrait + dialogue side by side */}
              <div style={S.narrativeBody}>

                {/* Arith portrait */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div className="float-char shimmer-border" style={S.portraitCircle}>
                    <Image
                      src="/gcse/arith-portrait.png"
                      alt="Arith"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      priority
                    />
                  </div>
                  <span style={S.portraitLabel}>{charName.toUpperCase()}</span>
                </div>

                {/* Dialogue card */}
                <div className="page-reveal" style={S.dialogueCard}>
                  {/* Dialogue dots */}
                  <div style={S.dialogueDots}>
                    {(step === 0 ? openingScene.dialogue : closingScene.dialogue).map((_, i) => (
                      <div key={i} style={{
                        width: subIdx === i ? 20 : 7,
                        height: 7,
                        borderRadius: 9999,
                        background: subIdx === i ? '#854e60' : '#d4c2c4',
                        transition: 'all 0.3s ease',
                      }} />
                    ))}
                  </div>

                  <p style={S.dialogueText}>
                    "{displayed}"
                    {!done && <span className="blink-cursor" style={{ color: '#854e60' }}>|</span>}
                  </p>

                  {/* Skip hint */}
                  {!done && (
                    <button onClick={skip} style={S.skipBtn}>Skip ▶</button>
                  )}
                  {done && (
                    <p style={S.clickHint}>
                      {isLastCard ? 'You\'ve reached the end of this chapter.' : 'Click anywhere to continue ›'}
                    </p>
                  )}
                </div>
              </div>

              {/* invisible click zone */}
              {done && (
                <div onClick={advance} style={S.clickZone} />
              )}
            </div>
          )}

          {/* ── LESSON STEP ── */}
          {isLesson && (
            <div key={`lesson-${subIdx}-${fadeKey}`} style={S.lessonLayout}>

              {/* Small scene banner + character */}
              <div style={S.lessonSidePanel}>
                <div className="scene-img-wrap-small scene-in" style={{ position: 'relative', height: 140, borderRadius: 14, overflow: 'hidden' }}>
                  <Image src={bg} alt={locationName} fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <div className="float-char shimmer-border" style={S.portraitCircleSmall}>
                    <Image src="/gcse/arith-portrait.png" alt="Arith" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                  </div>
                  <span style={S.portraitLabel}>ARITH</span>
                </div>
                {/* Sub-step indicator */}
                <div style={{ textAlign: 'center', marginTop: 8 }}>
                  <span style={S.lessonCounter}>Concept {subIdx + 1} / {lesson.conceptText.length}</span>
                </div>
              </div>

              {/* Lesson content */}
              <div className="page-reveal" style={S.lessonCard}>
                <div style={S.lessonCardInner}>
                  <p style={S.lessonEyebrow}>✦ The Knowledge</p>
                  <p style={S.lessonBody}>{displayed}{!done && <span className="blink-cursor" style={{ color: '#854e60' }}>|</span>}</p>

                  {visualCue && done && (
                    <div className="fade-slide-up" style={S.visualCueBox}>
                      <p style={S.visualDesc}>{visualCue.description}</p>
                      <code style={S.mathCode}>{visualCue.mathsExpression}</code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── WORKED EXAMPLE STEP ── */}
          {isExample && (
            <div key={`example-${subIdx}-${fadeKey}`} style={S.lessonLayout}>

              {/* side panel */}
              <div style={S.lessonSidePanel}>
                <div className="float-char shimmer-border" style={S.portraitCircleSmall}>
                  <Image src="/gcse/arith-portrait.png" alt="Arith" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                <span style={S.portraitLabel}>ARITH</span>
                <div style={{ textAlign: 'center', marginTop: 12 }}>
                  <span style={S.lessonCounter}>Step {subIdx + 1} / {workedExample.steps.length}</span>
                </div>
                {/* Small progress bar */}
                <div style={{ marginTop: 8, height: 4, borderRadius: 99, background: '#d4c2c4', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${((subIdx + 1) / workedExample.steps.length) * 100}%`,
                    background: '#854e60',
                    borderRadius: 99,
                    transition: 'width 0.4s ease',
                  }} />
                </div>
              </div>

              {/* example card */}
              <div className="page-reveal" style={S.lessonCard}>
                <div style={S.lessonCardInner}>
                  <p style={S.lessonEyebrow}>🔍 Worked Example</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 16, color: '#7a545a', margin: '0 0 20px', paddingBottom: 16, borderBottom: '1px solid #e8e2d8' }}>
                    {workedExample.question}
                  </p>

                  {/* Reveal steps one by one */}
                  {workedExample.steps.slice(0, subIdx + 1).map((s, i) => (
                    <div key={i} className={i === subIdx ? 'fade-slide-up' : ''} style={S.exStepRow}>
                      <span style={S.exStepBadge}>Step {i + 1}</span>
                      <div style={{ flex: 1 }}>
                        <p style={S.exExplanation}>
                          {i === subIdx ? displayed : s.explanation}
                          {i === subIdx && !done && <span className="blink-cursor" style={{ color: '#854e60' }}>|</span>}
                        </p>
                        {(i < subIdx || done) && (
                          <code style={S.mathCode}>{s.mathsExpression}</code>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ NAVIGATION CONTROLS ════════════════════════════ */}
          <div style={S.controls}>
            <button className="back-btn" onClick={back} disabled={!canGoBack} style={{ opacity: canGoBack ? 1 : 0.35 }}>
              ← Back
            </button>
            <button className="advance-btn" onClick={advance}>
              {!done            ? 'Reading…'
               : isLastCard     ? 'Begin Quiz →'
               : step < 3 && subIdx === (step === 0 ? openingScene.dialogue.length : step === 1 ? lesson.conceptText.length : workedExample.steps.length) - 1
                                ? 'Next Chapter →'
               : 'Continue →'}
            </button>
          </div>

        </main>
      </div>
    </>
  );
}

/* ── Design tokens ────────────────────────────────────────────── */
const S = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    borderBottom: '1px solid #e8e2d8',
    background: 'rgba(255,248,240,0.9)',
    position: 'sticky',
    top: 0,
    zIndex: 20,
    backdropFilter: 'blur(8px)',
  },
  navBack: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: '#7a545a',
    textDecoration: 'none',
    letterSpacing: '0.02em',
  },
  navCenter: {
    textAlign: 'center',
  },
  navEyebrow: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#827475',
    margin: 0,
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  main: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '32px 24px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  headingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
  },
  eyebrow: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#854e60',
    margin: '0 0 4px',
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32,
    fontWeight: 700,
    color: '#2A2035',
    margin: 0,
  },
  phaseLabel: {
    background: '#fff8f0',
    border: '1px solid #e8e2d8',
    borderRadius: 9999,
    padding: '6px 16px',
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    color: '#504445',
    letterSpacing: '0.04em',
    alignSelf: 'flex-start',
  },

  // ── Narrative layout ──
  narrativeLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  narrativeBody: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    gap: 20,
    alignItems: 'flex-start',
  },
  portraitCircle: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #854e60',
    boxShadow: '0 8px 24px rgba(133,78,96,0.25)',
  },
  portraitCircleSmall: {
    position: 'relative',
    width: 88,
    height: 88,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2.5px solid #854e60',
    boxShadow: '0 4px 16px rgba(133,78,96,0.2)',
  },
  portraitLabel: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.12em',
    color: '#827475',
    textTransform: 'uppercase',
  },
  dialogueCard: {
    background: '#ffffff',
    border: '1px solid #e8e2d8',
    borderRadius: 16,
    padding: '24px 28px',
    boxShadow: '0 4px 24px rgba(42,32,53,0.06)',
    position: 'relative',
  },
  dialogueDots: {
    display: 'flex',
    gap: 6,
    marginBottom: 14,
    alignItems: 'center',
  },
  dialogueText: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontSize: 18,
    lineHeight: 1.8,
    color: '#2A2035',
    margin: 0,
    minHeight: 72,
  },
  skipBtn: {
    background: 'none',
    border: 'none',
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 12,
    color: '#854e60',
    cursor: 'pointer',
    marginTop: 12,
    padding: 0,
    letterSpacing: '0.04em',
    fontWeight: 700,
  },
  clickHint: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 12,
    color: '#827475',
    margin: '12px 0 0',
    letterSpacing: '0.04em',
  },
  clickZone: {
    position: 'fixed',
    inset: 0,
    zIndex: 5,
    cursor: 'pointer',
  },

  // ── Lesson layout ──
  lessonLayout: {
    display: 'grid',
    gridTemplateColumns: '160px 1fr',
    gap: 20,
    alignItems: 'flex-start',
  },
  lessonSidePanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  lessonCounter: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: '#827475',
    letterSpacing: '0.06em',
  },
  lessonCard: {
    background: '#ffffff',
    border: '1px solid #e8e2d8',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(42,32,53,0.06)',
    overflow: 'hidden',
  },
  lessonCardInner: {
    padding: '28px 32px',
    borderLeft: '4px solid #854e60',
  },
  lessonEyebrow: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#854e60',
    margin: '0 0 12px',
  },
  lessonBody: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 17,
    lineHeight: 1.8,
    color: '#1e1b16',
    margin: '0 0 20px',
    minHeight: 80,
  },
  visualCueBox: {
    background: '#faf3e9',
    border: '1px solid #e8e2d8',
    borderRadius: 12,
    padding: '16px 20px',
  },
  visualDesc: {
    fontSize: 13,
    color: '#504445',
    margin: '0 0 10px',
    lineHeight: 1.6,
  },
  mathCode: {
    display: 'block',
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#7b5900',
    letterSpacing: '0.04em',
    background: 'transparent',
  },

  // ── Example steps ──
  exStepRow: {
    display: 'flex',
    gap: 14,
    marginBottom: 16,
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottom: '1px solid #f4ede3',
  },
  exStepBadge: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 800,
    background: '#854e60',
    color: '#ffffff',
    padding: '3px 12px',
    borderRadius: 9999,
    whiteSpace: 'nowrap',
    marginTop: 2,
    letterSpacing: '0.04em',
  },
  exExplanation: {
    fontSize: 15,
    lineHeight: 1.7,
    color: '#1e1b16',
    margin: '0 0 10px',
  },

  // ── Controls ──
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
};
