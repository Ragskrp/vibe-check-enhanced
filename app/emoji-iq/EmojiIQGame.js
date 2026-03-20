'use client';

import { useState, useEffect } from 'react';
import { Share2, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '15%', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255, 230, 0, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const PUZZLES = [
  { emojis: '🕷️🧑‍🦱🕸️', answer: 'Spider-Man', options: ['Batman', 'Spider-Man', 'Superman', 'Ant-Man'], category: '🎬 Movie' },
  { emojis: '🧊🚢💔', answer: 'Titanic', options: ['Frozen', 'Titanic', 'The Poseidon Adventure', 'Ice Age'], category: '🎬 Movie' },
  { emojis: '🦁👑🌍', answer: 'The Lion King', options: ['Narnia', 'The Lion King', 'Madagascar', 'Tarzan'], category: '🎬 Movie' },
  { emojis: '🧙‍♂️💍🌋', answer: 'Lord of the Rings', options: ['Harry Potter', 'The Hobbit', 'Lord of the Rings', 'Narnia'], category: '🎬 Movie' },
  { emojis: '👻👻👻🔫', answer: 'Ghostbusters', options: ['Scooby-Doo', 'Ghostbusters', 'Casper', 'The Sixth Sense'], category: '🎬 Movie' },
  { emojis: '🎵🎤👸❄️', answer: 'Let It Go', options: ['Shake It Off', 'Let It Go', 'Rolling in the Deep', 'Bohemian Rhapsody'], category: '🎵 Song' },
  { emojis: '🍕🐢🥷', answer: 'Teenage Mutant Ninja Turtles', options: ['Kung Fu Panda', 'Teenage Mutant Ninja Turtles', 'Power Rangers', 'Ninjago'], category: '📺 Show' },
  { emojis: '🏠🔑❤️', answer: 'Home Sweet Home', options: ['Home Alone', 'Home Sweet Home', 'Full House', 'Housekeeper'], category: '💬 Phrase' },
  { emojis: '⭐⚔️🌌', answer: 'Star Wars', options: ['Star Trek', 'Guardians', 'Star Wars', 'Interstellar'], category: '🎬 Movie' },
  { emojis: '🏋️‍♂️💪🥊', answer: 'Rocky', options: ['Creed', 'Rocky', 'Raging Bull', 'Warrior'], category: '🎬 Movie' },
  { emojis: '🧟‍♂️🧠🔫', answer: 'The Walking Dead', options: ['World War Z', 'The Walking Dead', 'Resident Evil', 'Zombieland'], category: '📺 Show' },
  { emojis: '🐠🔍🌊', answer: 'Finding Nemo', options: ['Moana', 'Finding Nemo', 'Shark Tale', 'The Little Mermaid'], category: '🎬 Movie' },
  { emojis: '🧹✨🏰', answer: 'Harry Potter', options: ['Harry Potter', 'Cinderella', 'Enchanted', 'Fantasia'], category: '🎬 Movie' },
  { emojis: '🏎️💨🏁', answer: 'Fast & Furious', options: ['Cars', 'Fast & Furious', 'Need for Speed', 'Rush'], category: '🎬 Movie' },
  { emojis: '🐒👑🍌', answer: 'Donkey Kong', options: ['King Kong', 'Donkey Kong', 'Tarzan', 'Curious George'], category: '🎮 Game' },
  { emojis: '🎩🐇🪄', answer: 'Magic Show', options: ['Magic Show', 'Alice in Wonderland', 'The Prestige', 'Harry Potter'], category: '💬 Phrase' },
  { emojis: '🌊🏄‍♂️☀️', answer: 'Surf\'s Up', options: ['Blue Crush', 'Surf\'s Up', 'Soul Surfer', 'Point Break'], category: '🎬 Movie' },
  { emojis: '👨‍🍳🐀🇫🇷', answer: 'Ratatouille', options: ['Julie & Julia', 'Ratatouille', 'Chef', 'Burnt'], category: '🎬 Movie' },
  { emojis: '🤖❤️🌱', answer: 'WALL-E', options: ['I, Robot', 'WALL-E', 'Big Hero 6', 'Terminator'], category: '🎬 Movie' },
  { emojis: '🦈🌊😱', answer: 'Jaws', options: ['Sharknado', 'Jaws', 'The Meg', 'Deep Blue Sea'], category: '🎬 Movie' },
  { emojis: '🧛‍♂️🦇🏰', answer: 'Dracula', options: ['Twilight', 'Dracula', 'Blade', 'Van Helsing'], category: '🎬 Movie' },
  { emojis: '🐍✈️😱', answer: 'Snakes on a Plane', options: ['Flight', 'Snakes on a Plane', 'Air Force One', 'Red Eye'], category: '🎬 Movie' },
  { emojis: '🥚🦖🌴', answer: 'Jurassic Park', options: ['King Kong', 'Jurassic Park', 'Ice Age', '65'], category: '🎬 Movie' },
  { emojis: '🍬🍭🏭', answer: 'Willy Wonka', options: ['Chocolate Factory', 'Willy Wonka', 'Sweet Tooth', 'Candy Crush'], category: '🎬 Movie' },
  { emojis: '🤡🎈🎈', answer: 'IT', options: ['Joker', 'IT', 'Poltergeist', 'Saw'], category: '🎬 Movie' },
  { emojis: '🦁🧙‍♀️🚪', answer: 'Narnia', options: ['The Chronicles of Narnia', 'The Hobbit', 'Narnia', 'Harry Potter'], category: '🎬 Movie' },
  { emojis: '👽👈📞🏠', answer: 'E.T.', options: ['Aliens', 'E.T.', 'Interstellar', 'Contact'], category: '🎬 Movie' },
  { emojis: '👑🦁🤱', answer: 'Circle of Life', options: ['Hakuna Matata', 'Circle of Life', 'Can You Feel The Love', 'I Just Can\'t Wait'], category: '🎵 Song' },
  { emojis: '🆙🎈🏠', answer: 'Up', options: ['Toy Story', 'Up', 'Coco', 'Inside Out'], category: '🎬 Movie' },
  { emojis: '🤠🧸🚀', answer: 'Toy Story', options: ['Action Figure', 'Toy Story', 'The Lego Movie', 'Wreck-it Ralph'], category: '🎬 Movie' },
  { emojis: '👸🍎💤', answer: 'Snow White', options: ['Sleeping Beauty', 'Snow White', 'Cinderella', 'Tangled'], category: '🎬 Movie' },
  { emojis: '👸👠🕛', answer: 'Cinderella', options: ['Snow White', 'Cinderella', 'Brave', 'Beauty and the Beast'], category: '🎬 Movie' },
  { emojis: '🕯️🍵🥀', answer: 'Beauty and the Beast', options: ['Aladdin', 'Sleeping Beauty', 'Beauty and the Beast', 'Mulan'], category: '🎬 Movie' },
  { emojis: '🐒👦🧞‍♂️', answer: 'Aladdin', options: ['The Mummy', 'Sinbad', 'Aladdin', 'The Scorpion King'], category: '🎬 Movie' },
  { emojis: '🐚🧜‍♀️🦞', answer: 'The Little Mermaid', options: ['Moana', 'The Little Mermaid', 'Finding Nemo', 'Shark Tale'], category: '🎬 Movie' },
  { emojis: '🥊🐅🎶', answer: 'Eye of the Tiger', options: ['Roar', 'Eye of the Tiger', 'Survivor', 'Wild Ones'], category: '🎵 Song' },
  { emojis: '🕺✨👞', answer: 'Footloose', options: ['Dirty Dancing', 'Footloose', 'Grease', 'Flashdance'], category: '🎬 Movie' },
  { emojis: '🍌🏃‍♂️💨', answer: 'Minions', options: ['Despicable Me', 'Minions', 'Madagascar', 'Sing'], category: '🎬 Movie' },
  { emojis: '🍳🥓🥞', answer: 'The Breakfast Club', options: ['Brunch Boys', 'The Breakfast Club', 'Chef', 'Waitress'], category: '🎬 Movie' },
  { emojis: '🌊🛶🌀', answer: 'Moana', options: ['Lilo & Stitch', 'Moana', 'Encanto', 'Surf\'s Up'], category: '🎬 Movie' },
  { emojis: '🎸👨‍🎤⚡', answer: 'David Bowie', options: ['Freddie Mercury', 'David Bowie', 'Prince', 'Elton John'], category: '🎵 Artist' },
  { emojis: '🎭👻🌹', answer: 'Phantom of the Opera', options: ['Ghostbusters', 'Phantom of the Opera', 'Les Misérables', 'Hamilton'], category: '🎬 Movie' },
  { emojis: '👨‍👩‍👧‍👦🏠👻', answer: 'The Addams Family', options: ['The Munsters', 'The Addams Family', 'Beetlejuice', 'Hotel Transylvania'], category: '🎬 Movie' },
  { emojis: '🕵️‍♂️🔍🇬🇧', answer: 'Sherlock Holmes', options: ['James Bond', 'Sherlock Holmes', 'Doctor Who', 'Luther'], category: '📺 Show' },
  { emojis: '🍸🔫🇬🇧', answer: 'James Bond', options: ['Kingsman', 'James Bond', 'Mission Impossible', 'John Wick'], category: '🎬 Movie' },
  { emojis: '🧱🎮🌈', answer: 'Minecraft', options: ['Roblox', 'Minecraft', 'Fortnite', 'Tetris'], category: '🎮 Game' },
  { emojis: '🍬🍭🍬', answer: 'Candy Crush', options: ['Sweet Saga', 'Candy Crush', 'Sugar Rush', 'Bejeweled'], category: '🎮 Game' },
  { emojis: '🐦💢🐷', answer: 'Angry Birds', options: ['Bad Piggies', 'Angry Birds', 'Crossy Road', 'Flappy Bird'], category: '🎮 Game' },
  { emojis: '🔵🟡🔴👻', answer: 'Pac-Man', options: ['Pac-Man', 'Dig Dug', 'Q*bert', 'Galaga'], category: '🎮 Game' },
  { emojis: '🐢🍄🏰', answer: 'Super Mario', options: ['Sonic', 'Super Mario', 'Donkey Kong', 'Zelda'], category: '🎮 Game' },
  { emojis: '⚡🐭🎒', answer: 'Pokemon', options: ['Digimon', 'Pokemon', 'Yu-Gi-Oh', 'Bakugan'], category: '📺 Show' },
  { emojis: '🧙‍♂️👓⚡', answer: 'Harry Potter', options: ['Lord of the Rings', 'Percy Jackson', 'Harry Potter', 'Star Wars'], category: '🎬 Movie' },
  { emojis: '💍🌋🦶', answer: 'The Hobbit', options: ['Lord of the Rings', 'The Hobbit', 'Game of Thrones', 'Willow'], category: '🎬 Movie' },
  { emojis: '🩸🧛‍♂️🍎', answer: 'Twilight', options: ['🧛 Vampire Diaries', 'Twilight', 'True Blood', 'Buffy'], category: '🎬 Movie' },
  { emojis: '🦁👗🚪', answer: 'The Lion, the Witch and the Wardrobe', options: ['Narnia', 'The Lion, the Witch and the Wardrobe', 'The Golden Compass', 'Harry Potter'], category: '🎬 Movie' },
  { emojis: '🐺🌕🏚️', answer: 'The Wolfman', options: ['Twilight', 'The Wolfman', 'Underworld', 'Teen Wolf'], category: '🎬 Movie' },
  { emojis: '🕷️🕸️🏙️', answer: 'The Amazing Spider-Man', options: ['Spider-Man', 'The Amazing Spider-Man', 'Into the Spider-Verse', 'Ant-Man'], category: '🎬 Movie' },
  { emojis: '🦇🌑🏙️', answer: 'The Dark Knight', options: ['Batman Begins', 'The Dark Knight', 'The Batman', 'Joker'], category: '🎬 Movie' },
  { emojis: '🛡️🇺🇸✨', answer: 'Captain America', options: ['Iron Man', 'Captain America', 'Thor', 'Black Widow'], category: '🎬 Movie' },
  { emojis: '🔨⚡🌩️', answer: 'Thor', options: ['Avengers', 'Thor', 'Iron Man', 'Hulk'], category: '🎬 Movie' },
  { emojis: '🦾❤️🟦', answer: 'Iron Man', options: ['RoboCop', 'Iron Man', 'Terminator', 'Transformers'], category: '🎬 Movie' },
  { emojis: '🏹🍏🍎', answer: 'Robin Hood', options: ['The Hunger Games', 'Robin Hood', 'Brave', 'Arrow'], category: '🎬 Movie' },
  { emojis: '👟🏀🐜', answer: 'Space Jam', options: ['Air Bud', 'Space Jam', 'King Kong', 'Looney Tunes'], category: '🎬 Movie' },
  { emojis: '🎪🐘👂', answer: 'Dumbo', options: ['The Greatest Showman', 'Dumbo', 'Madagascar', 'Sing'], category: '🎬 Movie' },
  { emojis: '🐕🐾🏨', answer: 'Hotel for Dogs', options: ['Beethoven', 'Hotel for Dogs', '101 Dalmatians', 'Marley & Me'], category: '🎬 Movie' },
  { emojis: '🎈🏠🎈', answer: 'Up', options: ['Toy Story', 'Up', 'Coco', 'Luca'], category: '🎬 Movie' },
  { emojis: '🎸🏵️💀', answer: 'Coco', options: ['The Book of Life', 'Coco', 'Encanto', 'Moana'], category: '🎬 Movie' },
  { emojis: '🕯️🕰️☕', answer: 'Beauty and the Beast', options: ['Cinderella', 'Beauty and the Beast', 'Frozen', 'Tangled'], category: '🎬 Movie' },
  { emojis: '👸🧊☃️', answer: 'Frozen', options: ['Tangled', 'Frozen', 'Brave', 'Cinderella'], category: '🎬 Movie' },
  { emojis: '🍎🐍📜', answer: 'Genesis', options: ['Adam & Eve', 'Genesis', 'The Bible', 'Creation'], category: '💬 Phrase' },
  { emojis: '🟦🟥🟩🟨', answer: 'Simon Says', options: ['Tetris', 'Simon Says', 'Simon', 'Colors'], category: '🎮 Game' },
  { emojis: '🗡️🐉🏔️', answer: 'The Hobbit', options: ['The Lord of the Rings', 'The Hobbit', 'Skyrim', 'The Witcher'], category: '🎬 Movie' },
  { emojis: '🛸🐄🌾', answer: 'Independence Day', options: ['Mars Attacks', 'Independence Day', 'Nope', 'Signs'], category: '🎬 Movie' },
  { emojis: '🍯🐻🎈', answer: 'Winnie the Pooh', options: ['Paddington', 'Winnie the Pooh', 'Ted', 'Care Bears'], category: '🎬 Movie' },
  { emojis: '🏰✨🧚‍♀️', answer: 'Disney', options: ['Pixar', 'Disney', 'Dreamworks', 'Netflix'], category: '🍎 Brand' },
  { emojis: '🦉⚡🚂', answer: 'Harry Potter', options: ['Paddington', 'Harry Potter', 'Hugo', 'Polar Express'], category: '🎬 Movie' },
  { emojis: '🤡🎭🃏', answer: 'Joker', options: ['Batman', 'Joker', 'Suicide Squad', 'Harley Quinn'], category: '🎬 Movie' },
  { emojis: '🐘👂✈️', answer: 'Dumbo', options: ['Bambi', 'Dumbo', 'Tarzan', 'Jungle Book'], category: '🎬 Movie' },
];

import GameEndScreen from '../components/GameEndScreen';

export default function EmojiIQGame() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const totalQuestions = 50;
  const puzzle = PUZZLES[currentIndex % PUZZLES.length];

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
    setShowResult(true);
    if (option === puzzle.answer) {
      setScore(prev => prev + 1);
    }
    setAnswered(prev => prev + 1);
  };

  const nextPuzzle = () => {
    if (answered >= totalQuestions) {
      setGameOver(true);
      return;
    }
    setSelected(null);
    setShowResult(false);
    setCurrentIndex(prev => prev + 1);
  };

  const reset = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameOver(false);
    setAnswered(0);
  };

  const shareResult = () => {
    const pct = Math.round((score / totalQuestions) * 100);
    const text = `VIBEMENOW Emoji IQ 😂\nScore: ${score}/${totalQuestions} (${pct}%)\nEmoji IQ: ${pct >= 80 ? 'GENIUS 🧠' : pct >= 60 ? 'SMART 📚' : pct >= 40 ? 'AVERAGE 🤷' : 'NOOB 😅'}\n\nPlay at vibemenow.uk/emoji-iq`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied! 📋');
    }
  };

  if (gameOver) {
    const pct = Math.round((score / totalQuestions) * 100);
    let rating, emoji, desc;
    if (pct >= 90) { rating = 'EMOJI GENIUS'; emoji = '🧠'; desc = 'You literally speak emoji fluently!'; }
    else if (pct >= 70) { rating = 'EMOJI MASTER'; emoji = '🔥'; desc = 'Impressive emoji decoding skills!'; }
    else if (pct >= 50) { rating = 'EMOJI STUDENT'; emoji = '📚'; desc = 'Not bad! Keep practicing your emojis.'; }
    else { rating = 'EMOJI NOOB'; emoji = '😅'; desc = 'Time to spend more time texting...'; }

    return (
      <GameEndScreen
        gameId="emoji-iq"
        score={score}
        maxScore={totalQuestions}
        emoji={emoji}
        title={rating}
        description={desc}
        accentColor="#ffe600"
        onShare={shareResult}
        onPlayAgain={reset}
      />
    );
  }

  return (
    <>
      <FloatingBg />
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="game-badge">Brain Teaser</div>
        <h1 className="game-title" style={{ color: '#ffe600' }}>😂 Emoji IQ</h1>
        <p className="game-subtitle">Decode the emoji puzzle!</p>
        <AdBanner format="horizontal" />

      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ color: '#555', fontSize: 13, fontWeight: 700 }}>
          Question {answered + 1} / {totalQuestions}
        </span>
        <span style={{ color: '#00ff94', fontSize: 13, fontWeight: 700 }}>
          Score: {score}
        </span>
      </div>
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ width: `${((answered) / totalQuestions) * 100}%` }} />
      </div>

      {/* Puzzle Card */}
      <div className="card animate-fade-in" style={{ marginBottom: 20, cursor: 'default' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
          {puzzle.category}
        </div>
        <div className="emoji-display">{puzzle.emojis}</div>
        <div style={{ color: '#888', fontSize: 14 }}>What does this represent?</div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {puzzle.options.map((option, i) => {
          let cls = 'option-btn';
          if (showResult) {
            if (option === puzzle.answer) cls += ' correct';
            else if (option === selected) cls += ' wrong';
            else cls += ' disabled';
          } else if (selected === option) {
            cls += ' selected';
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => handleSelect(option)}
              disabled={showResult}
            >
              <span style={{ color: '#555', marginRight: 10, fontSize: 13 }}>
                {['A', 'B', 'C', 'D'][i]}
              </span>
              {option}
              {showResult && option === puzzle.answer && <span style={{ float: 'right' }}>✓</span>}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {showResult && (
        <button className="btn-secondary" onClick={nextPuzzle} style={{ marginBottom: 24 }}>
          {answered >= totalQuestions ? 'See Results 🎉' : 'Next Puzzle'} <ArrowRight size={16} />
        </button>
      )}

      <AdBanner format="horizontal" />

      <div className="how-to-play">
        <div className="how-to-play-title">
          <HelpCircle size={16} color="#ffe600" /> How to Play
        </div>
        <div className="how-to-play-steps">
          <div className="how-to-play-step">
            <span className="how-to-play-number">1</span>
            <span>Look at the emojis shown in the card. They represent a well-known movie, song, or phrase.</span>
          </div>
          <div className="how-to-play-step">
            <span className="how-to-play-number">2</span>
            <span>Choose the correct answer from the four options provided.</span>
          </div>
          <div className="how-to-play-step">
            <span className="how-to-play-number">3</span>
            <span>Complete 50 puzzles to get your Emoji IQ rating and share your genius with friends!</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
