import BusinessClientWrapper from './BusinessClientWrapper';

export const metadata = {
  title: 'GCSE Business Revision Games: AQA Interactive Practice & Mock Exams | VIBEMENOW',
  description: 'Master GCSE Business Studies with interactive games for marketing, finance, and operations. AQA aligned revision built for strategic enterprise and better grades.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/business',
  },
  keywords: [
    'GCSE business games',
    'GCSE business revision',
    'AQA business games',
    'interactive business practice',
    'business studies games online',
    'enterprise revision games',
  ],
};

export default function BusinessHub() {
  return <BusinessClientWrapper />;
}
