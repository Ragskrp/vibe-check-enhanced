import { getTopicsByCategory } from '../topicData';
import MixedGame from '../../components/MixedGame';

const toMixedTopic = ({ slug, title, color }) => ({ slug, title, color });

export const metadata = {
  title: 'Maths Mixed Practice | VIBEMENOW',
  description: 'Practice a variety of GCSE Maths topics in one session. Interleaved retrieval for better memory retention.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/maths/mixed-mode',
  },
};

export default function MathsMixedMode() {
  const topicsByCategory = getTopicsByCategory();
  const subjectsData = {
    'maths': Object.values(topicsByCategory).flat().map(toMixedTopic)
  };

  return (
    <MixedGame 
      subjectsData={subjectsData}
      title="Maths Mixed Practice"
      backLink="/gcse/maths"
      backLabel="Back to Maths Hub"
    />
  );
}
