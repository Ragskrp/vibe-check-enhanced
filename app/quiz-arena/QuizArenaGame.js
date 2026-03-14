'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, onSnapshot, setDoc, updateDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp, getDoc
} from 'firebase/firestore';
import { Share2, ArrowRight, Trophy, Users, Search, PlusCircle, LogIn, ChevronLeft, HelpCircle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255, 230, 0, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const CATEGORIES = {
  general: "🌍 General Knowledge",
  pop_culture: "🎭 Pop Culture",
  science: "🔬 Science",
  gaming: "🎮 Gaming",
  movies: "🎬 Movies",
  music: "🎵 Music",
  food: "🍕 Food",
  sports: "⚽ Sports"
};

const TRIVIA_QUESTIONS = {
  general: [
    { q: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: 2 },
    { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
    { q: "What planet is closest to the Sun?", options: ["Venus", "Earth", "Mars", "Mercury"], answer: 3 },
    { q: "What's the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
  ],
  pop_culture: [
    { q: "Which year did TikTok launch globally?", options: ["2016", "2017", "2018", "2019"], answer: 2 },
    { q: "Who plays Iron Man in the MCU?", options: ["Chris Evans", "Robert Downey Jr.", "Chris Pratt", "Mark Ruffalo"], answer: 1 },
    { q: "Which show features the 'Red Wedding'?", options: ["Vikings", "The Witcher", "Game of Thrones", "House of the Dragon"], answer: 2 },
    { q: "Which platform streams Stranger Things?", options: ["Hulu", "HBO", "Disney+", "Netflix"], answer: 3 },
  ],
  science: [
    { q: "What is H2O?", options: ["Helium", "Water", "Hydrogen", "Oxygen"], answer: 1 },
    { q: "What planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Saturn", "Mars"], answer: 3 },
    { q: "What force keeps us on the ground?", options: ["Friction", "Magnetism", "Gravity", "Inertia"], answer: 2 },
    { q: "Which part of the plant conducts photosynthesis?", options: ["Root", "Stem", "Leaf", "Flower"], answer: 2 }
  ],
  gaming: [
    { q: "What is the main character's name in The Legend of Zelda?", options: ["Zelda", "Ganon", "Navi", "Link"], answer: 3 },
    { q: "Which game features creepers?", options: ["Roblox", "Minecraft", "Fortnite", "Terraria"], answer: 1 },
    { q: "What company made the PlayStation?", options: ["Microsoft", "Nintendo", "Sega", "Sony"], answer: 3 },
    { q: "Which color is the imposter usually portrayed as in Among Us memes?", options: ["Blue", "Red", "Green", "Yellow"], answer: 1 }
  ],
  movies: [
    { q: "Who directed Jurassic Park?", options: ["Steven Spielberg", "George Lucas", "James Cameron", "Peter Jackson"], answer: 0 },
    { q: "What is the name of the lion in The Lion King?", options: ["Mufasa", "Scar", "Simba", "Timon"], answer: 2 },
    { q: "Which movie features a Delorean time machine?", options: ["Star Wars", "Back to the Future", "E.T.", "Ghostbusters"], answer: 1 },
    { q: "What is the highest grossing film of all time (as of 2023)?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], answer: 0 }
  ],
  music: [
    { q: "Who is the 'King of Pop'?", options: ["Prince", "Michael Jackson", "Elvis Presley", "Stevie Wonder"], answer: 1 },
    { q: "Which band sang 'Hey Jude'?", options: ["The Rolling Stones", "The Beach Boys", "The Beatles", "The Who"], answer: 2 },
    { q: "How many strings are on a standard guitar?", options: ["4", "5", "6", "7"], answer: 2 },
    { q: "What instrument is used to play a snare drum?", options: ["Hands", "Sticks", "Mallets", "Brushes"], answer: 1 }
  ],
  food: [
    { q: "What is the main ingredient in hummus?", options: ["Lentils", "Chickpeas", "Black Beans", "Peas"], answer: 1 },
    { q: "Which country is famous for pasta?", options: ["France", "Spain", "Italy", "Greece"], answer: 2 },
    { q: "What type of food is a Granny Smith?", options: ["Apple", "Pear", "Plum", "Peach"], answer: 0 },
    { q: "What is sushi traditionally wrapped in?", options: ["Bread", "Lettuce", "Seaweed", "Rice Paper"], answer: 2 }
  ],
  sports: [
    { q: "How many players are on a soccer team on the field?", options: ["9", "10", "11", "12"], answer: 2 },
    { q: "In what sport would you perform a slam dunk?", options: ["Baseball", "Tennis", "Basketball", "Volleyball"], answer: 2 },
    { q: "Which country won the first World Cup?", options: ["Brazil", "Argentina", "Uruguay", "Germany"], answer: 2 },
    { q: "What color is a standard tennis ball?", options: ["White", "Yellow-green", "Orange", "Pink"], answer: 1 }
  ]
};

// Default trivial list for other categories
Object.keys(CATEGORIES).forEach(cat => {
  if (!TRIVIA_QUESTIONS[cat]) {
    TRIVIA_QUESTIONS[cat] = TRIVIA_QUESTIONS.general;
  }
});

function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function QuizArenaGame() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home'); // home, lobby, playing, results
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [error, setError] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);
  const [isHost, setIsHost] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Firestore listeners
  useEffect(() => {
    if (!mounted || !room?.id) return;

    const unsub = onSnapshot(doc(db, "rooms", room.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setRoom(prev => ({ ...prev, ...data }));
        
        // Handle view transitions based on room status
        if (data.status === 'playing' && view === 'lobby') {
          setView('playing');
        } else if (data.status === 'results' && view !== 'results') {
          setView('results');
        }

        // Check if all players have answered the current question
        const totalPlayers = data.players.length;
        const answersCount = data.players.filter(p => (p.answers?.length || 0) > data.currentQuestion).length;
        setAllAnswered(answersCount >= totalPlayers && totalPlayers > 0);
      } else {
        setError('Room no longer exists');
        setView('home');
      }
    });

    return () => unsub();
  }, [room?.id, view, mounted]);

  // Timer logic for playing state
  useEffect(() => {
    if (!mounted || view !== 'playing' || !room) return;

    if (timer <= 0) {
      if (selectedAnswer === null) handleAnswer(-1); // timeout
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [view, timer, selectedAnswer, room, mounted]);

  // Reset timer on question change
  useEffect(() => {
    if (mounted && view === 'playing' && room) {
      setTimer(15);
      setSelectedAnswer(null);
    }
  }, [room?.currentQuestion, view, mounted]);

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const handleCreateRoom = async () => {
    if (!playerName || playerName.trim().length < 2) {
      setError('Please enter a valid nickname (min 2 chars)!');
      return;
    }
    setError('');

    try {
      const code = generateRoomCode();
      const newRoom = {
        code,
        category: selectedCategory,
        status: 'lobby',
        currentQuestion: 0,
        questions: TRIVIA_QUESTIONS[selectedCategory],
        players: [{ name: playerName, score: 0, answers: [] }],
        createdAt: serverTimestamp(),
      };

      const roomRef = doc(db, "rooms", code);
      await setDoc(roomRef, newRoom);
      
      setRoom({ 
        id: code, 
        ...newRoom, 
        createdAt: new Date().toISOString()
      });
      setMyPlayerId(0);
      setIsHost(true);
      setView('lobby');
    } catch (e) {
      console.error('Firebase Room Creation Error:', e);
      setError('Unable to create room. Please try again.');
    }
  };

  const handleJoinRoom = async () => {
    if (!playerName || !roomCode.trim() || roomCode.trim().length !== 3) {
      setError('Enter both a valid name and 3-char room code!');
      return;
    }
    setError('');

    try {
      const q = query(collection(db, "rooms"), where("code", "==", roomCode.toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Room not found! Check the code.');
        return;
      }

      const roomDoc = querySnapshot.docs[0];
      const roomData = roomDoc.data();

      if (roomData.status !== 'lobby') {
        setError('Match in progress! Cannot join.');
        return;
      }

      const newPlayer = { name: playerName, score: 0, answers: [] };
      const playerIdx = roomData.players.length;

      const roomRef = doc(db, "rooms", roomDoc.id);
      await updateDoc(roomRef, {
        players: arrayUnion(newPlayer)
      });

      setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, newPlayer] });
      setMyPlayerId(playerIdx);
      setIsHost(false);
      setView('lobby');
    } catch (e) {
      console.error('Firebase Join Error:', e);
      setError('Unable to join: ' + e.message);
    }
  };

  const startGame = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'playing', currentQuestion: 0 });
  };

  const handleAnswer = async (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);

    const question = room.questions[room.currentQuestion];
    const isCorrect = idx === question.answer;
    const points = isCorrect ? 10 : 0;

    const roomRef = doc(db, "rooms", room.id);
    const docSnap = await getDoc(roomRef);
    if (!docSnap.exists()) return;
    
    const currentData = docSnap.data();
    const newPlayers = [...currentData.players];
    newPlayers[myPlayerId] = {
      ...newPlayers[myPlayerId],
      score: newPlayers[myPlayerId].score + points,
      answers: [...(newPlayers[myPlayerId].answers || []), idx]
    };

    await updateDoc(roomRef, { players: newPlayers });
  };

  const nextQuestion = async () => {
    if (!isHost) return;
    const nextQ = room.currentQuestion + 1;
    if (nextQ >= room.questions.length) {
      await updateDoc(doc(db, "rooms", room.id), { status: 'results' });
    } else {
      await updateDoc(doc(db, "rooms", room.id), { currentQuestion: nextQ });
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(room.code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareResults = () => {
    const sorted = [...room.players].sort((a,b) => b.score - a.score);
    const winner = sorted[0];
    const text = `🏆 VIBEMENOW Quiz Arena Results!\nCategory: ${CATEGORIES[room.category]}\nWinner: ${winner.name} (${winner.score} pts)\nMy Rank: #${sorted.findIndex(p => p.name === playerName) + 1}\n\nChallenge me at: vibemenow.vercel.app/quiz-arena`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied results! 📋');
    }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge">Multiplayer</div>
      <h1 className="game-title" style={{ color: '#ffe600' }}>🏆 Quiz Arena</h1>
      <p className="game-subtitle">Create a room, share code, compete live!</p>

      {error && (
        <div style={{ background: '#ff2d7822', border: '1px solid #ff2d78', color: '#ff2d78', padding: '10px', borderRadius: '10px', marginBottom: '20px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ maxWidth: '500px', margin: '40px auto', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#555', fontSize: '11px', fontWeight: 800, textAlign: 'left', marginBottom: '8px', textTransform: 'uppercase' }}>
            Choose your nickname
          </label>
          <input 
            placeholder="E.G. QUIZ_MASTER"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={15}
            className="input-field"
            style={{ marginBottom: 0 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'rgba(0, 212, 255, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 212, 255, 0.2)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎮</div>
            <h3 style={{ fontSize: '14px', color: '#00d4ff', marginBottom: '12px', fontWeight: 800 }}>HOST GAME</h3>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#0a0a0f', color: '#fff', border: '1px solid #2a2a3e', borderRadius: '10px', fontSize: '12px', marginBottom: '12px', cursor: 'pointer' }}
            >
              {Object.entries(CATEGORIES).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
            <button className="btn-secondary" onClick={handleCreateRoom} style={{ width: '100%', padding: '10px', fontSize: '12px', marginTop: 'auto' }}>
              Create Room
            </button>
          </div>

          <div style={{ background: 'rgba(255, 45, 120, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 45, 120, 0.2)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔗</div>
            <h3 style={{ fontSize: '14px', color: '#ff2d78', marginBottom: '12px', fontWeight: 800 }}>JOIN ROOM</h3>
            <input 
              placeholder="CODE"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={3}
              className="input-field"
              style={{ textAlign: 'center', fontSize: '14px', letterSpacing: '2px', padding: '10px', marginBottom: '12px' }}
            />
            <button className="btn-primary" onClick={handleJoinRoom} style={{ width: '100%', padding: '10px', fontSize: '12px', marginTop: 'auto' }}>
              Join Game
            </button>
          </div>
        </div>
      </div>
      <AdBanner />
    </div>
  );

  const renderLobby = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <button onClick={() => setView('home')} className="btn-outline" style={{ display: 'flex', gap: '4px', border: 'none', marginBottom: '16px' }}>
        <ChevronLeft size={16} /> Exit Lobby
      </button>
      <h2 style={{ fontSize: '28px', color: '#00d4ff', marginBottom: '8px' }}>Arena Lobby</h2>
      <p style={{ color: '#888', marginBottom: '32px' }}>{CATEGORIES[room.category]} • {room.questions.length} Questions</p>

      <div className="card" style={{ marginBottom: '32px', border: '2px solid rgba(0, 212, 255, 0.3)' }}>
        <p style={{ color: '#555', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Share this code with friends</p>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffe600', letterSpacing: '8px', margin: '8px 0' }}>{room.code}</div>
        <button className="btn-outline" onClick={copyCode} style={{ gap: '6px' }}>
          {copySuccess ? '✓ Copied!' : 'Copy Code'}
        </button>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' }}>
          <Users size={14} /> PLAYERS JOINED ({room.players.length})
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {room.players.map((p, i) => (
            <div key={i} style={{ 
              background: i === myPlayerId ? 'rgba(0, 212, 255, 0.15)' : '#0a0a0f',
              border: `1px solid ${i === myPlayerId ? '#00d4ff' : '#2a2a3e'}`,
              borderRadius: '12px', padding: '10px 16px', color: i === myPlayerId ? '#00d4ff' : '#fff',
              fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              {i === 0 ? '👑' : '🎮'} {p.name} {i === myPlayerId && <span style={{fontSize: '10px', color: '#555'}}>(you)</span>}
            </div>
          ))}
        </div>
      </div>

      {isHost ? (
        <button className="btn-secondary" onClick={startGame} disabled={room.players.length < 1}>
          Start Match! <ArrowRight size={18} />
        </button>
      ) : (
        <div style={{ color: '#555', background: '#13131f', padding: '14px', borderRadius: '12px' }}>
          Waiting for the host to start...
        </div>
      )}
    </div>
  );

  const renderPlaying = () => {
    const q = room.questions[room.currentQuestion];
    const isAnswered = selectedAnswer !== null;
    const showFeedback = isAnswered || allAnswered;
    const answeredCount = room.players.filter(p => (p.answers?.length || 0) > room.currentQuestion).length;
    
    return (
      <div className="game-container animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ color: '#555', fontWeight: 'bold', fontSize: '13px' }}>Q {room.currentQuestion + 1} / {room.questions.length}</span>
          <div style={{ 
            background: timer < 5 ? 'rgba(255, 45, 120, 0.1)' : 'rgba(0, 212, 255, 0.1)',
            borderColor: timer < 5 ? '#ff2d78' : '#00d4ff',
            color: timer < 5 ? '#ff2d78' : '#00d4ff',
            border: '2px solid', borderRadius: '10px', padding: '4px 12px', fontWeight: 'bold', fontSize: '18px'
          }}>
            {isAnswered ? '✓' : timer}
          </div>
        </div>
        
        <div className="progress-bar" style={{ marginBottom: '24px' }}>
          <div className="progress-fill" style={{ width: `${((room.currentQuestion + 1) / room.questions.length) * 100}%` }} />
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '32px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: '1.4' }}>{q.q}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {q.options.map((opt, i) => {
            let cls = 'option-btn';
            if (showFeedback) {
              if (i === q.answer) cls += ' correct';
              else if (i === selectedAnswer) cls += ' wrong';
              else cls += ' disabled';
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={isAnswered}>
                 <span style={{color: '#555', marginRight: '10px'}}>{['A','B','C','D'][i]}</span>
                 {opt}
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', color: '#555', fontSize: '13px', marginBottom: '20px' }}>
          {answeredCount} / {room.players.length} players answered
        </div>

        {isHost && isAnswered && (
          <div style={{ textAlign: 'center' }}>
            <button className="btn-secondary" onClick={nextQuestion}>
              {room.currentQuestion + 1 >= room.questions.length ? 'See Results' : 'Next Question'} <ArrowRight size={18} />
            </button>
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <AdBanner />
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const sorted = [...room.players].sort((a,b) => b.score - a.score);
    const medals = ['🥇', '🥈', '🥉'];

    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>
        <h1 className="game-title" style={{ color: '#ffe600' }}>Game Over!</h1>
        <p style={{ color: '#555', marginBottom: '32px' }}>Final Standings</p>

        <div className="card" style={{ marginBottom: '32px', padding: '16px' }}>
          {sorted.map((p, i) => (
            <div key={i} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              padding: '16px', background: p.name === playerName ? 'rgba(0, 212, 255, 0.05)' : 'transparent',
              borderRadius: '12px', borderBottom: i < sorted.length - 1 ? '1px solid #1a1a2e' : 'none',
              border: p.name === playerName ? '1px solid #00d4ff' : 'none',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{medals[i] || `#${i+1}`}</span>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{p.name} {p.name === playerName && '(YOU)'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#00ff94' }}>{p.score}</span>
                <span style={{ fontSize: '11px', color: '#555' }}>PTS</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="share-btn" onClick={shareResults}>
            <Share2 size={16} /> Share Results
          </button>
          <button className="btn-outline" onClick={() => setView('home')}>
             New Arena Match
          </button>
        </div>
        <div style={{ marginTop: '40px' }}>
          <AdBanner format="rectangle" />
        </div>
      </div>
    );
  };

  if (!room && view !== 'home') {
    setView('home');
    return null;
  }

  return (
    <>
      <FloatingBg />
      {view === 'home' && renderHome()}
      {view === 'lobby' && renderLobby()}
      {view === 'playing' && renderPlaying()}
      {view === 'results' && renderResults()}

      <div className="game-container" style={{ paddingTop: 0, marginTop: '-20px' }}>
        <div className="how-to-play">
          <div className="how-to-play-title">
            <HelpCircle size={16} color="#ffe600" /> How to Play
          </div>
          <div className="how-to-play-steps">
            <div className="how-to-play-step">
              <span className="how-to-play-number">1</span>
              <span>Create a room and share the 3-letter code with your friends to join the arena.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">2</span>
              <span>Once the match starts, you have 15 seconds to answer each multiple-choice question.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">3</span>
              <span>Correct answers earn 10 points. If everyone answers or time runs out, the host moves to the next question!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
