'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, setDoc, updateDoc, onSnapshot, getDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp 
} from 'firebase/firestore';
import { MessageSquare, Users, Home, ArrowRight, Trophy, Vote, Send, ChevronLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import { sanitizeFreeText, sanitizePlayerName, sanitizeRoomCode, validateFreeText, validatePlayerName } from '../lib/contentPolicy';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '20%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(177, 74, 237, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const PROMPTS = [
  "If your pet could talk, what would be its catchphrase?",
  "A rejected name for a new flavor of ice cream...",
  "What ghosts do when they're bored...",
  "The weirdest thing to find in your sandwich...",
  "If animals could talk, which one would be the rudest?",
  "A terrible superpower for a superhero to have...",
  "The real reason aliens won't visit Earth...",
  "A funny excuse for not doing your homework...",
  "If you had to change your name to a food, what would it be?",
  "The worst thing to bring to a sleepover...",
  "A secret hidden in the school cafeteria...",
  "What do teachers actually do in the teachers' lounge?",
  "If you were a mad scientist, what would you invent?",
  "The title of a movie about your average Tuesday...",
  "A strange rule you would make if you were President of the World...",
  "What dogs are really thinking when they stare at you...",
  "If vegetables came alive, which one would be the villain?",
  "The worst flavor for toothpaste...",
  "What aliens think when they see humans dancing...",
  "If you could combine two animals, what would you make?",
  "The most useless object you own that you refuse to throw away...",
  "A warning label that should be on every human being...",
  "What would be the worst thing to say during a first date?",
  "The real reason dinosaurs went extinct (wrong answers only)...",
  "If you were a professional wrestler, what would your entrance music be?",
  "A product that would be much better if it were edible...",
  "What do you think clouds are actually made of?",
  "The weirdest thing you could say to a stranger in an elevator...",
  "If you could have a conversation with any object, what would it be?",
  "The primary ingredient in a potion that makes you invisible...",
  "What historical figure would be the most annoying to have as a roommate?",
  "A job that sounds fun but is actually terrible...",
  "If your life was a video game, what would be the final boss?",
  "The first thing you would do if you woke up with three arms...",
  "A smell that is surprisingly good...",
  "The worst possible theme for a child's birthday party...",
  "If you could only speak in song lyrics, which artist would you choose?",
  "What happens to all the socks that go missing in the dryer?",
  "If you were a ghost, who would you spend your time haunting?",
  "A rule that you would implement in your own private kingdom...",
  "The most embarrassing thing that could happen at a high school graduation...",
  "If you could change the color of the sky, what would it be?",
  "What's the real reason cats knock things off tables?",
  "A talent that is impressive but ultimately useless...",
  "If you could live in any fictional universe, where would it be?",
  "The worst advice you've ever received...",
  "What would be the most inconvenient time to lose your voice?",
  "A secret talent you wish you had...",
  "If you were a superhero, who would be your sidekick?",
  "The most ridiculous thing you've ever done for a dare...",
  "What do you think is at the bottom of the deepest part of the ocean?",
  "If you could travel back in time, what's the one thing you'd tell your younger self?",
  "The strangest dream you've ever had...",
  "If you could have any animal as a pet (regardless of logistics), what would it be?",
  "What would you do if you were the last person on Earth for a day?",
  "A fashion trend that you absolutely hate...",
  "If you could only eat one meal for the rest of your life, what would it be?",
  "What's the most unusual gift you've ever received?",
  "If you could have any superpower, but it only worked on Tuesdays, what would it be?",
  "What's the funniest thing that's ever happened to you in public?",
  "The main character of a movie about a talking toaster...",
  "A slogan for a company that sells nothing but bad ideas...",
  "What would be the worst thing to find in your birthday cake?",
  "The title of a book about your most awkward moments...",
  "If you could turn any object into a mode of transportation, what would it be?",
  "What do you think birds are actually discussing?",
  "The most ridiculous excuse for being late to work...",
  "A new sport that involves common household items...",
  "What would you do if you found a portal to another dimension in your closet?",
  "The worst thing to say to someone who just won the lottery...",
  "If you could create a new holiday, what would it be and how would it be celebrated?",
  "What's the strangest thing you've ever seen at a grocery store?",
  "A piece of technology that should have never been invented...",
  "What would be the first thing you'd do if you could fly?",
  "The most unusual food combination you secretly enjoy...",
  "If you could have dinner with three people (dead or alive), who would they be?",
  "What do you think is the meaning of life (wrong answers only)?",
  "A reason why we should all start wearing capes again...",
  "What would happen if everyone on Earth decided to jump at the same time?",
  "The most absurd thing you've ever Googled...",
  "If you could change one thing about the human body, what would it be?",
  "What's the most unexpected thing you've ever found in a thrift store?",
  "A new law that would make the world a lot more interesting...",
  "What would be the first thing you'd buy with a billion dollars (that isn't a house or car)?",
];

export default function PollPartyGame() {
  const [view, setView] = useState('home'); 
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [myAnswer, setMyAnswer] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!room?.id) return;
    const unsub = onSnapshot(doc(db, "rooms", room.id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRoom(prev => ({ ...prev, ...data }));
        
        if (data.status === 'answering' && view !== 'playing') setView('playing');
        if (data.status === 'voting' && view !== 'voting') setView('voting');
        if (data.status === 'results' && view !== 'results') setView('results');
      }
    });
    return () => unsub();
  }, [room?.id, view]);

  // Host listener for voting and answering
  useEffect(() => {
    if (!room || !isHost) return;

    if (room.status === 'answering') {
      const allDone = room.players.every(p => p.answer !== null);
      if (allDone) {
        const timer = setTimeout(async () => {
          await updateDoc(doc(db, "rooms", room.id), { status: 'voting' });
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else if (room.status === 'voting') {
      const voteCount = room.players.reduce((acc, p) => acc + (p.votes || 0), 0);
      if (voteCount >= room.players.length) {
         const timer = setTimeout(async () => {
           await updateDoc(doc(db, "rooms", room.id), { status: 'results' });
         }, 2000);
         return () => clearTimeout(timer);
      }
    }
  }, [room?.players, room?.status, isHost]);

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
      type: 'pollparty',
      status: 'lobby',
      currentPrompt: PROMPTS[Math.floor(Math.random() * PROMPTS.length)],
      players: [{ name: cleanName, answer: null, score: 0, votes: 0 }],
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
    if (nameError || cleanCode.length !== 3) return setError(nameError || 'Enter name and 3-letter code!');
    const q = query(collection(db, "rooms"), where("code", "==", cleanCode), where("status", "==", "lobby"));
    const snap = await getDocs(q);
    if (snap.empty) return setError('Room not found!');
    
    const roomDoc = snap.docs[0];
    const roomData = roomDoc.data();
    const playerIdx = roomData.players.length;
    
    await updateDoc(doc(db, "rooms", roomDoc.id), {
      players: arrayUnion({ name: cleanName, answer: null, score: 0, votes: 0 })
    });

    setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, { name: cleanName, answer: null, score: 0, votes: 0 }] });
    setMyPlayerId(playerIdx);
    setIsHost(false);
    setView('lobby');
  };

  const startParty = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'answering' });
  };

  const submitAnswer = async () => {
    const cleanAnswer = sanitizeFreeText(myAnswer, 100);
    const answerError = validateFreeText(cleanAnswer);
    if (answerError) return setError(answerError);
    const newPlayers = [...room.players];
    newPlayers[myPlayerId].answer = cleanAnswer;
    await updateDoc(doc(db, "rooms", room.id), { players: newPlayers });
    setError('');
  };

  const castVote = async (targetId) => {
    if (hasVoted || targetId === myPlayerId) return;
    setHasVoted(true);
    
    const newPlayers = [...room.players];
    newPlayers[targetId].votes += 1;
    newPlayers[targetId].score += 10;
    await updateDoc(doc(db, "rooms", room.id), { players: newPlayers });
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#ff6b35' }}>Vote Party</div>
      <h1 className="game-title">🗳️ POLL <span style={{ color: '#ff6b35' }}>PARTY</span></h1>
      <p className="game-subtitle">Answer prompts and vote for the funniest vibe.</p>

      <div className="card" style={{ maxWidth: '450px', margin: '40px auto', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#555', fontSize: '11px', fontWeight: 800, textAlign: 'left', marginBottom: '8px', textTransform: 'uppercase' }}>
            Choose your nickname
          </label>
          <input 
            placeholder="E.G. JOKER" 
            className="input-field"
            value={playerName}
            onChange={e => setPlayerName(sanitizePlayerName(e.target.value))}
            maxLength={12}
            style={{ marginBottom: 0 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <button className="btn-secondary" onClick={handleCreateRoom} style={{ width: '100%', justifyContent: 'center' }}>
            Host New Party
          </button>
          
          <div style={{ position: 'relative', margin: '10px 0' }}>
            <div style={{ borderTop: '1px solid #2a2a3e', width: '100%' }}></div>
            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-card)', padding: '0 12px', color: '#555', fontSize: '12px', fontWeight: 800 }}>OR</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              placeholder="ENTER 3-LETTER CODE"
              className="input-field"
              value={roomCode}
              onChange={e => setRoomCode(sanitizeRoomCode(e.target.value))}
              style={{ fontSize: '14px', marginBottom: 0, flex: 1 }}
              maxLength={3}
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
              onChange={e => setMyAnswer(sanitizeFreeText(e.target.value, 100))}
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

      <div className="game-container" style={{ paddingTop: 0, marginTop: '-20px' }}>
        <div className="how-to-play">
          <div className="how-to-play-title">
            <HelpCircle size={16} color="#ff6b35" /> How to Play
          </div>
          <div className="how-to-play-steps">
            <div className="how-to-play-step">
              <span className="how-to-play-number">1</span>
              <span>Everyone in the room is given the same funny or weird prompt.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">2</span>
              <span>Write your most creative or hilarious answer. Try to match the vibe of the group!</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">3</span>
              <span>All answers are displayed anonymously. Vote for your favorite (you can&apos;t vote for yourself). Most votes wins!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
