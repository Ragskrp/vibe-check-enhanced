'use client';

import { useEffect, useState } from 'react';
import { Trophy, Star, Shield, Zap, Flame, Award, Brain, Clock, Moon, Sun, RotateCcw, Target, BookOpen, Layers, Activity } from 'lucide-react';

const BADGES = [
  // ── Beginner ───────────────────────────────────────────────────────────────
  {
    id: 'first_steps', title: 'First Steps', emoji: '🎯',
    desc: 'Complete your first practice session.',
    color: '#00d4ff',
    requirement: (s) => s.totalPlays >= 1,
  },
  {
    id: 'master_1', title: 'Topic Unlocked', emoji: '🔓',
    desc: 'Master your first syllabus topic.',
    color: '#00ff94',
    requirement: (s) => s.totalMastered >= 1,
  },
  {
    id: 'bookworm', title: 'Bookworm', emoji: '📖',
    desc: 'Complete 10 practice sessions.',
    color: '#00d4ff',
    requirement: (s) => s.totalPlays >= 10,
  },

  // ── Streaks ────────────────────────────────────────────────────────────────
  {
    id: 'streak_3', title: 'Consistent', emoji: '🔥',
    desc: 'Maintain a 3-day streak.',
    color: '#ff6b35',
    requirement: (s) => s.globalStreak >= 3,
  },
  {
    id: 'streak_7', title: 'Week Warrior', emoji: '⚔️',
    desc: 'Maintain a 7-day streak.',
    color: '#ff2d78',
    requirement: (s) => s.globalStreak >= 7,
  },
  {
    id: 'streak_14', title: 'Fortnight Force', emoji: '💪',
    desc: 'Maintain a 14-day streak.',
    color: '#ff2d78',
    requirement: (s) => s.globalStreak >= 14,
  },
  {
    id: 'streak_30', title: 'Iron Mind', emoji: '🏋️',
    desc: 'Maintain a 30-day streak. Legendary.',
    color: '#ffe600',
    requirement: (s) => s.globalStreak >= 30,
  },

  // ── Mastery ────────────────────────────────────────────────────────────────
  {
    id: 'master_5', title: 'Rising Scholar', emoji: '📚',
    desc: 'Master 5 syllabus topics.',
    color: '#00e5a0',
    requirement: (s) => s.totalMastered >= 5,
  },
  {
    id: 'master_10', title: 'Elite Scholar', emoji: '⭐',
    desc: 'Master 10 syllabus topics.',
    color: '#ffe600',
    requirement: (s) => s.totalMastered >= 10,
  },
  {
    id: 'master_20', title: 'Academic', emoji: '🎓',
    desc: 'Master 20 syllabus topics.',
    color: '#ffe600',
    requirement: (s) => s.totalMastered >= 20,
  },
  {
    id: 'master_30', title: 'Diamond Scholar', emoji: '💎',
    desc: 'Master 30 syllabus topics.',
    color: '#a78bfa',
    requirement: (s) => s.totalMastered >= 30,
  },
  {
    id: 'master_50', title: 'GCSE Champion', emoji: '🏆',
    desc: 'Master 50 topics. The ultimate achievement.',
    color: '#ffe600',
    requirement: (s) => s.totalMastered >= 50,
  },

  // ── Volume ─────────────────────────────────────────────────────────────────
  {
    id: 'grinder', title: 'The Grinder', emoji: '⚡',
    desc: 'Complete 50 quiz sessions.',
    color: '#b14aed',
    requirement: (s) => s.totalPlays >= 50,
  },
  {
    id: 'centurion', title: 'Centurion', emoji: '💯',
    desc: 'Complete 100 quiz sessions.',
    color: '#b14aed',
    requirement: (s) => s.totalPlays >= 100,
  },

  // ── Cross-subject ──────────────────────────────────────────────────────────
  {
    id: 'polymath', title: 'Polymath', emoji: '🧠',
    desc: 'Study 3 different subjects in one day.',
    color: '#00d4ff',
    requirement: (s) => {
      const subjects = Object.keys(s.subjectBreakdown || {});
      return subjects.filter(sub => (s.subjectBreakdown[sub]?.plays || 0) > 0).length >= 3;
    },
  },

  // ── Time-based ─────────────────────────────────────────────────────────────
  {
    id: 'early_bird', title: 'Early Bird', emoji: '🌅',
    desc: 'Study before 8am.',
    color: '#ffe600',
    requirement: () => {
      try {
        const h = parseInt(localStorage.getItem('vibe_earliest_session') || '12');
        return h < 8;
      } catch { return false; }
    },
  },
  {
    id: 'night_owl', title: 'Night Owl', emoji: '🦉',
    desc: 'Study after 10pm.',
    color: '#a78bfa',
    requirement: () => {
      try {
        const h = parseInt(localStorage.getItem('vibe_latest_session') || '12');
        return h >= 22;
      } catch { return false; }
    },
  },

  // ── Comeback ───────────────────────────────────────────────────────────────
  {
    id: 'comeback', title: 'Comeback Kid', emoji: '🔄',
    desc: 'Return after a 3+ day break.',
    color: '#ff6b35',
    requirement: () => {
      try {
        return localStorage.getItem('vibe_comeback_achieved') === 'true';
      } catch { return false; }
    },
  },

  // ── Exam prep ──────────────────────────────────────────────────────────────
  {
    id: 'exam_set', title: 'Prepared', emoji: '📅',
    desc: 'Set your exam date in the countdown.',
    color: '#00e5a0',
    requirement: () => {
      try { return !!localStorage.getItem('vibe_exam_date'); } catch { return false; }
    },
  },
  {
    id: 'flashcard_fan', title: 'Flashcard Fan', emoji: '🎴',
    desc: 'Complete a full flashcard session.',
    color: '#ffe600',
    requirement: () => {
      try { return parseInt(localStorage.getItem('vibe_flashcard_sessions') || '0') >= 1; } catch { return false; }
    },
  },
];

export default function AchievementBadge({ stats }) {
  const [unlockAnimation, setUnlockAnimation] = useState({});

  // Detect newly-unlocked badges for animation
  useEffect(() => {
    const prev = JSON.parse(localStorage.getItem('vibe_prev_badges') || '[]');
    const newlyUnlocked = {};
    BADGES.forEach(b => {
      const now = b.requirement(stats);
      const was = prev.includes(b.id);
      if (now && !was) newlyUnlocked[b.id] = true;
    });
    if (Object.keys(newlyUnlocked).length) {
      setUnlockAnimation(newlyUnlocked);
      const current = BADGES.filter(b => b.requirement(stats)).map(b => b.id);
      localStorage.setItem('vibe_prev_badges', JSON.stringify(current));
    }
  }, [stats]);

  // Track time-of-day for time-based badges
  useEffect(() => {
    const h = new Date().getHours();
    try {
      const earliest = parseInt(localStorage.getItem('vibe_earliest_session') || '23');
      if (h < earliest) localStorage.setItem('vibe_earliest_session', String(h));
      const latest = parseInt(localStorage.getItem('vibe_latest_session') || '0');
      if (h > latest) localStorage.setItem('vibe_latest_session', String(h));
    } catch {}
  }, []);

  const unlockedCount = BADGES.filter(b => b.requirement(stats)).length;

  return (
    <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Star size={20} color="#ffe600" />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Achievement Vault</h2>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#ffe600' }}>{unlockedCount} / {BADGES.length}</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginBottom: 28, overflow: 'hidden' }}>
        <div style={{ width: `${(unlockedCount / BADGES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #ffe600, #ff6b35)', borderRadius: 2, transition: 'width 1s ease' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
        {BADGES.map(badge => {
          const unlocked = badge.requirement(stats);
          const isNew = unlockAnimation[badge.id];
          return (
            <div
              key={badge.id}
              title={badge.desc}
              style={{
                padding: '18px 12px',
                borderRadius: 18,
                background: unlocked ? `${badge.color}08` : 'rgba(255,255,255,0.01)',
                border: `1px solid ${unlocked ? badge.color + '35' : 'rgba(255,255,255,0.05)'}`,
                textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                filter: unlocked ? 'none' : 'grayscale(1) opacity(0.25)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                animation: isNew ? 'badgePop 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                boxShadow: isNew ? `0 0 30px ${badge.color}40` : 'none',
              }}
            >
              <div style={{ fontSize: 30, lineHeight: 1 }}>{badge.emoji}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: unlocked ? '#fff' : '#555', marginBottom: 4, lineHeight: 1.2 }}>{badge.title}</div>
                <div style={{ fontSize: 9, color: unlocked ? badge.color : '#333', fontWeight: 600, lineHeight: 1.4 }}>{badge.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes badgePop {
          0% { transform: scale(0.8); opacity: 0.5; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
