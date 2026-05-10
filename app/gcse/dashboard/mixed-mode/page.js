import { getTopicsByCategory as getMaths } from '../../maths/topicData';
import { getTopicsByCategory as getScience } from '../../science/scienceData';
import { getTopicsByCategory as getCS } from '../../computer-science/computerScienceData';
import { getTopicsByCategory as getHistory } from '../../history/historyData';
import { getTopicsByCategory as getGeography } from '../../geography/geographyData';
import { getTopicsByCategory as getEngLang } from '../../english-language/englishLanguageData';
import { getTopicsByCategory as getEngLit } from '../../english-literature/englishLiteratureData';
import { getTopicsByCategory as getBusiness } from '../../business/businessData';
import MixedGame from '../../components/MixedGame';

const toMixedTopic = ({ slug, title, color }) => ({ slug, title, color });

export const metadata = {
  title: 'Global Mixed Practice | GCSE Mastery | VIBEMENOW',
  description: 'The ultimate interleaved practice. Pulls questions from all GCSE subjects for maximum cognitive challenge.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/dashboard/mixed-mode',
  },
};

export default function GlobalMixedMode() {
  const subjectsData = {
    'maths': Object.values(getMaths()).flat().map(toMixedTopic),
    'science': Object.values(getScience()).flat().map(toMixedTopic),
    'computer-science': Object.values(getCS()).flat().map(toMixedTopic),
    'history': Object.values(getHistory()).flat().map(toMixedTopic),
    'geography': Object.values(getGeography()).flat().map(toMixedTopic),
    'english-language': Object.values(getEngLang()).flat().map(toMixedTopic),
    'english-literature': Object.values(getEngLit()).flat().map(toMixedTopic),
    'business': Object.values(getBusiness()).flat().map(toMixedTopic)
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
