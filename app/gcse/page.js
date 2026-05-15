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

// ---- Structured Data ----
// Course ItemList — Google's supported format for Course rich results
const courseListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Free GCSE Revision Courses — VIBEMENOW",
  "description": "Curriculum-aligned GCSE revision games for AQA, OCR, and Edexcel. No login required.",
  "url": "https://vibemenow.uk/gcse",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Course",
        "@id": "https://vibemenow.uk/gcse/maths",
        "name": "GCSE Maths Revision Games",
        "description": "42 interactive modules covering algebra, geometry, fractions, and statistics. Aligned to AQA and Edexcel specifications.",
        "url": "https://vibemenow.uk/gcse/maths",
        "provider": { "@type": "Organization", "name": "VIBEMENOW", "url": "https://vibemenow.uk" },
        "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "PT30M" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Course",
        "@id": "https://vibemenow.uk/gcse/science",
        "name": "GCSE Science Revision Games",
        "description": "48 modules covering Biology, Chemistry, and Physics for Triple and Combined award specifications.",
        "url": "https://vibemenow.uk/gcse/science",
        "provider": { "@type": "Organization", "name": "VIBEMENOW", "url": "https://vibemenow.uk" },
        "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "PT30M" }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Course",
        "@id": "https://vibemenow.uk/gcse/computer-science",
        "name": "GCSE Computer Science Revision Games",
        "description": "22 interactive modules covering OCR J277 — algorithms, logic gates, networking, and programming fundamentals.",
        "url": "https://vibemenow.uk/gcse/computer-science",
        "provider": { "@type": "Organization", "name": "VIBEMENOW", "url": "https://vibemenow.uk" },
        "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "PT30M" }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Course",
        "@id": "https://vibemenow.uk/gcse/english-language",
        "name": "GCSE English Language Revision Games",
        "description": "7 modules for AQA English Language: reading analysis (AO1–AO4), creative and transactional writing skills.",
        "url": "https://vibemenow.uk/gcse/english-language",
        "provider": { "@type": "Organization", "name": "VIBEMENOW", "url": "https://vibemenow.uk" },
        "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "PT20M" }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Course",
        "@id": "https://vibemenow.uk/gcse/history",
        "name": "GCSE History Revision Games",
        "description": "24 modules for Edexcel and AQA History: Medicine, Weimar Germany, Elizabethan England, and the Cold War.",
        "url": "https://vibemenow.uk/gcse/history",
        "provider": { "@type": "Organization", "name": "VIBEMENOW", "url": "https://vibemenow.uk" },
        "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "PT25M" }
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Course",
        "@id": "https://vibemenow.uk/gcse/geography",
        "name": "GCSE Geography Revision Games",
        "description": "20 modules covering physical processes, human environments, and case studies mapped to AQA Geography.",
        "url": "https://vibemenow.uk/gcse/geography",
        "provider": { "@type": "Organization", "name": "VIBEMENOW", "url": "https://vibemenow.uk" },
        "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "PT25M" }
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vibemenow.uk" },
    { "@type": "ListItem", "position": 2, "name": "GCSE Revision", "item": "https://vibemenow.uk/gcse" }
  ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GCSEClientWrapper />
    </>
  );
}
