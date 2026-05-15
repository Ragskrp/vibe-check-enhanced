export default function robots() {
  return {
    rules: [
      {
        // All crawlers: allow everything, block private routes
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      {
        // AI content crawlers — explicitly permitted for GEO visibility
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai'],
        allow: '/',
      },
      {
        // Search engine crawlers — clean dedicated block
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
      },
    ],
    sitemap: 'https://vibemenow.uk/sitemap.xml',
  };
}

