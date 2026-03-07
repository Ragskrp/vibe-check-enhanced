'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { MessageSquare, Users, Home, ArrowRight, Trophy, Vote, Send, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '20%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(177, 74, 237, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const PROMPTS = [
  "The worst thing to say during a first date...",
  "A rejected name for a new planet...",
  "What ghosts do when they're bored...",
  "The weirdest thing to find in your sandwich...",
  "If animals could talk, which one would be the rudest?",
  "A bad superpower for a superhero to have...",
  "The real reason aliens won't visit Earth...",
  "A generic name for a really boring movie..."
];

export default function PollPartyGame() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home'); 
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [myAnswer, setMyAnswer] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !room?.id) return;
    const unsub = onSnapshot(doc(db, "rooms", room.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setRoom(prev => ({ ...prev, ...data }));
        
        if (data.status === 'answering' && view !== 'playing') setView('playing');
        if (data.status === 'voting' && view !== 'voting') setView('voting');
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
      type: 'pollparty',
      status: 'lobby',
      currentPrompt: PROMPTS[Math.floor(Math.random() * PROMPTS.length)],
      players: [{ name: playerName, answer: null, score: 0, votes: 0 }],
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
      players: arrayUnion({ name: playerName, answer: null, score: 0, votes: 0 })
    });

    setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, { name: playerName, answer: null, score: 0, votes: 0 }] });
    setMyPlayerId(playerIdx);
    setIsHost(false);
    setView('lobby');
  };

  const startParty = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'answering' });
  };

  const submitAnswer = async () => {
    if (!myAnswer) return;
    const newPlayers = [...room.players];
    newPlayers[myPlayerId].answer = myAnswer;
    await updateDoc(doc(db, "rooms", room.id), { players: newPlayers });

    // If host, check if everyone is done
    const allDone = newPlayers.every(p => p.answer !== null);
    if (allDone && isHost) {
      setTimeout(async () => {
        await updateDoc(doc(db, "rooms", room.id), { status: 'voting' });
      }, 1000);
    }
  };

  const castVote = async (targetId) => {
    if (hasVoted || targetId === myPlayerId) return;
    setHasVoted(true);
    
    const newPlayers = [...room.players];
    newPlayers[targetId].votes += 1;
    newPlayers[targetId].score += 10;
    await updateDoc(doc(db, "rooms", room.id), { players: newPlayers });

    // If host, check for everyone voted
    const voteCount = newPlayers.reduce((acc, p) => acc + p.votes, 0);
    if (voteCount >= room.players.length && isHost) {
       setTimeout(async () => {
         await updateDoc(doc(db, "rooms", room.id), { status: 'results' });
       }, 2000);
    }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <Link href="/" className="btn-outline" style={{ display: 'inline-flex', gap: '8px', border: 'none', marginBottom: '24px' }}>
        <Home size={18} /> Back to VibeMeNow
      </Link>
      <div className="game-badge" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#ff6b35' }}>Vote Party</div>
      <h1 className="game-title">🗳️ POLL <span style={{ color: '#ff6b35' }}>PARTY</span></h1>
      <p className="game-subtitle">Answer prompts and vote for the funniest vibe.</p>

      <div style={{ maxWidth: '400px', margin: '40px auto' }}>
        <input 
          placeholder="NICKNAME" 
          className="input-field"
          value={playerName}
          onChange={e => setPlayerName(e.target.value.toUpperCase())}
          maxLength={10}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom}>Host Party</button>
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
      <h2 style={{ fontSize: '28px' }}>Room Code: <span style={{ color: '#ffe600' }}>{room.code}</span></h2>
      <div className="card" style={{ margin: '32px 0' }}>
         <div style={{ color: '#555', fontSize: '11px', fontWeight: 800, marginBottom: '12px' }}>IN THE ROOM</div>
         {room.players.map((p, i) => <div key={i} style={{ padding: '4px' }}>{p.name}</div>)}
      </div>
      {isHost && (
        <button className="btn-secondary" onClick={startParty} disabled={room.players.length < 2}>
           START PARTY <ArrowRight size={18} />
        </button>
      )}
    </div>
  );

  const renderPlaying = () => {
    const isDone = room.players[myPlayerId].answer !== null;
    return (
      <div className="game-container animate-fade-in">
        <div className="card" style={{ padding: '32px', textAlign: 'center', marginBottom: '32px' }}>
           <div style={{ fontSize: '12px', color: '#ff6b35', fontWeight: 800, marginBottom: '8px' }}>PROMPT</div>
           <h2 style={{ fontSize: '24px', color: '#fff' }}>&quot;{room.currentPrompt}&quot;</h2>
        </div>

        {isDone ? (
          <div style={{ textAlign: 'center' }}>
            <div className="loading-vibe" style={{ fontSize: '16px' }}>Waiting for other vibes...</div>
            <div style={{ color: '#555', marginTop: '10px' }}>
              {room.players.filter(p => p.answer !== null).length} / {room.players.length} answered
            </div>
          </div>
        ) : (
          <div>
            <textarea 
              className="input-field"
              placeholder="Type your funniest answer..."
              value={myAnswer}
              onChange={e => setMyAnswer(e.target.value)}
              style={{ height: '120px', resize: 'none' }}
              maxLength={100}
            />
            <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={submitAnswer}>
              SUBMIT ANSWER <Send size={18} />
            </button>
          </div>
        )}
        <div style={{ marginTop: '32px' }}>
          <AdBanner format="horizontal" />
        </div>
      </div>
    );
  };

  const renderVoting = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div style={{ color: '#ff6b35', fontWeight: 800, fontSize: '14px', marginBottom: '8px' }}>THE PROMPT</div>
      <h2 style={{ fontSize: '20px', marginBottom: '32px' }}>&quot;{room.currentPrompt}&quot;</h2>

      <div style={{ display: 'grid', gap: '16px' }}>
        {room.players.map((p, i) => (
          <button 
            key={i} 
            className={`card ${hasVoted || i === myPlayerId ? 'disabled' : ''}`}
            onClick={() => castVote(i)}
            disabled={hasVoted || i === myPlayerId}
            style={{ 
              padding: '24px', 
              textAlign: 'center',
              border: hasVoted ? '1px solid #1a1a2e' : '1px solid #ff6b35',
              cursor: hasVoted || i === myPlayerId ? 'default' : 'pointer'
            }}
          >
            <div style={{ fontSize: '18px', color: '#fff', fontStyle: 'italic' }}>&quot;{p.answer}&quot;</div>
            {hasVoted && <div style={{ fontSize: '12px', color: '#555', marginTop: '8px' }}>— {p.name}</div>}
          </button>
        ))}
      </div>

      {hasVoted && (
        <div className="loading-vibe" style={{ marginTop: '32px' }}>Waiting for final votes...</div>
      )}
    </div>
  );

  const renderResults = () => {
    const sorted = [...room.players].sort((a,b) => b.score - a.score);
    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <h1 className="game-title">👑 Final Vibe Me Now</h1>
        <div className="card" style={{ marginTop: '24px', background: '#13131f' }}>
          {sorted.map((p, i) => (
            <div key={i} style={{ 
              display: 'flex', justifyContent: 'space-between', padding: '16px',
              borderBottom: i < sorted.length - 1 ? '1px solid #1a1a2e' : 'none',
              color: i === 0 ? '#ff6b35' : '#fff',
              fontWeight: i === 0 ? 800 : 400
            }}>
              <div style={{ textAlign: 'left' }}>
                <div>{i === 0 ? '🧠' : '👤'} {p.name}</div>
                <div style={{ fontSize: '11px', opacity: 0.5 }}>&quot;{p.answer}&quot;</div>
              </div>
              <div>{p.score} pts</div>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: '32px' }} onClick={() => window.location.reload()}>
          Next Party
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
      {view === 'voting' && renderVoting()}
      {view === 'results' && renderResults()}
    </>
  );
}
