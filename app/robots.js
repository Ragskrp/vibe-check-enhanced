export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'Googlebot', 'Bingbot'],
        allow: '/',
      }
    ],
    sitemap: 'https://vibemenow.uk/sitemap.xml',
  }
}

