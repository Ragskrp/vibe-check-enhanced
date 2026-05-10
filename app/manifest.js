export default function manifest() {
  return {
    name: 'VIBEMENOW Revision',
    short_name: 'VIBEMENOW',
    description: 'Free, interactive GCSE revision games and tools. No login required.',
    start_url: '/gcse',
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
