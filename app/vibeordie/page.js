import SiteLayout from '../components/SiteLayout';
import VibeOrDieGame from './VibeOrDieGame';

export const metadata = {
  title: 'Vibe or Die — Reaction Speed Game',
  description: 'Test your reaction speed! Click/tap as fast as you can when the screen turns green. How fast are your reflexes?',
  openGraph: {
    title: 'Vibe or Die — Reaction Speed Game | VIBEMENOW',
    description: 'How fast are your reflexes? 🎯 Test your reaction time now!',
  }
};

export default function VibeOrDiePage() {
  return (
    <SiteLayout>
      <VibeOrDieGame />
    </SiteLayout>
  );
}
