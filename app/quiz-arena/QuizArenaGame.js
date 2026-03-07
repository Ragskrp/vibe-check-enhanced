'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, onSnapshot, setDoc, updateDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { Share2, ArrowRight, Trophy, Users, Search, PlusCircle, LogIn, ChevronLeft } from 'lucide-react';
import AdBanner from '../components/AdBanner';

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
    { q: "Who painted the Mona Lisa?", options: ["Picasso", "Da Vinci", "Van Gogh", "Michelangelo"], answer: 1 },
    { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "Which gas do plants absorb from the air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], answer: 2 },
    { q: "What's the fastest land animal?", options: ["Lion", "Horse", "Cheetah", "Leopard"], answer: 2 },
  ],
  pop_culture: [
    { q: "Which year did TikTok launch globally?", options: ["2016", "2017", "2018", "2019"], answer: 2 },
    { q: "Who plays Iron Man in the MCU?", options: ["Chris Evans", "Robert Downey Jr.", "Chris Pratt", "Mark Ruffalo"], answer: 1 },
    { q: "Which show features the 'Red Wedding'?", options: ["Vikings", "The Witcher", "Game of Thrones", "House of the Dragon"], answer: 2 },
    { q: "Which app has a ghost as its logo?", options: ["Instagram", "WhatsApp", "Snapchat", "BeReal"], answer: 2 },
    { q: "Who sang 'Bad Guy'?", options: ["Ariana Grande", "Billie Eilish", "Dua Lipa", "Olivia Rodrigo"], answer: 1 },
    { q: "What's the name of Shrek's donkey friend?", options: ["Donkey", "Burro", "Eddie", "Ass"], answer: 0 },
    { q: "Which platform streams Stranger Things?", options: ["Hulu", "HBO", "Disney+", "Netflix"], answer: 3 },
    { q: "What color is Sonic the Hedgehog?", options: ["Red", "Green", "Blue", "Yellow"], answer: 2 },
  ],
  // Add more content as needed
};

// Default trivial list for other categories
Object.keys(CATEGORIES).forEach(cat => {
  if (!TRIVIA_QUESTIONS[cat]) {
    TRIVIA_QUESTIONS[cat] = TRIVIA_QUESTIONS.general;
  }
});

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
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
  }, [room?.currentQuestion, view, room, mounted]);

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const handleCreateRoom = async () => {
    if (!playerName || playerName.trim().length < 2) {
      setError('Please enter a valid nickname (min 2 chars)!');
      return;
    }
    setError('');

    try {
      const code = generateRoomCode();
      console.log('Attempting to create room with code:', code);
      
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
      console.log('Room created successfully in Firestore');
      
      setRoom({ 
        id: code, 
        ...newRoom, 
        createdAt: new Date().toISOString() // use string date for local state
      });
      setMyPlayerId(0);
      setIsHost(true);
      setView('lobby');
    } catch (e) {
      console.error('Firebase Room Creation Error:', e);
      setError('Firebase Error: ' + e.message + '. Initializing local room...');
      
      // Local fallback logic
      const code = "LOCAL-" + Math.floor(Math.random() * 1000);
      const localRoom = {
        id: code,
        code,
        category: selectedCategory,
        status: 'lobby',
        currentQuestion: 0,
        questions: TRIVIA_QUESTIONS[selectedCategory],
        players: [{ name: playerName, score: 0, answers: [] }],
        createdAt: new Date().toISOString(),
      };
      setRoom(localRoom);
      setMyPlayerId(0);
      setIsHost(true);
      setView('lobby');
    }
  };

  const handleJoinRoom = async () => {
    if (!playerName || playerName.trim().length < 2 || !roomCode.trim()) {
      setError('Enter both a valid name and 6-char room code!');
      return;
    }
    setError('');

    try {
      console.log('Attempting to join room:', roomCode.toUpperCase());
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
      console.log('Joined room successfully');

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

    const newPlayers = [...room.players];
    newPlayers[myPlayerId] = {
      ...newPlayers[myPlayerId],
      score: newPlayers[myPlayerId].score + points,
      answers: [...(newPlayers[myPlayerId].answers || []), idx]
    };

    await updateDoc(doc(db, "rooms", room.id), { players: newPlayers });
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
    const text = `🏆 VIBECHECK Quiz Arena Results!\nCategory: ${CATEGORIES[room.category]}\nWinner: ${winner.name} (${winner.score} pts)\nMy Rank: #${sorted.findIndex(p => p.name === playerName) + 1}\n\nChallenge me at: vibecheck-play.vercel.app/quiz-arena`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied results! 📋');
    }
  };

  // --- RENDERING COMPONENTS ---

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

      <div className="card" style={{ marginBottom: '24px' }}>
        <input 
          placeholder="Your Name / Nickname"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={15}
          style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#0a0a0f', border: '2px solid #2a2a3e', color: '#fff', fontSize: '16px', marginBottom: '20px' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'rgba(0, 212, 255, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎮</div>
            <h3 style={{ fontSize: '16px', color: '#00d4ff', marginBottom: '8px' }}>Host Game</h3>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '8px', background: '#0a0a0f', color: '#fff', border: '1px solid #2a2a3e', borderRadius: '8px', fontSize: '12px', marginBottom: '12px' }}
            >
              {Object.entries(CATEGORIES).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
            <button className="btn-secondary" onClick={handleCreateRoom} style={{ width: '100%', padding: '10px', fontSize: '13px' }}>
              Create Room
            </button>
          </div>

          <div style={{ background: 'rgba(255, 45, 120, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 45, 120, 0.2)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔗</div>
            <h3 style={{ fontSize: '16px', color: '#ff2d78', marginBottom: '8px' }}>Join Room</h3>
            <input 
              placeholder="ENTER CODE"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
              style={{ width: '100%', textAlign: 'center', padding: '8px', background: '#0a0a0f', border: '1px solid #2a2a3e', borderRadius: '8px', color: '#ffe600', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '12px' }}
            />
            <button className="btn-primary" onClick={handleJoinRoom} style={{ width: '100%', padding: '10px', fontSize: '13px' }}>
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
    const myRank = sorted.findIndex(p => p.name === playerName) + 1;
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
      </div>
    );
  };

  if (!room && view !== 'home') {
    setView('home');
    return null;
  }

  switch(view) {
    case 'home': return renderHome();
    case 'lobby': return renderLobby();
    case 'playing': return renderPlaying();
    case 'results': return renderResults();
    default: return renderHome();
  }
}
