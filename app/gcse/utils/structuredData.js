/**
 * JSON-LD Structured Data helpers for GCSE pages.
 * Generates Course and Quiz schema for Google Rich Results.
 */

/**
 * Generates a Course schema for subject hub pages.
 * @param {object} params
 */
export function generateCourseSchema({ name, description, url, subject, provider = 'VIBEMENOW' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://vibemenow.uk',
    },
    educationalLevel: 'GCSE',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      educationalLevel: 'Year 10-11',
    },
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
    keywords: `GCSE ${subject}, free revision, no login, ${subject} practice`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
      },
    },
  };
}

/**
 * Generates a Quiz schema for topic-level practice pages.
 * @param {object} params
 */
export function generateQuizSchema({ name, description, url, questions = [] }) {
  const schemaQuestions = questions.slice(0, 5).map((q) => ({
    '@type': 'Question',
    name: q.q || q.front || q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.a || q.back || '',
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': ['Quiz', 'LearningResource'],
    name,
    description,
    url,
    isAccessibleForFree: true,
    educationalLevel: 'GCSE',
    inLanguage: 'en-GB',
    about: { '@type': 'Thing', name },
    ...(schemaQuestions.length > 0 && {
      hasPart: schemaQuestions,
    }),
  };
}

/**
 * Generates a FAQPage schema — great for subject hub pages to capture
 * "People Also Ask" slots in Google.
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// ── Per-subject FAQ banks ────────────────────────────────────────────────────
export const SUBJECT_FAQS = {
  maths: [
    { q: 'Is this GCSE Maths revision free?', a: 'Yes — 100% free, no login or account required. All topics, quizzes, and interactive tools are open to everyone.' },
    { q: 'Which exam board does this cover?', a: 'Content is aligned to AQA (8300) and Edexcel (1MA1) GCSE Maths specifications. Most topics are identical across both boards.' },
    { q: 'What topics does the Maths hub cover?', a: 'Algebra, Number, Geometry, Statistics, Probability, Ratio & Proportion, and more — mapped directly to the GCSE specification.' },
    { q: 'How does the spaced repetition system work?', a: 'After each quiz, the SM-2 algorithm schedules when you should next review that topic based on how well you answered. Weak topics come back sooner.' },
  ],
  science: [
    { q: 'Does this cover Combined or Triple Science?', a: 'Both. Topics are tagged for Combined Science (Foundation/Higher) and Triple Award across Biology, Chemistry, and Physics.' },
    { q: 'Is the science revision free with no login?', a: 'Yes — completely free, no registration needed. Just open the site and start revising.' },
    { q: 'Which exam board is covered for Science?', a: 'AQA Combined Science (8464) and Separate Sciences (8461/8462/8463) are the primary alignment.' },
    { q: 'What interactive tools are available for Science?', a: 'Physics circuit simulators, biology organelle matching, chemistry true/false challenges, and atomic model visualizers.' },
  ],
  computerScience: [
    { q: 'Which GCSE Computer Science spec is covered?', a: 'OCR J277 is the primary specification, covering all 6 components: Systems Architecture, Memory, Networking, Logic, Algorithms, and Programming.' },
    { q: 'Is there a logic gate simulator?', a: 'Yes — the Discovery Lab includes interactive AND, OR, NAND, NOR, and XOR gate simulators with live truth tables.' },
    { q: 'Can I practice binary conversion?', a: 'Yes — the Binary Converter sandbox supports denary-to-binary and binary-to-denary conversion with step-by-step checking.' },
    { q: 'Is this free GCSE Computer Science revision?', a: '100% free, no account needed. All simulators, flashcards, and quizzes are permanently free.' },
  ],
};
