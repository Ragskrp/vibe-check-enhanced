'use client';

import { getTopicsByCategory } from '../historyData';
import MixedGame from '../../components/MixedGame';

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
