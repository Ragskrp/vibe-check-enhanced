import { getTopicsByCategory } from '../computerScienceData';
import MixedGame from '../../components/MixedGame';

const toMixedTopic = ({ slug, title, color }) => ({ slug, title, color });

export const metadata = {
  title: 'Computer Science Mixed Practice | VIBEMENOW',
  description: 'Practice a variety of GCSE Computer Science topics in one session. Interleaved retrieval for better memory retention.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/computer-science/mixed-mode',
  },
};

export default function ComputerScienceMixedMode() {
  const topicsByCategory = getTopicsByCategory();
  const subjectsData = {
    'computer-science': Object.values(topicsByCategory).flat().map(toMixedTopic)
  };

  return (
    <MixedGame 
      subjectsData={subjectsData}
      title="Computer Science Mixed Practice"
      backLink="/gcse/computer-science"
      backLabel="Back to Computer Science Hub"
    />
  );
}
