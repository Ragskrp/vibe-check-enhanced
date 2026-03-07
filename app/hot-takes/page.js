import SiteLayout from '../components/SiteLayout';
import HotTakesGame from './HotTakesGame';

export const metadata = {
  title: 'Hot Takes — Vote on Viral Opinions',
  description: 'Do you agree or disagree? Vote on controversial hot takes and see if your opinion matches the crowd!',
  openGraph: {
    title: 'Hot Takes — Vote on Viral Opinions | VIBEMENOW',
    description: 'Spicy opinions need your vote! 🔥 Agree or disagree?',
  }
};

export default function HotTakesPage() {
  return (
    <SiteLayout>
      <HotTakesGame />
    </SiteLayout>
  );
}
