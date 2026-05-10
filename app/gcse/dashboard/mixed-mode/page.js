import { getTopicsByCategory as getMaths } from '../../maths/topicData';
import { getTopicsByCategory as getScience } from '../../science/scienceData';
import { getTopicsByCategory as getCS } from '../../computer-science/computerScienceData';
import { getTopicsByCategory as getHistory } from '../../history/historyData';
import { getTopicsByCategory as getGeography } from '../../geography/geographyData';
import { getTopicsByCategory as getEngLang } from '../../english-language/englishLanguageData';
import { getTopicsByCategory as getEngLit } from '../../english-literature/englishLiteratureData';
import { getTopicsByCategory as getBusiness } from '../../business/businessData';
import MixedGame from '../../components/MixedGame';

export const metadata = {
  title: 'Global Mixed Practice | GCSE Mastery | VIBEMENOW',
  description: 'The ultimate interleaved practice. Pulls questions from all GCSE subjects for maximum cognitive challenge.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/dashboard/mixed-mode',
  },
};

export default function GlobalMixedMode() {
  const subjectsData = {
    'maths': Object.values(getMaths()).flat(),
    'science': Object.values(getScience()).flat(),
    'computer-science': Object.values(getCS()).flat(),
    'history': Object.values(getHistory()).flat(),
    'geography': Object.values(getGeography()).flat(),
    'english-language': Object.values(getEngLang()).flat(),
    'english-literature': Object.values(getEngLit()).flat(),
    'business': Object.values(getBusiness()).flat()
  };

  return (
    <MixedGame 
      subjectsData={subjectsData}
      title="Global Mastery Gauntlet"
      backLink="/gcse/dashboard"
      backLabel="Back to Mission Control"
      isGlobal={true}
    />
  );
}
