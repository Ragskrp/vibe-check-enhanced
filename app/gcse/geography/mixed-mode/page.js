import { getTopicsByCategory } from '../geographyData';
import MixedGame from '../../components/MixedGame';

export const metadata = {
  title: 'Geography Mixed Practice | VIBEMENOW',
  description: 'Practice a variety of GCSE Geography topics in one session. Interleaved retrieval for better memory retention.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/geography/mixed-mode',
  },
};

export default function GeographyMixedMode() {
  const topicsByCategory = getTopicsByCategory();
  const subjectsData = {
    'geography': Object.values(topicsByCategory).flat()
  };

  return (
    <MixedGame 
      subjectsData={subjectsData}
      title="Geography Mixed Practice"
      backLink="/gcse/geography"
      backLabel="Back to Geography Hub"
    />
  );
}
