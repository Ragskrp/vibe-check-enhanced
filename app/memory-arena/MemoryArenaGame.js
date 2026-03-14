'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { Brain, Users, Home, ArrowRight, Trophy, ChevronLeft, HelpCircle } from 'lucide-react';
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
    const unsub = onSnapshot(doc(db, "rooms", room.id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
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
    } else if (view === 'playing' && room?.gameState === 'input' && isShowingSequence) {
      setIsShowingSequence(false);
      setActiveButton(null);
    }
  }, [room?.sequence?.length, room?.gameState, view]);

  // Host listener for turn and round management
  useEffect(() => {
    if (!mounted || !room || !isHost || view !== 'playing') return;

    if (room.gameState === 'input') {
      const alivePlayers = room.players.filter(p => p.alive);
      const isAnyoneLeftInRound = room.turnIndex < room.players.length;

      if (room.players.length > 0 && alivePlayers.length === 0) {
        updateDoc(doc(db, "rooms", room.id), { status: 'results' });
      } else if (!isAnyoneLeftInRound) {
        // Round complete, start next
        const timeout = setTimeout(async () => {
          const freshRoomSnap = await getDoc(doc(db, "rooms", room.id));
          if (freshRoomSnap.exists()) {
            const data = freshRoomSnap.data();
            await updateDoc(doc(db, "rooms", room.id), {
              sequence: [...data.sequence, Math.floor(Math.random() * 4)],
              gameState: 'showing',
              turnIndex: 0
            });
          }
        }, 1500);
        return () => clearTimeout(timeout);
      }
    }
  }, [room?.players, room?.gameState, room?.turnIndex, isHost, view, mounted]);

  const playSequence = async () => {
    setIsShowingSequence(true);
    setUserInput([]);
    
    for (let i = 0; i < room.sequence.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setActiveButton(room.sequence[i]);
      await new Promise(r => setTimeout(r, 300));
      setActiveButton(null);
    }
    
    setIsShowingSequence(false);
    if (isHost) {
      // Find first alive player
      const firstAlive = room.players.findIndex(p => p.alive);
      await updateDoc(doc(db, "rooms", room.id), { 
        gameState: 'input',
        turnIndex: firstAlive === -1 ? 0 : firstAlive
      });
    }
  };

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
      type: 'memory',
      status: 'lobby',
      gameState: 'waiting',
      sequence: [Math.floor(Math.random() * 4)],
      turnIndex: 0,
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
    if (!playerName || !roomCode) return setError('Enter name and 3-letter code!');
    const q = query(collection(db, "rooms"), where("code", "==", roomCode.toUpperCase()), where("status", "==", "lobby"));
    const snap = await getDocs(q);
    if (snap.empty) return setError('Room not found!');
    
    const roomDoc = snap.docs[0];
    const roomData = roomDoc.data();
    const playerIdx = roomData.players.length;
    const newPlayer = { name: playerName, alive: true, score: 0 };
    
    await updateDoc(doc(db, "rooms", roomDoc.id), {
      players: arrayUnion(newPlayer)
    });

    setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, newPlayer] });
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
    if (room.turnIndex !== myPlayerId) return; // NOT YOUR TURN

    const nextInput = [...userInput, id];
    setUserInput(nextInput);

    const isCorrect = id === room.sequence[nextInput.length - 1];
    const roomRef = doc(db, "rooms", room.id);

    if (!isCorrect) {
      const newPlayers = [...room.players];
      newPlayers[myPlayerId].alive = false;
      
      let nextTurn = room.turnIndex + 1;
      while (nextTurn < room.players.length && !newPlayers[nextTurn].alive) nextTurn++;
      
      await updateDoc(roomRef, { 
        players: newPlayers,
        turnIndex: nextTurn
      });
      return;
    }

    if (nextInput.length === room.sequence.length) {
      const newPlayers = [...room.players];
      newPlayers[myPlayerId].score += 1;
      
      let nextTurn = room.turnIndex + 1;
      while (nextTurn < room.players.length && !newPlayers[nextTurn].alive) nextTurn++;

      await updateDoc(roomRef, { 
        players: newPlayers,
        turnIndex: nextTurn
      });
    }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge" style={{ background: 'rgba(177, 74, 237, 0.1)', color: '#b14aed' }}>Memory Arena</div>
      <h1 className="game-title">🧠 MEMORY <span style={{ color: '#b14aed' }}>ARENA</span></h1>
      <p className="game-subtitle">Group memory challenge. Take turns repeating the sequence.</p>

      <div className="card" style={{ maxWidth: '450px', margin: '40px auto', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#555', fontSize: '11px', fontWeight: 800, textAlign: 'left', marginBottom: '8px', textTransform: 'uppercase' }}>
            Choose your nickname
          </label>
          <input 
            placeholder="E.G. PLAYER" 
            className="input-field"
            value={playerName}
            onChange={e => setPlayerName(e.target.value.toUpperCase())}
            maxLength={10}
            style={{ marginBottom: 0 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom} style={{ width: '100%', justifyContent: 'center' }}>
            Host New Arena
          </button>
          
          <div style={{ position: 'relative', margin: '10px 0' }}>
            <div style={{ borderTop: '1px solid #2a2a3e', width: '100%' }}></div>
            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-card)', padding: '0 12px', color: '#555', fontSize: '12px', fontWeight: 800 }}>OR</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              placeholder="ENTER ARENA CODE"
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
        <ChevronLeft size={16} /> Exit
      </button>
      <h2 style={{ fontSize: '28px' }}>Join Code: <span style={{ color: '#ffe600' }}>{room.code}</span></h2>
      <div className="card" style={{ margin: '32px 0' }}>
        {room.players.map((p, i) => (
          <div key={i} style={{ padding: '8px', color: i === 0 ? '#ffe600' : '#fff', fontWeight: 800 }}>
             {i === 0 ? '👑' : '🧠'} {p.name} {i === myPlayerId && "(YOU)"}
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
    const isMyTurn = room.turnIndex === myPlayerId;
    const currentTurnName = room.players[room.turnIndex]?.name || '...';

    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontWeight: 800 }}>
           <span style={{ color: '#b14aed' }}>Level {room.sequence.length}</span>
           <div style={{ 
             background: room.gameState === 'showing' ? 'rgba(255, 230, 0, 0.1)' : (isMyTurn ? 'rgba(0, 255, 148, 0.1)' : 'rgba(255,255,255,0.05)'),
             color: room.gameState === 'showing' ? '#ffe600' : (isMyTurn ? '#00ff94' : '#555'),
             padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 900,
             border: `1px solid ${room.gameState === 'showing' ? '#ffe60044' : (isMyTurn ? '#00ff9444' : '#333')}`,
           }}>
             {room.gameState === 'showing' ? '👀 WATCH SEQUENCE' : (isMyTurn ? '👆 YOUR TURN!' : `WAITING FOR ${currentTurnName}`)}
           </div>
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
                opacity: isAlive ? (isMyTurn || room.gameState === 'showing' ? 1 : 0.3) : 0.1,
                border: `4px solid ${c.color}`,
                cursor: isAlive && isMyTurn && !isShowingSequence ? 'pointer' : 'default',
                transition: 'all 0.1s'
              }}
            />
          ))}
          {room.gameState === 'showing' && (
            <div style={{ 
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', 
              pointerEvents: 'none', background: 'rgba(0,0,0,0.6)', padding: '10px 20px', 
              borderRadius: '12px', color: '#ffe600', fontWeight: 900, fontSize: '14px',
              border: '1px solid #ffe600'
            }}>
               WATCH...
            </div>
          )}
        </div>

        <div style={{ marginTop: '32px' }}>
           <div style={{ fontSize: '12px', color: '#555', marginBottom: '16px' }}>PLAYERS</div>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {room.players.map((p, i) => (
                <div key={i} style={{ 
                  padding: '4px 12px', borderRadius: '8px', 
                  background: p.alive ? (room.turnIndex === i ? 'rgba(0, 255, 148, 0.1)' : '#1a1a2e') : 'transparent',
                  color: p.alive ? (room.turnIndex === i ? '#00ff94' : '#fff') : '#444',
                  border: `1px solid ${p.alive ? (room.turnIndex === i ? '#00ff94' : '#1a1a2e') : '#222'}`,
                  fontSize: '13px', fontWeight: room.turnIndex === i ? 900 : 400
                }}>
                  {p.name} {p.alive ? `(Lvl ${p.score})` : '💀'}
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
            <HelpCircle size={16} color="#b14aed" /> How to Play
          </div>
          <div className="how-to-play-steps">
            <div className="how-to-play-step">
              <span className="how-to-play-number">1</span>
              <span>A sequence of colors will be shown. Watch it carefully!</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">2</span>
              <span>Players take turns repeating the sequence. You must wait for your turn.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">3</span>
              <span>The sequence grows every round. If you fail, you are eliminated! last survivor wins.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
