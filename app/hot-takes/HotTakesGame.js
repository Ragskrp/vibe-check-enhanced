'use client';

import { useState, useEffect } from 'react';
import { Share2, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const HOT_TAKES = [
  { text: "Pineapple belongs on pizza 🍕", agreePercent: 45 },
  { text: "Morning showers > Night showers 🚿", agreePercent: 58 },
  { text: "Dogs are better than cats 🐕", agreePercent: 62 },
  { text: "Homework should be abolished forever 📚", agreePercent: 78 },
  { text: "Cereal is a soup 🥣", agreePercent: 32 },
  { text: "Social media does more harm than good 📱", agreePercent: 55 },
  { text: "Hot dogs are sandwiches 🌭", agreePercent: 41 },
  { text: "Water is the best drink ever 💧", agreePercent: 72 },
  { text: "School should start at 10AM 🏫", agreePercent: 89 },
  { text: "Reclining your seat on a plane is rude ✈️", agreePercent: 51 },
  { text: "Avocado is overrated 🥑", agreePercent: 38 },
  { text: "It's ok to eat ice cream in winter 🍦", agreePercent: 84 },
  { text: "Online classes are better than in-person 💻", agreePercent: 34 },
  { text: "Birthday cake is overrated 🎂", agreePercent: 29 },
  { text: "Sleeping with socks on is normal 🧦", agreePercent: 27 },
  { text: "There's no such thing as too much cheese 🧀", agreePercent: 76 },
  { text: "Math is actually fun 🔢", agreePercent: 23 },
  { text: "GIFs should be pronounced 'JIF' 🖼️", agreePercent: 35 },
  { text: "Dark chocolate is better than milk chocolate 🍫", agreePercent: 47 },
  { text: "Books are better than movies 📖", agreePercent: 53 },
  { text: "Naps are a basic human right 😴", agreePercent: 91 },
  { text: "Coffee is a personality trait ☕", agreePercent: 44 },
  { text: "Mondays aren't that bad 📅", agreePercent: 18 },
  { text: "It's fine to double-dip chips 🫓", agreePercent: 42 },
];

export default function HotTakesGame() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [voted, setVoted] = useState(false);
  const [myVote, setMyVote] = useState(null);
  const [totalVoted, setTotalVoted] = useState(0);
  const [votes, setVotes] = useState({}); // track user votes

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="game-container" style={{ minHeight: '500px' }} />;

  const take = HOT_TAKES[currentIndex % HOT_TAKES.length];
  // Simulate vote counts with some variance
  const fakeTotal = 1247 + currentIndex * 173;
  const agreeCount = Math.round(fakeTotal * (take.agreePercent / 100));
  const disagreeCount = fakeTotal - agreeCount;

  const handleVote = (agree) => {
    if (voted) return;
    setMyVote(agree);
    setVoted(true);
    setTotalVoted(prev => prev + 1);
    setVotes(prev => ({ ...prev, [currentIndex]: agree }));
  };

  const nextTake = () => {
    setCurrentIndex(prev => prev + 1);
    setVoted(false);
    setMyVote(null);
  };

  const shareResult = () => {
    const agrees = Object.values(votes).filter(v => v).length;
    const disagrees = Object.values(votes).filter(v => !v).length;
    const text = `VIBECHECK Hot Takes 🔥\nVoted on ${totalVoted} takes\n👍 Agreed: ${agrees}\n👎 Disagreed: ${disagrees}\n\nPlay at vibecheck-play.vercel.app/hot-takes`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied! 📋');
    }
  };

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div className="game-badge">Viral Content</div>
      <h1 className="game-title" style={{ color: '#ff6b35' }}>🔥 Hot Takes</h1>
      <p className="game-subtitle">Vote on spicy opinions. Do you agree?</p>

      {totalVoted > 0 && (
        <div style={{ color: '#555', fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
          🔥 You&apos;ve voted on {totalVoted} takes
        </div>
      )}

      {/* Take Card */}
      <div className="hot-take-card animate-fade-in" key={currentIndex}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
          HOT TAKE #{currentIndex + 1}
        </div>
        <div className="hot-take-text">{take.text}</div>

        {!voted ? (
          <div className="hot-take-buttons">
            <button className="agree-btn" onClick={() => handleVote(true)}>
              <ThumbsUp size={18} /> Agree
            </button>
            <button className="disagree-btn" onClick={() => handleVote(false)}>
              <ThumbsDown size={18} /> Disagree
            </button>
          </div>
        ) : (
          <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            {/* Results */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#00ff94', fontSize: 14 }}>
                  👍 Agree {take.agreePercent}%
                </span>
                <span style={{ fontWeight: 700, color: '#ff2d78', fontSize: 14 }}>
                  👎 Disagree {100 - take.agreePercent}%
                </span>
              </div>
              <div style={{ height: 12, background: 'rgba(255,45,120,0.2)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${take.agreePercent}%`,
                  background: 'linear-gradient(90deg, #00ff94, #00d4ff)',
                  borderRadius: 6,
                  transition: 'width 0.8s ease'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#555' }}>{agreeCount.toLocaleString()} votes</span>
                <span style={{ fontSize: 11, color: '#555' }}>{disagreeCount.toLocaleString()} votes</span>
              </div>
            </div>

            <div style={{ 
              padding: '10px 16px', 
              borderRadius: 10, 
              background: myVote ? 'rgba(0,255,148,0.08)' : 'rgba(255,45,120,0.08)',
              border: `1px solid ${myVote ? '#00ff9444' : '#ff2d7844'}`,
              color: myVote ? '#00ff94' : '#ff2d78',
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 16
            }}>
              You {myVote ? 'agreed' : 'disagreed'} {myVote === (take.agreePercent >= 50) ? '— with the majority!' : '— against the majority!'}
            </div>

            <button className="btn-secondary" onClick={nextTake}>
              Next Take <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Ad */}
      {currentIndex > 0 && currentIndex % 3 === 0 && (
        <AdBanner format="rectangle" />
      )}

      {/* Share */}
      {totalVoted >= 3 && (
        <div style={{ marginTop: 20 }}>
          <button className="share-btn" onClick={shareResult}>
            <Share2 size={16} /> Share Your Hot Takes
          </button>
        </div>
      )}

      <AdBanner format="horizontal" />
    </div>
  );
}
