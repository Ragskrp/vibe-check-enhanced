'use client';

import { getTopicsByCategory } from '../geographyData';
import MixedGame from '../../components/MixedGame';

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
