import GCSEClientWrapper from './GCSEClientWrapper';

export const metadata = {
  title: 'Free GCSE Revision Games: Maths, Science & Computer Science | VIBEMENOW',
  description: 'Master your exams with 150+ curriculum-aligned GCSE revision games. Engineered for high-fidelity active recall and spaced repetition. No login required.',
  keywords: ['GCSE games', 'GCSE revision games', 'AQA revision', 'OCR J277', 'Edexcel Maths', 'free interactive revision'],
  alternates: {
    canonical: 'https://vibemenow.uk/gcse',
  },
  openGraph: {
    title: 'Free GCSE Revision Games: Maths, Science & Computer Science | VIBEMENOW',
    description: '150+ curriculum-aligned games for AQA, OCR, and Edexcel. Play and learn without login.',
    url: 'https://vibemenow.uk/gcse',
    type: 'website',
    images: [{
      url: 'https://vibemenow.uk/og/gcse.png',
      width: 1200,
      height: 630,
      alt: 'VIBEMENOW GCSE Revision Games'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free GCSE Revision Games | VIBEMENOW',
    description: 'Master your exams with 150+ interactive revision games.',
    images: ['https://vibemenow.uk/og/gcse.png'],
  },
};


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are these GCSE revision games free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, VIBEMENOW provides 150+ completely free GCSE revision games across Maths, Science, History, and Computer Science. No account or login is required."
      }
    },
    {
      "@type": "Question",
      "name": "Which exam boards are covered?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our interactive modules are specifically mapped to UK specifications including AQA, OCR (Computer Science J277), and Edexcel. According to pedagogical research, active retrieval practice through gamified modules can improve retention by up to 40%."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up to track progress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. VIBEMENOW uses local session storage to track your game streaks and topic mastery, allowing you to revise without the friction of account creation."
      }
    }
  ]
};


export default function GCSEHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GCSEClientWrapper />
    </>
  );
}

