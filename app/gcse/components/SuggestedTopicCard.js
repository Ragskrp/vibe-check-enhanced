'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Zap, ArrowRight, BrainCircuit } from 'lucide-react';
import { getMemoryStrength } from '../utils/spacedRepetitionEngine';

import { getTopicsByCategory as getMaths } from '../maths/topicData';
import { getTopicsByCategory as getScience } from '../science/scienceData';
import { getTopicsByCategory as getCS } from '../computer-science/computerScienceData';
import { getTopicsByCategory as getHistory } from '../history/historyData';
import { getTopicsByCategory as getGeography } from '../geography/geographyData';
import { getTopicsByCategory as getEngLang } from '../english-language/englishLanguageData';
import { getTopicsByCategory as getEngLit } from '../english-literature/englishLiteratureData';
import { getTopicsByCategory as getBusiness } from '../business/businessData';
import { getSrsRecord, getDueTopics } from '../utils/spacedRepetitionEngine';

function getSubjectColor(subjectId) {
  const colors = {
    'computer-science': '#ff2d78',
    'science': '#00ff94',
    'maths': '#00d4ff',
    'business': '#ffe600',
    'history': '#ff6b35',
    'geography': '#ffe600'
  };
  return colors[subjectId] || '#fff';
}

export default function SuggestedTopicCard() {
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
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

    const dueTopics = getDueTopics(allTopics);
    
    let result = null;
    if (dueTopics.length > 0) {
      const topDue = dueTopics[0];
      result = {
        subjectId: topDue.subjectId,
        topic: topDue,
        memStr: topDue.strength,
        type: 'critical',
        message: 'Memory Critical: Review urgently to prevent forgetting.'
      };
    } else {
      const unseen = allTopics.find(t => getMemoryStrength(getSrsRecord(t.subjectId, t.slug)) === 0);
      if (unseen) {
        result = {
          subjectId: unseen.subjectId,
          topic: unseen,
          type: 'explore',
          message: 'New Frontier: Expand your knowledge map.'
        };
      } else {
        const randTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
        result = {
          subjectId: randTopic.subjectId,
          topic: randTopic,
          type: 'mastery',
          message: 'Maintain Mastery: Keep your neural pathways sharp.'
        };
      }
    }

    const timer = setTimeout(() => {
      setSuggestion(result);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!suggestion) return null;

  const { subjectId, topic, type, message, memStr } = suggestion;
  const accentColor = topic.color || getSubjectColor(subjectId);

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '0.1em' }}>
        Priority Target
      </div>
      <Link href={`/gcse/${subjectId}/${topic.slug}`} style={{ textDecoration: 'none' }}>
        <div style={{
          padding: '32px', borderRadius: 24, background: `linear-gradient(135deg, ${accentColor}15, transparent)`,
          border: `1px solid ${accentColor}40`, position: 'relative', overflow: 'hidden',
          transition: 'all 0.3s', cursor: 'pointer'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.boxShadow = `0 10px 30px ${accentColor}20`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${accentColor}40`; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {/* Neon Glow underlay */}
          <div style={{ position: 'absolute', right: -50, top: -50, width: 200, height: 200, background: accentColor, filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                {type === 'critical' ? <Target size={16} color="#ff2d78" /> : <BrainCircuit size={16} color="#00ff94" />}
                <span style={{ fontSize: 12, fontWeight: 800, color: type === 'critical' ? '#ff2d78' : '#00ff94', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {message}
                </span>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: '0 0 4px 0' }}>{topic.title}</h3>
              <div style={{ fontSize: 14, color: accentColor, fontWeight: 700, textTransform: 'capitalize' }}>
                Subject: {subjectId.replace('-', ' ')}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              {type === 'critical' && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 800, marginBottom: 4 }}>STRENGTH</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#ff2d78' }}>{Math.round(memStr)}%</div>
                </div>
              )}
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight size={24} color="#000" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
