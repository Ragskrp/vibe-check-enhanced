'use client';

import { getStreakData } from '../utils/streakLogic';

const SUBJECT_KEYS = {
  'Computer Science': 'gcse-compsci-stats',
  'Science': 'gcse-science-stats',
  'Maths': 'gcse-maths-stats',
  'Business': 'gcse-business-stats',
  'English': 'gcse-english-stats'
};

import { useState, useEffect } from 'react';

const SUBJECT_ORDER = ['Maths', 'Science', 'English', 'Computer Science', 'Business'];

export function useAggregatedStats() {
  const [mounted, setMounted] = useState(false);
  const streakData = getStreakData();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { globalStreak: 0, activeToday: false, totalPlays: 0, totalMastered: 0, subjectBreakdown: {} };
  }

  let totalPlays = 0;
  let totalMastered = 0;
  const subjectBreakdown = {};

  SUBJECT_ORDER.forEach(name => {
    const key = SUBJECT_KEYS[name];
    try {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      const masteredInSubject = Object.keys(data).filter(k => k.startsWith('topic_') && data[k].mastered).length;
      
      totalPlays += (data.totalPlays || 0);
      totalMastered += masteredInSubject;
      
      subjectBreakdown[name] = {
        plays: data.totalPlays || 0,
        mastered: masteredInSubject,
        color: getSubjectColor(name)
      };
    } catch {
      subjectBreakdown[name] = { plays: 0, mastered: 0, color: '#888' };
    }
  });

  return {
    globalStreak: streakData.currentStreak || 0,
    activeToday: streakData.activeToday,
    totalPlays,
    totalMastered,
    subjectBreakdown
  };
}

function getSubjectColor(name) {
  const colors = {
    'Computer Science': '#ff2d78',
    'Science': '#00ff94',
    'Maths': '#00d4ff',
    'Business': '#ffe600',
    'English': '#b14aed'
  };
  return colors[name] || '#888';
}
