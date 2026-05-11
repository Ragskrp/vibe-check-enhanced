import CompSciClientWrapper from './CompSciClientWrapper';
import { gcseSeoData } from '../../data/gcseSeoData';

export const metadata = {
  title: 'GCSE Computer Science Revision Games: OCR J277 Algorithms | VIBEMENOW',
  description: 'Master GCSE Computer Science with interactive games for algorithms, systems, and logic. OCR J277 aligned revision built for the next generation of engineers.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/computer-science',
  },
  keywords: [
    'GCSE computer science games',
    'OCR J277 revision games',
    'interactive computer science practice',
    'algorithms games GCSE',
    'logic gate games online',
    'networking revision games',
  ],
};

export default function CompSciHub() {
  return <CompSciClientWrapper seoData={gcseSeoData.computerScience} />;
}
