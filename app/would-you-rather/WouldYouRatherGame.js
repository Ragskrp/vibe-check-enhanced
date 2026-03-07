'use client';

import { useState, useEffect } from 'react';
import { Share2, ArrowRight, Flame } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(0, 255, 148, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(255, 45, 120, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const SCENARIOS = [
  { a: "Be able to fly", b: "Be invisible", aPct: 58 },
  { a: "Live 200 years", b: "Restart life at 10 with all your knowledge", aPct: 34 },
  { a: "Never use social media again", b: "Never watch TV/movies again", aPct: 42 },
  { a: "Always be 10 minutes late", b: "Always be 20 minutes early", aPct: 31 },
  { a: "Have unlimited money", b: "Have unlimited knowledge", aPct: 55 },
  { a: "Read everyone's mind", b: "Control everyone's mind", aPct: 63 },
  { a: "Live in the Harry Potter world", b: "Live in the Marvel universe", aPct: 52 },
  { a: "Never eat pizza again", b: "Never eat ice cream again", aPct: 38 },
  { a: "Be the funniest person alive", b: "Be the smartest person alive", aPct: 44 },
  { a: "Always smell bad (can't tell)", b: "Always hear annoying background music", aPct: 27 },
  { a: "Travel to the past", b: "Travel to the future", aPct: 47 },
  { a: "Have a rewind button for life", b: "Have a pause button for life", aPct: 41 },
  { a: "Be famous and stressed", b: "Be unknown and happy", aPct: 28 },
  { a: "Only eat sweet food forever", b: "Only eat savory food forever", aPct: 35 },
  { a: "Never age physically", b: "Never age mentally", aPct: 62 },
  { a: "Live without music", b: "Live without color", aPct: 31 },
  { a: "Be able to talk to animals", b: "Speak every human language", aPct: 48 },
  { a: "Have a personal chef", b: "Have a personal trainer", aPct: 67 },
  { a: "Be stuck in a rom-com", b: "Be stuck in an action movie", aPct: 39 },
  { a: "Have free WiFi everywhere", b: "Have free food everywhere", aPct: 43 },
];

export default function WouldYouRatherGame() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="game-container" style={{ minHeight: '500px' }} />;

  const scenario = SCENARIOS[currentIndex % SCENARIOS.length];
  const fakeVotes = 2847 + currentIndex * 231;

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
    setTotalPlayed(prev => prev + 1);
    setChoices(prev => [...prev, { index: currentIndex, choice: option }]);
  };

  const next = () => {
    setCurrentIndex(prev => prev + 1);
    setSelected(null);
  };

  const shareResult = () => {
    const text = `VIBEMENOW Would You Rather 😈\nPlayed ${totalPlayed} rounds!\n\nPlay at vibemenow.vercel.app/would-you-rather`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied! 📋');
    }
  };

  return (
    <>
      <FloatingBg />
      <div className="game-container" style={{ textAlign: 'center' }}>
        <div className="game-badge">Social Game</div>
        <h1 className="game-title" style={{ color: '#00ff94' }}>😈 Would U Rather</h1>
        <p className="game-subtitle">Impossible choices. Pick one. No skipping!</p>
        <AdBanner format="horizontal" />

      {totalPlayed > 0 && (
        <div style={{ color: '#555', fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
          ⚡ {totalPlayed} choices made
        </div>
      )}

      {/* Scenario */}
      <div style={{ marginBottom: 24 }} key={currentIndex} className="animate-fade-in">
        <div style={{ fontSize: 11, fontWeight: 700, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
          WOULD YOU RATHER...
        </div>

        <div className="wyr-container">
          {/* Option A */}
          <div
            className={`wyr-option option-a ${selected === 'a' ? 'selected' : ''}`}
            onClick={() => handleSelect('a')}
            style={selected !== null && selected !== 'a' ? { opacity: 0.5 } : {}}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>🅰️</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{scenario.a}</div>
            {selected !== null && (
              <div style={{ 
                marginTop: 16, 
                fontSize: 28, fontWeight: 800, 
                color: '#00d4ff' 
              }}>
                {scenario.aPct}%
              </div>
            )}
          </div>

          {/* VS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff2d78, #b14aed)',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 12,
              color: '#fff',
              flexShrink: 0
            }}>
              OR
            </div>
          </div>

          {/* Option B */}
          <div
            className={`wyr-option option-b ${selected === 'b' ? 'selected' : ''}`}
            onClick={() => handleSelect('b')}
            style={selected !== null && selected !== 'b' ? { opacity: 0.5 } : {}}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>🅱️</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{scenario.b}</div>
            {selected !== null && (
              <div style={{ 
                marginTop: 16, 
                fontSize: 28, fontWeight: 800, 
                color: '#ff2d78' 
              }}>
                {100 - scenario.aPct}%
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {selected !== null && (
          <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
            <div style={{ 
              height: 8, 
              background: 'rgba(255,45,120,0.2)', 
              borderRadius: 4, 
              overflow: 'hidden', 
              margin: '16px 0' 
            }}>
              <div style={{
                height: '100%',
                width: `${scenario.aPct}%`,
                background: 'linear-gradient(90deg, #00d4ff, #0080ff)',
                borderRadius: 4,
                transition: 'width 0.8s ease'
              }} />
            </div>
            <div style={{ color: '#555', fontSize: 12, marginBottom: 16 }}>
              Based on {fakeVotes.toLocaleString()} votes
            </div>
            <button className="btn-secondary" onClick={next}>
              Next Choice <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {currentIndex > 0 && currentIndex % 4 === 0 && (
        <AdBanner format="rectangle" />
      )}

      {totalPlayed >= 3 && (
        <div style={{ marginTop: 16 }}>
          <button className="share-btn" onClick={shareResult}>
            <Share2 size={16} /> Share Results
          </button>
        </div>
      )}

      <AdBanner format="horizontal" />
    </div>
    </>
  );
}
