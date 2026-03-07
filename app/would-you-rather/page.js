import SiteLayout from '../components/SiteLayout';
import WouldYouRatherGame from './WouldYouRatherGame';

export const metadata = {
  title: 'Would You Rather — Impossible Choices Game',
  description: 'Face impossible choices! Would you rather have superpowers or unlimited money? Pick one and see what others chose!',
  openGraph: {
    title: 'Would You Rather — Impossible Choices | VIBEMENOW',
    description: 'Impossible choices need your vote! 😈 Which would YOU pick?',
  }
};

export default function WouldYouRatherPage() {
  return (
    <SiteLayout>
      <WouldYouRatherGame />
    </SiteLayout>
  );
}
