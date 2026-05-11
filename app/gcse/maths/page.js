import MathsClientWrapper from './MathsClientWrapper';
import { gcseSeoData } from '../../data/gcseSeoData';

export const metadata = {
  title: 'GCSE Maths Revision Games: Interactive Practice & Mock Exams | VIBEMENOW',
  description: 'Master GCSE Mathematics with interactive algebra, geometry, and number games. Curriculum-aligned revision built for Foundation and Higher tiers.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/maths',
  },
  keywords: [
    'GCSE maths games',
    'GCSE maths revision',
    'interactive maths practice',
    'maths mock exams online',
    'algebra games GCSE',
    'geometry games GCSE',
  ],
};

export default function MathsHub() {
  return <MathsClientWrapper seoData={gcseSeoData.maths} />;
}
