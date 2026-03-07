'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { Brain, Users, Home, ArrowRight, Trophy, ChevronLeft, Volume2 } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';

const COLORS = [
  { id: 0, color: '#00d4ff', shadow: 'rgba(0, 212, 255, 0.4)' },
  { id: 1, color: '#ff2d78', shadow: 'rgba(255, 45, 120, 0.4)' },
  { id: 2, color: '#ffe600', shadow: 'rgba(255, 230, 0, 0.4)' },
  { id: 3, color: '#00ff94', shadow: 'rgba(0, 255, 148, 0.4)' }
];

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.4 }}>
    <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(177, 74, 237, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
    <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
  </div>
);

export default function MemoryArenaGame() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home'); 
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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

  // Sequence playback logic
  useEffect(() => {
    if (view === 'playing' && room?.gameState === 'showing' && !isShowingSequence) {
      playSequence();
    }
  }, [room?.sequence, room?.gameState, view]);

  const playSequence = async () => {
    setIsShowingSequence(true);
    setUserInput([]);
    
    for (let i = 0; i < room.sequence.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setActiveButton(room.sequence[i]);
      await new Promise(r => setTimeout(r, 400));
      setActiveButton(null);
    }
    
    setIsShowingSequence(false);
    if (isHost) {
      await updateDoc(doc(db, "rooms", room.id), { gameState: 'input' });
    }
  };

  if (!mounted) return <div className="game-container" />;

  const generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleCreateRoom = async () => {
    if (!playerName) return setError('Enter a nickname!');
    const code = generateRoomCode();
    const newRoom = {
      code,
      type: 'memory',
      status: 'lobby',
      gameState: 'waiting',
      sequence: [Math.floor(Math.random() * 4)],
      players: [{ name: playerName, alive: true, score: 0 }],
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
    if (snap.empty) return setError('Room not found!');
    
    const roomDoc = snap.docs[0];
    const roomData = roomDoc.data();
    const playerIdx = roomData.players.length;
    
    await updateDoc(doc(db, "rooms", roomDoc.id), {
      players: arrayUnion({ name: playerName, alive: true, score: 0 })
    });

    setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, { name: playerName, alive: true, score: 0 }] });
    setMyPlayerId(playerIdx);
    setIsHost(false);
    setView('lobby');
  };

  const startLevel = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'playing', gameState: 'showing' });
  };

  const handleButtonClick = async (id) => {
    if (room.gameState !== 'input' || !room.players[myPlayerId].alive || isShowingSequence) return;
    
    const nextInput = [...userInput, id];
    setUserInput(nextInput);

    // Check if correct so far
    const isCorrect = id === room.sequence[nextInput.length - 1];
    
    if (!isCorrect) {
      const newPlayers = [...room.players];
      newPlayers[myPlayerId].alive = false;
      await updateDoc(doc(db, "rooms", room.id), { players: newPlayers });
      return;
    }

    // Finished sequence correctly
    if (nextInput.length === room.sequence.length) {
      const newPlayers = [...room.players];
      newPlayers[myPlayerId].score += 1;
      await updateDoc(doc(db, "rooms", room.id), { players: newPlayers });
      
      // If host, check if everyone is done or out
      if (isHost) {
        setTimeout(async () => {
          const updatedRoom = (await getDoc(doc(db, "rooms", room.id))).data();
          const alivePlayers = updatedRoom.players.filter(p => p.alive);
          
          if (alivePlayers.length === 0) {
            await updateDoc(doc(db, "rooms", room.id), { status: 'results' });
            return;
          }

          // Advance to next level
          const newSequence = [...room.sequence, Math.floor(Math.random() * 4)];
          await updateDoc(doc(db, "rooms", room.id), { 
            sequence: newSequence, 
            gameState: 'showing' 
          });
        }, 1000);
      }
    }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge" style={{ background: 'rgba(177, 74, 237, 0.1)', color: '#b14aed' }}>Memory Arena</div>
      <h1 className="game-title">🧠 BRAIN <span style={{ color: '#b14aed' }}>SYNC</span></h1>
      <p className="game-subtitle">Repeat the sequence as a group. Last survivor wins!</p>

      <div style={{ maxWidth: '400px', margin: '40px auto' }}>
        <input 
          placeholder="NICKNAME" 
          className="input-field"
          value={playerName}
          onChange={e => setPlayerName(e.target.value.toUpperCase())}
          maxLength={10}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom}>Host Arena</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input 
              placeholder="CODE"
              className="input-field"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value.toUpperCase())}
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
        <ChevronLeft size={16} /> Exit
      </button>
      <h2 style={{ fontSize: '28px' }}>Join Code: <span style={{ color: '#ffe600' }}>{room.code}</span></h2>
      <div className="card" style={{ margin: '32px 0' }}>
        {room.players.map((p, i) => (
          <div key={i} style={{ padding: '8px', color: '#fff', fontWeight: 800 }}>
             {i === 0 ? '👑' : '🧠'} {p.name}
          </div>
        ))}
      </div>
      {isHost && (
        <button className="btn-secondary" onClick={startLevel} disabled={room.players.length < 1}>
           START MATCH! <ArrowRight size={18} />
        </button>
      )}
    </div>
  );

  const renderPlaying = () => {
    const isAlive = room.players[myPlayerId].alive;
    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontWeight: 800 }}>
           <span style={{ color: '#b14aed' }}>Level {room.sequence.length}</span>
           <span style={{ color: isAlive ? '#00ff94' : '#ff2d78' }}>{isAlive ? 'ALIVE' : 'ELIMINATED'}</span>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px', 
          maxWidth: '400px', 
          margin: '0 auto',
          position: 'relative'
        }}>
          {COLORS.map((c) => (
            <div 
              key={c.id}
              onClick={() => handleButtonClick(c.id)}
              style={{
                aspectRatio: '1/1',
                borderRadius: '24px',
                background: activeButton === c.id ? c.color : '#13131f',
                boxShadow: activeButton === c.id ? `0 0 40px ${c.shadow}` : 'none',
                opacity: isAlive ? 1 : 0.3,
                border: `4px solid ${c.color}`,
                cursor: isAlive && !isShowingSequence ? 'pointer' : 'default',
                transition: 'all 0.1s'
              }}
            />
          ))}
          {isShowingSequence && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
               <Volume2 size={48} color="#fff" />
            </div>
          )}
        </div>

        <div style={{ marginTop: '32px' }}>
           <div style={{ fontSize: '12px', color: '#555', marginBottom: '16px' }}>SURVIVORS</div>
           <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {room.players.map((p, i) => (
                <div key={i} style={{ 
                  padding: '4px 12px', borderRadius: '8px', background: p.alive ? '#1a1a2e' : 'transparent',
                  color: p.alive ? '#fff' : '#444', border: `1px solid ${p.alive ? '#1a1a2e' : '#222'}`
                }}>
                  {p.name}
                </div>
              ))}
           </div>
        </div>
        <div style={{ marginTop: '32px' }}>
          <AdBanner format="horizontal" />
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const sorted = [...room.players].sort((a,b) => b.score - a.score);
    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <h1 className="game-title"><Trophy color="#ffe600" /> Brain Champ</h1>
        <div className="card" style={{ background: '#13131f', padding: '32px', marginTop: '24px' }}>
          {sorted.map((p, i) => (
            <div key={i} style={{ 
              display: 'flex', justifyContent: 'space-between', padding: '16px',
              borderBottom: i < sorted.length - 1 ? '1px solid #1a1a2e' : 'none',
              color: i === 0 ? '#b14aed' : '#fff',
              fontWeight: i === 0 ? 800 : 400
            }}>
              <span>{i === 0 ? '🏆' : `#${i+1}`} {p.name}</span>
              <span>Lvl {p.score}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: '32px' }} onClick={() => window.location.reload()}>
          New Arena
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
    </>
  );
}
