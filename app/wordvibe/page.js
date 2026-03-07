import SiteLayout from '../components/SiteLayout';
import WordVibeGame from './WordVibeGame';

export const metadata = {
  title: 'WordVibe — Daily Word Challenge',
  description: 'Guess the 5-letter word in 6 tries. A new word every day! Free daily word game similar to Wordle.',
  openGraph: {
    title: 'WordVibe — Daily Word Challenge | VIBECHECK',
    description: 'Can you guess today\'s word? 🔤 Play now for free!',
  }
};

export default function WordVibePage() {
  return (
    <SiteLayout>
      <WordVibeGame />
    </SiteLayout>
  );
}
