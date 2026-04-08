'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { Eye, Users, Home, ArrowRight, Trophy, ChevronLeft, Target, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import { sanitizePlayerName, sanitizeRoomCode, validatePlayerName } from '../lib/contentPolicy';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(0, 255, 148, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const GRID_SIZE = 16; // 4x4 grid
const SYMBOLS = [
  '🍎', '🍏', '🍊', '🍋', '🍐', '🫐', '🍓', '🍒', '🥑', '🥦', '🍕', '🍔', '🍟', '🍦', '🍩', '🍪', 
  '🐱', '🐶', '🦊', '🐻', '🐼', '🐨', '🐸', '🦁', '🐯', '🦁', '🦓', '🦒', '🐘', '🦏', '🦛', '🐮',
  '🐷', '🐨', '🦦', '🦥', '🦘', '🦬', '🐎', '🐫', '🦙', '🦝', '🐈', '🐕', '🐩', '🐿️', '🐀', '🐁',
  '🕊️', '🦅', '🦆', '🦢', '🦉', '🦩', '🦚', '🦜', '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱',
  '🥎', '🏒', '🗂️', '📂', '📁', '💼', '📅', '🗑️', '📌', '📎', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝️',
  '🔨', '🪓', '⛏️', '⚒️', '🛠️', '🗡️', '⚔️', '🔫', '💣', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿',
  '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '🌡️', '💉', '🧪', '🧬', '☢️', '☣️', '🈲', '🈳',
];

export default function OddOneOutGame() {
  const [view, setView] = useState('home'); 
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'

  useEffect(() => {
    if (!room?.id) return;
    const unsub = onSnapshot(doc(db, "rooms", room.id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (room && data.currentRound !== room.currentRound) {
          setFeedback(null);
        }
        setRoom(prev => ({ ...prev, ...data }));
        
        if (data.status === 'playing' && view === 'lobby') setView('playing');
        if (data.status === 'results' && view !== 'results') setView('results');
      }
    });
    return () => unsub();
  }, [room?.id, room?.currentRound, view]);

  // Host listener
  useEffect(() => {
    if (!room || !isHost || view !== 'playing') return;

    if (room.roundWinner) {
      const timer = setTimeout(async () => {
        const roomRef = doc(db, "rooms", room.id);
        const freshRoomSnap = await getDoc(roomRef);
        if (freshRoomSnap.exists()) {
            const freshRoom = freshRoomSnap.data();
            if (freshRoom.roundWinner) {
              const nextRound = freshRoom.currentRound + 1;
              const isGameOver = nextRound > 30;
              await updateDoc(roomRef, {
                gridSeed: Math.floor(Math.random() * 1000000),
                oddIndex: Math.floor(Math.random() * GRID_SIZE),
                symbolIndex: Math.floor(Math.random() * SYMBOLS.length),
                currentRound: isGameOver ? freshRoom.currentRound : nextRound,
                status: isGameOver ? 'results' : 'playing',
                roundWinner: null
              });
            }
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [room?.roundWinner, room?.currentRound, isHost, view]);

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  const handleCreateRoom = async () => {
    const cleanName = sanitizePlayerName(playerName);
    const nameError = validatePlayerName(cleanName);
    if (nameError) return setError(nameError);
    const code = generateRoomCode();
    const newRoom = {
      code,
      type: 'oddoneout',
      status: 'lobby',
      currentRound: 0,
      gridSeed: Math.floor(Math.random() * 1000000),
      oddIndex: Math.floor(Math.random() * GRID_SIZE),
      symbolIndex: Math.floor(Math.random() * SYMBOLS.length),
      roundWinner: null,
      players: [{ name: cleanName, score: 0 }],
      createdAt: serverTimestamp()
    };
    const roomRef = doc(collection(db, "rooms"));
    await setDoc(roomRef, newRoom);
    setRoom({ ...newRoom, id: roomRef.id });
    setMyPlayerId(0);
    setIsHost(true);
    setView('lobby');
  };

  const handleJoinRoom = async () => {
    const cleanName = sanitizePlayerName(playerName);
    const cleanCode = sanitizeRoomCode(roomCode);
    const nameError = validatePlayerName(cleanName);
    if (nameError || !cleanCode) return setError(nameError || 'Enter name and 3-letter code!');
    const q = query(collection(db, "rooms"), where("code", "==", cleanCode), where("status", "==", "lobby"));
    const snap = await getDocs(q);
    if (snap.empty) return setError('Room not found!');
    
    const roomDoc = snap.docs[0];
    const roomData = roomDoc.data();
    const playerIdx = roomData.players.length;
    const newPlayer = { name: cleanName, score: 0 };
    
    await updateDoc(doc(db, "rooms", roomDoc.id), {
      players: arrayUnion(newPlayer)
    });

    setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, newPlayer] });
    setMyPlayerId(playerIdx);
    setIsHost(false);
    setView('lobby');
  };

  const startMatch = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'playing', currentRound: 1 });
  };

  const handleTileClick = async (idx) => {
    if (feedback === 'correct' || room.roundWinner) return;

    if (idx === room.oddIndex) {
      setFeedback('correct');
      
      const roomRef = doc(db, "rooms", room.id);
      const docSnap = await getDoc(roomRef);
      if (!docSnap.exists()) return;
      
      const currentData = docSnap.data();
      if (currentData.roundWinner) return; // already won
      
      const newPlayers = [...currentData.players];
      newPlayers[myPlayerId] = {
        ...newPlayers[myPlayerId],
        score: newPlayers[myPlayerId].score + 10
      };

      await updateDoc(roomRef, { 
        players: newPlayers,
        roundWinner: sanitizePlayerName(playerName)
      });
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge" style={{ background: 'rgba(0, 255, 148, 0.1)', color: '#00ff94' }}>Perception Game</div>
      <h1 className="game-title">👁️ ODD <span style={{ color: '#00ff94' }}>ONE OUT</span></h1>
      <p className="game-subtitle">Find the emoji that doesn&apos;t match. First one wins!</p>

      <div className="card" style={{ maxWidth: '450px', margin: '40px auto', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#555', fontSize: '11px', fontWeight: 800, textAlign: 'left', marginBottom: '8px', textTransform: 'uppercase' }}>
            Choose your nickname
          </label>
          <input 
            placeholder="E.G. PLAYER" 
            className="input-field"
            value={playerName}
            onChange={e => setPlayerName(sanitizePlayerName(e.target.value))}
            maxLength={12}
            style={{ marginBottom: 0 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom} style={{ width: '100%', justifyContent: 'center' }}>
            Host New Race
          </button>
          
          <div style={{ position: 'relative', margin: '10px 0' }}>
            <div style={{ borderTop: '1px solid #2a2a3e', width: '100%' }}></div>
            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-card)', padding: '0 12px', color: '#555', fontSize: '12px', fontWeight: 800 }}>OR</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              placeholder="ENTER RACE CODE"
              className="input-field"
              value={roomCode}
              onChange={e => setRoomCode(sanitizeRoomCode(e.target.value))}
              style={{ fontSize: '14px', marginBottom: 0, flex: 1 }}
            />
            <button className="btn-primary" onClick={handleJoinRoom} style={{ padding: '0 24px' }}>Join</button>
          </div>
        </div>
        
        {error && <p style={{ color: '#ff2d78', marginTop: '16px', fontSize: '14px', fontWeight: 600 }}>{error}</p>}
      </div>
      <AdBanner />
    </div>
  );

  const renderLobby = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <button onClick={() => setView('home')} className="btn-outline" style={{ display: 'flex', gap: '4px', border: 'none', marginBottom: '16px' }}>
        <ChevronLeft size={16} /> Exit Lobby
      </button>
      <h2 style={{ fontSize: '28px' }}>Race Code: <span style={{ color: '#ffe600' }}>{room.code}</span></h2>
      <p style={{ color: '#888', marginBottom: '32px' }}>Waiting for the seeker crew...</p>

      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {room.players.map((p, i) => (
            <div key={i} className="stat-card" style={{ padding: '12px 24px' }}>
              {i === 0 ? '👑' : '👁️‍🗨️'} {p.name}
            </div>
          ))}
        </div>
      </div>

      {isHost && (
        <button className="btn-secondary" onClick={startMatch} disabled={room.players.length < 1}>
           START RACE! <ArrowRight size={18} />
        </button>
      )}
    </div>
  );

  const renderPlaying = () => {
    const mainSymbol = SYMBOLS[room.symbolIndex];
    const oddSymbol = SYMBOLS[(room.symbolIndex + 1) % SYMBOLS.length];

    return (
      <div className="game-container animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontWeight: 800, color: '#00ff94' }}>ROUND {room.currentRound} / 30</span>
          <div style={{ display: 'flex', gap: '15px' }}>
             {room.players.map((p, i) => (
               <div key={i} style={{ fontSize: '12px', fontWeight: 800 }}>
                 {p.name}: <span style={{ color: '#ffe600' }}>{p.score}</span>
               </div>
             ))}
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '10px',
          background: '#0a0a0f',
          padding: '10px',
          borderRadius: '16px',
          border: '2px solid #1a1a2e'
        }}>
          {Array.from({ length: GRID_SIZE }).map((_, i) => (
            <div 
              key={i}
              onClick={() => handleTileClick(i)}
              style={{
                aspectRatio: '1/1',
                background: '#13131f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                borderRadius: '8px',
                cursor: 'pointer',
                border: feedback === 'correct' && i === room.oddIndex ? '2px solid #00ff94' : '2px solid transparent',
                opacity: (feedback === 'correct' && i !== room.oddIndex) || room.roundWinner ? 0.3 : 1,
                transition: 'all 0.2s'
              }}
              className="option-btn"
            >
              {i === room.oddIndex ? oddSymbol : mainSymbol}
            </div>
          ))}
        </div>

        {room.roundWinner && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.85)', padding: '20px', borderRadius: '16px', border: '2px solid #00ff94',
            textAlign: 'center', zIndex: 10, minWidth: '250px'
          }}>
            <div style={{ fontSize: '14px', color: '#00ff94', fontWeight: 800 }}>ROUND OVER</div>
            <div style={{ fontSize: '24px', fontWeight: 900, margin: '10px 0' }}>{room.roundWinner}</div>
            <div style={{ fontSize: '12px', color: '#ffe600' }}>FOUND IT FIRST!</div>
          </div>
        )}

        {feedback && !room.roundWinner && (
          <div style={{ 
            marginTop: '20px', 
            textAlign: 'center', 
            fontSize: '24px', 
            fontWeight: 800,
            color: feedback === 'correct' ? '#00ff94' : '#ff2d78'
          }}>
            {feedback === 'correct' ? 'BULLSEYE! +10' : 'NOPE!'}
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
    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <h1 className="game-title"><Trophy color="#ffe600" /> Perception King</h1>
        <div className="card" style={{ background: '#13131f', padding: '32px', marginTop: '24px' }}>
          {sorted.map((p, i) => (
            <div key={i} style={{ 
              display: 'flex', justifyContent: 'space-between', padding: '16px',
              borderBottom: i < sorted.length - 1 ? '1px solid #1a1a2e' : 'none',
              color: i === 0 ? '#00ff94' : '#fff',
              fontWeight: i === 0 ? 800 : 400
            }}>
              <span>{i === 0 ? '👑' : `#${i+1}`} {p.name}</span>
              <span>{p.score} pts</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: '32px' }} onClick={() => window.location.reload()}>
          Find More
        </button>
        <div style={{ marginTop: '40px' }}>
          <AdBanner format="rectangle" />
        </div>
      </div>
    );
  };

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
            <HelpCircle size={16} color="#00ff94" /> How to Play
          </div>
          <div className="how-to-play-steps">
            <div className="how-to-play-step">
              <span className="how-to-play-number">1</span>
              <span>A grid of emojis will appear. All of them are identical except for **ONE**.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">2</span>
              <span>Scan the grid as quickly as possible and tap the emoji that looks different.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">3</span>
              <span>The first player to find the odd emoji in each round gets 10 points. Fastest seeker wins!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
