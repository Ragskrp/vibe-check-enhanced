import HistoryClientWrapper from './HistoryClientWrapper';

export const metadata = {
  title: 'GCSE History Revision Games: Edexcel & AQA Timeline Practice | VIBEMENOW',
  description: 'Master GCSE History with interactive chronology games and source evaluation practice. Edexcel and AQA mapped revision for Medicine, Germany, and the Cold War.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/history',
  },
  keywords: [
    'GCSE history games',
    'GCSE history revision',
    'Edexcel history games',
    'AQA history games',
    'interactive history revision',
    'history timeline games',
  ],
};

export default function HistoryHub() {
  return <HistoryClientWrapper />;
}
