'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Sparkles, HelpCircle, Trophy, RotateCcw, Lightbulb, ChevronRight, ChevronLeft, Zap, Users, Shield, ArrowRight, Share2, LogIn, PlusCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import AdBanner from '../components/AdBanner';
import GameEndScreen from '../components/GameEndScreen';
import { db } from '../lib/firebase';
import { 
  doc, onSnapshot, setDoc, updateDoc, 
  query, collection, where, getDocs, arrayUnion, serverTimestamp, getDoc 
} from 'firebase/firestore';
import { sanitizePlayerName, sanitizeRoomCode, validatePlayerName } from '../lib/contentPolicy';

const VOCAB_SETS = {
  geometry: {
    title: "Geometry",
    emoji: "📐",
    items: [
      { id: 1, term: "Radius", definition: "Distance from the center of a circle to any point on it", hint: "Think about halfway across a circle", emoji: "🔵" },
      { id: 2, term: "Polygon", definition: "A closed shape made of straight line segments", hint: "Triangles, squares, and hexagons are all examples", emoji: "🔷" },
      { id: 3, term: "Perpendicular", definition: "Two lines that meet at a 90° right angle", hint: "Like the corner of a book or screen", emoji: "📐" },
      { id: 4, term: "Symmetry", definition: "When one half mirrors the other half exactly", hint: "A butterfly's wings show this property", emoji: "🦋" },
      { id: 5, term: "Hypotenuse", definition: "The longest side of a right triangle, opposite the right angle", hint: "Pythagoras loved this side of the triangle", emoji: "📏" },
      { id: 6, term: "Vertex", definition: "The point where two or more edges or lines meet", hint: "The 'corner' of a shape", emoji: "⭐" }
    ]
  },
  science: {
    title: "Space & Physics",
    emoji: "🚀",
    items: [
      { id: 7, term: "Supernova", definition: "A brilliant, catastrophic explosion of a dying star", hint: "The most powerful explosion in space", emoji: "💥" },
      { id: 8, term: "Inertia", definition: "The tendency of an object to resist changes in its motion", hint: "Newton's First Law of Motion", emoji: "⚖️" },
      { id: 9, term: "Nebula", definition: "An interstellar cloud of dust, hydrogen, helium and other gases", hint: "Often called a 'stellar nursery'", emoji: "☁️" },
      { id: 10, term: "Entropy", definition: "The measure of disorder or randomness in a physical system", hint: "Chaos always increases over time", emoji: "🌪️" },
      { id: 11, term: "Photon", definition: "A particle representing a quantum of light", hint: "Light energy travels in these", emoji: "💡" },
      { id: 12, term: "Orbit", definition: "The curved path of a celestial object around a star or planet", hint: "What the moon does around Earth", emoji: "🪐" }
    ]
  },
  digital: {
    title: "Digital Vibes",
    emoji: "💻",
    items: [
      { id: 13, term: "Algorithm", definition: "A set of rules or steps to be followed in calculations", hint: "A recipe for solving a problem", emoji: "🔢" },
      { id: 14, term: "Blockchain", definition: "A secure, decentralized record of transactions", hint: "The tech behind Bitcoin", emoji: "⛓️" },
      { id: 15, term: "Metadata", definition: "Data that provides information about other data", hint: "Information like date, size, and author of a file", emoji: "🏷️" },
      { id: 16, term: "Protocol", definition: "A set of rules governing the exchange of data", hint: "Like HTTP or IP", emoji: "📜" },
      { id: 17, term: "Bandwidth", definition: "The maximum capacity of a communication channel", hint: "The speed of your internet data", emoji: "🌐" },
      { id: 18, term: "Encryption", definition: "The process of converting information into secret code", hint: "Keeps your messages private", emoji: "🔐" }
    ]
  },
  mythology: {
    title: "Mythology",
    emoji: "⚡",
    items: [
      { id: 19, term: "Pantheon", definition: "A particular set of all the gods of a religion or people", hint: "The 12 Olympians form one of these", emoji: "🏛️" },
      { id: 20, term: "Centaur", definition: "A creature with the upper body of a human and the lower body of a horse", hint: "Half-man, half-horse", emoji: "🏹" },
      { id: 21, term: "Miasma", definition: "A contagious power that has an independent life of its own", hint: "In Greek myth, it's a 'pollution' caused by a crime", emoji: "🌫️" },
      { id: 22, term: "Labyrinth", definition: "A complex irregular network of passages or paths", hint: "The Minotaur lived in one", emoji: "🌀" },
      { id: 23, term: "Oracle", definition: "A priestess acting as a medium through whom advice was sought from the gods", hint: "The one at Delphi is the most famous", emoji: "👁️‍🗨️" },
      { id: 24, term: "Chimera", definition: "A fire-breathing female monster with a lion's head, a goat's body, and a serpent's tail", hint: "A mythical hybrid beast", emoji: "🦁" }
    ]
  },
  nature: {
    title: "Nature & Wildlife",
    emoji: "🌿",
    items: [
      { id: 25, term: "Biodiversity", definition: "The variety of plant and animal life in a particular habitat", hint: "Think of a rich, diverse forest", emoji: "🌍" },
      { id: 26, term: "Endemic", definition: "A species found only in a specific geographic area", hint: "Like Kangaroos in Australia", emoji: "📍" },
      { id: 27, term: "Symbiosis", definition: "A close and long-term biological interaction between two different species", hint: "Clownfish and sea anemones show this", emoji: "🤝" },
      { id: 28, term: "Estuary", definition: "The tidal mouth of a large river, where the tide meets the stream", hint: "Where salt and fresh water mix", emoji: "🌊" },
      { id: 29, term: "Camouflage", definition: "The use of materials or coloration for concealment", hint: "Chameleons are masters of this", emoji: "🦗" },
      { id: 30, term: "Photosynthesis", definition: "The process by which plants use sunlight to synthesize nutrients", hint: "How plants make their own food", emoji: "☀️" }
    ]
  },
  ai: {
    title: "Tech & AI",
    emoji: "🤖",
    items: [
      { id: 31, term: "Neural Network", definition: "A computer system modeled on the human brain and nervous system", hint: "The 'brain' behind modern AI", emoji: "🧠" },
      { id: 32, term: "Parameters", definition: "The variables that an AI model learns from training data", hint: "LLMs like GPT-4 have trillions of these", emoji: "🎚️" },
      { id: 33, term: "Prompting", definition: "The act of giving instructions to an AI to get a specific output", hint: "What you do when you talk to a chatbot", emoji: "💬" },
      { id: 34, term: "Deepfake", definition: "Media that has been digitally manipulated to replace one person's likeness with another", hint: "AI-generated realistic fake videos", emoji: "🎭" },
      { id: 35, term: "Turing Test", definition: "A test of a machine's ability to exhibit intelligent behavior equivalent to a human", hint: "If you can't tell it's a machine, it passes", emoji: "👤" },
      { id: 36, term: "Hallucination", definition: "When an AI model generates confident but false or nonsensical information", hint: "When ChatGPT makes things up", emoji: "🌀" }
    ]
  },
  arts: {
    title: "Lit & Arts",
    emoji: "🎨",
    items: [
      { id: 37, term: "Metaphor", definition: "A figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable", hint: "Comparing two things without using 'like' or 'as'", emoji: "📖" },
      { id: 38, term: "Renaissance", definition: "The revival of European art and literature under the influence of classical models", hint: "Da Vinci and Michelangelo's era", emoji: "🏛️" },
      { id: 39, term: "Surrealism", definition: "A movement in art and literature that sought to release the creative potential of the unconscious mind", hint: "Think of Salvador Dali's melting clocks", emoji: "🎨" },
      { id: 40, term: "Sonnet", definition: "A poem of fourteen lines using any of a number of formal rhyme schemes", hint: "Shakespeare wrote 154 of these", emoji: "✍️" },
      { id: 41, term: "Palette", definition: "The range of colors used by a particular artist or in a particular work", hint: "What an artist holds to mix paints", emoji: "🎨" },
      { id: 42, term: "Aesthetics", definition: "A set of principles concerned with the nature and appreciation of beauty", hint: "The 'vibe' or visual style of something", emoji: "✨" }
    ]
  }
};

const COLORS = {
  border: { 0: "#ff2d78", 1: "#00d4ff", 2: "#ffe600", 3: "#00ff94", 4: "#b14aed", 5: "#ff923c" },
  bg: {
    0: "rgba(255, 45, 120, 0.1)", 1: "rgba(0, 212, 255, 0.1)", 2: "rgba(255, 230, 0, 0.1)",
    3: "rgba(0, 255, 148, 0.1)", 4: "rgba(177, 74, 237, 0.1)", 5: "rgba(255, 146, 60, 0.1)"
  }
};

function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function VocabGame() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState('menu'); // menu, solo, arena_setup, arena_lobby, arena_playing, arena_results
  const [currentSet, setCurrentSet] = useState('geometry');
  
  // Game State
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hints, setHints] = useState(3);
  const [activeHint, setActiveHint] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [shuffledItems, setShuffledItems] = useState({ terms: [], defs: [] });
  
  // Multiplayer State
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const currentData = VOCAB_SETS[currentSet].items;

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const initSoloGame = useCallback((topicKey = currentSet) => {
    const items = VOCAB_SETS[topicKey].items;
    setShuffledItems({ terms: shuffle(items), defs: shuffle(items) });
    setMatchedIds(new Set());
    setScore(0);
    setStreak(0);
    setHints(3);
    setSelectedTerm(null);
    setActiveHint(null);
    setFeedback(null);
    setMode('solo');
  }, [currentSet]);

  const handleTermSelect = (id) => {
    if (matchedIds.has(id)) return;
    setSelectedTerm(id);
    setActiveHint(null);
  };

  const handleDefSelect = async (id) => {
    if (!selectedTerm || matchedIds.has(id)) return;

    if (selectedTerm === id) {
      const newMatched = new Set(matchedIds);
      newMatched.add(id);
      setMatchedIds(newMatched);
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setSelectedTerm(null);
      setFeedback({ type: 'correct', text: '🎯 Nailed it!' });
      
      // Update multiplayer progress
      if (mode === 'arena_playing' && room?.id) {
        const roomRef = doc(db, "vocab_rooms", room.id);
        const docSnap = await getDoc(roomRef);
        if (docSnap.exists()) {
          const players = [...docSnap.data().players];
          players[myPlayerId] = { ...players[myPlayerId], progress: newMatched.size };
          
          const updateData = { players };
          if (newMatched.size === currentData.length && !docSnap.data().winner) {
            updateData.winner = playerName;
            updateData.status = 'results';
          }
          await updateDoc(roomRef, updateData);
        }
      }
      
      setTimeout(() => setFeedback(null), 1000);
    } else {
      setStreak(0);
      setFeedback({ type: 'error', text: '❌ Try again!' });
      setTimeout(() => setFeedback(null), 800);
    }
  };

  // MULTIPLAYER LOGIC
  const createArenaRoom = async () => {
    const cleanName = sanitizePlayerName(playerName);
    const nameError = validatePlayerName(cleanName);
    if (nameError) {
      setError(nameError);
      return;
    }
    try {
      const code = generateRoomCode();
      const newRoom = {
        code,
        topic: currentSet,
        status: 'lobby',
        players: [{ name: cleanName, progress: 0 }],
        winner: null,
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(db, "vocab_rooms", code), newRoom);
      setRoom({ id: code, ...newRoom });
      setMyPlayerId(0);
      setIsHost(true);
      setMode('arena_lobby');
    } catch (e) {
      setError('Failed to create room.');
    }
  };

  const joinArenaRoom = async () => {
    const cleanName = sanitizePlayerName(playerName);
    const cleanCode = sanitizeRoomCode(roomCode);
    const nameError = validatePlayerName(cleanName);
    if (nameError || cleanCode.length !== 3) {
      setError(nameError || 'Enter name and 3-letter code!');
      return;
    }
    try {
      const q = query(collection(db, "vocab_rooms"), where("code", "==", cleanCode));
      const snap = await getDocs(q);
      if (snap.empty) {
        setError('Room not found!');
        return;
      }
      const roomDoc = snap.docs[0];
      const data = roomDoc.data();
      if (data.status !== 'lobby') {
        setError('Game already started!');
        return;
      }
      const playerIdx = data.players.length;
      await updateDoc(doc(db, "vocab_rooms", roomDoc.id), {
        players: arrayUnion({ name: cleanName, progress: 0 })
      });
      setRoom({ id: roomDoc.id, ...data });
      setCurrentSet(data.topic);
      setMyPlayerId(playerIdx);
      setIsHost(false);
      setMode('arena_lobby');
    } catch (e) {
      setError('Failed to join.');
    }
  };

  useEffect(() => {
    if (!room?.id || !mounted) return;
    const unsub = onSnapshot(doc(db, "vocab_rooms", room.id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRoom(prev => ({ ...prev, ...data }));
        if (data.status === 'playing' && mode === 'arena_lobby') {
          const items = VOCAB_SETS[data.topic].items;
          setShuffledItems({ terms: shuffle(items), defs: shuffle(items) });
          setMatchedIds(new Set());
          setScore(0);
          setMode('arena_playing');
        }
        if (data.status === 'results' && mode === 'arena_playing') {
          setMode('arena_results');
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffe600', '#00d4ff', '#ff2d78']
          });
        }
      }
    });
    return () => unsub();
  }, [room?.id, mode, mounted]);

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  // RENDER MODES
  const renderMenu = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge">Match Puzzles</div>
      <h1 className="game-title" style={{ color: '#fbbf24' }}>🔠 Vocab Vibe</h1>
      <p className="game-subtitle">The ultimate brain-matching challenge. No login. Just vibes. ⚡</p>
      
      <div className="card" style={{ maxWidth: 450, margin: '0 auto', padding: '32px' }}>
        <h3 style={{ fontSize: 12, fontWeight: 800, color: '#555', textTransform: 'uppercase', marginBottom: 20 }}>Choose Your Play Mode</h3>
        
        <div style={{ display: 'grid', gap: 16 }}>
          <button onClick={() => setMode('solo_topic')} className="btn-primary" style={{ height: 64, justifyContent: 'center' }}>
             <Zap size={20} /> Solo Practice
          </button>
          
          <button 
            onClick={() => setMode('arena_setup')} 
            className="btn-secondary" 
            style={{ height: 64, justifyContent: 'center', background: 'linear-gradient(135deg, #00d4ff, #b14aed)' }}
          >
             <Users size={20} /> Play with Friends
          </button>
        </div>
      </div>
      <AdBanner />
    </div>
  );

  const renderSoloTopicSelection = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <button onClick={() => setMode('menu')} className="btn-outline" style={{ border: 'none', marginBottom: 20 }}>
        <ChevronLeft size={16} /> Back to Menu
      </button>
      <h2 className="game-title" style={{ color: '#fbbf24', fontSize: 32 }}>Solo Vibe</h2>
      <p className="game-subtitle">Select a topic to sharpen your mind.</p>
      
      <div style={{ display: 'grid', gap: 12, maxWidth: 400, margin: '0 auto' }}>
        {Object.entries(VOCAB_SETS).map(([key, set]) => (
          <button
            key={key}
            onClick={() => { setCurrentSet(key); initSoloGame(key); }}
            className="card"
            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', textAlign: 'left' }}
          >
            <div style={{ fontSize: 32 }}>{set.emoji}</div>
            <div>
              <div style={{ fontWeight: 800, color: '#fff' }}>{set.title}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{set.items.length} Match Pairs</div>
            </div>
            <ChevronRight size={20} style={{ marginLeft: 'auto', opacity: 0.3 }} />
          </button>
        ))}
      </div>
    </div>
  );

  const renderArenaSetup = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <button onClick={() => setMode('menu')} className="btn-outline" style={{ border: 'none', marginBottom: 20 }}>
        <ChevronLeft size={16} /> Back to Menu
      </button>
      <h2 className="game-title" style={{ color: '#00d4ff', fontSize: 32 }}>Arena Mode</h2>
      <p className="game-subtitle">Host or join a matching race.</p>
      
      {error && <div style={{ color: '#ff2d78', fontWeight: 800, marginBottom: 16 }}>{error}</div>}

      <div className="card" style={{ maxWidth: 500, margin: '0 auto', padding: '32px' }}>
        <input 
          placeholder="ENTER NICKNAME" 
          value={playerName} 
          onChange={e => setPlayerName(sanitizePlayerName(e.target.value))} 
          className="input-field" 
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 16 }}>
            <h4 style={{ fontSize: 10, fontWeight: 800, color: '#00d4ff' }}>HOST GAME</h4>
            <select 
              value={currentSet} 
              onChange={e => setCurrentSet(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#0a0a0f', color: '#fff', border: '1px solid #2a2a3e', borderRadius: '10px' }}
            >
              {Object.entries(VOCAB_SETS).map(([k, s]) => <option key={k} value={k}>{s.emoji} {s.title}</option>)}
            </select>
            <button className="btn-secondary" onClick={createArenaRoom} style={{ width: '100%', fontSize: 12 }}>Create Room</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 16 }}>
             <h4 style={{ fontSize: 10, fontWeight: 800, color: '#ff2d78' }}>JOIN GAME</h4>
             <input 
              placeholder="CODE" 
              value={roomCode} 
              onChange={e => setRoomCode(sanitizeRoomCode(e.target.value))} 
              maxLength={3}
              style={{ padding: 10, borderRadius: 10, background: '#0a0a0f', color: '#fff', border: '1px solid #2a2a3e', textAlign: 'center', fontWeight: 'bold' }}
             />
             <button className="btn-primary" onClick={joinArenaRoom} style={{ width: '100%', fontSize: 12 }}>Join Room</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLobby = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
       <h2 className="game-title" style={{ color: '#00d4ff' }}>Waiting Room</h2>
       <p style={{ color: '#888', marginBottom: 24 }}>{VOCAB_SETS[room.topic].title} • {VOCAB_SETS[room.topic].items.length} Pairs</p>

       <div className="card" style={{ maxWidth: 350, margin: '0 auto 24px auto', border: '2px solid #00d4ff' }}>
         <div style={{ fontSize: 11, fontWeight: 800, color: '#555', marginBottom: 8 }}>ROOM CODE</div>
         <div style={{ fontSize: 48, fontWeight: 900, color: '#fbbf24', letterSpacing: 8 }}>{room.code}</div>
         <button onClick={() => { navigator.clipboard.writeText(room.code); setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); }} style={{ background: 'none', border: 'none', color: '#00d4ff', fontSize: 12, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
            {copySuccess ? '✓ COPIED' : 'Copy Code'}
         </button>
       </div>

       <div className="card" style={{ maxWidth: 500, margin: '0 auto 32px auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, color: '#555', marginBottom: 16 }}>
            <Users size={14} /> PLAYERS JOINED ({room.players.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {room.players.map((p, i) => (
              <div key={i} style={{ padding: '8px 16px', borderRadius: 12, background: '#0a0a0f', border: '1px solid #1a1a2e', fontWeight: 700 }}>
                {i === 0 ? '👑' : '🎨'} {p.name}
              </div>
            ))}
          </div>
       </div>

       {isHost && (
         <button className="btn-primary" onClick={async () => await updateDoc(doc(db, "vocab_rooms", room.id), { status: 'playing' })}>
           START RACE! <ArrowRight size={20} />
         </button>
       )}
    </div>
  );

  const renderGame = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fbbf24' }}>{VOCAB_SETS[currentSet].title}</div>
        {mode === 'arena_playing' && <div style={{ background: '#ff2d78', padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800 }}>LIVE RACE</div>}
        <div style={{ color: '#555', fontSize: 12, fontWeight: 700 }}>{score} / {currentData.length}</div>
      </div>

      <div style={{ width: '100%', height: 4, background: '#13131f', borderRadius: 2, marginBottom: 24 }}>
        <div style={{ width: `${(score/currentData.length)*100}%`, height: '100%', background: '#fbbf24', transition: 'width 0.3s' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {shuffledItems.terms.map((item, i) => (
            <button key={`term-${item.id}`} onClick={() => handleTermSelect(item.id)} disabled={matchedIds.has(item.id)} style={{
              padding: '12px', borderRadius: 12, background: matchedIds.has(item.id) ? 'transparent' : selectedTerm === item.id ? COLORS.bg[i%6] : '#13131f',
              border: `2px solid ${matchedIds.has(item.id) ? '#1a1a2e' : selectedTerm === item.id ? COLORS.border[i%6] : '#2a2a3e'}`,
              opacity: matchedIds.has(item.id) ? 0.3 : 1
            }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{item.term}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {shuffledItems.defs.map((item, i) => (
            <button key={`def-${item.id}`} onClick={() => handleDefSelect(item.id)} disabled={matchedIds.has(item.id)} style={{
              padding: '12px', borderRadius: 12, background: matchedIds.has(item.id) ? 'transparent' : '#13131f', minHeight: 70,
              border: `2px solid ${matchedIds.has(item.id) ? '#1a1a2e' : activeHint === item.hint ? '#fbbf24' : '#2a2a3e'}`,
              fontSize: 12, color: matchedIds.has(item.id) ? '#555' : '#ccc', textAlign: 'left', opacity: matchedIds.has(item.id) ? 0.3 : 1
            }}>
              {item.definition}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', borderRadius: 99, background: feedback.type === 'correct' ? '#00ff94' : '#ff2d78', color: '#000', fontWeight: 900, fontSize: 14 }}>
          {feedback.text}
        </div>
      )}

      {mode === 'arena_playing' && (
        <div style={{ marginTop: 24, padding: 16, background: '#13131f', borderRadius: 16 }}>
           <div style={{ fontSize: 10, fontWeight: 800, color: '#555', marginBottom: 12, textTransform: 'uppercase' }}>Race Progress</div>
           {room.players.map((p, i) => (
             <div key={i} style={{ marginBottom: 8 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                 <span style={{ fontWeight: 800 }}>{p.name === playerName ? '👤 YOU' : `🎮 ${p.name}`}</span>
                 <span>{p.progress} / {currentData.length}</span>
               </div>
               <div style={{ height: 4, background: '#0a0a0f', borderRadius: 2 }}>
                 <div style={{ width: `${(p.progress / currentData.length)*100}%`, height: '100%', background: p.name === playerName ? '#00d4ff' : '#2a2a3e', borderRadius: 2 }} />
               </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );

  const renderResults = () => {
    if (mode === 'arena_results') {
      const sorted = [...room.players].sort((a,b) => b.progress - a.progress);
      return (
        <GameEndScreen
          gameId="vocab-arena"
          score={score}
          emoji="🏆"
          title={room.winner === playerName ? "Winner!" : "Arena Over!"}
          description={room.winner === playerName ? "You were the fastest matcher!" : `${room.winner} won the race.`}
          accentColor="#00d4ff"
          onPlayAgain={() => setMode('menu')}
        >
          <div className="card" style={{ marginTop: 20 }}>
            {sorted.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, borderBottom: i < sorted.length - 1 ? '1px solid #1a1a2e' : 'none' }}>
                <span style={{ fontWeight: 800, color: i === 0 ? '#fbbf24' : '#fff' }}>#{i+1} {p.name} {p.name === playerName && '(YOU)'}</span>
                <span style={{ color: '#555' }}>Matched {p.progress}</span>
              </div>
            ))}
          </div>
        </GameEndScreen>
      );
    }
    return (
      <GameEndScreen
        gameId="vocab-arena"
        score={score}
        maxScore={currentData.length}
        emoji="✨"
        title="Solo Master!"
        accentColor="#fbbf24"
        onPlayAgain={() => setMode('menu')}
      />
    );
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, opacity: 0.1 }}>
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}></div>
      </div>
      {mode === 'menu' && renderMenu()}
      {mode === 'solo_topic' && renderSoloTopicSelection()}
      {mode === 'arena_setup' && renderArenaSetup()}
      {mode === 'arena_lobby' && renderLobby()}
      {(mode === 'solo' || mode === 'arena_playing') && renderGame()}
      {(score === currentData.length || mode === 'arena_results') && renderResults()}
    </>
  );
}
