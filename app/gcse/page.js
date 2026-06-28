export const metadata = {
  title: 'GCSE Study Hub | Fleurir',
  description: 'Enter the Fleurir GCSE realm — a narrative world. Learn Maths and Science through story.',
};

const subjects = [
  {
    id: 'maths',
    name: 'Arithmia',
    label: 'Mathematics',
    tagline: 'Numbers, algebra, geometry & statistics',
    description: 'A once-ordered mathematical kingdom whose laws are fracturing under the Unraveller\'s curse. Restore each region to reclaim Arithmia.',
    href: '/gcse/maths',
    badge: 'Available Now',
    available: true,
    topics: ['Number', 'Algebra', 'Geometry', 'Statistics'],
  },
  {
    id: 'science',
    name: 'Scientia',
    label: 'Science',
    tagline: 'Biology, chemistry & physics',
    description: 'The laboratories of Scientia are dormant. Arith\'s sister realm awaits your return.',
    href: '#',
    badge: 'Coming Soon',
    available: false,
    topics: ['Biology', 'Chemistry', 'Physics'],
  },
];

import GCSEHubClient from './GCSEHubClient';

export default function GCSEHubPage() {
  return <GCSEHubClient subjects={subjects} />;
}