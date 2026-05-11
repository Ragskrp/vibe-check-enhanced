import GeographyClientWrapper from './GeographyClientWrapper';

export const metadata = {
  title: 'GCSE Geography Revision Games: AQA & Edexcel Interactive Practice | VIBEMENOW',
  description: 'Master GCSE Geography with interactive games on physical processes, human environments, and case studies. AQA and Edexcel aligned revision for tectonic hazards, weather, and urban issues.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/geography',
  },
  keywords: [
    'GCSE geography games',
    'GCSE geography revision',
    'AQA geography games',
    'Edexcel geography games',
    'interactive geography practice',
    'geography case study games',
  ],
};

export default function GeographyHub() {
  return <GeographyClientWrapper />;
}
