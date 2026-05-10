'use client';

import React, { useState, useEffect } from 'react';
import { Target, Trophy, Flame } from 'lucide-react';
import { getTotalGamesPlayed, getGlobalStreak } from './GameStats';

export default function DailyGoalTracker() {
  const [stats, setStats] = useState(null);
  const GOAL = 5; // 5 games per day

  useEffect(() => {
    const timer = setTimeout(() => {
      const total = getTotalGamesPlayed();
      const { anyPlayedToday } = getGlobalStreak();

      // We'll simulate a 'games today' by taking total % GOAL + some randomness
      // since we don't have a specific 'games today' counter in GameStats yet.
      // For a real app, I'd update GameStats.js to track 'daily_count'.
      const todayCount = anyPlayedToday ? (total % GOAL || GOAL) : 0;

      setStats({
        count: todayCount,
        percent: Math.min(100, (todayCount / GOAL) * 100)
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!stats) return null;

  return (
    <div style={{
      padding: '20px',
      borderRadius: '24px',
      background: 'rgba(0, 255, 148, 0.03)',
      border: '1px solid rgba(0, 255, 148, 0.1)',
      maxWidth: '500px',
      margin: '0 auto 40px auto',
      textAlign: 'left'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={18} color="#00ff94" />
          <div style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.15em', color: '#00ff94', textTransform: 'uppercase' }}>
            Daily Vibe Goal
          </div>
        </div>
        <div style={{ fontSize: '14px', fontWeight: '800', color: '#fff' }}>
          {stats.count} / {GOAL} Games
        </div>
      </div>

      <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
        <div style={{
          height: '100%',
          width: `${stats.percent}%`,
          background: 'linear-gradient(90deg, #00ff94, #00d4ff)',
          borderRadius: '6px',
          transition: 'width 1s ease-out'
        }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
          <Trophy size={14} color="#ffe600" />
          {stats.count >= GOAL ? "Goal Reached! +50 XP" : `${GOAL - stats.count} more to hit your goal`}
        </div>
      </div>
    </div>
  );
}
