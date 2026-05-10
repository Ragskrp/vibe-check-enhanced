'use client';

import { getTopicsByCategory } from '../topicData';
import MixedGame from '../../components/MixedGame';

export default function MathsMixedMode() {
  const topicsByCategory = getTopicsByCategory();
  const subjectsData = {
    'maths': Object.values(topicsByCategory).flat()
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
