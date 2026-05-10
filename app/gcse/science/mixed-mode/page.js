import { getTopicsByCategory } from '../scienceData';
import MixedGame from '../../components/MixedGame';

const toMixedTopic = ({ slug, title, color }) => ({ slug, title, color });

export const metadata = {
  title: 'Science Mixed Practice | VIBEMENOW',
  description: 'Practice a variety of GCSE Science topics in one session. Interleaved retrieval for better memory retention.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/science/mixed-mode',
  },
};

export default function ScienceMixedMode() {
  const topicsByCategory = getTopicsByCategory();
  const subjectsData = {
    'science': Object.values(topicsByCategory).flat().map(toMixedTopic)
  };

  return (
    <MixedGame 
      subjectsData={subjectsData}
      title="Science Mixed Practice"
      backLink="/gcse/science"
      backLabel="Back to Science Hub"
    />
  );
}
