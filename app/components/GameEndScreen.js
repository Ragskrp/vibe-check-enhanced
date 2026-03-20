'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Share2, RotateCcw, TrendingUp, Flame, BookOpen, Zap } from 'lucide-react';
import { getGameStats, recordGame } from './GameStats';

/**
 * "Did You Know?" facts for each game — adds genuine educational value
 */
const FACTS = {
  'emoji-iq': [
    'The first emoji was created in 1999 by Japanese artist Shigetaka Kurita. He designed 176 12×12 pixel icons for a Japanese mobile carrier.',
    'There are currently over 3,600 emojis in the Unicode Standard, and the number grows every year as new ones are approved.',
    'The "Face with Tears of Joy" 😂 was the most-used emoji worldwide from 2015 to 2021, when it was overtaken by 🥹.',
    'The word "emoji" comes from the Japanese words "e" (picture) and "moji" (character). Despite the similarity, it is unrelated to the English word "emotion."',
    'Finland was the first country to publish a set of national emojis, including a sauna emoji and a Nokia phone emoji.',
    'In 2015, Oxford Dictionaries named 😂 (Face with Tears of Joy) as the "Word of the Year" — the first time a pictograph received the honour.',
    'Emojis can appear differently across platforms. An emoji sent from an iPhone may look completely different on a Samsung device.',
    'A "rebus puzzle" (pictures representing words or phrases) dates back to ancient Egypt. Emoji IQ is essentially a modern digital rebus.',
    'According to linguists, emojis function as a "paralanguage" — they convey tone and emotion the same way body language does in face-to-face conversations.',
    'The 🍑 peach emoji is one of the most semantically ambiguous emojis, with its intended meaning differing wildly from its commonly understood usage.',
    'The "Thinking Face" 🤔 is often used as a replacement for "hmmm" or "really?" but was originally meant to represent a questioning of one\'s own thoughts.',
    'Google\'s emoji design and Apple\'s emoji design differ significantly, particularly in the "Gun" emoji, which transitioned from a revolver to a water pistol in 2016.'
  ],
  'wordvibe': [
    'The English language has approximately 170,000 words in current use, but the average adult knows only about 20,000–35,000.',
    'The most common starting letter for English words is "S," followed by "C" and "P." The least common are "X," "Z," and "Q."',
    'The letter "E" appears in 11% of all English text, making it the most frequently used letter by a wide margin.',
    'In competitive Scrabble, the highest-scoring single word ever played was "OXYPHENBUTAZONE" for 1,778 points.',
    'The word "SET" has the most definitions of any English word — over 430 different meanings in the Oxford English Dictionary.',
    'Only about 3% of five-letter English words contain the letter "Z." This is why it is almost never a good starting guess.',
    'The average English speaker can read about 250 words per minute, but word game experts report significantly faster lexical retrieval speeds.',
    'Linguists call the phenomenon of having a word "on the tip of your tongue" the "TOT state." Word games actively train your brain to overcome it.',
    'The frequency of double letters varies wildly: "LL" and "SS" are common, but "QQ" and "VV" basically never appear in English.',
    '"AERIE" (an eagle\'s nest) and "ADIEU" are considered two of the most efficient starter words in 5-letter word games due to vowel coverage.',
    'The word "RHYTHM" is the longest commonly used English word without any of the five standard vowels (A, E, I, O, U).',
    'Approximately 1,000 new words are added to the Oxford English Dictionary every year. "Binge-watch" and "Sexting" are relatively recent additions.'
  ],
  'geography-guesser': [
    'Nepal is the only country in the world whose flag is not rectangular. It consists of two stacked triangles.',
    'Switzerland and Vatican City are the only two countries with square flags.',
    'The flag of Mozambique features an AK-47 rifle — the only national flag to depict a modern firearm.',
    'Denmark\'s flag (the Dannebrog) is the oldest continuously used national flag, dating back to 1219.',
    'The flags of Romania and Chad are virtually identical — both feature vertical blue, yellow, and red stripes.',
    'Indonesia and Monaco share nearly identical flags (red over white). The only difference is the proportions.',
    'Libya\'s flag from 1977 to 2011 was the only national flag in the world to consist of a single solid colour (green).',
    'The flag of Cambodia is one of only 3 flags to feature a building — it depicts Angkor Wat, the world\'s largest religious monument.',
    'The most common colour on national flags is red, appearing on about 74% of all sovereign nation flags worldwide.',
    'Only 3 countries — the UK, Australia, and New Zealand — have flags that include another country\'s flag (the Union Jack) as part of their design.',
    'Vexillology is the study of flags. The term was coined in 1957 by US flag expert Whitney Smith.',
    'The South African flag is remarkably complex, featuring six distinct colours arranged in a "Y" shape to symbolise unity.'
  ],
  'hot-takes': [
    'Research shows that "opinion polarisation" increases when people see how others voted. Knowing you\'re in the minority makes you hold your opinion even more firmly.',
    'The term "hot take" originated in American sports journalism around 2012, referring to deliberately provocative commentary designed to generate engagement.',
    'Psychologist Daniel Kahneman found that humans use "fast thinking" (System 1) for snap judgements like Hot Takes — it is emotional, not rational.',
    'According to social psychology, people are more likely to share a controversial opinion if they believe at least 10% of others will agree with them.',
    'The "False Consensus Effect" means we naturally assume that most people share our opinions — which is why seeing the real poll results is so surprising.',
    'Studies show that debates about trivial topics (like pineapple on pizza) activate the same brain regions as debates about serious moral issues.',
    'The psychological concept of "identity-protective cognition" means people will defend opinions that are tied to their self-image, regardless of evidence.',
    'Humans make approximately 35,000 decisions per day. Games like Hot Takes train your ability to commit to fast, instinctive choices.',
    'Sociologists call our tendency to follow the crowd the "Bandwagon Effect." It\'s why popular opinions tend to get even more popular over time.',
    'A study on internet comments found that the first three comments on an article disproportionately influence the overall tone of the discussion.'
  ],
  'vibe-quiz': [
    'The concept of "aesthetic identity" — defining yourself through visual and cultural preferences — has grown 340% as a search term since 2020.',
    'Carl Jung\'s theory of psychological archetypes (1919) forms the foundation of most modern personality quizzes, including VIBEMENOW\'s Vibe profiles.',
    'Research from Cambridge University found that personality quizzes shared on social media receive 3x more engagement than standard posts.',
    'The "Barnum Effect" describes why personality descriptions feel personally accurate — they are written broadly enough to apply to almost anyone.',
    'Your aesthetic preferences are shaped by a combination of genetics (about 40%) and environmental factors (about 60%), according to twin studies.',
    'Colour psychology suggests that people who prefer cool tones (blue, green) tend to be more introverted, while warm tone lovers (red, orange) trend extroverted.',
    'The Big Five personality model (OCEAN) is the most scientifically validated personality framework, measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    'Social media algorithms are increasingly personalised based on aesthetic preferences — knowing your "vibe" literally helps you curate your digital experience.',
    'Wait, personality isn\'t fixed! Research shows that significant life events can meaningfully shift your personality traits even in adulthood.',
    'The "Self-Reference Effect" means you\'re more likely to remember information if you can relate it to your own personality or vibe.'
  ],
  'would-you-rather': [
    'The philosophical "Trolley Problem" is essentially a Would You Rather scenario — and it has been debated by ethicists since 1967.',
    'Loss aversion research shows that humans feel the pain of losing something approximately 2x more intensely than the joy of gaining the same thing.',
    'The brain\'s anterior cingulate cortex — responsible for decision-making under conflict — lights up intensely during "impossible choice" scenarios.',
    'Psychologists call the discomfort of choosing between two undesirable options an "avoidance-avoidance conflict" — one of the most stressful decision types.',
    'Research shows that people who regularly engage in hypothetical decision-making games score higher on measures of cognitive flexibility and creative problem-solving.',
    'The "paradox of choice" theory by Barry Schwartz suggests that having more options actually makes people less happy — which is why 2-option games feel satisfying.',
    'Studies show that about 80% of "Would You Rather" answers can be predicted by just 3 personality traits: risk tolerance, empathy, and novelty-seeking.',
    'Mirror neurons fire when you observe someone else making a tough choice — which is why watching friends play Would You Rather is almost as engaging as playing yourself.',
    'The "Sunk Cost Fallacy" often influences our choices — we tend to stick with bad decisions because we\'ve already "invested" so much time in them!',
    'Deciding between two equally good options is known as an "approach-approach conflict," and it actually takes longer for the brain to resolve than a bad choice.'
  ],
  'vibeordie': [
    'The concept of "gamified binary choices" was pioneered by the 1997 board game "Scattergories" and evolved into modern mobile gaming formats.',
    'Brain scans show that time pressure during decision-making activates the amygdala (stress centre), which can either sharpen or impair judgement depending on the individual.',
    'Competitive gaming (esports) is now a $1.8 billion industry, with reaction-based games being among the most-watched categories.',
    'The human attention span for a single cognitive task averages 8–12 seconds — perfectly aligned with speed-based game round durations.',
    'Research from Stanford University shows that casual gaming for 20 minutes per day can reduce stress hormones by up to 17%.',
    'Professional Formula 1 drivers have an average reaction time of around 200ms — can you beat a racer\'s reflex?',
    'The speed of nerve impulses in the human body can reach up to 120 metres per second (268 mph)!'
  ],
};

/**
 * Related game suggestions for each game
 */
const RELATED_GAMES = {
  'emoji-iq': [
    { emoji: '🔤', name: 'WordVibe', path: '/wordvibe', desc: 'Guess the 5-letter word' },
    { emoji: '🌍', name: 'Geo Guesser', path: '/geography-guesser', desc: 'Name the flag' },
    { emoji: '✨', name: 'Vibe Quiz', path: '/vibe-quiz', desc: 'Discover your vibe' },
  ],
  'wordvibe': [
    { emoji: '😂', name: 'Emoji IQ', path: '/emoji-iq', desc: 'Decode emoji puzzles' },
    { emoji: '🏆', name: 'Quiz Arena', path: '/quiz-arena', desc: 'Multiplayer trivia' },
    { emoji: '🌍', name: 'Geo Guesser', path: '/geography-guesser', desc: 'Flag challenge' },
  ],
  'geography-guesser': [
    { emoji: '😂', name: 'Emoji IQ', path: '/emoji-iq', desc: 'Test your emoji skills' },
    { emoji: '🔤', name: 'WordVibe', path: '/wordvibe', desc: 'Daily word challenge' },
    { emoji: '🏆', name: 'Quiz Arena', path: '/quiz-arena', desc: 'Compete with friends' },
  ],
  'hot-takes': [
    { emoji: '😈', name: 'Would U Rather', path: '/would-you-rather', desc: 'Impossible choices' },
    { emoji: '🗳️', name: 'Poll Party', path: '/poll-party', desc: 'Group polling game' },
    { emoji: '✨', name: 'Vibe Quiz', path: '/vibe-quiz', desc: 'Find your personality' },
  ],
  'vibe-quiz': [
    { emoji: '😈', name: 'Would U Rather', path: '/would-you-rather', desc: 'Test your choices' },
    { emoji: '🔥', name: 'Hot Takes', path: '/hot-takes', desc: 'Agree or disagree?' },
    { emoji: '🎯', name: 'Vibe or Die', path: '/vibeordie', desc: 'Fast-paced vibes' },
  ],
  'would-you-rather': [
    { emoji: '🔥', name: 'Hot Takes', path: '/hot-takes', desc: 'Viral opinions' },
    { emoji: '✨', name: 'Vibe Quiz', path: '/vibe-quiz', desc: 'Know your vibe' },
    { emoji: '🗳️', name: 'Poll Party', path: '/poll-party', desc: 'Group decisions' },
  ],
  'vibeordie': [
    { emoji: '⚡', name: 'Reaction Arena', path: '/reaction-arena', desc: 'Test your reflexes' },
    { emoji: '✨', name: 'Vibe Quiz', path: '/vibe-quiz', desc: 'Personality test' },
    { emoji: '😂', name: 'Emoji IQ', path: '/emoji-iq', desc: 'Decode emojis' },
  ],
};

/**
 * Related guide for each game
 */
const GAME_GUIDES = {
  'emoji-iq': { title: 'Decoding the Emoji Language', path: '/guides/emoji-iq-mastery' },
  'wordvibe': { title: 'WordVibe Mastery Strategies', path: '/guides/wordvibe-strategies' },
  'geography-guesser': { title: 'Geography World Knowledge', path: '/guides/geography-guesser-tips' },
  'vibe-quiz': { title: 'Ultimate Vibe Quiz Guide', path: '/guides/vibe-quiz-mastery' },
  'would-you-rather': { title: 'Psychology of Impossible Choices', path: '/guides/would-you-rather-psychology' },
  'hot-takes': { title: 'Mastering Online Discussion', path: '/guides/vibe-quiz-mastery' },
  'vibeordie': { title: 'Reaction Time Training Tips', path: '/guides/reaction-arena-tips' },
};

/**
 * GameEndScreen component — shows stats, fact, and related games after completing a game
 */
export default function GameEndScreen({
  gameId,           // e.g. 'emoji-iq'
  score,            // Current game score
  maxScore,         // Maximum possible score
  emoji,            // Large result emoji
  title,            // e.g. "EMOJI GENIUS"
  description,      // e.g. "You speak emoji fluently!"
  accentColor = '#00d4ff', // Theme colour for this game
  onShare,          // Share handler
  onPlayAgain,      // Play again handler
  children,         // Any extra content between title and stats
}) {
  const [stats, setStats] = useState(null);
  const [fact, setFact] = useState('');
  const [recorded, setRecorded] = useState(false);

  useEffect(() => {
    if (!recorded) {
      const updatedStats = recordGame(gameId, score, maxScore);
      setStats(updatedStats);
      setRecorded(true);
    }

    // Pick a random fact
    const gameFacts = FACTS[gameId] || [];
    if (gameFacts.length > 0) {
      setFact(gameFacts[Math.floor(Math.random() * gameFacts.length)]);
    }
  }, [gameId, score, maxScore, recorded]);

  const relatedGames = RELATED_GAMES[gameId] || [];
  const guide = GAME_GUIDES[gameId];

  return (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      {/* Main Result */}
      <div className="result-card" style={{ borderColor: accentColor }}>
        <div className="result-emoji">{emoji}</div>
        <div className="result-title" style={{ color: accentColor }}>{title}</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: accentColor, margin: '8px 0' }}>
          {score}{maxScore ? `/${maxScore}` : ''}
        </div>
        <div className="result-desc">{description}</div>

        {children}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
          {onShare && (
            <button className="share-btn" onClick={onShare}>
              <Share2 size={16} /> Share Score
            </button>
          )}
          <button className="btn-outline" onClick={onPlayAgain}>
            <RotateCcw size={16} /> Play Again
          </button>
        </div>
      </div>

      {/* Stats Strip */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8, margin: '20px 0',
        }}>
          {[
            { label: 'Played', value: stats.gamesPlayed, icon: <TrendingUp size={14} /> },
            { label: 'Best', value: stats.bestScore, icon: <Zap size={14} /> },
            { label: 'Streak', value: `${stats.currentStreak}🔥`, icon: <Flame size={14} /> },
            { label: 'Longest', value: stats.longestStreak, icon: <Flame size={14} /> },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '14px 8px', borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: 11, color: '#555', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                {stat.icon} {stat.label}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#f0f0f0' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Did You Know? */}
      {fact && (
        <div style={{
          margin: '20px 0', padding: '20px 24px', borderRadius: 16,
          background: `${accentColor}08`,
          border: `1px solid ${accentColor}20`,
          textAlign: 'left',
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            💡 Did You Know?
          </div>
          <p style={{ color: '#bbb', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{fact}</p>
        </div>
      )}

      {/* Expert Guide */}
      {guide && (
        <Link href={guide.path} style={{ textDecoration: 'none' }}>
          <div style={{
            margin: '16px 0', padding: '16px 20px', borderRadius: 12,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: 12,
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}>
            <BookOpen size={20} color={accentColor} />
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f0' }}>📖 {guide.title}</div>
              <div style={{ fontSize: 11, color: '#555' }}>Read our expert guide to improve your score</div>
            </div>
            <span style={{ color: accentColor, fontSize: 18 }}>→</span>
          </div>
        </Link>
      )}

      {/* More Games */}
      {relatedGames.length > 0 && (
        <div style={{ margin: '20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Play Next
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {relatedGames.map((game, i) => (
              <Link key={i} href={game.path} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '16px 12px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{game.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f0' }}>{game.name}</div>
                  <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{game.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
