import ScienceClientWrapper from './ScienceClientWrapper';
import { gcseSeoData } from '../../data/gcseSeoData';

export const metadata = {
  title: 'GCSE Science Revision Games: Biology, Chemistry, Physics | VIBEMENOW',
  description: 'Master GCSE Science with interactive games for Biology, Chemistry, and Physics. Triple and Combined science revision built for empirical mastery.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/science',
  },
  keywords: [
    'GCSE science games',
    'GCSE biology games',
    'GCSE chemistry games',
    'GCSE physics games',
    'interactive science revision',
    'triple science games',
    'combined science games',
  ],
};

export default function ScienceHub() {
  return <ScienceClientWrapper seoData={gcseSeoData.science} />;
}
