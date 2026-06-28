export const metadata = {
  title: 'VIBEMENOW | Free Browser Games, Quizzes & Word Puzzles (No Login)',
  description: 'Play 150+ original browser games, daily word puzzles, and quizzes. Engineered for instant access with no account required.',
  keywords: ['free browser games', 'no login games', 'daily word puzzles', 'reaction speed test', 'interactive learning tools', 'free trivia quizzes'],
  alternates: {
    canonical: 'https://vibemenow.uk/',
  },
  openGraph: {
    title: 'VIBEMENOW | Free Browser Games & Quizzes',
    description: '150+ original games and daily puzzles. Play instantly without login.',
    url: 'https://vibemenow.uk/',
    type: 'website',
    images: [{
      url: 'https://vibemenow.uk/og/home.png',
      width: 1200,
      height: 630,
      alt: 'VIBEMENOW Homepage'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIBEMENOW | Free Browser Games & Quizzes',
    description: '150+ original games and interactive quick-play tools.',
    images: ['https://vibemenow.uk/og/home.png'],
  },
};


const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is VIBEMENOW?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VIBEMENOW is an independent ecosystem of 150+ original browser games, interactive quizzes, and daily word puzzles. Our platform is designed for instant play with zero account creation, focusing on active recall and cognitive engagement."
      }
    },
    {
      "@type": "Question",
      "name": "Are the games really free and no-login?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. According to our zero-friction policy, all games are accessible without downloads or sign-ups. We prioritize student focus and rapid-access entertainment."
      }
    }
  ]
};


import HomeContent from './components/HomeContent';
import HomeEditorial from './components/HomeEditorial';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <HomeContent />
      <HomeEditorial />
    </>
  );
}

