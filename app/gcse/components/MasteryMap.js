'use client';

import { useState, useEffect } from 'react';
import { Shield, CheckCircle, Lock } from 'lucide-react';

export default function MasteryMap({ topics, statsKey, accentColor }) {
  const [stats, setStats] = useState({});

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(statsKey) || '{}');
      setStats(data);
    } catch {}
  }, [statsKey]);

  // Group topics by category for the map
  const categories = {};
  topics.forEach(t => {
    if (!categories[t.category]) categories[t.category] = [];
    categories[t.category].push(t);
  });

  return (
    <div style={{
      padding: '40px',
      background: 'rgba(255,255,255,0.02)',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.05)',
      marginTop: '40px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <Shield size={20} color={accentColor} />
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Knowledge Mastery Map</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
        {Object.entries(categories).map(([cat, catTopics]) => {
          const completedCount = catTopics.filter(t => stats[`topic_${t.slug}`]?.mastered).length;
          const progress = (completedCount / catTopics.length) * 100;

          return (
            <div key={cat}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cat}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: accentColor }}>{completedCount}/{catTopics.length}</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {catTopics.map(t => {
                  const isMastered = stats[`topic_${t.slug}`]?.mastered;
                  return (
                    <div key={t.slug} title={t.title} style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: isMastered ? `${accentColor}20` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isMastered ? accentColor : 'rgba(255,255,255,0.08)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}>
                      {isMastered ? <CheckCircle size={14} color={accentColor} /> : <Lock size={12} color="rgba(255,255,255,0.1)" />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
