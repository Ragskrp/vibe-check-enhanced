'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Trophy } from 'lucide-react';

export default function ExamSimulator({ questions }) {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let interval;
    if (started && !submitted && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !submitted) {
      setSubmitted(true);
    }
    return () => clearInterval(interval);
  }, [started, submitted, timeLeft]);

  const handleStart = () => setStarted(true);

  const handleSubmit = () => {
    if (confirm("Are you sure you want to submit your paper?")) {
      setSubmitted(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      const uAns = answers[i]?.toString().trim().toLowerCase();
      const cAns = q.answer?.toString().trim().toLowerCase();
      if (uAns === cAns) correct++;
      // For MCQ numeric
      if (q.options && typeof q.answer === 'number' && parseInt(uAns) === q.answer) correct++;
    });
    return correct;
  };

  if (!started) {
    return (
      <div className="card" style={{ padding: 40, textAlign: 'center', borderRadius: 24 }}>
        <div style={{ width: 80, height: 80, background: 'rgba(255,45,120,0.1)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Clock size={40} color="#ff2d78" />
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 16 }}>Mock Exam Simulator</h1>
        <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          You are about to start a 45-minute strict mock exam consisting of {questions.length} questions spanning all your subjects.
          Feedback will NOT be provided until you submit the paper.
        </p>
        <button onClick={handleStart} className="btn-primary" style={{ fontSize: 18, padding: '16px 40px' }}>
          Begin Exam
        </button>
      </div>
    );
  }

  if (submitted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    let grade = 'U';
    if (percentage > 85) grade = '9';
    else if (percentage > 75) grade = '8';
    else if (percentage > 65) grade = '7';
    else if (percentage > 55) grade = '6';
    else if (percentage > 45) grade = '5';
    else if (percentage > 35) grade = '4';
    else if (percentage > 25) grade = '3';
    else if (percentage > 15) grade = '2';
    else if (percentage > 5) grade = '1';

    return (
      <div className="animate-fade-in">
        <div className="card" style={{ padding: 40, textAlign: 'center', borderRadius: 24, marginBottom: 32, background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(177,74,237,0.1))' }}>
          <Trophy size={48} color="#00d4ff" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Exam Completed</h2>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#00ff94', lineHeight: 1 }}>{score} / {questions.length}</div>
          <div style={{ fontSize: 20, color: '#00d4ff', fontWeight: 800, marginTop: 16 }}>Predicted Grade: {grade}</div>
        </div>

        <h3 style={{ color: '#fff', fontSize: 24, marginBottom: 20 }}>Mark Scheme & Review</h3>
        {questions.map((q, i) => {
          const uAns = answers[i]?.toString().trim().toLowerCase();
          const cAns = q.answer?.toString().trim().toLowerCase();
          let isCorrect = uAns === cAns;
          if (q.options && typeof q.answer === 'number' && parseInt(uAns) === q.answer) isCorrect = true;

          return (
            <div key={i} className="card" style={{ padding: 24, borderRadius: 16, marginBottom: 16, borderLeft: `4px solid ${isCorrect ? '#00ff94' : '#ff2d78'}` }}>
              <div style={{ fontSize: 12, color: '#888', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
                Q{i + 1} • {q.subjectId} • {q.topicTitle}
              </div>
              <div style={{ fontSize: 18, color: '#fff', fontWeight: 600, marginBottom: 16 }}>{q.display}</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ color: '#aaa', width: 100 }}>Your Answer:</span>
                <span style={{ color: isCorrect ? '#00ff94' : '#ff2d78', fontWeight: 700 }}>
                  {answers[i] || 'No answer provided'}
                </span>
                {isCorrect ? <CheckCircle size={18} color="#00ff94" /> : <XCircle size={18} color="#ff2d78" />}
              </div>
              
              {!isCorrect && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#aaa', width: 100 }}>Correct Answer:</span>
                  <span style={{ color: '#00ff94', fontWeight: 700 }}>
                    {q.options && typeof q.answer === 'number' ? q.options[q.answer] : q.answer}
                  </span>
                </div>
              )}
              
              <div style={{ marginTop: 16, padding: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 8, fontSize: 14, color: '#ccc' }}>
                <strong style={{ color: '#fff' }}>Explanation:</strong> {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="animate-fade-in">
      <div style={{ position: 'sticky', top: 0, background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(10px)', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, marginBottom: 32 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: timeLeft < 300 ? '#ff2d78' : '#fff', fontFamily: 'monospace' }}>
          {mins}:{secs}
        </div>
        <button onClick={handleSubmit} className="btn-primary" style={{ padding: '8px 24px' }}>
          Submit Paper
        </button>
      </div>

      {questions.map((q, i) => (
        <div key={i} className="card" style={{ padding: 32, borderRadius: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#b14aed', fontWeight: 800, letterSpacing: '0.1em', marginBottom: 12 }}>QUESTION {i + 1}</div>
          <div style={{ fontSize: 20, color: '#fff', fontWeight: 600, marginBottom: 24, whiteSpace: 'pre-wrap' }}>{q.display}</div>
          
          {q.options ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {q.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => setAnswers({ ...answers, [i]: optIdx })}
                  style={{
                    padding: '16px',
                    borderRadius: 12,
                    background: answers[i] === optIdx ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${answers[i] === optIdx ? '#00d4ff' : 'transparent'}`,
                    color: answers[i] === optIdx ? '#fff' : '#ccc',
                    textAlign: 'left',
                    fontSize: 16,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              placeholder={q.placeholder || 'Type your answer...'}
              value={answers[i] || ''}
              onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: 18,
                outline: 'none'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
