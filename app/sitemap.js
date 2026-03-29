export default function sitemap() {
  const baseUrl = 'https://vibemenow.uk';
  const lastModified = new Date();

  // Core Pages
  const corePages = ['', '/about', '/contact', '/privacy', '/terms', '/disclaimer', '/blog', '/guides'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.5,
  }));

  // Game Routes
  const games = [
    'wordvibe', 'vibeordie', 'emoji-iq', 'vocab-match', 'hot-takes', 
    'vibe-quiz', 'would-you-rather', 'quiz-arena', 'reaction-arena', 
    'geography-guesser', 'odd-one-out', 'memory-arena', 'poll-party', 
    'drawing-dash', 'vibe-clicker', '2048-vibe', 'flappy-vibe', 'whack-a-vibe'
  ].map(game => ({
    url: `${baseUrl}/${game}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Blog Routes
  const blogs = [
    'emoji-communication-guide', 'history-of-word-games', 
    'multiplayer-gaming-social-benefits', 'science-of-brain-games', 
    'screen-time-vs-game-time'
  ].map(blog => ({
    url: `${baseUrl}/blog/${blog}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Guides
  const guides = [
     'emoji-iq-mastery', 'geography-guesser-tips', 'reaction-arena-tips',
     'vibe-quiz-mastery', 'wordvibe-strategies', 'would-you-rather-psychology'
  ].map(guide => ({
    url: `${baseUrl}/guides/${guide}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...corePages, ...games, ...blogs, ...guides];
}
