import SiteLayout from '../components/SiteLayout';
import QuizArenaGame from './QuizArenaGame';

export const metadata = {
  title: 'Quiz Arena — Trivia Challenge',
  description: 'Challenge yourself with trivia across 8 categories! General Knowledge, Pop Culture, Science, Gaming, Movies, Music, Food, and Sports.',
  openGraph: {
    title: 'Quiz Arena — Trivia Challenge | VIBECHECK',
    description: 'Test your knowledge across 8 categories! 🏆 How high can you score?',
  }
};

export default function QuizArenaPage() {
  return (
    <SiteLayout>
      <QuizArenaGame />
    </SiteLayout>
  );
}
