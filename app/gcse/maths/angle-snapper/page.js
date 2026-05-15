import AngleSnapperClient from './AngleSnapperClient';

export const metadata = {
  title: 'Angle Snapper: GCSE Geometry Practice Game | VIBEMENOW',
  description: 'Master angles on a straight line, in triangles, and around a point with our interactive geometry game. Perfect for GCSE Maths Foundation and Higher revision.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/maths/angle-snapper',
  },
};

export default function AngleSnapperPage() {
  return <AngleSnapperClient />;
}
