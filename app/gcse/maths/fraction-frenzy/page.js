import FractionFrenzyClient from './FractionFrenzyClient';

export const metadata = {
  title: 'Fraction Frenzy: GCSE FDP Revision Game | VIBEMENOW',
  description: 'Master fractions, decimals, and percentages with our interactive revision game. Practice equivalent fractions, percentage increase, and conversions.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/maths/fraction-frenzy',
  },
};

export default function FractionFrenzyPage() {
  return <FractionFrenzyClient />;
}
