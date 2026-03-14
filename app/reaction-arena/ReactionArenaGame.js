'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { Zap, Users, Home, ArrowRight, Timer, Trophy, ChevronLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '15%', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255, 45, 120, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

export default function ReactionArenaGame() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home'); // home, lobby, playing, results
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
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

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  const handleCreateRoom = async () => {
    if (!playerName) return setError('Enter a nickname!');
    const code = generateRoomCode();
    const newRoom = {
      code,
      type: 'reaction',
      status: 'lobby',
      gameState: 'waiting',
      currentRound: 1,
      totalRounds: 5,
      players: [{ name: playerName, reaction: null, score: 0 }],
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
    if (!playerName || !roomCode || roomCode.length !== 3) return setError('Enter name and 3-letter code!');
    const q = query(collection(db, "rooms"), where("code", "==", roomCode.toUpperCase()), where("status", "==", "lobby"));
    const snap = await getDocs(q);
    if (snap.empty) return setError('Room not found or game started!');
    
    const roomDoc = snap.docs[0];
    const roomData = roomDoc.data();
    const playerIdx = roomData.players.length;
    const newPlayer = { name: playerName, reaction: null, score: 0 };
    
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
    const delay = 2000 + Math.random() * 3000;
    setTimeout(async () => {
      await updateDoc(doc(db, "rooms", room.id), { 
        gameState: 'go', 
        startTime: Date.now() 
      });
    }, delay);
  };

  const handleTrigger = async () => {
    if (room.gameState !== 'go' || reactionTime) return;
    const now = Date.now();
    const time = now - room.startTime;
    setReactionTime(time);
    
    const roomRef = doc(db, "rooms", room.id);
    const docSnap = await getDoc(roomRef);
    const currentData = docSnap.data();
    
    const newPlayers = [...currentData.players];
    newPlayers[myPlayerId].reaction = time;
    
    // Wait for everyone and award point to fastest
    const everyoneFinished = newPlayers.every(p => p.reaction !== null);
    if (everyoneFinished) {
      const winnerIdx = newPlayers.reduce((best, p, idx) => (p.reaction < newPlayers[best].reaction ? idx : best), 0);
      newPlayers[winnerIdx].score += 1;
      
      if (isHost) {
        setTimeout(async () => {
          if (currentData.currentRound >= 5) {
            await updateDoc(roomRef, { status: 'results', players: newPlayers.map(p => ({ ...p, reaction: null })) });
          } else {
            await updateDoc(roomRef, { 
              gameState: 'summary',
              players: newPlayers
            });
          }
        }, 1000);
      }
    }
    
    await updateDoc(roomRef, { players: newPlayers });
  };

  const startNextRound = async () => {
    if (!isHost) return;
    const roomRef = doc(db, "rooms", room.id);
    await updateDoc(roomRef, {
      currentRound: room.currentRound + 1,
      gameState: 'waiting',
      players: room.players.map(p => ({ ...p, reaction: null })),
      startTime: null
    });
    setReactionTime(null);
    const delay = 2000 + Math.random() * 3000;
    setTimeout(async () => {
      await updateDoc(roomRef, { 
        gameState: 'go', 
        startTime: Date.now() 
      });
    }, delay);
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge" style={{ background: 'rgba(255, 45, 120, 0.1)', color: '#ff2d78' }}>Arena Mode</div>
      <h1 className="game-title">⚡ REACTION <span style={{ color: '#ff2d78' }}>ARENA</span></h1>
      <p className="game-subtitle">Who has the fastest reflexes in the room?</p>

      <div className="card" style={{ maxWidth: '450px', margin: '40px auto', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#555', fontSize: '11px', fontWeight: 800, textAlign: 'left', marginBottom: '8px', textTransform: 'uppercase' }}>
            Choose your nickname
          </label>
          <input 
            placeholder="E.G. SPEEDSTER" 
            className="input-field"
            value={playerName}
            onChange={e => setPlayerName(e.target.value.toUpperCase())}
            maxLength={10}
            style={{ marginBottom: 0 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom} style={{ width: '100%', justifyContent: 'center' }}>
            Host New Battle
          </button>
          
          <div style={{ position: 'relative', margin: '10px 0' }}>
            <div style={{ borderTop: '1px solid #2a2a3e', width: '100%' }}></div>
            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-card)', padding: '0 12px', color: '#555', fontSize: '12px', fontWeight: 800 }}>OR</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              placeholder="ENTER ROOM CODE"
              className="input-field"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value.toUpperCase())}
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
    const isSummary = room.gameState === 'summary';

    return (
      <div className="game-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontWeight: 800, color: '#ff2d78' }}>ROUND {room.currentRound} / 5</span>
          <div style={{ display: 'flex', gap: '15px' }}>
             {room.players.map((p, i) => (
                <div key={i} style={{ fontSize: '12px', fontWeight: 800, color: p.reaction ? '#00ff94' : '#fff' }}>
                  {p.name}: <span style={{ color: '#ffe600' }}>{p.score}</span> {p.reaction && `(${p.reaction}ms)`}
                </div>
             ))}
          </div>
        </div>
        
        {isSummary ? (
          <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#13131f' }}>
            <h2 style={{ fontSize: '32px', color: '#ffe600', marginBottom: '20px' }}>ROUND {room.currentRound} COMPLETE</h2>
            <div style={{ marginBottom: '40px' }}>
              {isHost ? (
                <button className="btn-secondary" onClick={startNextRound}>
                  START ROUND {room.currentRound + 1} <ArrowRight size={18} />
                </button>
              ) : (
                <p style={{ color: '#555', fontWeight: 800 }}>WAITING FOR HOST...</p>
              )}
            </div>
            <div style={{ width: '100%', maxWidth: '300px' }}>
               {room.players.map((p, i) => (
                 <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #1a1a2e' }}>
                   <span>{p.name}</span>
                   <span style={{ fontWeight: 800, color: '#00ff94' }}>{p.reaction}ms</span>
                 </div>
               ))}
            </div>
          </div>
        ) : (
          <div 
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
        )}
        <div style={{ marginTop: '32px' }}>
          <AdBanner format="horizontal" />
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
              <span>{p.score} wins</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: '32px' }} onClick={async () => {
          if (isHost) {
            const resetPlayers = room.players.map(p => ({ ...p, reaction: null, ready: false }));
            await updateDoc(doc(db, "rooms", room.id), {
              status: 'lobby',
              gameState: 'waiting',
              players: resetPlayers,
              startTime: null
            });
          }
        }}>
          {isHost ? 'Play Again' : 'Waiting for host to restart...'}
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
            <HelpCircle size={16} color="#ff2d78" /> How to Play
          </div>
          <div className="how-to-play-steps">
            <div className="how-to-play-step">
              <span className="how-to-play-number">1</span>
              <span>Host a room or join with a code. This is a multiplayer test of speed!</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">2</span>
              <span>When the match starts, wait for the screen to turn **PINK**.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">3</span>
              <span>Click or tap the screen the millisecond it changes content. The fastest reaction time wins!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
