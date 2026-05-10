import { getTopicsByCategory } from '../historyData';
import MixedGame from '../../components/MixedGame';

export const metadata = {
  title: 'History Mixed Practice | VIBEMENOW',
  description: 'Practice a variety of GCSE History topics in one session. Interleaved retrieval for better memory retention.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/history/mixed-mode',
  },
};

export default function HistoryMixedMode() {
  const topicsByCategory = getTopicsByCategory();
  const subjectsData = {
    'history': Object.values(topicsByCategory).flat()
  };

  return (
    <MixedGame 
      subjectsData={subjectsData}
      title="History Mixed Practice"
      backLink="/gcse/history"
      backLabel="Back to History Hub"
    />
  );
}
