export default function manifest() {
  return {
    name: 'VIBEMENOW Games',
    short_name: 'VIBEMENOW',
    description: 'Free, interactive browser games, quizzes, and word puzzles. No login required.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#00d4ff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
