'use client';

import { getTopicsByCategory } from '../computerScienceData';
import MixedGame from '../../components/MixedGame';

export default function CSMixedMode() {
  const topicsByCategory = getTopicsByCategory();
  const subjectsData = {
    'computer-science': Object.values(topicsByCategory).flat()
  };

  return (
    <MixedGame 
      subjectsData={subjectsData}
      title="Computer Science Mixed Practice"
      backLink="/gcse/computer-science"
      backLabel="Back to CS Hub"
    />
  );
}
