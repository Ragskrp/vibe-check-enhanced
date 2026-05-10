'use client';

import { getTopicsByCategory as getMaths } from '../../maths/topicData';
import { getTopicsByCategory as getScience } from '../../science/scienceData';
import { getTopicsByCategory as getCS } from '../../computer-science/computerScienceData';
import { getTopicsByCategory as getHistory } from '../../history/historyData';
import { getTopicsByCategory as getGeography } from '../../geography/geographyData';
import MixedGame from '../../components/MixedGame';

export default function GlobalMixedMode() {
  const subjectsData = {
    'maths': Object.values(getMaths()).flat(),
    'science': Object.values(getScience()).flat(),
    'computer-science': Object.values(getCS()).flat(),
    'history': Object.values(getHistory()).flat(),
    'geography': Object.values(getGeography()).flat()
  };

  return (
    <MixedGame 
      subjectsData={subjectsData}
      title="Global Interleaved Practice"
      backLink="/gcse/dashboard"
      backLabel="ABORT TO DASHBOARD"
    />
  );
}
