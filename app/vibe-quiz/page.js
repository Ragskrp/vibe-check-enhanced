import VibeQuizGame from './VibeQuizGame';

export const metadata = {
  title: 'Vibe Quiz — What Vibe Are You?',
  description: 'Take the ultimate personality vibe quiz! Are you a Sunset Dreamer, Neon Warrior, or Cosmic Explorer? Find out now!',
  openGraph: {
    title: 'Vibe Quiz — What Vibe Are You? | VIBEMENOW',
    description: 'Find out your vibe personality! ✨ Take the quiz now!',
  }
};

export default function VibeQuizPage() {
  return <VibeQuizGame />;
}
