'use client';

/**
 * Manages daily streaks using localStorage.
 * Persistence is per-browser, no backend.
 */
export function getStreakData() {
  if (typeof window === 'undefined') return { currentStreak: 0, highestStreak: 0, lastActivity: null, activeToday: false };
  
  try {
    const data = JSON.parse(localStorage.getItem('vibe_gcse_daily_streak') || 'null');
    if (!data) return { currentStreak: 0, highestStreak: 0, lastActivity: null, activeToday: false };
    
    const today = new Date().toISOString().split('T')[0];
    const lastDate = data.lastActivity ? data.lastActivity.split('T')[0] : null;
    
    if (lastDate === today) {
      return { ...data, activeToday: true };
    }
    
    // Check if streak was broken (last activity was more than 1 day ago)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastDate === yesterdayStr) {
      return { ...data, activeToday: false };
    }
    
    // Streak broken
    return { ...data, currentStreak: 0, activeToday: false };
  } catch {
    return { currentStreak: 0, highestStreak: 0, lastActivity: null, activeToday: false };
  }
}

export function recordActivity() {
  if (typeof window === 'undefined') return;
  
  const data = getStreakData();
  const today = new Date().toISOString().split('T')[0];
  const lastDate = data.lastActivity ? data.lastActivity.split('T')[0] : null;
  
  if (lastDate === today) return data; // Already active today
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  let newStreak = 1;
  if (lastDate === yesterdayStr) {
    newStreak = data.currentStreak + 1;
  }
  
  const newData = {
    currentStreak: newStreak,
    highestStreak: Math.max(data.highestStreak, newStreak),
    lastActivity: new Date().toISOString(),
  };
  
  localStorage.setItem('vibe_gcse_daily_streak', JSON.stringify(newData));
  return { ...newData, activeToday: true };
}
