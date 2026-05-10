'use client';

// Dynamic imports for the banks to keep the initial bundle small
const BANKS = {
  'computer-science': () => import('../data/banks/computer-science.json').then(m => m.default),
  'maths': () => import('../data/banks/maths.json').then(m => m.default),
  'science': () => import('../data/banks/science.json').then(m => m.default),
  'business': () => import('../data/banks/business.json').then(m => m.default)
};

const loadedBanks = {};

function isPlaceholderQuestion(question) {
  const text = [
    question?.q,
    question?.a,
    ...(question?.o || []),
  ].filter(Boolean).join(' ');

  return /Question variant|Feature \d+|Alt \d+|component \d+|concept \d+|reaction \d+/i.test(text);
}

export async function getBankQuestions(subject, topicSlug) {
  if (!BANKS[subject]) return [];
  
  if (!loadedBanks[subject]) {
    loadedBanks[subject] = await BANKS[subject]();
  }
  
  const questions = loadedBanks[subject][subject]?.[topicSlug] || [];
  return questions.filter((question) => !isPlaceholderQuestion(question));
}

/**
 * Shuffles an array in place
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
