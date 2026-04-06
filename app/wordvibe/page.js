import WordVibeGame from './WordVibeGame';

export const metadata = {
  title: 'WordVibe — Daily Word Challenge',
  description: 'Guess the 5-letter word in 6 tries. A new word every day! Free daily word game similar to Wordle.',
  alternates: {
    canonical: '/wordvibe',
  },
  openGraph: {
    url: '/wordvibe',
    title: 'WordVibe — Daily Word Challenge | VIBEMENOW',
    description: 'Can you guess today\'s word? 🔤 Play now for free!',
  }

};

export default function WordVibePage() {
  return (
    <>
      <WordVibeGame />
      <article className="seo-guide" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', color: '#ccc', lineHeight: '1.6', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ color: '#00ff94', fontSize: '2em', marginBottom: '20px' }}>WordVibe: The Ultimate Guide to Mastering the Daily Word Challenge</h2>
        
        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>The Phenomenon of Daily Word Games</h3>
        <p>In recent years, the internet has experienced a massive resurgence in the popularity of daily linguistic puzzles. WordVibe takes this wildly addictive format and integrates it seamlessly into your daily routine. The premise is deceivingly simple: you have exactly six attempts to deduce a secret, randomly selected five-letter word. Despite its minimalistic mechanics, WordVibe is an incredibly deep game that tests your vocabulary, your grasp of English phonotactics (how vowels and consonants are permitted to arrange themselves), and your ability to execute ruthless deductive reasoning. Because the puzzle resets globally every 24 hours, it creates an ongoing, communal challenge. Everyone is fighting against the exact same secret word, making the sharing of your daily score box a culturally unifying, and highly competitive, social ritual.</p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>Understanding the Feedback Loop</h3>
        <p>To succeed at WordVibe, you must fully understand the color-coded feedback system provided after every guess.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}><strong>Green Tiles:</strong> Absolute perfection. The letter you entered is in the secret word, and it is located in that exact position. Do not move it in subsequent guesses.</li>
          <li style={{ marginBottom: '10px' }}><strong>Yellow Tiles:</strong> You are on the right track. The letter exists somewhere in the secret word, but it currently resides in the wrong position. You must rearrange this letter on your next attempt.</li>
          <li style={{ marginBottom: '10px' }}><strong>Gray/Dark Tiles:</strong> The letter does not exist anywhere in the secret word. Eliminate it entirely from your mental bank; do not accidentally use it again in your subsequent entries.</li>
        </ul>
        <p>By treating the game less like a spelling bee and more like a logic puzzle similar to &quot;Mastermind," you can quickly isolate the correct answer using basic probability.</p>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>Advanced Strategies for Achieving a 3/6 Score</h3>
        <p>If you find yourself constantly surviving on guess #6, your opening strategy needs an overhaul.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}><strong>The Optimized Starter Word:</strong> Statistically, the best opening words maximize the coverage of common vowels and high-frequency consonants. Words like &quot;ROATE," "STARE," "AUDIO," and "CRANE" are mathematically proven to yield the highest amount of initial color feedback. Avoid starting with words that contain double letters like "PUPPY" or "MUMMY."</li>
          <li style={{ marginBottom: '10px' }}><strong>The &quot;Burner" Second Guess:</strong> If your first guess yields zero green or yellow tiles, do not panic. Use your second guess to intentionally test entirely different, widely used letters, even if it ignores constraints. If your first word was &quot;STARE," use "CLOUD" or "NYMPH" as your second word to rapidly sweep through the remaining vowels and common consonants.</li>
          <li style={{ marginBottom: '10px' }}><strong>Beware the Rhyme Trap:</strong> The most dangerous scenario in WordVibe is having 4 out of 5 green letters early on. For example, if you have &quot;_IGHT," the answer could be MIGHT, LIGHT, RIGHT, TIGHT, FIGHT, or SIGHT. You could easily burn through all 6 attempts guessing the wrong first letter. In this scenario, intentionally sacrifice a turn to type a word like "FILMS" to simultaneously test the F, M, and S.</li>
        </ul>

        <h3 style={{ color: '#fff', fontSize: '1.5em', marginTop: '30px', marginBottom: '15px' }}>Why You Should Play WordVibe Every Day</h3>
        <p>Playing WordVibe daily acts as an excellent, low-stress cognitive exercise. It heavily engages your working vocabulary and linguistic retrieval systems. Attempting to mentally &quot;fit" known letters into blank spaces activates the brain&apos;s pattern recognition networks, delaying the onset of cognitive dullness. Furthermore, limiting the game to a single puzzle per day prevents burnout, making it a sustainable, healthy mental habit rather than an endlessly doom-scrolling distraction.</p>
      </article>
    </>
  );
}
