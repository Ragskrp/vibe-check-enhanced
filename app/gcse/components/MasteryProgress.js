'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import { getSrsRecord, getMemoryStrength } from '../utils/spacedRepetitionEngine';

import { getTopicsByCategory as getMaths } from '../maths/topicData';
import { getTopicsByCategory as getScience } from '../science/scienceData';
import { getTopicsByCategory as getCS } from '../computer-science/computerScienceData';
import { getTopicsByCategory as getHistory } from '../history/historyData';
import { getTopicsByCategory as getGeography } from '../geography/geographyData';
import { getTopicsByCategory as getEngLang } from '../english-language/englishLanguageData';
import { getTopicsByCategory as getEngLit } from '../english-literature/englishLiteratureData';
import { getTopicsByCategory as getBusiness } from '../business/businessData';

export default function MasteryProgress() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const allTopics = [
        ...Object.values(getMaths()).flat().map(t => ({ ...t, subjectId: 'maths' })),
        ...Object.values(getScience()).flat().map(t => ({ ...t, subjectId: 'science' })),
        ...Object.values(getCS()).flat().map(t => ({ ...t, subjectId: 'computer-science' })),
        ...Object.values(getHistory()).flat().map(t => ({ ...t, subjectId: 'history' })),
        ...Object.values(getGeography()).flat().map(t => ({ ...t, subjectId: 'geography' })),
        ...Object.values(getEngLang()).flat().map(t => ({ ...t, subjectId: 'english-language' })),
        ...Object.values(getEngLit()).flat().map(t => ({ ...t, subjectId: 'english-literature' })),
        ...Object.values(getBusiness()).flat().map(t => ({ ...t, subjectId: 'business' })),
      ];

      const masteries = allTopics.map(t => getMemoryStrength(getSrsRecord(t.subjectId, t.slug)));
      const avgMastery = masteries.length > 0 ? masteries.reduce((a, b) => a + b, 0) / masteries.length : 0;
      const discovered = masteries.filter(m => m > 0).length;

      setStats({
        avg: Math.round(avgMastery),
        discovered,
        total: allTopics.length
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!stats) return null;

  return (
    <div style={{
      padding: '24px',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      marginBottom: '40px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Trophy size={20} color="#ffe600" />
        <div style={{ fontSize: '12px', fontWeight: '800', color: '#ffe600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Global Mastery Dashboard
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '800', marginBottom: '4px' }}>AVG STRENGTH</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#00ff94' }}>{stats.avg}%</div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '800', marginBottom: '4px' }}>TOPICS KNOWN</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#00d4ff' }}>{stats.discovered}</div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '800', marginBottom: '4px' }}>REMAINING</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#ff2d78' }}>{stats.total - stats.discovered}</div>
        </div>
      </div>

      <div style={{ marginTop: '24px', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${stats.avg}%`, background: 'linear-gradient(90deg, #ff2d78, #00d4ff)', borderRadius: '4px' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '700' }}>
        <TrendingUp size={12} />
        Your neural network is {stats.avg}% efficient. Keep vibing to reach 100%.
      </div>
    </div>
  );
}
