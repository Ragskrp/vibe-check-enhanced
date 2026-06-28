'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Map region → background image
const SCENE_BG = {
  library_of_numerals: '/gcse/bg-library.png',
  fraction_gallery:    '/gcse/bg-fractions.png',
};
const DEFAULT_BG = '/gcse/bg-library.png';

// Typewriter hook
function useTypewriter(text, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    clearInterval(ref.current);
    ref.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(ref.current);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(ref.current);
  }, [text, speed]);

  function skip() {
    clearInterval(ref.current);
    setDisplayed(text);
    setDone(true);
  }

  return { displayed, done, skip };
}

// Phase labels for the progress bar
const PHASES = ['Story Begins', 'The Lesson', 'Worked Example', 'Story Ends'];

export default function FleurirLearnClient({ levelData, onComplete }) {
  const [step, setStep] = useState(0);      // 0 opening | 1 lesson | 2 example | 3 closing
  const [subIdx, setSubIdx] = useState(0);  // index within step
  const [sceneKey, setSceneKey] = useState(0); // triggers fade

  const { title, region, locationName, learnLevel } = levelData;
  const { openingScene, lesson, workedExample, closingScene } = learnLevel;
  const bg = SCENE_BG[region] || DEFAULT_BG;

  // resolve current text for typewriter
  const currentText = (() => {
    if (step === 0) return openingScene.dialogue[subIdx] || '';
    if (step === 1) return lesson.conceptText[subIdx] || '';
    if (step === 2) {
      const s = workedExample.steps[subIdx];
      return s ? `${s.explanation}\n\n${s.mathsExpression}` : '';
    }
    if (step === 3) return closingScene.dialogue[subIdx] || '';
    return '';
  })();

  const { displayed, done, skip } = useTypewriter(currentText, 22);

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
      setSceneKey(k => k + 1);
    } else if (step < 3) {
      setStep(s => s + 1);
      setSubIdx(0);
      setSceneKey(k => k + 1);
    } else {
      onComplete?.();
    }
  }

  const isNarrative = step === 0 || step === 3;
  const isLesson    = step === 1;
  const isExample   = step === 2;

  // lesson visual cue
  const visualCue = isLesson ? lesson.visualCues?.[subIdx] : null;
  // example step
  const exStep = isExample ? workedExample.steps[subIdx] : null;
  const exTotal = workedExample.steps.length;

  return (
    <>
      {/* ── global keyframes injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;600&family=Nunito+Sans:wght@700&display=swap');

        @keyframes sceneFadeIn {
          from { opacity: 0; transform: scale(1.02); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pageTurn {
          from { opacity: 0; transform: rotateY(-8deg) translateX(-20px); }
          to   { opacity: 1; transform: rotateY(0deg)  translateX(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(133,78,96,0.3); }
          50%       { box-shadow: 0 0 40px rgba(133,78,96,0.6); }
        }

        .scene-fade    { animation: sceneFadeIn 0.7s ease both; }
        .slide-up      { animation: slideUp 0.5s ease both; }
        .arith-float   { animation: float 4s ease-in-out infinite; }
        .cursor-blink  { animation: blink 1s step-end infinite; }
        .page-turn     { animation: pageTurn 0.5s ease both; }
        .glow-pulse    { animation: glowPulse 2.5s ease-in-out infinite; }

        .continue-hint {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-family: 'Nunito Sans', sans-serif;
          color: rgba(255,248,240,0.6); letter-spacing: 0.06em;
          margin-top: 14px;
        }
        .continue-hint span { animation: blink 1.2s step-end infinite; }

        .progress-track {
          display: flex; gap: 8px; align-items: center;
        }
        .progress-dot {
          width: 8px; height: 8px; border-radius: 50%;
          transition: all 0.3s ease;
        }
        .dialogue-panel {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .lesson-card {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .option-btn:hover {
          transform: translateX(4px);
          border-color: #854e60 !important;
        }
      `}</style>

      <div style={S.root}>
        {/* ══ SCENE BACKGROUND ══ */}
        <div key={`bg-${step}`} className="scene-fade" style={S.bgWrap}>
          <Image
            src={bg}
            alt={locationName}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Vignette overlay */}
          <div style={S.vignette} />
          {/* Dark gradient at bottom for readability */}
          <div style={S.bottomGradient} />
        </div>

        {/* ══ TOP HUD ══ */}
        <div style={S.hud}>
          <div style={S.hudLeft}>
            <span style={S.hudRegion}>{locationName}</span>
            <span style={S.hudTitle}>{title}</span>
          </div>
          <div className="progress-track">
            {PHASES.map((ph, i) => (
              <div
                key={ph}
                title={ph}
                className="progress-dot"
                style={{
                  background: i < step ? '#9DB58A' : i === step ? '#854e60' : 'rgba(255,255,255,0.2)',
                  width: i === step ? 10 : 8,
                  height: i === step ? 10 : 8,
                  boxShadow: i === step ? '0 0 8px #854e60' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* ══ CHARACTER — narrative steps ══ */}
        {isNarrative && (
          <div key={`char-${step}`} className="slide-up" style={S.characterWrap}>
            <div className="arith-float">
              <Image
                src="/gcse/arith.png"
                alt="Arith"
                width={280}
                height={420}
                style={{ objectFit: 'contain', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))' }}
                priority
              />
            </div>
          </div>
        )}

        {/* ══ LESSON CONTENT CARD ══ */}
        {isLesson && (
          <div key={`lesson-${subIdx}`} className="page-turn lesson-card" style={S.lessonCard}>
            <p style={S.lessonEyebrow}>✦ Concept {subIdx + 1} of {lesson.conceptText.length}</p>
            <p style={S.lessonText}>{displayed}</p>
            {visualCue && done && (
              <div className="slide-up" style={S.visualCue}>
                <p style={S.visualDesc}>{visualCue.description}</p>
                <code style={S.mathExpr}>{visualCue.mathsExpression}</code>
              </div>
            )}
          </div>
        )}

        {/* ══ WORKED EXAMPLE CARD ══ */}
        {isExample && (
          <div key={`ex-${subIdx}`} className="page-turn lesson-card" style={S.lessonCard}>
            <p style={S.lessonEyebrow}>
              ✦ Worked Example — Step {subIdx + 1} of {exTotal}
            </p>
            <p style={S.workedQ}>{workedExample.question}</p>
            {/* steps revealed so far */}
            {workedExample.steps.slice(0, subIdx + 1).map((s, i) => (
              <div key={i} className={i === subIdx ? 'slide-up' : ''} style={S.exStepRow}>
                <span style={S.exStepNum}>Step {i + 1}</span>
                <div>
                  <p style={S.exExplanation}>{i === subIdx ? displayed.split('\n\n')[0] : s.explanation}</p>
                  {(i < subIdx || done) && (
                    <code style={S.mathExpr}>{s.mathsExpression}</code>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ DIALOGUE BOX (narrative steps) ══ */}
        {isNarrative && (
          <div key={`dlg-${step}-${subIdx}`} className="slide-up dialogue-panel" style={S.dialogueBox}>
            <div style={S.nameTag}>{isNarrative ? (step === 0 ? openingScene.character : closingScene.character) : ''}</div>
            <p style={S.dialogueText}>{displayed}</p>
            <div className="continue-hint" onClick={advance} style={{ cursor: 'pointer' }}>
              {done ? (
                <>Click to continue <span>▶</span></>
              ) : (
                <>Reading… <span style={{ cursor: 'pointer' }} onClick={skip}>Skip ▶</span></>
              )}
            </div>
          </div>
        )}

        {/* ══ ADVANCE BUTTON (lesson / example) ══ */}
        {(isLesson || isExample) && (
          <div style={S.advanceRow}>
            <button
              className="glow-pulse"
              onClick={advance}
              style={{ ...S.advanceBtn, opacity: done ? 1 : 0.6 }}
            >
              {done
                ? (step === 3 || (step === 2 && subIdx >= exTotal - 1 && subIdx >= lesson.conceptText.length - 1)
                    ? 'Continue Story ↓'
                    : 'Next →')
                : 'Reading…'}
            </button>
          </div>
        )}

        {/* ══ CLICK ZONE for narrative ══ */}
        {isNarrative && (
          <div onClick={advance} style={S.clickZone} />
        )}
      </div>
    </>
  );
}

/* ── Styles ─────────────────────────────────────────────────── */
const S = {
  root: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden',
    fontFamily: "'DM Sans', sans-serif",
    color: '#fff8f0',
    display: 'flex',
    flexDirection: 'column',
  },
  bgWrap: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,6,20,0.7) 100%)',
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    background: 'linear-gradient(to top, rgba(10,6,20,0.95) 0%, transparent 100%)',
    zIndex: 1,
  },
  // HUD
  hud: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px 28px',
  },
  hudLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  hudRegion: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,248,240,0.5)',
  },
  hudTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#fff8f0',
    textShadow: '0 2px 12px rgba(0,0,0,0.6)',
  },
  // Character
  characterWrap: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '8vw',
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 200,
  },
  // Dialogue box
  dialogueBox: {
    position: 'relative',
    zIndex: 10,
    margin: '0 auto 32px',
    width: '90%',
    maxWidth: 720,
    background: 'rgba(10, 6, 20, 0.82)',
    border: '1px solid rgba(133,78,96,0.5)',
    borderRadius: 16,
    padding: '20px 28px 16px',
  },
  nameTag: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 14,
    fontWeight: 700,
    color: '#E8B4C8',
    letterSpacing: '0.05em',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  dialogueText: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 1.75,
    color: '#fff8f0',
    margin: 0,
    minHeight: 56,
  },
  // Lesson card
  lessonCard: {
    position: 'relative',
    zIndex: 10,
    margin: '32px auto',
    width: '90%',
    maxWidth: 780,
    background: 'rgba(42, 28, 55, 0.88)',
    border: '1px solid rgba(200,180,212,0.25)',
    borderRadius: 20,
    padding: '28px 36px',
    flex: 1,
  },
  lessonEyebrow: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#C8B4D4',
    margin: '0 0 14px',
  },
  lessonText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 17,
    lineHeight: 1.8,
    color: '#fff8f0',
    margin: '0 0 20px',
    minHeight: 80,
  },
  visualCue: {
    background: 'rgba(255,248,240,0.05)',
    border: '1px dashed rgba(200,180,212,0.3)',
    borderRadius: 12,
    padding: '16px 20px',
    marginTop: 8,
  },
  visualDesc: {
    fontSize: 13,
    color: '#C8B4D4',
    margin: '0 0 10px',
    lineHeight: 1.6,
  },
  mathExpr: {
    display: 'block',
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    color: '#F5C870',
    background: 'rgba(245,200,112,0.08)',
    padding: '10px 14px',
    borderRadius: 8,
    letterSpacing: '0.04em',
  },
  // Worked example
  workedQ: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontSize: 16,
    color: '#E8B4C8',
    margin: '0 0 20px',
    paddingBottom: 16,
    borderBottom: '1px solid rgba(200,180,212,0.2)',
  },
  exStepRow: {
    display: 'flex',
    gap: 14,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  exStepNum: {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 11,
    fontWeight: 800,
    color: '#fff',
    background: '#854e60',
    padding: '3px 10px',
    borderRadius: 99,
    whiteSpace: 'nowrap',
    marginTop: 2,
  },
  exExplanation: {
    fontSize: 15,
    color: '#fff8f0',
    margin: '0 0 8px',
    lineHeight: 1.6,
  },
  // Advance button
  advanceRow: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px 40px',
  },
  advanceBtn: {
    background: 'linear-gradient(135deg, #854e60, #a8607a)',
    border: 'none',
    color: '#fff8f0',
    padding: '14px 36px',
    borderRadius: 9999,
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "'Nunito Sans', sans-serif",
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'transform 0.15s ease',
  },
  // Invisible click zone overlay for narrative
  clickZone: {
    position: 'fixed',
    inset: 0,
    zIndex: 5,
    cursor: 'pointer',
  },
};
