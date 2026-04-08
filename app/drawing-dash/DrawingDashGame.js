'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { Palette, Users, Home, ArrowRight, Trophy, Send, ChevronLeft, Eraser, HelpCircle, Timer } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import confetti from 'canvas-confetti';
import { sanitizeFreeText, sanitizePlayerName, sanitizeRoomCode, validatePlayerName } from '../lib/contentPolicy';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255, 45, 120, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const WORDS = [
  'APPLE', 'HOUSE', 'CAR', 'DRAGON', 'SUNFLOWER', 'PIZZA', 'CAT', 'ROBOT', 'TREE', 'PLANE', 'CAKE', 'FISH', 'BANANA', 'GUITAR', 'BOTTLE', 'SPIDER', 'ELEPHANT', 'DOG', 'BIRD', 'MOON', 'ASTRONAUT', 'MOUNTAIN', 'RIVER', 'PENGUIN', 'SNOWMAN', 'WIZARD',
  'ALIEN', 'ANCHOR', 'ANGEL', 'ANT', 'BACKPACK', 'BALLOON', 'BAT', 'BEAR', 'BEE', 'BELL', 'BICYCLE', 'BONE', 'BOOK', 'BOOT', 'BOW', 'BRIDGE', 'BROOM', 'BUTTERFLY', 'CANDLE', 'CASTLE', 'CHAIR', 'CHEESE', 'CHERRY', 'CHICKEN', 'CLOCK', 'CLOUD', 'COFFEE', 'COW', 'CRAB', 'CUP', 'DINOSAUR', 'DOLL', 'DONUT', 'DOOR', 'DUCK', 'EYE', 'FEATHER', 'FIRE', 'FLAG', 'FLOWER', 'FOOT', 'FORK', 'GHOST', 'GIRAFFE', 'GLASSES', 'GLOVE', 'GRAPES', 'HAMMER', 'HAND', 'HAT', 'HEART', 'HELICOPTER', 'HIPPO', 'ICE', 'IGLOO', 'ISLAND', 'JACKET', 'JELLYFISH', 'KEY', 'KITE', 'LADYBUG', 'LAMP', 'LEAF', 'LION', 'LIPS', 'LIZARD', 'LOLLIPOP', 'MAGNET', 'MAILBOX', 'MAP', 'MERMAID', 'MICROSCOPE', 'MONKEY', 'MUSHROOM', 'NAIL', 'NECKLACE', 'NOSE', 'OCTOPUS', 'ORANGE', 'OWL', 'PALM', 'PANTS', 'PENCIL', 'PHONE', 'PIG', 'PILLOW', 'PINEAPPLE', 'POCKET', 'POTATO', 'PUMPKIN', 'RABBIT', 'RAINBOW', 'RING', 'ROCKET', 'SAILBOAT', 'SANDWICH', 'SCARECOROW', 'SCISSORS', 'SHARK', 'SHELL', 'SHIRT', 'SHOE', 'SNAKE', 'SOCK', 'SOFA', 'SPIDER', 'SPOON', 'STAR', 'STETHOSCOPE', 'STRAWBERRY', 'SUN', 'SUNGLASSES', 'TABLE', 'TEAPOT', 'TELEPORTAL', 'TENT', 'TIGER', 'TOAST', 'TOOTH', 'TORCH', 'TRAIN', 'TRUCK', 'TURTLE', 'UMBRELLA', 'UNICORN', 'VAMPIRE', 'VASE', 'VIOLIN', 'VOLCANO', 'WATCH', 'WATERFALL', 'WHALE', 'WINDOW', 'WITCH', 'WORM', 'ZEBRA', 'ZOMBIE'
];

const DRAW_COLORS = ['#fff', '#ff2d78', '#00d4ff', '#ffe600', '#00ff94', '#b14aed'];

export default function DrawingDashGame() {
  const [view, setView] = useState('home'); 
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [guess, setGuess] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  
  const [color, setColor] = useState(DRAW_COLORS[2]);
  const [timeLeft, setTimeLeft] = useState(120);
  
  const canvasRef = useRef(null);
  const lastPoint = useRef(null);
  const lastRound = useRef(null);
  const lastDrawnCount = useRef(0);
  const linesBuffer = useRef([]);

  // Timer logic
  useEffect(() => {
    if (view === 'playing' && room?.gameState === 'drawing' && !room?.lastWinner) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1 && isHost) {
            // Time up! Host moves to next round
            handleTimeUp();
            return 0;
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [view, room?.gameState, room?.lastWinner, isHost]);

  const handleTimeUp = async () => {
    // Reveal word and advance
    const nextRound = room.round + 1;
    const isGameOver = nextRound > room.players.length;
    const nextDrawer = (room.drawerId + 1) % room.players.length;
    
    await updateDoc(doc(db, "rooms", room.id), {
      lastWinner: 'NO ONE',
      status: isGameOver ? 'results' : 'playing'
    });
    
    setTimeout(async () => {
      await updateDoc(doc(db, "rooms", room.id), {
        drawerId: nextDrawer,
        round: nextRound,
        gameState: 'choosing',
        lines: [],
        lastWinner: null
      });
    }, 3000);
  };

  function syncCanvas(lines) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (lines.length === 0 || lines.length < lastDrawnCount.current) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lastDrawnCount.current = 0;
      if (lines.length === 0) return;
    }

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;

    for (let i = lastDrawnCount.current; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      ctx.strokeStyle = line.c || '#00d4ff';
      ctx.beginPath();
      ctx.moveTo(line.x1 * canvas.width, line.y1 * canvas.height);
      ctx.lineTo(line.x2 * canvas.width, line.y2 * canvas.height);
      ctx.stroke();
    }
    lastDrawnCount.current = lines.length;
  }

  // Firestore Listener for Game State and Drawing
  useEffect(() => {
    if (!room?.id) return;
    const unsub = onSnapshot(doc(db, "rooms", room.id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        
        if (data.round !== lastRound.current) {
          lastRound.current = data.round;
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            lastDrawnCount.current = 0; 
          }
          setTimeLeft(120);
        }

        setRoom(prev => ({ ...prev, ...data }));
        
        if (data.status === 'playing' && view === 'lobby') setView('playing');
        if (data.status === 'results' && view !== 'results') setView('results');

        if (data.status === 'playing' && data.gameState === 'drawing') {
          const isDrawer = data.drawerId === myPlayerId;
          const isClear = !data.lines || data.lines.length === 0;
          if (!isDrawer || isClear) {
            syncCanvas(data.lines || []);
          }
        }
      }
    });
    return () => unsub();
  }, [room?.id, view, myPlayerId]);

  // Sync buffered lines to Firestore periodically
  useEffect(() => {
    if (view === 'playing' && room?.id && room?.drawerId === myPlayerId && room?.gameState === 'drawing') {
      const interval = setInterval(async () => {
        if (linesBuffer.current.length > 0) {
          const toSync = [...linesBuffer.current];
          linesBuffer.current = [];
          try {
            await updateDoc(doc(db, "rooms", room.id), {
              lines: arrayUnion(...toSync)
            });
          } catch (e) {
             console.error("Drawing Sync Error", e);
          }
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [view, room?.id, room?.drawerId, room?.gameState, myPlayerId]);

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  const handleCreateRoom = async () => {
    const cleanName = sanitizePlayerName(playerName);
    const nameError = validatePlayerName(cleanName);
    if (nameError) return setError(nameError);
    const code = generateRoomCode();
    
    // Choose 3 options
    const options = [];
    while(options.length < 3) {
       const w = WORDS[Math.floor(Math.random() * WORDS.length)];
       if (!options.includes(w)) options.push(w);
    }

    const newRoom = {
      code,
      type: 'drawing',
      status: 'lobby',
      drawerId: 0,
      round: 1,
      options,
      currentWord: '',
      gameState: 'choosing', // choosing -> drawing
      lines: [],
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
    
    await updateDoc(doc(db, "rooms", roomDoc.id), {
      players: arrayUnion({ name: cleanName, score: 0 })
    });

    setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, { name: cleanName, score: 0 }] });
    setMyPlayerId(playerIdx);
    setIsHost(false);
    setView('lobby');
  };

  const startGame = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'playing' });
  };

  const selectWord = async (word) => {
     if (room.drawerId !== myPlayerId) return;
     await updateDoc(doc(db, "rooms", room.id), {
        currentWord: word,
        gameState: 'drawing'
     });
     setTimeLeft(120);
  };

  const startDrawing = (e) => {
    if (room.drawerId !== myPlayerId || room.gameState !== 'drawing') return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    lastPoint.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    };
  };

  const draw = async (e) => {
    if (!isDrawing || room.drawerId !== myPlayerId || room.gameState !== 'drawing') return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const newLine = { x1: lastPoint.current.x, y1: lastPoint.current.y, x2: x, y2: y, c: color };
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(newLine.x1 * canvasRef.current.width, newLine.y1 * canvasRef.current.height);
    ctx.lineTo(newLine.x2 * canvasRef.current.width, newLine.y2 * canvasRef.current.height);
    ctx.stroke();

    lastPoint.current = { x, y };
    linesBuffer.current.push(newLine);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = async () => {
    if (room.drawerId !== myPlayerId) return;
    await updateDoc(doc(db, "rooms", room.id), { lines: [] });
  };

  const handleGuess = async () => {
    if (!guess.trim() || room.lastWinner || room.gameState !== 'drawing') return;
    
    if (guess.toUpperCase() === room.currentWord) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00d4ff', '#ff2d78', '#ffe600']
      });

      setGuess('CORRECT! ✨');
      
      const newPlayers = [...room.players];
      newPlayers[myPlayerId].score += 10;
      newPlayers[room.drawerId].score += 5;

      const nextRound = room.round + 1;
      const isGameOver = nextRound > room.players.length; 
      const nextDrawer = (room.drawerId + 1) % room.players.length;
      
      const options = [];
      while(options.length < 3) {
         const w = WORDS[Math.floor(Math.random() * WORDS.length)];
         if (!options.includes(w)) options.push(w);
      }

      await updateDoc(doc(db, "rooms", room.id), {
        players: newPlayers,
        lastWinner: sanitizePlayerName(playerName),
        status: isGameOver ? 'results' : 'playing'
      });

      setTimeout(async () => {
        if (!isGameOver) {
          await updateDoc(doc(db, "rooms", room.id), {
            drawerId: nextDrawer,
            round: nextRound,
            options,
            gameState: 'choosing',
            lines: [],
            lastWinner: null
          });
        }
        setGuess('');
      }, 3000); // 3 seconds to see who won before starting choice
    } else {
      setGuess('');
    }
  };

  const retryGame = async () => {
     if (isHost) {
        const nextDrawer = Math.floor(Math.random() * room.players.length);
        const resetPlayers = room.players.map(p => ({ ...p, score: 0 }));
        
        const options = [];
        while(options.length < 3) {
           const w = WORDS[Math.floor(Math.random() * WORDS.length)];
           if (!options.includes(w)) options.push(w);
        }

        await updateDoc(doc(db, "rooms", room.id), {
           drawerId: nextDrawer,
           round: 1,
           options,
           gameState: 'choosing',
           lines: [],
           lastWinner: null,
           status: 'playing',
           players: resetPlayers
        });
     }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge" style={{ background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff' }}>Drawing Party</div>
      <h1 className="game-title">🎨 DRAWING <span style={{ color: '#00d4ff' }}>DASH</span></h1>
      <p className="game-subtitle">One player draws, everyone guesses. Instant multiplayer fun!</p>

      <div className="card" style={{ maxWidth: '450px', margin: '40px auto', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#555', fontSize: '11px', fontWeight: 800, textAlign: 'left', marginBottom: '8px', textTransform: 'uppercase' }}>
            Choose your nickname
          </label>
          <input 
            placeholder="E.G. PICASSO" 
            className="input-field"
            value={playerName}
            onChange={e => setPlayerName(sanitizePlayerName(e.target.value))}
            maxLength={12}
            style={{ marginBottom: 0 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom} style={{ width: '100%', justifyContent: 'center' }}>
            Host New Dash
          </button>
          
          <div style={{ position: 'relative', margin: '10px 0' }}>
            <div style={{ borderTop: '1px solid #2a2a3e', width: '100%' }}></div>
            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-card)', padding: '0 12px', color: '#555', fontSize: '12px', fontWeight: 800 }}>OR</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              placeholder="ENTER DASH CODE"
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
    const currentDrawerName = room.players[room.drawerId]?.name;

    if (room.gameState === 'choosing') {
       return (
         <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
           <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#00d4ff' }}>ROUND {room.round} / {room.players.length}</h2>
           <p style={{ fontSize: '18px', marginBottom: '30px' }}>
              <span style={{ fontWeight: 800, color: '#ffe600' }}>{currentDrawerName}</span> is choosing a word...
           </p>
           {isDrawer && (
             <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <p style={{ marginBottom: '16px', color: '#555', fontWeight: 800 }}>CHOOSE A WORD TO DRAW</p>
                <div style={{ display: 'grid', gap: '10px' }}>
                   {room.options?.map((opt, i) => (
                      <button key={i} className="btn-outline" onClick={() => selectWord(opt)}>
                         {opt}
                      </button>
                   ))}
                </div>
             </div>
           )}
         </div>
       );
    }

    return (
      <div className="game-container animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center', background: '#13131f', padding: '10px 20px', borderRadius: '12px' }}>
           <div style={{ fontSize: '14px', fontWeight: 800 }}>
              ?? Drawer: <span style={{ color: '#ffe600' }}>{currentDrawerName}</span>
           </div>
           
           <div style={{ color: timeLeft < 30 ? '#ff2d78' : '#00d4ff', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
             <Timer size={18} /> {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
           </div>

           {isDrawer ? (
             <div style={{ background: '#00d4ff15', color: '#00d4ff', padding: '6px 14px', borderRadius: '8px', fontWeight: 900 }}>
                WORD: {room.currentWord}
             </div>
           ) : (
             room.lastWinner && (
               <div className="animate-pulse" style={{ background: 'rgba(0, 255, 148, 0.2)', color: '#00ff94', padding: '6px 14px', borderRadius: '8px', fontWeight: 900 }}>
                  ✨ {room.lastWinner === 'NO ONE' ? 'TIME UP!' : `${room.lastWinner} GUESSED IT!`}
               </div>
             )
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
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const mouseEvent = { clientX: touch.clientX, clientY: touch.clientY };
              startDrawing(mouseEvent);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const mouseEvent = { clientX: touch.clientX, clientY: touch.clientY };
              draw(mouseEvent);
            }}
            onTouchEnd={stopDrawing}
            style={{ 
              width: '100%', 
              background: '#0a0a0f', 
              borderRadius: '20px', 
              border: '2px solid #1a1a2e',
              cursor: isDrawer && room.gameState === 'drawing' ? 'cell' : 'default',
              touchAction: 'none'
            }}
          />
          {isDrawer && room.gameState === 'drawing' && (
            <>
              <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '12px' }}>
                 {DRAW_COLORS.map(c => (
                    <div 
                      key={c} 
                      onClick={() => setColor(c)}
                      style={{ 
                         width: 24, height: 24, borderRadius: '50%', background: c, cursor: 'pointer',
                         border: color === c ? '3px solid #fff' : '2px solid transparent',
                         outline: color === c ? '2px solid #00d4ff' : 'none'
                      }}
                    />
                 ))}
              </div>
              <button 
                className="btn-outline" 
                onClick={clearCanvas}
                style={{ position: 'absolute', top: '10px', right: '10px', padding: '8px 12px', background: 'rgba(0,0,0,0.5)' }}
              >
                <Eraser size={16} /> Clear
              </button>
            </>
          )}

          {room.lastWinner && (
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(10,10,15, 0.9)', padding: '30px', borderRadius: '20px', border: '2px solid #00d4ff', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#555', fontWeight: 800, marginBottom: '8px' }}>THE WORD WAS</p>
                <h2 style={{ fontSize: '32px', color: '#ffe600', marginBottom: '16px' }}>{room.currentWord}</h2>
                <p style={{ fontSize: '16px', color: '#00ff94', fontWeight: 800 }}>
                   {room.lastWinner === 'NO ONE' ? 'NO ONE GUESSED IT' : `${room.lastWinner} EARNED POINTS!`}
                </p>
             </div>
          )}
        </div>

        <div style={{ marginTop: '24px' }}>
          {!isDrawer && room.gameState === 'drawing' ? (
            <div style={{ display: 'flex', gap: '8px' }}>
               <input 
                 className="input-field"
                 placeholder="TYPE YOUR GUESS..."
                 value={guess}
                 onChange={e => setGuess(sanitizeFreeText(e.target.value.toUpperCase(), 40))}
                 onKeyDown={e => e.key === 'Enter' && handleGuess()}
               />
               <button className="btn-primary" onClick={handleGuess}>Guess</button>
            </div>
          ) : (
            isDrawer && room.gameState === 'drawing' && (
              <div style={{ color: '#555', fontSize: '13px', textAlign: 'center', fontWeight: 800 }}>
                 DO NOT WRITE THE WORD! JUST DRAW! 🎨
              </div>
            )
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '24px', justifyContent: 'center' }}>
           {room.players.map((p, i) => (
             <div key={i} style={{ fontSize: '12px', fontWeight: 800, background: '#13131f', padding: '6px 14px', borderRadius: '12px', border: i === room.drawerId ? '1px solid #00d4ff' : '1px solid transparent' }}>
                {p.name}: <span style={{ color: '#00ff94' }}>{p.score}</span>
             </div>
           ))}
        </div>

        <div style={{ marginTop: '24px' }}>
          <AdBanner format="horizontal" />
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score);
    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</h2>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#ffe600' }}>GAME OVER</h2>
        <div className="card" style={{ margin: '32px auto', maxWidth: '400px' }}>
          <div style={{ color: '#555', fontSize: '11px', fontWeight: 800, marginBottom: '12px' }}>FINAL SCORES</div>
          {sortedPlayers.map((p, i) => (
            <div key={i} style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', borderBottom: i < sortedPlayers.length - 1 ? '1px solid #1a1a2e' : 'none' }}>
              <span style={{ fontWeight: 800 }}>{i === 0 ? '👑' : `#${i+1}`} {p.name}</span>
              <span style={{ color: '#00ff94', fontWeight: 800 }}>{p.score} PTS</span>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '32px' }}>
           <button className="btn-primary" onClick={retryGame}>
              {isHost ? 'Play Again' : 'Waiting for host...'}
           </button>
           <button className="btn-outline" onClick={() => window.location.reload()}>
              Exit
           </button>
        </div>

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
            <HelpCircle size={16} color="#00d4ff" /> How to Play
          </div>
          <div className="how-to-play-steps">
            <div className="how-to-play-step">
              <span className="how-to-play-number">1</span>
              <span>Join a room and wait for the host to start. Each round, one player is chosen as the Drawer.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">2</span>
              <span>The Drawer picks a word from 3 options and draws it using multiple colors!</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">3</span>
              <span>Guessers have 2 minutes to type the correct word. The fastest Guesser and the Drawer earn points!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
