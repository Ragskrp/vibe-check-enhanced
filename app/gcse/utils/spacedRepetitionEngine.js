/**
 * Spaced Repetition Engine — SM-2 Algorithm
 * Based on the SuperMemo SM-2 algorithm (public domain).
 * Storage: localStorage per topic per subject.
 *
 * Quality ratings (pass to calculateNextReview):
 *   0 = Complete blackout
 *   1 = Incorrect, but answer felt familiar
 *   2 = Incorrect, but correct answer was easy to recall
 *   3 = Correct with serious difficulty
 *   4 = Correct after hesitation
 *   5 = Perfect, instant recall
 */

const SRS_PREFIX = 'vibe_srs_';

/**
 * Get the localStorage key for a given subject + topic.
 */
function getSrsKey(subjectId, topicSlug) {
  return `${SRS_PREFIX}${subjectId}_${topicSlug}`;
}

/**
 * Retrieve the SRS record for a topic.
 * Returns default record if none exists.
 */
export function getSrsRecord(subjectId, topicSlug) {
  if (typeof window === 'undefined') return defaultRecord();
  try {
    const raw = localStorage.getItem(getSrsKey(subjectId, topicSlug));
    return raw ? JSON.parse(raw) : defaultRecord();
  } catch {
    return defaultRecord();
  }
}

function defaultRecord() {
  return { interval: 1, repetitions: 0, efactor: 2.5, nextReview: null, lastReviewed: null, quality: null };
}

/**
 * Apply a quality rating and update the SRS record.
 * @param {string} subjectId
 * @param {string} topicSlug
 * @param {number} quality - 0 to 5
 * @returns {object} updated record
 */
export function applyRating(subjectId, topicSlug, quality) {
  const record = getSrsRecord(subjectId, topicSlug);
  const updated = calculateNextReview(record, quality);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(getSrsKey(subjectId, topicSlug), JSON.stringify(updated));
      import('../../lib/cloudSync').then(m => m.syncToCloud());
    } catch {}
  }
  return updated;
}

/**
 * Core SM-2 calculation.
 */
export function calculateNextReview(record, quality) {
  let { interval, repetitions, efactor } = record;

  if (quality < 3) {
    // Failed — reset repetitions, keep efactor penalty
    repetitions = 0;
    interval = 1;
  } else {
    // Passed
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * efactor);
    repetitions += 1;
  }

  // Update efactor (stays between 1.3 and 2.5)
  efactor = Math.max(
    1.3,
    efactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    interval,
    repetitions,
    efactor: parseFloat(efactor.toFixed(3)),
    nextReview: nextReview.toISOString(),
    lastReviewed: new Date().toISOString(),
    quality,
  };
}

/**
 * Calculate memory strength (0–100) based on forgetting curve.
 * Peaks at 100 immediately after review, decays over the interval.
 */
export function getMemoryStrength(record) {
  if (!record || !record.nextReview || !record.lastReviewed) return 0;

  const now = Date.now();
  const last = new Date(record.lastReviewed).getTime();
  const next = new Date(record.nextReview).getTime();
  const totalWindow = next - last;
  const elapsed = now - last;

  if (elapsed <= 0) return 100;
  if (elapsed >= totalWindow) {
    // Past due — decay below 50
    const overdue = (elapsed - totalWindow) / 86400000; // days overdue
    return Math.max(0, Math.round(50 * Math.exp(-overdue * 0.15)));
  }

  // Within window — interpolate from 100 → 50
  const fraction = elapsed / totalWindow;
  return Math.round(100 - fraction * 50);
}

/**
 * Get the strength colour for rendering.
 */
export function strengthToColor(strength) {
  if (strength >= 80) return '#00ff94';
  if (strength >= 50) return '#ffe600';
  if (strength >= 20) return '#ff6b35';
  return '#ff2d78';
}

/**
 * Get all topics that are due for review today.
 * @param {Array} topics - array of { subjectId, slug, title }
 * @returns {Array} topics due for review, sorted by urgency
 */
export function getDueTopics(topics) {
  const today = new Date();
  return topics
    .map(t => {
      const record = getSrsRecord(t.subjectId, t.slug);
      const strength = getMemoryStrength(record);
      const isDue = !record.nextReview || new Date(record.nextReview) <= today;
      return { ...t, record, strength, isDue };
    })
    .filter(t => t.isDue && t.record.repetitions > 0) // Only show if studied before
    .sort((a, b) => a.strength - b.strength); // Weakest first
}

/**
 * Map a TopicGame result to SM-2 quality rating.
 * @param {boolean} isCorrect
 * @param {boolean} wasHesitant - did user need to see explanation?
 */
export function resultToQuality(isCorrect, wasHesitant = false) {
  if (!isCorrect) return 1;
  if (wasHesitant) return 3;
  return 5;
}
