import SiteLayout from '../components/SiteLayout';
import OddOneOutGame from './OddOneOutGame';

export const metadata = {
  title: 'Odd One Out Arena | VIBEMENOW',
  description: 'Fast-paced visual perception race. Find the emoji that doesn\'t match and beat your friends!',
};

export default function OddOneOutPage() {
  return (
    <SiteLayout>
      <OddOneOutGame />
    </SiteLayout>
  );
}
