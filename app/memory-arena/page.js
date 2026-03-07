import SiteLayout from '../components/SiteLayout';
import MemoryArenaGame from './MemoryArenaGame';

export const metadata = {
  title: 'Memory Arena | VIBEMENOW',
  description: 'The ultimate group memory challenge. Copy the sequence and be the last player standing!',
};

export default function MemoryArenaPage() {
  return (
    <SiteLayout>
      <MemoryArenaGame />
    </SiteLayout>
  );
}
