'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { Palette, Users, Home, ArrowRight, Trophy, Send, ChevronLeft, Eraser } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255, 45, 120, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const WORDS = ['APPLE', 'HOUSE', 'CAR', 'DRAGON', 'SUNFLOWER', 'PIZZA', 'CAT', 'ROBOT', 'TREE', 'PLANE', 'CAKE', 'FISH', 'BANANA', 'GUITAR', 'BOTTLE', 'SPIDER'];

export default function DrawingDashGame() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home'); 
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [guess, setGuess] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  
  const canvasRef = useRef(null);
  const lastPoint = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // Firestore Listener for Game State and Drawing
  useEffect(() => {
    if (!mounted || !room?.id) return;
    const unsub = onSnapshot(doc(db, "rooms", room.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setRoom(prev => ({ ...prev, ...data }));
        
        if (data.status === 'playing' && view === 'lobby') setView('playing');
        if (data.status === 'results' && view !== 'results') setView('results');

        // Draw incoming lines if I'm not the drawer
        if (data.status === 'playing' && data.drawerId !== myPlayerId) {
          syncCanvas(data.lines || []);
        }
      }
    });
    return () => unsub();
  }, [room?.id, view, mounted, myPlayerId]);

  const syncCanvas = (lines) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#fff';

    lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.x1 * canvas.width, line.y1 * canvas.height);
      ctx.lineTo(line.x2 * canvas.width, line.y2 * canvas.height);
      ctx.stroke();
    });
  };

  if (!mounted) return <div className="game-container" />;

  const generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleCreateRoom = async () => {
    if (!playerName) return setError('Enter a nickname!');
    const code = generateRoomCode();
    const newRoom = {
      code,
      type: 'drawing',
      status: 'lobby',
      drawerId: 0,
      round: 1,
      currentWord: WORDS[Math.floor(Math.random() * WORDS.length)],
      lines: [],
      players: [{ name: playerName, score: 0 }],
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
      players: arrayUnion({ name: playerName, score: 0 })
    });

    setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, { name: playerName, score: 0 }] });
    setMyPlayerId(playerIdx);
    setIsHost(false);
    setView('lobby');
  };

  const startGame = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'playing' });
  };

  const startDrawing = (e) => {
    if (room.drawerId !== myPlayerId) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    lastPoint.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    };
  };

  const draw = async (e) => {
    if (!isDrawing || room.drawerId !== myPlayerId) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const newLine = { x1: lastPoint.current.x, y1: lastPoint.current.y, x2: x, y2: y };
    
    // Local Draw for Speed
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(newLine.x1 * canvasRef.current.width, newLine.y1 * canvasRef.current.height);
    ctx.lineTo(newLine.x2 * canvasRef.current.width, newLine.y2 * canvasRef.current.height);
    ctx.stroke();

    lastPoint.current = { x, y };
    
    // Throttled sync to Firestore
    await updateDoc(doc(db, "rooms", room.id), {
      lines: arrayUnion(newLine)
    });
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = async () => {
    if (room.drawerId !== myPlayerId) return;
    await updateDoc(doc(db, "rooms", room.id), { lines: [] });
  };

  const handleGuess = async () => {
    if (guess.toUpperCase() === room.currentWord) {
      const newPlayers = [...room.players];
      newPlayers[myPlayerId].score += 10;
      newPlayers[room.drawerId].score += 5;

      const nextRound = room.round + 1;
      const isGameOver = nextRound > (room.players.length * 2); // 2 rounds per player
      const nextDrawer = (room.drawerId + 1) % room.players.length;
      const nextWord = WORDS[Math.floor(Math.random() * WORDS.length)];

      await updateDoc(doc(db, "rooms", room.id), {
        players: newPlayers,
        drawerId: nextDrawer,
        round: nextRound,
        currentWord: nextWord,
        lines: [],
        status: isGameOver ? 'results' : 'playing'
      });
      setGuess('');
    } else {
      setGuess('');
    }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <Link href="/" className="btn-outline" style={{ display: 'inline-flex', gap: '8px', border: 'none', marginBottom: '24px' }}>
        <Home size={18} /> Back to VibeMeNow
      </Link>
      <div className="game-badge" style={{ background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff' }}>Drawing Party</div>
      <h1 className="game-title">🎨 DRAWING <span style={{ color: '#00d4ff' }}>DASH</span></h1>
      <p className="game-subtitle">One player draws, everyone guesses. Instant multiplayer fun!</p>

      <div style={{ maxWidth: '400px', margin: '40px auto' }}>
        <input 
          placeholder="NICKNAME" 
          className="input-field"
          value={playerName}
          onChange={e => setPlayerName(e.target.value.toUpperCase())}
          maxLength={10}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom}>Host Lobby</button>
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
         <div style={{ color: '#555', fontSize: '11px', fontWeight: 800, marginBottom: '12px' }}>PLAYERS</div>
         {room.players.map((p, i) => <div key={i} style={{ padding: '4px' }}>{p.name}</div>)}
      </div>
      {isHost && (
        <button className="btn-secondary" onClick={startGame} disabled={room.players.length < 2}>
           START MATCH <ArrowRight size={18} />
        </button>
      )}
    </div>
  );

  const renderPlaying = () => {
    const isDrawer = room.drawerId === myPlayerId;
    return (
      <div className="game-container animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
           <div style={{ fontSize: '12px' }}>
              Drawer: <span style={{ color: '#ffe600', fontWeight: 800 }}>{room.players[room.drawerId].name}</span>
           </div>
           {isDrawer && (
             <div style={{ background: '#00d4ff15', color: '#00d4ff', padding: '4px 12px', borderRadius: '8px', fontWeight: 800 }}>
                SECRET WORD: {room.currentWord}
             </div>
           )}
        </div>

        <div style={{ position: 'relative' }}>
          <canvas 
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ 
              width: '100%', 
              background: '#0a0a0f', 
              borderRadius: '20px', 
              border: '2px solid #1a1a2e',
              cursor: isDrawer ? 'cell' : 'default',
              touchAction: 'none'
            }}
          />
          {isDrawer && (
            <button 
              className="btn-outline" 
              onClick={clearCanvas}
              style={{ position: 'absolute', top: '10px', right: '10px', padding: '8px' }}
            >
              <Eraser size={18} /> Clear
            </button>
          )}
        </div>
        <div style={{ marginTop: '24px' }}>
          <AdBanner format="horizontal" />
        </div>

        <div style={{ marginTop: '24px' }}>
          {!isDrawer ? (
            <div style={{ display: 'flex', gap: '8px' }}>
               <input 
                 className="input-field"
                 placeholder="TYPE YOUR GUESS..."
                 value={guess}
                 onChange={e => setGuess(e.target.value.toUpperCase())}
                 onKeyDown={e => e.key === 'Enter' && handleGuess()}
               />
               <button className="btn-primary" onClick={handleGuess}>Guess</button>
            </div>
          ) : (
            <div style={{ color: '#555', fontSize: '13px', textAlign: 'center' }}>
               Drawing for the group... make it good! 🎨
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px', justifyContent: 'center' }}>
           {room.players.map((p, i) => (
             <div key={i} style={{ fontSize: '11px', background: '#13131f', padding: '4px 10px', borderRadius: '12px' }}>
                {p.name}: {p.score}
             </div>
           ))}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score);
    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>🏆 RESULTS 🏆</h2>
        <div className="card" style={{ margin: '32px auto', maxWidth: '400px' }}>
          <div style={{ color: '#555', fontSize: '11px', fontWeight: 800, marginBottom: '12px' }}>FINAL SCORES</div>
          {sortedPlayers.map((p, i) => (
            <div key={i} style={{ padding: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span>{p.name}</span>
              <span style={{ color: '#ffe600', fontWeight: 800 }}>{p.score}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: '32px' }} onClick={() => window.location.reload()}>
           Next Match
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
