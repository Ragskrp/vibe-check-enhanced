import SiteLayout from '../components/SiteLayout';
import EmojiIQGame from './EmojiIQGame';

export const metadata = {
  title: 'Emoji IQ — Guess the Emoji Puzzle',
  description: 'Can you decode emoji puzzles? Guess movies, phrases, and more from emoji clues. Test your Emoji IQ now!',
  openGraph: {
    title: 'Emoji IQ — Decode Emoji Puzzles | VIBEMENOW',
    description: 'How smart are you with emojis? 😂 Test your Emoji IQ now!',
  }
};

export default function EmojiIQPage() {
  return (
    <SiteLayout>
      <EmojiIQGame />
    </SiteLayout>
  );
}
