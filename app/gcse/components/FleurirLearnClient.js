'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FleurirLearnClient({ levelData, onComplete }) {
  const [step, setStep] = useState(0); // 0: Opening story, 1: Animated Lesson, 2: Worked Example, 3: Closing story, 4: Unlocked
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [lessonStep, setLessonStep] = useState(0);
  const [workedStep, setWorkedStep] = useState(0);

  const { title, region, locationName, learnLevel } = levelData;
  const { openingScene, lesson, workedExample, closingScene } = learnLevel;

  const nextStep = () => {
    if (step === 0) {
      if (dialogueIdx < openingScene.dialogue.length - 1) {
        setDialogueIdx(prev => prev + 1);
      } else {
        setStep(1);
      }
    } else if (step === 1) {
      if (lessonStep < lesson.conceptText.length - 1) {
        setLessonStep(prev => prev + 1);
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      if (workedStep < workedExample.steps.length - 1) {
        setWorkedStep(prev => prev + 1);
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      if (dialogueIdx < closingScene.dialogue.length - 1) {
        setDialogueIdx(prev => prev + 1);
      } else {
        setStep(4);
      }
    }
  };

  const prevStep = () => {
    if (step === 0) {
      if (dialogueIdx > 0) {
        setDialogueIdx(prev => prev - 1);
      }
    } else if (step === 1) {
      if (lessonStep > 0) {
        setLessonStep(prev => prev - 1);
      } else {
        setStep(0);
        setDialogueIdx(openingScene.dialogue.length - 1);
      }
    } else if (step === 2) {
      if (workedStep > 0) {
        setWorkedStep(prev => prev - 1);
      } else {
        setStep(1);
        setLessonStep(lesson.conceptText.length - 1);
      }
    } else if (step === 3) {
      if (dialogueIdx > 0) {
        setDialogueIdx(prev => prev - 1);
      } else {
        setStep(2);
        setWorkedStep(workedExample.steps.length - 1);
      }
    }
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={tagStyle}>{region.replace(/_/g, ' ')} • {locationName}</div>
        <h1 style={titleStyle}>{title} (Lesson)</h1>
      </div>

      {/* Main Content Area */}
      <div style={cardStyle}>
        {/* Step Indicator */}
        <div style={indicatorContainerStyle}>
          {['Narrative Intro', 'Interactive Lesson', 'Worked Example', 'Narrative Outro'].map((name, i) => (
            <div key={name} style={{
              ...indicatorStepStyle,
              color: step === i ? '#854e60' : '#827475',
              fontWeight: step === i ? '800' : '400'
            }}>
              {name}
            </div>
          ))}
        </div>

        {/* Step Renderings */}
        {step === 0 && (
          <div style={narrativeContainerStyle}>
            <div style={characterNameStyle}>{openingScene.character}</div>
            <p style={dialogueStyle}>"{openingScene.dialogue[dialogueIdx]}"</p>
            <div style={progressDotContainer}>
              {openingScene.dialogue.map((_, i) => (
                <div key={i} style={{
                  ...dotStyle,
                  background: dialogueIdx === i ? '#854e60' : '#d4c2c4'
                }} />
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={lessonContainerStyle}>
            <div style={lessonTextContainer}>
              <BookOpen size={24} color="#7a545a" style={{ marginBottom: 12 }} />
              <p style={conceptTextStyle}>{lesson.conceptText[lessonStep]}</p>
            </div>
            <div style={visualBoxStyle}>
              <div style={visualDescriptionStyle}>
                {lesson.visualCues[lessonStep]?.description}
              </div>
              <div style={expressionStyle}>
                {lesson.visualCues[lessonStep]?.mathsExpression}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={workedContainerStyle}>
            <h3 style={workedQuestionStyle}>Worked Example: {workedExample.question}</h3>
            <div style={workedStepsList}>
              {workedExample.steps.slice(0, workedStep + 1).map((s, idx) => (
                <div key={idx} style={workedStepItemStyle}>
                  <div style={workedStepNum}>Step {idx + 1}</div>
                  <div style={workedStepContent}>
                    <p style={{ margin: '0 0 4px 0', fontSize: 15 }}>{s.explanation}</p>
                    <code style={codeStyle}>{s.mathsExpression}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={narrativeContainerStyle}>
            <div style={characterNameStyle}>{closingScene.character}</div>
            <p style={dialogueStyle}>"{closingScene.dialogue[dialogueIdx] || closingScene.dialogue[0]}"</p>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle2 size={64} color="#9DB58A" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontFamily: 'Playfair Display', color: '#1e1b16', fontSize: 28, marginBottom: 12 }}>
              Lesson Complete
            </h2>
            <p style={{ color: '#504445', fontSize: 16, marginBottom: 24 }}>
              You have restored this segment of the archive. Ready to challenge the Quiz?
            </p>
            <button onClick={onComplete} style={primaryBtnStyle}>
              Start Quiz <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {step < 4 && (
        <div style={controlsContainer}>
          <button 
            onClick={prevStep} 
            disabled={step === 0 && dialogueIdx === 0} 
            style={{ ...btnStyle, opacity: (step === 0 && dialogueIdx === 0) ? 0.4 : 1 }}
          >
            <ArrowLeft size={18} style={{ marginRight: 8 }} /> Back
          </button>
          <button onClick={nextStep} style={primaryBtnStyle}>
            Next <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>
      )}
    </div>
  );
}

// Styling Tokens based on DESIGN.md
const containerStyle = {
  maxWidth: 800,
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: 'DM Sans, sans-serif',
  color: '#1e1b16',
};

const headerStyle = {
  marginBottom: 24,
};

const tagStyle = {
  fontSize: 12,
  fontWeight: '700',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#7a545a',
  fontFamily: 'Nunito Sans, sans-serif',
  marginBottom: 4,
};

const titleStyle = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 32,
  fontWeight: '700',
  color: '#2A2035',
  margin: 0,
};

const cardStyle = {
  background: '#fff8f0',
  border: '1px solid #2A2035',
  borderRadius: 16,
  padding: 32,
  position: 'relative',
  boxShadow: '0 10px 30px rgba(42, 32, 53, 0.04)',
  marginBottom: 24,
};

const indicatorContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #d4c2c4',
  paddingBottom: 16,
  marginBottom: 24,
  fontSize: 13,
  fontFamily: 'Nunito Sans, sans-serif',
};

const indicatorStepStyle = {
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const narrativeContainerStyle = {
  padding: '12px 0',
};

const characterNameStyle = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 20,
  fontWeight: '700',
  color: '#854e60',
  marginBottom: 12,
};

const dialogueStyle = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 18,
  fontStyle: 'italic',
  lineHeight: '1.7',
  color: '#2A2035',
  margin: 0,
};

const progressDotContainer = {
  display: 'flex',
  gap: 8,
  marginTop: 20,
};

const dotStyle = {
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: 'background 0.3s ease',
};

const lessonContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,
};

const lessonTextContainer = {
  background: 'rgba(122, 84, 90, 0.04)',
  padding: 20,
  borderRadius: 12,
  borderLeft: '4px solid #7a545a',
};

const conceptTextStyle = {
  fontSize: 16,
  lineHeight: '1.6',
  margin: 0,
};

const visualBoxStyle = {
  background: '#ffffff',
  border: '1px dashed #827475',
  borderRadius: 12,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 160,
};

const visualDescriptionStyle = {
  fontSize: 14,
  color: '#827475',
  textAlign: 'center',
  marginBottom: 16,
};

const expressionStyle = {
  fontSize: 24,
  fontFamily: 'Playfair Display, serif',
  color: '#2A2035',
  fontWeight: '700',
};

const workedContainerStyle = {
  padding: '8px 0',
};

const workedQuestionStyle = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 20,
  color: '#2A2035',
  margin: '0 0 20px 0',
};

const workedStepsList = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const workedStepItemStyle = {
  display: 'flex',
  gap: 16,
  background: '#ffffff',
  border: '1px solid #d4c2c4',
  borderRadius: 12,
  padding: 16,
};

const workedStepNum = {
  background: '#854e60',
  color: '#ffffff',
  fontSize: 11,
  fontWeight: '700',
  height: 24,
  padding: '0 10px',
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Nunito Sans, sans-serif',
  textTransform: 'uppercase',
};

const workedStepContent = {
  flex: 1,
};

const codeStyle = {
  display: 'block',
  background: '#f4ede3',
  padding: '8px 12px',
  borderRadius: 6,
  fontFamily: 'monospace',
  fontSize: 15,
  color: '#7a545a',
  marginTop: 8,
};

const controlsContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const btnStyle = {
  background: 'transparent',
  border: '1px solid #2A2035',
  color: '#2A2035',
  padding: '12px 24px',
  borderRadius: 9999,
  fontSize: 16,
  fontWeight: '600',
  fontFamily: 'Nunito Sans, sans-serif',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const primaryBtnStyle = {
  background: '#854e60',
  border: 'none',
  color: '#ffffff',
  padding: '12px 28px',
  borderRadius: 9999,
  fontSize: 16,
  fontWeight: '600',
  fontFamily: 'Nunito Sans, sans-serif',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(133, 78, 96, 0.2)',
};
