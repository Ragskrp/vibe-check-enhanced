'use client';

import { useState, useEffect } from 'react';
import { Calendar, Zap, AlertTriangle } from 'lucide-react';

/**
 * ExamCountdown — stores exam date in localStorage, shows days remaining
 * with urgency-coded ring and mode activation (EXAM ZONE / FINAL SPRINT).
 */
export default function ExamCountdown({ accentColor = '#00d4ff' }) {
  const [examDate, setExamDate] = useState('');
  const [editing, setEditing] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('vibe_exam_date');
    if (saved) setExamDate(saved);
  }, []);

  useEffect(() => {
    if (!examDate) { setDaysLeft(null); return; }
    const target = new Date(examDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - now) / 86400000);
    setDaysLeft(diff);
  }, [examDate]);

  const saveDate = (date) => {
    setExamDate(date);
    localStorage.setItem('vibe_exam_date', date);
    setEditing(false);
  };

  if (!mounted) return null;

  const getUrgency = () => {
    if (daysLeft === null) return { color: accentColor, label: 'Set Exam Date', mode: null };
    if (daysLeft <= 0) return { color: '#ff2d78', label: 'EXAM DAY!', mode: 'exam' };
    if (daysLeft <= 7) return { color: '#ff2d78', label: 'FINAL SPRINT 🔥', mode: 'sprint' };
    if (daysLeft <= 30) return { color: '#ff6b35', label: 'EXAM ZONE', mode: 'zone' };
    return { color: '#00ff94', label: 'On Track', mode: null };
  };

  const urgency = getUrgency();
  const ringPct = daysLeft !== null ? Math.max(0, Math.min(100, (daysLeft / 180) * 100)) : 50;
  const circumference = 2 * Math.PI * 38;
  const dashOffset = circumference * (1 - ringPct / 100);

  return (
    <div style={{ padding: '28px 32px', borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: `1px solid ${urgency.color}30`, display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
      {/* Ring */}
      <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle cx="44" cy="44" r="38" fill="none" stroke={urgency.color} strokeWidth="6"
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            strokeLinecap="round" transform="rotate(-90 44 44)"
            style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: daysLeft !== null ? 22 : 14, fontWeight: 900, color: urgency.color, lineHeight: 1 }}>
            {daysLeft !== null ? daysLeft : <Calendar size={20} color={urgency.color} />}
          </div>
          {daysLeft !== null && <div style={{ fontSize: 9, color: '#666', fontWeight: 700, textTransform: 'uppercase' }}>days</div>}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: urgency.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{urgency.label}</div>
        {daysLeft !== null ? (
          <>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
              {daysLeft <= 0 ? 'Good luck today!' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} until exam`}
            </div>
            {urgency.mode === 'sprint' && (
              <div style={{ fontSize: 12, color: '#ff2d78', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={12} /> Focus only on due-for-review topics now!
              </div>
            )}
            {urgency.mode === 'zone' && (
              <div style={{ fontSize: 12, color: '#ff6b35', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Zap size={12} /> Exam Zone active — prioritise weak topics.
              </div>
            )}
            <button onClick={() => setEditing(true)} style={{ marginTop: 10, fontSize: 11, color: '#555', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontWeight: 600 }}>
              Change date
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 10 }}>Add your exam date to track urgency and activate revision modes.</div>
          </>
        )}
        {(editing || daysLeft === null) && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <input
              type="date"
              defaultValue={examDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => e.target.value && saveDate(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: `1px solid ${urgency.color}40`, color: '#fff', fontSize: 13, fontWeight: 600 }}
            />
            {editing && <button onClick={() => setEditing(false)} style={{ fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>}
          </div>
        )}
      </div>
    </div>
  );
}
