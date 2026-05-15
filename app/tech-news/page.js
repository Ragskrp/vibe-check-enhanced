import TechNewsClient from './TechNewsClient';

export const metadata = {
  title: 'Tech News | AI, Hardware & Digital Culture | VIBEMENOW',
  description: 'Stay ahead with Tech Pulse. Breaking analysis on AI, cybersecurity, and the future of hardware, curated for the UK tech community.',
  alternates: {
    canonical: 'https://vibemenow.uk/tech-news',
  },
  openGraph: {
    title: 'Tech News | AI, Hardware & Digital Culture | VIBEMENOW',
    description: 'Breaking analysis on AI, cybersecurity, and the future of hardware.',
    url: 'https://vibemenow.uk/tech-news',
    siteName: 'VIBEMENOW',
    type: 'website',
  }
};

export default function TechNewsPage() {
  return <TechNewsClient />;
}
