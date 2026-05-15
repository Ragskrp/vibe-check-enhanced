import { getAllTopicSlugs as getBusinessTopicSlugs } from './gcse/business/businessData';
import { getAllTopicSlugs as getComputerScienceTopicSlugs } from './gcse/computer-science/computerScienceData';
import { getAllTopicSlugs as getEnglishLanguageTopicSlugs } from './gcse/english-language/englishLanguageData';
import { getAllTopicSlugs as getEnglishLiteratureTopicSlugs } from './gcse/english-literature/englishLiteratureData';
import { getAllTopicSlugs as getMathsTopicSlugs } from './gcse/maths/topicData';
import { getAllTopicSlugs as getScienceTopicSlugs } from './gcse/science/scienceData';
import { getAllArticleSlugs as getTechNewsSlugs } from './tech-news/techNewsData';
import { getAllTopicSlugs as getHistoryTopicSlugs } from './gcse/history/historyData';
import { getAllTopicSlugs as getGeographyTopicSlugs } from './gcse/geography/geographyData';

export default function sitemap() {
  // NOTE: The sitemap must be manually submitted to Google Search Console. 
  // This cannot be automated in code.
  const baseUrl = 'https://vibemenow.uk';
  const lastModified = new Date();

  // Core Pages
  const corePages = [
    '',
    '/about',
    '/blog',
    '/community-guidelines',
    '/contact',
    '/disclaimer',
    '/editorial-policy',
    '/faq',
    '/guides',
    '/privacy',
    '/publisher-information',
    '/terms'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.5,
  }));

  // Game Routes
  const games = [
    'wordvibe',
    'vibeordie',
    'emoji-iq',
    'vocab-match',
    'hot-takes',
    'vibe-quiz',
    'would-you-rather',
    'geography-guesser',
    'vibe-clicker',
    '2048-vibe',
    'gravity-dash', // Neon Strike
    'ricochet-strike',
    'whack-a-vibe',
    'reaction-arena',
    'drawing-dash',
    'quiz-arena',
    'memory-arena',
    'odd-one-out',
    'poll-party'
  ].map(game => ({
    url: `${baseUrl}/${game}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Blog Articles
  const blogPosts = [
    'science-of-brain-games',
    'history-of-word-games',
    'multiplayer-gaming-social-benefits',
    'screen-time-vs-game-time',
    'emoji-communication-guide',
    'socratic-method-discovery',
    'cognitive-load-mastery',
    'spacing-effect-memory',
    'metacognition-thinking',
    'executive-function-control',
    'philosophy-for-children',
    'probabilistic-decisions',
    'aha-moment-science',
    'logical-reasoning-logic',
    'chess-visual-logic',
    'computational-thinking',
    'the-mozart-effect',
    'sleep-and-memory',
    'dual-coding-theory',
    'cyberpsychology',
    'psychology-of-flow'
  ].map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Guide Articles
  const guides = [
    'wordvibe-strategies',
    'emoji-iq-mastery',
    'vibe-quiz-mastery',
    'would-you-rather-psychology',
    'reaction-arena-tips',
    'geography-guesser-tips'
  ].map(slug => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // GCSE Revision Routes — auto-generated
  const mathsSlugs = getMathsTopicSlugs();
  const scienceSlugs = getScienceTopicSlugs();
  const computerScienceSlugs = getComputerScienceTopicSlugs();
  const businessSlugs = getBusinessTopicSlugs();
  const englishLanguageSlugs = getEnglishLanguageTopicSlugs();
  const englishLiteratureSlugs = getEnglishLiteratureTopicSlugs();
  const historySlugs = getHistoryTopicSlugs();
  const geographySlugs = getGeographyTopicSlugs();

  const gcsePages = [
    { url: `${baseUrl}/gcse`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gcse/maths`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gcse/science`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gcse/computer-science`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gcse/business`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gcse/english-language`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gcse/english-literature`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gcse/maths/equation-rush`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/gcse/maths/fraction-frenzy`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/gcse/maths/angle-snapper`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    ...mathsSlugs.map(slug => ({
      url: `${baseUrl}/gcse/maths/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...scienceSlugs.map(slug => ({
      url: `${baseUrl}/gcse/science/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...computerScienceSlugs.map(slug => ({
      url: `${baseUrl}/gcse/computer-science/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...businessSlugs.map(slug => ({
      url: `${baseUrl}/gcse/business/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...englishLanguageSlugs.map(slug => ({
      url: `${baseUrl}/gcse/english-language/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...englishLiteratureSlugs.map(slug => ({
      url: `${baseUrl}/gcse/english-literature/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    { url: `${baseUrl}/gcse/history`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    ...historySlugs.map(slug => ({
      url: `${baseUrl}/gcse/history/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    { url: `${baseUrl}/gcse/geography`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    ...geographySlugs.map(slug => ({
      url: `${baseUrl}/gcse/geography/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    { url: `${baseUrl}/gcse/dashboard/mixed-mode`, lastModified, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/gcse/maths/mixed-mode`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/gcse/science/mixed-mode`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/gcse/computer-science/mixed-mode`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/gcse/history/mixed-mode`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/gcse/geography/mixed-mode`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
  ];


  const techNewsSlugs = getTechNewsSlugs();
  const techNewsPages = [
    { url: `${baseUrl}/tech-news`, lastModified, changeFrequency: 'daily', priority: 0.8 },
    ...techNewsSlugs.map(slug => ({
      url: `${baseUrl}/tech-news/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  ];

  return [...corePages, ...games, ...blogPosts, ...guides, ...gcsePages, ...techNewsPages];
}
