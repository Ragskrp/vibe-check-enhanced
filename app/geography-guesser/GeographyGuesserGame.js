'use client';

import { useState, useEffect, useCallback } from 'react';
import { Share2, RotateCcw, HelpCircle, Globe, Trophy, Timer, ChevronLeft, ArrowRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255, 45, 120, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const COUNTRIES = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Greece', flag: '🇬🇷' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Hungary', flag: '🇭🇺' },
  { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'Romania', flag: '🇷🇴' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Israel', flag: '🇮🇱' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Iran', flag: '🇮🇷' },
  { name: 'Iraq', flag: '🇮🇶' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Algeria', flag: '🇩🇿' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'New Zealand', flag: '🇳🇿' },
];

function getRandomOptions(correctCountry) {
  const options = [correctCountry];
  while (options.length < 4) {
    const random = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    if (!options.find(o => o.name === random.name)) {
      options.push(random);
    }
  }
  return options.sort(() => Math.random() - 0.5);
}

export default function GeographyGuesserGame() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home'); // home, playing, results
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null); // correct, wrong

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateGame = useCallback(() => {
    const shuffled = [...COUNTRIES].sort(() => Math.random() - 0.5).slice(0, 10);
    const gameQuestions = shuffled.map(country => ({
      country,
      options: getRandomOptions(country)
    }));
    setQuestions(gameQuestions);
    setScore(0);
    setCurrentQuestion(0);
    setTimer(10);
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setView('playing');
  }, []);

  useEffect(() => {
    if (view !== 'playing' || selectedAnswer !== null) return;

    if (timer <= 0) {
      handleAnswer(null);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [view, timer, selectedAnswer]);

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);

    const isCorrect = option && option.name === questions[currentQuestion].country.name;
    if (isCorrect) {
      setAnswerStatus('correct');
      setScore(prev => prev + 10 + timer); // Bonus for speed
    } else {
      setAnswerStatus('wrong');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setTimer(10);
        setSelectedAnswer(null);
        setAnswerStatus(null);
      } else {
        setView('results');
      }
    }, 1500);
  };

  const shareResults = () => {
    const text = `🌍 I scored ${score} pts in VIBEMENOW Geography Guesser!\nCan you beat my score?\n\nPlay at: vibemenow.vercel.app/geography-guesser`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied results! 📋');
    }
  };

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge" style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff' }}>World Tour</div>
      <h1 className="game-title" style={{ color: '#00d4ff' }}>🌍 Geo Guesser</h1>
      <p className="game-subtitle">How well do you know world flags?</p>

      <div className="card" style={{ maxWidth: '450px', margin: '40px auto', padding: '32px' }}>
        <Globe size={64} color="#00d4ff" style={{ margin: '0 auto 24px', display: 'block' }} />
        <p style={{ color: '#888', marginBottom: '32px', fontSize: '15px' }}>
          Identify 10 random flags as fast as you can. Speed gives more points!
        </p>
        <button className="btn-primary" onClick={generateGame} style={{ width: '100%', fontSize: '18px' }}>
          Start Guessing! <ArrowRight size={20} />
        </button>
      </div>
      <AdBanner />
    </div>
  );

  const renderPlaying = () => {
    const q = questions[currentQuestion];
    if (!q) return null;

    return (
      <div className="game-container animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ color: '#555', fontWeight: 'bold', fontSize: '13px' }}>FLAG {currentQuestion + 1} / 10</span>
          <div style={{ 
            background: timer < 3 ? 'rgba(255, 45, 120, 0.1)' : 'rgba(0, 212, 255, 0.1)',
            borderColor: timer < 3 ? '#ff2d78' : '#00d4ff',
            color: timer < 3 ? '#ff2d78' : '#00d4ff',
            border: '2px solid', borderRadius: '10px', padding: '4px 12px', fontWeight: 'bold', fontSize: '18px'
          }}>
            <Timer size={16} style={{ display: 'inline', marginRight: '6px' }} />
            {timer}s
          </div>
        </div>

        <div className="progress-bar" style={{ marginBottom: '24px' }}>
          <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / 10) * 100}%`, background: '#00d4ff' }} />
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '48px', marginBottom: '20px', fontSize: '120px' }}>
          {q.country.flag}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {q.options.map((opt, i) => {
            let cls = 'option-btn';
            if (selectedAnswer !== null) {
              if (opt.name === q.country.name) cls += ' correct';
              else if (selectedAnswer && opt.name === selectedAnswer.name) cls += ' wrong';
              else cls += ' disabled';
            }
            return (
              <button 
                key={i} 
                className={cls} 
                onClick={() => handleAnswer(opt)} 
                disabled={selectedAnswer !== null}
                style={{ height: '60px', fontSize: '14px', fontWeight: 'bold' }}
              >
                {opt.name}
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', color: '#555', fontSize: '13px' }}>
          SCORE: <strong style={{ color: '#00d4ff', fontSize: '18px' }}>{score}</strong>
        </div>

        <div style={{ marginTop: '32px' }}>
          <AdBanner />
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>
      <h1 className="game-title" style={{ color: '#ffe600' }}>Great Job!</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>You've finished your world tour.</p>

      <div className="card" style={{ marginBottom: '32px', padding: '32px' }}>
        <div style={{ fontSize: '12px', color: '#555', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Final Score</div>
        <div style={{ fontSize: '64px', fontWeight: 900, color: '#00ff94' }}>{score}</div>
        <div style={{ color: '#555', fontSize: '14px', marginTop: '8px' }}>Points Earned</div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="share-btn" onClick={shareResults}>
          <Share2 size={16} /> Share Result
        </button>
        <button className="btn-outline" onClick={() => setView('home')}>
          <RotateCcw size={16} /> Try Again
        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <AdBanner format="rectangle" />
      </div>
    </div>
  );

  return (
    <>
      <FloatingBg />
      {view === 'home' && renderHome()}
      {view === 'playing' && renderPlaying()}
      {view === 'results' && renderResults()}

      <div className="game-container" style={{ paddingTop: 0, marginTop: '-20px' }}>
        <div className="how-to-play">
          <div className="how-to-play-title">
            <HelpCircle size={16} color="#00d4ff" /> How to Play
          </div>
          <div className="how-to-play-steps">
            <div className="how-to-play-step">
              <span className="how-to-play-number">1</span>
              <span>Look at the flag displayed on the screen.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">2</span>
              <span>Select the correct country name from the 4 options provided.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">3</span>
              <span>Be fast! You have 10 seconds per flag. Faster answers earn a higher speed bonus.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
