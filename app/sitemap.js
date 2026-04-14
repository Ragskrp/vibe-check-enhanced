export default function sitemap() {
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
    'flappy-vibe',
    'whack-a-vibe'
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
    'chess-visual-logic'
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

  return [...corePages, ...games, ...blogPosts, ...guides];
}
