import SiteLayout from '../components/SiteLayout';
import ReactionArenaGame from './ReactionArenaGame';

export const metadata = {
  title: 'Reaction Arena | VIBEMENOW',
  description: 'Multiplayer fast-reflex battle. Challenge your friends to see who can react the fastest!',
};

export default function ReactionArenaPage() {
  return (
    <SiteLayout>
      <ReactionArenaGame />
    </SiteLayout>
  );
}
