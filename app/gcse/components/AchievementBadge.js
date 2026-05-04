'use client';

import { Trophy, Star, Shield, Zap, Flame, Award } from 'lucide-react';

const BADGES = [
  { id: 'first_steps', title: 'First Steps', desc: 'Complete your first practice session.', icon: Award, color: '#00d4ff', requirement: (stats) => stats.totalPlays >= 1 },
  { id: 'streak_3', title: 'Consistent', desc: 'Maintain a 3-day daily streak.', icon: Flame, color: '#ff6b35', requirement: (stats) => stats.globalStreak >= 3 },
  { id: 'streak_7', title: 'Unstoppable', desc: 'Maintain a 7-day daily streak.', icon: Flame, color: '#ff2d78', requirement: (stats) => stats.globalStreak >= 7 },
  { id: 'master_1', title: 'Topic Master', desc: 'Master your first syllabus topic.', icon: Shield, color: '#00ff94', requirement: (stats) => stats.totalMastered >= 1 },
  { id: 'master_10', title: 'Elite Scholar', desc: 'Master 10 syllabus topics.', icon: Trophy, color: '#ffe600', requirement: (stats) => stats.totalMastered >= 10 },
  { id: 'grinder', title: 'The Grinder', desc: 'Play 50 quiz sessions.', icon: Zap, color: '#b14aed', requirement: (stats) => stats.totalPlays >= 50 },
];

export default function AchievementBadge({ stats }) {
  return (
    <div style={{
      padding: '32px',
      background: 'rgba(255,255,255,0.02)',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <Star size={20} color="#ffe600" />
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Achievement Vault</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
        {BADGES.map(badge => {
          const unlocked = badge.requirement(stats);
          const Icon = badge.icon;
          
          return (
            <div key={badge.id} style={{
              padding: '20px 16px',
              borderRadius: 20,
              background: unlocked ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
              border: `1px solid ${unlocked ? badge.color + '40' : 'rgba(255,255,255,0.05)'}`,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              filter: unlocked ? 'none' : 'grayscale(1) opacity(0.3)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: unlocked ? badge.color + '15' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: unlocked ? `0 0 20px ${badge.color}20` : 'none'
              }}>
                <Icon size={24} color={unlocked ? badge.color : '#444'} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: unlocked ? '#fff' : '#666', marginBottom: 4 }}>{badge.title}</div>
                <div style={{ fontSize: 10, color: '#555', lineHeight: 1.4 }}>{badge.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
