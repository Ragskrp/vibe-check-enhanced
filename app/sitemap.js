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
    'geography-guesser'
  ].map(game => ({
    url: `${baseUrl}/${game}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...corePages, ...games];
}
