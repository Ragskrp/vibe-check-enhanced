'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { Zap, Users, Home, ArrowRight, Timer, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';

export default function ReactionArenaGame() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home'); // home, lobby, playing, results
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [gameState, setGameState] = useState('waiting'); // waiting, steady, go
  const [reactionTime, setReactionTime] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  // Firestore Listener
  useEffect(() => {
    if (!mounted || !room?.id) return;
    const unsub = onSnapshot(doc(db, "rooms", room.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setRoom(prev => ({ ...prev, ...data }));
        
        if (data.status === 'playing' && view === 'lobby') setView('playing');
        if (data.status === 'results' && view !== 'results') setView('results');
      }
    });
    return () => unsub();
  }, [room?.id, view, mounted]);

  if (!mounted) return <div className="game-container" />;

  const generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleCreateRoom = async () => {
    if (!playerName) return setError('Enter a nickname!');
    const code = generateRoomCode();
    const newRoom = {
      code,
      type: 'reaction',
      status: 'lobby',
      gameState: 'waiting',
      players: [{ name: playerName, reaction: null, ready: false }],
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
    if (!playerName || !roomCode) return setError('Enter name and code!');
    const q = query(collection(db, "rooms"), where("code", "==", roomCode.toUpperCase()), where("status", "==", "lobby"));
    const snap = await getDocs(q);
    if (snap.empty) return setError('Room not found or game started!');
    
    const roomDoc = snap.docs[0];
    const roomData = roomDoc.data();
    const playerIdx = roomData.players.length;
    const newPlayer = { name: playerName, reaction: null, ready: false };
    
    await updateDoc(doc(db, "rooms", roomDoc.id), {
      players: arrayUnion(newPlayer)
    });

    setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, newPlayer] });
    setMyPlayerId(playerIdx);
    setIsHost(false);
    setView('lobby');
  };

  const startBattle = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'playing', gameState: 'waiting' });
    
    // Random delay for the "GO" signal
    setTimeout(async () => {
      await updateDoc(doc(db, "rooms", room.id), { 
        gameState: 'go', 
        startTime: Date.now() 
      });
    }, 2000 + Math.random() * 3000);
  };

  const handleTrigger = async () => {
    if (room.gameState !== 'go' || reactionTime) return;
    const now = Date.now();
    const time = now - room.startTime;
    setReactionTime(time);
    
    const newPlayers = [...room.players];
    newPlayers[myPlayerId].reaction = time;
    await updateDoc(doc(db, "rooms", room.id), { players: newPlayers });

    // Check if everyone clicked
    const allFinished = newPlayers.every(p => p.reaction !== null);
    if (allFinished && isHost) {
      setTimeout(async () => {
        await updateDoc(doc(db, "rooms", room.id), { status: 'results' });
      }, 1500);
    }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <Link href="/" className="btn-outline" style={{ display: 'inline-flex', gap: '8px', border: 'none', marginBottom: '24px' }}>
        <Home size={18} /> Back to VibeCheck
      </Link>
      <div className="game-badge" style={{ background: 'rgba(255, 45, 120, 0.1)', color: '#ff2d78' }}>Arena Mode</div>
      <h1 className="game-title">⚡ REACTION <span style={{ color: '#ff2d78' }}>BATTLE</span></h1>
      <p className="game-subtitle">Who has the fastest reflexes in the room?</p>

      <div style={{ maxWidth: '400px', margin: '40px auto' }}>
        <input 
          placeholder="YOUR NICKNAME" 
          className="input-field"
          value={playerName}
          onChange={e => setPlayerName(e.target.value.toUpperCase())}
          maxLength={10}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom}>Host Battle</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input 
              placeholder="CODE"
              className="input-field"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value.toUpperCase())}
              style={{ fontSize: '14px', padding: '10px' }}
            />
            <button className="btn-primary" onClick={handleJoinRoom} style={{ padding: '10px' }}>Join</button>
          </div>
        </div>
        {error && <p style={{ color: '#ff2d78', marginTop: '12px', fontSize: '14px' }}>{error}</p>}
      </div>
      <AdBanner />
    </div>
  );

  const renderLobby = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <button onClick={() => setView('home')} className="btn-outline" style={{ display: 'flex', gap: '4px', border: 'none', marginBottom: '16px' }}>
        <ChevronLeft size={16} /> Exit Lobby
      </button>
      <h2 style={{ fontSize: '28px', color: '#00d4ff' }}>Join Code: <span style={{ color: '#ffe600' }}>{room.code}</span></h2>
      <p style={{ color: '#888', marginBottom: '32px' }}>Waiting for {isHost ? 'you to start' : 'host'}...</p>

      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {room.players.map((p, i) => (
            <div key={i} className="stat-card" style={{ padding: '12px 24px', border: '1px solid #1a1a2e' }}>
              {i === 0 ? '👑' : '🎮'} {p.name}
            </div>
          ))}
        </div>
      </div>

      {isHost && (
        <button className="btn-secondary" onClick={startBattle} disabled={room.players.length < 2}>
           START BATTLE! <ArrowRight size={18} />
        </button>
      )}
      {!isHost && <div className="loading-vibe" style={{ fontSize: '14px' }}>GET READY...</div>}
    </div>
  );

  const renderPlaying = () => {
    const isWait = room.gameState === 'waiting';
    return (
      <div 
        className="game-container" 
        onClick={handleTrigger}
        style={{ 
          height: '600px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          background: isWait ? '#1a1a2e' : '#ff2d78',
          cursor: 'pointer',
          borderRadius: '24px',
          transition: 'background 0.1s ease'
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          {isWait ? (
            <>
              <Timer size={64} className="animate-pulse" style={{ marginBottom: '20px', opacity: 0.5 }} />
              <h2 style={{ fontSize: '32px', fontWeight: 800 }}>WAIT FOR IT...</h2>
              <p style={{ opacity: 0.6 }}>Don't click yet!</p>
            </>
          ) : (
            <>
              <Zap size={80} style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: '64px', fontWeight: 900 }}>TAP NOW!</h2>
              {reactionTime && <div style={{ fontSize: '48px', fontWeight: 900, marginTop: '20px' }}>{reactionTime}ms</div>}
            </>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const sorted = [...room.players].sort((a,b) => (a.reaction || 9999) - (b.reaction || 9999));
    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <h1 className="game-title"><Trophy color="#ffe600" /> Leaderboard</h1>
        <div className="card" style={{ background: '#13131f', padding: '32px', marginTop: '24px' }}>
          {sorted.map((p, i) => (
            <div key={i} style={{ 
              display: 'flex', justifyContent: 'space-between', padding: '16px',
              borderBottom: i < sorted.length - 1 ? '1px solid #1a1a2e' : 'none',
              color: i === 0 ? '#ffe600' : '#fff',
              fontWeight: i === 0 ? 800 : 400
            }}>
              <span>{i === 0 ? '👑' : `#${i+1}`} {p.name}</span>
              <span>{p.reaction ? `${p.reaction}ms` : 'FAIL'}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: '32px' }} onClick={() => window.location.reload()}>
          Play Again
        </button>
      </div>
    );
  };

  return (
    <>
      {view === 'home' && renderHome()}
      {view === 'lobby' && renderLobby()}
      {view === 'playing' && renderPlaying()}
      {view === 'results' && renderResults()}
    </>
  );
}
