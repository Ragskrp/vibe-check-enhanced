export const metadata = {
  title: 'VIBEMENOW | Free Browser Games, Quizzes & GCSE Revision (No Login)',
  description: 'Play 150+ original browser games and 3,000+ GCSE revision modules. Engineered for instant access with no account required.',
  keywords: ['free browser games', 'no login games', 'GCSE revision games', 'daily word puzzles', 'reaction speed test', 'interactive learning tools'],
  alternates: {
    canonical: 'https://vibemenow.uk/',
  },
  openGraph: {
    title: 'VIBEMENOW | Free Browser Games & GCSE Revision',
    description: '150+ original games and 3,000+ revision modules. Play instantly without login.',
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
    title: 'VIBEMENOW | Free Browser Games & GCSE Revision',
    description: '150+ original games and interactive revision tools.',
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
        "text": "VIBEMENOW is an independent ecosystem of 150+ original browser games, interactive quizzes, and GCSE revision tools. Our platform is designed for instant play with zero account creation, focusing on active recall and cognitive engagement."
      }
    },
    {
      "@type": "Question",
      "name": "Are the games really free and no-login?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. According to our zero-friction policy, all games are accessible without downloads or sign-ups. We prioritize student focus and rapid-access entertainment."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer GCSE revision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide 150+ interactive modules mapped to AQA, OCR, and Edexcel specifications. Research shows that retrieval practice via gamified modules can improve retention by up to 40% compared to passive reading."
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

