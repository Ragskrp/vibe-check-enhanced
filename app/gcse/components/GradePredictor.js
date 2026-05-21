'use client';

import { TrendingUp, Award } from 'lucide-react';

export default function GradePredictor({ stats, totalTopics }) {
  // Simple heuristic based on mastered ratio
  const ratio = totalTopics > 0 ? stats.totalMastered / totalTopics : 0;
  
  let grade = 'U';
  let color = '#ff2d78';
  let message = 'Start revising to get a predicted grade.';

  if (ratio > 0.85) { grade = '9'; color = '#b14aed'; message = 'Exceptional! You are mastering almost everything.'; }
  else if (ratio > 0.75) { grade = '8'; color = '#b14aed'; message = 'Outstanding progress.'; }
  else if (ratio > 0.65) { grade = '7'; color = '#00ff94'; message = 'Solid Grade 7 tier. Keep pushing.'; }
  else if (ratio > 0.55) { grade = '6'; color = '#00ff94'; message = 'Good foundation. Focus on weaker topics.'; }
  else if (ratio > 0.45) { grade = '5'; color = '#00d4ff'; message = 'Strong Pass territory.'; }
  else if (ratio > 0.35) { grade = '4'; color = '#00d4ff'; message = 'Standard Pass. Keep building your daily streak.'; }
  else if (ratio > 0.25) { grade = '3'; color = '#ffe600'; message = 'Approaching a pass. Use the Focus Timer!'; }
  else if (ratio > 0.15) { grade = '2'; color = '#ff6b35'; message = 'Building the basics.'; }
  else if (ratio > 0.05) { grade = '1'; color = '#ff2d78'; message = 'Early days. Keep playing games to boost your grade.'; }

  const percentage = Math.round(ratio * 100);

  return (
    <div style={{
      padding: '32px',
      borderRadius: '32px',
      background: `linear-gradient(135deg, ${color}10, rgba(0,0,0,0))`,
      border: `1px solid ${color}40`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <TrendingUp size={20} color={color} />
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#fff' }}>Predicted Grade</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ fontSize: 80, fontWeight: 900, color: color, lineHeight: 0.8 }}>
          {grade}
        </div>
        <div style={{ paddingBottom: 6 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Overall Trajectory</div>
          <div style={{ fontSize: 13, color: '#888' }}>Based on {stats.totalMastered}/{totalTopics} mastered topics</div>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: '#aaa', marginBottom: 8 }}>
          <span>Curriculum Mastery</span>
          <span style={{ color }}>{percentage}%</span>
        </div>
        <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${percentage}%`, height: '100%', background: color, transition: 'width 1s ease' }} />
        </div>
      </div>

      <div style={{ marginTop: 24, padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: 16, fontSize: 14, color: '#ccc', lineHeight: 1.5 }}>
        <Award size={16} color={color} style={{ float: 'left', marginRight: 8, marginTop: 2 }} />
        {message}
      </div>
    </div>
  );
}
