'use client';

import { getTopicsByCategory } from '../scienceData';
import MixedGame from '../../components/MixedGame';

export default function ScienceMixedMode() {
  const topicsByCategory = getTopicsByCategory();
  const subjectsData = {
    'science': Object.values(topicsByCategory).flat()
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
