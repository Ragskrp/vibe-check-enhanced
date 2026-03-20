/**
 * VIBEMENOW Game Stats Utility
 * Tracks player stats and streaks using localStorage
 */

const STATS_KEY = 'vibemenow_stats';

function getStats() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveStats(stats) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

/**
 * Get stats for a specific game
 */
export function getGameStats(gameId) {
  const stats = getStats();
  return stats[gameId] || {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: null,
    history: [] // last 10 scores
  };
}

/**
 * Record a completed game
 * @param {string} gameId - Unique game identifier (e.g., 'emoji-iq', 'wordvibe')
 * @param {number} score - The score achieved
 * @param {number} maxScore - The maximum possible score
 */
export function recordGame(gameId, score, maxScore) {
  const stats = getStats();
  const game = stats[gameId] || {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: null,
    history: []
  };

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  game.gamesPlayed += 1;
  game.totalScore += score;
  game.bestScore = Math.max(game.bestScore, score);

  // Streak logic
  if (game.lastPlayedDate === yesterday || game.lastPlayedDate === null) {
    game.currentStreak += 1;
  } else if (game.lastPlayedDate !== today) {
    game.currentStreak = 1;
  }
  game.longestStreak = Math.max(game.longestStreak, game.currentStreak);
  game.lastPlayedDate = today;

  // Keep last 10 scores
  game.history = [
    { score, maxScore, date: today },
    ...(game.history || [])
  ].slice(0, 10);

  stats[gameId] = game;
  saveStats(stats);

  return game;
}

/**
 * Get the global streak across all games
 */
export function getGlobalStreak() {
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let anyPlayedToday = false;
  let anyPlayedYesterday = false;

  Object.values(stats).forEach(game => {
    if (game.lastPlayedDate === today) anyPlayedToday = true;
    if (game.lastPlayedDate === yesterday) anyPlayedYesterday = true;
  });

  return { anyPlayedToday, anyPlayedYesterday };
}

/**
 * Get total games played across all game types
 */
export function getTotalGamesPlayed() {
  const stats = getStats();
  return Object.values(stats).reduce((sum, game) => sum + (game.gamesPlayed || 0), 0);
}
