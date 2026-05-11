import GCSEClientWrapper from './GCSEClientWrapper';

export const metadata = {
  title: 'Free GCSE Revision Games: Maths, Science & Computer Science | VIBEMENOW',
  description: 'Boost your grades with free, interactive GCSE games. Curriculum-aligned revision modules for Maths, Science, History, and more. No login required—play and learn now.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse',
  },
  keywords: [
    'GCSE games',
    'GCSE revision games',
    'free GCSE revision',
    'interactive GCSE games',
    'maths GCSE games',
    'science GCSE games',
    'computer science GCSE games',
    'UK exam revision games',
  ],
  openGraph: {
    title: 'Interactive GCSE Games & Revision Modules | VIBEMENOW',
    description: 'Master your GCSE subjects through play. Free, specification-mapped games for high-fidelity revision.',
    url: 'https://vibemenow.uk/gcse',
    type: 'website',
  },
};

export default function GCSEHub() {
  return <GCSEClientWrapper />;
}
