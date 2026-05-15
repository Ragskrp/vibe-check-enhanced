import EquationRushClient from './EquationRushClient';

export const metadata = {
  title: 'Equation Rush: GCSE Algebra Speed Challenge | VIBEMENOW',
  description: 'Boost your algebra skills with our fast-paced equation solving game. Practice one-step, two-step, and bracket equations for GCSE Maths.',
  alternates: {
    canonical: 'https://vibemenow.uk/gcse/maths/equation-rush',
  },
};

export default function EquationRushPage() {
  return <EquationRushClient />;
}
