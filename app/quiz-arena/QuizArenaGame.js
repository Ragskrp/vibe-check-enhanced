'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, doc, onSnapshot, setDoc, updateDoc, 
  query, where, getDocs, arrayUnion, serverTimestamp, getDoc
} from 'firebase/firestore';
import { Share2, ArrowRight, Trophy, Users, Search, PlusCircle, LogIn, ChevronLeft, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import AdBanner from '../components/AdBanner';

const FloatingBg = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden', opacity: 0.3 }}>
    <div style={{ position: 'absolute', top: '10%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255, 230, 0, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
    <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} className="animate-pulse" />
  </div>
);

const CATEGORIES = {
  general: "🌍 General Knowledge",
  pop_culture: "🎭 Pop Culture",
  science: "🔬 Science",
  gaming: "🎮 Gaming",
  movies: "🎬 Movies",
  music: "🎵 Music",
  food: "🍕 Food",
  sports: "⚽ Sports"
};

const TRIVIA_QUESTIONS = {
  general: [
    { q: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: 2 },
    { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
    { q: "What planet is closest to the Sun?", options: ["Venus", "Earth", "Mars", "Mercury"], answer: 3 },
    { q: "What's the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
    { q: "Which year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
    { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"], answer: 1 },
    { q: "What is the smallest country in the world?", options: ["Monaco", "Malta", "Vatican City", "San Marino"], answer: 2 },
    { q: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
    { q: "In which year did the Titanic sink?", options: ["1905", "1912", "1918", "1923"], answer: 1 },
    { q: "What's the chemical symbol for Gold?", options: ["Gd", "Ag", "Au", "Fe"], answer: 2 },
    { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: 1 },
    { q: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: 2 },
    { q: "Which animal is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Orca"], answer: 1 },
    { q: "What is the main gas found in the air we breathe?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 1 }
  ],
  pop_culture: [
    { q: "Which year did TikTok launch globally?", options: ["2016", "2017", "2018", "2019"], answer: 2 },
    { q: "Who plays Iron Man in the MCU?", options: ["Chris Evans", "Robert Downey Jr.", "Chris Pratt", "Mark Ruffalo"], answer: 1 },
    { q: "Which show features the 'Red Wedding'?", options: ["Vikings", "The Witcher", "Game of Thrones", "House of the Dragon"], answer: 2 },
    { q: "Which platform streams Stranger Things?", options: ["Hulu", "HBO", "Disney+", "Netflix"], answer: 3 },
    { q: "Who is known as the 'Queen of Pop'?", options: ["Beyoncé", "Lady Gaga", "Madonna", "Taylor Swift"], answer: 2 },
    { q: "What is the name of Kim Kardashian's shapewear brand?", options: ["SKIMS", "Fabletics", "Savage X Fenty", "Yeezy"], answer: 0 },
    { q: "Which movie won the Oscar for Best Picture in 2020?", options: ["1917", "Joker", "Parasite", "The Irishman"], answer: 2 },
    { q: "Who sang the theme song for the Bond movie 'No Time to Die'?", options: ["Adele", "Sam Smith", "Billie Eilish", "Dua Lipa"], answer: 2 },
    { q: "Which artist released the album 'Midnights' in 2022?", options: ["Harry Styles", "Taylor Swift", "Ariana Grande", "Drake"], answer: 1 },
    { q: "What is the birth name of Rihanna?", options: ["Robyn Fenty", "Onika Maraj", "Beyoncé Knowles", "Stefani Germanotta"], answer: 0 },
    { q: "Which Netflix show features a group of kids in the 1980s?", options: ["Dark", "Stranger Things", "Outer Banks", "Elite"], answer: 1 },
    { q: "Who played the character of Wednesday Addams in the 2022 Netflix series?", options: ["Jenna Ortega", "Christina Ricci", "Emma Myers", "Sadie Sink"], answer: 0 },
    { q: "Which artist had a hit in 2023 with 'Flowers'?", options: ["Miley Cyrus", "SZA", "Doja Cat", "Ice Spice"], answer: 0 },
    { q: "What is the name of the fictional town in 'SpongeBob SquarePants'?", options: ["Quahog", "Bikini Bottom", "Springfield", "South Park"], answer: 1 },
    { q: "Who is the lead singer of Coldplay?", options: ["Adam Levine", "Chris Martin", "Brandon Flowers", "Bono"], answer: 1 }
  ],
  science: [
    { q: "What is H2O?", options: ["Helium", "Water", "Hydrogen", "Oxygen"], answer: 1 },
    { q: "What planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Saturn", "Mars"], answer: 3 },
    { q: "What force keeps us on the ground?", options: ["Friction", "Magnetism", "Gravity", "Inertia"], answer: 2 },
    { q: "Which part of the plant conducts photosynthesis?", options: ["Root", "Stem", "Leaf", "Flower"], answer: 2 },
    { q: "What is the center of an atom called?", options: ["Electron", "Proton", "Nucleus", "Neutron"], answer: 2 },
    { q: "What is the boiling point of water in Celsius?", options: ["0°C", "50°C", "100°C", "212°C"], answer: 2 },
    { q: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Argon"], answer: 2 },
    { q: "How many bones are in the adult human body?", options: ["186", "206", "216", "256"], answer: 1 },
    { q: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], answer: 1 },
    { q: "What is the speed of light approx?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "500,000 km/s"], answer: 0 },
    { q: "Which organ is responsible for pumping blood?", options: ["Lungs", "Brain", "Liver", "Heart"], answer: 3 },
    { q: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Skin", "Intestines"], answer: 2 },
    { q: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: 1 },
    { q: "What is the chemical symbol for Iron?", options: ["Ir", "Fe", "In", "Au"], answer: 1 },
    { q: "What kind of star is the Sun?", options: ["Red Giant", "White Dwarf", "Yellow Dwarf", "Blue Supergiant"], answer: 2 }
  ],
  gaming: [
    { q: "What is the main character's name in The Legend of Zelda?", options: ["Zelda", "Ganon", "Navi", "Link"], answer: 3 },
    { q: "Which game features creepers?", options: ["Roblox", "Minecraft", "Fortnite", "Terraria"], answer: 1 },
    { q: "What company made the PlayStation?", options: ["Microsoft", "Nintendo", "Sega", "Sony"], answer: 3 },
    { q: "Which color is the imposter usually?", options: ["Blue", "Red", "Green", "Yellow"], answer: 1 },
    { q: "What is the best-selling video game of all time?", options: ["GTA V", "Minecraft", "Tetris", "Super Mario Bros."], answer: 1 },
    { q: "In 'Pac-Man', what color is the ghost 'Blinky'?", options: ["Pink", "Red", "Cyan", "Orange"], answer: 1 },
    { q: "Which console was released by Nintendo in 2017?", options: ["Wii U", "3DS", "Switch", "GameCube"], answer: 2 },
    { q: "What's the name of the master assassin in Assassin's Creed II?", options: ["Altaïr", "Ezio Auditore", "Connor", "Edward Kenway"], answer: 1 },
    { q: "Which game series features a city called Rapture?", options: ["Fallout", "BioShock", "Destiny", "Borderlands"], answer: 1 },
    { q: "Who is the primary antagonist in the Mario series?", options: ["Wario", "Luigi", "Bowser", "Walugi"], answer: 2 },
    { q: "Which battle royale game was released in 2017 and features building?", options: ["PUBG", "Apex Legends", "Fortnite", "Warzone"], answer: 2 },
    { q: "What is the name of the Kingdom in Zelda: Breath of the Wild?", options: ["Hyrule", "Lorule", "Termina", "Skyloft"], answer: 0 },
    { q: "Which character is known as 'The ghost of Sparta'?", options: ["Master Chief", "Marcus Fenix", "Kratos", "Doom Slayer"], answer: 2 },
    { q: "What is the name of the AI in the Halo series?", options: ["Siri", "Alexa", "Cortana", "GlaDOS"], answer: 2 },
    { q: "Which game features characters like 'Tracer' and 'Genji'?", options: ["Valorant", "Overwatch", "TF2", "Apex Legends"], answer: 1 }
  ],
  movies: [
    { q: "Who directed Jurassic Park?", options: ["Steven Spielberg", "George Lucas", "James Cameron", "Peter Jackson"], answer: 0 },
    { q: "What is the name of the lion in The Lion King?", options: ["Mufasa", "Scar", "Simba", "Timon"], answer: 2 },
    { q: "Which movie features a Delorean time machine?", options: ["Star Wars", "Back to the Future", "E.T.", "Ghostbusters"], answer: 1 },
    { q: "What is the highest grossing film as of 2023?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Force Awakens"], answer: 0 },
    { q: "Who played Jack in 'Titanic'?", options: ["Brad Pitt", "Johnny Depp", "Leonardo DiCaprio", "Tom Cruise"], answer: 2 },
    { q: "Which movie series features the 'Infinity Stones'?", options: ["Star Wars", "The Avengers", "Harry Potter", "X-Men"], answer: 1 },
    { q: "What is the name of the fictional school in Harry Potter?", options: ["Narnia", "Hogwarts", "Middle Earth", "X-Academy"], answer: 1 },
    { q: "Which animation studio produced 'Toy Story'?", options: ["Dreamworks", "Pixar", "Disney", "Illumination"], answer: 1 },
    { q: "Who portrayed the Joker in the 2008 film 'The Dark Knight'?", options: ["Jack Nicholson", "Jared Leto", "Heath Ledger", "Joaquin Phoenix"], answer: 2 },
    { q: "Which film features the quote 'May the Force be with you'?", options: ["Star Trek", "The Matrix", "Star Wars", "Dune"], answer: 2 },
    { q: "Who directed 'Inception'?", options: ["Christopher Nolan", "Quentin Tarantino", "Martin Scorsese", "Wes Anderson"], answer: 0 },
    { q: "What is the first movie in the MCU?", options: ["The Avengers", "Iron Man", "Captain America", "Thor"], answer: 1 },
    { q: "Which movie features a blue shark named Bruce?", options: ["Jaws", "Finding Nemo", "Shark Tale", "The Reef"], answer: 1 },
    { q: "Which film has the record for the most Oscar wins (11)?", options: ["Titanic", "Lord of the Rings: Return of the King", "Ben-Hur", "All of these"], answer: 3 },
    { q: "Who plays Barbie in the 2023 movie?", options: ["Emma Stone", "Margot Robbie", "Florence Pugh", "Ana de Armas"], answer: 1 }
  ],
  music: [
    { q: "Who is the 'King of Pop'?", options: ["Prince", "Michael Jackson", "Elvis Presley", "Stevie Wonder"], answer: 1 },
    { q: "Which band sang 'Hey Jude'?", options: ["The Rolling Stones", "The Beach Boys", "The Beatles", "The Who"], answer: 2 },
    { q: "How many strings are on a standard guitar?", options: ["4", "5", "6", "7"], answer: 2 },
    { q: "What instrument is used to play a snare drum?", options: ["Hands", "Sticks", "Mallets", "Brushes"], answer: 1 },
    { q: "Which artist is known as 'Slim Shady'?", options: ["Drake", "Eminem", "Jay-Z", "Snoop Dogg"], answer: 1 },
    { q: "Which female singer released the album '21'?", options: ["Rihanna", "Adele", "Beyoncé", "Katy Perry"], answer: 1 },
    { q: "Who is the lead singer of Queen?", options: ["Freddie Mercury", "Mick Jagger", "David Bowie", "Steven Tyler"], answer: 0 },
    { q: "What is the name of Drake's record label?", options: ["Roc Nation", "OVO Sound", "Bad Boy Records", "Def Jam"], answer: 1 },
    { q: "Which k-pop group is known for 'Dynamite'?", options: ["EXO", "Blackpink", "BTS", "Twice"], answer: 2 },
    { q: "Who wrote the song 'Billie Jean'?", options: ["Michael Jackson", "Prince", "George Michael", "Lionel Richie"], answer: 0 },
    { q: "What is the stage name of Abel Tesfaye?", options: ["The Weeknd", "Post Malone", "Frank Ocean", "Khalid"], answer: 0 },
    { q: "Which artist has the most Grammy wins of all time?", options: ["Georg Solti", "Quincy Jones", "Beyoncé", "Stevie Wonder"], answer: 2 },
    { q: "Who sang 'Rolling in the Deep'?", options: ["Adele", "Amy Winehouse", "Duffy", "Jessie J"], answer: 0 },
    { q: "Which rapper released 'The College Dropout'?", options: ["Kanye West", "Jay-Z", "50 Cent", "Lil Wayne"], answer: 0 },
    { q: "In which city did Jazz music originate?", options: ["New York", "Chicago", "New Orleans", "Detroit"], answer: 2 }
  ],
  food: [
    { q: "What is the main ingredient in hummus?", options: ["Lentils", "Chickpeas", "Black Beans", "Peas"], answer: 1 },
    { q: "Which country is famous for pasta?", options: ["France", "Spain", "Italy", "Greece"], answer: 2 },
    { q: "What type of food is a Granny Smith?", options: ["Apple", "Pear", "Plum", "Peach"], answer: 0 },
    { q: "What is sushi traditionally wrapped in?", options: ["Bread", "Lettuce", "Seaweed", "Rice Paper"], answer: 2 },
    { q: "What is the primary ingredient in guacamole?", options: ["Tomato", "Onion", "Avocado", "Lime"], answer: 2 },
    { q: "Which nut is used to make marzipan?", options: ["Walnut", "Peanut", "Almond", "Hazelnut"], answer: 2 },
    { q: "What is the spiciest chili pepper in the world (as of 2023)?", options: ["Jalapeno", "Habanero", "Carolina Reaper", "Pepper X"], answer: 3 },
    { q: "Which fruit has seeds on the outside?", options: ["Raspberry", "Blueberry", "Strawberry", "Kiwi"], answer: 2 },
    { q: "What is the main ingredient of a meringue?", options: ["Yolks", "Egg Whites", "Butter", "Flour"], answer: 1 },
    { q: "Which country is the origin of the croissant?", options: ["France", "Austria", "Germany", "Denmark"], answer: 1 },
    { q: "What type of pasta is shaped like little ears?", options: ["Fusilli", "Penne", "Orecchiette", "Farfalle"], answer: 2 },
    { q: "What fermented cabbage dish is a staple in Korea?", options: ["Sauerkraut", "Kimchi", "Coleslaw", "Borscht"], answer: 1 },
    { q: "What is the main spirit in a Mojito?", options: ["Vodka", "Gin", "Rum", "Tequila"], answer: 2 },
    { q: "Which berry is used to make Gin?", options: ["Elderberry", "Juniper Berry", "Blackberry", "Cranberry"], answer: 1 },
    { q: "What meat is used in a traditional Shepherd's Pie?", options: ["Beef", "Chicken", "Pork", "Lamb"], answer: 3 }
  ],
  sports: [
    { q: "How many players are on a soccer team?", options: ["9", "10", "11", "12"], answer: 2 },
    { q: "In what sport would you perform a slam dunk?", options: ["Baseball", "Tennis", "Basketball", "Volleyball"], answer: 2 },
    { q: "Which country won the first World Cup?", options: ["Brazil", "Argentina", "Uruguay", "Germany"], answer: 2 },
    { q: "What color is a standard tennis ball?", options: ["White", "Yellow-green", "Orange", "Pink"], answer: 1 },
    { q: "Who is known as 'The Greatest' in boxing?", options: ["Mike Tyson", "Floyd Mayweather", "Muhammad Ali", "Joe Frazier"], answer: 2 },
    { q: "Which city hosted the 2012 Summer Olympics?", options: ["Beijing", "Rio", "London", "Tokyo"], answer: 2 },
    { q: "How many holes are played in a standard round of golf?", options: ["9", "12", "18", "21"], answer: 2 },
    { q: "Which tennis player has won the most Grand Slam titles?", options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Serena Williams"], answer: 2 },
    { q: "What is the distance of a full marathon?", options: ["21.1 km", "42.2 km", "30 km", "50 km"], answer: 1 },
    { q: "In baseball, how many strikes for an 'out'?", options: ["1", "2", "3", "4"], answer: 2 },
    { q: "Which sport uses terms like 'love', 'deuce', and 'ace'?", options: ["Badminton", "Squash", "Tennis", "Ping Pong"], answer: 2 },
    { q: "Who holds the record for the most goals in a single season?", options: ["Messi", "Ronaldo", "Pelé", "Haaland"], answer: 0 },
    { q: "What is the diameter of a basketball hoop?", options: ["15 in", "18 in", "20 in", "24 in"], answer: 1 },
    { q: "Which NFL team has the most Super Bowl wins?", options: ["Cowboys", "Steelers/Patriots", "Packers", "Giants"], answer: 1 },
    { q: "In cricket, how many wickets in an innings?", options: ["8", "10", "11", "12"], answer: 1 }
  ]
};

// Default trivial list for other categories
Object.keys(CATEGORIES).forEach(cat => {
  if (!TRIVIA_QUESTIONS[cat]) {
    TRIVIA_QUESTIONS[cat] = TRIVIA_QUESTIONS.general;
  }
});

function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function QuizArenaGame() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('home'); // home, lobby, playing, results
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [room, setRoom] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [error, setError] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(5);
  const [isHost, setIsHost] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);

  useEffect(() => {
    if (view === 'results') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffe600', '#00d4ff', '#ff2d78']
      });
    }
  }, [view]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Firestore listeners
  useEffect(() => {
    if (!mounted || !room?.id) return;

    const unsub = onSnapshot(doc(db, "rooms", room.id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setRoom(prev => ({ ...prev, ...data }));
        
        if (data.status === 'playing' && view === 'lobby') setView('playing');
        if (data.status === 'results' && view !== 'results') setView('results');

        // Check if all players finished current question
        const totalPlayers = data.players.length;
        const answersCount = data.players.filter(p => (p.answers?.length || 0) > data.currentQuestion).length;
        const currentlyAllAnswered = answersCount >= totalPlayers && totalPlayers > 0;
        setAllAnswered(currentlyAllAnswered);

        // Host Auto-Advance logic
        if (isHost && currentlyAllAnswered && data.status === 'playing') {
          // Add a small delay so they can see their feedback
          setTimeout(async () => {
            const freshRoomSnap = await getDoc(doc(db, "rooms", data.code));
            if (freshRoomSnap.exists()) {
              const freshData = freshRoomSnap.data();
              // Re-verify they are still on the same question
              if (freshData.currentQuestion === data.currentQuestion) {
                const nextQ = freshData.currentQuestion + 1;
                if (nextQ >= freshData.questions.length) {
                  await updateDoc(doc(db, "rooms", data.code), { status: 'results' });
                } else {
                  await updateDoc(doc(db, "rooms", data.code), { currentQuestion: nextQ });
                }
              }
            }
          }, 2500);
        }
      }
    });

    return () => unsub();
  }, [room?.id, view, mounted]);

  // Timer logic for playing state
  useEffect(() => {
    if (!mounted || view !== 'playing' || !room) return;

    if (timer <= 0) {
      if (selectedAnswer === null) handleAnswer(-1); // timeout
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [view, timer, selectedAnswer, room, mounted]);

  // Reset timer on question change
  useEffect(() => {
    if (mounted && view === 'playing' && room) {
      setTimer(5);
      setSelectedAnswer(null);
    }
  }, [room?.currentQuestion, view, mounted]);

  if (!mounted) return <div className="game-container" style={{ minHeight: '600px' }} />;

  const handleCreateRoom = async () => {
    if (!playerName || playerName.trim().length < 2) {
      setError('Please enter a valid nickname (min 2 chars)!');
      return;
    }
    setError('');

    try {
      const code = generateRoomCode();
      const newRoom = {
        code,
        category: selectedCategory,
        status: 'lobby',
        currentQuestion: 0,
        questions: TRIVIA_QUESTIONS[selectedCategory],
        players: [{ name: playerName, score: 0, answers: [] }],
        createdAt: serverTimestamp(),
      };

      const roomRef = doc(db, "rooms", code);
      await setDoc(roomRef, newRoom);
      
      setRoom({ 
        id: code, 
        ...newRoom, 
        createdAt: new Date().toISOString()
      });
      setMyPlayerId(0);
      setIsHost(true);
      setView('lobby');
    } catch (e) {
      console.error('Firebase Room Creation Error:', e);
      setError('Unable to create room. Please try again.');
    }
  };

  const handleJoinRoom = async () => {
    if (!playerName || !roomCode.trim() || roomCode.trim().length !== 3) {
      setError('Enter both a valid name and 3-char room code!');
      return;
    }
    setError('');

    try {
      const q = query(collection(db, "rooms"), where("code", "==", roomCode.toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Room not found! Check the code.');
        return;
      }

      const roomDoc = querySnapshot.docs[0];
      const roomData = roomDoc.data();

      if (roomData.status !== 'lobby') {
        setError('Match in progress! Cannot join.');
        return;
      }

      const newPlayer = { name: playerName, score: 0, answers: [] };
      const playerIdx = roomData.players.length;

      const roomRef = doc(db, "rooms", roomDoc.id);
      await updateDoc(roomRef, {
        players: arrayUnion(newPlayer)
      });

      setRoom({ ...roomData, id: roomDoc.id, players: [...roomData.players, newPlayer] });
      setMyPlayerId(playerIdx);
      setIsHost(false);
      setView('lobby');
    } catch (e) {
      console.error('Firebase Join Error:', e);
      setError('Unable to join: ' + e.message);
    }
  };

  const startGame = async () => {
    if (!isHost) return;
    await updateDoc(doc(db, "rooms", room.id), { status: 'playing', currentQuestion: 0 });
  };

  const handleAnswer = async (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);

    const question = room.questions[room.currentQuestion];
    const isCorrect = idx === question.answer;
    const points = isCorrect ? 10 : 0;

    const roomRef = doc(db, "rooms", room.id);
    const docSnap = await getDoc(roomRef);
    if (!docSnap.exists()) return;
    
    const currentData = docSnap.data();
    const newPlayers = [...currentData.players];
    newPlayers[myPlayerId] = {
      ...newPlayers[myPlayerId],
      score: newPlayers[myPlayerId].score + points,
      answers: [...(newPlayers[myPlayerId].answers || []), idx]
    };

    await updateDoc(roomRef, { players: newPlayers });
  };

  const nextQuestion = async () => {
    if (!isHost) return;
    const nextQ = room.currentQuestion + 1;
    if (nextQ >= room.questions.length) {
      await updateDoc(doc(db, "rooms", room.id), { status: 'results' });
    } else {
      await updateDoc(doc(db, "rooms", room.id), { currentQuestion: nextQ });
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(room.code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareResults = () => {
    const sorted = [...room.players].sort((a,b) => b.score - a.score);
    const winner = sorted[0];
    const text = `🏆 VIBEMENOW Quiz Arena Results!\nCategory: ${CATEGORIES[room.category]}\nWinner: ${winner.name} (${winner.score} pts)\nMy Rank: #${sorted.findIndex(p => p.name === playerName) + 1}\n\nChallenge me at: vibemenow.vercel.app/quiz-arena`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied results! 📋');
    }
  };

  const renderHome = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="game-badge">Multiplayer</div>
      <h1 className="game-title" style={{ color: '#ffe600' }}>🏆 Quiz Arena</h1>
      <p className="game-subtitle">Create a room, share code, compete live!</p>

      {error && (
        <div style={{ background: '#ff2d7822', border: '1px solid #ff2d78', color: '#ff2d78', padding: '10px', borderRadius: '10px', marginBottom: '20px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ maxWidth: '500px', margin: '40px auto', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#555', fontSize: '11px', fontWeight: 800, textAlign: 'left', marginBottom: '8px', textTransform: 'uppercase' }}>
            Choose your nickname
          </label>
          <input 
            placeholder="E.G. QUIZ_MASTER"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={15}
            className="input-field"
            style={{ marginBottom: 0 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'rgba(0, 212, 255, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 212, 255, 0.2)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎮</div>
            <h3 style={{ fontSize: '14px', color: '#00d4ff', marginBottom: '12px', fontWeight: 800 }}>HOST GAME</h3>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#0a0a0f', color: '#fff', border: '1px solid #2a2a3e', borderRadius: '10px', fontSize: '12px', marginBottom: '12px', cursor: 'pointer' }}
            >
              {Object.entries(CATEGORIES).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
            <button className="btn-secondary" onClick={handleCreateRoom} style={{ width: '100%', padding: '10px', fontSize: '12px', marginTop: 'auto' }}>
              Create Room
            </button>
          </div>

          <div style={{ background: 'rgba(255, 45, 120, 0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 45, 120, 0.2)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔗</div>
            <h3 style={{ fontSize: '14px', color: '#ff2d78', marginBottom: '12px', fontWeight: 800 }}>JOIN ROOM</h3>
            <input 
              placeholder="CODE"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={3}
              className="input-field"
              style={{ textAlign: 'center', fontSize: '14px', letterSpacing: '2px', padding: '10px', marginBottom: '12px' }}
            />
            <button className="btn-primary" onClick={handleJoinRoom} style={{ width: '100%', padding: '10px', fontSize: '12px', marginTop: 'auto' }}>
              Join Game
            </button>
          </div>
        </div>
      </div>
      <AdBanner />
    </div>
  );

  const renderLobby = () => (
    <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
      <button onClick={() => setView('home')} className="btn-outline" style={{ display: 'flex', gap: '4px', border: 'none', marginBottom: '16px' }}>
        <ChevronLeft size={16} /> Exit Lobby
      </button>
      <h2 style={{ fontSize: '28px', color: '#00d4ff', marginBottom: '8px' }}>Arena Lobby</h2>
      <p style={{ color: '#888', marginBottom: '32px' }}>{CATEGORIES[room.category]} • {room.questions.length} Questions</p>

      <div className="card" style={{ marginBottom: '32px', border: '2px solid rgba(0, 212, 255, 0.3)' }}>
        <p style={{ color: '#555', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Share this code with friends</p>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffe600', letterSpacing: '8px', margin: '8px 0' }}>{room.code}</div>
        <button className="btn-outline" onClick={copyCode} style={{ gap: '6px' }}>
          {copySuccess ? '✓ Copied!' : 'Copy Code'}
        </button>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' }}>
          <Users size={14} /> PLAYERS JOINED ({room.players.length})
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {room.players.map((p, i) => (
            <div key={i} style={{ 
              background: i === myPlayerId ? 'rgba(0, 212, 255, 0.15)' : '#0a0a0f',
              border: `1px solid ${i === myPlayerId ? '#00d4ff' : '#2a2a3e'}`,
              borderRadius: '12px', padding: '10px 16px', color: i === myPlayerId ? '#00d4ff' : '#fff',
              fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              {i === 0 ? '👑' : '🎮'} {p.name} {i === myPlayerId && <span style={{fontSize: '10px', color: '#555'}}>(you)</span>}
            </div>
          ))}
        </div>
      </div>

      {isHost ? (
        <button className="btn-secondary" onClick={startGame} disabled={room.players.length < 1}>
          Start Match! <ArrowRight size={18} />
        </button>
      ) : (
        <div style={{ color: '#555', background: '#13131f', padding: '14px', borderRadius: '12px' }}>
          Waiting for the host to start...
        </div>
      )}
    </div>
  );

  const renderPlaying = () => {
    const q = room.questions[room.currentQuestion];
    const isAnswered = selectedAnswer !== null;
    const showFeedback = isAnswered || allAnswered;
    const answeredCount = room.players.filter(p => (p.answers?.length || 0) > room.currentQuestion).length;
    
    return (
      <div className="game-container animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ color: '#555', fontWeight: 'bold', fontSize: '13px' }}>Q {room.currentQuestion + 1} / {room.questions.length}</span>
          <div style={{ 
            background: timer < 5 ? 'rgba(255, 45, 120, 0.1)' : 'rgba(0, 212, 255, 0.1)',
            borderColor: timer < 5 ? '#ff2d78' : '#00d4ff',
            color: timer < 5 ? '#ff2d78' : '#00d4ff',
            border: '2px solid', borderRadius: '10px', padding: '4px 12px', fontWeight: 'bold', fontSize: '18px'
          }}>
            {isAnswered ? 'READY' : timer}
          </div>
        </div>
        
        {isAnswered && !allAnswered && (
          <div style={{ textAlign: 'center', color: '#00ff94', fontSize: '11px', fontWeight: 800, marginBottom: '8px', letterSpacing: '1px' }}>
             WAITING FOR OTHERS...
          </div>
        )}
        
        <div className="progress-bar" style={{ marginBottom: '24px' }}>
          <div className="progress-fill" style={{ width: `${((room.currentQuestion + 1) / room.questions.length) * 100}%` }} />
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '32px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: '1.4' }}>{q.q}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {q.options.map((opt, i) => {
            let cls = 'option-btn';
            if (showFeedback) {
              if (i === q.answer) cls += ' correct';
              else if (i === selectedAnswer) cls += ' wrong';
              else cls += ' disabled';
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={isAnswered}>
                 <span style={{color: '#555', marginRight: '10px'}}>{['A','B','C','D'][i]}</span>
                 {opt}
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', color: '#555', fontSize: '13px', marginBottom: '20px' }}>
          {answeredCount} / {room.players.length} players answered
        </div>

        {isHost && isAnswered && (
          <div style={{ textAlign: 'center' }}>
            <button className="btn-secondary" onClick={nextQuestion}>
              {room.currentQuestion + 1 >= room.questions.length ? 'See Results' : 'Next Question'} <ArrowRight size={18} />
            </button>
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
    const medals = ['🥇', '🥈', '🥉'];

    return (
      <div className="game-container animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>
        <h1 className="game-title" style={{ color: '#ffe600' }}>Game Over!</h1>
        <p style={{ color: '#555', marginBottom: '32px' }}>Final Standings</p>

        <div className="card" style={{ marginBottom: '32px', padding: '16px' }}>
          {sorted.map((p, i) => (
            <div key={i} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              padding: '16px', background: p.name === playerName ? 'rgba(0, 212, 255, 0.05)' : 'transparent',
              borderRadius: '12px', borderBottom: i < sorted.length - 1 ? '1px solid #1a1a2e' : 'none',
              border: p.name === playerName ? '1px solid #00d4ff' : 'none',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{medals[i] || `#${i+1}`}</span>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{p.name} {p.name === playerName && '(YOU)'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#00ff94' }}>{p.score}</span>
                <span style={{ fontSize: '11px', color: '#555' }}>PTS</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="share-btn" onClick={shareResults}>
            <Share2 size={16} /> Share Results
          </button>
          <button className="btn-outline" onClick={() => setView('home')}>
             New Arena Match
          </button>
        </div>
        <div style={{ marginTop: '40px' }}>
          <AdBanner format="rectangle" />
        </div>
      </div>
    );
  };

  if (!room && view !== 'home') {
    setView('home');
    return null;
  }

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
            <HelpCircle size={16} color="#ffe600" /> How to Play
          </div>
          <div className="how-to-play-steps">
            <div className="how-to-play-step">
              <span className="how-to-play-number">1</span>
              <span>Create a room and share the 3-letter code with your friends to join the arena.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">2</span>
              <span>Once the match starts, you have 5 seconds to answer each multiple-choice question.</span>
            </div>
            <div className="how-to-play-step">
              <span className="how-to-play-number">3</span>
              <span>Correct answers earn 10 points. If everyone answers or time runs out, the host moves to the next question!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
